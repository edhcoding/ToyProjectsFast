export default function Study() {
  return <div>Study</div>;
}

/**
 * Firebase
 * - 실시간 데이터베이스, 인증, 스토리지, 분석 등 다양한 기능을 제공하는 모바일 및 웹 앱 개발 플랫폼
 * - 2011년 스타트업에서 시작(실시간 채팅 기능) >> 2014년 구글이 인수 (백엔드 서버리스)
 * - 백엔드 서버 구축하고 관리 X. Google Cloud Platform을 이용해 빠르고 효율적인 개발
 * - 특히 실시간 기능 서비스, 클라이언트 사이드 집중, 초기 프로토타입 개발에 유용
 */

/**
 * 이번 프로젝트에서 사용 할 Firebase 주요기능
 * Authentication, Firestore, Storage, Hosting
 * Authentication: 간편한 다중 플렛폼 로그인
 * - 이메인 인증, 소셜 미디어 계정 인증, 전화번호 인증방식 제공
 * - 보안 강화, 사용자 인증 과정 안전하게 처리
 * Firestore: No SQL 데이터베이스
 * - Firebase에서 제공하는 No SQL 형식의 클라우드 데이터베이스
 * - 실시간 데이터 동기화 지원 (ex) 실시간 채팅)
 * Storage: 사진 및 동영상 저장
 * - 사용자 파일 저장 및 공유, 강력한 보안
 * Hosting: 웹앱 호스팅
 * - 정적 및 동적 콘텐츠 모두 호스팅 가능, 웹 앱 간단 배포
 */

/**
 * Firebase 장, 단점
 * 장점
 * - 백엔드 서버 없이 개발: 개발 시간 절약, 클라이언트에 집중해서 개발 가능
 * - 실시간 데이터베이스: 사용장 데이터 실시간 고융, 실시간 채팅 등의 기능 쉽게 개발
 * - Google 플랫폼 통합: Google Cloud Platform 서비스 쉽게 이용 및 분석 가능
 * 단점
 * - 쿼리 제한: No SQL 데이터 베이스의 간단한 쿼리만 사용 가능
 * - 비용: 확장성이 중요한 경우 비용이 빠르게 증가할 수 있음
 * - 마이그레이션 어려움: 타 백엔드 서비스로 전환하는 경우 추가적인 작업 필요
 *
 * 요금 (무료, 유료 다 있음)
 * - https://firebase.google.com/pricing?hl=ko
 * - 무료 요금제에서도 일정량 이상 사용한다면 추가 요금 나오기는 함 주의!
 */

/**
 * Firebase Auth란?
 * Firebase Authentication: 쉽게 사용자 인증을 구현할 수 있도록 돕는 Firebase 서비스
 * - 이메일과 비밀번호 인증, 소셜 미디어 인증, 전화번호 인증
 * - 인증 정보 안전하게 저장
 * - 인증 정보 변경시 실시간으로 앱에 업데이트
 * - 인증 이메일 전송, 비밀번호 재설정 이메일 전송 등의 기능
 *
 * 장점
 * 편의성
 * - 복잡한 인증 과정을 Firebase가 대신 처리
 * - 클라이언트 사이드 개발에만 집중
 * 소셜 미디어 계정 인증
 * - OAuth 2.0과 Open ID Connect 지원
 * - 각종 소셜 미디어 계정 이용한 인증 쉽게 구현
 * 보안
 * - 사용자의 비밀번호 안전하게 암호화
 * - HTTPS 이용해 데이터 전송 보안
 *
 * 언제 사용 해야할까?
 * - 로그인 시스템, 사용자 프로필 시스템
 *
 * 대략적인 사용법
 * 1. Firebase 프로젝트 생성 & Firebase SDK 앱 추가
 * 2. Firebase 초기화
 * 3. Authentication 서비스 불러오기
 * - firebase/auth 에서 getAuth, signInWithEmailAndPassword 등 이미 구현되어 있는 함수 불러와 사용
 */

/**
 * 사용법
 * 홈페이지 => authentication => 로그인 방법 탭 => 이메일/비밀번호 => 저장 // 이제부터는 사용자 탭에 하나씩 데이터가 쌓일거임
 * 템플릿 탭 => 이메일 보낸다 하면 이메일 템플릿 수정가능, 비밀번호 재설정, 이메일 주소 변경 여러가지 설정 가능
 * 사용량 탭 => 일일 활성 사용자 수 등등
 * 설정 탭 => 승인된 도메인(보안과 관련된 작업)
 *
 *
 * https://firebase.google.com/docs/auth?hl=ko
 * 위 페이지에서 웹 => 사용자 관리
 * 첫 줄 보면 신규 사용자를 생성할 때는 createUserWithEmailAndPassword 메서드
 * 중요한 부분은 현재 로그인한 사용자 가져오기 코드
 */

/**
 * onAuthStateChanged 개념
 * - Firebase Authentication 서비스에서 제공하는 메서드
 * - 인증 상태가 변경될 때마다 호출되는 리스너 설정 (로그인, 로그아웃) => 사용자가 로그인 or 로그아웃 할 때 마다 실시간으로 호출 됨
 *
 * 사용자 객체를 인수로 받는 콜백 함수 등록
 * - 사용자의 로그인 상태 확인 후 적절한 작업 수행
 * - 로그인 상태일 때는 사용자의 정보를, 아니라면 null을 리턴함
 *
 * 예시
 * import { getAuth, onAuthStateChanged } from "firebase/auth";
 *
 * useEffect(()=>{
 *  onAuthStateChanged(auth, (user) => {
 *    if (user) {
 *      console.log("사용자가 로그인한 상태입니다.")
 *    } else {
 *      console.log("사용자가 로그아웃한 상태입니다.")
 *    }
 *    setInt(true);
 *  });
 * },[auth]);
 * 코드설명 - 사용자가 로그인 하거나 로그아웃 할 때 콘솔에 사용자의 상태 출력
 * onAuthStateChanged를 사용해 사용자의 로그인 상태를 실시간으로 파악하고, 원하는 특정 작업을 수행할 수 있음
 * https://firebase.google.com/docs/auth/web/manage-users?hl=ko&_gl=1*14c49fg*_up*MQ..*_ga*MzIxODU3ODUwLjE3MjIxODI2OTE.*_ga_CW55HF8NVT*MTcyMjE4MjY5MS4xLjAuMTcyMjE4MjkxNC4wLjAuMA..
 */
