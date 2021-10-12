# 4주차 (9, 10, 11장)

# <9장 : 컴포넌트 스타일링>

이번 주차를 공부하기 위해, 새로운 프로젝트를 생성한다.

기존에 npm이 설치되어있는 관계로

yarn을 사용하지 않고 npm을 사용했다.

```jsx
npm creat react-app stying-react
cd styling-react
npm start
```

→ 프로젝트 생성 완료

## 9.1 가장 흔한 방식, 일반 CSS

→ 프로젝트는 일반 CSS 방식으로 만들어져 있음.

**※ CSS 작성 시, 가장 중요한 점**

→  CSS 클래스를 중복되지 않게 만드는 것

ex) 이름을 지을 때 특별한 규칙을 사용, CSS Selector를 활용

### 9.1.1 이름 짓는 규칙

- 컴포넌트 이름-클래스 ex) App-header
- BEM 네이밍 : CSS 방법론 중 하나로, 이름을 지을 때 일종의 규칙을 준수하여 해당 클래스가 어디에서 어떤 용도로 사용되는지 명확하게 작성하는 방식   ex) .card__title-primary

### 9.1.2 CSS Selector

- CSS 클래스가 특정 클래스 내부에 있는 경우에만 스타일을 적용할 수 있음.

```jsx
.App .logo{
	animaiton: App-logo-spin infinite 20s linear;
	height: 40vmin;
}
```

기존 App.css

```jsx
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

수정 후

```jsx
.App {
  text-align: center;
}

/*.App 안에 들어있는 .logo*/
.App .logo {
  height: 40vmin;
  pointer-events: none;
  animation: App-logo-spin infinite 20s linear;
}

/*.App 안에 들어 있는 header
  header 클래스가 아닌 header 태그 자체에
  스타일을 적용하기 때문에 .을 생략함*/
.App header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

/* .App 안에 들어 있는 a 태그*/
.App a {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

기존 App.js

```jsx
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

수정 후

```jsx
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} className="logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
```

→ 컴포넌트의 최상위 html 요소에는 컴포넌트의 이름으로 클래스 이름을 짓고(.App)

그 내부에서는 소문자를 입력하거나 (.logo), header와 같은 태그를 사용하여 클래스 이름이 불필요한 경우에는 아예 생략 가능. what?

## 9.2 Sass 사용하기

- Sass란?
    
    Syntactically Awesome Style Sheets - 문법적으로 매우 멋진 스타일 시트
    
    CSS 전처리기로 복잡한 작업을 쉽게 할 수 있도록 해 주고, 스타일 코드의 재활용성을 높여줄 뿐만 아니라 코드의 가독성을 높여서 유지 보수를 더욱 쉽게 해준다. 
    
    - 두 가지 확장자 (.scss / .sass)를 지원함. 문법이 꽤 다르다.
    
    ```jsx
    // .sass
    $font-stack: Helvetica, sans-serif
    $primary-color: #333
    
    body
    	font: 100% $font-stack
    	color: $primary-color
    ```
    
    ```jsx
    // .scss
    $font-stack: Helvetica, snas-serif;
    $primary-color: #333;
    
    body {
    	font: 100% $font-stack;
    	color: $primary-color;
    }
    ```
    
    → 차이점
    
    .sass는 중괄호와 세미콜론 사용 X
    
    .scss는 기존 CSS를 사용하는 방식과 문법이 비슷
    
    .sass를 사용해보기 위해서 node-sass 라이브러리를 설치해야함!
    
    이 라이브러리는 Sass를 CSS로 변환해준다.
    
    ```jsx
    npm add node-sass@4.14.1
    ```
    
    설치가 완료되면
    
     SassComponent.scss를 작성해본다
    
    ```jsx
    // 변수 사용하기
    $red: #fa5252;
    $orange: #fd7e14;
    $yellow: #fcc419;
    $green: #40c057;
    $blue: #339af0;
    $indigo: #5c7cfa;
    $violet: #7950f2;
    // 믹스인 만들기(재사용되는 스타일 블록을 함수처럼 사용할 수 있음)
    @mixin square($size){
      $calculated: 32px * $size;
      width: $calculated;
      height: $calculated;
    }
    
    .SassComponent {
      display: flax;
      .box { // 일반 CSS에서는 .SassComponent .box와 마찬가지
        background: red;
        cursor: pointer;
        transition: all 0.3s ease-in;
        &.red {
          // .red 클래스가 .box와 함께 사용되었을 때
          background: $red;
          @include square(1);
        }
        &.orange {
          background: $orange;
          @include square(2);
        }
        &.yellow {
          background: $yellow;
          @include square(3);
        }
        &.green {
          background: $green;
          @include square(4);
        }
        &.blue {
          background: $blue;
          @include square(5);
        }
        &.indigo {
          background: $indigo;
          @include square(6);
        }
        &.violet {
          background: $violet;
          @include square(7);
        }
        &:hover {
          // .box에 마우스를 올렸을 때
          background: black;
        }
      }
    }
    ```
    
    square가 무엇이냐?
    
    그리고 금방 만든 sass stylesheet를 사용하는 sassComponent.js 컴포넌트 파일도 src에 생성한다.
    
    코드는 다음과 같다.
    
    ```jsx
    import React from 'react';
    import './SassComponent.scss';
    
    const SassComponent = () => {
      return (
        <div className="SassComponent">
          <div className="box red" />
          <div className="box orange" />
          <div className="box yellow" />
          <div className="box green" />
          <div className="box blue" />
          <div className="box indigo" />
          <div className="box violet" />
        </div>
      );
    };
    
    export default SassComponent;
    ```
    
    이렇게 작성된 컴포넌트를 App.js에서 보여준다.
    
    이 때 주의할 점 : 작업한 뒤, 개발 서버를 재시작해야 Sass가 성공적으로 적용된다. 
    
    적용을 위한 App.js 코드는 다음과 같다
    
    ```jsx
    import React, { Component } from 'react';
    import SassComponent from './SassComponent';
    
    class App extends Component {
      render() {
        return (
          <div>
            <SassComponent />
          </div>
        );
      }
    }
    
    export default App;
    ```
    
    ![Untitled](./Img/s0.png)
    
    ### 9.2.1 utils 함수 분리하기
    
    Sass 변수 및 믹스인은 다른 파일로 따로 분리하여 작성한 뒤, 필요한 곳에서 쉽게 불러와 사용할 수 있음
    
    src directory에 styles라는 directory를 생성 및 그 안에 utils.scss 파일을 만듦
    
    이후 기존 SassComponenet.scss에 작성했던 변수와 믹스인을 잘라내어 이동시켜보자!
    
    ![Untitled](./Img/s1.png)
    
    새로운 directory를 생성해주었다.
    

해당 내용은 다음과 같다

↓ utils.scss

```jsx
// 변수 사용하기
$red: #fa5252;
$orange: #fd7e14;
$yellow: #fcc419;
$green: #40c057;
$blue: #339af0;
$indigo: #5c7cfa;
$violet: #7950f2;
// 믹스인 만들기(재사용되는 스타일 블록을 함수처럼 사용할 수 있음)
@mixin square($size){
  $calculated: 32px * $size;
  width: $calculated;
  height: $calculated;
}
```

SassComponent.scss에서 utils.scss를 사용하려면 다음 한 줄만 사용하면 된다!

```jsx
@import './styles/utils';
```

![Untitled](./Img/s2.png)

결과는 똑같음을 알 수 있다.

### 9.2.2 sass-loader 설정 커스터마이징하기

※ 필수는 아니지만 해 두면 유용한 기능.

아까 SassComponent에서 utils를 불러올 때 @import './styles/utils'; 의 형태로 불러왔었지만,

프로젝트 directory가 많아져서 구조가 깊어졌을 때! ex) src/components/somefeature.ThisComponenet.scss 등의 경우.. 상위 폴더로 한참 거슬러 올라가야함

→ 웹팩에서 Sass를 처리하는 sass-loader의 설정을 커스터마이징하여 해결할 수 있음

**Why?**

create-react-app으로 만든 프로젝트는 프로젝트 구조의 복잡도를 낮추기 위해 세부 설정이 모두 숨겨져 있다!

→ 커스터마이징 하기 위해서는 프로젝트 디렉터리에서 yarn eject(npm eject) 명령어를 통해 세부 설정을 밖으로 꺼내주어야 한다. 

***방법***

1. Git Commit

```jsx
$ git add .
$ git commit -m "Commit before yarn eject'
```

![Untitled](./Img/s3.png)

npm eject 시도했는데 실패..

결국 일단 npm을 사용하여 yarn을 설치함

![Untitled](./Img/s4.png)

구글링을 통해 알게 된.. 정보에 의하면

![Untitled](./Img/s5.png)

그냥 npm eject 아니고, npm run eject하면 된다고 한다!

실제로 시도해보니 성공.

![Untitled](./Img/s6.png)

완료 시, config 라는 directory 생성 완료됨을 알 수 있다.

![Untitled](./Img/s7.png)

과연 어떤 파일일까. 열어보자.

![Untitled](./Img/s8.png)

으악!

이 중에서 sassRegex라는 키워드를 찾아준다.

![Untitled](./Img/s9.png)

그리고 해당 코드를 다음과 같이 수정해준다.

```jsx
						{
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction
                    ? shouldUseSourceMap
                    : isEnvDevelopment,
                }).concat({
                  loader: require.resolve('sass-loader'),
                  options: {
                    sassOptions: {
                      includePaths: [paths.appSrc + '/styles']
                    },
                    sourceMap: isEnvProduction && shouldUseSourceMap,
                  }
                }),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
