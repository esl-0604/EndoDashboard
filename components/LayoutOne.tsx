"use client";

import { useEffect, useState } from "react";
import { PRODUCTS, SLIDES, TR, type Lang, type VideoItem } from "@/lib/products";

const SLIDE_DURATION = 7000;

export default function LayoutOne({
  lang,
  onVideoClick,
}: {
  lang: Lang;
  onVideoClick: (v: VideoItem) => void;
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  const t = (k: string) => TR[lang][k] ?? k;
  const product = PRODUCTS.find((p) => p.id === selectedId);
  const isDetail = selectedId !== null;

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const progressTimer = setInterval(() => {
      setProgress(Math.min(100, ((Date.now() - start) / SLIDE_DURATION) * 100));
    }, 50);
    const slideTimer = setTimeout(() => {
      setSlideIdx((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => {
      clearInterval(progressTimer);
      clearTimeout(slideTimer);
    };
  }, [slideIdx]);

  const slide = SLIDES[slideIdx][lang];

  return (
    <div className={`showcase ${isDetail ? "detail" : ""}`}>
      <section className="video-stage" aria-hidden={isDetail}>
        <div className="slides">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`slide placeholder-media ${i === slideIdx ? "active" : ""}`}
            >
              <span className="ph-label">[ Video {i + 1} — {SLIDES[i].en.t} ]</span>
            </div>
          ))}
        </div>
        <div className="stage-overlay">
          <div className="badges">
            <span className="badge">● FDA Cleared</span>
            <span className="badge">● CE Marked</span>
            <span className="badge">● KFDA</span>
          </div>
          <div className="slide-caption">
            <h2>{slide.t}</h2>
            <p>{slide.d}</p>
          </div>
          <div className="slide-controls">
            <div className="slide-dots">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === slideIdx ? "active" : ""}`}
                  onClick={() => setSlideIdx(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <div className="slide-progress">
              <div className="slide-progress-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </section>

      <aside className="product-rail">
        <div className="rail-header">
          {isDetail ? (
            <button className="back-btn rail-back" onClick={() => setSelectedId(null)}>
              <span className="back-arrow">←</span>
              <span>{t("panel.back")}</span>
            </button>
          ) : (
            <>
              <div className="rail-eyebrow">{t("rail.eyebrow")}</div>
              <div className="rail-title">{t("rail.title")}</div>
            </>
          )}
        </div>
        <div className="rail-list">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              className={`rail-tile ${selectedId === p.id ? "selected" : ""}`}
              onClick={() => setSelectedId(p.id)}
            >
              <div className="rail-thumb placeholder-media">
                <span className="ph-label">[ {p.name} ]</span>
              </div>
              <div className="rail-info">
                <div className="rail-cat">{p.category}</div>
                <div className="rail-name">{p.name}</div>
                <div className="rail-sub">{p.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <section className="product-panel" aria-hidden={!isDetail}>
        {product && (
          <>
            <div className="panel-header">
              <div className="panel-title-group">
                <div className="panel-cat">{product.category}</div>
                <h2 className="panel-title">{product.name}</h2>
              </div>
            </div>

            <div className="panel-body">
              <section className="panel-hero">
                <div className="placeholder-media tall">
                  <span className="ph-label">[ {product.name} — Hero Image / Video ]</span>
                </div>
                <div className="panel-intro">
                  <p className="panel-desc">{product.desc[lang]}</p>
                  <h3 className="panel-h3 sm">{t("panel.specs")}</h3>
                  <div className="spec-grid">
                    {product.specs.map((s) => (
                      <div key={s.k} className="spec-item">
                        <div className="spec-key">{s.k}</div>
                        <div className="spec-val">{s.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <h3 className="panel-h3">{t("panel.videos")}</h3>
                <div className="related-videos">
                  {product.videos.map((v) => (
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
                    <div className="clinical-num">{product.clinical.cases}</div>
                    <div className="clinical-lbl">{t("clin.cases")}</div>
                  </div>
                  <div className="clinical-card">
                    <div className="clinical-num">{product.clinical.success}</div>
                    <div className="clinical-lbl">{t("clin.success")}</div>
                  </div>
                  <div className="clinical-card">
                    <div className="clinical-num">{product.clinical.time}</div>
                    <div className="clinical-lbl">{t("clin.time")}</div>
                  </div>
                  <div className="clinical-card">
                    <div className="clinical-num">{product.clinical.hospitals}</div>
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
          </>
        )}
      </section>
    </div>
  );
}
