"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang, VideoItem } from "@/lib/products";
import LayoutOne from "@/components/LayoutOne";
// Kept for future re-enable: import LayoutTwo from "@/components/LayoutTwo";

const IDLE_DELAY = 90_000;

export default function Home() {
  const lang: Lang = "en";
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
      <LayoutOne lang={lang} onVideoClick={setActiveVideo} />

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