```

저장 → 서버를 재시작

- **이 작업을 마친 후** : scss 파일 경로가 어디에 위치하더라도, 상대경로를 입력할 필요 없이 styles directory 기준 절대 경로를 사용하여 불러올 수 있다.

```jsx
@import 'utils.scss';
```

다음과 같이 작성하면 똑같이 utils.scss를 사용할 수 있다. 

scss는 왜 쓰는가?

★ 그럼에도 새 파일을 생성할 때마다 utils.scss를 매번 포함시키는 것도 귀찮으면 다음과 같이 행동

webpack.config.js 파일 open → 위에서 수정했던 sass-loader의 옵션에 있는 data 필드를 다음과 같이 설정

```jsx
						{
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction
                    ? shouldUseSourceMap
                    : isEnvDevelopment,
                }).concat({
                  loader: require.resolve('sass-loader'),
                  options: {
                    sassOptions: {
                      includePaths: [paths.appSrc + '/styles']
                    },
                    sourceMap: isEnvProduction && shouldUseSourceMap,
										
										// 해당 줄 삽입
                    prependData: `@import 'utils';`
                  }
                }),
```

이 과정을 마치면 모든 scss 파일에서 utils.scss를 자동으로 불러오기 때문에, Sass의 맨 윗줄에 있는 import 구문을 지워도 정상적으로 작동한다. 

### 9.2.3 node_modules에서 라이브러리 불러오기

Sass의 장점 중 하나 : 라이브러리를 쉽게 불러와서 사용할 수 있다.

- 라이브러리를 사용하는 가장 기본적인 방법 : @import '../../../node_modules/library/styles'; 처럼 상대 경로를 통해 들어가는 방법
- 이보다 쉬운 방법으로는 : @import '~library/styles'; 처럼 물결 문자를 사용

실습 ↓

```jsx
npm add open-color include-media
```

utils.scss 파일에서 import 부분을 다음과 같이 수정

```jsx
@import '~include-media/dist/include-media';
@import '~open-color/open-color';
```

SassComponent.scss 파일 또한 다음과 같이 수정

```jsx
.SassComponent {
  display: flex;
  background: $oc-gray-2;
  @include media('<768px') {
    background: $oc-gray-9;
  }
//이하 생략
```

npm start

![Untitled](./Img/s10.png)

Error 발생

흠 왜지..

## 9.3 CSS Module

- CSS Module은 CSS를 불러와서 사용할 때 클래스 이름을 고유한 값, 즉

> [파일이름]_[클래스 이름]_[해시값] 형태로 자동으로 만들어서 컴포넌트 스타일 클래스 이름이 중첩되는 현상을 방지해주는 기술이다.
> 

→ v2 이상 버전부터는 따로 설정할 필요 없이 .module.css 확장자로 파일을 저장하기만 하면 CSS Module이 적용된다.

CSSModule.module.css 파일을 src 디렉터리에 생성하여 다음과 같이 작성한다.

 

```jsx
/*자동으로 고유해질 것이므로 흔히 사용되는 단어를 클래스 이름으로 마음대로 사용 가능*/

.wrapper {
	background: black;
	padding: 1rem;
	color: white;
	font-size: 2rem;
}

/*글로벌 CSS를 작성하고 싶다면*/

:global .somthing {
	font-weight: 800;
	color: aqua;
}
```

- **CSS Module을 사용할 때 장점 :**
    - 클래스 이름을 지을 때 그 고유성에 대해 고민하지 않아도 된다. 흔히 사용하는 단어로 이름을 지어도 문제되지 않는다.
    - Why?  우리가 금방 만든 스타일을 직접 불러온 컴포넌트 내부에서만 작동하기 때문이다.
    - If : 특정 클래스가 웹 페이지에서 전역적으로 사용되는 경우라면 :global을 앞에 입력하여 글로벌 CSS임을 명시해 줄 수 있다.

 CSS Module을 사용하는 리액트 컴포넌트를 작성 ↓

```jsx
import React from 'react';
import styles from './CSSModule.module.css';
const CSSModule = () => {
	return (
		<div className={styles.wrapper}>
			안녕하세요, 저는 <span className="something">CSS Module!</span>
		</div>
	);
};

export default CSSModule;
```

※ 고유한 클래스 이름을 사용하려면 클래스를 적용하고 싶은 JSX 엘리먼트에

```jsx
className={styles.[클래스 이름]}
```

형태로 전달해주면 된다.

( :global을 사용하여 전역적으로 선언한 클래스의 경우 그냥 문자열로 넣어주면 된다)

App.js 컴포넌트에서 렌더링 하는 코드 ↓

```jsx
import React, { Componenet } from 'react';
import CSSModule from './CSSModule';

class App extends Component {
	render() {
		return (
			<div>
				<CSSModule />
			</div>
		);
	}
}
export default App;
```

※ CSS Module을 사용한 클래스 이름을 두 개 이상 적용할 때는 다음과 같이 코드를 작성

↓ CSSModule.module.css

```jsx
/*자동으로 고유해질 것이므로 흔히 사용되는 단어를 클래스 이름으로 마음대로 사용 가능*/

.wrapper {
	background: black;
	padding: 1rem;
	color: white;
	font-size: 2rem;
}

**// 해당 부분을 삽입
.inverted {
	color: black;
	background: white;
	border: 1px solid black;
}**

/*글로벌 CSS를 작성하고 싶다면*/

:global .somthing {
	font-weight: 800;
	color: aqua;
}
```

↓ CSSModule.js

```jsx
import React from 'react';
import styles from './CSSModule.module.css';

const CSSModule = () => {
	return (
		<div className={`${styles.wrapper} ${styles.inverted}`}>
			안녕하세요, 저는 <span className="something">CSS Module!</span>
		</div>
	);
};

export default CSSModule;
```

> *` 이 문자는 백틱(Backtic)이라고 부른다.*
> 

### 9.3.1 classnames

classnames를 설치하기 위해 해당 라이브러리를 설치한다.

```jsx
$ npm add classnames
```

classnames의 장점

1. 여러 가지 종류의 파라미터를 조합해 CSS 클래스를 설정할 수 있기 때문에 컴포넌트에서 조건부로 클래스를 설정할 때 매우 편하다. ex) props 값에 따라 다른 스타일을 주기가 쉬워짐
2. 가독성이 높다
3. CSS Module과 함께 사용하면 CSS Module 사용이 훨씬 쉬워진다.

