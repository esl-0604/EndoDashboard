"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang, VideoItem } from "@/lib/products";
import LayoutOne from "@/components/LayoutOne";
import LayoutTwo from "@/components/LayoutTwo";
import LayoutThree from "@/components/LayoutThree";

const IDLE_DELAY = 90_000;

export default function Home() {
  const [lang, setLang] = useState<Lang>("ko");
  const [layout, setLayout] = useState<1 | 2 | 3>(1);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // Idle reset (reload page to return to defaults)
  const idleRef = useRef<number | null>(null);
  const resetIdle = useCallback(() => {
    if (idleRef.current) window.clearTimeout(idleRef.current);
    idleRef.current = window.setTimeout(() => {
      setActiveVideo(null);
    }, IDLE_DELAY);
  }, []);
  useEffect(() => {
    const handler = () => resetIdle();
    ["click", "touchstart", "mousemove"].forEach((ev) =>
      document.addEventListener(ev, handler, { passive: true })
    );
    resetIdle();
    return () => {
      ["click", "touchstart", "mousemove"].forEach((ev) =>
        document.removeEventListener(ev, handler)
      );
      if (idleRef.current) window.clearTimeout(idleRef.current);
    };
  }, [resetIdle]);

  return (
    <main className="app">
      {/* Layout toggle (top-left) */}
      <div className="layout-toggle">
        <div className="layout-toggle-label">LAYOUT</div>
        <div className="layout-toggle-btns">
          <button
            className={`layout-btn ${layout === 1 ? "active" : ""}`}
            onClick={() => setLayout(1)}
          >
            Option 1
          </button>
          <button
            className={`layout-btn ${layout === 2 ? "active" : ""}`}
            onClick={() => setLayout(2)}
          >
            Option 2
          </button>
          <button
            className={`layout-btn ${layout === 3 ? "active" : ""}`}
            onClick={() => setLayout(3)}
          >
            Option 3
          </button>
        </div>
      </div>

      {/* Language toggle (top-right) */}
      <div className="lang-toggle">
        <button
          className={`lang-btn ${lang === "ko" ? "active" : ""}`}
          onClick={() => setLang("ko")}
        >
          KO
        </button>
        <button
          className={`lang-btn ${lang === "en" ? "active" : ""}`}
          onClick={() => setLang("en")}
        >
          EN
        </button>
      </div>

      {layout === 1 && <LayoutOne lang={lang} onVideoClick={setActiveVideo} />}
      {layout === 2 && <LayoutTwo lang={lang} onVideoClick={setActiveVideo} />}
      {layout === 3 && <LayoutThree lang={lang} onVideoClick={setActiveVideo} />}

      {/* Video modal (shared) */}
      {activeVideo && (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveVideo(null)}
        >
          <div className="video-modal-inner" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <h3>{activeVideo.title}</h3>
              <button
                className="video-modal-close"
                onClick={() => setActiveVideo(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="video-modal-body">
              {activeVideo.src ? (
                <video
                  key={activeVideo.id}
                  src={activeVideo.src}
                  controls
                  autoPlay
                  className="video-player"
                />
              ) : (
                <div className="placeholder-media video-player">
                  <span className="ph-label">
                    ▶ [ {activeVideo.title} — video file will load here ]
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
