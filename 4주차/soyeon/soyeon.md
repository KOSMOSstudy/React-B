# 4주차 React 스터디 정리

| 장   | 제목                             |
| ---- | -------------------------------- |
| 9장  | 컴포넌트 스타일링                |
| 10장 | 일정 관리 웹 어플리케이션 만들기 |
| 11장 | 컴포넌트 성능 최적화             |

## 9장

- 일반 CSS : 컴포넌트를 스타일링하는 가장 기본적인 방식
- Sass : 자주 사용되는 CSS 전처리기 중 하나로 확장된 CSS 문법을 사용해 더 쉽게 CSS 코드를 작성할 수 있도록 해줌
- CSS Module : 스타일 작성 시 CSS 클래스가 다른 CSS 클래스의 이름과 절대 충돌하지 않도록 고유한 이름을 자동 생성해주는 옵션
- styled-component : 스타일을 자바스크립트 파일에 내장시킴. 스타일 작성과 동시에 스타일이 적용된 컴포넌트를 만들 수 있게 해줌

### 9.1 가장 흔한 방식, 일반 CSS

CSS 작성 시 가장 중요한 것은 CSS 클래스를 중복되지 않게 만드는 것이다.<br/>
중복되는 것을 방지하는 방식 중 하나는 *이름을 지을 때 특별한 규칙을 사용*하거나 *CSS Selector*를 활용하는 것이다!

#### 이름 짓는 규칙

클래스 이름에 컴포넌트 이름을 포함시켜 다른 컴포넌트에서 실수로 중복되는 클래스를 만들어 사용하는 것을 방지한다.<br/>
Ex) App-header ('컴포넌트 이름-클래스' 형태)<br/>
비슷한 방식으로 *BEM 네이밍* 방식이 있다<br/>
CSS 방법론 중 하나로 이름을 지을 때 일종의 규칙을 준수해 해당 클래스가 어디에서 어떤 용도로 사용되는지 명확하게 작성하는 방식이다! <br/>
Ex) card_title-primary

#### CSS Selector

CSS Selector를 사용하면 CSS 클래스가 특정 클래스 내부에 있는 경우에만 스타일을 적용할 수 있다.
예를 들어 .App 안에 들어 있는 .logo에 스타일을 적용하고 싶다면 `.App .logo`처럼 표현할 수 있다! 

### 9.2 Sass 사용하기

내용 placeholder

### 9.3 CSS Module

내용 placeholder

### 9.4 styled-components

내용 placeholder

### 9.5 정리

내용 placeholder

## 10장

### 10.1 프로젝트 준비하기

내용 placeholder

### 10.2 UI 구성하기

내용 placeholder

### 10.3 기능 구현하기

내용 placeholder

### 10.4 정리

내용 placeholder

## 11장

### 11.1 많은 데이터 렌더링하기

내용 placeholder

### 11.2 크롬 개발자 도구를 통한 성능 모니터링

내용 placeholder

### 11.3 느려지는 원인 분석

내용 placeholder

### 11.4 React.memo를 사용하여 컴포넌트 성능 최적화

내용 placeholder

### 11.5 onToggle, onRemove 함수가 바뀌지 않게 하기

내용 placeholder

### 11.6 불변성의 중요성

내용 placeholder

### 11.7 TodoList 컴포넌트 최적화하기

내용 placeholder

### 11.8 react-virtualized를 사용한 렌더링 최적화

내용 placeholder

### 11.9 정리

내용 placeholder

------

질문, 이해가 안 갔던 것, 궁금한 것, 스터디장이나 다른 사람들에게 물어보고 싶은 것, 기타 등등이 있으시면 써주시고, 이 문구는 지워주세요!