사용하면 좋은 경우

→ CSS Module을 사용할 때 클래스를 여러 개 설정하거나 조건부로 클래스를 설정할 때

classnames의 bind를 사용하면 훨씬 편리하게 작성 가능하다.

### 9.3.2 Sass와 함께 사용하기

- Sass 사용 시, 파일 이름 뒤에 .module.scss 확장자를 사용해 주면 CSS Module로 사용할 수 있음

CSSModule.module.css 파일의 이름을 CSSModule.module.scss로 변경 후 다음과 같이 내용 수정

```jsx
/*자동으로 고유해질 것이므로 흔히 사용되는 단어를 클래스 이름으로 마음대로 사용 가능*/

.wrapper {
	background: black;
	padding: 1rem;
	color: white;
	font-size: 2rem;
	&.inverted {
		//inverted가 .wrapper와 함께 사용되었을 때만 적용
		color: black;
		background: white;
		border: 1px solid black;
	}
}

/*글로벌 CSS를 작성하고 싶다면*/

:global {
	// :glabal {}로 감싸기
	.something {
		font-weight: 800;
		color: aqua;
	}
	// 이곳에 다른 클래스도 작성 가능
}
```

이후 CSSModule.js 상단에서도 .css 파일 대신 .scss 파일을 불러오기

```jsx
import styles from './CSSModule.module.scss';
```

이전과 똑같은 화면이 나타남을 알 수 있음

### 9.3.3 CSS Module이 아닌 파일에서 CSS Module 사용하기

→   CSS Module에서 글로벌 클래스를 정의할 때 :global을 사용했던 것처럼

CSS Module이 아닌 일반 .css/.scss 파일에서도 :local을 사용하여 CSS Module을 사용할 수 있다.

```jsx
:local .wrapper {
	/*스타일*/
}

:local {
	.wrapper {
		/*스타일*/
	}
}
```

## 9.4 styled-components

- CSS-in-JS

> 컴포넌트 스타일링의 또 다른 패러다임으로 자바스크립트 파일 안에 스타일을 선언하는 방식
> 

→ styled-components를 대체할 수 있는 라이브러리로는 현재 emotion이 대표적. 

    작동 방식은 styled-component와 꽤 비슷함

설치

```jsx
npm add styled-components
```

↓ StyledComponent.js를 작성해본다.

```jsx
import React from 'react';
import styled, { css } from 'styled-components';

const Box = styled.div`
	/* props로 넣어 준 값을 직접 전달해 줄 수 있다. */
	background: ${props => props.color || 'blue'};
	padding: 1rem;
	display: flex;
`;

const Button = styled.button`
	backgroud: white;
	color: black;
	border-radius: 4px;
	padding: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	font-size: 1rem;
	font-weight: 600;

	/* & 문자를 사용하여 Sass처럼 자기 자신 선택 가능 */
	&:hover {
		background: rgba(255, 255, 255, 0.9);
	}

	/* 다음 코드는 inverted 값이 true일 때 특정 스타일을 부여해 줍니다. */ 
	${props =>
		props.inverted &&
		css`
			background: none;
			border: 2px solid white;
			color: white;
			&:hover {
				background: white;
				color: black;
			}
		`};
	& + button {
		margin-left: 1rem;
	}
`;

const StyledComponent = () => (
	<Box color="black">
		<Button>안녕하세요</Button>
		<Button inverted={ture}>테두리만</Button>
	</Box>
);

export default StyledComponent;
```

위 컴포넌트를 App 컴포넌트에서 보여주는 코드 

↓ App.js

```jsx
import React, { Component } from 'react';
import StyledComponent from './StyledComponent';

class App extends Component {
	render() {
		return (
			<div>
				<StyledComponenet />
			</div>
		);
	}
}

export default App;
```

<결과 그림> 

![Untitled](./Img/s11.png)

### 9.4.1 Tagged 템플릿 리터럴

→ 앞에서 작성한 문법을 보면 스타일을 작성할 때 `(Backtic)을 사용하여 만든 문자열에 스타일을 넣어주었다. 여기서 사용한 문법을 **Tagged 템플릿 리터럴** 이라고 부른다.

→ 일반 템플릿 리터럴과 다른 점은 템플릿 안에 자바스크립트 객체나 함수를 전달할 때 원본 값을 온전히 추출할 수 있다는 것

→ styled-components는 이러한 속성을 사용하여 styled-components로 만든 컴포넌트의 props를 스타일 쪽에서 쉽게 조회할 수 있도록 해준다. 

### 9.4.2 스타일링된 엘리먼트 만들기

→ styled-components를 사용하여 스타일링 된 엘리먼트를 만들 때는 컴포넌트 파일의 상단에서 styled를 불러오고, styled.태그명을 사용하여 구현한다.

```jsx
import styled from 'styled-components';

const MyComponent = styled.div`
	font-size: 2rem;
`;
```

위와 같이 styled.div 뒤에 Tagged 템플릿 리터럴 문법을 통해 스타일을 넣어주면, 해당 스타일이 적용된 div로 이루어진 react component가 생성된다.

나중에 <MyComponent>Hello<MyComponent>와 같은 형태로 사용 가능함

> styled.button 또는 styled.input 이렇게 뒤에 태그명을 넣어주면 해당 태그에 스타일링 가능
> 

```jsx
// 태그의 타입을 styled 함수의 인자로 전달
const MyInput = styled('input')`
	background: gray;
`
// 아예 컴포넌트 형식의 값을 넣어 줌
const StyledLink = styled(Link)`
	color: blue;
`
```

> → Link 컴포넌트는 나중에 리액트 라우터를 배울 때 사용할 컴포넌트
Component를 styled의 parameter에 넣는 경우에는 해당 component에 className props를 최상위 DOM의 className 값으로 설정하는 작업이 내부적으로 되어있어야 한다.
ex)
> 

```jsx
const Sample = ({ clssName }) => {
	return <div className={className}>Sample</div>;
};

