export type Lang = "ko" | "en";

export type VideoItem = { id: string; title: string; src: string; poster?: string };

/** Hero videos shown on the initial showcase screen. The first entry plays
 * automatically; users can switch between them with the hero-selector pills. */
export type HeroVideo = { id: string; title: string; src: string };
export const HERO_VIDEOS: HeroVideo[] = [
  {
    id: "all-products",
    title: "EndoRobotics Lineup",
    src: "/assets/slides/EndoRobotics_All_Product.mp4",
  },
];

export type Component = {
  id: string;
  name: string;
  group: string; // top-level grouping e.g. "Driver Unit", "Instrument"
  /** Brochure-style headline shown above the component (e.g., "Three-Joint
   * Articulated for Tissue Hold-and-Lift During GI Endoscopic Procedure"). */
  tagline?: string;
  image?: string;
  /** Multiple labeled images shown side-by-side (e.g., Controller A + B).
   * When present, replaces the single `image`. */
  images?: { src: string; label: string }[];
  /** Brochure-style technical diagrams shown in a strip below the main
   * product photo (e.g., articulation/grip-angle illustrations). */
  diagrams?: { src: string; label: string }[];
  description?: string;
  /** Brochure-style short feature bullets (preferred over `description` when
   * present in the Components & Specification section). Each bullet may use
   * "Name — body" format which is rendered as bold name + body. */
  bullets?: string[];
  specs?: { k: string; v: string }[];
  /** Side-by-side spec table (e.g., comparing Controller A vs B). When present,
   * rendered in place of the flat `specs` list. */
  specsCompare?: {
    columns: string[];
    rows: { k: string; v: string[] }[];
  };
  /** Optional column-grouped spec layout — e.g., "Diameter" group with
   * Inner/Outer columns and "Jaw" group with Length/Opening Width.
   * Renders as the brochure-style table header with merged group cells. */
  specsGrouped?: {
    groups: { label: string; columns: { k: string; v: string }[] }[];
  };
  /** When true, this component is rendered inside the previous component's
   * card instead of starting a new one — used for tightly-coupled subsystems
   * like Driver Unit + Controller that share a single brochure card. */
  combineWithPrev?: boolean;
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
  /** Optional descriptor rendered next to the brand logo (e.g., "Manual Retractable") */
  nameSuffix?: string;
  /** Path to brand logo PNG (already includes ™). Rendered in place of the text name. */
  logo?: string;
  category: string;
  sub: string;
  heroImage?: string;
  thumbnail?: string;
  /** Optional small overlay image (e.g., accessory) shown at bottom-right of
   * the rail tile thumbnail on the initial home screen. */
  thumbnailExtra?: string;
  /** Optional row of small overlay images shown along the bottom of the rail
   * tile thumbnail. Used when a product has multiple key accessories to surface
   * (e.g., ROBOPERA showing both basic and dual grippers). */
  thumbnailExtras?: string[];
  desc: Record<Lang, string>;
  highlights?: string[]; // brochure-aligned bullet points
  specs: { k: string; v: string }[];
  clinical: { cases: string; success: string; time: string; hospitals: string };
  /** Flexible hero summary cards for the Clinical Data section (replaces legacy 4-card layout when present) */
  summary?: SummaryStat[];
  videos: VideoItem[];
  papers: Paper[];
  components?: Component[];
  /** Marks the product as not yet released — replaces the gray subtitle on
   * the rail tile with a "Coming Soon" badge. */
  comingSoon?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "robopera",
    name: "ROBOPERA",
    logo: "/assets/products/robopera/logo.png",
    heroImage: "/assets/products/robopera/hero.png",
    thumbnail: "/assets/products/robopera/hero.png",
    thumbnailExtras: [
      "/assets/products/robopera/components/basic-gripper-g/main.webp",
      "/assets/products/robopera/components/dual-gripper-g/main.webp",
    ],
    category: "Robot-Assisted Endoscopic System",
    sub: "Robot-Assisted Endoscopic System for Controlled Tissue Handling",
    desc: {
      ko: "ROBOPERA는 호환 가능한 표준 내시경과 함께 사용하도록 설계된 로봇 보조 내시경 시스템입니다. 인체공학적 듀얼 컨트롤러 기반의 의사–보조 협업 워크플로우와 다관절 단일사용(single-use) 기구를 통해, 식도·위·대장·직장에서의 GI 내시경 시술 중 조직을 잡고 들어 올리는 동작을 안정적으로 제어할 수 있게 합니다. FDA 510(k) 인허가를 받았습니다.",
      en: "ROBOPERA is a robot-assisted endoscopic system designed for use with compatible conventional endoscopes. An ergonomic dual-controller workflow and single-use articulated instruments deliver controlled tissue hold-and-lift during GI endoscopic procedures across the esophagus, stomach, colon, and rectum. FDA 510(k)-cleared.",
    },
    specs: [
      { k: "Endoscope Compatibility", v: "Compatible conventional endoscopes" },
      { k: "Clearance", v: "FDA 510(k)-cleared" },
    ],
    clinical: { cases: "18+", success: "100%", time: "28.8 min", hospitals: "1" },
    summary: [
      { value: "100%", label: "En Bloc Resection", sub: "Across all clinical studies", highlight: true },
      { value: "3.2×", label: "Faster Than Experts", sub: "vs. 15 mm²/min proficiency benchmark" },
      { value: "83%", label: "Fewer Perforations", sub: "For novice operators (vs. conventional)" },
      { value: "7", label: "Peer-Reviewed", sub: "Publications in major GI journals" },
    ],
    videos: [
      {
        id: "robopera-motion-overview",
        title: "Motions Overview",
        src: "/assets/products/robopera/videos/01-motion-overview.mp4",
        poster: "/assets/products/robopera/videos/01-motion-overview.jpg",
      },
      {
        id: "robopera-basic-procedure",
        title: "Basic Gripper · Clinical Case",
        src: "/assets/products/robopera/videos/02-basic-motion-procedure.mp4",
        poster: "/assets/products/robopera/videos/02-basic-motion-procedure.jpg",
      },
      {
        id: "robopera-dual-procedure",
        title: "Dual Gripper · Clinical Case",
        src: "/assets/products/robopera/videos/03-dual-motion-procedure.mp4",
        poster: "/assets/products/robopera/videos/03-dual-motion-procedure.jpg",
      },
      {
        id: "robopera-clinical-cases",
        title: "Full Clinical Case",
        src: "/assets/products/robopera/videos/04-clinical-cases.mp4",
        poster: "/assets/products/robopera/videos/04-clinical-cases.jpg",
      },
    ],
    highlights: [
      "Endoscope Compatibility — Designed for use with compatible conventional endoscopes to support clinical workflow",
      "Ergonomic Control Interface — Supports intuitive operation and controlled positioning",
      "Physician-Assistant Workflow — Dual-controller workflow for coordinated operation",
      "Articulated Motion Control — Supports controlled tissue handling during GI endoscopic procedures",
      "Safety-Focused Control Features — Designed to support stable and controlled operation",
    ],
    papers: [],
    components: [
      {
        id: "driver-unit",
        name: "Driver Unit",
        group: "Driver Unit & Controller",
        images: [
          {
            src: "/assets/products/robopera/components/driver-unit/main.webp",
            label: "Front",
          },
          {
            src: "/assets/products/robopera/components/driver-unit/back.webp",
            label: "Back",
          },
        ],
        description: "Compact actuation station designed for endoscopy-room workflows. Drives the single-use articulated instruments through a tendon-sheath mechanism with an 8-inch touch display for intuitive operation.",
        bullets: [
          "Compact design for endoscopy-room workflows",
        ],
        specs: [
          { k: "Dimensions", v: "370 W × 460 D × 207 H (mm)" },
          { k: "Weight", v: "19.9 kg" },
          { k: "Rated", v: "100–240 VAC · 50/60 Hz · 60–100 VA" },
          { k: "Display", v: "8\" Touch Display" },
        ],
      },
      {
        id: "controller",
        name: "Controller",
        group: "Driver Unit & Controller",
        combineWithPrev: true,
        images: [
          {
            src: "/assets/products/robopera/components/controller/controller-a.webp",
            label: "Controller A",
          },
          {
            src: "/assets/products/robopera/components/controller/controller-b.webp",
            label: "Controller B",
          },
        ],
        description: "Dual-controller pair (A + B) enabling a coordinated physician–assistant workflow. Controller A serves as the primary handset for controlled instrument operation; the slim Controller B pairs with it to support coordinated, dual-operator use.",
        bullets: [
          "User-friendly interface for controlled operation",
          "Available with Controller A and Controller B",
          "Designed for physician-assistant workflow",
        ],
        specsCompare: {
          columns: ["Controller A", "Controller B"],
          rows: [
            { k: "Size", v: ["48 × 101 × 41 mm", "48 × 116 × 19 mm"] },
            { k: "Weight", v: ["200 g", "150 g"] },
          ],
        },
      },
      {
        id: "basic-gripper-g",
        name: "Articulated Basic Gripper G",
        group: "Instrument",
        tagline: "Three-Joint Articulated for Tissue Hold-and-Lift During GI Endoscopic Procedure",
        image: "/assets/products/robopera/components/basic-gripper-g/main.webp",
        diagrams: [
          {
            src: "/assets/products/robopera/components/basic-gripper-g/diagrams/arm-roll.png",
            label: "Arm / Roll",
          },
          {
            src: "/assets/products/robopera/components/basic-gripper-g/diagrams/wrist.png",
            label: "Wrist",
          },
          {
            src: "/assets/products/robopera/components/basic-gripper-g/diagrams/grip.png",
            label: "Grip",
          },
        ],
        description: "Three-joint articulated single-use gripper (wrist, arm, and roll motion) for tissue hold-and-lift during GI endoscopic procedures. Multi-angle forceps with a 21 mm jaw opening and 7.3 mm jaw length deliver secure tissue grasping and controlled handling. Use with compatible overtube and endoscope as specified in the IFU.",
        bullets: [
          "Multi-Angle Articulation for Controlled Access — Three-joint articulation (wrist, arm, and roll motion) supports controlled angulation across a broad range of motion",
          "Multi-Angle Forceps for Controlled Tissue Hold-and-Lift — Supports opening and closing across a 180° grip range to facilitate controlled tissue grasping and positioning",
          "Secure Tissue Grasping and Controlled Handling — Featuring a 21 mm jaw opening and 7.3 mm jaw length, it supports secure tissue grasping and controlled hold-and-lift during procedures",
          "Anatomical Sites — Esophagus, stomach, colon, and rectum (use with compatible overtube and endoscope as specified in the IFU)",
        ],
        specsGrouped: {
          groups: [
            { label: "Diameter", columns: [
              { k: "Inner Diameter", v: "11.5 mm" },
              { k: "Outer Diameter", v: "15.7 mm" },
            ] },
            { label: "Jaw", columns: [
              { k: "Jaw Length", v: "7.3 mm" },
              { k: "Opening Width", v: "21 mm" },
            ] },
          ],
        },
        specs: [
          { k: "Diameter (Inner / Outer)", v: "11.5 / 15.7 mm" },
          { k: "Jaw Length × Opening", v: "7.3 mm × 21 mm" },
          { k: "Articulation", v: "Arm 200° / Roll 220° / Wrist 180°" },
          { k: "Grip Range", v: "Up to 180°" },
          { k: "Anatomical Sites", v: "Esophagus, stomach, colon, rectum" },
          { k: "Use", v: "Single-use cartridge (re-sterilization prohibited)" },
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
              "First esophageal ESD with Articulated Basic Gripper G",
              "11 cm Barrett's lesion · R0 en bloc",
              "Four-axis traction re-exposed the late-stage plane",
              "Zero adverse events",
            ],
            abstract: "We report the first case of an EndoRobotics Alligator-assisted esophageal ESD of an 11 cm early Barrett's adenocarcinoma extending over 70% of the circumference, with a 5 cm compact component. The device provides true four-axis independent movements, enabling multidirectional traction. After circumferential incision and completing dissection of 70% of the lesion, visualization and access to the dissection plane worsened. The alligator device was used at this later stage of the procedure to lift the compact specimen in order to revisualize the dissection plane, maintain tension, and finalize the dissection. The lesion was successfully resected en bloc. R0 resection was histologically confirmed, and no intra- or post-procedural adverse events occurred.",
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
              "World's first in-human gastric ESD with ROBOPERA",
              "100% en bloc · 100% R0 (15/15)",
              "Dissection 3.2× expert benchmark · 28.8 min mean",
              "Zero perforations · zero device malfunctions",
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
              "2.16× faster dissection at challenging locations",
              "50% fewer blind dissections",
              "21% lower cognitive workload (NASA-TLX)",
              "Zero muscle injuries (vs. 12% conventional)",
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
              "Novice speed reached expert level (p=0.365)",
              "100% en bloc across 16 in vivo lesions",
              "Zero perforations · zero major bleeding",
              "Clinical proficiency after a 30-min training",
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
            type: "In Vitro Porcine Pilot Study",
            highlight: { big: "83%", label: "Fewer Perforations", sub: "among novice operators vs. conventional" },
            keyClaims: [
              "Novice perforations: 60% → 10% with robot",
              "100% en bloc by novices with RoSE",
              "Zero expert perforations in both arms",
              "Approach-angle correction improves safety",
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
        tagline: "Dual-Jaw Articulation for Tissue Hold-and-Lift During GI Endoscopic Procedure",
        image: "/assets/products/robopera/components/dual-gripper-g/main.webp",
        diagrams: [
          {
            src: "/assets/products/robopera/components/dual-gripper-g/diagrams/arm-roll.png",
            label: "Arm / Roll",
          },
          {
            src: "/assets/products/robopera/components/dual-gripper-g/diagrams/jaws.png",
            label: "Jaws",
          },
          {
            src: "/assets/products/robopera/components/dual-gripper-g/diagrams/grip.png",
            label: "Grip",
          },
        ],
        description: "Dual-jaw articulated single-use gripper with two independently articulated jaws plus a fixed central jaw and roll-arm articulation. Supports controlled tissue approximation and positioning during GI endoscopic procedures. Use with compatible overtube and endoscope as specified in the IFU.",
        bullets: [
          "Dual-Gripper Configuration for Controlled Tissue Positioning — Supports tissue grasping and positioning in a single articulated dual-gripper instrument",
          "Dual-Jaw Articulation for Controlled Tissue Approximation — Two independently articulated jaws, a fixed central jaw, and roll-arm articulation support controlled tissue approximation and positioning",
          "Secure Tissue Grasping and Controlled Handling — Supports secure tissue grasping and controlled positioning during procedures",
          "Anatomical Sites — Esophagus, stomach, colon, and rectum (use with compatible overtube and endoscope as specified in the IFU)",
        ],
        specsGrouped: {
          groups: [
            { label: "Diameter", columns: [
              { k: "Inner Diameter", v: "11.5 mm" },
              { k: "Outer Diameter", v: "15.7 mm" },
            ] },
            { label: "Jaw", columns: [
              { k: "Jaw Length", v: "8 mm" },
              { k: "Opening Width", v: "15 mm / each" },
            ] },
          ],
        },
        specs: [
          { k: "Diameter (Inner / Outer)", v: "11.5 / 15.7 mm" },
          { k: "Jaw Length × Opening (each)", v: "8 mm × 15 mm" },
          { k: "Articulation", v: "Arm 200° / Roll 220°" },
          { k: "Grip Range", v: "Up to 180°" },
          { k: "Anatomical Sites", v: "Esophagus, stomach, colon, rectum" },
          { k: "Use", v: "Single-use cartridge (re-sterilization prohibited)" },
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
              "35% shorter procedure (10.2 vs 15.8 min)",
              "1.72× faster dissection",
              "82% fewer blind dissections",
              "56% fewer clips needed",
              "Superior histologic healing",
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
              "7.1 × 4.0 cm sigmoid LST · en bloc in 68 min",
              "16-min en bloc on anticoagulated NET patient",
              "Mid-rectum NET defect closed in 4 min 40 s",
              "Traction → closure on one platform",
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
    logo: "/assets/products/endocubot/logo.png",
    heroImage: "/assets/products/endocubot/hero.webp",
    thumbnail: "/assets/products/endocubot/hero.webp",
    thumbnailExtra: "/assets/products/endocubot/holder.png",
    category: "Endoscopic Training Simulator",
    sub: "Advanced Robotic Endoscopy Simulator for Precision and Lifelike Experience",
    desc: {
      ko: "EndoCubot은 시뮬레이터 기반 내시경 트레이닝의 새로운 솔루션입니다. 정밀한 로봇 제어와 실제와 유사한 환자 반응을 결합해 ESD, EMR, Handling Practice, Clip Closure, Suture Closure 등 기초부터 고급 단계까지 폭넓은 내시경 치료 술기를 안전하게 반복 학습할 수 있도록 지원합니다. 위장(Antrum, Incisura Angularis, Middle Body, Cardia)과 대장(Colon, Rectum)의 해부학적 위치를 자유롭게 선택할 수 있으며, 모든 브랜드의 내시경과 호환됩니다.",
      en: "EndoCubot is a new simulator-based endoscopic training solution. By combining precise robotic control with lifelike patient responses, it enables clinicians to safely rehearse a full spectrum of endoscopic therapies — ESD, EMR, Handling Practice, Clip Closure, and Suture Closure — across skill levels from basic to advanced. Anatomical sites can be selected throughout the stomach (Antrum, Incisura Angularis, Middle Body, Cardia) and colon (Colon, Rectum), and the system is compatible with all endoscope brands.",
    },
    specs: [
      { k: "Dimensions", v: "660 W × 330 D × 360 H (mm)" },
      { k: "Weight", v: "19.8 kg" },
      { k: "Power", v: "85–264 VAC · 47–63 Hz · Output 24 V 3.2 A 76.8 W" },
      { k: "Display", v: "8\" Touch Display" },
      { k: "Operating Temperature", v: "10–30 °C" },
      { k: "Certification", v: "KC (KR), FCC (US), CE (EU), RoHS (EU)" },
    ],
    clinical: { cases: "—", success: "—", time: "—", hospitals: "—" },
    summary: [
      { value: "5", label: "Training Modules", sub: "ESD · EMR · Handling · Clip · Suture", highlight: true },
      { value: "6", label: "Anatomical Sites", sub: "Stomach (4) + Colon/Rectum (2)" },
      { value: "All", label: "Endoscope Brands", sub: "Universal compatibility" },
      { value: "Basic→Adv.", label: "Skill Coverage", sub: "Single platform across levels" },
    ],
    videos: [
      {
        id: "endocubot-animation",
        title: "Animation Overview",
        src: "/assets/products/endocubot/videos/01-animation-overview.mp4",
        poster: "/assets/products/endocubot/videos/01-animation-overview.jpg",
      },
      {
        id: "endocubot-live",
        title: "Live Demonstration",
        src: "/assets/products/endocubot/videos/02-live-demonstration.mp4",
        poster: "/assets/products/endocubot/videos/02-live-demonstration.jpg",
      },
    ],
    highlights: [
      "Universal Compatibility — Works with all endoscope brands and devices",
      "Realistic Patient Response — Simulates breathing, random gagging, and sneezing",
      "Precise Robotic Control — One-touch robotic positioning for accurate lesion targeting",
      "Lifelike Endoscopic Functions — Realistic inflation and suction for authentic feel",
      "Comprehensive Training — Basic to advanced endoscopic therapy modules in one system",
    ],
    papers: [],
    components: [
      {
        id: "endocubot-set",
        name: "EndoCubot™",
        group: "Set",
        image: "/assets/products/endocubot/hero.webp",
        specs: [
          { k: "Dimensions [mm]", v: "660 W × 330 D × 360 H" },
          { k: "Weight [kg]", v: "19.8" },
          { k: "Power supply", v: "Input 85–264 VAC, 47–63 Hz · 1.4 A / 114 VAC, 0.85 A / 230 VAC · Output 24 V 3.2 A 76.8 W" },
          { k: "Operating Temperature [°C]", v: "10 – 30" },
          { k: "Display", v: "Touch display 8″" },
        ],
        papers: [
          {
            id: "ec-2025-heinrich-igie-facevalidity",
            title: "Face validity of a new mixed-reality simulator for training endoscopic submucosal dissection: a Western pilot study",
            authors: "Heinrich HS, Dewint P, Leclercq P, Haringsma J",
            journal: "iGIE",
            year: 2025,
            type: "Western Pilot Study",
            keyClaims: [
              "First Western pilot study validating EndoCubot for ESD training",
              "Dexterity score: 25.5 → 34.7 / 40 (p < 0.001)",
              "Large effect (Hedges' g = 1.613) after 2-day training",
              "9.125/10 satisfaction · strong face validity",
            ],
            abstract: "Endoscopic Submucosal Dissection (ESD) is an effective but technically demanding procedure with a steep learning curve. Traditional training methods, including master courses, apprenticeship and animal models, have ethical, financial, and logistical constraints. This pilot study evaluates the face validity of a novel mixed-reality simulator designed to enhance and maintain endoscopic dexterity in ESD training. In this exploratory, prospective observational cohort study, eight ESD trainees with prior advanced endoscopy experience, but limited ESD exposure, underwent a two-day structured training using the EndoCubot (EndoRobotics, Seoul, South-Korea) simulator with artificial laminated tissue (Versatile Training Tissue, VTT, KOTOBUKI Medical, Yashio, Japan). Performance was assessed pre- and post-training through a 5-minute dexterity test simulating circular incision with 40 achievable points, and a questionnaire evaluating simulator realism, satisfaction, and training effectiveness. On a 40-point scale mean post-course scores (34.7 (4.86)) were significantly higher than pre-course scores (25.50 (0.76), p < 0.001), with a mean improvement of 9.25 points (95% CI: 4.993–13.507, Hedges' g correction = 1.613). Survey results indicated high satisfaction (mean rating: 9.125/10) and strong agreement on the simulator's realism and effectiveness. The simulator demonstrates strong face validity and supports a realistic standardized skill acquisition in ESD.",
            doi: "10.1016/j.igie.2025.10.018",
            url: "https://doi.org/10.1016/j.igie.2025.10.018",
            pdf: "/assets/products/endocubot/papers/2025_Heinrich_iGIE_FaceValidity.pdf",
            clinical: {
              patients: "8 ESD trainees from European expert centers",
              procedureTime: "2-day structured training (≥ 2.5 h/day per trainee)",
              notes: "Pre-course mean 25.50 ± 0.76 / 40; post-course mean 34.7 ± 4.86 / 40; mean improvement 9.25 points (95% CI 4.99–13.51); Hedges' g = 1.613. Satisfaction 9.125/10. No equipment failures observed.",
            },
          },
        ],
      },
      {
        id: "tissue-holder",
        name: "Tissue Holder Set",
        group: "Holder",
        images: [
          { src: "/assets/products/endocubot/holders/01-stomach.png", label: "Tissue Holder Stomach" },
          { src: "/assets/products/endocubot/holders/02-incisura-angularis.png", label: "Tissue Holder Incisura Angularis" },
          { src: "/assets/products/endocubot/holders/03-colon-rectum.png", label: "Tissue Holder Colon/Rectum" },
          { src: "/assets/products/endocubot/holders/04-esophagus.png", label: "Tissue Holder Esophagus" },
          { src: "/assets/products/endocubot/holders/05-scope-handling-holder.png", label: "Scope Handling Holder" },
          { src: "/assets/products/endocubot/holders/06-scope-handling-instrument.png", label: "Scope Handling Instrument" },
          { src: "/assets/products/endocubot/holders/07-scope-handling-film-set.png", label: "Scope Handling Film Set" },
        ],
      },
      {
        id: "phantom-tissue",
        name: "Phantom Tissue",
        group: "Phantom Tissue",
        images: [
          { src: "/assets/products/endocubot/phantom-tissues/01-vtt-mcg.png", label: "ESD (Gastric)" },
          { src: "/assets/products/endocubot/phantom-tissues/02-vtt-mcs.png", label: "ESD (Colorectal)" },
          { src: "/assets/products/endocubot/phantom-tissues/03-suturing.png", label: "Suturing" },
          { src: "/assets/products/endocubot/phantom-tissues/04-polypectomy.png", label: "Polypectomy" },
          { src: "/assets/products/endocubot/phantom-tissues/05-clipping.png", label: "Clipping" },
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "tracloser-retractable",
    name: "TraCloser",
    nameSuffix: "Retractable Type",
    logo: "/assets/products/tracloser-retractable/logo.png",
    heroImage: "/assets/products/tracloser-retractable/hero.png",
    thumbnail: "/assets/products/tracloser-retractable/hero.png",
    category: "Traction & Closure Device",
    sub: "",
    desc: {
      ko: "(실제 데이터 미입력) TraCloser Retractable은 견인과 봉합 기능을 하나의 디바이스에 통합한 내시경 수술 보조 기구입니다.",
      en: "TraCloser Retractable is a dual-function robotic gripper designed to combine tissue traction and defect closure in a single endoscopic device.",
    },
    specs: [
      { k: "Function", v: "Traction + Closure" },
      { k: "Retractable", v: "Yes" },
      { k: "Compatibility", v: "Standard Endoscope" },
    ],
    clinical: { cases: "—", success: "—", time: "—", hospitals: "—" },
    videos: [
      {
        id: "tracloser-overview",
        title: "Animation Overview",
        src: "/assets/products/tracloser-retractable/videos/01-overview.mp4",
        poster: "/assets/products/tracloser-retractable/videos/01-overview.jpg",
      },
      {
        id: "tracloser-clinical-case",
        title: "Retractable - Clinical Case",
        src: "/assets/products/tracloser-retractable/videos/02-gastric-esd-clinical.mp4",
        poster: "/assets/products/tracloser-retractable/videos/02-gastric-esd-clinical.jpg",
      },
    ],
    highlights: [
      "Over-the-Scope Design — Endoscopic traction device that mounts over a standard endoscope",
      "Multi-Directional Manipulation — Capable of grasping, lifting up & down, pushing/pulling, and rolling",
      "Hand-Held Controller — Ergonomic, easy-to-use, small, and lightweight controller",
      "Dissection + Closure — Capable of both dissecting and closing in a single ESD workflow",
      "Robotic & Manual Variants — Available in both robotic and manual configurations",
    ],
    papers: [
      {
        id: "tr-2024-kim-gutliver-colorectal",
        title: "A Novel Retractable Robotic Device for Colorectal Endoscopic Submucosal Dissection",
        authors: "Kim SH, Kim C, Keum B, Im J, Won S, Kim BG, Kim K, Kwon T, Hong D, Jeon HJ, Choi HS, Kim ES, Jeen YT, Chun HJ, Hwang JH",
        journal: "Gut and Liver",
        year: 2024,
        type: "Ex Vivo Porcine + In Vivo Feasibility Study",
        keyClaims: [
          "41% shorter procedure (20.1 vs 34.3 min)",
          "2.0× faster dissection speed",
          "64% fewer blind dissections (12.8% vs 35.1%)",
          "Retractable cap reaches proximal colon (70 cm)",
        ],
        abstract: "Background/Aims: Appropriate tissue tension and clear visibility of the dissection area using traction are essential for effective and safe endoscopic submucosal dissection (ESD). In this study, we developed a retractable robot-assisted traction device and evaluated its performance in colorectal ESD. Methods: An experienced endoscopist performed ESD 18 times on an ex vivo porcine colon using the robot and 18 times using the conventional method. The outcome measures were procedure time, dissection speed, procedure-related adverse events, and blind dissection rate. Results: Thirty-six colonic lesions were resected from ex vivo porcine colon samples. The total procedure time was significantly shorter in robot-assisted ESD (RESD) than in conventional ESD (CESD) (20.1±4.1 minutes vs 34.3±8.3 minutes, p<0.05). The submucosal dissection speed was significantly faster in the RESD group than in the CESD group (36.8±9.2 mm²/min vs 18.1±4.7 mm²/min, p<0.05). The blind dissection rate was also significantly lower in the RESD group (12.8%±3.4% vs 35.1%±3.9%, p<0.05). In an in vivo porcine feasibility study, the robotic device was attached to a colonoscope and successfully inserted into the proximal colon without damaging the colonic wall, and ESD was successfully performed. Conclusions: The dissection speed and safety profile improved significantly with the retractable RESD. Thus, our robotic device has the potential to provide simple, effective, and safe multidirectional traction during colonic ESD.",
        doi: "10.5009/gnl230280",
        url: "https://doi.org/10.5009/gnl230280",
        pdf: "/assets/products/tracloser-retractable/papers/2024_Kim_Retractable_Colorectal_GutLiver.pdf",
        clinical: {
          patients: "36 ex vivo porcine ESDs (18 RESD vs 18 CESD) + 6 in vivo RESDs in 2 live pigs",
          enBloc: "100% (complete resection in all 36 ex vivo cases)",
          procedureTime: "RESD 20.1±4.1 min vs CESD 34.3±8.3 min (p<0.05)",
          dissectionSpeed: "RESD 36.8±9.2 vs CESD 18.1±4.7 mm²/min (p<0.05)",
          complications: "0 in RESD; 2 minor perforations in CESD (both posterior wall)",
          notes: "Blind dissection rate 12.8% (RESD) vs 35.1% (CESD), p<0.05. Retractable cap enabled proximal colon insertion to 70 cm from anal verge in vivo with no mucosal damage. Equivalent RESD performance across ascending / transverse / descending colon.",
        },
      },
    ],
    comingSoon: true,
    components: [
      {
        id: "tracloser-config-robotic",
        name: "TraCloser Robotic Retractable",
        group: "Configuration",
        image: "/assets/products/tracloser-retractable/configurations/01-robotic.png",
        bullets: [
          "Seamless integration with the ROBOPERA platform",
          "Precise multi-directional traction via dual controller",
          "Single-operator robotic ESD with traction + closure",
        ],
      },
      {
        id: "tracloser-config-manual",
        name: "TraCloser Manual Retractable",
        group: "Configuration",
        image: "/assets/products/tracloser-retractable/configurations/02-manual.png",
        bullets: [
          "Compact, portable — no console required",
          "Lower-cost entry point for advanced traction",
          "Ideal for low-volume centers and training",
        ],
      },
    ],
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
