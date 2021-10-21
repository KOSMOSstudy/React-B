# 5주차 React 스터디 정리

| 장   | 제목                                 |
| ---- | ------------------------------------ |
| 13장 | 리액트 라우터로 SPA 개발하기         |
| 14장 | 외부 API를 연동하여 뉴스 뷰어 만들기 |

## 13장

### 13.1 SPA란?

**SPA은 Single Page Application**의 약자로 말 그대로 한 개의 페이지로 이루어진 애플리케이션을 의미한다.<br/>
요즘은 웹에서 제공되는 정보가 많아 새로운 화면을 보여 주어야 할 때마다 서버 측에서 모든 뷰를 준비한다면 성능상의 문제가 발생할 수 있다.
애플리케이션 내에서 화면 전환이 일어날 때마다 html을 계속 서버에 요청하면 사용자의 인터페이스에서 사용하고 있던
상태를 유지하는 것도 번거롭고 바뀌지 않는 부분까지 새로 불러와 보여 주어야 하기 때문에 불필요한 로딩이 있어 **비효율적**이다.

그래서 리액트 같은 라이브러리 or 프레임워크를 사용해 *뷰 렌더링을 사용자의 브라우저가 담당*하도록 하고
애플리케이션을 브라우저에 불러와 실행시킨 후 사용자와의 인터랙션이 발생하면 필요한 부분만 자바스크립트를 사용해 업데이트 해준다.
만약 새로운 데이터가 필요하다면 서버 API를 호출해 필요한 데이터만 새로 불러와 사용할 수 있다.

**라우팅**이란 다른 주소에 다른 화면을 보여 주는 것이다!! <br/>
리액트 라이브러리 자체에 이 기능이 내장되어 있지는 않고 대신 브라우저의 API를 직접 사용해 이를 관리하거나 
라이브러리를 사용해 이 작업을 더 쉽게 구현할 수 있다.

> 리액트 라우팅 라이브러리
> - 리액트 라우터 (react-router)
> - 리치 라우터 (reach-router)
> - Next.js
여기서는 이 중 가장 사용 빈도가 높은 '리액트 라우터'를 사용할 것이다! 

#### SPA의 단점 

SPA의 단점은 앱의 규모가 커지면 자바스크립트 파일이 너무 커진다는 것이다.<br/>
페이지 로딩 시 사용자가 실제로 방문하지 않을 수도 있는 페이지의 스크립트도 불러오기 때문이다.<br/>
하지만 이는 나중에 배울 '코드 스플리팅(code spliting)'을 사용하면 라우트별로 파일들을 나눠서 
트래픽과 로딩 속도를 개선할 수 있다.

### 13.2 프로젝트 준비 및 기본적인 사용법

`yarn create react-app router-tutorial`, `cd router-tutorial`, `yarn add react-router-dom`

#### 프로젝트에 라우터 적용

프로젝트에 리액트 라우터를 적용할 때는 src/index.js파일에서 react-router-dom에 내장되어 있는
**BrowserRouter**라는 컴포넌트를 사용해 감싸주면 된다! <br/>

> BrowserRouter
이 컴포넌트는 웹 애플리케이션에 HTML5의 History API를 사용해 페이지를 새로고침하지 않고도
주소를 변경하고, 현재 주소에 관련된 정보를 props로 쉽게 조회하거나 사용할 수 있도록 해 준다!

#### Route 컴포넌트로 특정 주소에 컴포넌트 연결

Route 컴포넌트를 사용하면 어떤 규칙을 가진 경로에 어떤 컴포넌트를 보여 줄지 정의할 수 있다.<br/>
`<Route path="주소규칙" component={보여 줄 컴포넌트} />`<br/>
위와 같이 사용하면 된다:)

**App.js**
```javascript
import React from 'react';
import {Route} from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () => {
  return(
    <div>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
};
export default App;
```
위와 같이 코드를 작성하고 실행을 해보면 문제점이 하나 있다.<br/>
'/about'경로로 들어가면 About 컴포넌트만 나오는 것이 아니라 Home 컴포넌트가 같이 나타난다.<br/>
이런 이유는 /aobut 경로가 / 규칙에도 일치하기 때문에 발생한 현상이다.<br/>
이를 수정하려면 Home을 위한 Route 컴포넌트 사용 시 `exact={true}` 이렇게 exact라는 props를 true로 설정하면 된다!!

### 13.3 Route 하나에 여러 개의 path 설정하기

내용 placeholder

### 13.4 URL 파라미터와 쿼리

내용 placeholder

### 13.5 서브 라우트

내용 placeholder

### 13.6 리액트 라우터 부가 기능

내용 placeholder

### 13.7 정리

내용 placeholder

## 14장

### 14.1 비동기 작업의 이해

내용 placeholder

### 14.2 axios로 API 호출해서 데이터 받아 오기

내용 placeholder

### 14.3 newsapi API 키 발급받기

내용 placeholder

### 14.4 뉴스 뷰어 UI 만들기

내용 placeholder

---

질문, 이해가 안 갔던 것, 궁금한 것, 스터디장이나 다른 사람들에게 물어보고 싶은 것, 기타 등등이 있으시면 써주시고, 이 문구는 지워주세요!