const StyledSample = styled(Sample)`
	font-size: 2rem;
`;
```

### 9.4.3 스타일에서 props 조회하기

- styled-components를 사용하면 스타일 쪽에서 컴포넌트에 전달된 props 값을 참조할 수 있음

↓ 이전에 작성했던 Box 컴포넌트 (StyledComponents.js - Box 컴포넌트)

```jsx
const Box = styled.div`
	/* props로 넣어 준 값을 직접 전달해 줄 수 있음. */
	background: ${props => props.color || blue'};
	padding: 1rem;
	display: flex;
`;
```

위 코드는 background 값에 props를 조회해서 props.color의 값을 사용하게 했고, color 값이 주어지지 않았을 때는 blue를 기본 색상으로 설정함.

JSX에서는

<Box color="black">(...)</Box>

처럼 color 값을 props로 넣어 줄 수 있다.

### 9.4.4 props에 따른 조건부 스타일링

- styled-components에서는 조건부 스타일링을 간단하게 props로도 처리할 수 있다!

앞에서 작성한 Button Component를 다시 확인

↓ StyledComponents.js - Button

```jsx
import styled, { css } from 'styled-components';
/* 단순 변수의 형태가 아니라 여러 줄의 스타일 구문을 조건부로 설정해야 하는 경우에는 css를 불러야함*/

const Button = styled.button`
	backgroud: white;
	color: black;
	border-radius: 4px;
	padding: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	font-size: 1rem;
	font-weight: 600;

	/* & 문자를 사용하여 Sass처럼 자기 자신 선택 가능 */
	&:hover {
		background: rgba(255, 255, 255, 0.9);
	}

	/* 다음 코드는 inverted 값이 true일 때 특정 스타일을 부여해 줍니다. */ 
	${props =>
		props.inverted &&
		css`
			background: none;
			border: 2px solid white;
			color: white;
			&:hover {
				background: white;
				color: black;
			}
		`};
	& + button {
		margin-left: 1rem;
	}
`;
```

이렇게 만든 컴포넌트는 다음과 같이 props를 사용하여 서로 다른 스타일을 적용할 수 있음

```jsx
<Button>안녕하세요</Button>
<Button inverted={true}>테두리만</Button>
```

스타일 코드 여러 줄을 props에 따라 넣어 주어야 할 때는 CSS를 styled-components에서 불러와야 한다. CSS를 사용하지 않고 다음과 같이 바로 문자열을 넣어도 작동하기는 한다.

```jsx
${props => 
	props.inverted &&
	`
		background: none;
		border: 2px solid white;
		color: white;
		&:hover {
			background: white;
			color: black;
		}
`};
```

VS code에서는 하이라이팅이 제대로 이루어지지 않음(그저 문자열로 취급되기 때문)

***치명적 단점 :*** Tagged 템플릿 리터럴이 아니기 때문에 함수를 받아 사용하지 못해 해당 부분에서는 props 값을 사용하지 못함.

→ 여러 줄의 코드에서 props를 참조하지 않는다면 굳이 CSS를 불러와서 사용하지 않아도 됨

→ props를 참조한다면, 반드시 CSS로 감싸 주어서 Tagged 템플릿 리터럴을 사용해 주어야 함

### 9.4.5 반응형 디자인

- 브라우저의 가로 크기에 따라 다른 스타일을 적용하기 위해서는 일반 CSS를 사용할 때아ㅗ 똑같이 media 쿼리(quary)를 사용하면 된다.

↓ Box Component 수정

```jsx
const Box = styled.div`
	/* props로 넣어 준 값을 직접 전달해 줄 수 있다. */
	background: ${props => props.color || 'blue'};
	padding: 1rem;
	display: flex;

/*기본적으로는 가로 크기 1024px 가운데 정렬을 하고 가로 크기가 작아짐에 따라 크기를 줄이고
  768px 미만이 되면 꽉 채운다.*/
	width: 1024px;
	margin: 0 auto;
	@media (max-width: 1024px) {
		width; 768px;
	}
	@media (max-width: 768px) {
		width: 100%;
	}
`;
```

<결과 화면>

![Untitled](./Img/s12.png)

일반 CSS에서 할 때랑 큰 차이가 없다.

여러 컴포넌트에서 반복하기보다 함수화하여 간편하게 사용할 수 있다.

```jsx
import React from 'react';
import styled, { css } from 'styled-components';

const sizes = {
	desktop: 1024,
	tablet: 768
};

// 위에 있는 size 객체에 따라 자동으로 media 쿼리 함수를 만들어 줍니다.

const media = Object.keys(sizes).reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (max-width: ${sizes[label] / 16}em) {
			${css(...args)};
		}
	`;
	return acc;
}, {});

const Box = styled.div`
	/* props로 넣어 준 값을 직접 전달해 줄 수 있다. */
	background: ${props => props.color || 'blue'};
	padding: 1rem;
	display: flex;
	width: 1024px;
	margin: 0 auto;
	${media.desktop`width: 768px;`}
	${media.tablet`width: 100%;`};
`;
```

모듈화한 뒤 여기저기서 불러와 사용하는 방법이 편리하다.

## 9.5 정리

9장은 다양한 리액트 컴포넌트 스타일링 방식을 정리한 장이었다.

# <10장 : 일정 관리 웹 애플리케이션 만들기>

## 10.1 프로젝트 준비하기

### 10.1.1 프로젝트 생성 및 필요한 라이브러리 설치

```jsx
$ npm create react-app todo-app
$ cd todo-app
$ yarn add node-sass@4.14.1 classnames react-icons
```

Sass를 사용하기 위해 node-sass를 설치했고, classnames는 나중에 조건부 스타일링을 좀 더 편하게 하기 위해서 설치, react-icons는 리액트에서 다양하고 예쁜 아이콘을 사용할 수 있는 라이브러리

### 10.1.2 Prettier 설정

프로젝트 최상위 디렉터리에 .prettierrc 파일을 다음과 같이 생성한다

```jsx
{
	"singleQuote": true,
	"semi": true, 
	"useTabs": false,
	"tabWidth": 2,
	"trailingComma": "all",
	"printWidth": 80
}
```

### 10.1.3 index.css 수정

```jsx
body {
	margin: 0;
	padding: 0;
	background: #e9ecef;
}
```

배경 색을 수정해줍니다.

### 10.1.4 App 컴포넌트 초기화

App 컴포넌트 기존의 내용을 모두 삭제합니다.

```jsx
import React from 'react';

const App = () => {
	return <div>Todo App을 만들자!</div>;
};

export default App;
```

![Untitled](./Img/s13.png)

npm start를 하면 위와 같이 표시된다

## 10.2 UI 구성하기

- 컴포넌트 용도 별 설명
    1. TodoTemplate: 화면을 가운데 정렬, 앱 타이틀(일정 관리)을 보여준다. children으로 내부 JSX를 props로 받아 와서 렌더링 해준다.
    2. TodoInsert: 새로운 항목을 입력하고 추가할 수 있는 컴포넌트. state를 통해 인풋의 상태를 관리한다.
    3. TodoListItem: 각 할 일 항목에 대한 정보를 보여 주는 컴포넌트. todo 객체를 props로 받아 와서 상태에 따라 다른 스타일의 UI를 보여 줍니다.
    4. TodoList: todos 배열을 props로 받아 온 후, 이를 배열 내장 함수 map를 사용해서 여러개의 TodoListItem 컴포넌트로 변환하여 보여 줍니다.

