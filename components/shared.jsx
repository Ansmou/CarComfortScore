'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export const FontLoader = () => (
  <style>{`
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
  `}</style>
);

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

export function Bar({ val, max = 100, color, height = 3 }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW((val / max) * 100), 80); return () => clearTimeout(t); }, [val, max]);
  return (
    <div style={{ height, background:'var(--bg4)', borderRadius:1, overflow:'hidden' }}>
      <div style={{ height:'100%', width:`${w}%`, background:color, transition:'width .6s cubic-bezier(.16,1,.3,1)', borderRadius:1 }}/>
    </div>
  );
}

export const IMPACT_CHAIN = [
  { id:'tyre',   label:'Tyre Sidewall',              icon:'01', isKey:false, whatIs:'First energy absorber. Rubber sidewall compresses on impact.',
    getPoints: c => { const sw=c.sidewall; if(sw>=180)return 22; if(sw>=140)return 18; if(sw>=125)return 16; if(sw>=115)return 14; if(sw>=105)return 12; return 10; },
    getNote: c => `${c.tire} · ${c.sidewall}mm sidewall`,
    getReason: c => `${c.sidewall}mm sidewall. ${c.sidewall>=160?'Tall sidewall — large deformation zone absorbs peak impact.':c.sidewall>=120?'Moderate sidewall — reasonable first-stage attenuation.':'Short sidewall — limited deformation zone.'}`,
    getComparativeNote: (cA,cB) => { const d=Math.abs(cA.sidewall-cB.sidewall); if(d<8)return null; const h=cA.sidewall>cB.sidewall?cA:cB; const l=cA.sidewall>cB.sidewall?cB:cA; return `${h.name} has ${d}mm more sidewall rubber than ${l.name}, providing a larger deformation zone at first contact.`; } },
  { id:'rim',    label:'Rim & Wheel',                 icon:'02', isKey:false, whatIs:'Structural wheel. Smaller rims flex slightly more.',
    getPoints: c => { if(c.rimSize<=14)return 3; if(c.rimSize<=15)return 2; return 1; },
    getNote: c => `R${c.rimSize} ${c.rimSize<=15?'— more flex':c.rimSize>=18?'— stiff alloy':'— standard'}`,
    getReason: c => `R${c.rimSize} wheel. ${c.rimSize<=15?'Smaller diameter — marginal structural flex.':c.rimSize>=18?'Large alloy — high stiffness. Energy transfers straight through.':'Standard alloy.'}`,
    getComparativeNote: (cA,cB) => { if(cA.rimSize===cB.rimSize)return null; const d=Math.abs((cA.rimSize<=14?3:cA.rimSize<=15?2:1)-(cB.rimSize<=14?3:cB.rimSize<=15?2:1)); return d>0?`${cA.rimSize<cB.rimSize?cA.name:cB.name}'s smaller R${Math.min(cA.rimSize,cB.rimSize)} wheel provides marginally more flex absorption.`:null; } },
  { id:'arm',    label:'Control Arm Bushings',        icon:'03', isKey:false, whatIs:'Elastomeric mounts at suspension arm pivot points.',
    getPoints: c => { let b=5; if(c.rearType==='multilink'||c.rearType==='double_wishbone')b=7; if(c.platformAge==='new')b+=1; if(c.platformAge==='old')b-=1; if(c.weight>=1800)b+=1; if(c.weight<=1000)b-=2; return Math.max(2,b); },
    getNote: c => `${c.weight>=1500?'HD SUV-spec':c.weight<=1000?'Economy-grade':'Standard'} bushings`,
    getReason: c => `${c.weight>=1500?`${c.weight}kg vehicle — larger bushing cross-section.`:c.weight<=1000?'Sub-1,000kg — minimal specification.':`Standard for ${c.weight}kg.`}${c.platformAge==='old'?' Original elastomer may show age-related hardening.':''}`,
    getComparativeNote: (cA,cB) => { const pA=5+(cA.rearType==='multilink'||cA.rearType==='double_wishbone'?2:0)+(cA.platformAge==='new'?1:cA.platformAge==='old'?-1:0)+(cA.weight>=1800?1:cA.weight<=1000?-2:0); const pB=5+(cB.rearType==='multilink'||cB.rearType==='double_wishbone'?2:0)+(cB.platformAge==='new'?1:cB.platformAge==='old'?-1:0)+(cB.weight>=1800?1:cB.weight<=1000?-2:0); const d=Math.abs(pA-pB); if(d===0)return null; const h=pA>pB?cA:cB; const l=pA>pB?cB:cA; const rs=[]; if(Math.abs(cA.weight-cB.weight)>200)rs.push(`${h.name} is ${Math.abs(cA.weight-cB.weight)}kg heavier, requiring larger bushings`); if(cA.platformAge!==cB.platformAge)rs.push(`${h.platformAge==='new'?h.name:l.name}'s newer platform uses fresher elastomer compound`); return rs.length?`${rs.join(' and ')}, accounting for the ${d}-unit difference.`:null; } },
  { id:'shock',  label:'Spring & Damper Assembly',    icon:'04', isKey:false, whatIs:'Primary mechanical filter. Spring stores energy; damper dissipates it as heat.',
    getPoints: c => { let b=15; if(c.wheelbase>=2750)b+=4; else if(c.wheelbase>=2700)b+=2; else if(c.wheelbase<=2500)b-=4; if(c.springTuning==='comfort')b+=2; if(c.springTuning==='truck')b-=3; if(c.springTuning==='stiff')b-=2; if(c.rearType==='solid_axle'||c.rearType==='leaf_spring')b-=2; return Math.max(8,Math.min(20,b)); },
    getNote: c => `${c.wheelbase}mm wheelbase · ${c.springTuning} springs`,
    getReason: c => `${c.wheelbase}mm wheelbase. ${c.wheelbase>=2700?'Extended travel arc.':c.wheelbase<=2520?'Limited travel.':'Moderate travel.'} Spring: ${c.springTuning==='comfort'?'comfort-spec — high compliance.':c.springTuning==='truck'?'truck-spec — over-sprung for passenger use.':'standard.'}`,
    getComparativeNote: (cA,cB) => { const pA=IMPACT_CHAIN[3].getPoints(cA); const pB=IMPACT_CHAIN[3].getPoints(cB); const d=Math.abs(pA-pB); if(d===0)return null; const h=pA>pB?cA:cB; const l=pA>pB?cB:cA; const rs=[]; if(Math.abs(cA.wheelbase-cB.wheelbase)>=80)rs.push(`${h.name}'s ${h.wheelbase}mm wheelbase gives ${Math.abs(cA.wheelbase-cB.wheelbase)}mm more suspension travel`); if(cA.springTuning!==cB.springTuning)rs.push(`${h.name}'s ${h.springTuning} spring tuning absorbs more per compression stroke`); return rs.length?`${rs.join('; ')}, explaining the ${d}-unit gap.`:null; } },
  { id:'strut',  label:'Strut Top Mount',             icon:'05', isKey:false, whatIs:'Elastomeric bearing at strut/body interface. Catches high-frequency vibration.',
    getPoints: c => { let b=6; if(c.weight>=1800)b+=2; else if(c.weight>=1400)b+=1; if(c.platformAge==='new')b+=1; if(c.platformAge==='old')b-=1; if(c.rearType==='solid_axle'||c.rearType==='leaf_spring')b-=1; return Math.max(3,b); },
    getNote: c => `${c.weight>=1600?'HD mount':c.weight<=1000?'Mini mount':'Standard mount'} · ${c.platformAge}`,
    getReason: c => `Critical high-frequency isolation point. ${c.weight>=1600?`Heavy ${c.weight}kg — large elastomer area.`:c.weight<=1000?'Minimum-spec mount.':'Standard mount.'}${c.platformAge==='old'?' Elastomer degradation common at this age.':''}`,
    getComparativeNote: (cA,cB) => { const pA=IMPACT_CHAIN[4].getPoints(cA); const pB=IMPACT_CHAIN[4].getPoints(cB); const d=Math.abs(pA-pB); if(d===0)return null; const h=pA>pB?cA:cB; const l=pA>pB?cB:cA; const rs=[]; if(Math.abs(cA.weight-cB.weight)>150)rs.push(`${h.name}'s heavier ${h.weight}kg mass requires a proportionally larger mount`); if(cA.platformAge!==cB.platformAge)rs.push(`${l.platformAge==='old'?l.name:h.name}'s older platform may have partially degraded elastomer`); return rs.length?`${rs.join('; ')}.`:null; } },
  { id:'rear',   label:'Rear Suspension Architecture', icon:'06', isKey:true, whatIs:'Whether rear wheel impacts are absorbed independently or transmitted laterally. The highest-impact variable.',
    getPoints: c => { if(c.rearType==='double_wishbone')return 8; if(c.rearType==='multilink')return 7; if(c.rearType==='trailing_arm')return -4; if(c.rearType==='torsion_beam'){if(c.springTuning==='stiff')return -7; if(c.weight>=1400)return -5; return -6;} if(c.rearType==='leaf_spring')return -12; if(c.rearType==='solid_axle')return -10; return 0; },
    getNote: c => { if(c.rearType==='double_wishbone')return 'Double Wishbone — independent'; if(c.rearType==='multilink')return 'Multilink — fully independent'; if(c.rearType==='trailing_arm')return 'Trailing Arm — semi-independent'; if(c.rearType==='leaf_spring')return '⚠ Leaf Spring — adds energy'; if(c.rearType==='torsion_beam')return '⚠ Torsion Beam — adds energy'; return '⚠ Solid Axle — adds energy'; },
    getReason: c => { if(c.rearType==='double_wishbone')return 'Each corner geometrically independent. Multiple elastomeric pivot points. A hit on one wheel stays at that corner.'; if(c.rearType==='multilink')return 'Each wheel moves completely on its own. Six or more elastomeric contact points per rear wheel. Zero lateral energy transfer.'; if(c.rearType==='trailing_arm')return 'Each rear wheel has its own separate arm — not rigidly connected to the other side. Better than torsion beam; a hit on one side stays mostly on that side.'; if(c.rearType==='leaf_spring')return 'Stacked beam design. Near-rigid load path from wheel to chassis. Worst-in-class for vibration attenuation.'; if(c.rearType==='torsion_beam')return `Single cross-member links both rear wheels. Impacts transmit laterally via beam twist. ${c.springTuning==='stiff'?'This beam is stiffened — increasing cross-transfer magnitude.':'Cross-transfer magnitude inversely related to beam compliance.'}`; return 'Rigid beam connecting both rear wheels. Zero independent isolation. Every impact on one side transmits to the other.'; },
    getComparativeNote: (cA,cB) => { if(cA.rearType===cB.rearType&&cA.rearType==='torsion_beam'){ const pA=IMPACT_CHAIN[5].getPoints(cA); const pB=IMPACT_CHAIN[5].getPoints(cB); const d=Math.abs(pA-pB); if(d===0)return null; const h=Math.abs(pA)<Math.abs(pB)?cA:cB; const l=Math.abs(pA)<Math.abs(pB)?cB:cA; if(cA.springTuning!==cB.springTuning)return `Both use torsion beam but ${l.name}'s ${l.springTuning} beam tuning transmits ${d} more units than ${h.name}'s ${h.springTuning} beam.`; if(Math.abs(cA.weight-cB.weight)>200)return `Same torsion beam architecture, but ${h.name}'s heavier ${h.weight}kg body gives more inertia to resist beam deflection, slightly reducing cross-transfer.`; } return null; } },
  { id:'rbush',  label:'Rear Bushing Network',        icon:'07', isKey:false, whatIs:'Elastomeric isolation at all rear suspension pivot points.',
    getPoints: c => { if(c.rearType==='double_wishbone')return 6; if(c.rearType==='multilink')return 8; if(c.rearType==='trailing_arm')return 2; return 0; },
    getNote: c => { if(c.rearType==='double_wishbone')return '4 isolation points/corner'; if(c.rearType==='multilink')return '6+ isolation points/corner'; if(c.rearType==='trailing_arm')return '1 pivot bushing/side'; return 'No independent bushing network'; },
    getReason: c => { if(c.rearType==='double_wishbone')return 'Upper and lower wishbone bushings per corner — four series-connected isolation points.'; if(c.rearType==='multilink')return 'Trailing arm, lateral links (×2/side), upper link — all elastomeric-bushed at both ends. This multi-stage filtering is the key differentiator from all other types.'; if(c.rearType==='trailing_arm')return 'Single pivot bushing per trailing arm. Effective for vertical compliance; limited multi-axis isolation.'; return 'No independent rear bushing network. Beam or axle connects via structural mounts — positioning, not isolating.'; },
    getComparativeNote: () => null },
  { id:'sub',    label:'Subframe Isolation Mounts',   icon:'08', isKey:false, whatIs:'Elastomeric mounts decoupling the suspension subframe from the vehicle body.',
    getPoints: c => { let b=5; if(c.platformAge==='new')b+=1; if(c.weight>=1800)b+=2; else if(c.weight>=1400)b+=1; if(c.bodyType==='monocoque')b+=1; if(c.bodyType==='ladder')b-=1; if(c.hasRearSubframe)b+=2; return Math.max(3,b); },
    getNote: c => `${c.hasRearSubframe?'Front + rear subframe':'Front subframe only'} · ${c.bodyType}`,
    getReason: c => `${c.hasRearSubframe?'Dedicated rear subframe — extra isolation stage most cars lack.':'Standard front subframe.'} ${c.bodyType==='ladder'?'Ladder frame: mounts carry structural + NVH loads simultaneously.':'Monocoque: mounts tuned purely for NVH.'}`,
    getComparativeNote: (cA,cB) => { const pA=IMPACT_CHAIN[7].getPoints(cA); const pB=IMPACT_CHAIN[7].getPoints(cB); const d=Math.abs(pA-pB); if(d===0)return null; const h=pA>pB?cA:cB; const l=pA>pB?cB:cA; if(h.hasRearSubframe&&!l.hasRearSubframe)return `${h.name} has a dedicated rear subframe adding 2 extra isolation stages that ${l.name} doesn't have, explaining the ${d}-unit difference.`; if(h.bodyType!==l.bodyType)return `${h.name}'s ${h.bodyType} allows softer mount tuning vs ${l.name}'s ${l.bodyType} body.`; return null; } },
  { id:'body',   label:'Body Structure & Deadening',  icon:'09', isKey:false, whatIs:'Structural rigidity reduces resonant amplification. Damping material converts vibration to heat.',
    getPoints: c => { let b=4; if(c.platformAge==='new')b+=2; if(c.platformAge==='old')b-=1; if(c.bodyType==='monocoque')b+=1; if(c.weight>=2000)b+=2; if(c.weight<=1000)b-=2; if(c.hasCtb)b+=4; return Math.max(2,b); },
    getNote: c => `${c.hasCtb?'CTB EV':c.bodyType==='monocoque'?'Monocoque':'Ladder frame'} · ${c.platformAge}`,
    getReason: c => `${c.hasCtb?'Cell-to-Body: battery structurally integrated, +32% torsional rigidity.':c.bodyType==='ladder'?'Ladder frame: vibration transmits via chassis-to-body path.':'Monocoque: shell is structure and NVH barrier.'} ${c.platformAge==='new'?'Modern butyl deadening coverage.':c.platformAge==='old'?'Legacy spec — less comprehensive deadening.':'Standard NVH.'}`,
    getComparativeNote: (cA,cB) => { const pA=IMPACT_CHAIN[8].getPoints(cA); const pB=IMPACT_CHAIN[8].getPoints(cB); const d=Math.abs(pA-pB); if(d===0)return null; const h=pA>pB?cA:cB; const l=pA>pB?cB:cA; if(h.hasCtb)return `${h.name}'s Cell-to-Body battery structure provides unique floor rigidity no conventional car can match.`; if(cA.platformAge!==cB.platformAge)return `${h.name}'s ${h.platformAge} platform includes ${h.platformAge==='new'?'thicker modern butyl deadening':'less deadening'} vs ${l.name}'s ${l.platformAge} specification, contributing ${d} units difference.`; return null; } },
  { id:'seat',   label:'Seat Vibration Isolation',    icon:'10', isKey:false, whatIs:'Final attenuation stage. Seat foam decouples the occupant from floor-transmitted vibration.',
    getPoints: c => { let b=7; if(c.cat==='Large SUV'||c.cat==='Body-on-Frame SUV')b=9; else if(c.cat.includes('SUV')||c.cat==='Electric SUV')b=8; else if(c.cat==='Hatchback')b=5; if(c.platformAge==='old')b-=1; return Math.max(4,b); },
    getNote: c => `${c.cat==='Hatchback'?'Economy seat':c.cat.includes('SUV')?'SUV deep seat':'Sedan seat'}`,
    getReason: c => `${c.cat.includes('SUV')&&c.cat!=='Electric SUV'?'Large SUV seat: deep foam, spring base. Best final attenuation.':c.cat==='Hatchback'?'Economy hatch seat: thin foam. Residual vibration transmits with limited attenuation.':'Mid-size sedan seat — moderate attenuation.'}`,
    getComparativeNote: (cA,cB) => { const pA=IMPACT_CHAIN[9].getPoints(cA); const pB=IMPACT_CHAIN[9].getPoints(cB); const d=Math.abs(pA-pB); if(d===0)return null; const h=pA>pB?cA:cB; const l=pA>pB?cB:cA; const catRank={'Large SUV':5,'Body-on-Frame SUV':5,'Mid SUV':4,'Compact SUV':4,'Electric SUV':4,'Sedan':3,'Hatchback':2,'Pickup Truck':3}; if(cA.cat!==cB.cat&&(catRank[cA.cat]||3)!==(catRank[cB.cat]||3))return `${h.name}'s ${h.cat} seat specification uses deeper foam and a spring base vs ${l.name}'s ${l.cat} seat, providing ${d} units of extra final attenuation.`; if(cA.platformAge!==cB.platformAge)return `${l.platformAge==='old'?l.name:h.name}'s older seats may have reduced foam density, losing some final attenuation.`; return null; } },
];

