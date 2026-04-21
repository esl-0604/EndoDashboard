export type Lang = "ko" | "en";

export type VideoItem = { id: string; title: string; src: string };

export type Component = {
  id: string;
  name: string;
  group: string; // top-level grouping e.g. "Driver Unit", "Instrument"
  image?: string;
  description?: string;
  specs?: { k: string; v: string }[];
  papers?: Paper[];
};

export type Paper = {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  type?: string;
  abstract: string;
  doi?: string;
  url?: string;
  pdf?: string;

  /** Promotional headline shown at top of paper card (conference-booth friendly) */
  highlight?: {
    big: string;       // e.g., "3.2×", "100%", "7.1 cm"
    label: string;     // e.g., "Faster Dissection"
    sub?: string;      // e.g., "vs. expert-level proficiency"
  };
  /** 3–4 concise promotional bullet claims */
  keyClaims?: string[];
  /** Side-by-side comparative bar chart data */
  comparison?: {
    title?: string;
    items: {
      label: string;
      unit?: string;
      conventional: number;
      robotic: number;
      lowerIsBetter?: boolean;
    }[];
  };
  clinical?: {
    patients?: string;
    enBloc?: string;
    r0?: string;
    procedureTime?: string;
    dissectionSpeed?: string;
    complications?: string;
    notes?: string;
  };
};

/** Flexible Summary hero stat for the Clinical Data block */
export type SummaryStat = {
  value: string;
  label: string;
  sub?: string;
  highlight?: boolean;
};

