'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CARS, ARTICLES, CATS, SORTS, REAR_META, SEV_META, IMPACT_PENALTY, FEEDBACK_URL, SITE_NAME, crcs, grade } from '../data/cars';
import { FontLoader, Bar, ImpactChainTable, MetricChainTable, computeMotionChain, computeAcousticChain, computeImpactChain } from './shared';
import DetailDrawer from './DetailDrawer';
import CompareView from './CompareView';
import FeedbackModal from './FeedbackModal';

function CarCard({ car, onSelect, cmpList, onCmpToggle, cmpMode }) {
  const score = crcs(car), g = grade(score), rm = REAR_META[car.rearType];
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
        <div style={{ textAlign:'right', flexShrink:0 }}>
          <div style={{ fontSize:28, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:g.color, lineHeight:1 }}>{score}</div>
          <div style={{ fontSize:8, color:g.color, fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>{g.label}</div>
        </div>
      </div>
      <div style={{ display:'inline-flex', alignItems:'center', gap:4, background:rm.bg, border:`1px solid ${rm.border}`, borderRadius:2, padding:'2px 8px', marginBottom:10 }}>
        <span style={{ color:rm.color, fontSize:9, fontFamily:'IBM Plex Mono,monospace', fontWeight:600 }}>{rm.emoji} {car.rearLabel}</span>
      </div>
      {[{l:'IMPACT',v:car.s,c:'var(--amber)'},{l:'MOTION',v:car.f,c:'var(--blue)'},{l:'ACOUSTIC',v:car.n,c:'var(--green)'}].map(item => (
        <div key={item.l} style={{ marginBottom:5 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
            <span style={{ fontSize:8, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>{item.l}</span>
            <span style={{ fontSize:9, fontWeight:600, fontFamily:'IBM Plex Mono,monospace', color:item.c }}>{item.v}</span>
          </div>
          <Bar val={item.v} color={item.c} height={2} />
        </div>
      ))}
      {!cmpMode && <div style={{ marginTop:8, fontSize:8, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, borderTop:'1px solid var(--border)', paddingTop:6 }}>TAP FOR ANALYSIS ↗</div>}
      <div style={{ fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', marginTop:cmpMode?8:0 }}>{car.cat}</div>
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

  const togCmp = car => {
    if (cmpList.some(c => c.id === car.id)) setCmpList(p => p.filter(c => c.id !== car.id));
    else if (cmpList.length < 2) setCmpList(p => [...p, car]);
  };

  const filtered = CARS
    .filter(c => cat === 'All' || c.cat === cat)
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.year.includes(search))
    .sort((a, b) => {
      if (sortBy === 'Overall Score')       return crcs(b) - crcs(a);
      if (sortBy === 'Impact Isolation')     return b.s - a.s;
      if (sortBy === 'Ride Motion')          return b.f - a.f;
      if (sortBy === 'Cabin Quiet')          return b.n - a.n;
      if (sortBy === 'WBV Severity (best)') { const o={low:0,mid:1,high:2,highest:3}; return (o[a.hcImpact]||0)-(o[b.hcImpact]||0); }
      return 0;
    });

  const iStyle = { background:'var(--input-bg)', border:'1px solid var(--input-border)', borderRadius:2, padding:'7px 12px', fontSize:12, color:'var(--text)', outline:'none' };

  if (cmpView && cmpList.length === 2) return (
    <>
      <FontLoader/>
      <nav style={{ background:'var(--nav-bg)', borderBottom:'1px solid var(--border)', padding:'0 24px', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ maxWidth:960, margin:'0 auto', display:'flex', alignItems:'center', height:52 }}>
          <Link href="/" style={{ fontSize:18, fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, letterSpacing:2, color:'var(--amber)', textDecoration:'none' }}>
            CAR<span style={{ color:'var(--text3)' }}>COMFORTSCORE</span>
          </Link>
        </div>
      </nav>
      <CompareView cars={cmpList} onBack={() => setCmpView(false)} />
    </>
  );

  return (
    <>
      <FontLoader/>
      <nav style={{ background:'var(--nav-bg)', borderBottom:'1px solid var(--border)', padding:'0 24px', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', height:52, justifyContent:'space-between' }}>
          <Link href="/" style={{ fontSize:18, fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, letterSpacing:2, color:'var(--amber)', textDecoration:'none' }}>
            CAR<span style={{ color:'var(--text3)' }}>COMFORTSCORE</span>
          </Link>
          <div style={{ display:'flex', gap:2, alignItems:'center' }}>
            {[['/', 'RANKINGS'], ['/blog', 'ARTICLES'], ['/science', 'METHODOLOGY'], ['/why', 'WHY THIS EXISTS']].map(([href, l]) => (
              <Link key={href} href={href} style={{ background:'none', border:'none', padding:'8px 12px', cursor:'pointer', fontSize:10, fontWeight:600, fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, color:'var(--text3)', textDecoration:'none', borderBottom:'2px solid transparent' }}>{l}</Link>
            ))}
            <button onClick={() => setShowFeedback(true)} style={{ ...iStyle, padding:'5px 10px', cursor:'pointer', fontSize:9, fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, marginLeft:6 }}>CONTRIBUTE</button>
            <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} style={{ ...iStyle, padding:'5px 10px', cursor:'pointer', fontSize:12, marginLeft:4 }}>{theme === 'light' ? '🌙' : '☀️'}</button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>
        <div style={{ padding:'48px 0 32px', borderBottom:'1px solid var(--border)', marginBottom:24 }}>
          <div style={{ maxWidth:620 }}>
            <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:3, marginBottom:12 }}>PAKISTAN VEHICLE COMFORT ANALYSIS · 2024–25</div>
            <h1 style={{ fontSize:44, fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, letterSpacing:1, lineHeight:1, marginBottom:14, color:'var(--text)' }}>WHICH VEHICLE<br/><span style={{ color:'var(--amber)' }}>PROTECTS YOUR BODY?</span></h1>
            <p style={{ fontSize:14, color:'var(--hero-sub)', lineHeight:1.9, marginBottom:22 }}>Engineering-based ride quality scores across 55 vehicles. Based on ISO 2631-1 whole-body vibration standards. Tap any vehicle for a full component-by-component analysis.</p>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              {!cmpMode ? (
                <button onClick={() => { setCmpMode(true); setSel(null); setCmpList([]); }} style={{ background:'var(--amber)', color:'#fff', border:'none', borderRadius:2, padding:'10px 22px', fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>COMPARE 2 VEHICLES →</button>
              ) : (
                <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
                  <div style={{ background:'var(--green-dim)', border:'1px solid rgba(26,158,74,.3)', borderRadius:2, padding:'8px 14px', fontSize:10, color:'var(--green)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:.5 }}>
                    {cmpList.length === 0 ? 'SELECT 2 VEHICLES' : cmpList.length === 1 ? `${cmpList[0].name.toUpperCase()} — SELECT 1 MORE` : `${cmpList[0].name.toUpperCase()} vs ${cmpList[1].name.toUpperCase()}`}
                  </div>
                  {cmpList.length === 2 && <button onClick={() => setCmpView(true)} style={{ background:'var(--green)', color:'#fff', border:'none', borderRadius:2, padding:'8px 18px', fontSize:10, fontWeight:700, cursor:'pointer', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>RUN ANALYSIS →</button>}
                  <button onClick={() => { setCmpMode(false); setCmpList([]); }} style={{ ...iStyle, padding:'8px 14px', fontSize:10, cursor:'pointer', fontFamily:'IBM Plex Mono,monospace' }}>CANCEL</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {cmpMode && <div style={{ background:'var(--green-dim)', border:'1px solid rgba(26,158,74,.25)', borderRadius:2, padding:'10px 16px', marginBottom:12, fontSize:10, color:'var(--green)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:.5 }}>✦ COMPARE MODE · SELECT ANY 2 VEHICLES · THEN TAP "RUN ANALYSIS"</div>}

        <div style={{ display:'flex', gap:6, marginBottom:14, flexWrap:'wrap' }}>
          {Object.entries(REAR_META).map(([k, v]) => (
            <div key={k} style={{ display:'inline-flex', alignItems:'center', gap:4, background:v.bg, border:`1px solid ${v.border}`, borderRadius:2, padding:'3px 10px' }}>
              <span style={{ color:v.color, fontSize:9, fontFamily:'IBM Plex Mono,monospace', fontWeight:600 }}>{v.emoji} {v.label.toUpperCase()}</span>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', gap:8, marginBottom:18, flexWrap:'wrap', alignItems:'center' }}>
          <input placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} style={{ ...iStyle, width:200 }}/>
          <select value={cat} onChange={e => setCat(e.target.value)} style={iStyle}>{CATS.map(c => <option key={c}>{c}</option>)}</select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={iStyle}>{SORTS.map(s => <option key={s}>{s}</option>)}</select>
          <div style={{ marginLeft:'auto', fontSize:10, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace' }}>{filtered.length} VEHICLES</div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))', gap:10 }}>
          {filtered.map(car => <CarCard key={car.id} car={car} onSelect={setSel} cmpMode={cmpMode} cmpList={cmpList} onCmpToggle={togCmp}/>)}
        </div>

        <div style={{ marginTop:48, padding:'24px 0', borderTop:'1px solid var(--border)', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:24 }}>
          <div>
            <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:2, marginBottom:10 }}>SCORE REFERENCE</div>
            {[['85+','OPTIMAL','#1A9E4A'],['75–84','EXCELLENT','#1A9E4A'],['65–74','GOOD','#3A8A30'],['55–64','MODERATE','#C87A10'],['45–54','POOR','#B07020'],['<45','CRITICAL','#C03030']].map(([r,l,c]) => (
              <div key={r} style={{ display:'flex', gap:12, alignItems:'center', marginBottom:5 }}>
                <span style={{ fontSize:11, fontWeight:700, color:c, minWidth:36, fontFamily:'IBM Plex Mono,monospace' }}>{r}</span>
                <span style={{ fontSize:10, color:'var(--text3)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:.5 }}>{l}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:2, marginBottom:10 }}>FORMULA</div>
            <div style={{ fontSize:11, lineHeight:2, fontFamily:'IBM Plex Mono,monospace', background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:2, padding:'10px 14px' }}>
              <span style={{ color:'var(--amber)' }}>S</span>×0.35 + <span style={{ color:'var(--blue)' }}>M</span>×0.40<br/>
              + <span style={{ color:'var(--green)' }}>A</span>×0.25 − <span style={{ color:'var(--red)' }}>P</span><br/>
              = <span style={{ color:'var(--amber)', fontWeight:600 }}>CRCS</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:2, marginBottom:10 }}>DISCLAIMER</div>
            <p style={{ fontSize:11, lineHeight:1.7, color:'var(--text4)' }}>Engineering estimates. Not lab measurements. JDM imports at ~70% component effectiveness. Same model for all vehicles. No manufacturer relationships.</p>
          </div>
        </div>
      </div>

      {sel && !cmpMode && <DetailDrawer car={sel} onClose={() => setSel(null)} />}
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </>
  );
}
