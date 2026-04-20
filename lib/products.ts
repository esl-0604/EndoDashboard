export type Lang = "ko" | "en";

export type VideoItem = { id: string; title: string; src: string };

export type Paper = {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  type?: string; // e.g., "RCT", "Cohort Study", "Case Series"
  abstract: string;
  doi?: string;
  url?: string;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  sub: string;
  desc: Record<Lang, string>;
  highlights?: string[]; // brochure-aligned bullet points
  specs: { k: string; v: string }[];
  clinical: { cases: string; success: string; time: string; hospitals: string };
  videos: VideoItem[];
  papers: Paper[];
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "EndoFlex R1",
    category: "Flexible Robotic Platform",
    sub: "Flagship robotic endoscope",
    desc: {
      ko: "(더미) EndoFlex R1은 7자유도 유연 구동을 갖춘 차세대 로봇 내시경 플랫폼으로, 좁고 굴곡진 해부학적 구조에서도 정밀한 시술을 가능하게 합니다.",
      en: "(dummy) EndoFlex R1 is the next-generation robotic endoscopic platform with 7 degrees of freedom, enabling precise procedures in narrow and tortuous anatomy.",
    },
    specs: [
      { k: "Degrees of Freedom", v: "7" },
      { k: "Distal Diameter", v: "3.2 mm" },
      { k: "Working Length", v: "1,200 mm" },
      { k: "Setup Time", v: "< 5 min" },
    ],
    clinical: { cases: "120+", success: "98.5%", time: "-32%", hospitals: "15" },
    videos: [
      { id: "r1-demo", title: "Demo Video", src: "" },
      { id: "r1-proc", title: "Live Procedure", src: "" },
      { id: "r1-intv", title: "Surgeon Interview", src: "" },
    ],
    highlights: [
      "(dummy) 7 degrees of freedom for unprecedented dexterity in confined anatomy",
      "(dummy) 3.2 mm distal tip for access to narrow lumens",
      "(dummy) Plug & Play setup in under 5 minutes",
      "(dummy) Compatible with standard OR workflow",
    ],
    papers: [
      {
        id: "r1-p1",
        title: "Clinical safety and feasibility of a novel 7-DOF flexible robotic endoscope: a first-in-human study",
        authors: "Kim JH, Park SY, Lee MJ, et al.",
        journal: "Gastrointestinal Endoscopy",
        year: 2025,
        type: "Prospective Cohort",
        abstract: "(dummy) In this first-in-human prospective cohort study of 48 patients undergoing complex colorectal procedures, the EndoFlex R1 platform demonstrated a 98.5% technical success rate with no device-related serious adverse events. Mean procedure time was reduced by 32% compared to historical controls. These findings support the safety and feasibility of the 7-DOF flexible robotic platform.",
        doi: "10.xxxx/gie.2025.0042",
      },
      {
        id: "r1-p2",
        title: "Comparative efficacy of flexible robotic endoscopy versus conventional endoscopy in colorectal polypectomy",
        authors: "Chen L, Tanaka K, Rossi G, et al.",
        journal: "Endoscopy",
        year: 2025,
        type: "RCT",
        abstract: "(dummy) This multicenter randomized controlled trial (n=210) compared the EndoFlex R1 against conventional colonoscopy for complex polyp removal. The robotic arm achieved a 96% en-bloc resection rate vs 82% in control (p<0.01) with lower perforation rates.",
        doi: "10.xxxx/endo.2025.1188",
      },
      {
        id: "r1-p3",
        title: "Learning curve analysis of the 7-DOF flexible robotic endoscope platform",
        authors: "Park SY, Kim JH, et al.",
        journal: "Surgical Endoscopy",
        year: 2024,
        type: "Observational",
        abstract: "(dummy) Analysis of 320 consecutive procedures performed by 12 operators suggests a learning curve plateau at approximately 15 cases, with procedure time stabilization at approximately 28 minutes.",
        doi: "10.xxxx/se.2024.0901",
      },
    ],
  },
  {
    id: 2,
    name: "EndoConsole C2",
    category: "Surgeon Console",
    sub: "Ergonomic control station",
    desc: {
      ko: "(더미) 햅틱 피드백과 3D 영상을 통합한 외과의 콘솔로, 직관적이고 정밀한 조작을 제공합니다.",
      en: "(dummy) Surgeon console integrating haptic feedback and 3D imaging for intuitive, precise control.",
    },
    specs: [
      { k: "Display", v: '32" 3D 4K' },
      { k: "Haptic Force", v: "0.1–10 N" },
      { k: "Latency", v: "< 20 ms" },
      { k: "Foot Pedals", v: "6-axis" },
    ],
    clinical: { cases: "80+", success: "97.2%", time: "-28%", hospitals: "12" },
    videos: [
      { id: "c2-demo", title: "Console Walkthrough", src: "" },
      { id: "c2-ergo", title: "Ergonomics Test", src: "" },
      { id: "c2-haptic", title: "Haptic Demo", src: "" },
    ],
    highlights: [
      "(dummy) 32-inch 3D 4K stereoscopic display for immersive visualization",
      "(dummy) Sub-20ms haptic feedback latency",
      "(dummy) Ergonomic seating designed for 3+ hour procedures",
      "(dummy) 6-axis foot pedals for hands-free control",
    ],
    papers: [
      {
        id: "c2-p1",
        title: "Surgeon ergonomics and cognitive load during robotic endoscopy: validation of the C2 console",
        authors: "Alvarez R, Müller T, Yamamoto H, et al.",
        journal: "Journal of Minimally Invasive Surgery",
        year: 2025,
        type: "Crossover Study",
        abstract: "(dummy) A crossover study (n=24 surgeons) evaluating musculoskeletal load and NASA-TLX scores demonstrated a 41% reduction in neck and shoulder strain compared to conventional endoscopy.",
        doi: "10.xxxx/jmis.2025.0217",
      },
      {
        id: "c2-p2",
        title: "Haptic feedback fidelity in the EndoConsole C2: a phantom model evaluation",
        authors: "Singh A, Patel D, et al.",
        journal: "IEEE Transactions on Medical Robotics",
        year: 2024,
        type: "Bench Study",
        abstract: "(dummy) Force-feedback resolution measured against phantom tissue models showed <0.1N discrimination threshold, enabling fine tissue manipulation equivalent to open surgical conditions.",
        doi: "10.xxxx/tmrb.2024.1455",
      },
    ],
  },
  {
    id: 3,
    name: "EndoTools Disposable Kit",
    category: "Instruments",
    sub: "Single-use precision tools",
    desc: {
      ko: "(더미) 일회용 정밀 기구 세트로 교차 감염 위험을 최소화하고 일관된 시술 품질을 보장합니다.",
      en: "(dummy) Single-use precision instrument kit minimizing cross-contamination and ensuring consistent procedural quality.",
    },
    specs: [
      { k: "Tool Variants", v: "12 types" },
      { k: "Sterilization", v: "EO-Sterilized" },
      { k: "Shelf Life", v: "3 years" },
      { k: "Compatibility", v: "R1 / R2 platform" },
    ],
    clinical: { cases: "5,000+", success: "99.1%", time: "—", hospitals: "30+" },
    videos: [
      { id: "kit-unbox", title: "Unboxing & Setup", src: "" },
      { id: "kit-usage", title: "Clinical Usage", src: "" },
      { id: "kit-variants", title: "Tool Variants", src: "" },
    ],
    highlights: [
      "(dummy) 12 purpose-built disposable instruments",
      "(dummy) EO-sterilized, individually packaged",
      "(dummy) 3-year shelf life",
      "(dummy) Compatible with R1 and R2 platforms",
    ],
    papers: [
      {
        id: "kit-p1",
        title: "Single-use disposable instruments in flexible robotic endoscopy: infection control and workflow outcomes",
        authors: "Nguyen TH, O'Brien M, Santos P, et al.",
        journal: "American Journal of Infection Control",
        year: 2025,
        type: "Multicenter Observational",
        abstract: "(dummy) Analysis across 30 hospitals showed zero device-attributed cross-contamination events over 5,000+ procedures, compared to baseline rates of 0.4% with reusable instruments.",
        doi: "10.xxxx/ajic.2025.0330",
      },
    ],
  },
  {
    id: 4,
    name: "EndoVision AI",
    category: "Imaging & AI Module",
    sub: "Real-time diagnostic assist",
    desc: {
      ko: "(더미) 실시간 영상 분석 AI 모듈이 병변 탐지와 진단을 보조하여 시술의 정확도와 안전성을 향상시킵니다.",
      en: "(dummy) Real-time image analysis AI module assists lesion detection and diagnosis, enhancing procedural accuracy and safety.",
    },
    specs: [
      { k: "Detection Sensitivity", v: "96.8%" },
      { k: "Inference Latency", v: "< 30 ms" },
      { k: "Supported Lesions", v: "8 types" },
      { k: "Integration", v: "DICOM / HL7" },
    ],
    clinical: { cases: "2,300+", success: "—", time: "-18%", hospitals: "8" },
    videos: [
      { id: "ai-detect", title: "Lesion Detection Demo", src: "" },
      { id: "ai-analysis", title: "Real-time Analysis", src: "" },
      { id: "ai-integration", title: "System Integration", src: "" },
    ],
    highlights: [
      "(dummy) 96.8% sensitivity for 8 lesion types in real-time",
      "(dummy) <30ms inference latency enables seamless workflow",
      "(dummy) Native DICOM / HL7 integration",
      "(dummy) FDA-cleared deep learning model",
    ],
    papers: [
      {
        id: "ai-p1",
        title: "Real-time AI-assisted lesion detection during flexible endoscopy: a prospective multicenter study",
        authors: "Zhang W, Kumar R, Schmidt F, et al.",
        journal: "Lancet Digital Health",
        year: 2025,
        type: "Prospective Multicenter",
        abstract: "(dummy) Prospective study across 8 centers (n=2,340 procedures) demonstrated an 18% increase in adenoma detection rate with AI assistance vs standard endoscopy (p<0.001), without meaningful change in procedure time.",
        doi: "10.xxxx/lanhl.2025.0014",
      },
      {
        id: "ai-p2",
        title: "Validation of an AI-driven diagnostic module across diverse patient populations",
        authors: "Okonkwo C, Abdi S, Martinez L, et al.",
        journal: "Nature Medicine",
        year: 2024,
        type: "Validation Study",
        abstract: "(dummy) Cross-population validation (n=1,800) in 4 countries confirmed consistent sensitivity (95-97%) and specificity (92-94%) across demographic subgroups.",
        doi: "10.xxxx/nm.2024.2277",
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
