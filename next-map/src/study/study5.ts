/**
 * Next-auth란? (https://next-auth.js.org/)
 * - Next-auth: Next.js 애플리케이션에서 간단하고 확장 가능한 사용자 인증을 구현하기 위한 라이브러리
 * * 여러 인증 공급자 (Googel, Facebook, GitHub 등)와 함께 작동
 * * 세션 기반 및 JWT (JSON Web Tokens) 기반의 인증을 지원
 * - 다양한 인증 공급자를 통한 손쉬운 로그인 (Googel, Facebook, GitHub, 이메일 및 기타)
 * - 세션과 JWT를 사용한 사용자 인증 관리
 * - 사용자 데이터베이스 통합 및 사용자 정의 프로필 필드 관리
 * - 보안적으로 안전한 사용자 인증을 위한 설정 및 옵션
 *
 *
 * 코드예시 (auth1 사진)
 *
 *
 *
 *
 * Next-auth 장점
 * - 간단한 설정: 직접 구현하는 것에 비해 인증 설정이 매우 간단
 * - 다양한 인증 공급자: Google, Facebook,Apple, Naver, Kakao 등 수십개의 인증 공급자 통합 가능
 * - 안전한 보안: 보안 관련 작업 (세션 관리, JWT 생성, CSRF 방어 등) 자동 처리
 * - 확장성: 사용자 데이터베이스와의 통합을 지원
 * - Next.js Next js SSR(Server Side Rendering) # CSR(Client Side Rendering)에서 원활하게 작동
 *
 *
 *
 *
 * Next-auth 사용자 인증 방식 (+ callback) (auth2 사진)
 * - NextAuth.js는 주로 세션과 JWT를 함께 사용해서 인증 작업 진행(개발자는 프로젝트 요구 상항에 따라 적절한 방식을 선택할 수 있음)
 * - 또한, NextAuth.js는 다양한 콜백 함수를 사용해서 사용자 인증 및 세션 관리 조정 가능
 *
 *
 *
 *
 * JWT 와 Session 방식이란?
 * - JWT (JSON Web Tokens)와 세션은 사용자 인증 및 권한 부여에 사용되는 두 가지 주요 방식
 * - JWT: Json Web Token의 약자로, Json 포맷을 이용해 인증에 필요한 정보를 암호화 한 웹 토큰
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey
 * JzdWIiOiIxMjMONTY30DkwIiwibmFtZSI6Ikpva
 * G4gRG91TiwiaWF0IjoxNTE2MjM5MDIyfQ.Sf1Kx
 * wRJSMeKKF2QT4fwMeJf36P0k6yJV_adQssw5c
 * - 세션(Session): 웹 애플리케이션에서 사용자의 상태 정보를 저장하고 관리하기 위한 방식 중 하나
 * (세션은 사용자가 웹 서비스와 상호작용할 때 생성되며, 사용자의 상태 정보를 서버 측에 저장)
 *
 *
 *
 * JWT VS Session 차이 (auth3 사진)
 *
 *
 *
 *
 * Nexxt-auth & Prisma 같이 사용하기 (auth4 사진)
 * - https://authjs.dev/reference/adapter/prisma
 * - Prisma Adapter를 사용해, Next-auth로 회원가입을 하면 유저 정보를 prisma로 저장
 */

/**
 * Next-auth 세팅
 * - https://next-auth.js.org/getting-started/example
 * 1. NextAuth 설치
 * - yarn add next-auth
 * 2. .env 파일에 NEXTAUTH_URL 환경변수 추가
 * - NEXTAUTH_URL=http://localhost:3000
 * 3. API Route 추가
 * - pages/api/auth 경로에 [...nextauth].js 파일 생성
 * - 파일 내부에 원하는 인증 공급자 및 옵션 설정
 * 4. pages/api/auth/[...nextauth].js 코드 예시
 * ex)
 * export const authOptions = {
 *  providers: [
 *    GithubProvider({
 *      clientId: process.env.GITHUB_ID,
 *      clientSecret: process.env.GITHUB_SECRET,
 *    })
 *  ]
 * }
 * export default NextAuth(authOptions)
 *
 * 5. _app.js 파일에 Session Provider 설정
 * <SessionProvider session={session}>
 *  <Component {...pageProps} />
 * </SessionProvider>
 *
 * 6. useSession() 및 인증 훅으로 사용자 관리
 *
 *
 *
 * Prisma Adapter 세팅 (auth5 사진) (auth6 사진)
 * - yarn add @auth/prisma-adapter
 * - prisma.schema 파일에 스키마를 정의해주고, migrate 하기 (npx prisma format, npx prisma migrate dev)
 * 전체 schema 참고: https://authjs.dev/reference/adapter/prisma (제일 아래거 복붙하고 User는 아래 4개를 기존거에 붙여넣고 map부분은 전부 다 삭제)
 *
 *
 *
 * Middleware 세팅 (https://next-auth.js.org/configuration/nextjs#middleware) (auth7 사진)
 * - 특정 경로에서 항상 로그인을 해야하는 경우, middleware를 통해 보안을 걸 수 있음
 * - .env 파일에 NEXTAUTH_SECRET 생성 후, 반드시 로그인이 필요한 페이지 경로를 Middleware를 통해 정의 (위치는 /src/middleware.ts)
 * ex)
 * // middleware.ts
 * export { default } from "next-auth/middleware";
 *
 * export const config = {
 *    matcher: ["/users/mypage", "/stores/new", "/stores/:id/edit"]
 * };
 *
 *
 *
 * NEXTAUTH_SECRET 생성방법
 * 터미널에
 * - openssl rand -base64 24
 */

