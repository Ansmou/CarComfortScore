"use client"
export default function SciencePage() {
  return (
    <main style={{maxWidth:740,margin:"0 auto",padding:"48px 24px"}}>
      <div style={{fontSize:9,color:"var(--amber)",fontFamily:"IBM Plex Mono, monospace",letterSpacing:3,marginBottom:12}}>MEASUREMENT METHODOLOGY</div>
      <h1 style={{fontSize:40,fontFamily:"Barlow Condensed, sans-serif",fontWeight:800,letterSpacing:1,marginBottom:16,lineHeight:1.1}}>HOW WE MEASURE RIDE COMFORT</h1>
      <p style={{fontSize:15,color:"var(--text2)",lineHeight:1.9,marginBottom:40}}>CarComfortScore applies ISO 2631-1 whole-body vibration standards and automotive NVH engineering frameworks to produce objective, comparable ride quality indices for every vehicle.</p>
      {[
        {code:"01",label:"Impact Isolation",weight:"35%",color:"var(--amber)",desc:"Discrete impact transmission from road to occupant. 10-stage energy chain: tyre sidewall → rim → control arm bushings → spring/damper → strut mount → rear suspension architecture → rear bushing network → subframe mounts → body/deadening → seat foam. Based on ISO 2631-1 vertical impulse response. Rear suspension architecture is the dominant variable."},
        {code:"02",label:"Ride Motion Comfort",weight:"40%",color:"var(--blue)",desc:"Continuous body motion quality in the 0.5–8 Hz range of maximum human vestibular sensitivity. Scored across spring rate-to-mass ratio, wheelbase pitch dynamics, rear suspension independence, damper rebound calibration, and sprung mass inertial damping. Highest weight — this dominates daily driving perception."},
        {code:"03",label:"Cabin Acoustic Environment",weight:"25%",color:"var(--green)",desc:"Structure-borne vibration and airborne noise in the occupied cabin (20–250 Hz). Scored across constrained-layer damping coverage, body torsional rigidity, elastomer quality, seat decoupling, and acoustic glazing. Most perceptible on sustained highway operation."},
        {code:"04",label:"WBV Impact Penalty",weight:"−penalty",color:"var(--red)",desc:"Corrects for impact character effects not captured in composite averaging. Low-frequency (4–8 Hz) high-amplitude impacts correlate with lumbar loading per WHO guidelines. Penalty: −0 (multilink/independent), −4 (torsion beam), −10 (coil solid axle), −15 (leaf spring)."},
      ].map(item=>(
        <div key={item.code} style={{display:"grid",gridTemplateColumns:"48px 1fr",gap:16,marginBottom:28,paddingTop:20,borderTop:"1px solid var(--border)"}}>
          <div style={{fontSize:22,fontWeight:800,fontFamily:"IBM Plex Mono, monospace",color:item.color,paddingTop:2}}>{item.code}</div>
          <div>
            <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
              <h2 style={{fontSize:16,fontFamily:"Barlow Condensed, sans-serif",fontWeight:700,letterSpacing:.5,color:"var(--text)"}}>{item.label.toUpperCase()}</h2>
              <span style={{fontSize:9,color:item.color,fontFamily:"IBM Plex Mono, monospace",border:`1px solid ${item.color}40`,borderRadius:2,padding:"2px 8px"}}>{item.weight}</span>
            </div>
            <p style={{fontSize:13,lineHeight:1.9,color:"var(--text2)"}}>{item.desc}</p>
          </div>
        </div>
      ))}
      <div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:4,padding:"14px 18px",marginTop:8}}>
        <div style={{fontSize:9,color:"var(--amber)",fontFamily:"IBM Plex Mono, monospace",letterSpacing:2,marginBottom:6}}>FORMULA</div>
        <div style={{fontFamily:"IBM Plex Mono, monospace",fontSize:13,lineHeight:2,color:"var(--text)"}}>
          <span style={{color:"var(--amber)"}}>S</span>×0.35 + <span style={{color:"var(--blue)"}}>M</span>×0.40 + <span style={{color:"var(--green)"}}>A</span>×0.25 − <span style={{color:"var(--red)"}}>P</span> = <strong style={{color:"var(--amber)"}}>CRCS</strong>
        </div>
      </div>
      <div style={{marginTop:20,background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:4,padding:"14px 18px"}}>
        <div style={{fontSize:9,color:"var(--amber)",fontFamily:"IBM Plex Mono, monospace",letterSpacing:2,marginBottom:8}}>LIMITATIONS & TRANSPARENCY</div>
        <p style={{fontSize:13,lineHeight:1.8,color:"var(--text2)"}}>CarComfortScore is an engineering estimate model, not an instrumented laboratory measurement. Scores are derived from published suspension specifications, dimensional data, and tyre specifications. JDM imports are scored at approximately 70% component effectiveness to account for typical age-related elastomer degradation. All vehicles are evaluated on the same model with identical weighting — no manufacturer relationships influence any score.</p>
      </div>
    </main>
  )
}