export type Product = {
  id: number;
  slug: string; // folder name in public/assets/products/
  name: string;
  category: string;
  sub: string;
  heroImage?: string;
  thumbnail?: string;
  desc: Record<Lang, string>;
  highlights?: string[]; // brochure-aligned bullet points
  specs: { k: string; v: string }[];
  clinical: { cases: string; success: string; time: string; hospitals: string };
  /** Flexible hero summary cards for the Clinical Data section (replaces legacy 4-card layout when present) */
  summary?: SummaryStat[];
  videos: VideoItem[];
  papers: Paper[];
  components?: Component[];
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "robopera",
    name: "ROBOPERA",
    category: "Robotic Endoscopic Platform",
    sub: "Robotic arm-assisted endoscopic submucosal dissection platform",
    desc: {
      ko: "(실제 데이터 미입력) ROBOPERA는 내시경 선단에 부착되는 로봇팔을 통해 정밀한 견인과 조작을 제공하는 내시경 수술 플랫폼입니다.",
      en: "ROBOPERA is a robotic endoscopic surgical platform that attaches a dexterous robotic arm to the distal tip of a conventional endoscope, providing precise traction and multidirectional manipulation during endoscopic submucosal dissection.",
    },
    specs: [
      { k: "Compatibility", v: "Standard Endoscope" },
      { k: "Control", v: "Intuitive UI" },
      { k: "Sterilization", v: "Disposable Cartridge" },
      { k: "Clearance", v: "FDA 510(k), CE, KFDA" },
    ],
    clinical: { cases: "18+", success: "100%", time: "28.8 min", hospitals: "1" },
    summary: [
      { value: "100%", label: "En Bloc Resection", sub: "Across all clinical studies", highlight: true },
      { value: "3.2×", label: "Faster Than Experts", sub: "vs. 15 mm²/min proficiency benchmark" },
      { value: "83%", label: "Fewer Perforations", sub: "For novice operators (vs. conventional)" },
      { value: "7", label: "Peer-Reviewed", sub: "Publications in major GI journals" },
    ],
    videos: [
      { id: "robopera-overview", title: "Overview", src: "" },
      { id: "robopera-procedure", title: "Live Procedure", src: "" },
      { id: "robopera-interview", title: "Surgeon Interview", src: "" },
    ],
    highlights: [
      "Multi-axis traction enables superior visualization of the dissection plane",
      "Intuitive tendon-sheath drive mechanism",
      "Attaches to standard diagnostic endoscopes — convert to surgical use in seconds",
      "FDA 510(k) K244029 (Sep 2025), CE, KFDA cleared",
    ],
    papers: [],
    components: [
      {
        id: "driver-unit",
        name: "Driver Unit",
        group: "Driver Unit",
        image: "",
        description: "(실제 데이터 미입력) Actuation station that drives the robotic instruments via tendon-sheath mechanism.",
        specs: [
          { k: "Dimensions", v: "—" },
          { k: "Power", v: "—" },
          { k: "Interface", v: "Plug & Play" },
        ],
      },
      {
        id: "basic-gripper-g",
        name: "Articulated Basic Gripper G",
        group: "Instrument",
        image: "",
        description: "Single-arm articulated gripper (alligator-type) with 2 joints, wrist ±90° and arm ±100° movements, and ±110° rotation for multidirectional traction during ESD.",
        specs: [
          { k: "Joints", v: "2 (wrist + arm)" },
          { k: "Wrist Rotation", v: "±90°" },
          { k: "Arm Rotation", v: "±100°" },
          { k: "Circumferential Rotation", v: "±110°" },
        ],
        papers: [
          {
            id: "ab-2026-tvaradze-barretts",
            title: "Robotic-assisted esophageal endoscopic submucosal dissection in a compact and extensive early Barrett's cancer lesion",
            authors: "Tvaradze G, Tanabe M, Yamamoto K, Groth S, Maggio EM, Inoue H, Seewald S",
            journal: "Endoscopy",
            year: 2026,
            type: "Case Report · E-video",
            highlight: { big: "11 cm", label: "Barrett's Cancer Resected En Bloc", sub: "First-in-esophagus application" },
            keyClaims: [
              "First reported esophageal ESD using EndoRobotics Alligator",
              "11 cm Barrett's adenocarcinoma, >70% circumferential — R0 resection achieved",
              "Four-axis multidirectional traction re-exposed the dissection plane at the difficult late stage",
              "Zero intra- or post-procedural adverse events",
            ],
            abstract: "First esophageal ESD using the EndoRobotics Alligator (ROBOPERA & TraCloser). 11 cm Barrett's adenocarcinoma (0-Is + IIb, >70% circumferential) with 5 cm compact component. The device provided true four-axis independent movements (grip, wrist, arm, rotation), enabling multidirectional traction to re-expose the dissection plane at the later stage of the procedure. Lesion resected en bloc; R0 resection histologically confirmed; no intra- or post-procedural adverse events.",
            doi: "10.1055/a-2802-4223",
            url: "https://doi.org/10.1055/a-2802-4223",
            pdf: "/assets/products/robopera/components/basic-gripper-g/papers/2026_Tvaradze_Barretts_Endoscopy.pdf",
            clinical: {
              patients: "1 (case report)",
              enBloc: "100%",
              r0: "100%",
              complications: "0",
              notes: "11 cm Barrett's adenocarcinoma, >70% circumferential; four-axis multidirectional traction enabled plane revisualization at late dissection stage.",
            },
          },
          {
            id: "ab-2025-jeon-gie-fih",
            title: "A novel robotic arm–assisted endoscopic submucosal dissection platform with augmented traction for gastric neoplasms: a first-in-human prospective pilot study (with videos)",
            authors: "Jeon HJ, Keum B, Lee B, Kim S, Choi HS, Lee JM, Kim ES, Jeen YT, Lee HS, Chun HJ",
            journal: "Gastrointestinal Endoscopy",
            year: 2025,
            type: "First-in-Human Prospective Pilot",
            highlight: { big: "3.2×", label: "Faster Than Experts", sub: "48.2 mm²/min vs. 15 mm²/min proficiency benchmark" },
            keyClaims: [
              "World's first in-human gastric ESD with ROBOPERA — 100% en bloc and R0 resection (15/15)",
              "Dissection speed 48.2 mm²/min — 3.2× the expert proficiency benchmark",
              "Mean total procedure time only 28.8 min",
              "Zero ROBOPERA malfunctions · Zero perforations",
            ],
            comparison: {
              title: "Dissection Speed — ROBOPERA vs. Expert Benchmark",
              items: [
                { label: "Dissection Speed", unit: "mm²/min", conventional: 15, robotic: 48.2 },
              ],
            },
            abstract: "Prospective single-arm study of 15 consecutive patients undergoing ROBOPERA-assisted gastric ESD at Korea University Medical Center (Jun–Sep 2024). Primary endpoint: en bloc resection. All patients achieved en bloc and R0 resection (100%). Mean total procedure time 28.8 ± 11.7 min; median robot-assisted dissection time 14.3 min; dissection speed 48.2 ± 21.0 mm²/min (exceeding the proficiency benchmark of 15 mm²/min). No ROBOPERA malfunctions. Specimen injury in 4 cases (26.7%); acute bleeding 13.3%; delayed bleeding 6.7%; no perforations.",
            doi: "10.1016/j.gie.2025.09.012",
            url: "https://doi.org/10.1016/j.gie.2025.09.012",
            clinical: {
              patients: "15",
              enBloc: "100% (15/15)",
              r0: "100% (15/15)",
              procedureTime: "28.8 ± 11.7 min (mean TPT)",
              dissectionSpeed: "48.2 ± 21.0 mm²/min",
              complications: "0 perforations; acute bleeding 13.3%, delayed bleeding 6.7%, prolonged stay 6.7%",
              notes: "RDT/TPT ratio 53.8%; median 3.9 grasps; 26.7% specimen mechanical injury",
            },
          },
          {
            id: "ab-2024-kim-surgendo-challenging",
            title: "Robot-assisted gastric endoscopic submucosal dissection significantly improves procedure time at challenging dissection locations",
            authors: "Kim SH, Kwon T, Choi HS, Kim C, Won S, Jeon HJ, Kim ES, Keum B, Jeen YT, Hwang JH, Chun HJ",
            journal: "Surgical Endoscopy",
            year: 2024,
            type: "Simulator-based Comparative Study",
            highlight: { big: "39%", label: "Shorter Procedure Time", sub: "at challenging anatomical locations" },
            keyClaims: [
              "2.16× faster dissection at the difficult lesser curvature of middle/upper body",
              "50% reduction in blind dissection rate",
              "21% lower cognitive workload (NASA-TLX)",
              "Zero muscle injuries with ROBOPERA (vs. 12% conventional)",
            ],
            comparison: {
              title: "Challenging Location — ROBOPERA vs. Conventional ESD",
              items: [
                { label: "Procedure Time", unit: "min", conventional: 10.2, robotic: 6.2, lowerIsBetter: true },
                { label: "Dissection Speed", unit: "mm²/min", conventional: 101.9, robotic: 220.3 },
                { label: "Blind Dissection", unit: "%", conventional: 35.2, robotic: 17.6, lowerIsBetter: true },
                { label: "NASA-TLX Workload", unit: "score", conventional: 44.6, robotic: 35.2, lowerIsBetter: true },
              ],
            },
            abstract: "Prospective comparison of ROBOPERA-assisted ESD (RESD) vs. conventional ESD (CESD) by trainee endoscopists on a novel gastric simulator (EndoGel). Challenging location (lesser curvature of middle/upper body): RESD 6.2 min vs CESD 10.2 min (P<0.05); dissection speed 220.3 vs 101.9 mm²/min (P<0.05); blind dissection rate 17.6% vs 35.2% (P<0.05). Muscle injuries: RESD 0% vs CESD 12%. Easy location (antrum lesser curvature): dissection speed 193.2 vs 153.6 mm²/min (P<0.05). ROBOPERA significantly reduces technical difficulty at challenging locations for trainees.",
            doi: "10.1007/s00464-024-10743-9",
            url: "https://doi.org/10.1007/s00464-024-10743-9",
            clinical: {
              patients: "48 simulator procedures (2 trainees × 24)",
              enBloc: "100% (both RESD and CESD)",
              procedureTime: "RESD 6.2 min vs CESD 10.2 min at challenging location (P<0.05)",
              dissectionSpeed: "220.3 (RESD) vs 101.9 (CESD) mm²/min at challenging location",
              complications: "0 muscle injuries in RESD vs 12% in CESD at challenging location",
              notes: "NASA-TLX workload 35.2 (RESD) vs 44.6 (CESD) at challenging location (P<0.05)",
            },
          },
          {
            id: "ab-2021-kim-surgendo-rose",
            title: "Endoscopic submucosal dissection using a detachable assistant robot: a comparative in vivo feasibility study (with video)",
            authors: "Kim SH, Kim BG, Choi HS, Hong D, Jang SH, Hong K, Choi JW, Kim SH, Lee JM, Kim ES, Keum B, Jeen YT, Lee HS, Chun HJ",
            journal: "Surgical Endoscopy",
            year: 2021,
            type: "In Vivo Porcine Feasibility Study",
            highlight: { big: "Novices ≈ Experts", label: "Dissection Speed Gap Closed", sub: "with only 30 min of robotic training" },
            keyClaims: [
              "Novice dissection speed (2.30 cm²/min) approached expert level (3.21 cm²/min, p=0.365)",
              "100% en bloc resection across all 16 in vivo gastric lesions",
              "Zero perforations, zero major bleeding",
              "Clinically useful proficiency after a single 30-minute training session",
            ],
            comparison: {
              title: "Experts vs. Novices — with RoSE Platform",
              items: [
                { label: "Incision Speed", unit: "cm²/min", conventional: 0.64, robotic: 3.25 },
                { label: "Dissection Speed", unit: "cm²/min", conventional: 2.30, robotic: 3.21 },
              ],
            },
            abstract: "Comparative feasibility of ROSE (RObot for Surgical Endoscope, 3 DOF, 16 mm diameter) between experienced (n=2, >200 ESDs each) and novice (n=2, diagnostic endoscopy only) endoscopists. 16 gastric lesions resected en bloc across 9 live pigs (6 expert, 10 novice). Incision speed: expert 3.25 vs novice 0.64 cm²/min (P=0.002). Dissection speed: expert 3.21 vs novice 2.30 cm²/min (P=0.365 — novices approached expert speed with robotic assistance). 100% en bloc resection in both groups; no perforation or major bleeding.",
            doi: "10.1007/s00464-021-08510-1",
            url: "https://doi.org/10.1007/s00464-021-08510-1",
            clinical: {
              patients: "16 lesions in 9 live pigs",
              enBloc: "100% (16/16)",
              dissectionSpeed: "Experts 3.21 vs Novices 2.30 cm²/min (P=0.365)",
              complications: "0 perforations, 0 major bleeding",
              notes: "Novice incision speed 0.64 vs expert 3.25 cm²/min (P=0.002) — dissection speed gap nearly closed with robotic assist",
            },
          },
          {
            id: "ab-2019-kim-gutliver-rexter",
            title: "A pilot study of endoscopic submucosal dissection using an endoscopic assistive robot in a porcine stomach model",
            authors: "Kim BG, Choi HS, Park SH, Hong JH, Lee JM, Kim SH, Chun HJ, Hong D, Keum B",
            journal: "Gut and Liver",
            year: 2019,
            type: "Ex Vivo Pilot Study",
            highlight: { big: "83%", label: "Fewer Perforations", sub: "among novice operators vs. conventional" },
            keyClaims: [
              "Novice perforation rate dropped from 60% to 10% with robotic assistance",
              "Safer learning curve — 100% en bloc resection by novices with RoSE platform",
              "Zero perforations for expert operators in both arms",
              "Approach-angle correction (knife parallel to gastric wall) improves safety",
            ],
            comparison: {
              title: "Novice Perforation Rate — Conventional vs. RoSE",
              items: [
                { label: "Novice Perforations", unit: "out of 10", conventional: 6, robotic: 1, lowerIsBetter: true },
              ],
            },
            abstract: "Pilot evaluation of REXTER (revolute joint-based auxiliary transluminal endoscopic robot, 4 DOF, 15 mm links) — earliest RoSE-Platform prototype. 40 ESDs (10 per group × 2 methods × 2 skill levels) on 40 ex vivo porcine stomachs. Conventional ESD: experts 0/10 perforations vs novices 6/10; operation time 11.3 vs 26.7 min. Robot-assisted ESD: novice perforation rate dropped dramatically from 6/10 to 1/10. Novices achieved en bloc resection in all 10 robot-assisted cases (vs 2 piecemeal in conventional). Robotic assistance enabled novices to maintain knife parallel to stomach wall, markedly improving safety.",
            doi: "10.5009/gnl18370",
            url: "https://doi.org/10.5009/gnl18370",
            clinical: {
              patients: "40 ex vivo porcine ESDs",
              enBloc: "100% (novices RESD) vs 80% (novices CESD)",
              procedureTime: "Experts 11.3 min (CESD/RESD) vs novices 26.7 (CESD) / 27.4 (RESD)",
              complications: "Novice perforations: 6/10 (CESD) → 1/10 (RESD) — 83% reduction",
              notes: "RoSE-Platform precursor study; established safety benefit for unskilled operators",
            },
          },
        ],
      },
      {
        id: "dual-gripper-g",
        name: "Articulated Dual Gripper G",
        group: "Instrument",
        image: "",
        description: "Dual-function robotic gripper (ROBOPERA-TraCloser) with two independently controlled side jaws and a central fixed support column, enabling both tissue traction during ESD and mucosal defect approximation for clip closure — all in a single platform without device exchange.",
        specs: [
          { k: "Jaws", v: "2 independent + central support" },
          { k: "Circumferential Rotation", v: "270°" },
          { k: "Wrist Movement", v: "Vertical fine adjustment" },
          { k: "Functions", v: "Traction + Closure" },
        ],
        papers: [
          {
            id: "dg-2025-kim-surgendo-gastric",
            title: "Dual-function robotic gripper for traction and closure in gastric endoscopic submucosal dissection: an in vivo porcine model study (with video)",
            authors: "Kim SH, Seo YC, Keum B, Jeon HJ, Lee JM, Choi HS, Kim ES, Jeen YT, Lee HS, Hwang JH, Chun HJ",
            journal: "Surgical Endoscopy",
            year: 2025,
            type: "In Vivo Porcine Comparative Study",
            highlight: { big: "100%", label: "Complete Clip Closure", sub: "vs. 66.6% with conventional closure" },
            keyClaims: [
              "35% shorter procedure time (10.2 vs 15.8 min)",
              "1.72× faster dissection speed (157.6 vs 91.4 mm²/min)",
              "82% reduction in blind dissection rate",
              "56% fewer clips needed (5.6 vs 12.5)",
              "Superior histologic healing — narrower epithelial gap and less neovascular infiltration",
            ],
            comparison: {
              title: "Dual Gripper vs. Conventional ESD + Closure",
              items: [
                { label: "Procedure Time", unit: "min", conventional: 15.8, robotic: 10.2, lowerIsBetter: true },
                { label: "Dissection Speed", unit: "mm²/min", conventional: 91.4, robotic: 157.6 },
                { label: "Blind Dissection", unit: "%", conventional: 47.8, robotic: 8.7, lowerIsBetter: true },
                { label: "Complete Closure", unit: "%", conventional: 66.6, robotic: 100 },
                { label: "Clips Used", unit: "count", conventional: 12.5, robotic: 5.6, lowerIsBetter: true },
              ],
            },
            abstract: "24 paired gastric lesions in 6 live pigs comparing ROBOPERA-TraCloser-assisted ESD (RESD) vs. conventional ESD (CESD) at greater curvature of antrum and mid-gastric body. RESD showed significantly shorter procedure time (10.2±1.7 vs 15.8±2.1 min, p<0.05), faster dissection speed (157.6±33.3 vs 91.4±23.7 mm²/min, p<0.05), lower blind dissection rate (8.7% vs 47.8%, p<0.05). Complete clip closure: 100% (RESD) vs 66.6% (CESD); closure time 8.6 vs 17.9 min; clips used 5.6 vs 12.5. POD14 follow-up: minimal dehiscence with RESD (2/12) vs frequent dehiscence with CESD (6/8). Histology: narrower absent-epithelium zones (1.4 vs 5.4 mm) and reduced neovascular/fibroblast infiltration with RESD.",
            doi: "10.1007/s00464-025-12182-6",
            url: "https://doi.org/10.1007/s00464-025-12182-6",
            pdf: "/assets/products/robopera/components/dual-gripper-g/papers/2025_Kim_DualGripper_Gastric_SurgEndo.pdf",
            clinical: {
              patients: "24 gastric lesions in 6 live pigs (paired design)",
              enBloc: "100% (12/12 RESD; 12/12 CESD)",
              procedureTime: "RESD 10.2±1.7 min vs CESD 15.8±2.1 min (p<0.05)",
              dissectionSpeed: "RESD 157.6±33.3 vs CESD 91.4±23.7 mm²/min (p<0.05)",
              complications: "0 adverse events in both groups",
              notes: "Complete closure: 100% RESD vs 66.6% CESD (p<0.05); clips used 5.6 vs 12.5; POD14 dehiscence 2/12 vs 6/8; superior histologic healing (narrower epithelial gap, less neovascular/fibroblast infiltration)",
            },
          },
          {
            id: "dg-2025-kim-videogie-colorectal",
            title: "Novel robotic gripper for traction and closure in colorectal endoscopic submucosal dissection",
            authors: "Kim SH, Choi HS, Jeon HJ, Kim ES, Keum B, Jeen YT, Ahn S, Hwang JH, Chun HJ",
            journal: "VideoGIE",
            year: 2025,
            type: "Clinical Case Series",
            highlight: { big: "7.1 cm", label: "Giant LST, En Bloc in 68 min", sub: "Colorectal ESD in humans — no device exchange" },
            keyClaims: [
              "Giant 7.1 × 4.0 cm sigmoid LST resected en bloc in a single session",
              "Defect closure completed in just 4 min 40 s with the dual gripper",
              "16-min en bloc resection of mid-rectum NET on an anticoagulated patient",
              "Seamless traction-to-closure workflow — one platform, no device swap",
            ],
            abstract: "Two clinical case demonstrations of the ROBOPERA-TraCloser (Dual Gripper) in human colorectal ESD. Case 1: 50-year-old woman with sigmoid colon LST (granular LST of mixed nodular type, JNET 2A with focal 2B) 19 cm from anal verge — en bloc resection in 68 min, specimen 7.1×4.0 cm, histology tubulovillous adenoma with high-grade dysplasia. Case 2: 51-year-old man on anticoagulants with mid-rectum neuroendocrine tumor — en bloc resection in 16 min, defect closure with robotic approximation + TTS clips in 4 min 40 s, specimen 2.3×1.7 cm, NET grade 1. Device supports 270° circumferential movement and enables seamless dissection-to-closure workflow.",
            doi: "10.1016/j.vgie.2024.12.004",
            url: "https://doi.org/10.1016/j.vgie.2024.12.004",
            pdf: "/assets/products/robopera/components/dual-gripper-g/papers/2025_Kim_TraCloser_Colorectal_VideoGIE.pdf",
            clinical: {
              patients: "2 human cases (sigmoid LST; mid-rectum NET)",
              enBloc: "100% (2/2)",
              procedureTime: "Case 1: 68 min (7.1×4.0 cm LST); Case 2: 16 min + 4:40 closure (2.3×1.7 cm NET)",
              complications: "0 adverse events",
              notes: "First demonstration of seamless traction + robotic-assisted TTS clip closure in colorectal ESD; 270° circumferential gripper rotation enabled precise traction adjustment throughout procedure",
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "endocubot",
    name: "EndoCubot",
    category: "Endoscopic Robotic Device",
    sub: "(실제 데이터 미입력 — 브로셔 카피 대기)",
    desc: {
      ko: "(실제 데이터 미입력) EndoCubot 제품 설명을 여기에 입력하세요.",
      en: "(Real product copy pending.) Enter the EndoCubot description here.",
    },
    specs: [
      { k: "Spec 1", v: "—" },
      { k: "Spec 2", v: "—" },
      { k: "Spec 3", v: "—" },
      { k: "Spec 4", v: "—" },
    ],
    clinical: { cases: "—", success: "—", time: "—", hospitals: "—" },
    videos: [
      { id: "endocubot-overview", title: "Overview", src: "" },
      { id: "endocubot-demo", title: "Demo", src: "" },
    ],
    highlights: [
      "(실제 데이터 미입력) 핵심 특징 1",
      "(실제 데이터 미입력) 핵심 특징 2",
      "(실제 데이터 미입력) 핵심 특징 3",
    ],
    papers: [],
  },
  {
    id: 3,
    slug: "tracloser-retractable",
    name: "TraCloser Retractable",
    category: "Traction & Closure Device",
    sub: "Dual-function gripper for traction and endoscopic closure",
    desc: {
      ko: "(실제 데이터 미입력) TraCloser Retractable은 견인과 봉합 기능을 하나의 디바이스에 통합한 내시경 수술 보조 기구입니다.",
      en: "TraCloser Retractable is a dual-function robotic gripper designed to combine tissue traction and defect closure in a single endoscopic device.",
    },
    specs: [
      { k: "Function", v: "Traction + Closure" },
      { k: "Retractable", v: "Yes" },
      { k: "Compatibility", v: "Standard Endoscope" },
      { k: "Use Type", v: "(실제 데이터 미입력)" },
    ],
    clinical: { cases: "—", success: "—", time: "—", hospitals: "—" },
    videos: [
      { id: "tracloser-overview", title: "Overview", src: "" },
      { id: "tracloser-demo", title: "Traction & Closure Demo", src: "" },
    ],
    highlights: [
      "Dual-function: traction + closure in one device",
      "Retractable design — deploy only when needed",
      "(실제 데이터 미입력) 추가 특징 입력 대기",
    ],
    papers: [],
  },
];

export const SLIDES: { ko: { t: string; d: string }; en: { t: string; d: string } }[] = [
  {
    ko: { t: "실시간 시술 영상", d: "(더미) 실제 임상 현장의 시술 장면 — 7-DOF 유연 로봇 내시경의 동작" },
    en: { t: "Live Procedure", d: "(dummy) Real clinical procedure footage — 7-DOF flexible robotic endoscope in action" },
  },
  {
    ko: { t: "기술 개요", d: "(더미) 핵심 기술과 작동 원리 애니메이션" },
    en: { t: "Technology Overview", d: "(dummy) Animation of core technology and working principles" },
  },
  {
    ko: { t: "외과의 인터뷰", d: "(더미) 실제 사용 경험을 공유하는 외과의 인터뷰" },
    en: { t: "Surgeon Testimonial", d: "(dummy) Interview with surgeons sharing real-world experience" },
  },
  {
    ko: { t: "회사 비전", d: "(더미) EndoRobotics가 그리는 수술의 미래" },
    en: { t: "Company Vision", d: "(dummy) The future of surgery as envisioned by EndoRobotics" },
  },
];

export const TR: Record<Lang, Record<string, string>> = {
  ko: {
    "rail.eyebrow": "제품 라인업",
    "rail.title": "터치하여 제품을 확인하세요",
    "panel.back": "뒤로",
    "panel.videos": "관련 영상",
    "panel.clinical": "임상 데이터",
    "panel.specs": "주요 사양",
    "clin.cases": "임상 시술",
    "clin.success": "성공률",
    "clin.time": "시술 시간 단축",
    "clin.hospitals": "도입 병원",
  },
  en: {
    "rail.eyebrow": "PRODUCT LINEUP",
    "rail.title": "Tap to explore our products",
    "panel.back": "Back",
    "panel.videos": "Related Videos",
    "panel.clinical": "Clinical Data",
    "panel.specs": "Key Specifications",
    "clin.cases": "Clinical Cases",
    "clin.success": "Success Rate",
    "clin.time": "Procedure Time",
    "clin.hospitals": "Hospitals",
    "panel.overview": "Overview",
    "panel.highlights": "Key Highlights",
    "panel.summary": "Summary",
    "panel.papers": "Publications",
    "papers.hint": "Tap any row to view details",
    "paper.abstract": "Abstract",
    "paper.authors": "Authors",
    "paper.journal": "Journal",
    "paper.doi": "DOI",
  },
};
