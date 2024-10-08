export default function Study1() {
  return <div>Study1</div>;
}

/**
 * SCSS (https://sass-lang.com/)
 * SCSS를 알아보기 전에
 *
 * CSS(Cascading Style Sheets) - 웹페이지 디자인 & 레이아웃 정의하는 스타일 시트 언어
 * SASS(Syntacticall Awesome Stylesheets) - 간결한 문법을 가진 CSS의 전처리기
 * SCSS(Sassy CSS) - CSS를 확장한 CSS 전처리기. CSS의 단점을 보완하며 SASS의 기능을 지원
 *  - CSS 전처리기 : 기존 CSS 언어의 기능을 확장하고 개선하기 위해 만들어진 도구. 컴파일러를 통해 CSS 포맷으로 변환이 됨
 *
 * SCSS의 장점 및 기능
 * 장점 - 가독성 및 유지보수성 향상, 재사용성 높임, 연산 및 함수 정의, 파일 분할 및 모듈화로 코드 관리
 *
 * 기능
 * 변수(variables) - 스타일에서 사용되는 색상, 폰트 크기 등을 변수로 정의 ($ 달러 사용)
 * $변수이름: 내용;
 *
 * 변수활용
 * .header {
 *  background-color: $변수이름
 * }
 *
 * 중첩규칙(nested rules) - 요소의 계층 구조를 중첩하여 스타일을 작성
 * 믹스인(mixins) - 스타일 코드를 재사용하기 위한 함수와 기능을 제공
 * 모듈(modules) - 하나의 파일에 모든 스타일 코드를 작성하지 않고, @use 규칙을 사용해서 여러 파일을 모듈로 나눠서 사용할 수 있음
 * 연산과 함수(operators) - SCSS는 수치 연산을 지원하며 내장 함수를 사용하여 동적인 스타일을 생성 할 수 있음 (ex. darken(), lighten() 함수)
 *
 *
 *
 * 더 자세하게
 * 변수
 * - SCSS 변수는 스타일 시트에서 자주 사용되는 값을 저장하고 재사용할 수 있게함
 * - 스타일 일관성 유지, 효율적인 업데이트
 * - ex) 글꼴 크기, 여백 값 등을 변수로 저장하여 코드 중복을 피하고 유지보수 간소화
 * - 변수를 사용하면 스타일 코드가 보다 명확해지고 스타일을 정리하는데 더욱 편리함
 *
 * 중첩규칙
 * - CSS 규칙을 더 명확하고 계층적으로 표현
 * - 코드의 가독성을 높이고, 유지보수하기 쉽게 함
 * - ex) 웹사이트의 헤더와 메뉴 항목에 대한 스타일을 중첩 규칙으로 작성하면 구조적으로 코드를 정리할 수 있음
 * - 상위 요소의 스타일을 중복해서 작성하지 않고도 하위 요소에 쉽게 적용 가능
 *
 * 믹스인
 * - SCSS에서 스타일 속성과 값을 묶어서 재사용 가능한 코드 블럭을 생성하는 기능
 * - 반복되는 스타일 중복 방지
 * - ex) 웹사이트에서 버튼 스타일을 자주 사용한다면 믹스인으로 버튼 스타일을 정의하고 필요한 곳에서 호출하여 사용할 수 있음
 * - 스타일 코드를 재사용 가능한 함수로 사용 가능
 * - 스타일 코드의 간결성과 일관성 유지
 *
 * 연산과 함수
 * - SCSS만의 수치 연산과 혹은 내장 함수를 사용하여 동적인 스타일 생성 (스타일 값 계산 & 변경)
 * - ex) 웹사이트에서 여백 값을 계산하는 경우나 색상을 변화시키는 경우 등에 연산과 함수를 활용 (연산자 예시: +, -, *, math.div(), %)
 * - 반응형 디자인이나 동적 스타일링에 유용
 *
 * 모듈화
 * - SCSS에서 스타일을 여러 파일로 나눠서 관리
 * - 큰 프로젝트에서 스타일을 조직화하고 유지보수하기 편하게 만들 수 있음
 * - ex) 웹 사이트의 다양한 컴포넌트나 섹션마다 별도의 스타일 파일을 만들고 필요한 곳에서 가져와 사용
 * - 스타일 파일이 독립적으로 유지되므로 복잡성을 낮추고 스타일 충돌 방지
 */

/**
 * 오해할만한 메서드
 *
 * 1) 데이터 생성 (setDoc VS addDoc)
 * 데이터는 setDoc과 addDoc으로 추가해 줄 수 있습니다.
 * 두 함수의 차이점은, setDoc의 경우 ID를 직접 지정할 수 있으나, addDoc은 아이디가 자동으로 생성 된다는 것입니다.
 * 두 함수 사용하는 형식은 거의 동일합니다. 함수(콜렉션, 데이터) 방식으로 호출하면 된다.
 *
 * // 데이터 id 지정해서 추가
 * await setDoc(doc(db, "cities", "new-city-id"), data);
 *
 * // 데이터 추가 (id는 자동 생성됨)
 * const docRef = await addDoc(collection(db, "cities"), {
 *  name: "Tokyo",
 *  country: "Japan"
 * });
 *
 *
 * 2) 데이터 수정 (setDoc VS updateDoc)
 * setDoc - 단일 문서를 만들거나 덮어쓰려면 set() 메서드를 사용합니다.
 * updateDoc - 전체 문서를 덮어쓰지 않고 문서의 일부 필드를 업데이트하려면 update() 메서드를 사용합니다.
 *
 * 두 함수의 차이점은, updateDoc의 경우 특정 필드만 수정 할 수 있고, setDoc은 지정한 데이터를 통째로 변경해버립니다.(지정한 데이터가 없다면 추가함)
 * updateDoc으로 전체 문서를 덮어쓰지 않고 문서의 일부 필드를 업데이트 할 수 있습니다.
 * setDoc으로 문서를 일괄 업데이트 할 수 있습니다.
 *
 *
 * 3) 데이터 삭제 (deleteDoc VS updateDoc, deleteField)
 * 도큐먼트를 한번에 삭제하고 싶다면 deleteDoc를 사용하면 되고, 특정 필드만 지우고 싶다면 deleteField와 updateDoc를 사용할 수 있습니다.
 */
