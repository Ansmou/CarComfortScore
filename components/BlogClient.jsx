'use client';
import Link from 'next/link';
import { FontLoader } from './shared';

export default function BlogClient({ articles }) {
  return (
    <>
      <FontLoader/>
      <nav style={{ background:'var(--nav-bg)', borderBottom:'1px solid var(--border)', padding:'0 24px', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', height:52, justifyContent:'space-between' }}>
          <Link href="/" style={{ fontSize:18, fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, letterSpacing:2, color:'var(--amber)', textDecoration:'none' }}>CAR<span style={{ color:'var(--text3)' }}>COMFORTSCORE</span></Link>
          <div style={{ display:'flex', gap:2 }}>
            {[['/', 'RANKINGS'],['/blog','ARTICLES'],['/science','METHODOLOGY'],['/why','WHY THIS EXISTS']].map(([href,l])=>(
              <Link key={href} href={href} style={{ padding:'8px 12px', fontSize:10, fontWeight:600, fontFamily:'IBM Plex Mono,monospace', letterSpacing:1, color:href==='/blog'?'var(--amber)':'var(--text3)', textDecoration:'none', borderBottom:href==='/blog'?'2px solid var(--amber)':'2px solid transparent' }}>{l}</Link>
            ))}
          </div>
        </div>
      </nav>
      <div style={{ maxWidth:900, margin:'0 auto', padding:'48px 24px' }}>
        <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:3, marginBottom:12 }}>ARTICLES & ANALYSIS</div>
        <h1 style={{ fontSize:40, fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, letterSpacing:1, marginBottom:10, lineHeight:1.1, color:'var(--text)' }}>WHAT THE NUMBERS MEAN</h1>
        <p style={{ fontSize:15, color:'var(--text2)', lineHeight:1.8, marginBottom:44, maxWidth:560 }}>Deep-dive articles explaining the engineering behind Pakistan's most popular cars. Every claim sourced from the same data that powers the rankings.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(380px,1fr))', gap:16 }}>
          {articles.map(article=>(
            <Link key={article.id} href={`/blog/${article.slug}`} style={{ textDecoration:'none' }}>
              <div style={{ background:'var(--bg2)', border:'1px solid var(--card-border)', borderRadius:4, padding:24, cursor:'pointer', position:'relative', overflow:'hidden', transition:'transform .18s ease, border-color .18s ease' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.borderColor='var(--card-hover-border)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.borderColor='var(--card-border)';}}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,var(--amber),transparent)' }}/>
                <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:2, marginBottom:8 }}>{article.category} · {article.readTime}</div>
                <h2 style={{ fontSize:18, fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, letterSpacing:.5, color:'var(--text)', marginBottom:12, lineHeight:1.2 }}>{article.title.toUpperCase()}</h2>
                <p style={{ fontSize:13, color:'var(--text2)', lineHeight:1.7, marginBottom:16 }}>{article.summary}</p>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:16 }}>
                  {article.cars.map(c=><span key={c} style={{ fontSize:9, color:'var(--text3)', background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:2, padding:'2px 8px', fontFamily:'IBM Plex Mono,monospace' }}>{c}</span>)}
                </div>
                <div style={{ fontSize:10, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:1 }}>READ ARTICLE →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
