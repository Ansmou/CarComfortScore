'use client';
import { FEEDBACK_URL } from '../data/cars';

export default function FeedbackModal({ onClose }) {
  return (
    <div style={{ position:'fixed',inset:0,zIndex:2000,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',padding:20 }} onClick={onClose}>
      <div style={{ background:'var(--bg2)',border:'1px solid var(--border2)',borderRadius:4,padding:'24px 28px',maxWidth:400,width:'100%' }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16 }}>
          <div style={{ fontSize:9,color:'var(--amber)',fontFamily:'IBM Plex Mono,monospace',letterSpacing:3 }}>CONTRIBUTE</div>
          <button onClick={onClose} style={{ background:'none',border:'none',color:'var(--text3)',cursor:'pointer',fontSize:18 }}>×</button>
        </div>
        <h3 style={{ fontSize:22,fontFamily:'Barlow Condensed,sans-serif',fontWeight:700,letterSpacing:.5,marginBottom:8,color:'var(--text)' }}>TALK TO THE DEVELOPER</h3>
        <p style={{ fontSize:13,color:'var(--text2)',lineHeight:1.7,marginBottom:20 }}>Request a car, suggest a correction, or share anything about the site. All messages are read personally.</p>
        <a href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer"
          style={{ display:'flex',gap:14,alignItems:'center',background:'var(--amber)',borderRadius:4,padding:'14px 18px',textDecoration:'none',justifyContent:'center' }}>
          <span style={{ fontSize:12,fontWeight:700,color:'#fff',fontFamily:'IBM Plex Mono,monospace',letterSpacing:1 }}>OPEN GOOGLE FORM →</span>
        </a>
        <p style={{ fontSize:9,color:'var(--text4)',fontFamily:'IBM Plex Mono,monospace',marginTop:14,textAlign:'center' }}>OPENS IN A NEW TAB · RESPONSES REVIEWED WEEKLY</p>
      </div>
    </div>
  );
}
