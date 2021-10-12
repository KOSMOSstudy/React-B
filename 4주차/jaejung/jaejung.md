# 4주차 React 스터디 정리

| 장   | 제목                             |
| ---- | -------------------------------- |
| 9장  | 컴포넌트 스타일링                |
| 10장 | 일정 관리 웹 어플리케이션 만들기 |
| 11장 | 컴포넌트 성능 최적화             |

## **9장**

리액트에서 컴포넌트를 스타일링할 때는 다양한 방식을 사용할 수 있다. 

어떠한 방식이 있는지 알아보고 자주 사용하는 방식을 하나하나 사용해 보자 이 장에서 알아볼 
스타일링은 아래와 같다.

- 일반 css : 컴포넌트를 스타일링하는 가장 기본적인 방식이다.
- Sass: 자주 사용되는 css 전처리기중 하나로 확장된 css 문법을 사용하여 css코드를 더욱 쉽게 작성할 수 있도록 해준다.
- CSS Module: 스타일을 작성할 대 css클래스의 고유한 이름을 자동으로 생성해주는 옵션이다.
- styled-components: 스타일을 자바 스크립트 파일에 내장시키는 방식으로 스타일을 작성함과 동시에 적용된 컴포넌트를 만들 수 있게 해준다.

### **9.1 가장 흔한 방식, 일반 CSS**

CSS를 작성할 때 가장 중요한 점은 CSS 클래스를 중복되지 않게 만드는 것이다.

**중복되는 것을 방지하는 방법:**

1⇒ 이름을 지을 때 특별한 규칙을 사용하여 짓기

2. CSS selector를 활용하기

### 이름 짓는 규칙

컴포넌트 이름-클래스 형태로 지어 중복되는 것을 방지할 수 있다.
비슷한 방식으로 `BEM 네이밍`이라는 방식도 있는데 

이름을 지을 때 일종의 규칙을 준수하여 해당 클래스가 어디에서 어떤 용도로 사용되는지 
명확하게 작성하는 방식이다. ex) .card_title-primary

### CSS Selector

CSS Selector를 사용하면 CSS 클래스가 특정 클래스 내부에 있는 경우에만 스타일을 적용할 수 있다.

### **9.2 Sass 사용하기**

`Sass`: CSS 전처리기로 복잡한 작업을 쉽게 할 수 있도록 해주고, 
스타일 코드의 재활용성을 높여 줄 뿐만 아니라 
코드의 가독성을 높여서 유지보수를 더욱 쉽게 해준다.

Sass에서는 두 가지 확장자 .scss 와 .sass를 지원한다.
두 개의 주요 차이점은 .sass 확장자는 중괄호({})와 세미콜론(;)을 사용하지 않는것!

> 설치
**$npm add node-sass**
> 

**SassComponent.scss 코드**

```jsx
//변수 사용하기
$red: #fa5252;
$orange: #fd7e14;
$yellow: #fcc419;
$green: #40c057;
$blue: #339af0;
$indigo: #5c7cfa;
$violet: #7950f2;

//믹스인 만들기(재사용되는 스타일 블록을 함수처럼 사용할 수 있음)
@mixin square($size) {
  $calculated: 32px * $size;
  width: $calculated;
  height: $calculated;
}

.SassComponent{
  display: flex;
  .box{ //일반 CSS에서는 .SassComponent .box와 마찬가지
    background: red;
    cursor: pointer;
    transition: all 0.3s ease-in;
    &.red{
      //.red 클래스가 .box와 함께 사용되었을 때
      background: $red;
      @include square(1);
    }
    &.orange{
      background: $orange;
      @include square(2);
    }
    &.yellow{
      background: $yellow;
      @include square(3);
    }
    &.green{
      background: $green;
      @include square(4);
    }
    &.blue{
      background: $blue;
      @include square(5)
    }
    &.indigo{
      background: $indigo;
      @include square(6);
    }
    &.violet{
      background: $violet;
      @include square(7);
    }
    &:hover {
      //.box에 마우스를 올렸을 때
      background: black;
    }
  }
}
```

**SassComponent.js 코드**

