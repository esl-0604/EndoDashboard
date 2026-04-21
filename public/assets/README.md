# Assets Folder

실제 제품 자산(이미지/영상) 보관 폴더. Next.js는 `public/` 하위 파일을 루트 URL에서 직접 서빙합니다.

---

## 📥 빠르게 넣는 법

파일명/위치 고민 없이 **`_inbox/`** 에 그냥 드래그해서 넣으세요.
Claude에게 "정리해줘" 하면 파일명/제품 기준으로 알아서 배치합니다.

---

## 📁 최종 폴더 구조 (정리된 상태)

```
public/assets/
├── _inbox/                                  ← 마구잡이로 드롭하는 임시 공간
│
├── slides/                                  홈 중앙 영상 캐러셀
│   ├── slide-1.mp4
│   ├── slide-2.mp4
│   └── ...
│
└── products/
    ├── robopera/
    │   ├── hero.jpg                         브로셔 상단 이미지
    │   ├── thumbnail.jpg                    레일 타일 썸네일
    │   ├── components/
    │   │   ├── driver-unit.jpg
    │   │   ├── basic-gripper-g.jpg
    │   │   └── dual-gripper-g.jpg
    │   └── videos/
    │       ├── overview.mp4
    │       ├── procedure.mp4
    │       └── interview.mp4
    │
    ├── endocubot/
    │   ├── hero.jpg
    │   ├── thumbnail.jpg
    │   └── videos/
    │       ├── overview.mp4
    │       └── demo.mp4
    │
    └── tracloser-retractable/
        ├── hero.jpg
        ├── thumbnail.jpg
        └── videos/
            ├── overview.mp4
            └── demo.mp4
```

## 분류 키워드 (파일명에 포함되면 자동 배치)

| 키워드 | 목적지 |
|---|---|
| `robopera`, `basic-gripper`, `dual-gripper`, `driver-unit` | `products/robopera/` (또는 components/) |
| `endocubot`, `cubot` | `products/endocubot/` |
| `tracloser`, `retractable` | `products/tracloser-retractable/` |
| `slide`, `hero-loop`, `carousel`, `main-video` | `slides/` |
| `thumbnail`, `thumb` | 각 제품의 `thumbnail.{ext}` |
| `hero` (thumbnail 아닌 경우) | 각 제품의 `hero.{ext}` |
| 위 키워드 없는 mp4/jpg | `_inbox/` 유지, 사용자에게 확인 요청 |

## 권장 포맷

- **영상**: `.mp4` (H.264), 1920×1080 또는 3840×2160, < 50MB
- **이미지**: `.jpg` / `.webp`, 히어로 1600×1200+ / 썸네일 500×500+
- **대용량 영상**(>50MB): Git LFS 또는 CDN 고려

## 파일 넣은 후

정리가 끝나면 Claude가 `lib/products.ts` 의 `src` / `thumbnail` / `heroImage` / `components[].image` 필드를 자동으로 경로에 연결합니다.
