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
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null);

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
            <button className="back-btn rail-back" onClick={() => { setSelectedId(null); setExpandedPaper(null); }}>
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
              onClick={() => { setSelectedId(p.id); setExpandedPaper(null); }}
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
              {/* Section 1: Brochure-aligned overview — image + text description */}
              <section className="panel-section brochure">
                <div className="brochure-grid">
                  <div className="placeholder-media tall brochure-image">
                    <span className="ph-label">[ {product.name} — Product Image ]</span>
                  </div>
                  <div className="brochure-text">
                    <div className="brochure-cat">{product.category}</div>
                    <h3 className="brochure-heading">{product.sub}</h3>
                    <p className="brochure-desc">{product.desc[lang]}</p>
                    {product.highlights && product.highlights.length > 0 && (
                      <ul className="brochure-highlights">
                        {product.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                    <div className="brochure-specs">
                      {product.specs.slice(0, 4).map((s) => (
                        <div key={s.k} className="brochure-spec">
                          <div className="brochure-spec-key">{s.k}</div>
                          <div className="brochure-spec-val">{s.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Related videos */}
              <section className="panel-section">
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

              {/* Section 3: Clinical Data — summary + paper list */}
              <section className="panel-section">
                <h3 className="panel-h3">{t("panel.clinical")}</h3>

                <div className="clinical-summary-label">{t("panel.summary")}</div>
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

                {product.papers && product.papers.length > 0 && (
                  <div className="papers-block">
                    <div className="papers-header">
                      <div className="clinical-summary-label">{t("panel.papers")}</div>
                      <div className="papers-hint">{t("papers.hint")}</div>
                    </div>
                    <div className="papers-list">
                      {product.papers.map((p) => {
                        const open = expandedPaper === p.id;
                        return (
                          <div key={p.id} className={`paper-item ${open ? "open" : ""}`}>
                            <button
                              className="paper-row"
                              onClick={() =>
                                setExpandedPaper(open ? null : p.id)
                              }
                              aria-expanded={open}
                            >
                              <div className="paper-row-main">
                                <div className="paper-title">{p.title}</div>
                                <div className="paper-meta">
                                  <span className="paper-journal">{p.journal}</span>
                                  <span className="paper-dot">·</span>
                                  <span>{p.year}</span>
                                  {p.type && (
                                    <>
                                      <span className="paper-dot">·</span>
                                      <span className="paper-type">{p.type}</span>
                                    </>
                                  )}
                                </div>
                                <div className="paper-authors">{p.authors}</div>
                              </div>
                              <div className="paper-chevron" aria-hidden>
                                {open ? "▲" : "▼"}
                              </div>
                            </button>
                            {open && (
                              <div className="paper-detail">
                                <div className="paper-detail-section">
                                  <div className="paper-detail-label">
                                    {t("paper.abstract")}
                                  </div>
                                  <p className="paper-abstract">{p.abstract}</p>
                                </div>
                                <div className="paper-detail-grid">
                                  <div>
                                    <div className="paper-detail-label">
                                      {t("paper.authors")}
                                    </div>
                                    <div className="paper-detail-val">{p.authors}</div>
                                  </div>
                                  <div>
                                    <div className="paper-detail-label">
                                      {t("paper.journal")}
                                    </div>
                                    <div className="paper-detail-val">
                                      {p.journal}, {p.year}
                                    </div>
                                  </div>
                                  {p.doi && (
                                    <div>
                                      <div className="paper-detail-label">
                                        {t("paper.doi")}
                                      </div>
                                      <div className="paper-detail-val paper-doi">
                                        {p.doi}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </section>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