export function computeImpactChain(car) {
  let r = 100;
  const stages = IMPACT_CHAIN.map(s => {
    const pts = s.getPoints(car);
    r = Math.max(0, pts < 0 ? r - pts : r - pts);
    return { ...s, pts, remaining: Math.round(r), note: s.getNote(car), reason: s.getReason(car) };
  });
  if (stages[stages.length-1].remaining < 6) stages[stages.length-1].remaining = 6;
  return stages;
}

export const MOTION_CHAIN = [
  { id:'spring', label:'Spring Rate / Mass Ratio',      icon:'M1', maxPoints:28, isKey:false,
    whatIs:'Lower spring rate relative to mass allows greater suspension travel — primary determinant of body motion comfort.',
    getPoints: c => { let b=18; if(c.springTuning==='comfort')b=24; if(c.springTuning==='stiff')b=12; if(c.springTuning==='truck')b=10; if(c.weight<=1000)b+=3; if(c.weight>=1800)b-=2; return Math.max(8,Math.min(28,b)); },
    getNote: c => `${c.springTuning} spring · ${c.weight}kg`,
    getReason: c => `${c.springTuning==='comfort'?'Comfort-spec: low rate, full travel, maximum attenuation.':c.springTuning==='truck'?'Truck-spec: calibrated for payload. Over-sprung for unladen passenger use.':'Standard spring rate.'}` },
  { id:'wb',     label:'Wheelbase / Body Motion',       icon:'M2', maxPoints:20, isKey:false,
    whatIs:'Longer wheelbase reduces pitch frequency. Pitch angle ∝ 1/wheelbase².',
    getPoints: c => { if(c.wheelbase>=2780)return 20; if(c.wheelbase>=2720)return 17; if(c.wheelbase>=2650)return 14; if(c.wheelbase>=2580)return 11; if(c.wheelbase>=2510)return 8; return 5; },
    getNote: c => `${c.wheelbase}mm wheelbase`,
    getReason: c => `${c.wheelbase>=2750?'Very long — bridges most road wavelengths below 3m.':c.wheelbase<=2510?'Short — high pitch frequency. Noticeable at highway speed.':'Moderate wheelbase.'}` },
  { id:'rtype',  label:'Rear Suspension Independence', icon:'M3', maxPoints:25, isKey:true,
    whatIs:'Independent rear allows each wheel to respond to its own surface without cross-coupling.',
    getPoints: c => { if(c.rearType==='double_wishbone')return 24; if(c.rearType==='multilink')return 22; if(c.rearType==='trailing_arm')return 17; if(c.rearType==='torsion_beam'){if(c.springTuning==='stiff')return 8; return 14;} if(c.rearType==='leaf_spring')return 3; if(c.rearType==='solid_axle')return 5; return 12; },
    getNote: c => c.rearLabel,
    getReason: c => { if(c.rearType==='double_wishbone'||c.rearType==='multilink')return 'Fully independent: lateral road variation does not couple across the axle.'; if(c.rearType==='trailing_arm')return 'Semi-independent: reduced cross-coupling.'; if(c.rearType==='leaf_spring')return 'Leaf spring: near-rigid coupling plus high axle mass creates resonant pitching.'; return 'Torsion beam: lateral coupling via beam twist. Road variation on one side transmits a roll moment to the other.'; } },
  { id:'rebound',label:'Damper Rebound Control',       icon:'M4', maxPoints:15, isKey:false,
    whatIs:'Rebound stroke rate determines post-impact body motion settling time.',
    getPoints: c => { if(c.springTuning==='comfort')return 13; if(c.springTuning==='truck')return 6; if(c.springTuning==='stiff')return 8; return 11; },
    getNote: c => `${c.springTuning==='comfort'?'Progressive comfort rebound':c.springTuning==='truck'?'Fast truck rebound':'Standard rebound'}`,
    getReason: c => `${c.springTuning==='comfort'?'Controlled extension — prevents bounce. Optimal for passenger comfort.':c.springTuning==='truck'?'Fast extension designed for loaded use. Causes over-rebound when empty.':'Standard rebound.'}` },
  { id:'mass',   label:'Sprung Mass Damping',          icon:'M5', maxPoints:12, isKey:false,
    whatIs:'Higher sprung mass increases inertia, attenuating high-frequency vibration.',
    getPoints: c => { if(c.weight>=2100)return 12; if(c.weight>=1700)return 10; if(c.weight>=1400)return 8; if(c.weight>=1100)return 6; return 4; },
    getNote: c => `${c.weight}kg`,
    getReason: c => `${c.weight>=1800?'High mass: road vibration above 20Hz dissipates in body inertia.':c.weight<=1000?'Low mass: minimal inertial damping. Road texture transmits directly.':'Moderate mass.'}` },
];

