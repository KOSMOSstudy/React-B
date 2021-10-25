# 5주차(13장, 14장 4절)

| 장   | 제목                                 |

| ---- | ------------------------------------ |

| 13장 | 리액트 라우터로 SPA 개발하기         |

| 14장 | 외부 API를 연동하여 뉴스 뷰어 만들기 |

# 13장 : 리액트 라우터로 SPA 개발하기

## SPA란?

SPA : Single Page Application(싱글 페이지 애플리케이션)의 약어로 한 개의 페이지로 이루어진 애플리케이션을 의미한다. 

기존 : 사용자가 다른 페이지로 이동할 때마다 새로운 html을 받아오고, 페이지를 로딩할 때마다 서버에서 리소스를 전달 받아 해석한 뒤 화면에 보여준다. 

성능 상의 이슈를 해결하기 위해 리액트 같은 라이브러리 혹은 프레임워크를 사용하여 뷰 렌더링을 사용자의 브라우저가 담당하도록 하고, 우선 애플리케이션을 브라우저에 불러와서 실행시킨 후에 사용자와의 인터랙션이 발생하면 필요한 부분만 업데이트를 해 준다. 

### 13.1.1 SPA의 단점

→ 앱의 규모가 커지면 자바스크립트 파일이 너무 커진다는 것이다.

Why? 

페이지 로딩 시 사용자가 실제로 방문하지 않을 수도 있는 페이지의 스크립트도 불러오기 때문

→ 나중에 코드 스플리팅을 사용하면 라우트별로 파일들을 나누어 트래픽과 로딩 속도를 개선 가능

## 13.2 프로젝트 준비 및 기본적인 사용법

### 13.2.1 프로젝트 생성 및 라이브러리 설치

```jsx
$ yarn create react-app router-tutorial
$ cd router-tutorial
$ yarn add react-router-dom
```

### 13.2.2 프로젝트에 라우터 적용

↓ index.js

```jsx
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

### 13.2.3 페이지 만들기

사용자가 웹 사이트에 들어왔을 때 맨 처음 보여 줄 Home 컴포넌트와

웹 사이트를 소개하는 About 컴포넌트를 만들기

↓ Home.js

```jsx
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>홈</h1>
      <p>홈, 그 페이지는 가장 먼저 보여지는 페이지</p>
    </div>
  );
};

export default Home;
```

↓ About.js

```jsx
import React from 'react';

const About = () => {
  return(
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
    </div>
  );
};

export default About;
```

### 13.2.4 Route 컴포넌트로 특정 주소에 컴포넌트 연결

Route라는 컴포넌트를 사용하여 사용자의 현재 경로에 따라 다른 컴포넌트를 보여 준다.

Route 컴포넌트를 사용하면 어떤 규칙을 가진 경로에 어떤 컴포넌트를 보여 줄지 정의할 수 있다.

↓ Route 컴포넌트를 사용하여 방금 만든 Home 컴포넌트 혹은 About 컴포넌트를 보여 주도록

App.js

```jsx
import React from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () => {
  return (
    <div>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
};

export default App;
```

실행 시, /about 경로로 들어가면 About 컴포넌트만 나오기를 기대했지만 Home과 About 컴포넌트가 둘 다 나온다.

이를 위해서는 → Home 위한 Route 컴포넌트를 사용할 때 exact라는 props를 true로 설정하면 된다.

```jsx
<Route path="/" component={Home} exact={true} />
```

### 13.2.5 Link 컴포넌트를 사용하여 다른 주소로 이동하기

일반 웹 애플리케이션에서는 a태그를 사용하여 페이지를 전환하는데, 

a태그는 페이지를 전환하는 과정에서 페이지를 새로 불러오기 때문에 애플리케이션이 들고 있던 상태들을 모두 날려버리게 된다. 렌더링 된 컴포넌트들도 모두 사라지고 다시 처음부터 렌더링하게 됨

Link 컴포넌트를 사용하여 페이지를 전환하면 페이지를 새로 불러오지 않고 애플리케이션은 그대로 유지한 상태에서 HTML5 History API를 사용하여 페이지의 주소만 변경해 줄 수 있음. 

**→ Link 컴포넌트 자체는 a 태그로 이루어져 있지만, 페이지 전환을 방지하는 기능이 내장**

↓ App.js 에서 Link 컴포넌트 구현

```jsx
import React from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import Home from './Home';

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
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
};

