/**
 * react-hook-form이란?
 * - React-hook-form: 리액트 앱에서 폼 관리를 단순하고 효율적으로 할 수 있도록 도와주는 라이브러리
 * - 리액트의 훅을 사용하여 강력한 폼 처리 기능을 제공하며, 복잡한 폼 로직을 간단하게 구현(공식 문서 참고: https://www.react-hook-form.com/)
 * - 성능 최적화: 렌더링을 최적화 시켜서 성능을 향상시킴. Ex) 폼 필드 변경되면, 변경된 필드만 다시 렌더링
 * - 간편한 상태 관리: 기존 폼 관리에 비해 간단함. 따로 상태 관리 컴포넌트 및 변수 생성 X
 * - 유효성 검사 및 에러 처리: 폼 유효성 검사 및 에러처리를 쉽게 처리할 수 있는 훅 지원 (useForm)
 * - 다양한 입력 유형: 텍스트 입력부터 체크박스, 라디오 버튼, 선택 목록 등 다양한 입력 유형을 지원
 *
 *
 *
 *
 * react-hook-form 예시 (TS) (form1 사진)
 * const { register, handleSybmit, watch, formState: { errors } } = useForm();
 * register - form input을 등록하는 함수로 입력 필드랑 react-hook-form을 연결하는 역할을 함
 * handleSubmit - 폼 제출 이벤트를 처리하는 함수, 입력할 때 유효성 검사를 수행하고 만약에 유효성 검사를 통과가 되었을때 handleSubmit 함수를 실행함
 * watch - 입력필드의 값을 모니터링 하는 함수로 입력 필드의 이름을 전달하면 해당 필드의 현재 값을 확인할 수 있음
 * formState: {errors} - 폼 상태 객체에서 에러속성을 추출해서 유효성 검사 에러 메세지를 저장하는데 사용
 *
 * <input defaultValue="test" {...register("example")}; defaultValue 속성은 초깃값 지정
 * <input {...register("exampleRequired", { required: true })}; required true 속성을 사용해서 필수값을 지정가능함
 * {errors.exampleRequired && <div>this field required</div>} errors에 exampleRequired가 있다면 <div></div>가 나오게함
 * fomt 태그 안에 마지막에는 <input type="submit" /> 을 지정해줘야 form onSubmit={handleSubmit(onSubmit)}이 실행됨
 *
 *
 *
 *
 * react-hook-form 주요기능
 * react-hook-form은 폼을 쉽게 관리할 수 있는 다양한 기능을 지원함
 * - 폼 등록(Form Registering): 각 입력 필드를 등록하고, 해당 필드의 상태와 유효성 검사 규칙을 정의
 * - 값 추적(Value Tracking): 입력 필드의 값 변경을 추적하고, 이를 커스텀 로직에 활용
 * - 유효성 검사(Validation): 입력 필드에 대한 유효성 검사를 쉽게 설정하고 에러 메시지를 처리
 * - 폼 제출(Form Submission): 폼 제출 시 입력 값들을 쉽게 얻을 수 있으며, 필요한 로직을 수행
 *
 *
 *
 *
 * 주요 기능 예제
 * 1. 폼 등록(Form Registering): register 함수를 사용하여 각 입력 필드를 폼에 등록
 * - 등록 시, 각 필드에 대한 유효성 검사 규칙(validation rules)을 정의할 수 있음
 * <input {...register("username", { required: true, minLength: 6 })} />
 *
 * 2. 값 추적(Value Tracking): watch 함수를 사용하여 입력 필드의 현재 값을 추적
 * - 이를 활용하여 필드 간 상호 작용이나 커스텀 로직 구현 가능
 * const usernameValue = watch("username");
 *
 * 3. 유효성 검사(Validation): register 함수를 통해 정의한 유효성 검사 규칙에 따라 입력 필드의 값이 유효한지 자동으로 검사
 * - 유효성 검사 실패 시 , errors 객체를 통해 해당 필드에 대한 오류 메시지 얻을 수 있음
 * {errors.username && <div>두 글자 이상으로 입력해주세요</div>}
 *
 * 4. 폼 제출(Form Submission): handleSubmit 함수를 사용하여 폼 제출을 처리
 * - 이 함수는 폼 유효성 검사를 수행하, 검사가 통과되면 제출 핸들러 함수를 호출
 * const onSubmit = (data) => {
 *  // 입력 값 (data)을 사용하여 로직 수행
 * }
 *
 * <form onSubmit={handleSubmit(onSubmit)}>
 * <폼 필드들>
 * <input {...register("username", { required: true, minLength: 6 })} />
 * <...>
 * <input type="submit" />
 * </form>
 *
 *
 * 설치방법 (https://www.react-hook-form.com/get-started/)
 * yarn add react-hook-form
 *
 *
 *
 * react-hook-form 장단점
 * - 성능 최적화: 필요한 컴포넌트만 다시 렌더링되므로, 큰 폼이나 복잡한 폼에서도 좋은 성능을 제
 * - 생산성 향상 (편리함): register, watch, handleSubmit 등의 함수를 사용하여 복잡한 폼 로직을 구현
 * - 유효성 검사: 유효성 검사 규칙을 간단하게 설정하고, 오류 메시지를 처리할 수 있음
 * - 상태 관리: 필드의 상태를 관리하며, 폼 데이터를 관리하기 위한 별도의 상태 관리 라이브러리 필요 없음
 * - 커스터마이징: 다양한 폼 요소와 라이브러리와 쉽게 통합됨
 *
 * - 학습 필요: 초기 학습 곡선이 다소 가파를 수 있으며, 문서화가 완벽하지 않을 수 있음
 * - 비제어 컴포넌트: 비제어 컴포넌트를 사용하기 때문에, React의 일관된 상태 관리 패턴을 따르지 않음
 *
 *
 * 참고 사이트
 * - 폼 레이아웃 (tailwind ui) - https://tailwindui.com/components/application-ui/forms/form-layouts
 */

