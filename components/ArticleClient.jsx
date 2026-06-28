'use client';
import Link from 'next/link';
import { FontLoader, SiteNav, resolveTokens } from './shared';

export default function ArticleClient({ article }) {
  return (
    <>
      <FontLoader/>
      <SiteNav activeHref="/blog" />
      <div style={{ maxWidth:740, margin:'0 auto', padding:'40px 24px' }}>
        <Link href="/blog" style={{ display:'flex', alignItems:'center', gap:8, color:'var(--text3)', cursor:'pointer', fontSize:13, marginBottom:28, fontFamily:'IBM Plex Mono,monospace', textDecoration:'none' }}>← ALL ARTICLES</Link>
        <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:3, marginBottom:8 }}>{article.category} · {article.readTime}</div>
        <h1 style={{ fontSize:36, fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, letterSpacing:.5, lineHeight:1.1, color:'var(--text)', marginBottom:16 }}>{resolveTokens(article.title).toUpperCase()}</h1>
        <div style={{ display:'flex', gap:8, marginBottom:24, flexWrap:'wrap' }}>
          {article.cars.map(c=><span key={c} style={{ fontSize:10, color:'var(--text3)', background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:2, padding:'3px 10px', fontFamily:'IBM Plex Mono,monospace' }}>{c}</span>)}
        </div>
        <p style={{ fontSize:16, color:'var(--text2)', lineHeight:1.8, marginBottom:36, borderLeft:'3px solid var(--amber)', paddingLeft:16 }}>{resolveTokens(article.summary)}</p>
        <div style={{ borderTop:'1px solid var(--border)', paddingTop:32 }}>
          {article.content.map((block, i) => {
            const text = resolveTokens(block.text);
            if (block.type==='lead') return <p key={i} style={{ fontSize:16, lineHeight:1.9, color:'var(--text)', marginBottom:28, fontWeight:500 }}>{text}</p>;
            if (block.type==='h2')  return <h2 key={i} style={{ fontSize:22, fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, letterSpacing:.5, color:'var(--text)', marginBottom:14, marginTop:36 }}>{text.toUpperCase()}</h2>;
            if (block.type==='p')   return <p key={i} style={{ fontSize:15, lineHeight:1.9, color:'var(--text2)', marginBottom:20 }}>{text}</p>;
            return null;
          })}
        </div>
        <div style={{ marginTop:48, padding:'20px 24px', background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:4 }}>
          <div style={{ fontSize:9, color:'var(--amber)', fontFamily:'IBM Plex Mono,monospace', letterSpacing:2, marginBottom:8 }}>EXPLORE THE DATA</div>
          <p style={{ fontSize:13, color:'var(--text2)', marginBottom:12 }}>Every claim in this article is derived from the CarComfortScore methodology. Use the rankings and compare tool to verify the numbers yourself.</p>
          <Link href="/" style={{ fontSize:10, color:'var(--amber)', textDecoration:'none', border:'1px solid rgba(200,122,16,.4)', borderRadius:2, padding:'6px 14px', fontFamily:'IBM Plex Mono,monospace' }}>← BACK TO RANKINGS</Link>
        </div>
      </div>
    </>
  );
}
