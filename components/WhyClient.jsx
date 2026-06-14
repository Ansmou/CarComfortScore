'use client';
import Link from 'next/link';
import { FontLoader } from './shared';

export default function WhyClient() {
  const NAV = [['/', 'RANKINGS'],['/blog','ARTICLES'],['/science','METHODOLOGY'],['/why','WHY THIS EXISTS']];
  return (
    <>
      <FontLoader/>
      <nav style={{ background:'var(--nav-bg)', borderBottom:'1px solid var(--border)', padding:'0 24px', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', height:52, justifyContent:'space-between' }}>
          <Link href="/" style={{ fontSize:18, fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, letterSpacing:2, color:'var(--amber)', textDecoration:'none' }}>CAR<span style={{ color:'var(--text3)' }}>COMFORTSCORE</span></Link>
          <div style={{ display:'flex', gap:2 }}>{NAV.map(([href,l])=><Link key={href} href={href} style={{ padding:'8px 12px', fontSize:10, fontWeight:600, fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, color:href==='/why'?'var(--amber)':'var(--text3)', textDecoration:'none', borderBottom:href==='/why'?'2px solid var(--amber)':'2px solid transparent' }}>{l}</Link>)}</div>
        </div>
      </nav>
      <div style={{ maxWidth:740, margin:'0 auto', padding:'48px 24px' }}>
        <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:3, marginBottom:12 }}>WHY WE BUILT THIS</div>
        <h1 style={{ fontSize:40, fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, letterSpacing:1, marginBottom:10, lineHeight:1.1, color:'var(--text)' }}>CAR REVIEWS ARE BROKEN.</h1>
        <p style={{ fontSize:16, color:'var(--text2)', lineHeight:1.8, marginBottom:44, fontStyle:'italic' }}>Every car buyer in Pakistan deserves the information manufacturers know but don't advertise.</p>
        {[
          {n:'01',l:'THE PROBLEM',t:'Open any car review in Pakistan — PakWheels, Pakdrive, any YouTube channel — and you\'ll find the same words. "The ride is comfortable." These phrases appear for every car from the Alto to the Land Cruiser. A journalist who spent 20 minutes on smooth Lahore roads is providing no useful information to a buyer driving on Karachi\'s broken roads for the next decade.'},
          {n:'02',l:'THE HEALTH REALITY',t:'ISO 2631-1 establishes that sustained WBV exposure above 0.8 m/s² correlates with lower back disorders and intervertebral disc compression. The 4–8 Hz frequency range — exactly what truck-platform vehicles produce — coincides with the resonant frequency of the human lumbar spine. Pakistani roads are among the most demanding globally. No one was measuring this.'},
          {n:'03',l:'WHAT WE DID',t:'We applied ISO 2631-1 frameworks, automotive NVH methodology, and vehicle dynamics research to build a quantitative model. The result is the Composite Ride Comfort Score — reproducible, transparent, engineering-based, and identical criteria for every vehicle regardless of brand, price, or manufacturer relationship.'},
          {n:'04',l:'THE MARKET FAILURE',t:"Pakistan's most aspirational SUV (Fortuner) scores identically to a budget sedan on ride quality because it is built on a truck platform. The most-sold locally assembled sedan (Corolla) uses a cheaper suspension than the Japanese version sold elsewhere. No publication has said this clearly. CarComfortScore says it with numbers."},
        ].map(item=>(
          <div key={item.n} style={{ borderTop:'1px solid var(--border)', paddingTop:28, marginBottom:28 }}>
            <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:3, marginBottom:8 }}>{item.n} — {item.l}</div>
            <p style={{ fontSize:14, lineHeight:1.9, color:'var(--text2)' }}>{item.t}</p>
          </div>
        ))}
        <div style={{ background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:4, padding:'24px 28px', textAlign:'center', marginTop:8 }}>
          <p style={{ fontSize:17, color:'var(--text)', lineHeight:1.8, fontStyle:'italic', fontFamily:'Barlow Condensed,sans-serif' }}>"Not how does this car look — but what does driving it every day for ten years do to your body?"</p>
          <p style={{ fontSize:9, color:'var(--text4)', fontFamily:'IBM Plex Mono,monospace', marginTop:10, letterSpacing:2 }}>THAT IS THE QUESTION CARCOMFORTSCORE ANSWERS.</p>
        </div>
      </div>
    </>
  );
}
