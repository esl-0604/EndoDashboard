# Assets Folder

실제 이미지/영상 파일을 이 폴더에 넣어주세요. Next.js는 `public/` 하위 파일을 루트 URL에서 직접 서빙합니다.

예: `public/assets/products/robopera/hero.jpg` → `/assets/products/robopera/hero.jpg`

## 폴더 구조

```
public/assets/
├── slides/                    홈 화면 중앙 영상 캐러셀 (자동 재생 루프)
│   ├── slide-1.mp4
│   ├── slide-2.mp4
│   ├── slide-3.mp4
│   └── slide-4.mp4
│
└── products/                  제품별 자산
    ├── robopera/
    │   ├── hero.jpg           제품 상세 상단 브로셔 이미지
    │   ├── thumbnail.jpg      우측 레일 타일 이미지
    │   └── videos/
    │       ├── demo.mp4
    │       ├── procedure.mp4
    │       └── interview.mp4
    ├── rose/
    ├── alligator/
    └── tracloser/
```

## 지원 파일 포맷

### 이미지
- `.jpg`, `.png`, `.webp` 권장 (webp가 용량/품질 모두 최적)
- 해상도 권장:
  - Hero 이미지: 1600×1200 이상 (4K 디스플레이 대응)
  - 썸네일: 500×500 이상 (썸네일 크기 200×180px × 2x retina)

### 영상
- `.mp4` (H.264 코덱) 권장 — 모든 브라우저에서 재생 가능
- 권장 스펙: 1920×1080 (FullHD) 또는 3840×2160 (4K), 30fps
- 용량: 한 영상당 50MB 이하 권장 (키오스크 네트워크 로딩 속도)
- 소리가 필요 없는 루프 영상(홈 슬라이드)은 음성 트랙 제거하면 용량 절반

## 파일 추가 후 코드 연결

파일을 넣은 뒤 `lib/products.ts`에서 각 항목의 `src` 필드에 경로를 지정하세요:

```ts
videos: [
  { id: "r1-demo", title: "Demo Video", src: "/assets/products/robopera/videos/demo.mp4" },
  ...
]
```

슬라이드 영상은 `lib/products.ts`의 `SLIDES` 배열에 추가 필드로 연결 예정
(현재는 더미 구조, 필요 시 확장).

## 배포

로컬에 파일 추가 후 `git add public/assets/ && git commit && git push` 하면 Vercel이
자동으로 재배포합니다. 대용량 영상 (100MB+)은 Git LFS 또는 외부 CDN 사용 권장.