→ 위 네 개의 컴포넌트는 src 폴더에 components라는 폴더를 생성하여 저장한다. 관습이기 때문!

### 10.2.1 TodoTemplate 만들기

→ src 폴더에 components 폴더 생성 후 TodoTemplate.js와 TodoTemplate.scss파일을 생성

```jsx
/*TodoTemplate.js*/
import React from 'react';
import './TodoTemplate.scss';

const TodoTemplate = ({ children }) => {
	return (
		<div className="TodoTemplate">
			<div className="app-title">일정 관리</div>
			<div className="content">{children}</div>
		</div>
	);
};

export default TodoTemplate;
```

↓ App.js

```jsx
import React from 'react';
import TodoTemplate from './components/TodoTemplate';

const App = () => {
	return <TodoTemplate>Todo App을 만들자!</TodoTemplate>;
};

export default App;
```

※ 닫혀 있는 파일에도 자동 완성이 제대로 작동하려면 프로젝트 최상위 디렉터리에 jsconfig.json 파일을 만들어 주어야 한다.

작성 후 ctrl + space를 누르면 

```jsx
{
  "compilerOptions": {
    "target": "es6"
  }
}
```

해당 내용이 자동으로 떠서 Enter를 눌러주면 입력이 된다.

↓ TodoTemplate.scss

```jsx
.TodoTemplate{
  width: 512px;
  // width가 주어진 상태에서 좌우 중앙 정렬
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
  border-radius: 4px;
  overflow: hidden;

  .app-title {
    background: #22b8cf;
    color: white;
    height: 4rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content{
    background: white;
  }
}
```

![Untitled](./Img/s14.png)

### 10.2.2 TodoInsert 만들기

↓ TodoInsert.js

```jsx
import React from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = () => {
    return (
      <from className="TodoInsert">
        <input placeholder="할 일을 입력하세요" />
        <button type="submit">
          <MdAdd/>
        </button>
      </from>
    );
};

export default TodoInsert;
```

react-icons를 사용하였다. 

