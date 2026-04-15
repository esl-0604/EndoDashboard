export type Lang = "ko" | "en";

export type Product = {
  id: number;
  name: string;
  category: string;
  sub: string;
  desc: Record<Lang, string>;
  specs: { k: string; v: string }[];
  clinical: { cases: string; success: string; time: string; hospitals: string };
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
  },
};
