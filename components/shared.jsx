'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IMPACT_CHAIN, MOTION_CHAIN, ACOUSTIC_CHAIN, computeImpactChain, computeMotionChain, computeAcousticChain, impactScore, motionScore, acousticScore } from '../lib/scoring';
export { IMPACT_CHAIN, MOTION_CHAIN, ACOUSTIC_CHAIN, computeImpactChain, computeMotionChain, computeAcousticChain, impactScore, motionScore, acousticScore };

const FONT_CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800&family=Barlow:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    :root[data-theme="dark"]{
      --bg:#09090E;--bg2:#0F0F16;--bg3:#16161F;--bg4:#1E1E2A;
      --border:#252532;--border2:#2E2E40;
      --text:#E8E8F0;--text2:#9090B0;--text3:#5A5A78;--text4:#32323F;
      --card-bg:#0F0F16;--card-border:#252532;--card-hover-border:#2E2E40;
      --input-bg:#0F0F16;--input-border:#252532;--nav-bg:#0F0F16;
      --row-hover:#1E1E2A;--hero-sub:#9090B0;--bg-page:#09090E;
      --expand-bg:#16161F;--chain-start-bg:#16161F;--chain-label:#9090B0;
      --compare-header:#1E1E2A;--cat-label:#32323F;
      --amber:#E8A020;--green:#22C55E;--red:#EF4444;--blue:#60A5FA;
      --amber-dim:rgba(232,160,32,.12);--green-dim:rgba(34,197,94,.12);
      --red-dim:rgba(239,68,68,.12);--blue-dim:rgba(96,165,250,.12);
      --purple-dim:rgba(167,139,250,.12);
    }
    :root[data-theme="light"]{
      --bg:#F4F4F0;--bg2:#FFFFFF;--bg3:#F0EFE8;--bg4:#E8E6DC;
      --border:#D8D5C8;--border2:#C8C4B4;
      --text:#18181A;--text2:#4A4A5A;--text3:#8A8A9A;--text4:#BABAC8;
      --card-bg:#FFFFFF;--card-border:#D8D5C8;--card-hover-border:#B0ADA0;
      --input-bg:#FFFFFF;--input-border:#D8D5C8;--nav-bg:#FFFFFF;
      --row-hover:#F4F4F0;--hero-sub:#5A5A6A;--bg-page:#F4F4F0;
      --expand-bg:#F4F4F0;--chain-start-bg:#F0EFE8;--chain-label:#6A6A7A;
      --compare-header:#F0EFE8;--cat-label:#BABAC8;
      --amber:#C87A10;--green:#1A9E4A;--red:#C03030;--blue:#2A6EC8;
      --amber-dim:rgba(200,122,16,.1);--green-dim:rgba(26,158,74,.1);
      --red-dim:rgba(192,48,48,.1);--blue-dim:rgba(42,110,200,.1);
      --purple-dim:rgba(122,90,200,.1);
    }
    html{scroll-behavior:smooth;}
    body{background:var(--bg);color:var(--text);font-family:'Barlow',sans-serif;line-height:1.5;transition:background .25s,color .25s;}
    ::-webkit-scrollbar{width:4px;height:4px;}
    ::-webkit-scrollbar-track{background:var(--bg2);}
    ::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px;}
    a{color:inherit;}
    select,input,button{font-family:'Barlow',sans-serif;}
  `;
export const FontLoader = () => <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />;

const NAV_LINKS = [['/', 'RANKINGS'],['/blog','ARTICLES'],['/science','METHODOLOGY'],['/why','WHY THIS EXISTS']];

export function SiteNav({ activeHref = '/', theme, setTheme, extras }) {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 720);
    c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c);
  }, []);
  const iStyle = { background:'var(--input-bg)', border:'1px solid var(--input-border)', borderRadius:2, padding:'5px 10px', cursor:'pointer' };
  return (
    <nav style={{ background:'var(--nav-bg)', borderBottom:'1px solid var(--border)', padding:'0 16px', position:'sticky', top:0, zIndex:100 }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', height:52, justifyContent:'space-between' }}>
        <Link href="/" style={{ fontSize:18, fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, letterSpacing:2, color:'var(--amber)', textDecoration:'none', flexShrink:0 }}>
          CAR<span style={{ color:'var(--text3)' }}>COMFORTSCORE</span>
        </Link>
        {mobile ? (
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            {setTheme && <button onClick={() => setTheme(t => t==='light'?'dark':'light')} style={{ ...iStyle, fontSize:14 }}>{theme==='light'?'🌙':'☀️'}</button>}
            <button onClick={() => setOpen(o => !o)} aria-label="Menu" style={{ ...iStyle, display:'flex', flexDirection:'column', gap:4, padding:'8px 10px' }}>
              <span style={{ display:'block', width:18, height:2, background:open?'var(--amber)':'var(--text3)', borderRadius:1, transition:'background .15s' }}/>
              <span style={{ display:'block', width:18, height:2, background:open?'var(--amber)':'var(--text3)', borderRadius:1, transition:'background .15s' }}/>
              <span style={{ display:'block', width:14, height:2, background:open?'var(--amber)':'var(--text3)', borderRadius:1, transition:'background .15s' }}/>
            </button>
          </div>
        ) : (
          <div style={{ display:'flex', gap:2, alignItems:'center' }}>
            {NAV_LINKS.map(([href, l]) => (
              <Link key={href} href={href} style={{ padding:'8px 10px', fontSize:10, fontWeight:600, fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, color:href===activeHref?'var(--amber)':'var(--text3)', textDecoration:'none', borderBottom:href===activeHref?'2px solid var(--amber)':'2px solid transparent' }}>{l}</Link>
            ))}
            {extras}
            {setTheme && <button onClick={() => setTheme(t => t==='light'?'dark':'light')} style={{ ...iStyle, fontSize:12, marginLeft:4 }}>{theme==='light'?'🌙':'☀️'}</button>}
          </div>
        )}
      </div>
      {mobile && open && (
        <div style={{ background:'var(--nav-bg)', borderBottom:'1px solid var(--border)' }}>
          {NAV_LINKS.map(([href, l]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{ display:'block', padding:'13px 20px', fontSize:12, fontWeight:600, fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, color:href===activeHref?'var(--amber)':'var(--text2)', textDecoration:'none', borderLeft:`3px solid ${href===activeHref?'var(--amber)':'transparent'}`, background:href===activeHref?'var(--bg3)':'transparent' }}>{l}</Link>
          ))}
          {extras && <div style={{ padding:'10px 20px', borderTop:'1px solid var(--border)' }}>{extras}</div>}
        </div>
      )}
    </nav>
  );
}

// Web Share API with clipboard fallback. Returns 'shared' | 'copied' | 'failed'.
export async function shareLink(url, title, text) {
  if (typeof navigator === 'undefined') return 'failed';
  if (navigator.share) {
    try { await navigator.share({ title, text, url }); return 'shared'; } catch (e) { if (e.name === 'AbortError') return 'failed'; }
  }
  if (navigator.clipboard) {
    try { await navigator.clipboard.writeText(url); return 'copied'; } catch {}
  }
  return 'failed';
}

export function ShareButton({ url, title, text, label = 'SHARE', accent = 'var(--amber)' }) {
  const [state, setState] = useState('idle');
  const onClick = async (e) => {
    e.stopPropagation();
    const result = await shareLink(url, title, text);
    if (result === 'shared') return;
    if (result === 'copied') { setState('copied'); setTimeout(() => setState('idle'), 2000); }
  };
  return (
    <button onClick={onClick} title={`Share — ${title}`} style={{ background:'transparent', border:`1px solid ${accent}66`, color:accent, borderRadius:2, padding:'5px 12px', fontSize:10, fontWeight:600, cursor:'pointer', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, display:'inline-flex', alignItems:'center', gap:6 }}>
      <span>{state === 'copied' ? '✓ COPIED' : '↗ ' + label}</span>
    </button>
  );
}

export function Bar({ val, max = 100, color, height = 3 }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW((val / max) * 100), 80); return () => clearTimeout(t); }, [val, max]);
  return (
    <div style={{ height, background:'var(--bg4)', borderRadius:1, overflow:'hidden' }}>
      <div style={{ height:'100%', width:`${w}%`, background:color, transition:'width .6s cubic-bezier(.16,1,.3,1)', borderRadius:1 }}/>
    </div>
  );
}


export function ImpactChainTable({ car }) {
  const chain = computeImpactChain(car);
  const final = chain[chain.length-1].remaining;
  const [exp, setExp] = useState(null);
  return (
    <div style={{ border:'1px solid var(--border)', borderRadius:4, overflow:'hidden' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 68px 72px', background:'var(--chain-start-bg)', padding:'8px 14px', borderBottom:'1px solid var(--border)' }}>
        <div style={{ fontSize:11, color:'var(--chain-label)', fontFamily:'IBM Plex Mono,monospace' }}>ROAD INPUT · NORMALIZED 100</div>
        <div style={{ fontSize:10, color:'var(--text4)', textAlign:'center', fontFamily:'IBM Plex Mono,monospace' }}>ABSORBED</div>
        <div style={{ fontSize:10, color:'var(--text4)', textAlign:'center', fontFamily:'IBM Plex Mono,monospace' }}>RESIDUAL</div>
      </div>
      {chain.map(stage => {
        const isAdding=stage.pts<0, isZero=stage.pts===0, isExp=exp===stage.id;
        return (
          <div key={stage.id}>
            <div onClick={() => setExp(isExp?null:stage.id)} style={{ display:'grid', gridTemplateColumns:'1fr 68px 72px', padding:'10px 14px', borderBottom:'1px solid var(--border)', cursor:'pointer', background:stage.isKey?'var(--green-dim)':isExp?'var(--expand-bg)':'var(--bg2)', borderLeft:`2px solid ${stage.isKey?'var(--green)':'transparent'}` }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', fontWeight:600 }}>{stage.icon}</span>
                  <span style={{ fontSize:12, color:stage.isKey?'var(--text)':'var(--text2)', fontWeight:stage.isKey?600:400 }}>{stage.label}</span>
                  {stage.isKey && <span style={{ fontSize:8, color:'var(--green)', border:'1px solid var(--green)', borderRadius:2, padding:'0 4px', fontFamily:'IBM Plex Mono,monospace', opacity:.7 }}>KEY</span>}
                </div>
                <div style={{ fontSize:10, color:'var(--text3)', marginTop:2, fontFamily:'IBM Plex Mono,monospace' }}>{stage.note}</div>
              </div>
              <div style={{ textAlign:'center', fontSize:13, fontWeight:600, fontFamily:'IBM Plex Mono,monospace', color:isAdding?'var(--red)':isZero?'var(--text4)':'var(--green)' }}>{isZero?'—':isAdding?`+${Math.abs(stage.pts)}`:`-${stage.pts}`}</div>
              <div style={{ textAlign:'center', fontSize:17, fontWeight:600, fontFamily:'IBM Plex Mono,monospace', color:stage.remaining<=20?'var(--green)':stage.remaining<=45?'var(--amber)':'var(--red)' }}>{stage.remaining}</div>
            </div>
            {isExp && (
              <div style={{ background:'var(--expand-bg)', padding:'12px 14px', borderBottom:'1px solid var(--border2)' }}>
                <div style={{ fontSize:9, color:'var(--text3)', marginBottom:4, fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>COMPONENT FUNCTION</div>
                <p style={{ fontSize:11, color:'var(--text2)', lineHeight:1.7, marginBottom:10 }}>{stage.whatIs}</p>
                <div style={{ fontSize:9, color:'var(--amber)', marginBottom:4, fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>THIS VEHICLE</div>
                <p style={{ fontSize:11, color:'var(--text)', lineHeight:1.7 }}>{stage.reason}</p>
              </div>
            )}
          </div>
        );
      })}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 68px 72px', background:'var(--bg4)', padding:'12px 14px', borderTop:'2px solid var(--border2)' }} title="Road energy that reaches the occupant after the 10-stage absorption chain. Out of an input of 100 units. Lower = better. Floors at 2 — no real vehicle absorbs 100% of road energy.">
        <div style={{ fontSize:9, color:'var(--text3)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, cursor:'help', borderBottom:'1px dotted var(--text4)', display:'inline-block', width:'fit-content' }}>OCCUPANT FELT INTENSITY</div>
        <div style={{ textAlign:'center', fontSize:10, color:'var(--text3)', fontFamily:'IBM Plex Mono,monospace' }}>{100-final}% absorbed</div>
        <div style={{ textAlign:'center', fontSize:26, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:final<=15?'var(--green)':final<=40?'var(--amber)':'var(--red)' }}>{final}</div>
      </div>
    </div>
  );
}

export function MetricChainTable({ chain, color }) {
  const total = chain.reduce((s,c)=>s+c.pts,0);
  const maxTotal = chain.reduce((s,c)=>s+(c.maxPoints||0),0);
  const normalizedTotal = Math.round(total / maxTotal * 100);
  const [exp, setExp] = useState(null);
  return (
    <div style={{ border:'1px solid var(--border)', borderRadius:4, overflow:'hidden' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 52px 52px', background:'var(--chain-start-bg)', padding:'8px 14px', borderBottom:'1px solid var(--border)' }}>
        <div style={{ fontSize:10, color:'var(--chain-label)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>COMPONENT</div>
        <div style={{ fontSize:10, color:'var(--text4)', textAlign:'center', fontFamily:'IBM Plex Mono,monospace' }}>SCORE</div>
        <div style={{ fontSize:10, color:'var(--text4)', textAlign:'center', fontFamily:'IBM Plex Mono,monospace' }}>MAX</div>
      </div>
      {chain.map(stage => {
        const isExp = exp === stage.id;
        return (
          <div key={stage.id}>
            <div onClick={() => setExp(isExp?null:stage.id)} style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', cursor:'pointer', background:isExp?'var(--expand-bg)':'var(--bg2)', borderLeft:`2px solid ${stage.isKey?color:'transparent'}` }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 52px 52px', marginBottom:5 }}>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace' }}>{stage.icon}</span>
                    <span style={{ fontSize:12, color:'var(--text2)', fontWeight:stage.isKey?600:400 }}>{stage.label}</span>
                  </div>
                  <div style={{ fontSize:10, color:'var(--text3)', marginTop:2, fontFamily:'IBM Plex Mono,monospace' }}>{stage.note}</div>
                </div>
                <div style={{ textAlign:'center', fontSize:16, fontWeight:600, fontFamily:'IBM Plex Mono,monospace', color }}>{stage.pts}</div>
                <div style={{ textAlign:'center', fontSize:10, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace' }}>{stage.maxPoints}</div>
              </div>
              <Bar val={stage.pts} max={stage.maxPoints} color={color} height={3}/>
            </div>
            {isExp && (
              <div style={{ background:'var(--expand-bg)', padding:'12px 14px', borderBottom:'1px solid var(--border2)' }}>
                <div style={{ fontSize:9, color:'var(--text3)', marginBottom:4, fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>WHAT THIS MEASURES</div>
                <p style={{ fontSize:11, color:'var(--text2)', lineHeight:1.7, marginBottom:10 }}>{stage.whatIs}</p>
                <div style={{ fontSize:9, color, marginBottom:4, fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>THIS VEHICLE</div>
                <p style={{ fontSize:11, color:'var(--text)', lineHeight:1.7 }}>{stage.reason}</p>
              </div>
            )}
          </div>
        );
      })}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 52px 52px', background:'var(--bg4)', padding:'10px 14px', borderTop:'2px solid var(--border2)' }}>
        <div style={{ fontSize:9, color:'var(--text3)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>TOTAL / 100</div>
        <div style={{ textAlign:'center', fontSize:18, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color }}>{normalizedTotal}</div>
        <div style={{ textAlign:'center', fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace' }}>{total}/{maxTotal}</div>
      </div>
    </div>
  );
}
