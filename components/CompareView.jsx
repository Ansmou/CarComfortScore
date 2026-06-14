'use client';
import { useState } from 'react';
import { REAR_META, SEV_META, crcs, grade } from '../data/cars';
import { IMPACT_CHAIN, computeImpactChain } from './shared';

export default function CompareView({ cars, onBack }) {
  const [exp, setExp] = useState(null);
  const chains = cars.map(computeImpactChain);
  const COLORS = ['var(--amber)', 'var(--blue)'];
  const CAT_LABELS = { tyre:'01–02  TYRE & WHEEL', susp:'03–05  SUSPENSION', rear:'06–07  REAR SUSPENSION', body:'08–09  CHASSIS & BODY', seat:'10      CABIN' };
  const STAGE_CAT = { tyre:'tyre', rim:'tyre', arm:'susp', shock:'susp', strut:'susp', rear:'rear', rbush:'rear', sub:'body', body:'body', seat:'seat' };
  const sevDiffers = cars[0].hcImpact !== cars[1].hcImpact;
  const scoreDiff = Math.abs(crcs(cars[0]) - crcs(cars[1]));

  return (
    <div style={{ maxWidth:960, margin:'0 auto', padding:'28px 20px' }}>
      <button onClick={onBack} style={{ display:'flex', alignItems:'center', gap:8, background:'none', border:'none', color:'var(--text3)', cursor:'pointer', fontSize:13, marginBottom:20, fontFamily:'IBM Plex Mono,monospace' }}>← BACK</button>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:3, marginBottom:6 }}>IMPACT TRANSMISSION ANALYSIS</div>
        <h2 style={{ fontSize:28, fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, letterSpacing:1, color:'var(--text)', marginBottom:6 }}>ROAD TO OCCUPANT</h2>
        <p style={{ fontSize:13, color:'var(--text2)', maxWidth:520, lineHeight:1.7 }}>100 units of normalized impact energy. Each component absorbs some — or adds some back. Tap any row to see why the scores differ between these two vehicles.</p>
      </div>

      {/* Car header cards — exactly aligned to chain columns */}
      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr 1fr', gap:10, marginBottom:12 }}>
        <div/>
        {cars.map((car, i) => {
          const sc=crcs(car), g=grade(sc), rm=REAR_META[car.rearType], final=chains[i].slice(-1)[0]?.remaining;
          return (
            <div key={car.id} style={{ background:'var(--bg2)', border:`1px solid ${COLORS[i]}40`, borderRadius:4, padding:'12px', textAlign:'center' }}>
              <div style={{ fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', marginBottom:2 }}>{car.year}</div>
              <div style={{ fontSize:14, fontWeight:700, fontFamily:'Barlow Condensed,sans-serif', letterSpacing:.5, color:'var(--text)', marginBottom:8, lineHeight:1.2 }}>{car.name.toUpperCase()}</div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:4, background:rm.bg, border:`1px solid ${rm.border}`, borderRadius:2, padding:'2px 8px', marginBottom:10 }}>
                <span style={{ color:rm.color, fontSize:9, fontFamily:'IBM Plex Mono,monospace', fontWeight:600 }}>{rm.emoji} {car.rearLabel}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-around', borderTop:'1px solid var(--border)', paddingTop:8 }}>
                <div><div style={{ fontSize:20, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:g.color, lineHeight:1 }}>{sc}</div><div style={{ fontSize:8, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', marginTop:1 }}>CRCS</div></div>
                <div><div style={{ fontSize:20, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:final<=20?'var(--green)':final<=45?'var(--amber)':'var(--red)', lineHeight:1 }}>{final}</div><div style={{ fontSize:8, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', marginTop:1 }}>FELT</div></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* WBV character explainer */}
      {scoreDiff<=8&&sevDiffers&&(
        <div style={{ marginBottom:14, padding:'14px 18px', background:'var(--amber-dim)', border:'1px solid rgba(200,122,16,.3)', borderRadius:4 }}>
          <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:2, marginBottom:8 }}>⚠ SIMILAR CRCS — DIFFERENT WBV CHARACTER</div>
          <p style={{ fontSize:12, color:'var(--text2)', lineHeight:1.8, marginBottom:10 }}>These vehicles produce similar composite scores but fundamentally different vibration profiles. Per ISO 2631-1, impact character affects health outcomes independently of magnitude.</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:8 }}>
            {cars.map((car, i) => { const sev=SEV_META[car.hcImpact]; return (
              <div key={car.id} style={{ background:'var(--bg2)', border:`1px solid ${COLORS[i]}30`, borderRadius:4, padding:'10px 12px' }}>
                <div style={{ fontSize:10, fontWeight:700, color:COLORS[i], fontFamily:'IBM Plex Mono,monospace', marginBottom:4 }}>{car.name.toUpperCase()}</div>
                <div style={{ fontSize:10, color:sev.color, fontFamily:'IBM Plex Mono,monospace', marginBottom:4 }}>WBV: {sev.label.toUpperCase()}</div>
                <p style={{ fontSize:11, color:'var(--text2)', lineHeight:1.6 }}>{sev.desc}</p>
              </div>
            ); })}
          </div>
          <p style={{ fontSize:10, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', lineHeight:1.6 }}>Low-frequency (4–8 Hz) high-amplitude impacts correlate with lumbar loading per WHO whole-body vibration guidelines.</p>
        </div>
      )}

      {/* Chain table */}
      <div style={{ border:'1px solid var(--border2)', borderRadius:4, overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'220px 1fr 1fr', background:'var(--compare-header)', padding:'8px 0', borderBottom:'1px solid var(--border2)' }}>
          <div style={{ padding:'0 14px', fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:2 }}>COMPONENT</div>
          {cars.map((car,i)=><div key={car.id} style={{ padding:'0 10px', fontSize:10, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:COLORS[i], textAlign:'center' }}>{car.name.toUpperCase()}</div>)}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'220px 1fr 1fr', background:'var(--chain-start-bg)', borderBottom:'2px solid var(--border2)', padding:'8px 0' }}>
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
              <div onClick={()=>setExp(isExp?null:stageDef.id)} style={{ display:'grid', gridTemplateColumns:'220px 1fr 1fr', borderBottom:'1px solid var(--border)', cursor:'pointer', background:stageDef.isKey?'var(--green-dim)':isExp?'var(--expand-bg)':'var(--bg2)', borderLeft:`2px solid ${stageDef.isKey?'var(--green)':'transparent'}` }}>
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
                  <div style={{ display:'grid', gridTemplateColumns:'220px 1fr 1fr' }}>
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

        <div style={{ display:'grid', gridTemplateColumns:'220px 1fr 1fr', background:'var(--bg4)', padding:'14px 0', borderTop:'2px solid var(--border2)' }}>
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

      {/* Verdict */}
      <div style={{ marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        {cars.map((car,i)=>{
          const final=chains[i].slice(-1)[0]?.remaining, g=grade(crcs(car));
          const worst=[...chains[i]].filter(s=>s.pts<0).sort((a,b)=>a.pts-b.pts)[0];
          const best=[...chains[i]].filter(s=>s.pts>0).sort((a,b)=>b.pts-a.pts)[0];
          return(
            <div key={car.id} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:4, padding:14 }}>
              <div style={{ fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', marginBottom:4 }}>{car.name.toUpperCase()}</div>
              <div style={{ fontSize:20, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:g.color, marginBottom:10 }}>{final}/100 FELT</div>
              {worst&&<div style={{ background:'var(--red-dim)', border:'1px solid rgba(192,48,48,.25)', borderRadius:3, padding:'8px 10px', marginBottom:8 }}><div style={{ fontSize:8, color:'var(--red)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, marginBottom:2 }}>PRIMARY WEAKNESS</div><div style={{ fontSize:11, color:'var(--text2)' }}>{worst.label} +{Math.abs(worst.pts)} units added</div></div>}
              {best&&<div style={{ background:'var(--green-dim)', border:'1px solid rgba(26,158,74,.25)', borderRadius:3, padding:'8px 10px' }}><div style={{ fontSize:8, color:'var(--green)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, marginBottom:2 }}>PRIMARY STRENGTH</div><div style={{ fontSize:11, color:'var(--text2)' }}>{best.label} −{best.pts} units absorbed</div></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
