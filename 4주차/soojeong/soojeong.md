# 4주차 React 스터디 정리

| 장   | 제목                             |
| ---- | -------------------------------- |
| 9장  | 컴포넌트 스타일링                |
| 10장 | 일정 관리 웹 어플리케이션 만들기 |
| 11장 | 컴포넌트 성능 최적화             |

## 9장

컴포넌트 스타일링을 할 때, 다양한 방식을 사용할 수 있다.

대표적으로 4가지의 방식이 있다.

-   **일반 CSS** : 컴포넌트를 스타일링하는 가장 기본적인 방식.

-   **Sass** : 자주 사용되는 CSS 전처리기 중 하나. 확장된 CSS 문법을 사용하여 CSS 코드를 쉽게 작성할 수 있도록 해 줌.

-   **CSS Modlue** : CSS 클래스가 다른 CSS 클래스의 이름과 충돌하지 않도록 파일마다 고유한 이름을 자동으로 생성해주는 옵션.

-   **styled-components** : 스타일을 자바스크립트 파일에 내장시키는 방식. 스타일을 작성함과 동시에 해당 스타일이 적용된 컴포넌트를 만들 수 있게 해준다.

<br />

### 9.1 가장 흔한 방식, 일반 CSS

> 새로운 기술을 배울 필요가 없거나, 소규모 프로젝트 개발을 할 땐, 기본 CSS도 충분하다.

📌**CSS 작성 시 가장 중요한 점**📌  
CSS 클래스를 중복되지 않게 만드는 것이 중요하다 !  
특별한 규칙을 사용하거나, CSS Selector를 사용하여 중복을 방지할 수 있다.

**CSS Selector란 ?**  
-> CSS Selector를 사용하면 CSS 클래스가 특정 클래스 내부에 있는 경우에만 스타일을 적용할 수 있다.

```css
.App .logo {
    /*.App 안에 들어있는 .logo에 스타일을 적용*/
    animation: App-logo-spin infinite 20s linear;
    height: 40vmin;
}
```

className말고도 태그에 적용하고 싶을 때는, 태그이름 앞에 .을 생략해도 된다 !

<br />

### 9.2 Sass 사용하기

**Sass** : 복잡한 작업을 쉽게 할 수 있도록 해주고, 스타일코드의 재활용성을 높여 줄 뿐만 아니라 코드의 가독성을 높여 유지 보수를 쉽게 해준다.

Sass는 2가지 확장자를 지원한다.  
`.scss`, `.sass`  
두 확장자는 문법부터 달라 코드를 보면 차이점이 보인다.

```css
/*.scss 문법*/
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
    font: 100% $font-stack;
    color: $primary-color;
}
```

```css
/*.sass 문법*/
$font-stack : Helvetica, sans-serif
$primary-color : #333

body
    font : 100% $font-stack
    color : $primary-color
```

.sass 확장자는 .scss 확장자와 다르게 중괄호, 세미콜론을 사용하지 않는다.  
보통 `.scss` 문법이 더 자주 사용된다.

```scss
//변수를 설정하여 사용할 수 있다
$red: #fa5252;
$orange: #fd7e14;
$yellow: #fcc419;
$green: #40c057;
$blue: #339af0;
$indigo: #5c7cfa;
$violet: #7950f2;

//믹스인 만들기(재사용되는 스타일 블록을 함수처럼 사용가능)
@mixin square($size) {
    $calculated: 32px * $size;
    width: $calculated;
    height: $calculated;
}

//일반 CSS의 .SassComponent .box와 같은 의미다
.SassComponent {
    display: flex;
    .box {
        background: red;
        cursor: pointer;
        transition: all 0.3s ease-in;
        &.red {
            // .red클래스가 .box와 사용되었을 때
            background: $red;
            @include square(1);
        }
... //(생략)
    }
}
```

#### utils 함수 분리하기

위 코드에서 사용한 red~violet 변수들과 믹스인함수 square과 같이 변수와 함수를 여러 파일에서도 사용해야 한다면 다른 파일로 따로 분리하여 작성하면 된다.

불러올 때는 `@import` 구문을 사용하여 `import <분리한 파일 경로>`로 작성한다.

#### sass-loader 설정 커스터마이징하기

프로젝트를 하면서 디렉터리 구조가 깊어지는 경우가 있다.  
이 경우에는 sass-loader 설정을 커스터마이징하여 경로를 간단하게 가져올 수 있도록 바꿀 수 있다.

#### node-modules에서 라이브러리 불러오기

💡 **Sass의 장점** 중 하나는 라이브러리를 쉽게 불러와서 사용할 수 있다는 점이다.  
yarn을 통해 설치한 라이브러리를 사용하는 가장 기본적인 방법은  
상대 경로를 사용하여 node_modlues까지 들어가 불러오는 방법이다.

@import '../../../node_modules/library/styles';

