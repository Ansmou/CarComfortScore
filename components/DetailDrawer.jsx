'use client';
import { useState, useEffect } from 'react';
import { REAR_META, SEV_META, IMPACT_PENALTY, crcs, grade, impactScore, motionScore, acousticScore } from '../data/cars';
import { ImpactChainTable, MetricChainTable, computeImpactChain, computeMotionChain, computeAcousticChain } from './shared';

export default function DetailDrawer({ car, onClose }) {
  const [tab, setTab] = useState('overview');
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const score = crcs(car), g = grade(score), rm = REAR_META[car.rearType], sev = SEV_META[car.hcImpact];
  const impFinal = computeImpactChain(car).slice(-1)[0]?.remaining ?? 0;
  const sVal = impactScore(car), fVal = motionScore(car), nVal = acousticScore(car);

  const METRICS = [
    { id:'impact',   label:'Impact Isolation',    short:'IMPACT',   score:sVal, color:'var(--amber)',  weight:'35%',
      desc:'How effectively the vehicle attenuates discrete high-energy inputs — potholes, stone strikes, road discontinuities. Based on ISO 2631-1 vertical impact response.',
      highlight:`${impFinal}/100 normalized input energy reaches the occupant.` },
    { id:'motion',   label:'Ride Motion Comfort',  short:'MOTION',   score:fVal, color:'var(--blue)',   weight:'40%',
      desc:'Body motion quality — pitch, roll, and vertical acceleration in the 0.5–8 Hz range of maximum human vestibular sensitivity. Determines what occupants describe as softness.',
      highlight:`${car.springTuning==='comfort'?'Comfort-calibrated springs — optimised for road texture attenuation.':car.springTuning==='truck'?'Truck-calibrated springs — for payload, not comfort.':'Standard spring calibration.'}` },
    { id:'acoustic', label:'Cabin Acoustic Env.',   short:'ACOUSTIC', score:nVal, color:'var(--green)',  weight:'25%',
      desc:'Structure-borne vibration and airborne noise in the occupied cabin. Covers the 20–250 Hz NVH perception range. Most perceptible on sustained highway driving.',
      highlight:`${car.platformAge==='new'?'Current-platform NVH specification.':car.platformAge==='old'?'Legacy NVH specification.':'Mid-generation NVH.'}` },
  ];

  return (
    <div style={{ position:'fixed',inset:0,zIndex:1000,...(isMobile?{}:{display:'flex',justifyContent:'flex-end'}) }} onClick={onClose}>
      <div style={{ width:isMobile?'100vw':'min(640px,100vw)',height:'100vh',background:'var(--bg2)',borderLeft:isMobile?'none':'1px solid var(--border2)',overflowY:'auto',boxShadow:'-20px 0 60px rgba(0,0,0,.3)',animation:isMobile?'slideUp .3s ease both':'slideRight .3s ease both' }} onClick={e=>e.stopPropagation()}>
        <style>{`@keyframes slideRight{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>

        <div style={{ position:'sticky',top:0,background:'var(--bg2)',borderBottom:'1px solid var(--border2)',zIndex:10,padding:'16px 20px' }}>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10 }}>
            <div>
              <div style={{ fontSize:9,color:'var(--text4)',fontFamily:'IBM Plex Mono,monospace',letterSpacing:2,marginBottom:3 }}>{car.year} · {car.market}</div>
              <h3 style={{ fontSize:20,fontFamily:'Barlow Condensed,sans-serif',fontWeight:700,letterSpacing:.5,color:'var(--text)',lineHeight:1.1 }}>{car.name.toUpperCase()}</h3>
            </div>
            <div style={{ display:'flex',alignItems:'center',gap:10 }}>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:36,fontWeight:700,fontFamily:'IBM Plex Mono,monospace',color:g.color,lineHeight:1 }}>{score}</div>
                <div style={{ fontSize:9,color:g.color,fontFamily:'IBM Plex Mono,monospace',letterSpacing:1 }}>{g.label}</div>
              </div>
              <button onClick={onClose} style={{ background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:2,width:30,height:30,cursor:'pointer',fontSize:16,color:'var(--text3)' }}>×</button>
            </div>
          </div>
          <div style={{ display:'flex',gap:6,flexWrap:'wrap',marginBottom:10 }}>
            <div style={{ display:'inline-flex',alignItems:'center',gap:4,background:rm.bg,border:`1px solid ${rm.border}`,borderRadius:2,padding:'3px 10px' }}>
              <span style={{ color:rm.color,fontSize:10,fontFamily:'IBM Plex Mono,monospace',fontWeight:600 }}>{rm.emoji} {car.rearLabel}</span>
            </div>
            <div style={{ display:'inline-flex',alignItems:'center',gap:4,background:`${sev.color}12`,border:`1px solid ${sev.color}28`,borderRadius:2,padding:'3px 10px' }}>
              <span style={{ color:sev.color,fontSize:10,fontFamily:'IBM Plex Mono,monospace',fontWeight:600 }}>WBV · {sev.label.toUpperCase()}</span>
            </div>
          </div>
          <div style={{ display:'flex',gap:2 }}>
            {[{id:'overview',label:'OVERVIEW',score:null,color:null},...METRICS.map(m=>({id:m.id,label:m.short,score:m.score,color:m.color}))].map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                style={{ flex:1,border:'none',borderRadius:2,padding:'6px 4px',cursor:'pointer',background:tab===t.id?'var(--bg4)':'var(--bg3)',borderBottom:tab===t.id?`2px solid ${t.color||'var(--amber)'}`:'0',transition:'all .12s' }}>
                {t.score!==null?(<div><div style={{ fontSize:16,fontWeight:700,fontFamily:'IBM Plex Mono,monospace',color:tab===t.id?t.color:'var(--text3)' }}>{t.score}</div><div style={{ fontSize:8,color:tab===t.id?'var(--text2)':'var(--text4)',fontFamily:'IBM Plex Mono,monospace' }}>{t.label}</div></div>)
                :(<div style={{ fontSize:9,fontWeight:600,color:tab===t.id?'var(--text)':'var(--text3)',fontFamily:'IBM Plex Mono,monospace',letterSpacing:.5 }}>{t.label}</div>)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding:'18px 20px' }}>
          {tab==='overview'&&(<div>
            <div style={{ background:`${sev.color}0C`,border:`1px solid ${sev.color}28`,borderRadius:4,padding:'12px 14px',marginBottom:12 }}>
              <div style={{ fontSize:9,color:sev.color,fontFamily:'IBM Plex Mono,monospace',letterSpacing:2,marginBottom:4 }}>ISO 2631-1 WBV · {sev.label.toUpperCase()}</div>
              <p style={{ fontSize:12,color:'var(--text2)',lineHeight:1.7 }}>{sev.desc}</p>
              {(car.hcImpact==='high'||car.hcImpact==='highest')&&<p style={{ fontSize:11,color:sev.color,marginTop:6,fontFamily:'IBM Plex Mono,monospace' }}>PENALTY: −{Math.abs(IMPACT_PENALTY[car.hcImpact])} pts applied to CRCS</p>}
            </div>
            <div style={{ display:'grid',gridTemplateColumns:isMobile?'1fr 1fr':'1fr 1fr 1fr 1fr',gap:6,marginBottom:12 }}>
              {[{l:'WHEELBASE',v:`${car.wheelbase}mm`},{l:'WEIGHT',v:`${car.weight}kg`},{l:'TYRE',v:car.tire||'—'},{l:'SIDEWALL',v:`${car.sidewall}mm`}].map(item=>(
                <div key={item.l} style={{ background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:2,padding:'8px 10px' }}>
                  <div style={{ fontSize:8,color:'var(--text4)',fontFamily:'IBM Plex Mono,monospace',letterSpacing:1,marginBottom:2 }}>{item.l}</div>
                  <div style={{ fontSize:13,fontWeight:600,fontFamily:'IBM Plex Mono,monospace',color:'var(--text)' }}>{item.v}</div>
                </div>
              ))}
            </div>
            {METRICS.map(m=>(
              <div key={m.id} style={{ background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:4,padding:14,marginBottom:10 }}>
                <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8 }}>
                  <div><span style={{ fontSize:12,fontWeight:600,color:m.color,fontFamily:'Barlow Condensed,sans-serif',letterSpacing:.5 }}>{m.label.toUpperCase()}</span><span style={{ fontSize:9,color:'var(--text4)',marginLeft:8,fontFamily:'IBM Plex Mono,monospace' }}>{m.weight}</span></div>
                  <span style={{ fontSize:26,fontWeight:700,fontFamily:'IBM Plex Mono,monospace',color:m.color,lineHeight:1 }}>{m.score}</span>
                </div>
                <div style={{ height:3,background:'var(--bg4)',borderRadius:1,overflow:'hidden',marginBottom:8 }}><div style={{ height:'100%',width:`${m.score}%`,background:m.color,borderRadius:1 }}/></div>
                <p style={{ fontSize:11,color:'var(--text2)',lineHeight:1.7,marginBottom:8 }}>{m.desc}</p>
                <div style={{ fontSize:10,color:m.color,fontFamily:'IBM Plex Mono,monospace',marginBottom:8 }}>{m.highlight}</div>
                <button onClick={()=>setTab(m.id)} style={{ fontSize:10,color:m.color,background:'transparent',border:`1px solid ${m.color}40`,borderRadius:2,padding:'4px 10px',cursor:'pointer',fontFamily:'IBM Plex Mono,monospace' }}>FULL ANALYSIS →</button>
              </div>
            ))}
          </div>)}
          {tab==='impact'&&(<div>
            <div style={{ background:'var(--amber-dim)',border:'1px solid rgba(200,122,16,.3)',borderRadius:4,padding:'12px 14px',marginBottom:12 }}>
              <div style={{ fontSize:9,color:'var(--amber)',fontFamily:'IBM Plex Mono,monospace',letterSpacing:2,marginBottom:4 }}>IMPACT ISOLATION · 35% WEIGHT</div>
              <p style={{ fontSize:12,color:'var(--text2)',lineHeight:1.7 }}>{METRICS[0].desc}</p>
              <div style={{ marginTop:6,fontSize:10,color:'var(--amber)',fontFamily:'IBM Plex Mono,monospace' }}>{METRICS[0].highlight}</div>
            </div>
            <ImpactChainTable car={car}/>
          </div>)}
          {tab==='motion'&&(<div>
            <div style={{ background:'var(--blue-dim)',border:'1px solid rgba(42,110,200,.3)',borderRadius:4,padding:'12px 14px',marginBottom:12 }}>
              <div style={{ fontSize:9,color:'var(--blue)',fontFamily:'IBM Plex Mono,monospace',letterSpacing:2,marginBottom:4 }}>RIDE MOTION COMFORT · 40% WEIGHT</div>
              <p style={{ fontSize:12,color:'var(--text2)',lineHeight:1.7 }}>{METRICS[1].desc}</p>
            </div>
            <MetricChainTable chain={computeMotionChain(car)} color="var(--blue)"/>
          </div>)}
          {tab==='acoustic'&&(<div>
            <div style={{ background:'var(--green-dim)',border:'1px solid rgba(26,158,74,.3)',borderRadius:4,padding:'12px 14px',marginBottom:12 }}>
              <div style={{ fontSize:9,color:'var(--green)',fontFamily:'IBM Plex Mono,monospace',letterSpacing:2,marginBottom:4 }}>CABIN ACOUSTIC ENV · 25% WEIGHT</div>
              <p style={{ fontSize:12,color:'var(--text2)',lineHeight:1.7 }}>{METRICS[2].desc}</p>
            </div>
            <MetricChainTable chain={computeAcousticChain(car)} color="var(--green)"/>
          </div>)}
        </div>
      </div>
    </div>
  );
}