export default App;
```

## 13.3 Route 하나에 여러 개의 path 설정하기

최신 버전의 리액트 라우터 v5부터 적용된 기능 : Route 하나에 여러 개의 path를 지정

적용하려면 

1. 다음의 코드 추가

```jsx
<Route path="/info" component={About} />
```

1. path props를 배열로 설정

```jsx
<Route path={['/about', '/info']} component={About} />
```

## 13.4 URL 파라미터와 쿼리

페이지 주소를 정의할 때 가끔은 유동적인 값을 전달해야 할 때도 있음. 이는 파라미터와 쿼리로 나눌 수 있음

- 파라미터 예시: /rofile/velopert
- 쿼리 예시: /about?details=true

유동적인 값을 사용해야 하는 상황에서 파라미터를 써야 할지 쿼리를 써야 할지 정할 때, 무조건적인 규칙은 없음.

일반적으로,

파라미터는 특정 아이디 혹은 이름을 사용하여 조회할 때 사용

쿼리는 우리가 어떤 키워드를 검색하거나 페이지에 필요한 옵션을 전달할 때 사용

### 13.4.1 URL 파라미터

Profile이라는 컴포넌트를 생성한다.

↓ Profile.js

```jsx
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
  const {username} = match.params;
  const profile = data[username];
  if(!profile){
    return <div>존재하지 않는 사용자입니다.</div>;
  }
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

URL 파라미터를 사용할 때는 라우트로 사용되는 컴포넌트에서 받아오는 match라는 객체 안의 params 값을 참조. match 객체 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해 보이는지에 대한 정보가 들어 있음

Profile 컴포넌트를 위한 라우트 정의

↓ App.js

```jsx
// 기존 App.js에 다음 내용 추가

import Profile from './Profile';
<li>
    <Link to="/profile/velopert">velopert 프로필</Link>
</li>
<li>
    <Link to="/profile/gildong">gildong 프로필</Link>
</li>

<Route path="/profile/:username" component={Profile} />
```

### 13.4.2 URL 쿼리

쿼리는 location 객체에 들어있는 search 값에서 조회할 수 있음. location 객체는 라우트로 사용된 컴포넌트에게 props로 전달되며, 웹 애플리케이션의 현재 주소에 대한 정보를 지니고 있음

search 값에서 특정 값을 읽어 오기 위해서는 이 문자열을 객체 형태로 변환 해 주어야 한다.

쿼리 문자열을 객체로 변환할 때는 qs라는 라이브러리를 사용

```jsx
$ yarn add qs
```

↓ About.js를 다음과 같이 수정

```jsx
const About = ({location}) => {
  const query = qs.parse(location.searh, {
    ignoreQueryPrefix: true // 이 설정을 통해 문자열 맨 앞의 ?를 생략한다.
  });
  const showDetail = query.detail === 'true'; // 쿼리의 파싱 결과 값은 문자열입니다.
  return(
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
      {showDetail && <p>detail 값을 true로 설정하셨군요!</p>}
    </div>
  );
};
```

