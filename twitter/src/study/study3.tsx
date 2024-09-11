export default function Study3() {
  return;
}

/**
 * 해시태그 검색하기 기능 구현
 * 
 * array-contains-any 연산자 사용하기 (지정된 필드 즉, 해시태그라는 배열에서 특정 해시태그가 포함되어 있는지 안되어있는지 확인할 수 있도록 도와주는 연산자임)
 * https://firebase.google.com/docs/firestore/query-data/queries?hl=ko#in_and_array-contains-any
 * 
 * ex) 쿼리 사용해야함  => search page
import { query, where } from "firebase/firestore";  

const q = query(citiesRef, 
  where('regions', 'array-contains-any', ['west_coast', 'east_coast']));
 */

/**
 * 이미지 업로드 구현
 *
 * Firebase Storage란?
 * - 클라우드 스토리지를 활용해 사용자가 업로드한 미디어 파일 (이미지, 비디오, 음악 등)을 보관하고 관리할 수 있는 서비스
 *
 * - 확장성이 좋음: Google Cloud Storage 인프라 기반으로 작동. 필요한만큼 자동으로 확장되어 어떤 규모의 앱이든 쉽게 대응가능 & 빠른 액세스 제공
 * - 인증 및 보안: Firebase Authentication과 연동하여 파일에 대한 접근 권한 설정 가능
 * - 다양한 파일 형식 지원: 이미지, 비디오, 음악, 문서 등 다양한 형식 지원
 * - 편리한 이미지 조작: Firebase Storage로 업로드된 이미지를 리사이징 하거나, 필터를 적용하는 등의 작업을 쉽게 수행 가능
 *
 *
 *
 * 사용법
 * 1) 시작하기
 * - https://firebase.google.com/docs/storage?hl=ko 설정세팅
 * - 앱에 버킷 URL 추가
 *
 * 2) 참조 만들기
 * - 파일 업로드, 다운로드 ,삭제, 업데이트를 수행하려면 작업할 파일을 가리키는 참조를 생성해야함 (참조 == 클라우드 파일을 가리키는 포인터)
 * - 참조 만들기: getStorage()를 사용하여 스토리지 서비스의 인스턴스를 가져온 후, ref()를 호출 (해당 참조는 Cloud Storage 버킷의 루트를 가리킴)
 *
 * 3) 파일 업로드
 * - 우선 파일 이름을 포함하여 파일의 전체 경로를 가리키는 참조를 생성해야함
 * - Blob 또는 File에서 업로드, 바이트 배열에서 업로드, 문자열에서 업로드 방식이 있음
 * (문자열에서 업로드: uploadString() 메서드를 사용하여 원시 문자열, base64, base64url 또는 data_url로 인코딩된 문자열을 Cloud Storage에 업로드)
 *
 * 4) 파일 다운로드
 * - 우선 다운로드할 파일의 Cloud Storage 참조 생성
 * - getDownloadUrl() 메서드를 호출해 파일의 다운로드 URL를 가져옴
 * (혹은 이미지를 직접 다운받는 함수를 호출할 수도 있음: getBlob, getBytes, getStream(SDK 9.5 이상) )
 *
 * 5) 파일 삭제
 * - 삭제할 파일을 가르키는 참조 생성
 * - deleteObject() 메서드를 호출해 파일 삭제
 * (정상적으로 처리되면 Promise가 반환되고 Promise가 거부되면 오류가 반환)
 * 
 * 6) 파일 보안
 * - Firebase Authentication과 마찬가지로, 보안 규칙을 생성할 수 있음
 * - https://firebase.google.com/docs/storage/security 에서 더욱 다양한 규칙 확인가능
 */
