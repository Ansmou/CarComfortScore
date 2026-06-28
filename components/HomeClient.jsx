'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CARS, ARTICLES, CATS, SORTS, SEV_META, IMPACT_PENALTY, FEEDBACK_URL, SITE_NAME, crcs, grade, impactScore, motionScore, acousticScore } from '../data/cars';
import { FontLoader, SiteNav, Bar, ImpactChainTable, MetricChainTable, computeMotionChain, computeAcousticChain, computeImpactChain } from './shared';
import DetailDrawer from './DetailDrawer';
import CompareView from './CompareView';
import FeedbackModal from './FeedbackModal';

function CarCard({ car, onSelect, cmpList, onCmpToggle, cmpMode }) {
  const score = crcs(car), g = grade(score);
  const s = impactScore(car), f = motionScore(car), n = acousticScore(car);
  const inCmp = cmpList.some(c => c.id === car.id), canAdd = cmpList.length < 2;
  return (
    <div
      onClick={cmpMode ? (canAdd || inCmp ? () => onCmpToggle(car) : undefined) : () => onSelect(car)}
      style={{ background:'var(--card-bg)', border:`1px solid ${inCmp ? 'var(--green)' : 'var(--card-border)'}`, borderRadius:4, padding:14, cursor:cmpMode&&!canAdd&&!inCmp?'not-allowed':'pointer', opacity:cmpMode&&!canAdd&&!inCmp?.4:1, position:'relative', overflow:'hidden', boxShadow:inCmp?'0 0 0 2px var(--green)':'none', transition:'transform .18s ease, border-color .18s ease' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${g.color}88,${g.color}22)` }}/>
      {inCmp && <div style={{ position:'absolute', top:8, right:8, background:'var(--green)', color:'#fff', borderRadius:2, padding:'1px 8px', fontSize:8, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>SELECTED</div>}
      <div style={{ fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', marginBottom:3 }}>{car.year} · {car.market}</div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
        <div style={{ fontSize:14, fontWeight:700, fontFamily:'Barlow Condensed,sans-serif', letterSpacing:.5, color:'var(--text)', lineHeight:1.2, flex:1, paddingRight:8 }}>{car.name.toUpperCase()}</div>
        <div style={{ textAlign:'right', flexShrink:0 }} title={`Composite Ride Comfort Score — ${score}/100. Calculated as Impact×0.35 + Motion×0.40 + Acoustic×0.25 minus a WBV penalty for harsh suspension types. Higher is better.`}>
          <div style={{ fontSize:28, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:g.color, lineHeight:1, cursor:'help' }}>{score}</div>
          <div style={{ fontSize:8, color:g.color, fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, cursor:'help' }}>{g.label}</div>
        </div>
      </div>
      {[
        {l:'IMPACT',  v:s, c:'var(--amber)', t:'Impact Isolation (0–100, weight 35%). How well the vehicle absorbs sharp jolts — potholes, bumps, road discontinuities.'},
        {l:'MOTION',  v:f, c:'var(--blue)',  t:'Ride Motion Comfort (0–100, weight 40%). Body float / pitch on undulating roads. The single biggest factor in long-drive fatigue.'},
        {l:'ACOUSTIC',v:n, c:'var(--green)', t:'Cabin Acoustic Environment (0–100, weight 25%). Road noise and structural vibration inside the cabin.'},
      ].map(item => (
        <div key={item.l} style={{ marginBottom:5 }} title={item.t}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2, cursor:'help' }}>
            <span style={{ fontSize:8, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, borderBottom:'1px dotted var(--text4)' }}>{item.l}</span>
            <span style={{ fontSize:9, fontWeight:600, fontFamily:'IBM Plex Mono,monospace', color:item.c }}>{item.v}</span>
          </div>
          <Bar val={item.v} color={item.c} height={2} />
        </div>
      ))}
      {!cmpMode && <div style={{ marginTop:8, fontSize:8, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, borderTop:'1px solid var(--border)', paddingTop:6 }}>TAP FOR ANALYSIS ↗</div>}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:6, fontSize:9, fontFamily:'IBM Plex Mono,monospace', marginTop:cmpMode?8:0 }}>
        <span style={{ color:'var(--text4)' }}>{car.cat}</span>
        {(() => { const sev = SEV_META[car.hcImpact]; return (
          <span title={`Whole-Body Vibration character — ${sev.label}. ${sev.desc} (ISO 2631-1)`} style={{ color:sev.color, background:`${sev.color}14`, border:`1px solid ${sev.color}33`, borderRadius:2, padding:'1px 6px', letterSpacing:.5, cursor:'help' }}>WBV · {sev.label.toUpperCase()}</span>
        ); })()}
      </div>
    </div>
  );
}

export default function HomeClient() {
  const [theme, setTheme] = useState('light');
  const [cat, setCat] = useState('All');
  const [sortBy, setSortBy] = useState('Overall Score');
  const [sel, setSel] = useState(null);
  const [cmpMode, setCmpMode] = useState(false);
  const [cmpList, setCmpList] = useState([]);
  const [cmpView, setCmpView] = useState(false);
  const [search, setSearch] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

  // URL-based deep-linking for shared links: ?car=fortuner or ?compare=fortuner,civic_11pk
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const carId = params.get('car');
    const compareIds = params.get('compare');
    if (carId) {
      const car = CARS.find(c => c.id === carId);
      if (car) setSel(car);
    } else if (compareIds) {
      const ids = compareIds.split(',').slice(0, 2);
      const cars = ids.map(id => CARS.find(c => c.id === id)).filter(Boolean);
      if (cars.length === 2) {
        setCmpMode(true);
        setCmpList(cars);
        setCmpView(true);
      }
    }
  }, []);

  const togCmp = car => {
    if (cmpList.some(c => c.id === car.id)) setCmpList(p => p.filter(c => c.id !== car.id));
    else if (cmpList.length < 2) setCmpList(p => [...p, car]);
  };

  const startQuickCompare = (idA, idB) => {
    const a = CARS.find(c => c.id === idA), b = CARS.find(c => c.id === idB);
    if (a && b) {
      setCmpMode(true);
      setCmpList([a, b]);
      setCmpView(true);
    }
  };

  const filtered = CARS
    .filter(c => cat === 'All' || c.cat === cat)
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.year.includes(search))
    .sort((a, b) => {
      if (sortBy === 'Overall Score')       return crcs(b) - crcs(a);
      if (sortBy === 'Impact Isolation')     return impactScore(b) - impactScore(a);
      if (sortBy === 'Ride Motion')          return motionScore(b) - motionScore(a);
      if (sortBy === 'Cabin Quiet')          return acousticScore(b) - acousticScore(a);
      if (sortBy === 'WBV Severity (best)') { const o={low:0,mid:1,high:2,highest:3}; return (o[a.hcImpact]||0)-(o[b.hcImpact]||0); }
      return 0;
    });

  const iStyle = { background:'var(--input-bg)', border:'1px solid var(--input-border)', borderRadius:2, padding:'7px 12px', fontSize:12, color:'var(--text)', outline:'none' };
  const sectionLabel = { fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:3, marginBottom:10 };

  const featured = ARTICLES.filter(a => a.slug === 'fortuner-vs-alto' || a.slug === 'civic-vs-corolla');
  const QUICK_COMPARES = [
    { a:'civic_11pk', b:'corolla_12pk', label:'Civic 11th vs Corolla 12th' },
    { a:'fortuner',   b:'prado_250',    label:'Fortuner vs Prado 250' },
    { a:'crv',        b:'tucson',       label:'Honda CR-V vs Tucson' },
  ];

  if (cmpView && cmpList.length === 2) return (
    <>
      <FontLoader/>
      <SiteNav activeHref="/" />
      <CompareView cars={cmpList} onBack={() => setCmpView(false)} />
    </>
  );

  return (
    <>
      <FontLoader/>
      <SiteNav activeHref="/" theme={theme} setTheme={setTheme} extras={
        <button onClick={() => setShowFeedback(true)} style={{ background:'var(--input-bg)', border:'1px solid var(--input-border)', borderRadius:2, padding:'5px 10px', cursor:'pointer', fontSize:9, fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, marginLeft:6 }}>CONTACT</button>
      }/>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:`0 24px ${cmpMode ? '90px' : '0'}` }}>

        {/* ── HERO ─────────────────────────────────────── */}
        <div style={{ padding:'44px 0 28px', borderBottom:'1px solid var(--border)', marginBottom:24 }}>
          <div style={{ maxWidth:680 }}>
            <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:3, marginBottom:12 }}>PAKISTAN VEHICLE COMFORT ANALYSIS</div>
            <h1 style={{ fontSize:44, fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, letterSpacing:1, lineHeight:1, marginBottom:14, color:'var(--text)' }}>WHICH VEHICLE<br/><span style={{ color:'var(--amber)' }}>PROTECTS YOUR BODY?</span></h1>
            <p style={{ fontSize:14, color:'var(--hero-sub)', lineHeight:1.8, marginBottom:14 }}>Every bump, pothole, and vibration your car lets through — measured and scored for {CARS.length} vehicles in Pakistan. Higher score = less harshness reaches you.</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'4px 14px', fontSize:10, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1.5, marginBottom:18 }}>
              <span>✓ {CARS.length} VEHICLES</span>
              <span>✓ ISO 2631-1 STANDARD</span>
              <span>✓ 0 MANUFACTURER RELATIONSHIPS</span>
            </div>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
              {!cmpMode
                ? <button onClick={() => { setCmpMode(true); setSel(null); setCmpList([]); document.getElementById('all-cars')?.scrollIntoView({behavior:'smooth'}); }} style={{ background:'var(--amber)', color:'#fff', border:'none', borderRadius:2, padding:'10px 22px', fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>COMPARE 2 VEHICLES →</button>
                : <span style={{ fontSize:11, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', alignSelf:'center' }}>Compare mode active — select vehicles below</span>
              }
              <Link href="/science" style={{ fontSize:11, color:'var(--amber)', textDecoration:'none', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, alignSelf:'center' }}>HOW SCORES ARE CALCULATED →</Link>
              <a href="#all-cars" style={{ marginLeft:'auto', fontSize:10, color:'var(--text4)', textDecoration:'none', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, alignSelf:'center', borderBottom:'1px dotted var(--text4)' }}>SKIP TO {CARS.length} CARS ↓</a>
            </div>
          </div>
        </div>

        {/* ── WHY THIS EXISTS ────────────────────────── */}
        <div style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderLeft:'3px solid var(--amber)', borderRadius:0, padding:'18px 22px', marginBottom:28 }}>
          <div style={sectionLabel}>WHY THIS EXISTS</div>
          <p style={{ fontSize:14, color:'var(--text2)', lineHeight:1.8, marginBottom:10 }}>Open any car review in Pakistan — PakWheels, Pakdrive, YouTube — and every car gets called <em>"comfortable."</em> The Alto. The Fortuner. The Hilux. All of them. Reviewers grade on mood, not engineering.</p>
          <p style={{ fontSize:14, color:'var(--text2)', lineHeight:1.8, marginBottom:10 }}>I got tired of guessing. So I built an objective ride-comfort model from real suspension specs, tyre data, and the ISO 2631-1 health standard. Same yardstick for every vehicle, regardless of brand or price. The score tells you <em>why</em> one car is better — down to the bushing, the spring, the wheelbase.</p>
          <Link href="/why" style={{ fontSize:11, color:'var(--amber)', textDecoration:'none', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>READ THE FULL STORY →</Link>
        </div>

        {/* ── HOW TO USE ────────────────────────────── */}
        <div style={{ marginBottom:32 }}>
          <div style={sectionLabel}>HOW TO USE THIS</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12 }}>
            {[
              { icon:'🔍', title:'TAP ANY CAR', desc:'Get the 10-stage absorption chain, motion and acoustic breakdown, and the WBV verdict.' },
              { icon:'⚖️', title:'COMPARE 2 CARS', desc:'Side-by-side analysis. See exactly where one beats the other — and by how much.' },
              { icon:'📐', title:'SORT BY WHAT MATTERS', desc:'Overall score, impact, motion, cabin quiet, or WBV severity for long-term health.' },
            ].map(item => (
              <div key={item.title} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:4, padding:'14px 16px' }}>
                <div style={{ fontSize:20, marginBottom:6 }}>{item.icon}</div>
                <div style={{ fontSize:11, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, color:'var(--text)', marginBottom:6 }}>{item.title}</div>
                <p style={{ fontSize:12, color:'var(--text3)', lineHeight:1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Quick compare popular matchups */}
          <div style={{ marginTop:16, padding:'12px 14px', background:'var(--green-dim)', border:'1px solid rgba(26,158,74,.3)', borderRadius:4 }}>
            <div style={{ fontSize:9, color:'var(--green)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:2, marginBottom:8 }}>✦ POPULAR COMPARISONS — ONE CLICK</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {QUICK_COMPARES.map(q => (
                <button key={q.label} onClick={() => startQuickCompare(q.a, q.b)} style={{ background:'var(--bg2)', border:'1px solid var(--green)', borderRadius:2, padding:'7px 14px', fontSize:10, fontWeight:600, cursor:'pointer', fontFamily:'IBM Plex Mono,monospace', color:'var(--green)', letterSpacing:.5 }}>{q.label} →</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── FEATURED ARTICLES ─────────────────────── */}
        <div style={{ marginBottom:32 }}>
          <div style={sectionLabel}>FEATURED ARTICLES</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:14 }}>
            {featured.map(a => (
              <Link key={a.id} href={`/blog/${a.slug}`} style={{ textDecoration:'none' }}>
                <div style={{ background:'var(--bg2)', border:'1px solid var(--card-border)', borderRadius:4, padding:18, cursor:'pointer', position:'relative', overflow:'hidden', transition:'transform .18s ease, border-color .18s ease' }}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.borderColor='var(--card-hover-border)';}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.borderColor='var(--card-border)';}}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,var(--amber),transparent)' }}/>
                  <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:2, marginBottom:8 }}>{a.category} · {a.readTime}</div>
                  <h3 style={{ fontSize:16, fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, letterSpacing:.5, color:'var(--text)', marginBottom:8, lineHeight:1.25 }}>{a.title.toUpperCase()}</h3>
                  <p style={{ fontSize:12, color:'var(--text3)', lineHeight:1.6, marginBottom:10 }}>{a.summary}</p>
                  <div style={{ fontSize:10, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>READ →</div>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/blog" style={{ display:'inline-block', marginTop:12, fontSize:11, color:'var(--amber)', textDecoration:'none', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>ALL ARTICLES →</Link>
        </div>

        {/* ── ALL VEHICLES ──────────────────────────── */}
        <div id="all-cars" style={{ scrollMarginTop:60, paddingTop:8, borderTop:'1px solid var(--border)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', flexWrap:'wrap', gap:8, marginTop:20, marginBottom:16 }}>
            <div>
              <div style={sectionLabel}>BROWSE ALL VEHICLES</div>
              <div style={{ fontSize:24, fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, color:'var(--text)' }}>{CARS.length} CARS RANKED</div>
            </div>
            <div style={{ fontSize:10, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace' }}>{filtered.length} SHOWN · {cat==='All'?'all categories':cat.toUpperCase()}</div>
          </div>

          <div style={{ display:'flex', gap:8, marginBottom:18, flexWrap:'wrap', alignItems:'center' }}>
            <input placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} style={{ ...iStyle, width:200 }}/>
            <select value={cat} onChange={e => setCat(e.target.value)} style={iStyle}>{CATS.map(c => <option key={c}>{c}</option>)}</select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={iStyle}>{SORTS.map(s => <option key={s}>{s}</option>)}</select>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))', gap:10 }}>
            {filtered.map(car => <CarCard key={car.id} car={car} onSelect={setSel} cmpMode={cmpMode} cmpList={cmpList} onCmpToggle={togCmp}/>)}
          </div>
        </div>

        {/* ── DATA SOURCES ──────────────────────────── */}
        <div style={{ marginTop:40, padding:'18px 22px', background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:4 }}>
          <div style={sectionLabel}>DATA SOURCES</div>
          <p style={{ fontSize:12, color:'var(--text3)', lineHeight:1.7, marginBottom:10 }}>Specs verified against manufacturer Pakistan sites (Master Motors, Hyundai Nishat, Honda Atlas, Toyota IMC, Sazgar, Ghandhara), <Link href="https://pakwheels.com" target="_blank" rel="noopener" style={{ color:'var(--amber)' }}>PakWheels.com</Link>, Wikipedia, and international spec sheets (AutoExpress, CarsGuide, paultan.org). Scoring model based on the <strong>ISO 2631-1</strong> whole-body vibration standard and published automotive NVH research.</p>
          <p style={{ fontSize:11, color:'var(--text4)', lineHeight:1.7 }}>No manufacturer relationships, no sponsored placements, no affiliate links. The model is identical for every car regardless of brand or price.</p>
        </div>

        {/* ── SCORE REFERENCE / FORMULA / DISCLAIMER ── */}
        <div style={{ marginTop:32, padding:'24px 0', borderTop:'1px solid var(--border)', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:24 }}>
          <div>
            <div style={sectionLabel}>SCORE REFERENCE</div>
            {[['85+','OPTIMAL','#1A9E4A'],['75–84','EXCELLENT','#1A9E4A'],['65–74','GOOD','#3A8A30'],['55–64','MODERATE','#C87A10'],['45–54','POOR','#B07020'],['<45','CRITICAL','#C03030']].map(([r,l,c]) => (
              <div key={r} style={{ display:'flex', gap:12, alignItems:'center', marginBottom:5 }}>
                <span style={{ fontSize:11, fontWeight:700, color:c, minWidth:36, fontFamily:'IBM Plex Mono,monospace' }}>{r}</span>
                <span style={{ fontSize:10, color:'var(--text3)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:.5 }}>{l}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={sectionLabel}>FORMULA</div>
            <div style={{ fontSize:11, lineHeight:2, fontFamily:'IBM Plex Mono,monospace', background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:2, padding:'10px 14px' }}>
              <span style={{ color:'var(--amber)' }}>S</span>×0.35 + <span style={{ color:'var(--blue)' }}>M</span>×0.40<br/>
              + <span style={{ color:'var(--green)' }}>A</span>×0.25 − <span style={{ color:'var(--red)' }}>P</span><br/>
              = <span style={{ color:'var(--amber)', fontWeight:600 }}>CRCS</span>
            </div>
          </div>
          <div>
            <div style={sectionLabel}>DISCLAIMER</div>
            <p style={{ fontSize:11, lineHeight:1.7, color:'var(--text4)' }}>Engineering estimates, not lab measurements. Japan Import versions scored at ~70% component effectiveness for age-related wear. Same model applied to every vehicle.</p>
          </div>
        </div>
      </div>

      {cmpMode && (
        <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:200, background:'var(--nav-bg)', borderTop:'2px solid var(--green)', padding:'12px 24px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap', boxShadow:'0 -4px 24px rgba(0,0,0,.18)' }}>
          <div style={{ fontSize:9, color:'var(--green)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:2, flexShrink:0 }}>✦ COMPARE</div>
          <div style={{ flex:1, minWidth:160, background:'var(--green-dim)', border:'1px solid rgba(26,158,74,.3)', borderRadius:2, padding:'8px 14px', fontSize:10, color:'var(--green)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:.5 }}>
            {cmpList.length === 0 ? 'TAP ANY 2 VEHICLES TO SELECT' : cmpList.length === 1 ? `${cmpList[0].name.toUpperCase()} — SELECT 1 MORE` : `${cmpList[0].name.toUpperCase()} vs ${cmpList[1].name.toUpperCase()}`}
          </div>
          <div style={{ display:'flex', gap:8, flexShrink:0 }}>
            {cmpList.length === 2 && <button onClick={() => setCmpView(true)} style={{ background:'var(--green)', color:'#fff', border:'none', borderRadius:2, padding:'10px 20px', fontSize:10, fontWeight:700, cursor:'pointer', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>RUN ANALYSIS →</button>}
            <button onClick={() => { setCmpMode(false); setCmpList([]); }} style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:2, padding:'10px 14px', fontSize:10, cursor:'pointer', fontFamily:'IBM Plex Mono,monospace', color:'var(--text3)' }}>CANCEL</button>
          </div>
        </div>
      )}
      {sel && !cmpMode && <DetailDrawer car={sel} onClose={() => setSel(null)} />}
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </>
  );
}
