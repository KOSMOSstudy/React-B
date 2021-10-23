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

#### Link 컴포넌트를 사용해 다른 주소로 이동하기 

Link 컴포넌트는 클릭하면 다른 주소로 이동시켜 주는 컴포넌트이다.<br/>

> a태그와 Link 컴포넌트의 차이점<br/>
- a태그 : 페이지를 전환하는 과정에서 페이지를 새로 불러오기 때문에 애플리케이션이 들고 있던 상태들을 모두 날려버린다.
렌더링된 컴포넌트들도 모두 사라지고 다시 처음부터 렌더링해야 한다.
- Link 컴포넌트 : 이를 사용해 페이지를 전환하면 페이지를 새로 불러오지 않고 애플리케이션은 그대로 유지한 상태에서 HTML5 History API를 사용해
페이지의 주소만 변경해 준다. Link 컴포넌트 자체는 a태그로 이루어져 있지만, 페이지 전환을 방지하는 기능이 내장되어 있다! 

`<Link to="주소">내용</Link>`

*App.js 참고*

### 13.3 Route 하나에 여러 개의 path 설정하기

Route 하나에 여러 개의 path를 지정하는 것은 리액트 라우터 v5부터 적용된 기능이다.<br/>
Route를 여러 번 사용하지 않는 대신 path props를 배열로 설정해 주면 여러 경로에서 같은 컴포넌트를 보여줄 수 있다!<br/>

```javascript
(...)
<Route path={['/about', '/info']} component={About} />
(...)
```

### 13.4 URL 파라미터와 쿼리

페이지 주소를 정의할 때 가끔은 유동적인 값을 전달해야 할 때도 있다. <br/>
이는 **파라미터와 쿼리**로 나눌 수 있다! <br/>

이러한 상황에서 파라미터를 써야 할지 쿼리를 써야 할지 무조건 따라야 할 규칙은 없지만
일반적으로는 아래와 같이 사용한다.<br/>

- 파라미터 : 특정 아이디 혹은 이름을 사용해 조회할 때 사용
- 쿼리 : 우리가 어떤 키워드를 검색하거나 페이지에 필요한 옵션을 전달할 때 사용

#### URL 파라미터

`/profile/velopert`와 같은 형식으로 뒷부분에 유동적인 username 값을 넣어 줄 때 해당 값을 
props로 받아 와서 조회하는 방법을 알아보자! <br/>

*Profile.js*
```javascript
import React from 'react';

const data = {
  velopert: {
    name: '김민준',
    description: '리액트를 좋아하는 개발자'
  },
  gildong: {
    name: '홍길동',
    description: '고전 소설 홍길동전의 주인공'
  }
};
const Profile = ({match}) => {
  const { username } = match.params;
  const profile = data[username];
  if(!profile){
    return <div>존재하지 않는 사용자입니다.</div>;
  }
  return(
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
URL 파라미터를 사용할 때는 라우트로 사용되는 컴포넌트로 받아 오는 match라는 객체 안의 params 값을 참조한다.<br/>
match 객체 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해 보이는지에 대한 정보가 들어있다.<br/>
App 컴포넌트에서 Profile 컴포넌트를 위한 라우터를 정의할 때 path 규칙에 `/profile/:username`이라고 넣어주면 된다!<br/>
`<Route path="/profile/:username" component={Profile} />, <Link to="/profile/username">username 프로필</Link>`<br/>
이렇게 설정하면 match.params.username 값을 통해 현재 username 값을 조회할 수 있다. <br/> 

#### URL 쿼리

**쿼리**는 location 객체에 들어 있는 search 값에서 조회할 수 있다.<br/>
location 객체는 라우트로 사용된 컴포넌트에서 props로 전달되며, 웹 애플리케이션의 현재 주소에 대한 정보를 지니고 있다.<br/>

```plaintext
{
  "pathname": "/about",
  "search" : "?detail=true",
  "hash" : ""
}
```
위의 location 객체는 'http://localhost:3000/about?detail=true'로 들어갔을 때의 값이다.<br/>
URL 쿼리를 읽을 때는 위 객체가 지닌 값 중에서 **search**값을 확인해야 한다!!<br/>
이 값은 문자열 형태로 되어 있다. URL 쿼리는 '?detail=true&another=1'과 같이 문자열에 여러 가지 값을 설정해 줄 수 있다.<br/>
search 값에서 특정 값을 읽어 오기 위해서는 **이 문자열을 객체 형태로 변환해 주어야 한다!**<br/>

쿼리 문자열을 객체로 변환할 때는 qs라이브러리를 사용한다.<br/>
`yarn add qs`<br/>

*About.js*<br/>
location.search 값에 있는 detail이 true인지 아닌지에 따라 추가 정보를 보여주도록 만들어보자.<br/>

```javascript
import React from 'react';
import qs from 'qs';