export const ACOUSTIC_CHAIN = [
  { id:'dead', label:'Acoustic Damping Material',   icon:'A1', maxPoints:32, isKey:false,
    whatIs:'Butyl sheets on floor, firewall, wheel arches. Converts vibration to heat.',
    getPoints: c => { let b=20; if(c.platformAge==='new')b+=10; if(c.platformAge==='old')b-=6; if(c.bodyType==='ladder')b-=4; if(c.weight<=1000)b-=6; if(c.weight>=1600)b+=4; if(c.hasCtb)b+=6; return Math.max(6,Math.min(32,b)); },
    getNote: c => `${c.platformAge==='new'?'Modern full-coverage':'Legacy spec'}`,
    getReason: c => `${c.hasCtb?'CTB battery pan acts as distributed mass damper.':c.platformAge==='new'?'Full-coverage butyl across floor and firewall.':'Legacy spec — partial coverage. Noticeable above 100 km/h.'}` },
  { id:'rig',  label:'Body Torsional Rigidity',     icon:'A2', maxPoints:24, isKey:false,
    whatIs:'Higher body stiffness raises resonant frequencies above the sensitive 4–12 Hz human response range.',
    getPoints: c => { let b=16; if(c.platformAge==='new')b+=6; if(c.platformAge==='old')b-=4; if(c.bodyType==='ladder')b-=4; if(c.hasCtb)b+=4; if(c.weight>=1800)b+=2; return Math.max(8,Math.min(24,b)); },
    getNote: c => `${c.bodyType==='monocoque'?'Monocoque':'Ladder frame'} · ${c.platformAge}`,
    getReason: c => `${c.bodyType==='monocoque'?`Monocoque shell and NVH envelope co-optimised. ${c.platformAge==='new'?'Modern high-strength steel — significantly stiffer than previous generation.':'Older monocoque.'}`:c.bodyType==='ladder'?'Ladder frame: vibration travels via frame-to-body path.':''}${c.hasCtb?' CTB adds significant floor rigidity.':''}` },
  { id:'bq',   label:'Elastomer Isolation Quality', icon:'A3', maxPoints:16, isKey:false,
    whatIs:'Bushing compound durometer and coverage determines isolation across the full vibration spectrum.',
    getPoints: c => { let b=10; if(c.platformAge==='new')b+=5; if(c.platformAge==='old')b-=4; if(c.rearType==='multilink'||c.rearType==='double_wishbone')b+=2; if(c.weight>=1500)b+=1; return Math.max(4,Math.min(16,b)); },
    getNote: c => `${c.platformAge==='new'?'Fresh compound':'Aged elastomer'}`,
    getReason: c => `${c.platformAge==='new'?'All bushings at factory spec. Maximum compliance.':c.platformAge==='old'?'Age-related hardening common. Replacing bushings is often the highest-impact ride quality intervention.':'Mid-life bushings.'}` },
  { id:'si',   label:'Seat Occupant Decoupling',    icon:'A4', maxPoints:24, isKey:false,
    whatIs:'Final mechanical filter between floor vibration and seated occupant.',
    getPoints: c => { let b=14; if(c.cat==='Large SUV'||c.cat==='Body-on-Frame SUV')b=20; else if(c.cat.includes('SUV')||c.cat==='Electric SUV')b=17; else if(c.cat==='Hatchback')b=11; if(c.platformAge==='old')b-=2; return Math.max(8,b); },
    getNote: c => `${c.cat.includes('SUV')?'SUV seat':c.cat==='Hatchback'?'Economy seat':'Sedan seat'}`,
    getReason: c => `${c.cat==='Large SUV'||c.cat==='Body-on-Frame SUV'?'Deep foam with spring base — best occupant isolation.':c.cat==='Hatchback'?'Minimal foam — residual floor vibration transmits with limited attenuation.':'Standard sedan seat.'}` },
  { id:'gl',   label:'Acoustic Glazing & Seals',    icon:'A5', maxPoints:6, isKey:false,
    whatIs:'Acoustic laminated glass and door seals attenuate airborne road and wind noise.',
    getPoints: c => { if(c.platformAge==='new'&&c.weight>=1400)return 6; if(c.platformAge==='new')return 5; if(c.weight>=2000)return 5; return 3; },
    getNote: c => `${c.platformAge==='new'&&c.weight>=1400?'Acoustic glass':'Standard spec'}`,
    getReason: c => `${c.platformAge==='new'&&c.weight>=1400?'Acoustic laminated glass with multi-layer door seals.':'Standard glass and seals.'}` },
];