[https://react-icons.netlify.com/#/icons/md](https://react-icons.netlify.com/#/icons/md) 페이지에 들어가면 수많은 아이콘들이 존재하고 그 중에 선택해서 사용하면 된다. 

> import { 아이콘 이름 } from 'react-icons/md';
> 

↓ App.js

```jsx
import React from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';

const App = () => {
  return (
    <TodoTemplate>
      <TodoInsert />
    </TodoTemplate>
  );
};

export default App;
```

결과 화면은 다음과 같다

![Untitled](./Img/s15.png)

이를 스타일링 하면

↓ TodoInsert.scss

```jsx
.TodoInsert {
  display: flex;
  background: #495057;
  input {
    // 기본 스타일 초기화
    background: none;
    outline: none;
    border: none;
    padding: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: white;
    &::placeholder{
      color: #dee2e6;
    }
    // 버튼을 제외한 영역을 모두 차지하기
    flex: 1;
  }
  button {
    // 기본 스타일 초기화
    background: none;
    outline: none;
    border: none;
    background: #868e96;
    color: white;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.1s background ease-in;
    &:hover {
      background: #adb5bd;
    }
  }
}
```

스타일링이 완료되면 다음과 같은 화면을 볼 수 있다

![Untitled](./Img/s16.png)

### 10.2.3 TodoListltem과 TodoList 만들기

TodoListItem.js와 TodoListItem.scss가 필요하다.

↓ TodoListItem.js

```jsx
import React from 'react';
import {
  MdCheckBoxOutLineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import './todoListItem.scss';

const TodoListItem = () => {
  return (
    <div className="TodoListItem">
      <div className="checkbox">
        <MdCheckBoxOutLineBlank />
        <div className="text">할 일</div>
      </div>
      <div className="remove">
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;
```

↓ TodoList.js

```jsx
import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = () => {
  return (
    <div className="TodoList">
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
    </div>
  );
};

export default TodoList;
```

↓ App.js

```jsx
import React from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList />
    </TodoTemplate>
  );
};

export default App;
```

![Untitled](./Img/s17.png)

styling은 미완료 된 상태 (네모 박스 오타로 인해 □가 화면에 나오지 않음)

↓ TodoList.scss

```jsx
.TodoList{
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
}
```

↓ TodoListItem.scss

```jsx
.TodoListItem {
  padding: 1rem;
  display: flex;
  align-items: center;    // 세로 중앙 정렬
  &:nth-child(even){
    background: #f8f9fa;
  }
  .checkbox {
    cursor: pointer;
    flex: 1; // 차지할 수 있는 영역은 모두 차지
    display: flex;
    align-items: center; // 세로 중앙 정렬
    svg {
      // 아이콘
      font-size: 1.5rem;
    }
    .text {
      margin-left: 0.5rem;
      flex: 1; // 차지할 수 있는 영역 모두 차지
    }
    // 체크되었을 때 보여 줄 스타일
    &.checked {
      svg {
        color: #22b8cf;
      }
      .text{
        color: #adb5bd;
        text-decoration: line-through;
      }
    }
  }
  .remove {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: #ff6b6b;
    cursor: pointer;
    &:hover {
      color: #ff8787;
    }
  }

  //엘리먼트 사이사이에 테두리를 넣어 줌
  & + & {
    border-top: 1px solid #dee2e6;
  }
}
```

여기까지 작성하고 화면을 확인해보면 다음과 같다. 

![Untitled](./Img/s18.png)

스타일링이 완료된 화면이다.

## 10.3 기능 구현하기

### 10.3.1 App에서 todos 상태 사용하기

일정 항목에 대한 상태들은 모두 App Component에서 관리한다.

App에서 useState를 사용하여 todos라는 상태를 정의하고, todos를 TodoList의 props로 전달

```jsx
/*App.js를 다음과 같이 수정*/
import React, { useState } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([{
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링해 보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    },
  ]);
  
  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList todos={todos}/>
    </TodoTemplate>
  );
};

export default App;
```

todos 배열 안에 들어 있는 객체에는 각 항목의 고유 id, 내용, 완료 여부를 알려주는 값이 포함되어 있다. 이 배열은 TodoList에 props로 전달된다.

TodoList에서 이 값을 받아 온 후 TodoItem으로 변환하여 렌더링 하도록 설정해야 한다.

↓ TodoList.js를 다음과 같이 변환

```jsx
import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ( { todos } ) => {
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default TodoList;
```

props로 받아온 todos배열

내장 함수 map을 통해 TodoListItem으로 이루어진 배열로 변환하여 렌더링했다.

! map을 사용하여 component로 변환할 때는 key props를 전달해주어야 하므로, key값은 각 항목마다 가지고 있는 고윳값인 id를 넣어주고, todo 데이터는 통째로 props로 전달해준다. 

※ 여러 종류의 값을 전달해야 하는 경우에는 객체로 통째로 전달하는 편이 나중에 성능 최적화를 할 때 편리하다.

↓ TodoListItem.js 를 다음과 같이 수정하여, TodoListItem에서 받아온 todo값에 따라 UI를 보여줄 수 있도록 수정해보자! (조건부 스타일링을 위해 classnames를 사용)

```jsx
import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo }) => {
  const { text, checked } = todo;
  return (
    <div className="TodoListItem">
      <div className={cn("checkbox", { checked })}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div className="remove">
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;
```

렌더링 시, 다음과 같은 화면을 볼 수 있다

![Untitled](./Img/s19.png)

### 10.3.2 항목 추가 기능 구현하기

- TodoInsert 컴포넌트에서 인풋에 입력하는 값을 관리할 수 있도록 useState를 사용하여 value라는 상태를 정의한다
- Input에 넣어줄 onChange 함수도 작성해주고, 이 과정에서 컴포넌트가 rerendering 될 때마다 함수를 새로 만드는 것이 아니라, 한 번 함수를 만들고 재사용할 수 있도록 useCallback Hook을 사용

↓ TodoInsert.js

```jsx
import React, {useState, useCallback} from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = () => {
  const [value, setValue] = useState('');
  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);
  return (
    <from className="TodoInsert">
      <input placeholder="할 일을 입력하세요" 
      value={value}
      onChange={onChange}/>
      <button type="submit">
        <MdAdd/>
      </button>
    </from>
  );
};

export default TodoInsert;
```

위와 같이 코드를 수정 후 Input에 text를 입력하면 오류가 발생하지 않고 텍스트 입력이 잘 됨을 확인할 수 있다. 

![Untitled](./Img/s20.png)

### 10.3.2.2 리액트 개발자 도구

![Untitled](./Img/s21.png)

Chrome 웹스토어에서 React Developer Tools를 검색하여 설치하고

![Untitled](./Img/s22.png)

components에서 TodoInsert를 검색 및 선택하면 Hooks의 State 부분에도 Input을 수정했을 때 같은 값이 잘 들어감을 확인할 수 있다. 

### 10.3.2.3 todos 배열에 새 객체 추가하기

- onInsert

역할 : App 컴포넌트에서 todos 배열에 새 객체를 추가한다. 

→ 새로운 객체를 만들 때마다 id 값에 1씩 더해주어야 한다. id 값은 useRef를 사용하여 관리한다. 

why? id값은 렌더링되는 정보가 아니기 때문에, 이 값이 바뀐다고 해서 컴포넌트가 리렌더링될 필요가 없고, 단순히 새로운 항목을 만들 때 참조되는 값일 뿐이다. 

→ onInsert 함수는 컴포넌트의 성능을 아낄 수 있도록 useCallback으로 감싸 준다.

**props로 전달해야 할 함수를 만들 때는 useCallback을 사용하여 함수를 감싸는 것을 습관화**

onInsert 함수를 만든 뒤에는 해당 함수를 TodoInsert 컴포넌트의 props로 설정

↓ App.js

```jsx
import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([{
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링해 보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    },
  ]);

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.currrent += 1;  // nextId 1씩 더하기
    },
    [todos],
  )
  
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos}/>
    </TodoTemplate>
  );
};

export default App;
```

### 10.3.2.4 TodoInsert에서 onSubmit 이벤트 설정하기

+버튼 클릭 시 발생할 이벤트를 설정하기 위해, onInsert 함수에 현재 useState를 통해 관리하고 있는value 값을 파라미터로 넣어서 호출한다

↓ TodoInsert.js

```jsx
import React, {useState, useCallback} from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');
  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    e => {
      onInsert(value);
      setValue(''); // value 값 초기화

      // submit 이벤트는 브라우저에서 새로고침을 발생시키고, 이를 방지하기 위해 다음 함수를 호출
      e.preventDefault();
    },
    [onInsert, value],
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input placeholder="할 일을 입력하세요" 
      value={value}
      onChange={onChange}/>
      <button type="submit">
        <MdAdd/>
      </button>
    </form>
  );
};

export default TodoInsert;
```

![Untitled](./Img/s23.png)

onSubmit 대신에 버튼에 onClick 이벤트로도 처리가 가능하다!

```jsx
const onClick = useCallback(
	() => {
		onInsert(value);
		setValue('');  //value 값 초기화
	},
	[onInsert, value],
);

return (
	<form className="TodoInsert">
		<input
			placeholder="할 일을 입력하세요"
			value={value}
			onChange={onChange}
		/>
		<button onClick={onClick}>
			<MdAdd />
		</button>
	</form>
);
```

기능은 위와 같이 동작한다.

### 10.3.3 지우기 기능 구현하기

react component에서 배열의 불변성을 지키면서 배열 원소를 제거해야 할 경우, 배열 내장 함수인 filter를 사용하면 매우 간편하다.

### 10.3.3.1 배열 내장 함수 filter

- filter 함수는 기존의 배열은 그대로 둔 상태에서 특정 조건을 만족하는 원소들만 따로 추출하여 새로운 배열을 만들어준다.
- filter 함수에는 조건을 확인해주는 함수를 파라미터로 넣어주어야 한다.
- 파라미터로 넣는 함수는 true 혹은 false 값을 반환해야 하고, true를 반환할 때만 새로운 배열에 포함된다.

### 10.3.3.2 todos 배열에서 id로 항목 지우기

→ filter 함수를 사용하여 onRemove 함수를 작성해보기

: App component에 id를 parameter로 받아와, 같은 id를 가진 항목을 todos 배열에서 지우는 함수

(작성 후, TodoList의 props로 설정하기)

```jsx
/*App.js*/

(...)
const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos],
  );
  
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove}/>
    </TodoTemplate>
  );
```

### 10.3.3.3 TodoListItem에서 삭제 함수 호출하기

TodoListItem에서 만든 onRemove 함수를 사용하려면 TodoList 컴포넌트를 거쳐야 함

props로 받아온 onRemove 함수를 TodoListItem에 그대로 전달!

↓ TodoList.js

```jsx
import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ( { todos } ) => {
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoListItem todo={todo} key={todo.id} **onRemove={onRemove}** />
      ))}
    </div>
  );
};

export default TodoList;
```

삭제 버튼 클릭 시 TodoListItem에서 onRemove 함수에 현재 자신이 가지고 있는 id를 넣어서 삭제 함수를 호출하도록 설정

↓ TodoListItem.js

```jsx
import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, **onRemove** }) => {
  const { **id**, text, checked } = todo;
  return (
    <div className="TodoListItem">
      <div className={cn("checkbox", { checked })}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div className="remove" **onClick={() => onRemove(id)}**>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;
```

여기까지 완료 한 후, 실행시키면 항목이 삭제됨을 볼 수 있음

![Untitled](./Img/s24.png)

### 10.3.4 수정 기능

onToggle이라는 함수를 App에 만들고 해당 함수를 TodoList 컴포넌트의 props로 넣어준 뒤, TodoList를 통해 TodoListItem으로 전달해주면 된다.

↓ App.js

```jsx
const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo,
       ),
      );
    },
    [todos],
  );
  
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} **onToggle={onToggle}**/>
    </TodoTemplate>
  );
```

※ map의 역할 : 배열을 전체적으로 새로운 형태로 변환하여 새로운 배열을 생성해야 할 때 사용

- 지금은 하나의 원소만 수정하는데 map을 사용한 이유 :
    - onToggle에 삼항 연산자가 사용된다. todo.id와 현재 parameter 값이 같으면, 우리가 정한 규칙대로 새로운 객체를 생성하지만, id 값이 다르면 변화를 주지 않고 처음 받아왔던 상태 그대로 반환한다. 때문에 map을 사용하여 만든 배열에서 변화가 필요한 원소만 업데이트 되고 나머지는 그대로 남아있는다.

### 10.3.4.2 TodoListItem에서 토글 함수 호출하기

이제 TodoList를 TodoListItem에 전달하기

↓ TodoList.js

```jsx
import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ( { todos, onRemove, **onToggle** } ) => {
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} **onToggle={onToggle}** />
      ))}
    </div>
  );
};

export default TodoList;
```

↓ TodoListItem.js

```jsx
import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, **onToggle** }) => {
  const { id, text, checked } = todo;
  return (
    <div className="TodoListItem">
      <div className={cn("checkbox", { checked })} **onClick={()=> onToggle(id)}**>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div className="remove" onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;
```

여기까지 완료하면 체크박스의 상태를 수정할 수 있게 된다.

![Untitled](./Img/s25.png)

## 10.4 정리

소규모 프로젝트이기 때문에 따로 컴포넌트 리렌더링 최적화 작업을 하지 않아도 정상적으로 작동하지만, 일정 항목이 매우 많이 생긴다면 새로운 항목을 추가하거나 기존 항목을 삭제 및 토글할 때 지연이 발생할 수 있음

더욱 효율적인 사용을 위해서는 불필요한 리렌더링을 방지하는 것이 중요! → 11장

---

# 11장 : 컴포넌트 성능 최적화

## 11.1 많은 데이터 렌더링 하기

많은 데이터를 생상하는 함수를 생성하여 useState의 기본 값에 넣어주면 수많은 데이터가 입력되기 때문에, 기존보다 실행 속도가 느려지게 된다. 

## 11.2 크롬 개발자 도구를 통한 성능 모니터링

느려졌다는 느낌 X

정확히 몇 초가 걸리는지 확인해야 한다.

크롬 개발자 도구의 performance 탭을 사용하여 측정을 하면된다.

크롬 개발자 도구의 performance 탭을 열면 녹화 버튼이 나타나는데, 녹화 버튼을 누르고 측정하고자 하는 동작을 실행한 다음, Stop 버튼을 누르면 분석 결과가 나타난다.

성능 분석 결과에 나타난 Timings를 열어보면 각 시간대에 컴포넌트의 어떤 작업이 처리되었는지 확인이 가능하다.

(직접 해보기)

![Untitled](./Img/s26.png)

## 11.3 느려지는 원인 분석

컴포넌트는 다음과 같은 상황에서 리렌더링이 발생한다.

1. 자신이 전달 받은 props가 변경될 때
2. 자신의 state가 바뀔 때
3. 부모 컴포넌트가 리렌더링될 때
4. forceUpdate함수가 실행될 때

***→ 불필요한 리렌더링이 발생할 때 이를 방지함으로써 컴포넌트 리렌더링 성능을 최적화 한다!***

## 11.4 React.memo를 사용하여 컴포넌트 성능 최적화

컴포넌트의 리렌더링을 방지하기 위해

- shouldComponentUpdate  라이프 사이클 메서드를 사용하면 된다.

**But**, 함수형 컴포넌트에서는 라이프 사이클 메서드를 사용할 수 없음.

대신 **React.memo**라는 함수를 사용함

사용법 매우 간단 : 컴포넌트 생성 후 감싸주기만 하면 된다.

```jsx
export default React.memo(TodoListItem);
```

이 작업을 마치면 TodoListItem 컴포넌트는 todo, onRemove, onToggle이 바뀌지 않으면 리렌더링을 하지 않는다.

## 11.5 onToggle, onRemove 함수가 바뀌지 않게 하기

React.memo를 사용하여 최적화가 완료되는 것은 아님!

현재 todos 배열이 업데이트 되면 onRemove와 onToggle 함수도 새롭게 바뀐다.

→ 배열 상태를 업데이트하는 과정에서 최신 상태의 todos를 참조하기 때문에 todos배열이 바뀔 때마다 함수가 새로 만들어진다. 

위 상황을 방지하기 위한 두 가지 방법

1. **useState의 함수형 업데이트 기능을 사용하는 것**
2. **useReducer를 사용하기**

### 11.5.1 useState의 함수형 업데이트

idea: setTodos를 사용할 때, 새로운 상태를 파라미터로 넣는 대신, 상태 업데이트를 어떻게 할 것인지에 대한 업데이트 함수를 넣을 수 있음 → 함수형 업데이트

ex)

