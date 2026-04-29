"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HERO_VIDEOS, PRODUCTS, TR, type Lang, type Paper, type Product, type VideoItem } from "@/lib/products";

function ProductBrand({
  product,
  size,
}: {
  product: Product;
  size: "stage" | "panel" | "rail";
}) {
  const fullName = product.nameSuffix
    ? `${product.name} ${product.nameSuffix}`
    : product.name;
  if (!product.logo) {
    return (
      <span className={`product-brand brand-${size}`}>
        <span className="brand-name-text">{product.name}</span>
        {product.nameSuffix && (
          <span className="brand-suffix">{product.nameSuffix}</span>
        )}
      </span>
    );
  }
  return (
    <span className={`product-brand brand-${size}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.logo}
        alt={fullName}
        className="brand-logo"
      />
      {product.nameSuffix && (
        <span className="brand-suffix">{product.nameSuffix}</span>
      )}
    </span>
  );
}

export default function LayoutOne({
  lang,
  onVideoClick,
}: {
  lang: Lang;
  onVideoClick: (v: VideoItem) => void;
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);
  const [videoMuted, setVideoMuted] = useState(false);
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null);
  const [activeProductVideo, setActiveProductVideo] = useState<VideoItem | null>(null);
  const [stageProgress, setStageProgress] = useState(0);
  const [closingDetail, setClosingDetail] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<{
    src: string;
    label: string;
    rect: { top: number; left: number; width: number; height: number };
    shift: { x: number; y: number };
  } | null>(null);
  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => setPortalReady(true), []);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const stageVideoRef = useRef<HTMLVideoElement | null>(null);
  const closingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heroVideo = HERO_VIDEOS[heroIdx] ?? HERO_VIDEOS[0];

  const selectProduct = (id: number) => {
    if (closingTimeoutRef.current) {
      clearTimeout(closingTimeoutRef.current);
      closingTimeoutRef.current = null;
    }
    setClosingDetail(false);
    setSelectedId(id);
    setExpandedPaper(null);
    const p = PRODUCTS.find((x) => x.id === id);
    setActiveProductVideo(p?.videos[0] ?? null);
  };
  const closeProduct = () => {
    setSelectedId(null);
    setExpandedPaper(null);
    setActiveProductVideo(null);
    setClosingDetail(true);
    if (closingTimeoutRef.current) clearTimeout(closingTimeoutRef.current);
    closingTimeoutRef.current = setTimeout(() => {
      setClosingDetail(false);
      closingTimeoutRef.current = null;
    }, 1200);
  };

  const t = (k: string) => TR[lang][k] ?? k;
  const product = PRODUCTS.find((p) => p.id === selectedId);
  const isDetail = selectedId !== null;

  // Try to autoplay the hero video with sound. Browsers usually block this without
  // a prior user gesture, so we fall back to muted autoplay and arm a one-shot
  // listener that unmutes on the first user interaction (touch or click).
  // Re-runs whenever the active hero video changes so the new clip starts cleanly.
  useEffect(() => {
    if (isDetail) return;
    const v = heroVideoRef.current;
    if (!v) return;
    setHeroProgress(0);
    v.muted = false;
    setVideoMuted(false);
    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        v.muted = true;
        v.play().catch(() => {});
        setVideoMuted(true);
      });
    }
  }, [isDetail, heroIdx]);

  useEffect(() => {
    if (!zoomedImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomedImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomedImage]);

  const onHeroEnded = () => {
    if (HERO_VIDEOS.length > 1) {
      setHeroIdx((i) => (i + 1) % HERO_VIDEOS.length);
    }
  };

  // Mute/unmute is driven only by the on-screen toggle button (never a
  // document-level pointerdown listener). Reason: in React 17+, synthetic
  // stopPropagation on the button does not prevent the native pointerdown
  // from also reaching a document listener. The duplicate v.play()/muted
  // change races with the muted-autoplay fallback and pauses the video on
  // some browsers.

  const onHeroTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (v.duration > 0 && Number.isFinite(v.duration)) {
      setHeroProgress((v.currentTime / v.duration) * 100);
    }
  };

  const onHeroScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = heroVideoRef.current;
    if (!v) return;
    const pct = parseFloat(e.target.value);
    if (v.duration > 0 && Number.isFinite(v.duration)) {
      v.currentTime = (pct / 100) * v.duration;
    }
    setHeroProgress(pct);
  };

  // Reset stage scrubber whenever the selected product video changes so the bar
  // restarts from 0 instead of jumping to the previous clip's position.
  useEffect(() => {
    setStageProgress(0);
  }, [activeProductVideo?.id]);

  const onStageTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (v.duration > 0 && Number.isFinite(v.duration)) {
      setStageProgress((v.currentTime / v.duration) * 100);
    }
  };

  const onStageScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = stageVideoRef.current;
    if (!v) return;
    const pct = parseFloat(e.target.value);
    if (v.duration > 0 && Number.isFinite(v.duration)) {
      v.currentTime = (pct / 100) * v.duration;
    }
    setStageProgress(pct);
  };

  // Auto-advance to the next video in the product's playlist when the current
  // clip ends. Wraps around to the first video so the kiosk loops indefinitely.
  const onStageEnded = () => {
    if (!product || product.videos.length === 0) return;
    const idx = product.videos.findIndex((v) => v.id === activeProductVideo?.id);
    const next = product.videos[(idx + 1) % product.videos.length];
    setActiveProductVideo(next);
  };

  return (
    <div
      className={`showcase ${isDetail ? "detail" : ""}${closingDetail ? " closing-detail" : ""}`}
    >
      <section className="video-stage">
        {isDetail && product ? (
          <>
            <div className="stage-related-bar">
              <div className="stage-related-label">{t("panel.videos")}</div>
              <div className="stage-related-list">
                {product.videos.map((v) => {
                  const isPlaying = activeProductVideo?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      className={`stage-related-thumb ${isPlaying ? "playing" : ""}`}
                      onClick={() => setActiveProductVideo(v)}
                    >
                      <div className="stage-related-thumb-media">
                        {v.poster && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={v.poster}
                            alt=""
                            className="stage-related-thumb-poster"
                          />
                        )}
                        {isPlaying && (
                          <div className="now-playing-badge">
                            <span className="np-dot" />
                            NOW PLAYING
                          </div>
                        )}
                        <div className="play-icon">
                          {isPlaying ? (
                            <span className="eq-bars" aria-hidden>
                              <span /><span /><span /><span />
                            </span>
                          ) : (
                            "▶"
                          )}
                        </div>
                      </div>
                      <div className="stage-related-thumb-label">{v.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="stage-player">
              <div className="stage-video-wrap">
                {activeProductVideo?.src ? (
                  <video
                    key={activeProductVideo.id}
                    ref={stageVideoRef}
                    src={activeProductVideo.src}
                    autoPlay
                    muted
                    playsInline
                    onTimeUpdate={onStageTimeUpdate}
                    onEnded={onStageEnded}
                    className="stage-video"
                  />
                ) : (
                  <div className="slide placeholder-media active product-loop">
                    <span className="ph-label">
                      ▶ [ {product.name} —{" "}
                      {activeProductVideo?.title ?? "Product Video Loop"} ]
                    </span>
                  </div>
                )}
                {activeProductVideo?.src && (
                  <div className="stage-scrub-wrap">
                    <div className="stage-progress" aria-hidden>
                      <div
                        className="stage-progress-bar"
                        style={{ width: `${stageProgress}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={0.1}
                      value={stageProgress}
                      onChange={onStageScrub}
                      className="stage-scrubber"
                      aria-label="Seek video"
                    />
                  </div>
                )}
              </div>
              <div className="stage-caption-region">
                <h2 className="stage-product-title">
                  <ProductBrand product={product} size="stage" />
                </h2>
                {activeProductVideo && (
                  <div className="now-playing-inline">
                    <span className="np-dot" />
                    <span className="np-label">NOW PLAYING</span>
                    <span className="np-title">{activeProductVideo.title}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <video
              key={heroVideo.id}
              ref={heroVideoRef}
              src={heroVideo.src}
              autoPlay
              loop={HERO_VIDEOS.length === 1}
              playsInline
              onTimeUpdate={onHeroTimeUpdate}
              onEnded={onHeroEnded}
              className="stage-video"
            />
            <div className="stage-overlay hero">
              <button
                type="button"
                className={`hero-unmute-hint ${videoMuted ? "muted" : "unmuted"}`}
                onClick={() => {
                  const v = heroVideoRef.current;
                  if (!v) return;
                  const next = !v.muted;
                  v.muted = next;
                  if (!next && v.paused) {
                    v.play().catch(() => {});
                  }
                  setVideoMuted(next);
                }}
                aria-label={videoMuted ? "Enable sound" : "Mute"}
              >
                {videoMuted ? "🔇 Tap to enable sound" : "🔊 Mute"}
              </button>
              <div className="hero-bottom">
                {HERO_VIDEOS.length > 1 && (
                  <div className="hero-selector" role="tablist">
                    {HERO_VIDEOS.map((v, i) => (
                      <button
                        key={v.id}
                        type="button"
                        role="tab"
                        aria-selected={i === heroIdx}
                        className={`hero-pill ${i === heroIdx ? "active" : ""}`}
                        onClick={() => setHeroIdx(i)}
                      >
                        {v.title}
                      </button>
                    ))}
                  </div>
                )}
                <div className="hero-scrub-wrap">
                  <div className="hero-progress" aria-hidden>
                    <div
                      className="hero-progress-bar"
                      style={{ width: `${heroProgress}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={0.1}
                    value={heroProgress}
                    onChange={onHeroScrub}
                    className="hero-scrubber"
                    aria-label="Seek video"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <div className="rail-instruction" aria-hidden={isDetail}>
        <span className="rail-instruction-arrow">↓</span>
        <span>Tap a product below to view details</span>
      </div>

      <aside className="product-rail">
        {isDetail ? (
          <button
            type="button"
            className="rail-header rail-back-area"
            onClick={closeProduct}
            aria-label={t("panel.back") as string}
          >
            <span className="back-arrow">←</span>
            <span>{t("panel.back")}</span>
          </button>
        ) : (
          <div className="rail-header">
            <div className="rail-eyebrow">{t("rail.eyebrow")}</div>
            <div className="rail-title">{t("rail.title")}</div>
          </div>
        )}
        <div className="rail-list">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              data-slug={p.slug}
              className={`rail-tile ${selectedId === p.id ? "selected" : ""}`}
              onClick={() => selectProduct(p.id)}
            >
              <div className={`rail-thumb${!p.thumbnail ? " placeholder-media" : ""}`}>
                {p.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.thumbnail} alt={p.name} className="rail-thumb-img" />
                ) : (
                  <span className="ph-label">[ {p.name} ]</span>
                )}
                {p.thumbnail && p.thumbnailExtras && p.thumbnailExtras.length > 0 ? (
                  <div className="rail-thumb-extras-row">
                    {p.thumbnailExtras.map((src, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={src}
                        alt=""
                        className="rail-thumb-extra-item"
                      />
                    ))}
                  </div>
                ) : (
                  p.thumbnail && p.thumbnailExtra && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.thumbnailExtra} alt="" className="rail-thumb-extra" />
                  )
                )}
              </div>
              <div className="rail-info">
                <div className="rail-cat">{p.category}</div>
                <div className="rail-name">
                  <ProductBrand product={p} size="rail" />
                </div>
                {p.comingSoon ? (
                  <div className="rail-coming-soon">
                    <span className="rail-coming-soon-dot" />
                    Coming Soon
                  </div>
                ) : p.sub ? (
                  <div className="rail-sub">{p.sub}</div>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </aside>

      <section className="product-panel" aria-hidden={!isDetail}>
        {product && (
          <>
            <div className="panel-body">
              {/* Section 1: Overview — image + text description */}
              <section className="panel-section brochure">
                <div className="panel-section-head">
                  <span className="panel-section-num">01</span>
                  <h3 className="panel-h3">
                    {lang === "ko" ? "제품 소개" : "Overview"}
                  </h3>
                </div>
                <div className="brochure-grid">
                  <div className="brochure-image-col">
                    <div className="brochure-image-wrap" data-slug={product.slug}>
                      {product.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="brochure-image-main"
                        />
                      ) : (
                        <div className="placeholder-media brochure-image-main">
                          <span className="ph-label">[ {product.name} ]</span>
                        </div>
                      )}
                      {product.thumbnailExtras && product.thumbnailExtras.length > 0 ? (
                        <div className="brochure-image-extras-row">
                          {product.thumbnailExtras.map((src, i) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              key={i}
                              src={src}
                              alt=""
                              className="brochure-image-extra-item"
                            />
                          ))}
                        </div>
                      ) : (
                        product.thumbnailExtra && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.thumbnailExtra}
                            alt=""
                            className="brochure-image-extra"
                          />
                        )
                      )}
                    </div>
                    {(() => {
                      const cert = product.specs.find((s) =>
                        /clearance|certification|availability/i.test(s.k)
                      );
                      if (!cert) return null;
                      const isComingSoon = /coming\s*soon/i.test(cert.v);
                      return (
                        <div
                          className={`brochure-clearance${
                            isComingSoon ? " is-coming-soon" : ""
                          }`}
                        >
                          <div className="brochure-clearance-key">
                            {cert.k}
                          </div>
                          <div className="brochure-clearance-val">
                            {cert.v}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  <div className="brochure-text">
                    <div className="brochure-brand">
                      <ProductBrand product={product} size="rail" />
                    </div>
                    {product.comingSoon ? (
                      <div className="rail-coming-soon brochure-coming-soon">
                        <span className="rail-coming-soon-dot" />
                        Coming Soon
                      </div>
                    ) : product.sub ? (
                      <div className="brochure-sub">{product.sub}</div>
                    ) : null}
                    {product.highlights && product.highlights.length > 0 && (
                      <ul className="brochure-highlights">
                        {product.highlights.map((h, i) => {
                          const sepIdx = h.indexOf(" — ");
                          const name = sepIdx >= 0 ? h.slice(0, sepIdx) : h;
                          const body = sepIdx >= 0 ? h.slice(sepIdx + 3) : "";
                          return (
                            <li key={i}>
                              <strong className="brochure-highlight-name">
                                {name}
                              </strong>
                              {body && (
                                <span className="brochure-highlight-body">
                                  : {body}
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </section>

              {/* Section 2: Components & Specification (brochure-style cards
                  on top, aggregated spec table below). */}
              {product.components && product.components.length > 0 && (
                <section className="panel-section">
                  <div className="panel-section-head">
                    <span className="panel-section-num">02</span>
                    <h3 className="panel-h3">
                      {product.slug === "tracloser-retractable"
                        ? "Configuration"
                        : lang === "ko"
                          ? "구성품 & 사양"
                          : "Components & Specification"}
                    </h3>
                  </div>

                  {/* Group consecutive components into cards via combineWithPrev,
                      so Driver Unit + Controller render inside a single card while
                      each gripper gets its own. Spec block sits at the bottom of
                      the card and uses one unified table style. */}
                  <div className="components-brochure-list">
                    {(() => {
                      const cards: (typeof product.components)[] = [];
                      product.components!.forEach((c) => {
                        if (c.combineWithPrev && cards.length > 0) {
                          cards[cards.length - 1].push(c);
                        } else {
                          cards.push([c]);
                        }
                      });
                      return cards.map((items) => {
                        return (
                          <div
                            key={items.map((c) => c.id).join("+")}
                            className="component-brochure-card"
                          >
                            {items.map((c) => {
                              const cells: { label: string; value: string }[] = [];
                              if (c.specsGrouped) {
                                c.specsGrouped.groups.forEach((g) => {
                                  g.columns.forEach((col) => {
                                    cells.push({ label: col.k, value: col.v });
                                  });
                                });
                              } else if (c.specs) {
                                c.specs
                                  .filter(
                                    (s) =>
                                      !/^(Articulation|Grip Range|Anatomical Sites|Use)$/i.test(
                                        s.k
                                      )
                                  )
                                  .forEach((s) =>
                                    cells.push({ label: s.k, value: s.v })
                                  );
                              }
                              if (c.specsCompare) {
                                c.specsCompare.columns.forEach((col, i) => {
                                  c.specsCompare!.rows.forEach((row) => {
                                    cells.push({
                                      label: `${col} · ${row.k}`,
                                      value: row.v[i],
                                    });
                                  });
                                });
                              }
                              return (
                                <div
                                  key={c.id}
                                  className="component-brochure-section"
                                  data-component-id={c.id}
                                >
                                  <div className="component-brochure-section-head">
                                    <h3 className="component-brochure-section-name">
                                      {c.name}
                                    </h3>
                                    {c.tagline && (
                                      <p className="component-brochure-tagline">
                                        {c.tagline}
                                      </p>
                                    )}
                                  </div>
                                  <div className="component-brochure-row">
                                    <div className="component-brochure-media">
                                      {c.images && c.images.length > 0 ? (
                                        <div className="component-brochure-image-row">
                                          {c.images.map((img, i) => (
                                            <figure
                                              key={i}
                                              className="component-brochure-image-figure"
                                            >
                                              <div className="component-brochure-image-box">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                  src={img.src}
                                                  alt={img.label}
                                                  className="component-brochure-image"
                                                  data-component-id={c.id}
                                                />
                                              </div>
                                              <figcaption className="component-brochure-image-label">
                                                {img.label}
                                              </figcaption>
                                            </figure>
                                          ))}
                                        </div>
                                      ) : c.image ? (
                                        <div className="component-brochure-image-box">
                                          {/* eslint-disable-next-line @next/next/no-img-element */}
                                          <img
                                            src={c.image}
                                            alt={c.name}
                                            className="component-brochure-image"
                                            data-component-id={c.id}
                                          />
                                        </div>
                                      ) : (
                                        <div className="component-brochure-image-box placeholder-media">
                                          <span className="ph-label">[ {c.name} ]</span>
                                        </div>
                                      )}
                                      {c.diagrams && c.diagrams.length > 0 && (
                                        <div
                                          className="component-brochure-diagrams"
                                          data-count={c.diagrams.length}
                                        >
                                          {c.diagrams.map((d, i) => (
                                            <figure
                                              key={i}
                                              className="component-brochure-diagram"
                                            >
                                              <button
                                                type="button"
                                                className={`component-brochure-diagram-box${
                                                  zoomedImage?.src === d.src ? " is-zoomed-source" : ""
                                                }`}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  if (zoomedImage?.src === d.src) {
                                                    setZoomedImage(null);
                                                  } else {
                                                    const r = e.currentTarget.getBoundingClientRect();
                                                    const SCALE = 2.5;
                                                    const MARGIN = 24;
                                                    const sW = r.width * SCALE;
                                                    const sH = r.height * SCALE;
                                                    // Bounds of the scaled box (transform-origin: center)
                                                    const sLeft = r.left - (sW - r.width) / 2;
                                                    const sTop = r.top - (sH - r.height) / 2;
                                                    let shiftX = 0;
                                                    let shiftY = 0;
                                                    const vw = window.innerWidth;
                                                    const vh = window.innerHeight;
                                                    if (sLeft < MARGIN) shiftX = MARGIN - sLeft;
                                                    else if (sLeft + sW > vw - MARGIN)
                                                      shiftX = vw - MARGIN - (sLeft + sW);
                                                    if (sTop < MARGIN) shiftY = MARGIN - sTop;
                                                    else if (sTop + sH > vh - MARGIN)
                                                      shiftY = vh - MARGIN - (sTop + sH);
                                                    setZoomedImage({
                                                      src: d.src,
                                                      label: d.label,
                                                      rect: {
                                                        top: r.top,
                                                        left: r.left,
                                                        width: r.width,
                                                        height: r.height,
                                                      },
                                                      shift: { x: shiftX, y: shiftY },
                                                    });
                                                  }
                                                }}
                                                aria-label={`Zoom ${d.label}`}
                                                aria-pressed={zoomedImage?.src === d.src}
                                              >
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                  src={d.src}
                                                  alt={d.label}
                                                  className="component-brochure-diagram-image"
                                                />
                                              </button>
                                              <figcaption className="component-brochure-diagram-label">
                                                {d.label}
                                              </figcaption>
                                            </figure>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    {cells.length > 0 ? (
                                      <div className="component-brochure-spec-col">
                                        <div className="component-brochure-spec-title">
                                          {lang === "ko" ? "사양" : "Specification"}
                                        </div>
                                        <div className="spec-strip">
                                          {cells.map((cell) => (
                                            <div
                                              key={cell.label}
                                              className="spec-strip-cell"
                                            >
                                              <div className="spec-strip-cell-label">
                                                {cell.label}
                                              </div>
                                              <div className="spec-strip-cell-value">
                                                {cell.value}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (c.description || (c.bullets && c.bullets.length > 0)) ? (
                                      <div className="component-brochure-spec-col component-brochure-info-col">
                                        {c.description && (
                                          <p className="component-brochure-description">
                                            {c.description}
                                          </p>
                                        )}
                                        {c.bullets && c.bullets.length > 0 && (
                                          <ul className="component-brochure-bullets">
                                            {c.bullets.map((b, i) => (
                                              <li key={i}>{b}</li>
                                            ))}
                                          </ul>
                                        )}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      });
                    })()}
                  </div>
                </section>
              )}

              {/* Section 3: Clinical Data — summary + paper list */}
              <section className="panel-section">
                <div className="panel-section-head">
                  <span className="panel-section-num">03</span>
                  <h3 className="panel-h3">{t("panel.clinical")}</h3>
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
                        <div className="paper-detail-label">Result Data</div>
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
                                            <span
                                              className={`paper-type${
                                                /case report|first-in-human|clinical/i.test(p.type)
                                                  ? " is-human"
                                                  : ""
                                              }`}
                                            >
                                              {p.type}
                                            </span>
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
                                      {p.keyClaims && p.keyClaims.length > 0 && (
                                        <div className="paper-detail-section">
                                          <div className="paper-detail-label">
                                            Key Findings
                                          </div>
                                          <ul className="paper-claims">
                                            {p.keyClaims.map((c, i) => (
                                              <li key={i}>{c}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      <div className="paper-detail-section">
                                        <div className="paper-detail-label">
                                          {t("paper.abstract")}
                                        </div>
                                        <p className="paper-abstract">{p.abstract}</p>
                                      </div>
                                      {renderClinical(p.clinical)}
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
      {portalReady && zoomedImage &&
        createPortal(
          <div className="image-zoom-portal">
            <div
              className="image-zoom-backdrop"
              onClick={() => setZoomedImage(null)}
              aria-hidden="true"
            />
            <div
              className="image-zoom-floating"
              style={{
                top: zoomedImage.rect.top,
                left: zoomedImage.rect.left,
                width: zoomedImage.rect.width,
                height: zoomedImage.rect.height,
                ["--zoom-tx" as string]: `${zoomedImage.shift.x}px`,
                ["--zoom-ty" as string]: `${zoomedImage.shift.y}px`,
              }}
              onClick={() => setZoomedImage(null)}
              role="dialog"
              aria-label={zoomedImage.label}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={zoomedImage.src}
                alt={zoomedImage.label}
                className="image-zoom-floating-image"
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