이와 다르게 깊숙한 디렉터리에 있을 경우, 물결문자를 사용하여 짧게 표현할 수 있다.  
@import '~library/styles';

<br />

### 9.3 CSS Module

> CSS를 불러와서 사용할 때 클래스 이름을 고유한 값 형태로 만들어서 컴포넌트 스타일 클래스 이름이 중첩되는 현상을 방지해주는 기술

`.module.css 확장자`로 파일을 저장하기만 하면 CSS Module이 적용된다.

CSS Module이 적용된 스타일 파일을 불러오면 객체를 하나 전달받는다.  
CSS Module에서 사용한 클래스 이름과 해당 이름을 고유화한 값이 key-value 형태로 들어있다.

**이 고유한 이름을 사용하려면 ?**  
-> 적용하고 싶은 JSX 요소에 className={styles.[ 클래스이름 ]} 형태로 전달하면 된다.

CSS Module을 사용한 클래스 이름을 2개 이상 적용시킬 때는 다음과 같이 코드를 작성한다.

```css
.wrapper {
    ...;
}

.inverted {
    ...;
}
```

이렇게 2개의 클래스 이름이 있을 때, js 파일에 적용시키려면

```javascript
<div className={`${styles.wrapper} ${styles.inverted}`}></div>
//위 아래 같은의미의 코드
<div className={[styles.wrapper, styles.inverted].join('')}></div>
```

와 같이 className 안에 ``를 넣어주고 각 이름 앞에 $를 붙여준다.
혹은 join을 사용하여 써줘도 무방하다.

#### classnames

> CSS 클래스를 조건부로 설정할 때 매우 유용한 라이브러리다. 이 라이브러리를 사용하면 여러 클래스를 적용할 때 매우 편리하다.

예시 코드를 통해 어떻게 사용하는지 알아 볼 것이다.

```javascript
const MyComponent = ({ highlighted, theme }) => (
    <div className={classNames("MyComponent", { highlighted }, theme)}>
        Hello
    </div>
);
```

highlighted 값이 True이면 highlighted 클래스가 적용되고, False라면 적용되지 않는다.  
theme으로 전달받는 문자열은 내용 그대로 클래스에 적용된다라는 의미를 담고 있는 코드다.

CSS Module과 함께 사용하면 CSS Module 사용이 훨씬 쉬워진다.  
classnames에 내장되어 있는 bind 함수를 이용해 클래스를 넣을 때마다 styles.클래스이름 의 형태를 사용할 필요가 없다 !

```javascript
import React from "react";
import styles from "./CSSModule.module.css";

const CSSModule = () => {
    return (
        <div className={`&{styles.wrapper} &{styles.inverted}`}>
            안녕하세요, 저는 <span className="something">CSS Module!</span>
        </div>
    );
};
//위 코드를 bind를 사용하여 바꿔주면,

import React from "react";
import classNames from "classnames/bind";
import styles from "./CSSModule.module.css";

const cx = classNames.bind(styles); //미리 styles에서 클래스를 받아오도록 설정

const CSSModule = () => {
    return (
        <div className={cx("wrapper", "inverted")}>
            안녕하세요, 저는 <span className="something">CSS Module !</span>
        </div>
    );
};
```

#### Sass와 함께 사용하기

> Sass를 사용할 때도 module.scss 확장자를 사용하면 CSS Module을 사용할 수 있다.

<br />

### 9.4 styled-components

> 💡 styld-components란 CSS-in-JS 라이브러리 중 개발자들이 가장 선호하는 방법이다 !

js파일 상단에 **import styled, {css} from 'styled-components'**를 추가한다.

**{css}를 추가하는 이유 ?**  
-> 단순 변수 형태가 아니라 여러 줄의 스타일 구문을 조건부로 설정해야 하는 경우에는 css를 불러와야 한다.

#### Tagged 템플릿 리터럴

CSS Module과 styled-components에서는 ``을 사용하여 만든 문자열에 스타일정보를 넣어주었다.  
이를 Tagged 템플릿 리터럴이라고 한다 !

**CSS Module과 다른 점**  
-> 템플릿 안에 자바스크립트 객체나 함수를 전달 할 때 온전히 추출할 수 있다.

```javascript
//잘못된 경우 -> 객체는 []로 변환되고 함수는 함수 내용이 문자열화 되어버림.
`hello ${{ foo: "bar" }} ${() => "world"}!`;

//tagged 템플릿 리터럴 사용 -> 원본 값을 그대로 추출 가능 !
tagged`hello ${{ foo: "bar" }} ${() => "world"}!`;
```

스타일링된 요소를 만들 때는 `styled.태그명` 을 사용하여 구현한다.  
그리고 그 뒤에 ``이 사용된 tagged 템플릿 리터럴 문법을 통해 스타일을 넣으면 해당 스타일이 적용된 태그명으로 이루어진 리액트 컴포넌트가 생성된다.

