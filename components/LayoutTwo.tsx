"use client";

import { useState } from "react";
import { PRODUCTS, TR, type Lang, type VideoItem } from "@/lib/products";

export default function LayoutTwo({
  lang,
  onVideoClick,
}: {
  lang: Lang;
  onVideoClick: (v: VideoItem) => void;
}) {
  const [featuredId, setFeaturedId] = useState<number>(PRODUCTS[0].id);
  const [detailOpen, setDetailOpen] = useState(false);

  const t = (k: string) => TR[lang][k] ?? k;
  const featured = PRODUCTS.find((p) => p.id === featuredId)!;

  return (
    <div className="spotlight">
      {/* Top: featured product spotlight */}
      <div className="spotlight-hero">
        <div className="spotlight-media placeholder-media" key={featured.id}>
          <span className="ph-label">[ {featured.name} — Hero Image / Video ]</span>
          <div className="badges spotlight-badges">
            <span className="badge">● FDA Cleared</span>
            <span className="badge">● CE Marked</span>
            <span className="badge">● KFDA</span>
          </div>
        </div>
        <div className="spotlight-info" key={`info-${featured.id}`}>
          <div className="spotlight-cat">{featured.category}</div>
          <h1 className="spotlight-name">{featured.name}</h1>
          <div className="spotlight-sub">{featured.sub}</div>
          <p className="spotlight-desc">{featured.desc[lang]}</p>
          <div className="spotlight-specs">
            {featured.specs.map((s) => (
              <div key={s.k} className="spotlight-spec">
                <div className="spotlight-spec-val">{s.v}</div>
                <div className="spotlight-spec-key">{s.k}</div>
              </div>
            ))}
          </div>
          <button className="spotlight-cta" onClick={() => setDetailOpen(true)}>
            {lang === "ko" ? "상세 정보 보기" : "View Full Details"} <span>→</span>
          </button>
        </div>
      </div>

      {/* Bottom: product strip */}
      <div className="spotlight-strip">
        <div className="strip-header">
          <div className="strip-eyebrow">{t("rail.eyebrow")}</div>
          <div className="strip-hint">{lang === "ko" ? "제품을 터치하여 전환" : "Tap to switch product"}</div>
        </div>
        <div className="strip-list">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              className={`strip-card ${featuredId === p.id ? "active" : ""}`}
              onClick={() => {
                setFeaturedId(p.id);
                setDetailOpen(false);
              }}
            >
              <div className="strip-thumb placeholder-media">
                <span className="ph-label">[ {p.name} ]</span>
              </div>
              <div className="strip-info">
                <div className="strip-cat">{p.category}</div>
                <div className="strip-name">{p.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail overlay */}
      {detailOpen && (
        <div className="detail-overlay" role="dialog" aria-modal="true">
          <div className="detail-overlay-inner">
            <div className="detail-overlay-header">
              <div>
                <div className="panel-cat">{featured.category}</div>
                <h2 className="panel-title">{featured.name}</h2>
              </div>
              <button
                className="detail-overlay-close"
                onClick={() => setDetailOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="detail-overlay-body">
              <section>
                <h3 className="panel-h3">{t("panel.videos")}</h3>
                <div className="related-videos">
                  {featured.videos.map((v) => (
                    <button
                      key={v.id}
                      className="video-thumb-btn"
                      onClick={() => onVideoClick(v)}
                    >
                      <div className="placeholder-media video-thumb">
                        <div className="play-icon">▶</div>
                        <div className="video-label">{v.title}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="panel-h3">{t("panel.clinical")}</h3>
                <div className="clinical-grid">
                  <div className="clinical-card">
                    <div className="clinical-num">{featured.clinical.cases}</div>
                    <div className="clinical-lbl">{t("clin.cases")}</div>
                  </div>
                  <div className="clinical-card">
                    <div className="clinical-num">{featured.clinical.success}</div>
                    <div className="clinical-lbl">{t("clin.success")}</div>
                  </div>
                  <div className="clinical-card">
                    <div className="clinical-num">{featured.clinical.time}</div>
                    <div className="clinical-lbl">{t("clin.time")}</div>
                  </div>
                  <div className="clinical-card">
                    <div className="clinical-num">{featured.clinical.hospitals}</div>
                    <div className="clinical-lbl">{t("clin.hospitals")}</div>
                  </div>
                </div>
                <div className="clinical-chart placeholder-media">
                  <span className="ph-label">[ Clinical Outcomes Chart / Trial Summary ]</span>
                </div>
                <ul className="clinical-list">
                  <li>{lang === "ko" ? "(더미) 다기관 임상시험 — 환자 만족도 96%" : "(dummy) Multi-center trial — 96% patient satisfaction"}</li>
                  <li>{lang === "ko" ? "(더미) 평균 시술 시간 32% 단축" : "(dummy) Average procedure time reduced by 32%"}</li>
                  <li>{lang === "ko" ? "(더미) 합병증 발생률 1.5% 미만" : "(dummy) Complication rate < 1.5%"}</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
