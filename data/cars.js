// ── CarComfortScore — central data store ──
// All metric scores are derived from the engineering chain functions in lib/scoring.
// No hand-curated values — the chain IS the truth.
import { impactScore, motionScore, acousticScore } from '../lib/scoring';
export { impactScore, motionScore, acousticScore };

export const CARS = [
  {id:"hilux_revo", name:"Toyota Hilux Revo",    year:"2016+",   market:"PK · New",     cat:"Pickup Truck",      rearType:"leaf_spring",    rearLabel:"Rigid Leaf Spring",             sidewall:172,rimSize:17,wheelbase:3085,weight:2085,tire:"265/65 R17",springTuning:"truck",   platformAge:"mid", bodyType:"ladder",   hasCtb:false,hasRearSubframe:false,hcImpact:"highest"},
  {id:"hilux_vigo", name:"Toyota Hilux Vigo",    year:"2005–15", market:"PK",           cat:"Pickup Truck",      rearType:"leaf_spring",    rearLabel:"Rigid Leaf Spring",             sidewall:172,rimSize:17,wheelbase:3085,weight:1910,tire:"265/65 R17",springTuning:"truck",   platformAge:"old", bodyType:"ladder",   hasCtb:false,hasRearSubframe:false,hcImpact:"highest"},
  {id:"lc300",      name:"Land Cruiser LC300",   year:"2022+",   market:"Import",       cat:"Body-on-Frame SUV", rearType:"solid_axle",     rearLabel:"4-Link Coil Solid Axle",        sidewall:146,rimSize:20,wheelbase:2850,weight:2630,tire:"265/55 R20",springTuning:"comfort", platformAge:"new", bodyType:"ladder",   hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"lc200",      name:"Land Cruiser LC200",   year:"2008–21", market:"Japan Import",   cat:"Body-on-Frame SUV", rearType:"solid_axle",     rearLabel:"4-Link Coil Solid Axle",        sidewall:171,rimSize:18,wheelbase:2850,weight:2585,tire:"285/60 R18",springTuning:"comfort", platformAge:"mid", bodyType:"ladder",   hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"lc100",      name:"Land Cruiser LC100",   year:"1998–07", market:"Japan Import",   cat:"Body-on-Frame SUV", rearType:"solid_axle",     rearLabel:"4-Link Coil Solid Axle",        sidewall:193,rimSize:16,wheelbase:2850,weight:2300,tire:"275/70 R16",springTuning:"comfort", platformAge:"old", bodyType:"ladder",   hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"prado_250",  name:"Toyota Prado 250",     year:"2024+",   market:"Import",       cat:"Body-on-Frame SUV", rearType:"solid_axle",     rearLabel:"Coil Solid Axle (TNGA-F)",      sidewall:172,rimSize:18,wheelbase:2850,weight:2550,tire:"265/65 R18",springTuning:"comfort", platformAge:"new", bodyType:"ladder",   hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"prado_150",  name:"Toyota Prado 150",     year:"2010–23", market:"PK / Import",  cat:"Body-on-Frame SUV", rearType:"solid_axle",     rearLabel:"4-Link Coil Solid Axle",        sidewall:159,rimSize:18,wheelbase:2790,weight:2300,tire:"265/60 R18",springTuning:"comfort", platformAge:"mid", bodyType:"ladder",   hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"prado_120",  name:"Toyota Prado 120",     year:"2002–09", market:"Japan Import",   cat:"Body-on-Frame SUV", rearType:"solid_axle",     rearLabel:"4-Link Solid Axle",             sidewall:172,rimSize:17,wheelbase:2790,weight:2100,tire:"265/65 R17",springTuning:"comfort", platformAge:"old", bodyType:"ladder",   hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"fortuner",   name:"Toyota Fortuner",      year:"2016+",   market:"PK · New",     cat:"Body-on-Frame SUV", rearType:"solid_axle",     rearLabel:"Solid Live Axle (Truck)",       sidewall:172,rimSize:17,wheelbase:2745,weight:2125,tire:"265/65 R17",springTuning:"truck",   platformAge:"mid", bodyType:"ladder",   hasCtb:false,hasRearSubframe:false,hcImpact:"high"},
  {id:"pajero",     name:"Mitsubishi Pajero",    year:"2006–21", market:"Japan Import",   cat:"Large SUV",         rearType:"multilink",      rearLabel:"Multi-link + Monocoque",        sidewall:186,rimSize:16,wheelbase:2780,weight:2135,tire:"265/70 R16",springTuning:"comfort", platformAge:"mid", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"santa_fe",   name:"Hyundai Santa Fe",     year:"2024",    market:"PK · New",     cat:"Large SUV",         rearType:"multilink",      rearLabel:"Multilink + Rear Subframe",     sidewall:129,rimSize:19,wheelbase:2815,weight:1500,tire:"235/55 R19",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:true, hcImpact:"low"},
  {id:"sportage",   name:"Kia Sportage",         year:"2022+",   market:"PK · New",     cat:"Compact SUV",       rearType:"multilink",      rearLabel:"Multilink Rear",                sidewall:135,rimSize:17,wheelbase:2755,weight:1490,tire:"225/60 R17",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"tucson",     name:"Hyundai Tucson",       year:"2024",    market:"PK · New",     cat:"Compact SUV",       rearType:"multilink",      rearLabel:"Multilink Rear",                sidewall:129,rimSize:19,wheelbase:2755,weight:1500,tire:"235/55 R19",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"h6_hev",     name:"Haval H6 HEV",         year:"2024",    market:"PK · New",     cat:"Mid SUV",           rearType:"multilink",      rearLabel:"Multilink Rear",                sidewall:124,rimSize:19,wheelbase:2738,weight:1600,tire:"225/55 R19",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"crv",        name:"Honda CR-V",           year:"2024",    market:"CBU Import",   cat:"Compact SUV",       rearType:"multilink",      rearLabel:"Multilink Rear",                sidewall:141,rimSize:18,wheelbase:2700,weight:1540,tire:"235/60 R18",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"mg_hs_phev", name:"MG HS PHEV",           year:"2024",    market:"PK · New",     cat:"Compact SUV",       rearType:"multilink",      rearLabel:"Multilink Rear",                sidewall:118,rimSize:18,wheelbase:2720,weight:1700,tire:"235/50 R18",springTuning:"standard",platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"mg_hs",      name:"MG HS",                year:"2023",    market:"PK · New",     cat:"Compact SUV",       rearType:"multilink",      rearLabel:"Multilink Rear",                sidewall:118,rimSize:18,wheelbase:2720,weight:1545,tire:"235/50 R18",springTuning:"standard",platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"mg_zs_ev",   name:"MG ZS EV",             year:"2023",    market:"PK · New",     cat:"Electric SUV",      rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:118,rimSize:17,wheelbase:2585,weight:1532,tire:"215/55 R17",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"mg_zs",      name:"MG ZS",                year:"2023",    market:"PK · New",     cat:"Compact SUV",       rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:118,rimSize:17,wheelbase:2585,weight:1305,tire:"215/55 R17",springTuning:"standard",platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"byd_atto2",  name:"BYD Atto 2",           year:"2024",    market:"PK",           cat:"Electric SUV",      rearType:"torsion_beam",   rearLabel:"Torsion Beam + CTB",            sidewall:129,rimSize:17,wheelbase:2620,weight:1570,tire:"215/60 R17",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:true, hasRearSubframe:false,hcImpact:"low"},
  {id:"jolion",     name:"Haval Jolion",          year:"2024",    market:"PK · New",     cat:"Compact SUV",       rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:118,rimSize:17,wheelbase:2700,weight:1400,tire:"215/55 R17",springTuning:"standard",platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"hrv",        name:"Honda HR-V",            year:"2024",    market:"PK · New",     cat:"Compact SUV",       rearType:"torsion_beam",   rearLabel:"Torsion Beam (PK only)",        sidewall:129,rimSize:17,wheelbase:2610,weight:1270,tire:"215/60 R17",springTuning:"standard",platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"vezel",      name:"Honda Vezel",           year:"2014",    market:"Japan Import",   cat:"Compact SUV",       rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:118,rimSize:17,wheelbase:2610,weight:1380,tire:"215/55 R17",springTuning:"standard",platformAge:"mid", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"peugeot2008",name:"Peugeot 2008",         year:"2022+",   market:"PK · New",     cat:"Compact SUV",       rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:118,rimSize:17,wheelbase:2605,weight:1244,tire:"215/55 R17",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"civic_11pk", name:"Honda Civic 11th Gen", year:"2022+",   market:"PK · New",     cat:"Sedan",             rearType:"multilink",      rearLabel:"Multilink Rear",                sidewall:118,rimSize:16,wheelbase:2735,weight:1396,tire:"215/55 R16",springTuning:"standard",platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"civic_11jdm",name:"Honda Civic 11th (Japan Import)",year:"2021+", market:"Japan Import",   cat:"Sedan",             rearType:"multilink",      rearLabel:"Multilink Rear",                sidewall:94,rimSize:18,wheelbase:2735,weight:1350,tire:"235/40 R18",springTuning:"standard",platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"civic_10pk", name:"Honda Civic 10th Gen", year:"2016–21", market:"PK",           cat:"Sedan",             rearType:"multilink",      rearLabel:"Multilink Rear",                sidewall:118,rimSize:16,wheelbase:2700,weight:1267,tire:"215/55 R16",springTuning:"standard",platformAge:"mid", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"civic_9pk",  name:"Honda Civic 9th Gen",  year:"2012–15", market:"PK",           cat:"Sedan",             rearType:"multilink",      rearLabel:"Multilink Rear",                  sidewall:127,rimSize:15,wheelbase:2670,weight:1270,tire:"195/65 R15",springTuning:"standard",platformAge:"old", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"civic_8pk",  name:"Honda Civic 8th Gen",  year:"2006–12", market:"PK",           cat:"Sedan",             rearType:"multilink",      rearLabel:"Multilink Double Wishbone",     sidewall:127,rimSize:15,wheelbase:2700,weight:1179,tire:"195/65 R15",springTuning:"standard",platformAge:"old", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"civic_7pk",  name:"Honda Civic 7th Gen",  year:"2001–05", market:"PK",           cat:"Sedan",             rearType:"double_wishbone",rearLabel:"Double Wishbone",                  sidewall:127,rimSize:15,wheelbase:2620,weight:1093,tire:"195/65 R15",springTuning:"comfort", platformAge:"old", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"city_6pk",   name:"Honda City 6th Gen",   year:"2021+",   market:"PK · New",     cat:"Sedan",             rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:102,rimSize:16,wheelbase:2600,weight:1100,tire:"185/55 R16",springTuning:"standard",platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"city_5pk",   name:"Honda City 5th Gen",   year:"2009–21", market:"PK",           cat:"Sedan",             rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:114,rimSize:15,wheelbase:2550,weight:1085,tire:"175/65 R15",springTuning:"standard",platformAge:"old", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"corolla_12pk",name:"Toyota Corolla Altis X", year:"2017+",   market:"PK · New",     cat:"Sedan",             rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:113,rimSize:16,wheelbase:2700,weight:1310,tire:"205/55 R16",springTuning:"comfort", platformAge:"mid", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"corolla_12jdm",name:"Corolla 12th (Japan Import)", year:"2019+",   market:"Japan Import",   cat:"Sedan",             rearType:"multilink",      rearLabel:"Multilink (Japan Import)",          sidewall:97,rimSize:17,wheelbase:2700,weight:1370,tire:"215/45 R17",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"corolla_11pk",name:"Toyota Corolla 11th", year:"2014–21", market:"PK",           cat:"Sedan",             rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:127,rimSize:15,wheelbase:2700,weight:1280,tire:"195/65 R15",springTuning:"comfort", platformAge:"old", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"yaris_pk",   name:"Toyota Yaris (PK)",    year:"2020+",   market:"PK · New",     cat:"Sedan",             rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:111,rimSize:15,wheelbase:2550,weight:1085,tire:"185/60 R15",springTuning:"standard",platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"premio",     name:"Toyota Premio",        year:"2016–21", market:"Japan Import",   cat:"Sedan",             rearType:"torsion_beam",   rearLabel:"Torsion Beam (T260 FWD)",               sidewall:127,rimSize:15,wheelbase:2700,weight:1270,tire:"195/65 R15",springTuning:"comfort", platformAge:"mid", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"elantra",    name:"Hyundai Elantra (AD)", year:"2021",    market:"PK",           cat:"Sedan",             rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:113,rimSize:16,wheelbase:2700,weight:1373,tire:"205/55 R16",springTuning:"standard",platformAge:"old", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"prius_5",    name:"Toyota Prius 5th Gen", year:"2023+",   market:"Japan Import",   cat:"Sedan",             rearType:"double_wishbone",rearLabel:"Double Wishbone (TNGA-C)",      sidewall:98,rimSize:19,wheelbase:2750,weight:1450,tire:"195/50 R19",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"prius_4",    name:"Toyota Prius 4th Gen", year:"2015–22", market:"Japan Import",   cat:"Sedan",             rearType:"double_wishbone",rearLabel:"Double Wishbone",               sidewall:127,rimSize:15,wheelbase:2700,weight:1380,tire:"195/65 R15",springTuning:"comfort", platformAge:"mid", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"low"},
  {id:"prius_3",    name:"Toyota Prius 3rd Gen", year:"2009–15", market:"Japan Import",   cat:"Sedan",             rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:127,rimSize:15,wheelbase:2700,weight:1380,tire:"195/65 R15",springTuning:"comfort", platformAge:"old", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"aqua_2",     name:"Toyota Aqua 2nd Gen",  year:"2021+",   market:"Japan Import",   cat:"Hatchback",         rearType:"torsion_beam",   rearLabel:"Torsion Beam (TNGA-B)",         sidewall:120,rimSize:15,wheelbase:2600,weight:1130,tire:"185/65 R15",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"aqua_1",     name:"Toyota Aqua 1st Gen",  year:"2011–21", market:"Japan Import",   cat:"Hatchback",         rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:114,rimSize:15,wheelbase:2550,weight:1080,tire:"175/65 R15",springTuning:"comfort", platformAge:"mid", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"vitz",       name:"Toyota Vitz",          year:"2018",    market:"Japan Import",   cat:"Hatchback",         rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:114,rimSize:15,wheelbase:2510,weight:970, tire:"175/65 R15",springTuning:"comfort", platformAge:"mid", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"passo",      name:"Toyota Passo",         year:"2018",    market:"Japan Import",   cat:"Hatchback",         rearType:"torsion_beam",   rearLabel:"Torsion Beam (stiffened)",      sidewall:107,rimSize:14,wheelbase:2490,weight:910, tire:"165/65 R14",springTuning:"stiff",   platformAge:"mid", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"swift",      name:"Suzuki Swift",         year:"2022",    market:"PK · New",     cat:"Hatchback",         rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:102,rimSize:16,wheelbase:2450,weight:949, tire:"185/55 R16",springTuning:"standard",platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"cultus",     name:"Suzuki Cultus",        year:"2017+",   market:"PK · New",     cat:"Hatchback",         rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:107,rimSize:14,wheelbase:2425,weight:815, tire:"165/65 R14",springTuning:"standard",platformAge:"mid", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"alto_pk",    name:"Suzuki Alto (PK)",     year:"2024",    market:"PK · New",     cat:"Hatchback",         rearType:"torsion_beam",   rearLabel:"Torsion Beam (budget)",         sidewall:116,rimSize:13,wheelbase:2460,weight:660, tire:"145/80 R13",springTuning:"stiff",   platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"alto_jdm",   name:"Suzuki Alto (Japan Import)",    year:"2019–21", market:"Japan Import",   cat:"Hatchback",         rearType:"torsion_beam",   rearLabel:"Torsion Beam (Japan-spec)",      sidewall:116,rimSize:13,wheelbase:2460,weight:660, tire:"145/80 R13",springTuning:"comfort", platformAge:"mid", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"wagonr_pk",  name:"Suzuki WagonR (PK)",   year:"2024",    market:"PK · New",     cat:"Hatchback",         rearType:"trailing_arm",   rearLabel:"Trailing Arm",                  sidewall:116,rimSize:13,wheelbase:2400,weight:825, tire:"145/80 R13",springTuning:"standard",platformAge:"mid", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"wagonr_jdm", name:"Suzuki WagonR (Japan Import)",  year:"2014–17", market:"Japan Import",   cat:"Hatchback",         rearType:"torsion_beam",   rearLabel:"Torsion Beam (Japan-spec)",      sidewall:101,rimSize:14,wheelbase:2460,weight:780, tire:"155/65 R14",springTuning:"comfort", platformAge:"mid", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},
  {id:"mira",       name:"Daihatsu Mira",        year:"2015–18", market:"Japan Import",   cat:"Hatchback",         rearType:"torsion_beam",   rearLabel:"Torsion Beam",                  sidewall:101,rimSize:14,wheelbase:2455,weight:700, tire:"155/65 R14",springTuning:"comfort", platformAge:"mid", bodyType:"monocoque",hasCtb:false,hasRearSubframe:false,hcImpact:"mid"},

  // ── Recent Pakistan market additions (2024–26) — Chinese SUVs + BJ40 ──
  {id:"jaecoo_j5",     name:"Jaecoo J5",            year:"2026",    market:"PK · New",     cat:"Compact SUV",       rearType:"multilink",      rearLabel:"Multilink Rear",                sidewall:129,rimSize:18,wheelbase:2620,weight:1450,tire:"235/55 R18",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:true, hcImpact:"low"},
  {id:"jaecoo_j7",     name:"Jaecoo J7 PHEV",       year:"2025",    market:"PK · New",     cat:"Mid SUV",           rearType:"multilink",      rearLabel:"Multilink Rear",                sidewall:118,rimSize:19,wheelbase:2672,weight:2210,tire:"235/50 R19",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:true, hcImpact:"low"},
  {id:"tiggo_7_pro",   name:"Chery Tiggo 7 Pro",    year:"2023+",   market:"PK · New",     cat:"Compact SUV",       rearType:"multilink",      rearLabel:"Multilink Rear",                sidewall:129,rimSize:18,wheelbase:2670,weight:1450,tire:"235/55 R18",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:true, hcImpact:"low"},
  {id:"tiggo_8_pro",   name:"Chery Tiggo 8 Pro",    year:"2022+",   market:"PK · New",     cat:"Mid SUV",           rearType:"multilink",      rearLabel:"Multilink Wishbone Rear",       sidewall:129,rimSize:18,wheelbase:2710,weight:1620,tire:"235/55 R18",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:true, hcImpact:"low"},
  {id:"tiggo_9",       name:"Chery Tiggo 9 PHEV",   year:"2026+",   market:"PK · New",     cat:"Large SUV",         rearType:"multilink",      rearLabel:"Multilink + CDC Adaptive",      sidewall:123,rimSize:20,wheelbase:2820,weight:2308,tire:"245/50 R20",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:false,hasRearSubframe:true, hcImpact:"low"},
  {id:"baic_bj40_plus",name:"BAIC BJ40 Plus",       year:"2023+",   market:"PK · New",     cat:"Body-on-Frame SUV", rearType:"solid_axle",     rearLabel:"5-Link Coil Solid Axle",        sidewall:172,rimSize:17,wheelbase:2745,weight:2080,tire:"265/65 R17",springTuning:"truck",   platformAge:"mid", bodyType:"ladder",   hasCtb:false,hasRearSubframe:false,hcImpact:"high"},
  {id:"deepal_s05",    name:"Deepal S05 REEV",      year:"2025+",   market:"PK · New",     cat:"Electric SUV",      rearType:"multilink",      rearLabel:"Multilink + CTV Battery",       sidewall:135,rimSize:18,wheelbase:2880,weight:1940,tire:"225/60 R18",springTuning:"comfort", platformAge:"new", bodyType:"monocoque",hasCtb:true, hasRearSubframe:true, hcImpact:"low"},
];