/**
 * Recoil 중복된 atom key 이슈 (https://recoiljs.org/ko/docs/api-reference/core/RecoilEnv/)
 * - 이슈 개요: next dev를 사용해서 프로젝트를 실행하면, Duplicate atom key "map"! This is a FATAL ERROR in production. But it is safe to ignore this warning if it occurred because of hot module replacement. 라는 에러 메세지가 콘솔에 출력됨
 * - 이슈 원인: Next.js 개발 중 파일이 변경되면 다시 빌드되는 과정에서 atom으로 만든 state가 재선언되 는데, 재선언되는 과정에서 이미 key로 선언된 값을 다시 사용해서 문제가 발생
 * - 해결방법:.env 환경 변수 파일에 아래 코드 추가 (0.7.6 버전 이상에서 사용 가능)
 * (RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=false)
 * - 해결방법 2: 문제가 되는 key 값에 uuid() 라이브러리를 활용해서 난수 추가
 */

/**
 * 다음 우편번호 서비스란?
 * - 다음(Daum) 우편번호 서비스 API: Daum에서 제공하는 우편번호 검색 및 주소 검색 기능을 웹 애플리케 이션에 통합하기 위한 API (https://postcode.map.daum.net/guide)
 * - 사용자 인터페이스 팝업: 사용자가 주소를 검색하고 선택할 수 있는 비를 팝업으로 띄워줌
 * - 검색 및 결과 창: 팝업에는 주소를 검색할 수 있는 검색 창과 검색 결과를 표시하는 결과 창이 포함
 * - 콜백 함수: 선택한 주소 정보 또는 우편번호 정보를 처리하기 위한 콜백 함수를 정의
 *
 *
 *
 *
 * 다음 우편번호 서비스란? (daum1 사진)
 * - new daum.Postcode(): Daum 우편번호 서비스 객체를 생성
 * - embed(): 생성한 Daum 우편번호 서비스 객체를 웹 페이지에 포함(팝업 열림)
 * - close(): 팝업 닫기
 * - onComplete: 사용자가 주소를 선택하거나 검색을 완료한 후 호출되는 콜백 함수
 * - onResize: 팝업의 크기가 변경될 때 호출되는 이벤트
 *
 *
 *
 *
 *
 * react-daum-postcode 라이브러리 소개
 * Github 링크: https://github.com/kmsbernard/react-daum-postcode
 * - React 애플리케이션에서 다음(Daum) 우편번호 서비스를 쉽게 통합할 수 있도록 도와주는 라이브러리
 * - Daum 우편번호 서비스 통합: Daum 우편번호 서비스와 간단하게 통합하여, 사용자는 우편번호 검색, 주소 선택 등을 Daum의 이를 통해 수행할 수 있음
 * - 모달 팝업: 모달 팝업에서 주소 검색 및 선택을 수행하고, 선택한 주소를 리액트 앱으로 전달할 수 있음
 * - 커스터마이징: 모달 팝업의 모양과 동작을 커스터마이징할 수 있음
 * - 간편한 사용: React 컴포넌트 형태로 제공되므로 React 프로젝트에서 쉽게 사용할 수 있음
 * import DaumPostcodeEmbed from 'react-daum-postcode' ;
 * <DaumPostcodeEmbed onComplete={handleComplete} {...props} />
 *
 *
 *
 *
 * 코드예시 (daum2 사진)
 * 1. react-daum-postcode 라이브러리 설치
 * - yarn add react-daum-postcode
 * 2. 리액트 컴포넌틀르 import 하여 사용
 * 3. 모달 팝업이 열리고, 사용자가 주소를 검색 및 선택하면, handleComplete 콜백 함수가 호출되고, 선택한 주소 데이터가 전달됨
 *
 *
 *
 * 코드예시: handleComplete 함수 예시 (daum3 사진)
 * - 도로명 주소의 경우, 데이터 정제가 필요함. 아래와 같은 필드를 받아서 address 값으로 저장해줌
 * addressType: (R/J) 검색된 기본 주소 타입 -R(도로명), J(지번)
 * bname: 법정동/법정리 이름
 * buildingName: 건물명
 *
 *
 *
 * 코드예시: Prisma로 데이터 처리 (daum4 사진)
 * 1. 카카오 주소 검색 API를 사용해서 저장할 주소 검색
 * - 공식문서 - https://developers.kakao.com/docs/latest/ko/local/dev-guide
 * - GET 요청: https://dapi.kakao.com/v2/local/search/address.json?query={71}
 * 2. 주소 검색 후 가져온 응답에서 위도(y), 경도(x)값 추출 & 저장
 * - 응답 문서: https://developers.kakao.com/docs/latest/ko/local/dev-guide#address-coord-response
 * - 위도/경도값 추출: data: {...formData, lat: data.documents[O].y, Ing: data.documents[0].x}
 *
 * 헤더: Authorization: KakaoAK${REST_API_KEY} 인증방식, REST API 키로 인증 요청
 * 쿼리: 검색을 원하는 질의어를 string 값으로 요청
 * 응답: documents 내에 x값(X좌표값/경도), y값(Y좌표값/위도) 저장
 *
 *
 *
 *
 * 참고 사이트
 * - react-daum-postcode: https://www.npmjs.com/package/react-daum-postcode
 * - 카카오 주소 검색 APl: https://developers.kakao.com/docs/latest/ko/local/dev-guide
 * - 다음 우편번호 서비스: https://postcode.map.daum.net/guide
 * - useForm의 setValue함수: https://react-hook-form.com/docs/useform/setvalue#main
 */