/**
 * Google Login
 * Next-auth 세팅 (Google: https://next-auth.js.org/providers/google) (auth8 사진)
 * 1. https://console.developers.google.com/apis/credentials 에서 API 및 서비스 > 사용자 인증 정보 > API 키 생성
 * - 생성된 클라이언트 ID와 보안 비밀번호 환경변수에 추가 (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
 * - 승인된 리디렉션 URL에 http://localhost:3000/api/auth/callback/google 추가
 * 2. [...nextauth].js 파일에 다음 코드 추가: - 사진
 *
 *
 *
 *
 * Naver Login
 * Next-auth 세팅 (Naver: https://next-auth.js.org/providers/naver)
 * 1. https://developers.naver.com/main/ 네이버 디벨로퍼 가입 후, 네이버 로그인 클릭
 * - 오픈 API 이용 신청 > 서비스 URL에 로컬 호스트 추가
 * - 네아로 Callback URL에 http://localhost:3000/api/auth/callback/naver 추가
 * - 애플리케이션 정보의 클라이언트 아이디 및 시크릿 키 저장 (NAVER_CLIENT_ID, NAVER_CLIENT_SECRET)
 * 2. [...nextauth].js 파일에 코드 추가
 *
 *
 *
 *
 *
 * Prisma Schema 수정 (naver1 사진)
 * - 네이버는 name 값이 필수로 오지 않기 때문에, name 값을 optional로 변경 (물음표)
 *
 *
 *
 *
 * Kakao Login 구현
 * Next-auth 세팅 (kakao: https://next-auth.js.org/providers/kakao)
 * 1. https://developers.kakao.com/ 카카오 디벨로퍼 가입 후 , 앱 등록 > 동의 항목 설정
 * - 내 앱 > 앱 설정 > 앱 키 > REST API 키 복사 (KAKAO_CLIENT_ID)
 * - 내 앱 > 제품 설정 > 카카오 로그인 > 보안에서 Client Secret 코드 발급 (KAKAO_CLIENT_SECRET)
 * - 내 앱 > 제품 설정 > 카카오 로그인 > 활성화
 * - 내 앱 > 제품 설정 > 카카오 로그인 > 동의 항목 구성 (닉네임- 필수, 프로필, 이메일)
 * - 내 앱 > 제품 설정 > 카카오 로그인 > Redirect URI > http://localhost:3000/api/auth/callback/kakao
 * - 애플리케이션 정보의 클라이언트 아이디 및 시크릿 키 저장
 * 2. [...nextauth].js 파일에 코드 추가
 * 3. Prisma Schema 변경: refresh_token_expires_in (Int) optional 필드 추가 (kakao1 사진)
 *
 *
 *
 *
 *
 *
 * 로그인시 callbackUrl 속성 추가
 * - 로그인 후, 로그인 화면으로 돌아오지 않고 루트 페이지로 가도록 callbackUrl 속성 추가
 * - Next Auth 공식 도큐: https://next-auth.js.org/getting-started/client#signin
 * ex)
 * signIn("google", { callbackUrl: "http://localhost:3000/bar"})
 */

/**
 * 상세페이지 레이아웃 (상세1 사진)
 */

/**
 * Recoil 이란?
 * - React 애플리케이션 상태 관리를 위한 라이브러리
 * - Facebook (메타)에서 개발한 상태 관리 라이브러리로, Atom 이라는 단위로 상태를 정의하고 이를 이용 해 컴포넌트 사이에서 데이터를 공유하며 상태를 업데이트함
 *
 *
 * 왜 하필 Recoil를 사용하는가?
 * - 간편한 상태관리: 간편하게 상태를 정의하고 관리할 수 있음
 * - 최적화된 리렌더링: 내부적으로 최적화되어 필요한 경우에만 리렌더링
 * - 복잡한 애플리케이션에 적합: 복잡한 상태 관리를 효과적으로 다루는데 적합함
 *
 *
 * !!!!!!!!!!!!!!!!!(recoil 1~7 사진)
 */

/**
 * https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
 * - 이 페이지를 보면 prisma랑 next.js를 같이 사용해서 dev 모드를 사용하면 warn(prisma-client) There are already 10 instances of Prisma Client actively running.
 * 이 와 같은 warning이 나온다. next dev 모드는 node.js 캐쉬를 없애기 때문에 매번 PrismaClient를 새로 생성해서 성능 문제를 일으키므로 
 * import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

이와 같은 방식으로 해결해줘야합니다
 */