export const ARTICLES = [
  {
    id:"fortuner-vs-alto",
    slug:"fortuner-vs-alto",
    title:"Why the Fortuner and Alto Score So Similarly — And Why That's the Most Misleading Number on This Site",
    category:"DEEP DIVE",
    readTime:"6 min read",
    summary:"A PKR 150 lakh truck and a PKR 32 lakh hatchback arrive at almost the same comfort score. Here's what that number hides — and why it matters more than the score itself.",
    cars:["Fortuner","Alto (PK)"],
    content:[
      {type:"lead",text:"The Toyota Fortuner costs up to PKR 165 lakh. The Suzuki Alto costs PKR 32 lakh. Their CarComfortScore composite numbers sit within 4 points of each other. If you stopped reading there, you'd conclude they ride about the same. You'd be wrong in a way that matters for your health."},
      {type:"h2",text:"The numbers that match"},
      {type:"p",text:"Fortuner CRCS: 42. Alto (PK) CRCS: 34. Eight points separates them — less than the gap between a Corolla and a Civic. At a glance, this suggests both cars deliver a similar ride quality experience on Pakistani roads. This is technically correct and practically misleading at the same time."},
      {type:"h2",text:"Where the Fortuner's score comes from"},
      {type:"p",text:"The Fortuner's score is dragged up by one thing: its enormous 265/65 R17 tyres with 172mm of sidewall. That's nearly 17 centimetres of rubber between the road and the rim. On a sharp stone strike, that tyre cushions the initial impact better than almost any car in the Pakistani market. Without those tall tyres, the Fortuner would score in the 60s on raw energy transmission."},
      {type:"p",text:"Below those tyres sits a solid rear axle — the same design used in the Hilux pickup truck, because that's exactly what it is. Both rear wheels are bolted to one rigid steel beam. When the right rear wheel hits a pothole, the entire axle rotates. The left rear rises. The body pitches. You feel it as a heavy, lateral jolt that reverberates for a second or two before settling."},
      {type:"h2",text:"Where the Alto's score comes from"},
      {type:"p",text:"The Alto scores similarly through a completely different failure mode. Its torsion beam rear suspension isn't as physically violent as the Fortuner's solid axle — it doesn't produce that sudden lateral jolt. But at 660kg with stiffened springs, every impact is transmitted quickly and sharply. The car is too light and too stiff to absorb anything."},
      {type:"h2",text:"The frequency difference — why this matters for your body"},
      {type:"p",text:"The Alto and the Fortuner produce vibrations at different frequencies. The Alto's thin body and stiff torsion beam create high-frequency buzz — roughly 20–40 Hz. Annoying, fatiguing, but not structurally damaging at normal exposure levels."},
      {type:"p",text:"The Fortuner's solid axle on its truck-spec springs produces vibrations in the 4–8 Hz range. This is the resonant frequency of the human lumbar spine. ISO 2631-1, the international standard for whole-body vibration, identifies 4–8 Hz vertical vibration as the frequency range of maximum health risk for the seated occupant. Sustained daily exposure at this frequency is linked to lower back disorders and intervertebral disc compression."},
      {type:"h2",text:"What the score is actually telling you"},
      {type:"p",text:"When two cars have similar composite scores, the breakdown matters more than the total. The Alto scores 28 on Impact Isolation — the worst of any car in this database. The Fortuner scores 52 on the same metric. But the Fortuner's WBV penalty brings its total down because the character of what gets through is more medically significant than the quantity. The number is a starting point. The components tell the story."},
    ]
  },
  {
    id:"civic-vs-corolla",
    slug:"civic-vs-corolla",
    title:"Honda Civic vs Toyota Corolla: The Suspension Truth Pakistan's Car Media Won't Tell You",
    category:"COMPARISON",
    readTime:"7 min read",
    summary:"Both are locally assembled. Both are called Japanese sedans. One lets 15 units of a pothole hit reach your spine. The other lets 47 through. Here's exactly why.",
    cars:["Civic 11th Gen","Corolla 12th Gen"],
    content:[
      {type:"lead",text:"The Corolla and Civic are Pakistan's two most compared cars. Every review says something like 'the Corolla has a softer ride, the Civic is more sporty.' The correct comparison is: one of these cars lets 15% of a pothole hit reach your spine; the other lets 47% through. The difference is entirely architectural."},
      {type:"h2",text:"The one fact that explains everything"},
      {type:"p",text:"Pakistan's Honda Civic 11th generation has a fully independent multilink rear suspension. Pakistan's Toyota Corolla 12th generation has a torsion beam rear suspension. These are fundamentally different engineering architectures, and the Corolla's is the cheaper one."},
      {type:"p",text:"The global E210 Corolla in Japan, Europe, and Australia gets a multilink rear. Pakistan gets the torsion beam version — a cost decision Toyota made for price-sensitive assembled markets. You are paying for a 2024 car but receiving 2014-era rear suspension architecture."},
      {type:"h2",text:"What torsion beam means in practice"},
      {type:"p",text:"A torsion beam is a single metal bar connecting both rear wheels. When the right rear wheel hits a stone, the bar twists. That twist is felt by the left rear wheel, which transfers energy into the chassis, which transfers it to the body floor, which transfers it to your seat. The energy doesn't get absorbed — it gets rerouted into your body through a different path."},
      {type:"p",text:"Multilink suspension gives each rear wheel its own set of arms and bushings. A stone under the right rear wheel is absorbed by the right rear corner's suspension geometry, bushing network, and subframe mounts — and none of that energy crosses to the left side. The wave simply dies at the corner."},
      {type:"h2",text:"Why the Corolla feels softer on normal roads"},
      {type:"p",text:"If you drove both cars on a smooth road today, the Corolla would feel softer. This is real and not an illusion. Toyota deliberately calibrates very soft springs — they compress easily over continuous road texture, creating a floating sensation. This is what most Pakistani drivers mean when they say the Corolla rides well."},
      {type:"p",text:"But the Corolla's soft springs cannot compensate for the torsion beam's energy cross-transfer on sharp impacts. When you hit an actual pothole — the kind Pakistan's roads produce daily — the Corolla's floating springs have no mechanism to prevent the torsion beam from distributing that energy across the chassis. The Civic's multilink does."},
      {type:"h2",text:"What you should actually be asking your dealer"},
      {type:"p",text:"The question isn't 'which car feels softer.' The question is 'which car uses independent rear suspension.' In Pakistan's current market, only the Honda Civic uses independent rear suspension among locally assembled sedans. The Corolla, Yaris, City, and Elantra all use torsion beam."},
    ]
  },
  {
    id:"jdm-vs-local",
    slug:"jdm-vs-local",
    title:"JDM vs Pakistan-Assembled: What You Actually Lose When Buying Local",
    category:"ANALYSIS",
    readTime:"5 min read",
    summary:"The Alto JDM and Alto PK are the same car — same platform, same engine, same body. They score 14 points apart on CarComfortScore. Here's exactly what's different.",
    cars:["Alto (PK)","Alto (JDM)"],
    content:[
      {type:"lead",text:"Pakistan's domestically assembled cars are built from knock-down kits. The body, suspension geometry, and engine are largely the same as the JDM version. So why does the JDM Alto score 14 points higher than the Pakistan Alto on the same platform? The answer involves three decisions made specifically to hit a price point."},
      {type:"h2",text:"The three differences that matter"},
      {type:"p",text:"Floor deadening material. Spring tuning. Bushing rubber compound. These three things, adjusted at assembly, account for nearly the entire comfort gap between JDM and locally assembled versions of the same car."},
      {type:"h2",text:"Floor deadening: the most visible difference"},
      {type:"p",text:"Lift the carpets in a JDM Alto and a Pakistan Alto side by side. The JDM car has a layer of butyl-coated bitumen sheet covering the full floor pan, firewall, and wheel arch areas. The Pakistan car has either partial coverage or a thinner version. On a smooth Lahore road at low speed, this difference is imperceptible. At 100 km/h on the motorway, you hear the difference as a constant road buzz."},
      {type:"h2",text:"The WagonR reversal"},
      {type:"p",text:"The WagonR tells a different story. Pakistan's assembled WagonR uses trailing arm rear suspension — two separate arms, each with their own coil spring. The JDM WagonR MH34S uses a torsion beam. Pakistan inadvertently kept the older, better-for-comfort design because the local assembly was frozen on a previous-generation platform before Suzuki switched to torsion beam in Japan."},
      {type:"h2",text:"The Corolla gap"},
      {type:"p",text:"The most commercially significant JDM vs local gap in Pakistan is the Corolla. The JDM Toyota Corolla E210 has a multilink independent rear suspension. The Pakistan Toyota Corolla E210 has a torsion beam. The JDM Corolla scores 82 on Impact Isolation. The Pakistan Corolla scores 53. The 29-point gap is entirely this one component choice."},
      {type:"h2",text:"Is JDM always better?"},
      {type:"p",text:"Not always. JDM cars are 8–15 years old by the time they reach Pakistan. All those superior rubber bushings and better deadening materials have been degrading for over a decade. A fresh Pakistan-assembled car with budget specs will often outperform a worn JDM import on actual real-world comfort. The JDM advantage is real when the car is fresh. At 80,000+ km, the gap narrows significantly."},
    ]
  },
  {
    id:"torsion-beam-trap",
    slug:"torsion-beam-trap",
    title:"The Torsion Beam Trap: Why Pakistan's Best-Selling Cars All Share the Same Weakness",
    category:"EXPLAINER",
    readTime:"5 min read",
    summary:"Corolla. City. Yaris. Cultus. Alto. WagonR. Six of Pakistan's seven best-selling cars use torsion beam rear suspension. Here's what that means and what it costs you.",
    cars:["Toyota Corolla 12th","Honda City 6th Gen"],
    content:[
      {type:"lead",text:"Look at Pakistan's seven best-selling passenger cars. Six of them use torsion beam rear suspension. This is not coincidence — it's an industry-wide cost decision. Understanding what a torsion beam is and why it affects your comfort is the single most useful thing a Pakistani car buyer can know."},
      {type:"h2",text:"What a torsion beam actually is"},
      {type:"p",text:"A torsion beam is a U-shaped or H-shaped metal bar that connects both rear wheels. The bar can twist along its length — this twisting provides a degree of spring effect for each wheel. The key word is 'connects' — unlike independent suspension where each wheel has its own mechanism, the torsion beam means both rear wheels are always partially influencing each other."},
      {type:"p",text:"When your right rear wheel hits a pothole, the beam twists. That twist creates a force on the left wheel. That force enters the chassis on the left side. The body receives an asymmetric input — a lateral torque — that manifests as a small but perceptible roll motion you didn't encounter with your front wheels."},
      {type:"h2",text:"Why manufacturers choose it"},
      {type:"p",text:"Torsion beam rear suspension saves approximately PKR 80,000–120,000 per car in manufacturing cost. It occupies less space, allowing for a larger boot. It requires fewer components, making assembly faster. For a car like the Corolla that sells 40,000+ units annually in Pakistan, the production savings are enormous."},
      {type:"h2",text:"The specific cars and their situations"},
      {type:"p",text:"Toyota Corolla (E210, Pakistan): torsion beam since introduction locally. The JDM version has multilink but Pakistan doesn't get it. Toyota Yaris: same story. Honda City (all generations in Pakistan): torsion beam. Hyundai Elantra (AD): torsion beam. Suzuki Cultus: torsion beam. Suzuki Alto (Pakistan): torsion beam, stiffened version."},
      {type:"h2",text:"The one exception"},
      {type:"p",text:"Honda Civic 10th and 11th generation use independent rear suspension in Pakistan. These are the only locally assembled sedans in Pakistani automotive history to offer independent rear suspension at their price points. When comparing any two cars in Pakistan, ask one question first: does it have independent rear suspension? That single factor dominates the ride comfort difference more than any other variable."},
    ]
  },
];