About 컴포넌트에서 [location.search](http://location.search) 값에 있는 detail이 true인지 아닌지에 따라 추가 정보를 보여주는 코드

**※ 쿼리 문자열을 객체로 파싱하는 과정에서 결과 값은 언제나 문자열이라는 점에 주의**

숫자나 논리 자료형을 사용한다고 해서 해당 값이 우리가 원하는 형태로 변환되는 것이 아니라, "1", "true"와 같이 문자열 형태로 받아진다.

→ 숫자를 받아와야 하면 parseInt 함수를 통해 꼭 숫자로 변환, 지금처럼 논리 자료형 값을 사용해야 하는 경우에는 정확히 "true" 문자열이랑 일치하는지 비교

## 13.5 서브 라우트

서브 라우트 : 라우트 내부에 또 라우트를 정의하는 것을 의미

방법 → 라우트로 사용되고 있는 컴포넌트의 내부에 Route 컴포넌트를 또 사용하면 된다.

기존의 App 컴포넌트 → 두 종류의 프로필 링크를 보여줌

프로필 링크를 보여주는 Profiles 라는 라우트 컴포넌트를 따로 만들고, 그 안에서 Profile 컴포넌트를 서브 라우트로 사용하도록 코드를 작성해본다.

↓ Profiles.js

```jsx
import React from 'react';
import { Link, Route } from 'react-router-dom';
import Profile from './Profile';

const Profiles = () => {
  return (
    <div>
      <h3>사용자 목록</h3>
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
        exactrender={() => <div>사용자를 선택해 주세요.</div>}
      />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};

export default Profiles;
```

첫 번째 Route 컴포넌트에는 component 대신 render라는 props를 넣어 준다.

컴포넌트 자체를 전달하는 것이 아니라, 보여 주고 싶은 JSX를 넣어줄 수 있다.

따로 컴포넌트를 만들기 애매한 상황에 사용해도 되고, 컴포넌트에 props를 별도로 넣어주고 싶을때도 사용할 수 있다.

JSX에서 props를 설정할 때 값을 생략하면 자동으로 true로 설정된다.

예를 들어 현재 Profile 컴포넌트의 첫 번째 Route에서 exact={true} 대신 그냥 exact

exact는 exact = {true}와 같은 의미

이제 기존의 App 컴포넌트에 있던 프로필 링크를 지우고, Profiles 컴포넌트를 /profiles 경로에 연결

↓ App.js 를 다음과 같이 수정

```jsx
//다음의 코드를 추가한다.

import Profiles from './Profiles';

<li>
		<Link to="/profiles">프로필</Link>
</li>

<Route path="/profiles" component={Profiles} />
```

## 13.6 리액트 라우터 부가 기능

### 13.6.1 history

history 객체는 라우트로 사용된 컴포넌트에 match, location과 함께 전달되는 props 중 하나로, 이 객체를 통해 컴포넌트 내에 구현하는 메서드에서 라우터 API를 호출할 수 있음.

ex) 특정 버튼을 눌렀을 때 뒤로 거거나, 로그인 후 화면을 전환하거나, 다른 페이지로 이탈하는 것을 방지해야 할 때 history를 활용한다.

HistorySample 이라는 컴포넌트를 작성해보자

↓ HistorySample.js

```jsx
import React, { Component } from 'react';
class HistorySample extends Component {
  //뒤로 가기
  handleGoBack = () => {
    this.props.history.goBack();
  };

  //홈으로 이동
  handleGoHome = () => {
    this.props.history.push('/');
  };

  componentDidMount(){
    //이것을 설정하고 나면 페이지에 변화가 생기려고 할 때마다 정말 나갈 것인지를 질문함
    this.unblock = this.props.history.block('정말 떠나실 건가요?');
  }

  componentWillUnmount(){
    //컴포넌트가 언마운트되면 질문을 멈춤
    if(this.unblock){
      this.unblock();
    }
  }

  render() {
    return(
      <div>
        <button onClick={this.handleGoBack}>뒤로</button>
        <button onClick={this.handleGoHome}>홈으로</button>
      </div>
    );
  }
}

export default HistorySample;
```

HistorySample.js가 보이도록 App.js를 변경해준다.

↓ App.js 변경

```jsx
//다음 코드를 추가한다.

import HistorySample from './HistorySample';

<li>
  <Link to="/history">History 예제</Link>
</li>

<Route path="/history" component={HistorySample} />
```

### 13.6.2 withRouter

- withRouter 함수는 HoC(Higher-order Component)이다.
- 라우트로 사용된 컴포넌트가 아니어도 match, location, history 객체를 접근할 수 있도록 해줌

WithRouterSample 컴포넌트 생성

↓ WithRouterSample.js

```jsx
import React from 'react';
import { withRouter } from 'react-router-dom';
const WithRouterSample = ({location, match, history}) => {
  return(
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
      <button onClick={() => history.push('/')}>홈으로</button>
    </div>
  );
};

export default withRouter(WithRouterSample);
```

withRouter를 사용할 때는 컴포넌트를 내보내 줄 때 함수로 감싸 준다.

JSON.stringify의 두 번째 파라미터와 세 번째 파라미터를 위와 같이 null, 2로 설정해 주면 JSON에 들여쓰기가 적용된 상태로 문자열이 만들어진다.

위의 컴포넌트를 Profiles 컴포넌트에 렌더링하는 코드

↓ Profiles.js

```jsx
// 다음 코드를 추가한다.
import WithRouterSample from './WithRouterSample';

<WithRouterSample />    // div 내의 맨 밑에 추가한다.
```

※ browser에서 Textarea의 우측 하단 모서리를 드래그하면 Textarea의 크기를 조정할 수 있음