export function computeMotionChain(car)   { return MOTION_CHAIN.map(s   => ({ ...s, pts:s.getPoints(car), note:s.getNote(car), reason:s.getReason(car) })); }
export function computeAcousticChain(car) { return ACOUSTIC_CHAIN.map(s => ({ ...s, pts:s.getPoints(car), note:s.getNote(car), reason:s.getReason(car) })); }

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
      <div style={{ display:'grid', gridTemplateColumns:'1fr 68px 72px', background:'var(--bg4)', padding:'12px 14px', borderTop:'2px solid var(--border2)' }}>
        <div style={{ fontSize:9, color:'var(--text3)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>OCCUPANT FELT INTENSITY</div>
        <div style={{ textAlign:'center', fontSize:10, color:'var(--text3)', fontFamily:'IBM Plex Mono,monospace' }}>{100-final}% absorbed</div>
        <div style={{ textAlign:'center', fontSize:26, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color:final<=15?'var(--green)':final<=40?'var(--amber)':'var(--red)' }}>{final}</div>
      </div>
    </div>
  );
}

export function MetricChainTable({ chain, color }) {
  const total = chain.reduce((s,c)=>s+c.pts,0);
  const maxTotal = chain.reduce((s,c)=>s+(c.maxPoints||0),0);
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
        <div style={{ fontSize:9, color:'var(--text3)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>TOTAL</div>
        <div style={{ textAlign:'center', fontSize:18, fontWeight:700, fontFamily:'IBM Plex Mono,monospace', color }}>{total}</div>
        <div style={{ textAlign:'center', fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace' }}>{maxTotal}</div>
      </div>
    </div>
  );
}
