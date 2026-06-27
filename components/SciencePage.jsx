"use client"
export default function SciencePage() {
  const METRICS = [
    {
      code:"01",label:"Impact Isolation",weight:"35%",color:"var(--amber)",
      plain:"How well the car cushions you from sudden jolts — potholes, speed bumps, broken road patches. Think of it as the 'ouch factor'. Energy from a road impact travels through your tyre, suspension, and seat before reaching you. Each component absorbs some of it — or fails to.",
      why:"35% weight because sharp impacts are the most noticeable source of discomfort. However, sustained vibration over a long drive (Ride Motion) ultimately affects your body more, which is why Motion gets a higher share.",
      detail:"Scored across a 10-stage energy chain: tyre sidewall → rim → control arm bushings → spring & damper → strut mount → rear suspension architecture → rear bushing network → subframe mounts → body & deadening → seat foam. Rear suspension type is the single biggest variable.",
    },
    {
      code:"02",label:"Ride Motion Comfort",weight:"40% — highest",color:"var(--blue)",
      plain:"The floating, swaying, or rocking sensation while driving — especially on undulating motorway sections or uneven city roads. This is what people usually mean when they say a car 'feels soft' or 'feels bouncy'. It's a continuous sensation, not a single impact.",
      why:"Highest weight at 40% because research on human vibration sensitivity shows the 0.5–8 Hz frequency range — which suspension directly controls — causes the most fatigue and physical stress over time. A car that handles bumps well but has poor motion control will still wear you down on a long drive.",
      detail:"Scored across spring rate-to-mass ratio, wheelbase pitch dynamics, rear suspension independence, damper rebound calibration, and sprung mass inertial damping.",
    },
    {
      code:"03",label:"Cabin Acoustic Environment",weight:"25%",color:"var(--green)",
      plain:"How much road noise and vibration seeps into the cabin — the constant hum at motorway speeds, the buzz over rough tarmac, the drone at 100 km/h. Quieter cabins reduce fatigue on longer drives.",
      why:"Lowest weight at 25% because your body adapts to noise more readily than to physical vibration. A louder cabin is tiring; sustained harsh vibration has direct physical health consequences. So comfort from quietness matters, but not as much as physical impact and motion.",
      detail:"Scored across constrained-layer damping coverage, body torsional rigidity, elastomer quality, seat decoupling, and acoustic glazing. Most noticeable during sustained highway operation.",
    },
    {
      code:"04",label:"WBV Impact Penalty",weight:"−penalty",color:"var(--red)",
      plain:"Some suspension types — like leaf springs on trucks and coil solid axles on large SUVs — create a specific vibration pattern at 4–8 Hz. This low frequency is the same range that the human lumbar spine resonates at. Research links sustained exposure to this pattern with lower back loading and long-term spine stress. This penalty reduces the score for vehicles that produce this effect, beyond what the three scores above already capture.",
      why:"Applied as a separate correction because the health risk from high-amplitude, low-frequency impacts isn't fully captured by averaging three comfort scores. Two cars can score similarly in total but differ greatly in what kind of vibration they deliver — and that difference matters for your body over years of daily use.",
      detail:"Penalty values: −0 pts (multilink or independent rear), −4 pts (torsion beam), −10 pts (coil solid axle), −15 pts (leaf spring).",
    },
  ];

  return (
    <main style={{maxWidth:740,margin:"0 auto",padding:"48px 24px 72px"}}>
      <div style={{fontSize:9,color:"var(--amber)",fontFamily:"IBM Plex Mono, monospace",letterSpacing:3,marginBottom:12}}>MEASUREMENT METHODOLOGY</div>
      <h1 style={{fontSize:40,fontFamily:"Barlow Condensed, sans-serif",fontWeight:800,letterSpacing:1,marginBottom:16,lineHeight:1.1}}>HOW WE SCORE RIDE COMFORT</h1>
      <p style={{fontSize:15,color:"var(--text2)",lineHeight:1.9,marginBottom:10}}>Each car is scored across three things your body actually feels on the road, then combined into one number — the CRCS (Car Ride Comfort Score).</p>
      <p style={{fontSize:13,color:"var(--text4)",lineHeight:1.8,marginBottom:40}}>Scores are calculated from real suspension specifications, tyre dimensions, and platform data — not subjective opinion or test drives. Tap any car on the rankings page to see a full component-by-component breakdown.</p>

      {METRICS.map(item=>(
        <div key={item.code} style={{marginBottom:32,paddingTop:24,borderTop:"1px solid var(--border)"}}>
          <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
            <div style={{fontSize:20,fontWeight:800,fontFamily:"IBM Plex Mono, monospace",color:item.color,paddingTop:3,flexShrink:0,minWidth:32}}>{item.code}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
                <h2 style={{fontSize:16,fontFamily:"Barlow Condensed, sans-serif",fontWeight:700,letterSpacing:.5,color:"var(--text)",margin:0}}>{item.label.toUpperCase()}</h2>
                <span style={{fontSize:9,color:item.color,fontFamily:"IBM Plex Mono, monospace",border:`1px solid ${item.color}40`,borderRadius:2,padding:"2px 8px"}}>{item.weight}</span>
              </div>
              <p style={{fontSize:14,lineHeight:1.8,color:"var(--text)",marginBottom:10}}>{item.plain}</p>
              <div style={{background:"var(--bg3)",borderLeft:`3px solid ${item.color}`,padding:"10px 14px",marginBottom:10,borderRadius:"0 4px 4px 0"}}>
                <div style={{fontSize:9,color:item.color,fontFamily:"IBM Plex Mono, monospace",letterSpacing:1,marginBottom:4}}>WHY THIS WEIGHT?</div>
                <p style={{fontSize:12,lineHeight:1.7,color:"var(--text2)",margin:0}}>{item.why}</p>
              </div>
              <p style={{fontSize:12,lineHeight:1.8,color:"var(--text3)",margin:0}}>{item.detail}</p>
            </div>
          </div>
        </div>
      ))}

      <div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:4,padding:"16px 18px",marginTop:8,marginBottom:16}}>
        <div style={{fontSize:9,color:"var(--amber)",fontFamily:"IBM Plex Mono, monospace",letterSpacing:2,marginBottom:10}}>FORMULA</div>
        <div style={{fontFamily:"IBM Plex Mono, monospace",fontSize:13,lineHeight:2,color:"var(--text)",marginBottom:14}}>
          <span style={{color:"var(--amber)"}}>S</span>×0.35 + <span style={{color:"var(--blue)"}}>M</span>×0.40 + <span style={{color:"var(--green)"}}>A</span>×0.25 − <span style={{color:"var(--red)"}}>P</span> = <strong style={{color:"var(--amber)"}}>CRCS</strong>
        </div>
        <p style={{fontSize:12,lineHeight:1.8,color:"var(--text3)",borderTop:"1px solid var(--border)",paddingTop:12,margin:0}}>
          In plain words: (How well it handles bumps × 35%) + (How smooth the ride feels × 40%) + (How quiet the cabin is × 25%) − penalty for harsh vibration type = Final score.<br/><br/>
          A car can score moderately across all three and still rank well overall. A car with one very weak area gets dragged down significantly — there is no way to hide a serious flaw behind strong scores elsewhere.
        </p>
      </div>

      <div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:4,padding:"16px 18px",marginBottom:16}}>
        <div style={{fontSize:9,color:"var(--amber)",fontFamily:"IBM Plex Mono, monospace",letterSpacing:2,marginBottom:14}}>VOCABULARY — PLAIN ENGLISH GLOSSARY</div>
        {[
          ["ISO 2631-1","The international engineering standard for measuring how much vibration the human body absorbs while riding in a vehicle. Published by the International Organization for Standardization. CarComfortScore uses this as the basis for all vibration calculations."],
          ["NVH (Noise, Vibration, Harshness)","The three comfort factors automotive engineers measure and tune. 'Noise' is sound levels inside the cabin. 'Vibration' is the physical shaking that reaches the occupant. 'Harshness' is the sharpness or abruptness of individual impacts. The Acoustic score covers N+V; Impact and Motion cover H."],
          ["WBV (Whole-Body Vibration)","Vibration that travels through the entire seated body via the seat and floor. The human spine is most vulnerable to vibration at 4–8 Hz — a frequency range that truck-like suspension systems directly produce. Per WHO guidelines, sustained daily exposure at this range is linked to lumbar loading and disc compression."],
          ["Vestibular sensitivity","Your inner ear's sensitivity to motion. Human vestibular sensitivity peaks at 0.5–8 Hz — exactly the frequency range that suspension controls. This is the scientific basis for why Ride Motion gets the highest weight in the formula."],
          ["Torsion beam","A type of rear suspension where both rear wheels are connected by a single crossmember (a metal bar that can twist). Simple, space-efficient, and cheap to produce — but a bump on one side partially affects the other side, and all the energy must travel through the body chassis before being absorbed. Very common in Pakistan's market."],
          ["Multilink / Independent rear suspension","Each rear wheel has its own set of arms and joints, moving independently. A pothole under the right rear wheel is handled by the right corner's suspension only — none of that energy crosses to the left side. Significantly better ride quality, but more expensive to engineer and produce. Currently, among locally assembled sedans in Pakistan, only the Honda Civic has this."],
          ["Elastomer degradation","The rubber in suspension bushings (small rubber-and-metal joints throughout the suspension) wears out over time and becomes stiffer. Stiffer bushings transmit more vibration. This is why Japan Import versions of cars are scored at ~70% component effectiveness — the cars are typically 8–15 years old by the time they reach Pakistan, and that rubber has degraded significantly."],
        ].map(([term, def])=>(
          <div key={term} style={{marginBottom:14,paddingBottom:14,borderBottom:"1px solid var(--border)"}}>
            <div style={{fontSize:11,fontWeight:700,fontFamily:"IBM Plex Mono, monospace",color:"var(--text)",marginBottom:4}}>{term}</div>
            <p style={{fontSize:12,lineHeight:1.7,color:"var(--text3)",margin:0}}>{def}</p>
          </div>
        ))}
      </div>

      <div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:4,padding:"16px 18px"}}>
        <div style={{fontSize:9,color:"var(--amber)",fontFamily:"IBM Plex Mono, monospace",letterSpacing:2,marginBottom:8}}>LIMITATIONS & TRANSPARENCY</div>
        <p style={{fontSize:13,lineHeight:1.8,color:"var(--text2)",margin:0}}>CarComfortScore is an engineering estimate model, not an instrumented laboratory measurement. Scores are derived from published suspension specifications, dimensional data, and tyre specifications. Japan Import versions are scored at approximately 70% component effectiveness to account for typical age-related elastomer degradation. All vehicles are evaluated on the same model with identical weighting — no manufacturer relationships influence any score.</p>
      </div>
    </main>
  )
}