```jsx
const [number, setNumber] = useState(0);
//prevNumbers는 현재 number 값을 가리킨다.
const onIncrease = useCallback(
	() => setNumber(prevNumber => prevNumber + 1),
	[],
);
```

setNumber(number + 1)이 아닌 함수를 넣어준다.

onToggle, onRemove 함수에서 useState의 함수형 업데이트를 사용한 예시

↓ App.js

```jsx
import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos(){
  const array = [];
  for (let i = 1; i <= 2500; i++){
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);
 
  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(**todos =>** todos.concat(todo));
      nextId.currrent += 1;  // nextId 1씩 더하기
    },[]);

  const onRemove = useCallback(
    id => {
      setTodos(**todos =>** todos.filter(todo => todo.id !== id));
    },[]);

  const onToggle = useCallback(
    id => {
      setTodos(**todos =>**
        todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo,
       ),
      );
    },[]);
  
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
};

export default App;
```

setTodos를 사용할 때 앞에 todos⇒ 만 넣어주면 된다.

↓ 성능 checking

![Untitled](./Img/s27.png)

기존 1.7초 ⇒ 현재 0.39초

성능이 향상되었음을 알 수 있다!

### 11.5.2 useReducer 사용하기

- useState의 함수형 업데이트를 사용해도 최적화가 가능하지만, useReducer를 사용해도 최적화가 가능하다.

↓ 사용 예제 (App.js)

```jsx
import React, { useReducer, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos(){
  const array = [];
  for (let i = 1; i <= 2500; i++){
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

//todoReducer 사용
function todoReducer(todos, action){
  switch(action.type){
    case 'INSERT': //새로 추가
    // {type: "INSERT", todo: {id: 1, text: 'todo', checked: false}}
      return todos.concat(action.todo);
    case 'REMOVE':  //제거
    // {type: 'REMOVE', id: 1}
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE':  // 토글
    //{type: 'REMOVE;, id: 1}
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo, );
    default:
      return todos;
  }
}
const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  // ([{
  //     id: 1,
  //     text: '리액트의 기초 알아보기',
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: '컴포넌트 스타일링해 보기',
  //     checked: true,
  //   },
  //   {
  //     id: 3,
  //     text: '일정 관리 앱 만들어 보기',
  //     checked: false,
  //   },
  // ]);

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      dispatch({ type: 'INSERT', todo});
      nextId.currrent += 1;  // nextId 1씩 더하기
    },[]);

  const onRemove = useCallback(
    id => {
      dispatch({ type: 'REMOVE', id});
    },[]);

  const onToggle = useCallback(
    id => {
      dispatch({type: 'TOGGLE', id});
    },[]);
  
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
};

export default App;
```

todoReducer를 생성해주고 useState 대신 useReducer와 dispatch를 사용한다.

useReducer를 사용할 때는 원래 두 번째 파라미터에 초기 상태를 넣어주어야 함

지금은 그 대신 두번째 파라미터에 undefined를 넣고, 세 번째 파라미터에

초기상태를 만들어주는 함수인 createBulkTodos를 넣어줌

⇒ 처음 렌더링 될 때에만 createBulkTodos 함수가 호출된다