```jsx
import React from "react";
import "./SassComponent.scss";

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

![Untitled](4%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%20React%20%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%84%83%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20b8246a0e280c4ee9a54e278a57140ee1/Untitled.png)

### **9.2.1** utils 함수 분리하기

여러 파일에서 사용될 수 있는 Sass 변수 및 믹스인은 다른 파일로 따로 분리하여 작성한 뒤 필요한 곳에서 쉽게 불러와 사용할 수 있다.

**src/styles/utils.scss 코드**

```jsx
//변수 사용하기
$red: #fa5252;
$orange: #fd7e14;
$yellow: #fcc419;
$green: #40c057;
$blue: #339af0;
$indigo: #5c7cfa;
$violet: #7950f2;

//믹스인 만들기(재사용되는 스타일 블록을 함수처럼 사용할 수 있음)
@mixin square($size) {
  $calculated: 32px * $size;
  width: $calculated;
  height: $calculated;
```

```jsx
@import './styles/utils';
.SassComponent  {
	display: flex;
		.box {
			(...)
```

### **9.2.2** sass-loader 설정 커스터마이징하기

이 작업은 Sass를 사용할 때 반드시 해야 하는 것은 아니지만, 해두면 유용하다.

예를 들어 SassComponent에서 utils를 불러올 때 프로젝트에 디렉터리를 많이 만들어서 구조가 깊어졌다면 상위 폴더로 한참 거슬러 올라가야하는 단점이 있다.

이 문제점은 웹팩에서 Sass를 처리하는 sass-loader의 설정을 커스터마이징하여 해결할 수 있다

create-react-app으로 만든 프로젝트를 커스터마이징하려면 `npm run eject` 명령어를 통해 세부 설정을 밖으로 꺼내 주어야 한다.

⚠️ 주의점 create-react-app은 기본적으로 git설정이 되어있으니 커밋해 주어야한다.

`eject`을 하면 프로젝트 디렉터리에 `config`라는 디렉터리가 생성되었을 것이다.

그 디렉터리 안에 있는 `webpack.config.js`에서 `"sassRegex"` 키워드를 찾아 **concat**을 통해 커스터마이징된 sass-loader 설정을 넣어 줍니다.

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
                }.concat({
                  loader: require.resolve("sass-loader"),
                  options: {
                    sassOptions: {
                      includePaths: [paths.appSrc + "/styles"],
                    },
                    sourceMap: isEnvProduction && shouldUseSourceMap,
                  },
                })
              ),
```

`@import 'utils.scss'` 이제부터 utils.scss를 사용하는 컴포넌트가 있다면  
상대경로를 입력할 필요없이 styles 디렉터리 기준 벌대경로를 사용하여 불러올 수 있다.

### **9.2.3** node_modules에서 라이브러리 불러오기

Sass의 장점 중 하나는 라이브러리를 쉽게 불러와서 사용할 수 있다는 점이다.

npm을 통해 설치한 라이브러리를 사용하는 가장 기본적인 방법은 상대 경로를 사용하여 node_modules까지 들어가서 불러오는 방법이 있다. 
`@import '../../../node_modules/library/styles';`

이보다 더 쉬운 방법은 `@import '~library/styles';`

물결 문자를 사용하면 자동으로 node_modules에서 라이브러리 디렉터리를 탐지하여 스타일을 불러올 수 있다.

### **9.3 CSS Module**

CSS Module은 CSS를 불러와 사용할 때 클래스 이름을 고유한 값 형태로 자동으로 만들어서 
컴포넌트 스타일 클래스 이름이 중첩되는 현상을 방지해주는 기술이다.

css-loader 설정을 할 필요 없이 .
module.css 확장자로 파일을 저장하기만 하면 CSS Module이 적용된다.

**CSS Module.js 코드**

```jsx
import React from "react";
import styles from "./CSSModule.module.css";

const CssModule = () => {
  return (
    <div className={styles.wrapper}>
      안녕하세요 저는 <span className="something">CSS Module!</span>
    </div>
  );
};

export default CssModule;
```

CSS Module이 적용된 스타일 파일을 불러오면 객체를 하나 전달받게 되는데 
CSS Module에서 사용한 클래스 이름과 해당 이름을 고유화한 값이 키-값 형태로 들어 있다.
ex) `{ wrapper: "CSSModule_wrapper__1SbdQ" }`

이 고유한 클래스 이름을 사용하려면 클래스를 적용하고 싶은 JSX 엘리먼트에 className={styles.[클래스 이름]} 형태로 전달해 주면 된다.

![Untitled](4%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%20React%20%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%84%83%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20b8246a0e280c4ee9a54e278a57140ee1/Untitled%201.png)

CSS Module을 사용한 클래스 이름을 두 개 이상 적용할 때는

```jsx
<div className={`${styles.wrapper} ${styles.inverted}`}>
```

템플릿 리터럴 문법을 사용하고 싶지 않다면

```jsx
clssName={[styles.wrapper,styles.inverted].join('')}
```

### **9.4 styled-components**

컴포넌트 스타일링의 또 다른 패러다임은 자바스크립트 파일 안에 스타일을 선언하는 방식이다.
이 방식의 이름은 'CSS-in-JS'

이 중에서 개발자들이 가장 선호하는 `styled-components`대해 알아보자

> 설치$npm install styled-components
> 

장점: `styled-components`를 사용하면 자바스크립트 파일 하나에 스타일까지 작성할 수 있기 때문에 .css 또는 .scss 확장자를 가진 스타일 파일을 따로 만들지 않아도 된다.

장점2: props 값으로 전달해 주는 값을 쉽게 스타일에 적용할 수 있다.

**StyledComponent.js 코드**

```jsx
import React from "react";
import styled, { css } from "styled-components";

const Box = styled.div`
  /*props로 넣어 준 값을 직접 전달해 줄 수 있습니다*/
  background: ${(props) => props.color || "blue"};
  padding: 1rem;
  display: flex;
`;

const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  /* &문자를 사용하여 Sass 처럼 자기 자신 선택 가능 */
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  /*다음 코드는 inverted 값이 true일 때 특정 스타일을 부여해 줍니다.*/
  ${(props) =>
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

const StyledComponent = () => {
  return (
    <Box color="black">
      <Button>안녕하세요</Button>
      <Button inverted={true}>테두리만</Button>
    </Box>
  );
};

export default StyledComponent;
```

![Untitled](4%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%20React%20%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%84%83%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20b8246a0e280c4ee9a54e278a57140ee1/Untitled%202.png)

### Tagged 템플릿 리터럴

스타일을 작성할 때 ` 을 사용하여 만든 문자열에 스타일 정보를 넣어 주었다.

여기서 사용한 문법을 `Tagged 템플릿 리터럴`이라고 부른다.
CSS Module을 배울 때 나온 일반 템플릿 리터럴과 다른 점은 
**템플릿 안에 자바스크립트 객체나 함수를 전달 할 때 온전히 추출할 수 있다는 것**

```jsx
`hello ${{foo: 'bar' }} ${() => 'world'}!`//결과: "hello [object Obect] () => 'world'!"
```

템플릿에 객체를 넣거나 함수를 넣으면 형태를 잃어 버리게 된다.
객체는 "[object Object]"로 변환되고, 함수는 함수 내용이 그대로 문자열화 되어 나타남.

함수를 작성하고 나서 해당 함수 뒤에 템플릿 리터럴을 넣어 준다면, 
**템플릿 안에 넣은 값은 온전히 추출 가능.**

```jsx
function tagged(...args){
  console.log(args);
}
tagged`hello ${{foo: 'bar'}} ${ () => 'world'}!`
```

`styled-components`는 이러한 속성을 사용하여 `styled-components`로 만든 컴포넌트의 props를 스타일 쪽에서 쉽게 조회할 수 있도록 해준다.

사용해야 할 태그명이 유동적이거나 특정 컴포넌트 자체에 스타일링해 주고 싶다면 다음과 같은 형태로 구현할 수 있다.

```jsx
//태그 타임을 styled 함수의 인자로 전달
const MyInput = styled('input')`
  background: gray;
 `

//아예 컴포넌트 형식의 값을 넣어 줌
 const StyledLink = styled(Link)`
   color: blue;
   `
```

### 반응형 디자인

일반 CSS를 사용할 때와 똑같이 media 쿼리를 사용하면 된다.
`@media (max-width: 1024px) { width: 768px; }`

`styled-components` 메뉴얼에서 제공하는 유틸 함수 

```jsx
import React from "react";
import styled, { css } from "styled-components";

const sizes = {
  desktop: 1024,
  tablet: 768,
};

//위에 있는 size 객체에 따라 자동으로 media 쿼리 함수를 만들어 줍니다.
//참고: https://www.styled-components.com/docs/advanced#media-templates
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @medial (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

const Box = styled.div`
  /*props로 넣어 준 값을 직접 전달해 줄 수 있습니다*/
  background: ${(props) => props.color || "blue"};
  padding: 1rem;
  display: flex;
  /* 기본적으로는 가로 크기 1024px에 가운데 정렬을 하고 가로 크기가 작아짐에 따라
  크기를 줄이고 768px 미만이되면 꽉 채웁니다. */
  width: 1024px;
  margin: 0 auto;
  ${media.desktop`width:768px;`}
  ${media.tablet`width:100%;`};
`;

```

### **9.5 정리**

많은게 있다~~~

## **10장**

### **10.1 프로젝트 준비하기**

(생략)

### **10.2 UI 구성하기**

`TodoTemplate`
화면을 가운데 정렬 시켜주며 앱 타이틀을 보여준다.
childred 내부 jsx를 props로 받아 와서 렌더링 해준다
`TodoInsert`
새로운 항목을 입력하고 추가할 수 있는 컴포넌트
state로 인풋의 상태를 관리한다.
`TodoListItem`
각 할 일 항목에 대한 정보를 보여주는 컴포넌트.
todo 객체를 props로 받아 와서 상태에 따라 다른 스타일의 UI를 보여준다
`TodoList`
todos 배열을 props로 받아 온 후, map을 사용하여 여러 개의 TodoListItem으로 변환한다.

![Untitled](4%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%20React%20%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%84%83%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20b8246a0e280c4ee9a54e278a57140ee1/Untitled%203.png)

[https://react-icons.github.io/react-icons/icons?name=md](https://react-icons.github.io/react-icons/icons?name=md) 

아이콘 받아오는 사이트

### **10.3 기능 구현하기**

`항목 추가 기능 구현하기`

- id 값은 렌더링되는 정보가 아니기 때문에 useRef를 사용하여 관리
- props로 전달해야 할 함수를 만들 때는 useCallback을 사용하여 함수를 감싸는 것을 습관화

`지우기 기능구현하기`

- App.js에 onRemove 함수 만들고 TodoList에 props로 전달해주기
- filter를 통해 선택된 값 이외의 배열을 모두 리턴

```jsx
const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} />
    </TodoTemplate>
  );
}
```

`수정 기능`

- App.js에 onToggle 함수 만들고 TodoList에 props로 전달해주기

```jsx
const onToggle = useCallback((id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, 
  [todos],
);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}
```

## **11장**

### **11.1 많은 데이터 렌더링하기**

기존 코드에 2500개 렌더링 되는 함수를 작성

```jsx
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}
function todoReducer(todos, action) {
  switch (action.type) {
    case "INSERT":
      return todos.concat(action.todo);
    case "REMOVE":
      return todos.filter((todo) => todo.id !== action.id);
    case "TOGGLE":
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}
```

항목을 하나 체크했을때 이전보다 느려진것을 확인하면 됨

### **11.2 크롬 개발자 도구를 통한 성능 모니터링**

개발자 도구의 Performance 탭에서 녹화 버튼을 누른 뒤 항목을 체크하고 Stop을 누른다.

![Untitled](4%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%20React%20%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%84%83%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20b8246a0e280c4ee9a54e278a57140ee1/Untitled%204.png)

 데이터가 2,500개밖에 안 되는데도 불구하고 1초나 걸린다는 것은 성능이 매우 나쁘다는 의미다.

### **11.3 느려지는 원인 분석**

컴포넌트는 아래와 같은 상황에서 리랜더링 된다.

**1.** 자신이 전달받은 props가 변경될 때

**2.** 자신의 state가 바뀔 때

**3.** 부모 컴포넌트가 리렌더링될 때

**4.** forceUpdate 함수가 실행될 때

**지금 코드의 문제 상황은...**

'할 일 1' 항목을 체크할 경우 App 컴포넌트의 state가 변경되면서 App 컴포넌트가 리렌더링된다. 

부모 컴포넌트가 리렌더링되었으니 TodoList 컴포넌트가 리렌더링되고 

그 안의 모든 `TodoListItem` 컴포넌트들도 리렌더링됩니다.

'할 일 1' 항목은 리렌더링되어야 shouldComponentUpdate하는 것이 맞지만, 
'할 일2'부터 '할 일 2500'까지는 리렌더링을 안 해도 되는 상환인데 
모두 리렌더링되고 있으므로 이렇게 느린 것

`해결책 : 불필요한 리렌더링을 방지`

### **11.4 React.memo를 사용하여 컴포넌트 성능 최적화**

shouldComponentUpdate 라이프 사이클을 이용하여 리랜더링 방지하기

But, 함수형에서는 라이프사이클 메서드를 사용할 수 없으니

`React.memo`  함수 사용

```jsx
import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import '../styles/TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo;
  return (
    <div className="TodoListItem">
      <div className={cn('checkbox', { checked })} onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div className="remove" onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);
```

`TodoListItem` 컴포넌트는 `todo`, `onRemove`, `onToggle`이 바뀌지 않으면 리렌더링을 하지 않는다!

### **11.5 onToggle, onRemove 함수가 바뀌지 않게 하기**

`setTodos` 배열이 업데이트되면 `onRemove`와 `onToggle` 함수도 새롭게 바뀌는 구조탓에 
함수가 계속 만들어지는 상황 ~~좀더 줄여보자..~~

위 상황을 해결할 방법은 두 가지

**첫 번째 방법**은 useState의 함수형 업데이트 기능을 사용하는 것이고, 
**두 번째 방법**은 useReducer를 사용하는 것

## **useState의 함수형 업데이트 기능**

setTodos를 사용할 때 새로운 상태를 파라미터로 넣는 대신, 

상태 업데이트를 어떻게 할지 정의해주는 업데이트 함수를 넣을 수도 있다. 
이를 **함수형 업데이트**라고 부른다.

```jsx
const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);
```

위 코드처럼 업데이트 함수를 넣어주면 `useCallback`을 사용할 때 두 번째 파라미터로 넣는 배열에 todos를 넣지 않아도 된다. 

즉, 변경된 TodoListItem만 리렌더링이 되는 것!

## **useReducer 사용하기**

함수형 업데이트를 사용하는 대신, `useReducer`를 사용해도 `onToggle`과 `onRemove`가 계속 새로워지는 문제를 해결할 수 있다.

```jsx
function App() {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const nextId = useRef(2501);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: 'INSERT', todo });
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);
```

컴포넌트가 맨 처음 렌더링될 때만 `createBulkTodo` 함수 호출

### **11.6 불변성의 중요성**

기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어 내는 것을 ‘불변성을 지킨다’고 한다.

불변성이 지켜지지 않으면 객체 내부의 값이 새로워져도 바뀐 것을 감지하지 못한다. 

그러면 React.memo에서 서로 비교하여 최적화하는 것이 불가능!

### **11.7 TodoList 컴포넌트 최적화하기**

```jsx
import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default React.memo(TodoList);
```

App 컴포넌트에 다른 state가 추가되어 

해당 값들이 업데이트될 때는 불필요한 리렌더링을 할 수도 있다.

 때문에 미리 최적화해 준 것

### **11.8 react-virtualized를 사용한 렌더링 최적화**

react-virtualized를 사용하면 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 크기만 차지하게끔 할 수 있다. 

스크롤되면 해당 스크롤 위치에서 보어 주어야 할 컴포넌트를 자연스럽게 렌더링시킨다. 

이 라이브러리를 사용하면 낭비되는 자원을 아주 쉽게 아낄 수 있다.

### **11.9 정리**

 리액트 컴포넌트의 렌더링은 기본적으로 빠르기 때문에 컴포넌트를 개발할 때 최적화 작업에 대해 너무 큰 스트레스를 받거나 모든 컴포넌트에 일일이 React.memo를 작성할 필요는 없다. 

단, 리스트와 관련된 컴포넌트를 만들 때 보여 줄 항목이 100개 이상이고 업데이트가 자주 발생한다면, 이 장에서 학습한 방식을 사용하여 꼭 최적화하 해야한다.

---