→ 실행 화면에서 match 객체를 보면 params가 비어 있음

withRouter를 사용하면 현재 자신을 보여 주고 있는 라우트 컴포넌트(현재 Profiles)를 기준으로 match가 전달.

Profiles를 위한 라우트를 설정할 때는 path="/profiles"라고만 입력했으므로 username 파라미터를 읽어오지 못함

**→ 해결책**

WithRouterSample 컴포넌트를 Profiles에서 지우고 Profile 컴포넌트에 넣으면 match 쪽에 URL 파라미터가 제대로 보일 것이다.

↓ Profile.js

```jsx
// 코드를 다음과 같이 수정
import WithRouterSample from './WithRouterSample';    //추가

<WithRouterSample />   // div 태그 내에 마지막 부분에 추가
```

위와 같이 바꿔주면 params.username을 제대로 보여줌

### 13.6.3 Switch

- Switch 컴포넌트는 여러 Route를 감싸서 그 중 일치하는 단 하나의 라우트만을 렌더링시켜 준다.
- Switch를 사용하면 모든 규칙과 일치하지 않을 때 보여 줄 Not Found 페이지도 구현할 수 있음

↓ App.js 에 Switch문 구현

```jsx
// App.js에 다음과 같이 수정한다.

import { Route, Link, Switch } from 'react-router-dom'; //add

<Switch>
   <Route path="/" component={Home} />
   <Route path={['/about', '/info']} component={About} />
   <Route path="/profiles" component={Profiles} />
   <Route path="/history" component={HistorySample} />
   <Route
      // path를 따로 정의하지 않으면 모든 상황에 렌더링됨
      render={({ location }) => (
        <div>
           <h2>이 페이지지는 존재하지 않습니다:</h2>
           <p>{location.pathname}</p>
        </div>
      )}
    />
</Switch>
```

실행 시, 작성한 문구가 나타난다.

### 13.6.4 NavLink

- NavLink는 Link와 비슷하다. 현재 경로와 Link에서 사용하는 경로가 일치하는 경우, 특정 스타일 혹은 CSS 클래스를 적용할 수 있는 컴포넌트

NavLink에서 링크가 활성화되었을 때의 스타일을 적용할 때는 activeStyle 값을, CSS 클래스를 적용할 때는 activeClassName 값을 props로 넣어주면 된다.

Profiles에서 사용하고 있는 컴포넌트에서 Link 대신 NavLink를 사용하게 하고, 현재 선택되어 있는 경우 검정색 배경에 흰색 글씨로 스타일을 보여 주게끔 코드를 수정

↓ Profiles.js

```jsx
//Profiles.js를 다음과 같이 수정
import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample';

const Profiles = () => {
  const activeStyle = {
    background: 'black',
    color: 'white'
  };
  return (
    <div>
      <h3>사용자 목록</h3>
      <ul>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/velopert">
            velopert
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/gildong">
            gildong
          </NavLink>
        </li>
      </ul>

      <Route
        path="/profiles"
        exactrender={() => <div>사용자를 선택해 주세요.</div>}
      />
      <Route path="/profiles/:username" component={Profile} />
      <WithRouterSample />
    </div>
  );
};

export default Profiles;
```

## 13.7 정리

→ 리액트 라우터를 사용하여 주소 경로에 따라 다양한 페이지를 보여 주는 방법을 알아봄

큰 규모의 프로젝트를 구현하다보면 한 가지 문제 : JS 파일의 크기가 너무 커짐

이를 해결하기 위해, 라우트에 따라 필요한 컴포넌트만 불러오고, 다른 컴포넌트는 다른 페이지를 방문하는 등의 필요한 시점에 불러오면 더 효율적

**→ 이를 구현하는 것이 바로 코드 스플리팅(19장)**

# 14장 : 외부 API를 연동하여 뉴스 뷰어 만들기

## 14.1 비동기 작업의 이해

웹 애플리케이션을 만들다 보면 처리할 때 시간이 걸리는 작업이 있음

웹 애플리케이션에서 서버 쪽 데이터가 필요할 때는 Ajax 기법을 사용하여 서버의 API를 호출함으로써 데이터를 수신. 

따라서 서버의 API를 사용해야 할 때는 네트워크 송수신 과정에서 시간이 걸리기 때문에 작업이 즉시 처리되는 것이 아니라, 응답을 받을 때까지 기다렸다가 전달받은 응답 데이터를 처리함.