단점 : 기존 코드를 많이 고쳐야 한다

장점 : 상태를 업데이트 하는 로직을 모아 컴포넌트 밖에 둘 수 있다는 장점

useState의 함수형 업데이트와 useReducer 두 가지 방법의 성능은 비슷하기 때문에 취향껏 사용!

## 11.6 불변성의 중요성

- 불변성을 지킨다 : 기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어내는 것

불변성이 지켜지지 않으면 객체 내부의 값이 새로워져도 바뀐 것을 감지하지 못한다.

⇒ React.memo에서 서로 비교하여 최적화 하지 못하게 됨.

※ 전개 연산자(... 문법)을 사용하여 객체나 배열 내부의 값을 복사할 때에는 shallow copy 얕은 복사를 한다. ⇒ 가장 바깥쪽에 있는 값만 복사됨.

내부의 값이 객체 혹은 배열이라면 내부의 값 또한 따로 복사해주어야 한다.

만약 객체 안에 있는 객체라면 불변성을 지키면서 새 값을 할당해야한다.

```jsx
const nextComplexObject = {
	...complexObject,
	objectInside: {
		...complexObject.objectInside,
		enabled: false
	}
};
console.log(complexObject === nextComplexObject); //false
console.log(complexObject.objectInside === nextComplexObject.objectInside);  //false
```

배열 혹은 객체의 구조가 정말 복잡해지면 불변성을 유지하며 업데이트 하는 것도 매우 까다로워지는데, 이렇게 복잡한 상황일 경우, immer라는 라이브러리의 도움을 받으면 편하게 작업할 수 있다!

immer는 다음장에.

## 11.7 TodoList 컴포넌트 최적화하기

※ 리스트에 관련된 컴포넌트 최적화 시, 리스트 내부에서 사용하는 컴포넌트도 최적화 해야 하고, 리스트로 사용되는 컴포넌트 자체도 최적화 해 주는 것이 좋다. 

↓ TodoList.js를 다음과 같이 수정

```jsx
(...)
export default React.memo(TodoList);
```

위와 같이 최적화 코드를 입력했다고 해서 프로젝트 성능이 향상되었을까??

- 정답
    
    X
    
- 이유
    
    TodoList의 부모 컴포넌트인 App 컴포넌트가 리렌더링되는 유일한 이유 : todos 배열이 업데이트 되기 때문
    
    현재 상황에서는 TodoList 컴포넌트에 불필요한 리렌더링이 발생하지 않는 상황이기 때문에 지금 당장 영향을 미치지는 않음
    
    추후 App 컴포넌트에 다른 state가 추가되어 해당 값들이 업데이트 될 때는 TodoList 컴포넌트가 불필요한 렌더링을 할 수 있게 되는데 이 때를 대비하여 미리 최적화 한 것.
    

## 11.8 react-virtualized를 사용한 렌더링 최적화

- 이 방법을 사용하면 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 크기만 차지하게끔 바꿀 수 있다.
- 스크롤 되어 컴포넌트가 보이게 되면, 자연스럽게 렌더링 시키는 방법!

### 11.8.1 최적화 준비

```jsx
$ yarn add react-virtualized
```

최적화를 수행하기 위해 가장 먼저 해야 하는 작업!

⇒ 각 항목의 실제 크기를 px 단위로 알아내는 것

(실제 CSS를 확인하여 직접 계산해도 OK, But 개발자 도구로 확인하는 것이 훨씬 편함)

- 크기를 알아낼 때 첫 번째 항목을 활용하면 된다?
    
    X
    
    첫 번째 항목은 테두리가 없기 때문에, 테두리가 포함 된 두 번째 항목을 확인하는 것이 좋습니다.
    

### 11.8.2 TodoList 수정

크기는 가로 512px, 세로 57px이었습니다.

TodoList.js를 수정합니다.

```jsx
import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ( { todos, onRemove, onToggle } ) => {
  const rowRenderer = useCallback(
    ({index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos],
  );

  return (
    <List
      className="TodoList"
      width={512}  // 전체 크기
      height={513}  // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} //배열
      style={{ outline: 'none'}} // List에 기본 적용되는 outline 스타일 제거
     /> 
  );
};

export default React.memo(TodoList);
```

List 컴포넌트를 사용하기 위해 rowRenderer 함수를 새로 작성

기능 : react-virtualized의 List 컴포넌트에서 각 TodoItem을 렌더링할 때 사용하며, 이 함수를 List 컴포넌트의 props로 설정해 주어야 함 / 이 함수는 파라미터에 index, key, style 값을 객체로 받아와서 사용한다.

List 컴포넌트를 사용할 때에는 해당 리스트의 전체 크기와 각 항목의 높이, 각 항목을 렌더링할 때 사용해야 하는 함수, 그리고 배열을 props로 넣어주어야 한다.

컴포넌트가 전달받은 props를 사용하여 자동으로 최적화 해준다.

### 11.8.3 TodoListItem 수정

위의 TodoList를 저장하고 나면 스타일이 깨져서 나타난다

→ 이를 해결하기 위해 다음과 같이 TodoListItem.js를 수정해준다.

```jsx
import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
  const { id, text, checked } = todo;
  return (
    <div className="TodoListItem-virtualized" style={style}>
      <div className="TodoListItem">
        <div className={cn("checkbox", { checked })} onClick={()=> onToggle(id)}>
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </div>
    </div>
  );
};

export default React.memo(
  TodoListItem,
  (prevProps, nextProps) => prevProps.todo === nextProps.todo,
);
```

render 함수에서 기존에 보여주던 내용을 div로 한 번 감싸고

해당 div에는 classname을 todoListItem-virtualized라고 설정

props로 받아온 style을 적용시킨다.

TodoListItem-virtualized 클래스를 만든 것은 컴포넌트 사이사이에 테두리를 제대로 쳐 주고, 홀수 번째/짝수 번째 항목에 다른 배경 색상을 설정하기 위해서이다. 

TodoListItem의 스타일 파일에서 최하단에 있던 & + &를 사용하여 .TodoListItem 사이사이에 테두리를 설정했던 코드와 &:nth-child(even)을 사용하여 다른 배경 색상을 주는 코드를 지우고, 코드 최상단에 다음 코드를 삽입한다.

↓ TodoListItem.scss

```jsx
.TodoListItem-virtualized {
  & + & {
    border-top: 1px solid #dee2e6;
  }
  &:nth-child(even){
    background: #f8f9fa;
  }
}
```

이제 렌더링하면

![Untitled](./Img/s28.png)

다음과 같이 나타나고,

성능을 측정하면

![Untitled](./Img/s29.png)

ms초 단위로 줄며 훨씬 성능이 향상되었음을 알 수 있다.

## 11.9 정리

이 장에서는 리액트 어플리케이션에 많은 데이터를 렌더링하는 리스트를 만들어 지연을 유발 시키고 이를 해결하는 방법을 알아보았다.

리액트 어플리케이션의 렌더링은 기본적으로 빠르기 때문에 최적화 작업에 너무 스트레스를 받거나 모든 컴포넌트에 일일이 React.memo를 덧붙여 줄 필요는 없지만, 

업데이트가 자주 발생하고 항목이 100개 이상이면 꼭 최적화 해주는 것이 향상된 성능의 어플리케이션 완성에 도움이 될 것이다!!