const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true // 이 설정을 통해 문자열 맨 앞의 ?를 생략
  });
  const showDetail = query.detail === 'true'; // 쿼리의 파싱 결과 값은 문자열입니다.
  return(
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트</p>
      {showDetail && <p>detail값을 true로 설정하셨군요!</p>}
    </div>
  );
};
export default About;
```
쿼리를 사용할 때는 쿼리 문자열을 객체로 파싱하는 과정에서 결과 값은 언제나 **문자열**이라는 점에 !주의!<br/>
숫자를 받아와야 한다면 parseInt 함수를 사용해 꼭 숫자로 변환해 주어야 하고, 지금처럼 논리 자료형 값을
사용해야 하는 경우에는 정확히 "true" 문자열이랑 일치하는지 비교해 주어야 한다!!<br/>

### 13.5 서브 라우트

**서브 라우트**는 라우트 내부에 또 라우트를 정의하는 것을 의미한다.<br/>
사용방법은 그냥 라우트로 사용되고 있는 컴포넌트의 내부에 Route 컴포넌트를 또 사용하면 된다!<br/>

*Profiles.js*

기존에는 App 컴포넌트에서 두 개의 프로필 링크를 모두 보여주었다.<br/>
이를 잘라내서 프로필 링크를 보여주는 Profiles라는 라우트 컴포넌트를 따로 만들고,
그 안에서 Profile 컴포넌트를 서브 라우트로 사용하도록 코드를 작성했다!<br/>

```javascript
import React from 'react';
import {Link, Route} from 'react-router-dom';
import Profile from './Profile';

const Profiles = () => {  
  return(
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
        path="profiles"
        exact
        render={() => <div>사용자를 선택해 주세요.</div>}
        />
        <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};
export default Profiles;
```
첫 번째 Route 컴포넌트에는 component 대신 render라는 props를 넣어주었다.<br/>
컴포넌트 자체를 전달하는 것이 아니라 보여주고 싶은 JSX를 넣어줄 수 있다!<br/>
JSX에서 props를 설정할 때 값을 생략하면 자동으로 `true`로 설정된다.<br/>
`exact => exact={true}`

### 13.6 리액트 라우터 부가 기능

#### history

history 객체는 라우트로 사용된 컴포넌트에 match, location과 함께 전달되는 props 중 하나이다.<br/>
이 객체를 통해 컴포넌트 내에 구현하는 메서드에서 라우터 API를 호출할 수 있다!<br/>
> Example : 버튼 클릭 시 뒤로가기 / 로그인 후 화면 전환 / 다른 페이지로 이탈 방지 <br/>

*HistorySample.js 참고*

#### withRouter

withRouter 함수는 HoC(Higher-order Component)이다.<br/>
라우트로 사용된 컴포넌트가 아니어도 match, location, history 객체를 접근할 수 있게 해준다.<br/>
withRouter를 사용할 때는 컴포넌트를 내보내 줄 때 함수로 감싸주어야 한다.<br/>
`Ex. export default withRouter(WithRouterSample);`<br/>

*WithRouterSample.js 참고*

WithRouterSample을 Profiles 컴포넌트에 렌더링을 해보면 match 객체의 params 값이 비어 있는 것을 
확인할 수 있다. <br/>
이는 withRouter를 사용하면 현재 자신을 보여 주고 있는 라우트 컴포넌트(현재 Profiles)를
기준으로 match가 전달되기 때문이다.<br/>
Profiles를 위한 라우트를 설정할 때 `path="/profiles"`라고만 입력했으므로 username 파라미터를
읽어오지 못하는 것이다.<br/>
이를 Profiles말고 Profile 컴포넌트에 넣으면 match쪽에 URL 파라미터가 제대로 보일 것이다!!

#### Switch

Switch 컴포넌트는 여러 Route를 감싸서 그 중 일치하는 단 하나의 라우트만을 렌더링시켜 준다.<br/>
이를 사용하면 모든 규칙과 일치하지 않을 때 보여줄 Not Found 페이지도 구현할 수 있다.

*App.js 일부*
```javascript
<Switch>
    <Route path="/" component={Home} exact={true} />
    <Route path={['/about', '/info']} component={About} />
    <Route path="/profiles" component={Profiles} />
    <Route path="/history" component={HistorySample} />
    <Route
      render={({location}) => (
         // path를 따로 정의하지 않으면 모든 상황에 렌더링됨
         <div>
           <h2>이 페이지는 존재하지 않습니다:</h2>
          <p>{location.pathname}</p>
         </div>
      )}
    />
</Switch>
```

#### NavLink

NavLink는 Link와 비슷하다. 
현재 경로와 Link에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 CSS 클래스를
적용할 수 있는 컴포넌트이다.<br/>
NavLink에서 링크가 활성화되었을 때의 스타일을 적용할 때는 **activeStyle**값을,
CSS 클래스를 적용할 때는 **activeClassName**값을 props로 넣어 주면 된다.<br/>

*Profiles.js 일부*
```javascript
<div>
  <h3>사용자 목록:</h3>
  <ul>
    <li>
      <NavLink activeStyle={activeStyle} to="/profiles/velopert">velopert</NavLink>
    </li>
    <li>
      <NavLink activeStyle={activeStyle} to="/profiles/gildong">gildong</NavLink>
    </li>
  </ul>
</div>
```

### 13.7 정리

이 장에서는 리액트 라우터를 사용해 주소 경로에 따라 다양한 페이지를 보여 주는 방법을 알아보았다.<br/>
큰 규모의 프로젝트를 진행하다 보면 한 가지 문제점이 있다.<br/>
바로 웹 브라우저에서 사용할 컴포넌트, 상태 관리를 하는 로직, 그 외 여러 기능을 구현하는 함수들이 
점점 쌓이면서 최종 결과물인 자바스크립트 파일이 너무 커진다는 것이다...<br/>
이러한 경우 필요한 기술이 라우트에 따라 필요한 컴포넌트만 불러오고, 다른 컴포넌트는 다른 페이지를
방문하는 등의 필요한 시점에 불러오느 **코드 스플리팅**이다!!!<br/>
이에 대해서는 19장에서 배워보자 :)

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