→ 이 과정에서 해당 작업을 비동기적으로 처리

※ 만약

작업을 동기적으로 처리한다면 요청이 끝날 때까지 기다리는 동안 중지 상태가 되기 때문에 다른 작업을 할 수 없음. 요청이 끝나야 가능

※ 비동기적으로 처리하게 되면, 웹 애플리케이션이 멈추지 않기 때문에 동시에 여러 가지 요청을 처리할 수도 있고, 기다리는 과정에서 다른 함수도 호출할 수 있음

서버 API를 호출할 때는 setTimeout 함수를 사용하여 특정 작업을 예약할 때.

```jsx
function printMe() {
	console.log('Hello World!');
}
setTimeout(printMe, 3000);
console.log('대기 중...');
```

실행 결과

대기중 ...

Hello World!

setTimeout이 사용되는 시점에서 코드가 3초 동안 멈추는 것이 아니라, 일단 코드가 위부터 아래까지 다 호출되고 3초 뒤에 우리가 지정해 준 printMe가 호출

자바스크립트에서 비동기 작업을 할 때 가장 흔히 사용하는 방법은 콜백 함수를 사용하는 것

위의 printMe 함수를 콜백 함수라고 한다. 

### 14.1.1 콜백 함수

코드를 확인

```jsx
function increase(number, callback){
	setTimeout(() => {
		const result = number + 10;
		if(callback){
			callback(result);
		}
	}, 1000);
}

console.log('작업 시작');
increase(0, result => {
	console.log(result);
	increase(result, result => {
		console.log(result);
		increase(result, result) => {
			console.log(result);
			increase(result, result) => {
				console.log(result);
				console.log('작업 완료');
			});
		});
	});
});
```

실행 결과 ↓

작업 시작

10

20

30

40

작업 완료

위와 같이 콜백 안에 또 콜백을 넣어서 구현할 수 있지만, 너무 여러 번 중첩되기에 코드의 가독성이 나빠진다. 이러한 형태의 코드를 **'콜백 지옥'**이라고 한다. 지양해야 할 형태의 코드

### 14.1.2 Promise

Promise는 콜백 지옥 같은 코드가 형성되지 않게 하는 방안으로 ES6에 도입된 기능.

14.1.1의 예제를 promise를 사용하여 구현한 코드 ↓

```jsx
function increase(number){
	const promise = new Promise((resolve, reject) => {
		// resolve는 성공, reject는 실패
		setTimeout(() => {
			const result = number + 10;
			if (result > 50) {
				//50보다 높으면 에러 발생시키기
				const e = new Error('NumberTooBig');
				return reject(e);
			}
			resolve(result);   //number 값에 +10 후 성공 처리
		}, 1000);
	});
	return promise;
}

increase(0)
	.then(number => {
		//Promise에서 resolve 된 값은 .then을 통해 받아 올 수 있음
		console.log(number);
		return increase(number); //Promise를 flxjsgkaus
	})
	.then(number => {
		// 또 .then으로 처리 가능
		console.log(number);
		return increase(number);
	})
	.then(number => {
		console.log(number);
		return increase(number);
	})
	.then(number => {
		console.log(number);
		return increase(number);
	})
	.then(number => {
		console.log(number);
		return increase(number);
	})
	.catch( e => {
		//도중에 에러가 발생한다면 .catch를 통해 잡을 수 있음
		console.log(e);
	});
```

위와 같이 작업하면 .then을 사용하여 그 다음 작업을 설정하기 때문에 콜백 지옥이 형성되지 않음

### 14.1.3 async/await

async/await는 Promise를 더욱 쉽게 사용할 수 있도록 해 주는 ES2017(ES8) 문법

사용 방법 : 함수의 앞 부분에 async 키워드를 추가하고, 해당 함수 내부에서 Promise의 앞부분에 await 키워드를 사용한다. 이렇게 하면 Promise가 끝날 때까지 기다리고, 결과 값을 특정 변수에 담을 수 있다.

```jsx
function increase(number){
	const promise = new Promise((resolve, reject) => {
		// resolve는 성공, reject는 실패
		setTimeout(() => {
			const result = number + 10;
				if(result > 50) {  //50보다 높으면 에러 발생시키기
					const e = new Error('NumberTooBig');
					return reject(e);
				}
			}, 1000)
		});
	return promise;
}

async function runTasks() {
	try{ //try/catch 구문을 사용하여 에러를 처리한다.
		let result = await increase(0);
		console.log(result);
		result = await increase(result);
		console.log(result);
		result = await increase(result);
		console.log(result);
		result = await increase(result);
		console.log(result);
		result = await increase(result);
		console.log(result);
		result = await increase(result);
		console.log(result);
	}.catch (e) { 
		console.log(e);
	}
}
```