props를 조회하려면 props.<이름>과 같은 형태로 만들어주면 된다.

📌 **주의사항**  
CSS를 사용하지 않고 바로 문자열을 넣을 경우, Tagged 템플릿 리터럴이 아니기 때문에 함수를 받아 사용하지 못함 -> 해당 부분에서는 props 값을 사용하지 못한다.

-   조건부 스타일링을 할 때 넣는 여러 줄의 코드에서 props를 참조하지 않는다면 굳이 css로 감싸지 않아도 된다.
-   props를 참조한다면 **반드시 css로 감싸주어 tagged 템플릿 리터럴을 사용해야 한다 !**

<br />

### 9.5 정리

<br />

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

<br />

### 11.2 크롬 개발자 도구를 통한 성능 모니터링

<br />

### 11.3 느려지는 원인 분석

느려지는 원인을 분석하기 전 리렌더링이 발생하는 상황 4가지를 알아보면,

1. 자신이 전달받은 props가 변경될 때

2. 자신의 state가 바뀔 때

3. 부모 컴포넌트가 리렌더링 될 때

4. forceUpdate 함수가 실행될 때

인데, 정보1이 변경되었다고 가정하면 부모 컴포넌트의 state가 변경되면서 부모 컴포넌트가 리렌더링 된다.  
이때, 부모 컴포넌트가 리렌더링되니 그 안의 많은 컴포넌트들도 리렌더링 된다.

이 과정에서 리렌더링되지 않아도 될 것들도 모두 되어버려 느려지는 것이다.

-> **컴포넌트 리렌더링 성능을 최적화하는 작업이 필요하다.**

<br />

### 11.4 React.memo를 사용하여 컴포넌트 성능 최적화

클래스형 컴포넌트를 사용할 때는 shouldComponentUpdate 라이프사이클을 사용하면 되지만,

함수형 컴포넌트에서는 라이프사이클 메서드를 사용할 수 없다.  
대신, **React.memo**라는 함수를 사용한다.
-> 컴포넌트의 props가 바뀌지 않았다면, 리렌더링 하지 않도록 설정하여 함수형 컴포넌트의 리렌더링 성능을 최적화할 수 있다.

<br />

### 11.5 onToggle, onRemove 함수가 바뀌지 않게 하기

이 밖에도 todos의 배열이 바뀔 때 같이 새롭게 바뀌는 함수들에 대해서도 고려해야 한다.

새롭게 바뀌는 함수에는 onRemove, onToggle 함수가 있다.

함수가 계속 만들어지는 상황을 방지하는 방법은 2가지다.

1. **useState 함수형 업데이트 기능을 사용하는 것**

2. **useReducer을 사용하는 것**

`useState` 의 함수형 업데이트  
**함수형 업데이트란 ?**  
-> setTodos를 사용할 때 '새로운 상태'를 파라미터로 넣는 대신, 상태 업데이트를 어떻게 할지 정의해주는 업데이트 함수를 넣을 수도 있다.

`useReducer` 사용  
두 번째 파라미터에 undefined를 넣고, 세 번째 파라미터에 초기 상태를 만들어주는 createBulkTodos 함수를 넣는다.  
이렇게 하면 컴포넌트가 맨 처음 렌더링 될 때만 createBulkTodos 함수가 호출된다.

**useReducer의 장점과 단점**
장점 : 상태를 업데이트하는 로직을 모아서 컴포넌트 바깥에 둘 수 있다.  
단점 : 기존 코드를 많이 고쳐야 한다.

<br />

### 11.6 불변성의 중요성

> 리액트 컴포넌트에서는 상태를 업데이트할 때 불변성을 지키는 것이 매우 중요하다.

**불변성을 지킨다라는 말 뜻은 ?**  
-> 기존의 값을 수정하지 않으면서 새로운 값을 만들어 내는 것.  
지켜지지 않을 시, 객체 내부의 값이 새로워져도 바뀐 것을 감지하지 못한다.

배열/객체 구조가 복잡해진다면 불변성을 유지하며 업데이트를 하는 것은 까다로워진다.  
복잡한 상황일 경우 **immer 라이브러리**의 도움을 받으며 작업할 수 있다.

<br />

### 11.7 TodoList 컴포넌트 최적화하기

> 리스트에 관련된 컴포넌트를 최적화할 때는 리스트 내부에서 사용하는 컴포넌트도, 리스트로 사용되는 컴포넌트 자체도 최적화해주는 것이 좋다 !

<br />

### 11.8 react-virtualized를 사용한 렌더링 최적화

> react-virtualized를 사용하면, 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 크기만 차지하게 할 수 있다.

<br />

### 11.9 정리

💡리스트와 관련된 컴포넌트를 만들 때 보여 줄 항목이 100개 이상이고,  
업데이트가 자주 발생한다면 최적화하는 습관을 들이도록 하자 !

---
