"use client";

import { useState } from "react";
import { PRODUCTS, TR, type Lang, type VideoItem } from "@/lib/products";

export default function LayoutThree({
  lang,
}: {
  lang: Lang;
  onVideoClick?: (v: VideoItem) => void;
}) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);

  const t = (k: string) => TR[lang][k] ?? k;
  const selected = selectedIdx !== null ? PRODUCTS[selectedIdx] : null;

  const handleSelectProduct = (i: number) => {
    setSelectedIdx(i);
    // Auto-pick first related video as the currently playing one
    setPlayingVideo(PRODUCTS[i].videos[0] ?? null);
  };
  const handleClose = () => {
    setSelectedIdx(null);
    setPlayingVideo(null);
  };

  // Gap between cells (px)
  const GAP = 16;
  const half = GAP / 2;

  // Compute position styles for each cell
  const cellStyle = (i: number): React.CSSProperties => {
    if (selectedIdx === null) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      return {
        top: row === 0 ? "0" : `calc(50% + ${half}px)`,
        left: col === 0 ? "0" : `calc(50% + ${half}px)`,
        width: `calc(50% - ${half}px)`,
        height: `calc(50% - ${half}px)`,
      };
    }
    if (i === selectedIdx) {
      return {
        top: "0",
        left: "0",
        width: `calc(60% - ${half}px)`,
        height: `calc(74% - ${half}px)`,
      };
    }
    // Bottom strip: 3 cells with gaps between
    const order = [0, 1, 2, 3].filter((x) => x !== selectedIdx).indexOf(i);
    const cellW = `((100% - ${2 * GAP}px) / 3)`;
    return {
      top: `calc(74% + ${half}px)`,
      left: `calc(${order} * (${cellW} + ${GAP}px))`,
      width: `calc(${cellW})`,
      height: `calc(26% - ${half}px)`,
    };
  };

  const detailStyle: React.CSSProperties =
    selectedIdx === null
      ? { top: "0", left: "100%", width: "0%", height: "74%", opacity: 0 }
      : {
          top: "0",
          left: `calc(60% + ${half}px)`,
          width: `calc(40% - ${half}px)`,
          height: `calc(74% - ${half}px)`,
          opacity: 1,
        };

  return (
    <div className={`quad ${selectedIdx !== null ? "active" : ""}`}>
      {PRODUCTS.map((p, i) => (
        <button
          key={p.id}
          className={`quad-cell ${selectedIdx === i ? "selected" : ""} ${
            selectedIdx !== null && selectedIdx !== i ? "minor" : ""
          }`}
          style={cellStyle(i)}
          onClick={() => handleSelectProduct(i)}
        >
          {selectedIdx === i && playingVideo ? (
            playingVideo.src ? (
              <video
                key={playingVideo.id}
                src={playingVideo.src}
                autoPlay
                controls
                className="quad-media-video"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div className="quad-media placeholder-media quad-media-playing">
                <span className="ph-label">
                  ▶ Playing: {playingVideo.title}
                </span>
              </div>
            )
          ) : (
            <div className="quad-media placeholder-media">
              <span className="ph-label">▶ [ {p.name} — Video Loop ]</span>
            </div>
          )}
          <div className="quad-label">
            <div className="quad-cat">{p.category}</div>
            <div className="quad-name">{p.name}</div>
          </div>
          {selectedIdx === null && (
            <div className="quad-hint">
              {lang === "ko" ? "터치" : "TAP"}
            </div>
          )}
        </button>
      ))}

      {/* Detail panel appears on right when selected */}
      <div className="quad-detail" style={detailStyle} aria-hidden={selected === null}>
        {selected && (
          <>
            <div className="quad-detail-header">
              <div>
                <div className="panel-cat">{selected.category}</div>
                <h2 className="panel-title">{selected.name}</h2>
              </div>
              <button
                className="quad-back"
                onClick={handleClose}
                aria-label="Back to grid"
              >
                ✕
              </button>
            </div>

            <div className="quad-detail-body">
              <p className="quad-desc">{selected.desc[lang]}</p>

              <div className="quad-section-title">{t("panel.specs")}</div>
              <div className="quad-specs">
                {selected.specs.map((s) => (
                  <div key={s.k} className="quad-spec">
                    <div className="quad-spec-val">{s.v}</div>
                    <div className="quad-spec-key">{s.k}</div>
                  </div>
                ))}
              </div>

              <div className="quad-section-title">{t("panel.clinical")}</div>
              <div className="quad-clinical">
                <div className="quad-clin">
                  <div className="quad-clin-num">{selected.clinical.cases}</div>
                  <div className="quad-clin-lbl">{t("clin.cases")}</div>
                </div>
                <div className="quad-clin">
                  <div className="quad-clin-num">{selected.clinical.success}</div>
                  <div className="quad-clin-lbl">{t("clin.success")}</div>
                </div>
                <div className="quad-clin">
                  <div className="quad-clin-num">{selected.clinical.time}</div>
                  <div className="quad-clin-lbl">{t("clin.time")}</div>
                </div>
                <div className="quad-clin">
                  <div className="quad-clin-num">{selected.clinical.hospitals}</div>
                  <div className="quad-clin-lbl">{t("clin.hospitals")}</div>
                </div>
              </div>

              <div className="quad-section-title">{t("panel.videos")}</div>
              <div className="quad-videos">
                {selected.videos.map((v) => {
                  const isPlaying = playingVideo?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      className={`video-thumb-btn ${isPlaying ? "playing" : ""}`}
                      onClick={() => setPlayingVideo(v)}
                    >
                      <div className="placeholder-media video-thumb">
                        {isPlaying && (
                          <div className="now-playing-badge">
                            <span className="np-dot" />
                            {lang === "ko" ? "재생 중" : "NOW PLAYING"}
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
                        <div className="video-label">{v.title}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