## 14.2 axios 로 API 호출해서 데이터 받아오기

- axios : 현재 가장 많이 사용되고 있는 자바스크립트 HTTP 클라이언트.
- 특징 : HTTP 요청을 Promise 기반으로 처리한다.

프로젝트 생성을 통해 실습

```jsx
$ yarn create react-app news-viewer
$ cd news-viewer
$ yarn add axios
```

Prettier로 코드 스타일을 자동으로 정리하고 싶다면, 프로젝트의 최상위 디렉터리에 .prettierrc 파일을 생성 및 다음 코드 입력

```jsx
{
  "singleQuote" : true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}
```

VS Code 에서 파일 자동 불러오기 기능을 잘 활용하고 싶다면 최상위 디렉터리에서 jsconfig.json 파일을 생성 및 다음과 같은 코드 입력

```jsx
{
  "compilerOptions":{
    "target": "es6"
  }
}
```

↓ App.js

```jsx
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const onClick = () => {
    axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response => {
      setData(response.data);
    });
  };
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly={true} />}
    </div>
  );
}

export default App;
```

위 코드에 async를 적용하면

```jsx
const onClick = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typiode.om/todos/1',
      );
      setData(response.data);
    } catch(e) {
      console.log(e);
    }
  };
```

onClick 함수를 위와 같이 변경

불러오기 버튼을 눌렀을 때 이전과 똑같이 데이터가 잘 불려온다.

## 14.3 newsapi API 키 발급 받기

API 키는 [https://newsapi.org/register 에](https://newsapi.org/register에) 가입하면 발급 받을 수 있다. 

발급 받은 키는 App.js에서 await axios.get(여기);에 넣어주면 된다.

## 14.4 뉴스 뷰어 UI 만들기

```jsx
$ yarn add styled-components
```

src 폴더에 components 폴더 생성 후, NewsItem.js 와 NewsList.js를 생성한다.

News 데이터에는 어떤 필드가 있는지 알아보면

→ title : 제목

→ description: 내용

→ url: 링크

→ urlToImage: 뉴스 이미지

NewsItem 컴포넌트는 article이라는 객체를 props로 통째로 받아 와서 사용한다. NewsItem 컴포넌트를 다음과 같이 작성 ↓

```jsx
import React from 'react';
import styled from 'styled-components';

const NewsItemBlock = styled.div`
  display: flex;
  .thumbnail {
    margin-right: 1rem;
    img{
      display: block;
      width: 160px;
      height: 100px;
      object-fit: cover;
    }
  }
  .contents {
    h2 {
      margin: 0;
      a {
        color: black;
      }
    }
    p{
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }
  & + &{
    margin-top: 3rem;
  }
`;
const NewsItem = ({article}) => {
  const { title, description, url, urlToImage } = article;
  return (
    <NewsItemBlock>
      {urlToImage && (
        <div className="thumbnail">
          <a herf={url} target="_blank" rel="noopener noreferrer">
            <img src={urlToImage} alt="thumbnail" />
          </a>
        </div>
      )}
      <div className="contents">
        <h2>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <p>{description}</p>
      </div>
    </NewsItemBlock>
  );
};

export default NewsItem;
```

### 14.4.2 NewsList 만들기

API를 요청하는 컴포넌트.

지금은 아직 데이터를 불러오지 않고 있으므로, sampleArticle이라는 객체에 미리 예시 데이터를 넣은 후 각 컴포넌트에 전달하여 가짜 내용이 보이도록 구현

↓ componenets/NewsList.js

```jsx
import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px){
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const sampleArticle = {
  title: '제목',
  description: '내용',
  url: 'https://google.com',
  urlToImage: 'https://via.placeholder.com/160',
};

const NewsList = () => {
  return (
    <NewsListBlock>
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
    </NewsListBlock>
  );
};

export default NewsList;
```

App.js에서 위 코드를 렌더링해보자

```jsx
import React, { useState } from 'react';
import NewsList from './components/NewsList';

const App = () => {
  return <NewsList />;
}

export default App;
```