# 5주차 React 스터디 정리

| 장   | 제목                                 |
| ---- | ------------------------------------ |
| 13장 | 리액트 라우터로 SPA 개발하기         |
| 14장 | 외부 API를 연동하여 뉴스 뷰어 만들기 |

## 13장

### 13.1 SPA란?

SPA는 Single Page Application(싱글 페이지 애플리케이션)의 약어 한 개의 페이지로 이루어진 애플리케이션이라는 의미이다. 전통적인 웹 페이지와 다르게 리액트 같은 라이브러리 혹은 프레임워크를 사용하여 뷰 렌더링을 사용자의 브라우저가 담당하도록 하고, 우선 애플리케이션을 브라우저에 불러와서 실행시킨 후에 사용자와의 인터랙션이 발생하면 필요한 부분만 자바스크립트를 사용하여 업데이트해 준다.

SPA의 단점은

1. SPA의 단점은 앱의 규모가 커지면 자바스크립트 파일이 너무 커진다
   (스플리팅(code splitting)을 사용하면 라우트별로 파일들을 나누어서 트래픽과 로딩 속도를 개선할 수 있다.)
2. 일반 크롤러에서는 페이지의 정보를 제대로 수집해 가지 못한다는 잠재적인 단점이 있다.

### 13.2 프로젝트 준비 및 기본적인 사용법

yarn을 사용하여 react-router-dom이라는 라이브러리를 설치

`cd router-tutorial`

`yarn add react-router-dom`

- 프로젝트에 라우터 적용

BrowserRouter라는 컴포넌트를 사용하여 감싸면 된다.
이 컴포넌트는 웹 애플리케이션에 HTML5의 History API를 사용하여
페이지를 새로고침하지 않고도 주소를 변경하고,
현재 주소에 관련된 정보를 props로 쉽게 조회하거나 사용할 수 있도록 해 준다.

```jsx
import React from `react`;
import ReactDOM from `react-dom`;
import { BrowserRouter } from `react-router-dom`;
import `./index.css`;
import App from `./App`;
import * as serviceWorker from `./serviceWorker`;
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById(`root`)
);

serviceWorker.unregister(); //이거 모듈에 없어서 삭제해야함
```

- 페이지 만들기

Home.js

```jsx
import React from "react";

const Home = () => {
  return (
    <div>
      <h1>홈</h1>
      <p>홈, 그 페이지는 가장 먼저 보여지는 페이지.</p>
    </div>
  );
};

export default Home;
```

---

About.js

```jsx
import React from "react";

const About = () => {
  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
    </div>
  );
};

export default About;
```

- Route 컴포넌트로 특정 주소에 컴포넌트 연결

규칙을 가진 경로에 어떤 컴포넌트를 보여 줄지 정의 Route 컴포넌트를 사용하여 방금 만든 Home 컴포넌트 혹은 About 컴포넌트를 보여 주도록 설정 이때!

/about 경로가 / 규칙에도 일치하기 때문에

Home을 위한 Route 컴포넌트를 사용할 때 exact라는 props를 true로 설정

App.js

```jsx
import React from "react";
import { Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";

const App = () => {
  return (
    <div>
      <Route path="/" component={Home} exact={true} />
      <Route path="/about" component={About} />
    </div>
  );
};
export default App;
```

- Link 컴포넌트를 사용하여 다른 주소로 이동하기

Link 컴포넌트는 클릭하면 다른 주소로 이동시켜 주는 컴포넌트 Link 컴포넌트를 사용하여 페이지를 전환하면, 페이지를 새로 불러오지 않고 애플리케이션은 그대로 유지한 상태에서 HTML5 History API를 사용하여 페이지의 주소만 변경해 준다.

App.js

```jsx
import React from "react";
import { Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";
const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={Home} exact={true} />
      <Route path="/about" component={About} />
    </div>
  );
};
export default App;
```

### 13.3 Route 하나에 여러 개의 path 설정하기

Route를 두 번 사용하는 대신, path props를 배열로 설정해 주면 여러 경로에서 같은 컴포넌트를 보여 줄 수 있다.

App.js

```jsx
import React from "react";
import { Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";

const App = () => {
  return (
    <div>
      <Route path="/" component={Home} exact={true} />
      <Route path={["/about", "/info"]} component={About} />
    </div>
  );
};

export default App;
```

### 13.4 URL 파라미터와 쿼리

페이지 주소를 정의할 때 가끔은 유동적인 값을 전달해야 할 때도 있다.

유동적인 값을 사용해야 하는 상황에서 파라미터를 써야 할지 쿼리를 써야 할지 정할 때, 무조건 따라야 하는 규칙은 없다.

다만 일반적으로 파라미터는 `특정 아이디 혹은 이름을 사용하여 조회할 때` 사용하고,

쿼리는 우리가 어떤 키워드를 `검색하거나 페이지에 필요한 옵션을 전달할 때` 사용한다.

우선, username 값을 넣어 줄 때 해당 값을 props로 받아 와서 조회하는 방법을 알아보겠다.

Profile.js

```jsx
import React from "react";
const data = {
  velopert: {
    name: "김민준",
    description: "리액트를 좋아하는 개발자",
  },
  gildong: {
    name: "홍길동",
    description: "고전 소설 홍길동전의 주인공",
  },
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = data[username];
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }
  //URL 파라미터를 사용할 때는 라우트로 사용되는 컴포넌트에서 받아 오는
  // match라는 객체 안의 params 값을 참조

  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profile;
```

라우트를 정의하고 나서 상단에 각 프로필 페이지로 이동하는 링크도 추가

App.js