/**
 * 현재 위치로 이동하기
 * Geolocation API란?
 * - Geolocation API: 사용자의 현재 위치를 얻기 위해 사용되는 JS API로, 웹 애플리케이션에서 위치 기반 서비스를 개발하는 데 유용함
 * - 사용자의 브라우저를 통해 위치 정보를 수집할 수 있으며, 위치 기반 서비스를 개발할 때 유용함
 * - Geolocation API를 사용하면 웹 애플리케이션에서 다양한 기능을 개발할 수 있음
 * Ex) 사용자의 현재 위치를 기반으로 가까운 상점 찾기, 날씨 정보 표시, 길 안내 등의 서비스를 제공
 * - 다만, 사용자의 동의를 받아 위치 정보를 수집하므로 개인정보 보호에 주의                     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * - Geolocation API는 navigator.geolocation 객체를 통해 사용할 수 있음
 *
 *
 *
 *
 *
 *
 * Geolocation API 예제: 현재 위치 가져오기
 * - 현재 위치는 getCurrentPosition() 메서들를 활용해서 가져올 수 있음
 * - 사용자의 위치를 탐지하기 위한 비동기 요청을 보내고, 하드웨어로부터 위치 정보를 가져와 콜백 함수 호출
 * - (Optional) 콜백 함수 이외에도 실패했을 때 처리하는 콜백함수와 옵션값들을 매개변수로 지정할 수 있음
 *
 * navigator.geolocation.getCurrentPosition((position) => {
 *  doSomething(position.coords.latitude, position.coords.longitude);
 * });
 *
 * navigator.geolocation.getCurrentPosition(success, error, [options]);
 * 
 * 
 * 
 * 
 * 
 * 
 * Geolocation API 사용 예시 (geolocation1 사진)
 * 1. 사용자 브라우저에서 위치 정보 동의 얻기
 * - Geolocation 객체가 존재하는 경우에만 위치 정보 서비스를 지원
 * 2. Geolocation API를 사용해 위치정보 요청 & 처리
 * 3. 위치 정보 성공적으로 수집 후, 원하는 작업 수행
 * - 실패할경우, 예외처리
 * 
 * 
 * ex)
 * 1. 사용자 동의 얻기
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition (function (position) {
  2. 위치 정보 요청 및 처리
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  3. 위치 정보 사용 예제: 현재 위치 출력
    console. Log("현재 위치- 위도: + Latitude + ", 경도: "+ Longitude);
  }, function (error) {
    // 위치 정보 요청이 실패한 경우 에러 처리
    console.error("위치 정보를 얻을 수 없습니다. 오류:"+ error.message);
  });
} else {
  console.error("이 브라우저는 Geolocation API를 지원하지 않습니다.");
}






Geolocation API 옵션 값
- enableHighAccuracy: 정확한 위치 정보를 얻기 위해 높은 정확도를 사용할지 여부 (true/false)
- timeout: 위치 정보를 얻는 데 허용되는 시간 (밀리초)
- maximumAge: 이전에 얻은 위치 정보의 유효 기간 (밀리초)

ex)
const options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};

navigator.geolocation.getCurrentPosition(success, error, options);





참고할 사이트
- 카카오 지도 API -geolocation으로 마커 표시하기: https://apis.map.kakao.com/web/sample/geolocationMarker/
- 카카오 지도 API - panTo (중심 좌표 이동): https://apis.map.kakao.com/web/documentation/#Map-panTo
- (Mozilla) Geolocation API 도큐: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 */
