'use client';
import { useState, useEffect } from 'react';
import { REAR_META, SEV_META, crcs, grade, impactScore, motionScore, acousticScore } from '../data/cars';
import { IMPACT_CHAIN, computeImpactChain, computeMotionChain, computeAcousticChain, MetricChainTable, ShareButton, HelpHover } from './shared';

export default function CompareView({ cars, onBack }) {
  const [exp, setExp] = useState(null);
  const [tab, setTab] = useState('overview');
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 640);
    c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c);
  }, []);

  const chains = cars.map(computeImpactChain);
  const motionChains = cars.map(computeMotionChain);
  const acousticChains = cars.map(computeAcousticChain);
  const COLORS = ['var(--amber)', 'var(--blue)'];
  const CAT_LABELS = { tyre:'01–02  TYRE & WHEEL', susp:'03–05  SUSPENSION', rear:'06–07  REAR SUSPENSION', body:'08–09  CHASSIS & BODY', seat:'10      CABIN' };
  const STAGE_CAT = { tyre:'tyre', rim:'tyre', arm:'susp', shock:'susp', strut:'susp', rear:'rear', rbush:'rear', sub:'body', body:'body', seat:'seat' };
  const sevDiffers = cars[0].hcImpact !== cars[1].hcImpact;
  const scoreDiff = Math.abs(crcs(cars[0]) - crcs(cars[1]));

  const carHeaders = (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
      {cars.map((car, i) => {
        const sc = crcs(car), g = grade(sc), rm = REAR_META[car.rearType];
        const felt = chains[i].slice(-1)[0]?.remaining;
        return (
          <div key={car.id} style={{ background:'var(--bg2)', border:`2px solid ${COLORS[i]}40`, borderRadius:4, padding:'12px', textAlign:'center' }}>
            <div style={{ fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', marginBottom:2 }}>{car.year}</div>
            <div style={{ fontSize:mobile?12:14, fontWeight:700, fontFamily:'Barlow Condensed,sans-serif', letterSpacing:.5, color:'var(--text)', marginBottom:6, lineHeight:1.2 }}>{car.name.toUpperCase()}</div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:4, background:rm.bg, border:`1px solid ${rm.border}`, borderRadius:2, padding:'2px 6px', marginBottom:8 }}>
              <span style={{ color:rm.color, fontSize:8, fontFamily:'IBM Plex Mono,monospace', fontWeight:600 }}>{rm.emoji} {car.rearLabel}</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', borderTop:'1px solid var(--border)', paddingTop:8, gap:2 }}>
              {[
                {l:'CRCS',v:sc,c:g.color,t:'Composite Ride Comfort Score (CRCS), 0–100. Weighted: Impact×0.35 + Motion×0.40 + Acoustic×0.25 minus a Whole-Body Vibration penalty. Higher = better.'},
                {l:'FELT',v:felt,c:felt<=20?'var(--green)':felt<=45?'var(--amber)':'var(--red)',t:'Road energy that reaches the occupant after the 10-stage absorption chain. Lower = better. Floors at 2 (no real vehicle absorbs 100%).'},
                {l:'S',v:impactScore(car),c:'var(--amber)',t:'S = Impact Isolation (0–100). How well the vehicle absorbs sharp jolts — potholes, bumps. Higher = better.'},
                {l:'M',v:motionScore(car),c:'var(--blue)',t:'M = Ride Motion Comfort (0–100). Body float / pitch / rock on undulating roads. Higher = better.'},
                {l:'A',v:acousticScore(car),c:'var(--green)',t:'A = Cabin Acoustic Environment (0–100). Road noise and structural vibration in the cabin. Higher = better.'},
              ].map(m=>(
                <div key={m.l}>
                  <HelpHover text={m.t}>
                    <span style={{ display:'block', textAlign:'center' }}>
                      <span style={{ display:'block', fontSize:mobile?14:18, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:m.c, lineHeight:1 }}>{m.v}</span>
                      <span style={{ display:'inline-block', fontSize:7, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', marginTop:1, borderBottom:'1px dotted var(--text4)' }}>{m.l}</span>
                    </span>
                  </HelpHover>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const tabBar = (
    <div style={{ display:'flex', gap:2, marginBottom:14 }}>
      {[['overview','OVERVIEW'],['impact','IMPACT'],['motion','MOTION'],['acoustic','ACOUSTIC']].map(([id,label])=>(
        <button key={id} onClick={()=>setTab(id)} style={{ flex:1, border:'none', borderRadius:2, padding:'8px 4px', cursor:'pointer', background:tab===id?'var(--bg4)':'var(--bg3)', borderBottom:tab===id?'2px solid var(--amber)':'0', fontSize:mobile?9:10, fontWeight:600, fontFamily:'IBM Plex Mono,monospace', letterSpacing:.5, color:tab===id?'var(--text)':'var(--text3)', transition:'all .12s' }}>{label}</button>
      ))}
    </div>
  );

  return (
    <div style={{ maxWidth:960, margin:'0 auto', padding:`28px ${mobile?12:20}px` }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18, gap:10, flexWrap:'wrap' }}>
        <button onClick={onBack} style={{ display:'flex', alignItems:'center', gap:8, background:'none', border:'none', color:'var(--text3)', cursor:'pointer', fontSize:13, fontFamily:'IBM Plex Mono,monospace' }}>← BACK</button>
        <ShareButton
          url={typeof window!=='undefined'?`${window.location.origin}/?compare=${cars[0].id},${cars[1].id}`:''}
          title={`${cars[0].name} vs ${cars[1].name} — comfort comparison`}
          text={`${cars[0].name} (CRCS ${crcs(cars[0])}) vs ${cars[1].name} (CRCS ${crcs(cars[1])}). Engineering-based ride comfort comparison:`}
          label="SHARE COMPARISON"
          accent="var(--green)"
        />
      </div>
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:3, marginBottom:4 }}>VEHICLE COMPARISON</div>
        <h2 style={{ fontSize:mobile?22:28, fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, letterSpacing:1, color:'var(--text)', marginBottom:4 }}>SIDE-BY-SIDE ANALYSIS</h2>
      </div>

      {carHeaders}
      {tabBar}

      {/* ── OVERVIEW ── */}
      {tab==='overview'&&(
        <div>
          <div style={{ border:'1px solid var(--border2)', borderRadius:4, overflow:'hidden', marginBottom:14 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', background:'var(--compare-header)', padding:'8px 12px', borderBottom:'1px solid var(--border2)' }}>
              <div style={{ fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>METRIC</div>
              {cars.map((car,i)=><div key={car.id} style={{ fontSize:mobile?9:10, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:COLORS[i], textAlign:'center' }}>{mobile?car.name.split(' ').slice(0,2).join(' ').toUpperCase():car.name.toUpperCase()}</div>)}
            </div>
            {[
              { label:'IMPACT ISOLATION', weight:'35%', color:'var(--amber)', get:impactScore },
              { label:'RIDE MOTION', weight:'40%', color:'var(--blue)', get:motionScore },
              { label:'CABIN ACOUSTIC', weight:'25%', color:'var(--green)', get:acousticScore },
            ].map(m=>(
              <div key={m.label} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', padding:'10px 12px', borderBottom:'1px solid var(--border)' }}>
                <div style={{ alignSelf:'center' }}>
                  <div style={{ fontSize:mobile?9:10, color:'var(--text2)', fontWeight:600, fontFamily:'IBM Plex Mono,monospace' }}>{m.label}</div>
                  <div style={{ fontSize:9, color:m.color, fontFamily:'IBM Plex Mono,monospace' }}>{m.weight}</div>
                </div>
                {cars.map((car,i)=>{
                  const val=m.get(car), other=m.get(cars[1-i]);
                  return (
                    <div key={car.id} style={{ textAlign:'center', padding:'0 4px' }}>
                      <div style={{ fontSize:mobile?20:26, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:val>=other?m.color:'var(--text3)', lineHeight:1 }}>{val}</div>
                      <div style={{ height:3, background:'var(--bg4)', borderRadius:1, overflow:'hidden', marginTop:5 }}>
                        <div style={{ height:'100%', width:`${val}%`, background:m.color, borderRadius:1, opacity:val>=other?1:.5 }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', padding:'12px', background:'var(--bg4)', borderTop:'2px solid var(--border2)' }}>
              <div style={{ alignSelf:'center', fontSize:mobile?9:10, fontWeight:700, color:'var(--text2)', fontFamily:'IBM Plex Mono,monospace' }}>CRCS TOTAL</div>
              {cars.map((car,i)=>{ const sc=crcs(car),g=grade(sc); return (
                <div key={car.id} style={{ textAlign:'center' }}>
                  <div style={{ fontSize:mobile?24:32, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:g.color, lineHeight:1 }}>{sc}</div>
                  <div style={{ fontSize:8, color:g.color, fontFamily:'IBM Plex Mono,monospace' }}>{g.label}</div>
                </div>
              );})}
            </div>
          </div>

          <div style={{ marginBottom:14, padding:'12px 14px', background:'var(--amber-dim)', border:'1px solid rgba(200,122,16,.3)', borderRadius:4 }}>
            <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:2, marginBottom:8 }}>ISO 2631-1 WBV CHARACTER</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {cars.map((car,i)=>{ const sev=SEV_META[car.hcImpact]; return (
                <div key={car.id} style={{ background:'var(--bg2)', border:`1px solid ${COLORS[i]}30`, borderRadius:4, padding:'10px 12px' }}>
                  <div style={{ fontSize:mobile?9:10, fontWeight:700, color:COLORS[i], fontFamily:'IBM Plex Mono,monospace', marginBottom:4 }}>{car.name.toUpperCase()}</div>
                  <div style={{ fontSize:10, color:sev.color, fontFamily:'IBM Plex Mono,monospace', marginBottom:4 }}>WBV: {sev.label.toUpperCase()}</div>
                  <p style={{ fontSize:11, color:'var(--text2)', lineHeight:1.6, margin:0 }}>{sev.desc}</p>
                </div>
              );})}
            </div>
            {scoreDiff<=8&&sevDiffers&&<p style={{ fontSize:10, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', marginTop:10, marginBottom:0 }}>Low-frequency (4–8 Hz) high-amplitude impacts correlate with lumbar loading per WHO whole-body vibration guidelines.</p>}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {cars.map((car,i)=>{
              const final=chains[i].slice(-1)[0]?.remaining, g=grade(crcs(car));
              const worst=[...chains[i]].filter(s=>s.pts<0).sort((a,b)=>a.pts-b.pts)[0];
              const best=[...chains[i]].filter(s=>s.pts>0).sort((a,b)=>b.pts-a.pts)[0];
              return (
                <div key={car.id} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:4, padding:12 }}>
                  <div style={{ fontSize:9, color:COLORS[i], fontFamily:'IBM Plex Mono,monospace', marginBottom:4 }}>{car.name.toUpperCase()}</div>
                  <div style={{ fontSize:18, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:g.color, marginBottom:10 }}>{final}/100 FELT</div>
                  {worst&&<div style={{ background:'var(--red-dim)', border:'1px solid rgba(192,48,48,.25)', borderRadius:3, padding:'8px 10px', marginBottom:8 }}><div style={{ fontSize:8, color:'var(--red)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, marginBottom:2 }}>PRIMARY WEAKNESS</div><div style={{ fontSize:11, color:'var(--text2)' }}>{worst.label} +{Math.abs(worst.pts)} units added</div></div>}
                  {best&&<div style={{ background:'var(--green-dim)', border:'1px solid rgba(26,158,74,.25)', borderRadius:3, padding:'8px 10px' }}><div style={{ fontSize:8, color:'var(--green)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, marginBottom:2 }}>PRIMARY STRENGTH</div><div style={{ fontSize:11, color:'var(--text2)' }}>{best.label} −{best.pts} units absorbed</div></div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── IMPACT ── (shown in overview too) */}
      {(tab==='overview'||tab==='impact')&&(
        <div style={{ marginTop: tab==='overview' ? 28 : 0 }}>
          {tab==='overview' && (
            <div style={{ marginBottom:14, borderTop:'1px solid var(--border)', paddingTop:18 }}>
              <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:3, marginBottom:6 }}>IMPACT CHAIN · 35% WEIGHT</div>
              <div style={{ fontSize:18, fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, color:'var(--text)' }}>Road-to-occupant absorption</div>
            </div>
          )}
          <p style={{ fontSize:12, color:'var(--text2)', lineHeight:1.7, marginBottom:12 }}>100 units of normalized impact energy. Each component absorbs some — or adds some back. Tap any row to see why the scores differ between these two vehicles.</p>
          <div style={{ overflowX:'auto', WebkitOverflowScrolling:'touch' }}>
            <div style={{ minWidth:480 }}>
              <div style={{ border:'1px solid var(--border2)', borderRadius:4, overflow:'hidden' }}>
                <div style={{ display:'grid', gridTemplateColumns:'200px 1fr 1fr', background:'var(--compare-header)', padding:'8px 0', borderBottom:'1px solid var(--border2)' }}>
                  <div style={{ padding:'0 14px', fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:2 }}>COMPONENT</div>
                  {cars.map((car,i)=><div key={car.id} style={{ padding:'0 10px', fontSize:10, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:COLORS[i], textAlign:'center' }}>{car.name.toUpperCase()}</div>)}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'200px 1fr 1fr', background:'var(--chain-start-bg)', borderBottom:'2px solid var(--border2)', padding:'8px 0' }}>
                  <div style={{ padding:'0 14px' }}><div style={{ fontSize:10, color:'var(--text2)', fontFamily:'IBM Plex Mono,monospace' }}>ROAD INPUT</div><div style={{ fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace' }}>Normalized: 100</div></div>
                  {cars.map((_,i)=><div key={i} style={{ textAlign:'center', fontSize:22, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:'var(--text)' }}>100</div>)}
                </div>
                {IMPACT_CHAIN.map((stageDef, idx) => {
                  const cat=STAGE_CAT[stageDef.id], cm=CAT_LABELS[cat];
                  const stageData=chains.map(ch=>ch.find(s=>s.id===stageDef.id));
                  const isExp=exp===stageDef.id;
                  const prevCat=idx>0?STAGE_CAT[IMPACT_CHAIN[idx-1].id]:null;
                  const ptsA=stageDef.getPoints(cars[0]), ptsB=stageDef.getPoints(cars[1]);
                  const comparativeNote=(Math.abs(ptsA-ptsB)>0&&stageDef.getComparativeNote)?stageDef.getComparativeNote(cars[0],cars[1]):null;
                  return (
                    <div key={stageDef.id}>
                      {cat!==prevCat&&cm&&<div style={{ background:'var(--chain-start-bg)', borderTop:'1px solid var(--border2)', borderBottom:'1px solid var(--border)', padding:'4px 14px', fontSize:9, fontWeight:700, color:'var(--cat-label)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:2 }}>{cm}</div>}
                      <div onClick={()=>setExp(isExp?null:stageDef.id)} style={{ display:'grid', gridTemplateColumns:'200px 1fr 1fr', borderBottom:'1px solid var(--border)', cursor:'pointer', background:stageDef.isKey?'var(--green-dim)':isExp?'var(--expand-bg)':'var(--bg2)', borderLeft:`2px solid ${stageDef.isKey?'var(--green)':'transparent'}` }}>
                        <div style={{ padding:'10px 14px' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                            <span style={{ fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace' }}>{stageDef.icon}</span>
                            <span style={{ fontSize:11, color:stageDef.isKey?'var(--text)':'var(--text2)', fontWeight:stageDef.isKey?600:400 }}>{stageDef.label}</span>
                            {stageDef.isKey&&<span style={{ fontSize:7, color:'var(--green)', border:'1px solid var(--green)', borderRadius:2, padding:'0 4px', fontFamily:'IBM Plex Mono,monospace', opacity:.7 }}>KEY</span>}
                          </div>
                          <div style={{ fontSize:9, color:'var(--amber)', marginTop:3, fontFamily:'IBM Plex Mono,monospace' }}>↓ tap</div>
                        </div>
                        {stageData.map((stage,i)=>{
                          if(!stage)return<div key={i}/>;
                          const isAdding=stage.pts<0;
                          return(
                            <div key={i} style={{ padding:'10px 8px', textAlign:'center', borderLeft:i>0?'1px solid var(--border)':'none' }}>
                              <div style={{ fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', marginBottom:3, lineHeight:1.3 }}>{stage.note}</div>
                              <div style={{ fontSize:13, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:isAdding?'var(--red)':stage.pts===0?'var(--text4)':'var(--green)', marginBottom:3 }}>{isAdding?`+${Math.abs(stage.pts)}`:stage.pts===0?'—':`-${stage.pts}`}</div>
                              <div style={{ fontSize:16, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:stage.remaining<=20?'var(--green)':stage.remaining<=45?'var(--amber)':'var(--red)' }}>{stage.remaining}</div>
                            </div>
                          );
                        })}
                      </div>
                      {isExp&&(
                        <div style={{ background:'var(--expand-bg)', borderBottom:'2px solid var(--border2)' }}>
                          <div style={{ display:'grid', gridTemplateColumns:'200px 1fr 1fr' }}>
                            <div style={{ padding:12, borderRight:'1px solid var(--border)' }}>
                              <div style={{ fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', marginBottom:4, letterSpacing:1 }}>FUNCTION</div>
                              <p style={{ fontSize:11, color:'var(--text2)', lineHeight:1.7 }}>{stageDef.whatIs}</p>
                              {comparativeNote&&(
                                <div style={{ marginTop:10, padding:'8px 10px', background:'var(--amber-dim)', border:'1px solid rgba(200,122,16,.2)', borderRadius:3 }}>
                                  <div style={{ fontSize:8, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, marginBottom:4 }}>WHY THE SCORES DIFFER</div>
                                  <p style={{ fontSize:11, color:'var(--text2)', lineHeight:1.7 }}>{comparativeNote}</p>
                                </div>
                              )}
                            </div>
                            {stageData.map((stage,i)=>(
                              <div key={i} style={{ padding:12, borderRight:i===0?'1px solid var(--border)':'none' }}>
                                <div style={{ fontSize:9, fontFamily:'IBM Plex Mono,monospace', color:COLORS[i], marginBottom:4, letterSpacing:1 }}>{cars[i].name.toUpperCase()}</div>
                                <p style={{ fontSize:11, color:'var(--text)', lineHeight:1.7 }}>{stage?.reason}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div style={{ display:'grid', gridTemplateColumns:'200px 1fr 1fr', background:'var(--bg4)', padding:'14px 0', borderTop:'2px solid var(--border2)' }}>
                  <div style={{ padding:'0 14px' }}><div style={{ fontSize:9, color:'var(--text3)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:2 }}>OCCUPANT FELT INTENSITY</div></div>
                  {cars.map((_,i)=>{
                    const final=chains[i].slice(-1)[0]?.remaining, col=final<=15?'var(--green)':final<=40?'var(--amber)':'var(--red)';
                    return(
                      <div key={i} style={{ textAlign:'center', borderLeft:i>0?'1px solid var(--border2)':'none' }}>
                        <div style={{ fontSize:34, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:col, lineHeight:1 }}>{final}</div>
                        <div style={{ fontSize:8, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', marginTop:3 }}>{100-final}% ABSORBED</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MOTION ── (shown in overview too) */}
      {(tab==='overview'||tab==='motion')&&(
        <div style={{ marginTop: tab==='overview' ? 28 : 0 }}>
          {tab==='overview' && (
            <div style={{ marginBottom:14, borderTop:'1px solid var(--border)', paddingTop:18 }}>
              <div style={{ fontSize:9, color:'var(--blue)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:3, marginBottom:6 }}>MOTION CHAIN · 40% WEIGHT</div>
              <div style={{ fontSize:18, fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, color:'var(--text)' }}>Body motion control</div>
            </div>
          )}
          <div style={{ background:'var(--blue-dim)', border:'1px solid rgba(42,110,200,.3)', borderRadius:4, padding:'12px 14px', marginBottom:14 }}>
            <div style={{ fontSize:9, color:'var(--blue)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:2, marginBottom:4 }}>RIDE MOTION COMFORT · 40% WEIGHT</div>
            <p style={{ fontSize:12, color:'var(--text2)', lineHeight:1.7, margin:0 }}>Body motion quality — pitch, roll, and vertical acceleration in the 0.5–8 Hz range of maximum human vestibular sensitivity. Determines what occupants describe as softness.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:mobile?'1fr':'1fr 1fr', gap:14 }}>
            {cars.map((car,i)=>(
              <div key={car.id}>
                <div style={{ fontSize:10, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:COLORS[i], marginBottom:8, padding:'6px 10px', background:'var(--bg3)', borderRadius:2, borderLeft:`3px solid ${COLORS[i]}` }}>{car.name.toUpperCase()} · MOTION {motionScore(car)}/100</div>
                <MetricChainTable chain={motionChains[i]} color="var(--blue)"/>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ACOUSTIC ── (shown in overview too) */}
      {(tab==='overview'||tab==='acoustic')&&(
        <div style={{ marginTop: tab==='overview' ? 28 : 0 }}>
          {tab==='overview' && (
            <div style={{ marginBottom:14, borderTop:'1px solid var(--border)', paddingTop:18 }}>
              <div style={{ fontSize:9, color:'var(--green)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:3, marginBottom:6 }}>ACOUSTIC CHAIN · 25% WEIGHT</div>
              <div style={{ fontSize:18, fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, color:'var(--text)' }}>Cabin noise &amp; vibration</div>
            </div>
          )}
          <div style={{ background:'var(--green-dim)', border:'1px solid rgba(26,158,74,.3)', borderRadius:4, padding:'12px 14px', marginBottom:14 }}>
            <div style={{ fontSize:9, color:'var(--green)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:2, marginBottom:4 }}>CABIN ACOUSTIC ENV · 25% WEIGHT</div>
            <p style={{ fontSize:12, color:'var(--text2)', lineHeight:1.7, margin:0 }}>Structure-borne vibration and airborne noise in the occupied cabin. Covers the 20–250 Hz NVH perception range. Most perceptible on sustained highway driving.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:mobile?'1fr':'1fr 1fr', gap:14 }}>
            {cars.map((car,i)=>(
              <div key={car.id}>
                <div style={{ fontSize:10, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:COLORS[i], marginBottom:8, padding:'6px 10px', background:'var(--bg3)', borderRadius:2, borderLeft:`3px solid ${COLORS[i]}` }}>{car.name.toUpperCase()} · ACOUSTIC {acousticScore(car)}/100</div>
                <MetricChainTable chain={acousticChains[i]} color="var(--green)"/>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
