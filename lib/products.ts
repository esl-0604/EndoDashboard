export type Lang = "ko" | "en";

export type VideoItem = { id: string; title: string; src: string };

export type Component = {
  id: string;
  name: string;
  group: string; // top-level grouping e.g. "Driver Unit", "Instrument"
  image?: string;
  description?: string;
  specs?: { k: string; v: string }[];
};

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
    clinical: { cases: "15+", success: "100%", time: "28.8 min", hospitals: "1" },
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
        description: "(실제 데이터 미입력) Single-arm articulated gripper for standard traction during ESD.",
        specs: [
          { k: "Degrees of Freedom", v: "—" },
          { k: "Gripping Force", v: "—" },
          { k: "Tip Diameter", v: "—" },
        ],
      },
      {
        id: "dual-gripper-g",
        name: "Articulated Dual Gripper G",
        group: "Instrument",
        image: "",
        description: "(실제 데이터 미입력) Dual-arm articulated gripper for combined traction and closure (TraCloser pattern).",
        specs: [
          { k: "Degrees of Freedom", v: "—" },
          { k: "Gripping Force", v: "—" },
          { k: "Tip Diameter", v: "—" },
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