export const IMPACT_PENALTY = { low: 0, mid: -4, high: -10, highest: -15 };

export const crcs = (c) => Math.max(0, Math.round(
  impactScore(c) * 0.35 + motionScore(c) * 0.40 + acousticScore(c) * 0.25 + (IMPACT_PENALTY[c.hcImpact] || 0)
));

export const grade = (s) => {
  if (s >= 85) return { label: "OPTIMAL",   color: "#1A9E4A" };
  if (s >= 75) return { label: "EXCELLENT", color: "#1A9E4A" };
  if (s >= 65) return { label: "GOOD",      color: "#3A8A30" };
  if (s >= 55) return { label: "MODERATE",  color: "#C87A10" };
  if (s >= 45) return { label: "POOR",      color: "#B07020" };
  return             { label: "CRITICAL",   color: "#C03030" };
};

export const REAR_META = {
  multilink:       { color: "#1A9E4A", bg: "rgba(26,158,74,.1)",   border: "rgba(26,158,74,.25)",   label: "Multilink",       emoji: "✦" },
  double_wishbone: { color: "#2A6EC8", bg: "rgba(42,110,200,.1)",  border: "rgba(42,110,200,.25)",  label: "Double Wishbone", emoji: "◆" },
  trailing_arm:    { color: "#B07020", bg: "rgba(176,112,32,.1)",  border: "rgba(176,112,32,.25)",  label: "Trailing Arm",    emoji: "◈" },
  torsion_beam:    { color: "#C87A10", bg: "rgba(200,122,16,.1)",  border: "rgba(200,122,16,.25)",  label: "Torsion Beam",    emoji: "◇" },
  leaf_spring:     { color: "#7A5AC8", bg: "rgba(122,90,200,.1)",  border: "rgba(122,90,200,.25)",  label: "Leaf Spring",     emoji: "≡" },
  solid_axle:      { color: "#C03030", bg: "rgba(192,48,48,.1)",   border: "rgba(192,48,48,.25)",   label: "Solid Axle",      emoji: "✕" },
};

export const SEV_META = {
  low:     { label: "Controlled", color: "#1A9E4A", desc: "Impacts are absorbed and settle quickly. No jarring sensation." },
  mid:     { label: "Noticeable", color: "#C87A10", desc: "Frequent small bumps. Mildly fatiguing on long drives." },
  high:    { label: "Harsh",      color: "#B07020", desc: "Periodic heavy jolts. Causes fatigue and discomfort over time." },
  highest: { label: "Severe",     color: "#C03030", desc: "Truck-like violent impacts. Associated with chronic WBV exposure risk." },
};

export const CATS = ["All","Sedan","Hatchback","Compact SUV","Mid SUV","Large SUV","Body-on-Frame SUV","Pickup Truck","Electric SUV"];
export const SORTS = ["Overall Score","Impact Isolation","Ride Motion","Cabin Quiet","WBV Severity (best)"];
export const FEEDBACK_URL = "https://forms.gle/9iW6jPLYjS4Jpc9o8";
export const SITE_NAME = "CarComfortScore";
export const SITE_URL = "https://carcomfortscore.com";
export const SITE_DESCRIPTION = "Engineering-based ride quality scores for Pakistan's car market. Based on ISO 2631-1 whole-body vibration standards. Compare any two cars side by side.";