```jsx
import React from "react";
import { Route, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Profile from "./Profile";

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profile/velopert">velopert 프로필</Link>
        </li>
        <li>
          <Link to="/profile/gildong">gildong 프로필</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={Home} exact={true} />
      <Route path={["/about", "/info"]} component={About} />
      <Route path="/profile/:username" component={Profile} />
    </div>
  );
};
export default App;
```

- URL 쿼리

쿼리는 location 객체에 들어 있는 search 값에서 조회할 수 있다.

location 객체는 라우트로 사용된 컴포넌트에게 props로 전달되며,

웹 애플리케이션의 현재 주소에 대한 정보를 지니고 있다.

```jsx
{
"pathname": "/about",
"search": "?detail=true",
"hash": ""
}
//위 location 객체는
//http://localhost:3000/about?detail=true 주소로 들어갔을 때의 값입니다.
```

쿼리 문자열을 객체로 변환할 때는 qs라는 라이브러리를 사용한다.

`arn add qs`

About.js

```jsx
import React from "react";
import qs from "qs";

const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true, // 이 설정을 통해 문자열 맨 앞의 ?를 생략합니다.
  });
  const showDetail = query.detail === "true"; // 쿼리의 파싱 결과 값은 문자열입니다.
  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
      {showDetail && <p>detail 값을 true로 설정하셨군요!</p>}
    </div>
  );
};

export default About;
```

쿼리를 사용할 때는 쿼리 문자열을 객체로 파싱하는 과정에서 결과 값은 언제나 문자열이다.

그렇기 때문에 숫자를 받아 와야 하면 parseInt 함수를 통해 꼭 숫자로 변환해 주고,

지금처럼 논리 자료형 값을 사용해야 하는 경우에는 정확히 "true" 문자열이랑 일치하는지 비교해야함.

### 13.5 서브 라우트

서브 라우트는 라우트 내부에 또 라우트를 정의하는 것을 의미

라우트로 사용되고 있는 컴포넌트의 내부에 Route 컴포넌트를 또 사용

Profiles.js

```jsx
import React from "react";
import { Link, Route } from "react-router-dom";
import Profile from "./Profile";

const Profiles = () => {
  return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          <Link to="/profiles/velopert">velopert</Link>
        </li>
        <li>
          <Link to="/profiles/gildong">gildong</Link>
        </li>
      </ul>

      <Route
        path="/profiles"
        exact
        render={() => <div>사용자를 선택해 주세요.</div>}
        //보여 주고 싶은 JSX를 넣어 줄 수 있습니다.
      />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};

export default Profiles;
```

JSX에서 props를 설정할 때 값을 생략하면 자동으로 true로 설정된다.

App.js

```jsx
import React from "react";
import { Route, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Profiles from "./Profiles";
const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={Home} exact={true} />
      <Route path={["/about", "/info"]} component={About} />
      <Route path="/profiles" component={Profiles} />
    </div>
  );
};
export default App;
```

### 13.6 리액트 라우터 부가 기능

- history
  history 객체는 라우트로 사용된 컴포넌트에 match, location과 함께 전달되는 props 중 하나로, 이 객체를 통해 컴포넌트 내에 구현하는 메서드에서 라우터 API를 호출

특정 버튼을 눌렀을 때 뒤로 가거나, 로그인 후 화면을 전환하거나, 다른 페이지로 이탈하는 것을 방지해야 할 때 history를 활용

- withRouter
  withRouter 함수는 HoC(Higher-order Component)입니다. 라우트로 사용된 컴포넌트가 아니어도 match, location, history 객체를 접근할 수 있게 해 준다.

WithRouterSample.js

```jsx
import React from "react";
import { withRouter } from "react-router-dom";
const WithRouterSample = ({ location, match, history }) => {
  return (
    <div>
      <h4>location</h4>
      <textarea
        value={JSON.stringify(location, null, 2)}
        rows={7}
        readOnly={true}
      />
      <h4>match</h4>
      <textarea
        value={JSON.stringify(match, null, 2)}
        rows={7}
        readOnly={true}
      />
      <button onClick={() => history.push("/")}>홈으로</button>
    </div>
  );
};

export default withRouter(WithRouterSample);
```

이 코드처럼 withRouter를 사용할 때는 컴포넌트를 내보내 줄 때 함수로 감싸 준다.

JSON.stringify의 두 번째 파라미터와 세 번째 파라미터를 위와 같이 null, 2로 설정해 주면

JSON에 들여쓰기가 적용된 상태로 문자열이 만들어진다.

Profiles.js

```jsx
//랜더링
import React from "react";
import { Link, Route } from "react-router-dom";
import Profile from "./Profile";
import WithRouterSample from "./WithRouterSample";
const Profiles = () => {
  return (
    <div>
      (…)
      <WithRouterSample />
    </div>
  );
};
export default Profiles;
```

- Switch
  Switch 컴포넌트는 여러 Route를 감싸서 그중 일치하는 단 하나의 라우트만을 렌더링시켜 준다. Switch를 사용하면 모든 규칙과 일치하지 않을 때 보여 줄 Not Found 페이지도 구현할 수 있다.
- NavLink
  NavLink는 Link와 비슷합니다.
  현재 경로와 Link에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 CSS 클래스를 적용할 수 있는 컴포넌트이다.

### 13.7 정리

리액트 라우터를 사용하여 주소 경로에 따라 다양한 페이지를 보여 주는 방법을 알아보았다.

큰 규모의 프로젝트를 진행하다 보면 한 가지 문제가 발생합니다.
바로 웹 브라우저에서 사용할 컴포넌트, 상태 관리를 하는 로직, 그 외 여러 기능을 구현하는 함수들이 점점 쌓이면서 최종 결과물인 자바스크립트 파일의 크기가 매우 커진다는 점이다.

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
