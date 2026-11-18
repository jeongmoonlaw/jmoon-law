# 법률사무소 정문 홈페이지

## 사용자
이 저장소를 관리하는 사람은 개발자가 아닌 법률사무소 대표님이다.
- 쉬운 한국어로 설명하고, 코드 용어는 최소한으로 쓴다.
- 수정 전에 "무엇을 어떻게 바꿀지"를 한두 줄로 먼저 확인받는다.
- 수정 후에는 화면에서 무엇이 달라지는지 알려준다.

## 배포
- `main` 브랜치에 반영되면 Vercel이 자동 배포한다(1~2분). 서버 작업 없음.
- 반영 전 `npm run build`로 빌드가 깨지지 않는지 확인한다.
- Node 22 (`package.json` engines). Next.js 12 / React 17, pages 라우터.

## 구조
메인 페이지 하나짜리 사이트. `pages/index.jsx`가 아래 섹션을 순서대로 배치한다.

| 섹션 | 파일 | 내용 |
|---|---|---|
| 상단 메뉴 | `components/layout/Header.jsx` | |
| 첫 화면 | `components/main/MainKeyVisual.jsx` | 대표 문구 |
| 변호사 소개 | `components/main/MainProfile.jsx` | |
| 업무 분야 | `components/main/MainPractices.jsx` | 이미지는 `public/images/practices_*.jpg` |
| NEWS | `components/main/MainNews.jsx` | 네이버 블로그 자동 연동 (아래 참고) |
| 주요 사례 | `components/main/MainDealsAndCases.jsx` | |
| 오시는 길 | `components/main/MainLocation.jsx`, `MainMap.jsx` | 주소·연락처, 카카오맵 |
| 하단 | `components/layout/Footer.jsx` | |

- 사이트 제목·검색/공유 설명(meta, og): `pages/_document.jsx`
- 이미지: `public/images/` 에 넣고 `/images/파일명` 으로 참조

## 주의사항
- **NEWS는 손으로 수정하지 않는다.** `lib/naverBlog.js`가 네이버 블로그(jmoonlaw) RSS를 읽어 최대 10분마다 자동 갱신한다(ISR, `revalidate: 600`). 소식을 바꾸려면 블로그에 글을 쓰면 된다. 예전 하드코딩 뉴스는 `MainNewsLegacy.jsx`, `SHOW_LEGACY_NEWS` 플래그로 꺼져 있다.
- **Tailwind는 빌드되지 않는다.** `public/css/tailwind-built.css`는 미리 만들어진 파일이고 tailwind 설정이 없다. 이 파일에 없는 클래스를 새로 쓰면 적용되지 않으므로, 기존 클래스를 재사용하거나 styled-components / scss(`styles/`)를 쓴다.
- 카카오맵 키는 `pages/_app.jsx`에 있다. 도메인이 바뀌면 카카오 개발자 콘솔 → 플랫폼 → Web에 등록해야 지도가 뜬다.
- `Dockerfile`, `.ebextentions/`, `public/.well-known/`(예전 SSL 인증용), `npm run zip`, `npm start`(포트 8080)는 예전 AWS 배포용이다. 지금은 쓰지 않으니 건드리지 않는다.
- `public/naver*.html`은 네이버 서치어드바이저 소유 확인 파일이다. 삭제하지 않는다.
- `pages/admin`은 빈 페이지다.
