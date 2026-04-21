"use client";

import { useEffect, useState } from "react";
import { PRODUCTS, SLIDES, TR, type Lang, type Paper, type VideoItem } from "@/lib/products";

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
              {p.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.thumbnail} alt={p.name} className="rail-thumb" />
              ) : (
                <div className="rail-thumb placeholder-media">
                  <span className="ph-label">[ {p.name} ]</span>
                </div>
              )}
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
                  {product.heroImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.heroImage}
                      alt={product.name}
                      className="brochure-image"
                    />
                  ) : (
                    <div className="placeholder-media tall brochure-image">
                      <span className="ph-label">[ {product.name} — Product Image ]</span>
                    </div>
                  )}
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

              {/* Section 2: Components (only if product has them) */}
              {product.components && product.components.length > 0 && (
                <section className="panel-section">
                  <h3 className="panel-h3">
                    {lang === "ko" ? "구성품" : "Components & Configuration"}
                  </h3>
                  {Array.from(
                    new Set(product.components.map((c) => c.group))
                  ).map((group) => {
                    const items = product.components!.filter((c) => c.group === group);
                    return (
                      <div key={group} className="components-group">
                        <div className="components-group-label">{group}</div>
                        <div
                          className={`components-grid ${
                            items.length > 1 ? "multi" : "single"
                          }`}
                        >
                          {items.map((c) => (
                            <div key={c.id} className="component-card">
                              {c.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={c.image}
                                  alt={c.name}
                                  className="component-image"
                                />
                              ) : (
                                <div className="placeholder-media component-image">
                                  <span className="ph-label">[ {c.name} ]</span>
                                </div>
                              )}
                              <div className="component-body">
                                <div className="component-name">{c.name}</div>
                                {c.description && (
                                  <p className="component-desc">{c.description}</p>
                                )}
                                {c.specs && c.specs.length > 0 && (
                                  <div className="component-specs">
                                    {c.specs.map((s) => (
                                      <div key={s.k} className="component-spec">
                                        <span className="component-spec-key">{s.k}</span>
                                        <span className="component-spec-val">{s.v}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </section>
              )}

              {/* Section 3: Related videos */}
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

                {(() => {
                  const paperGroups: { label: string | null; papers: Paper[] }[] = [];
                  if (product.papers && product.papers.length > 0) {
                    paperGroups.push({ label: null, papers: product.papers });
                  }
                  if (product.components) {
                    for (const c of product.components) {
                      if (c.papers && c.papers.length > 0) {
                        paperGroups.push({ label: c.name, papers: c.papers });
                      }
                    }
                  }
                  if (paperGroups.length === 0) return null;

                  const renderClinical = (c: Paper["clinical"]) => {
                    if (!c) return null;
                    const rows: { k: string; v: string }[] = [];
                    if (c.patients) rows.push({ k: "Patients / Cases", v: c.patients });
                    if (c.enBloc) rows.push({ k: "En Bloc Resection", v: c.enBloc });
                    if (c.r0) rows.push({ k: "R0 Resection", v: c.r0 });
                    if (c.procedureTime) rows.push({ k: "Procedure Time", v: c.procedureTime });
                    if (c.dissectionSpeed) rows.push({ k: "Dissection Speed", v: c.dissectionSpeed });
                    if (c.complications) rows.push({ k: "Complications", v: c.complications });
                    if (c.notes) rows.push({ k: "Notes", v: c.notes });
                    if (rows.length === 0) return null;
                    return (
                      <div className="paper-detail-section">
                        <div className="paper-detail-label">Clinical Data</div>
                        <div className="paper-clinical">
                          {rows.map((r) => (
                            <div key={r.k} className="paper-clinical-row">
                              <div className="paper-clinical-k">{r.k}</div>
                              <div className="paper-clinical-v">{r.v}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  };

                  return (
                    <div className="papers-block">
                      <div className="papers-header">
                        <div className="clinical-summary-label">{t("panel.papers")}</div>
                        <div className="papers-hint">{t("papers.hint")}</div>
                      </div>
                      {paperGroups.map((grp) => (
                        <div
                          key={grp.label ?? "_general"}
                          className="papers-group-block"
                        >
                          {grp.label && (
                            <div className="papers-component-label">
                              <span className="papers-component-tag">COMPONENT</span>
                              {grp.label}
                              <span className="papers-count">{grp.papers.length}</span>
                            </div>
                          )}
                          <div className="papers-list">
                            {grp.papers.map((p) => {
                              const open = expandedPaper === p.id;
                              return (
                                <div
                                  key={p.id}
                                  className={`paper-item ${open ? "open" : ""}`}
                                >
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
                                        <span className="paper-journal">
                                          {p.journal}
                                        </span>
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
                                      {renderClinical(p.clinical)}
                                      <div className="paper-detail-grid">
                                        <div>
                                          <div className="paper-detail-label">
                                            {t("paper.authors")}
                                          </div>
                                          <div className="paper-detail-val">
                                            {p.authors}
                                          </div>
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
                                      <div className="paper-actions">
                                        {p.pdf && (
                                          <a
                                            href={p.pdf}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="paper-action-btn primary"
                                          >
                                            📄 View PDF
                                          </a>
                                        )}
                                        {p.url && (
                                          <a
                                            href={p.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="paper-action-btn"
                                          >
                                            🔗 Publisher Link
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </section>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
