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

>클래스가 아닌 태그 자체에 스타일을 적용하는 경우라면 .을 생략해도 된다. <br/>
`App header` : 헤더 클래스가 아닌 태그에 스타일 적용

### 9.2 Sass 사용하기

Sass는 CSS 전처리기로 복잡한 작업을 쉽게 할 수 있도록 해 주고, 스타일 코드의 재활용성을 높여 줄 뿐만 아니라 코드의 가독성을 높여
유지보수를 더욱 쉽게 해준다.

#### .sass

```sass
$font-stack: Helvetica, snas-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color
```

#### .scss

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body{
  font: 100% $font-stack
  color: $primary-color
}
```

.sass 확장자는 중괄호와 세미콜론을 사용하지 않는다.<br/>
반면 .scss 확장자는 기존 CSS를 작성하는 방식과 비교해 문법이 크게 다르지 않다. 
보통 .scss 문버이 더 자주 사용된다.

#### utils 함수 분리하기

Sass에서 선언하는 변수 및 믹스인(mixin)은 다른 파일로 분리해 작성한 뒤 필요한 곳에서 쉽게 불러와 사용할 수 있다.

#### node-modules에서 라이브러리 불러오기

'~(물결문자)'를 사용하면 라이브러리를 쉽게 불러올 수 있다!

Ex) `@import '~include-media/dist/include-media';`

### 9.3 CSS Module

CSS Module은 CSS를 불러와서 사용할 때 클래스 이름을 고유한 값, 즉 **[파일 이름]_[클래스이름] _[해시값]**형태로
자동으로 만들어서 컴포넌트 스타일 클래스 이름이 중첩되는 현상을 방지해주는 기술이다.

CSS Module을 사용하면 고유성에 대해 고민하지 않아도 된다. 어차피 해당 클래스는 스타일을 직접 불러온 컴포넌트 내부에서만 작동하기 때문이다.<br/>
만약 특정 클래스가 웹 페이지에서 전역으로 사용되면 **:global**을 앞에 입력해 명시해 줄 수 있다.

CSS Module이 적용된 스타일 파일을 불러오면 객체를 하나 전달받게 되는데 CSS Module에서 사용한 클래스 이름과 해당 이름을 고유화한 값이 
'키-값' 형태로 들어 있다.<br/>
Ex) `{wrapper : "CSSModule_wrapper_1SbdQ"}`<br/>
이 고유한 클래스 이름을 사용하려면 클래스를 적용하고 싶은 JSX 엘리먼트에 `className={styles.[클래스이름]}`
형태로 전달해 주면 된다! ':global'을 사용해 전역적으로 선언한 클래스의 경우 평상시 해 왔던 것처럼 그냥 문자열로 넣어주면 된다.

> 리터럴 문자열 사용
문자열을 합칠 때 리터럴 문자열을 사용해 문자열 안에 자바스크립트 레퍼런스를 쉽게 넣어줄 수 있다.
const message = `제 이름은 ${name}입니다.';<br/>
여기서 사용되는 `은 백틱이라고 부르는 문자이다.<br/>
이렇게 하고 싶지 않다면 `className={[styles.wrapper, styles.inverted].join(' ')}` 이렇게 작성할 수도 있다! 

#### classnames

classnames는 CSS 클래스를 조건부로 설정할 때 매우 유용한 라이브러리이다. 
또한 CSS Module을 사용할 때 이 라이브러리를 사용하면 여러 클래스를 적용할 때 매우 편리하다.

`yarn add classnames`

#### classnames 기본 사용법

```javascript
import classNames from 'classnames';

classNames('one', 'two'); // = 'one two'
classNames('one', {two:true}); // = 'one two'
classNames('one', {two:false}); //= 'one'
classNames('one', ['two', 'three']); // = 'one two three'

const myClass = 'hello';
classNames('one', myClass, {myCondition: true}); // = 'one hello myCondition'
```
위의 코드처럼 여러 가지의 파라미터를 조합해 CSS 클래스를 설정할 수 있다.<br/>

예를 들어 props 값에 따라 다른 스타일을 주기가 쉬워진다.<br/>
```javascript
const MyComponent - ({highlighted, theme}) => (
  <div className={classnames('MyComponent', {highlighted}, theme)}>Hello</div>
);
```
이렇게 작성하면 highlighted의 값이 true이면 적용되고 false이면 적용되지 않는다.
추가로 theme으로 전달받는 문자열은 내용 그대로 클래스에 적용된다.

#### Sass와 함께 사용하기

css와 사용할 때와의 차이점은 **global CSS를 작성하고 싶다면 `:global{}`로 클래스를 감싸주어야 한다!!**

#### CSS Module이 아닌 파일에서 CSS Module 사용하기

':global'을 사용했던 것처럼 CSS Module이 아닌 일반 .css/.scss 파일에서는 **':local'**을 사용해 CSS Module을 사용할 수 있다!!
- css
```css
:local .wrapper{
  /* 스타일 */
}
```
- scss
```scss
:local{
  .wrapper{
    // 스타일
  }
}
```

### 9.4 styled-components

컴포넌트 스타일링의 또 다른 패러다임은 **자바스크립트 파일 안에 스타일을 선언하는 방식**이다.

`yarn add styled-components`

이 라이브러리를 사용하면 자바스크립트 파일 하나에 스타일까지 작성할 수 있어 .css 또는 .scss 확장자를 가진 스타일 파일을 
따로 만들지 않아도 된다는 이점이 있다! 

*StyledComponent.js참고*

styled-component와 일반 classNames를 사용하는 CSS/Sass를 비교했을 때, 가장 큰 장점은 props값으로 전달해 주는 값을 쉽게 스타일에
적용할 수 있다는 것이다.

#### Tagged 템플릿 리터럴

`을 사용해 만든 문자열에 스타일 정보를 넣어주는 것을 Tagged 템플릿 리터럴이라고 한다!<br/>
CSS Module을 배울 때 나온 템플릿 리터럴과 다른 점은 *템플릿 안에 자바스크립트 객체나 함수를 전달할 때 온전히 추출할 수 있다는 것*이다.

``hello ${{foo: 'bar'}}${() => 'world'}!`` <br/>
결과 : "hello [object Object] () => 'world'!" 

템플릿에 객체나 함수를 넣으면 형태를 잃어버리게 된다.<br/>
Tagged 템플릿 리터럴을 사용하면 이렇게 템플릿 사이사이에 들어가는 자바스크립트 객체나 함수의 원본 값을 그대로 추출할 수 있다!<br/>
styled-component는 이런 속성을 사용해 styled-component로 만든 컴포넌트의 props를 스타일 쪽에서 쉽게 조회할 수 있게 해준다.<br/>

#### 스타일링된 엘리먼트 만들기

스타일링된 엘리먼트를 만들기 위해서는 `styled.태그명`을 사용해 구현하면 된다.<br/>

```javascript
import styled from 'styled-components';

const MyComponent = styled.div`
  font-size: 2rem;
`;
```
위처럼 styled.div 뒤에 Tagged 템플릿 리터럴 문법을 통해 스타일을 넣어주면,
해당 스타일이 적용된 div로 이루어진 리액트 컴포넌트가 생성된다.<br/>
이를 나중에 `<MyComponent>Hello</MyComponent>`와 같은 형태로 사용할 수 있다!<br/>

하지만 사용해야 할 태그명이 유동적이거나 특정 컴포넌트 자체에 스타일링을 주고 싶다면 다음과 같이 구현할 수 있다
```javascript
// 태그의 타입을 styled 함수의 인자로 전달
const MyInput = styled('input')`
  background: gray;
`;

// 아예 컴포넌트 형식의 값을 넣어 줌
const StyledLink = styled(Link)`
  color: blue;
`;
```
단 컴포넌트를 styled의 파라미터에 넣는 경우에는 해당 컴포넌트에 className props를 최상위 DOM의 className 값으로 설정하는 
작업이 내부적으로 있어야 한다.

#### 스타일에서 props 조회하기

styled-components를 사용하면 스타일 쪽에서 컴포넌트에게 전달된 props 값을 참조할 수 있다.<br/>
*StyledComponent.js 의 Box 컴포넌트 참고*<br/>
Box 컴포넌트에서는 background 값에 props를 조회해서 props.color의 값을 사용하도록 했다.<br/>
그리고 color 값이 주어지지 않았을 때는 blue를 기본으로 사용하도록 했다.<br/>
이렇게 만들어진 코드를 JSX에서는 `<Box color="black">(...)</Box>`이런식으로 color값을 props로 넣어줄 수 있다<br/>
이런 경우에는 color가 black이므로 background는 black이 된다! 

#### props에 따른 조건부 스타일링

일반 CSS 클래스를 사용해 조건부 스타일링을 할 때는 className을 사용해 조건부 스타일링을 해왔다.<br/>
styled-components에서는 조건부 스타일링을 간단하게 props로도 처리할 수 있다 !<br/>

*StyledComponent.js - Button 컴포넌트 참고*<br/>
Button 컴포넌트처럼 만든 경우 다음과 같이 props를 사용해 서로 다른 스타일링을 적용할 수 있다.<br/>
`<Button>안녕하세요</Button>` / `<Button inverted={true}>테두리만</Button>`

스타일 코드를 여러 줄을 props에 따라 넣어 주어야 할 때는 CSS를 styled-components에 불러와야 한다.<br/>
CSS를 불러오지 않고 바로 문자열을 넣어도 작동은 되지만 내용이 그저 문자열로만 취급된다.<br/>
>CSS를 불러오지 않으면
- vs code 확장 프로그램에서 신택스 하이라이팅이 제대로 x
- Tagged 템플릿 리터럴이 아니기 때문에 함수를 받아 사용x, 해당 부분에서는 props값을 사용할 수 x
props를 참조하지 않는다면 굳이 CSS를 불러와서 사용하지 않아도 상관없지만 props를 참조하는 경우면 반드시 CSS로
감싸주어서 Tagged 템플릿 리터럴을 사용해 주어야 한다!

#### 반응형 디자인

반응형 디자인을 위해서는 일반 CSS를 사용할 때와 똑같이 **media 쿼리**를 사용하면 된다!

***StyledComponent.js - Box 컴포넌트 참고***

하지만 이런 작업을 여러 컴포넌트에서 반복하면 귀찮을 수 있다.<br/>
그럴 때는 이 작업을 함수화하여 간편하게 사용할 수 있다.<br/>
styled-components 메뉴얼에서 제공하는 유틸 함수를 따라 사용하면 된다! 

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



### 11.2 크롬 개발자 도구를 통한 성능 모니터링

성능을 분석해야 할 때는 크롬의 개발자 도구 Performance탭을 사용해 측정이 가능하다! <br/>
녹화 버튼을 누르고 항목을 체크해보고 화면에 변화가 반영되면 stop버튼을 누른다.<br/>
그러면 성능 분석 결과를 확인할 수 있다.

### 11.3 느려지는 원인 분석

컴포넌트는 다음과 같은 상황에서 리렌더링 된다.

1. 자신이 전달받은 props가 변경될 때
2. 자신의 state가 바뀔 때
3. 부모 컴포넌트가 리렌더링 될 때
4. forceUpdate 함수가 실행될 때

컴포넌트 개수가 많지 않다면 문제되지 않지만 컴포넌트 개수가 많다면 모든 컴포넌트를 리렌더링 할 경우 성능이 느려지게 된다.<br/>
컴포넌트 리렌더링 성능을 최적화해 주는 작업이 필요하다.<br/>
**즉, 리렌더링이 불필요할 때는 리렌더링을 방지해 주어야 한다!!**

### 11.4 React.memo를 사용하여 컴포넌트 성능 최적화

컴포넌트의 리렌더링을 방지할 때는 `shouldComponentUpdate`라는 라이프사이클을 사용하면 된다.<br/>
하지만 이 라이프사이클은 함수형 컴포넌트에서는 사용이 불가능하므로 `React.memo`라는 함수를 사용해보자!<br/>
컴포넌트의 props가 바뀌지 않았다면, 리렌더링하지 않도록 설정해 성능을 최적화해 줄 수 있다.<br/>

*사용방법*
*컴포넌트를 만들고 나서 그냥 감싸 주기만 하면 된다!*
```javascript
import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({todo, onRemove, onToggle, style}) => {

  (...)

  );
};

export default React.memo(TodoListItem);
```

### 11.5 onToggle, onRemove 함수가 바뀌지 않게 하기

todos 배열이 업데이트되면 onRemove와 onToggle함수도 새롭게 바뀐다.<br/>
이 두 함수는 배열 상태를 업데이트 하는 과정에서 최신 상태의 todos를 참조하기 때문에 todos배열이 바뀔 때마다 함수가 새로 만들어진다.<br/>
이렇게 함수가 게속 만들어지는 상황을 방지하는 방법은 useState나 useReducer를 사용하는 것이다.<br/>

#### useState의 함수형 업데이트 

기존에 setTodos 함수를 사용할 때는 새로운 상태를 파라미터로 넣어주었다.<br/>
setTodos를 사용할 때 새로운 상태를 파라미터로 넣는 대신, 상태 업데이트를 어떻게 할지 정의해 주는 업데이트 함수를 넣을 수도 있다.<br/>
이를 함수형 업데이트라고 한다!<br/>

setTodos를 사용할 때 그 안에 **'=>'**만 앞에 넣어주면 된다!
*App.js 참고*

#### useReducer 사용하기

useState의 함수형 업데이트를 사용하는 대신, useReducer를 사용할 수도 있다.<br/>
useReducer를 사용할 때는 원래 두 번째 파라미터에 초기 상태를 넣어 주어야 한다.<br/>
그 대신 두 번째 파라미터에 undefined를 넣고, 세 번째 파라미터에 초기 상태를 만들어 주는 함수인
createBulkTodos를 넣어 주었다.<br/>
이렇게 하면 컴포넌트가 맨 처음 렌더링될 때만 createBulkTodos 함수가 호출된다.<br/>
>useReducer는 코드를 많이 고쳐야 하는 단점이 있지만, 
상태를 업데이트하는 로직을 모아서 컴포넌트 바깥에 둘 수 있다는 장점이 있다!!

*App.js 참고*

### 11.6 불변성의 중요성

앞에서 기존 데이터를 수정할때 직접 수정하지 않고 **새로운 배열을 만들고 새로운 객체를 만들어** 
**필요한 부분을 교체해 주는 방식**으로 구현했다.<br/>
이렇게 기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어 내는 것을 **불변성을 지킨다**고 한다!<br/>

> 불변성이 지켜지지 않는다면 객체 내부의 값이 새로워져도 바뀐 것을 감지하지 못한다.
그러면 React.memo에서 서로 비교하여 최적화하는 것이 불가능했을 것이다.

+) 전개 연산자(...문법)<br/>
이 문법을 사용해 객체나 배열 내부의 값을 복사할 때는 얕은 복사를 하게 된다.<br/>
즉, 내부의 값이 완전히 복사되는 것이 아니라 가장 바깥쪽에 있는 값만 복사된다! <br/>
따라서 내부의 값이 객체 혹은 배열이라면 내부의 값 또한 따로 복사해 주어야 한다!!<br/>


### 11.7 TodoList 컴포넌트 최적화하기

React.memo를 사용해 컴포넌트를 감싸주기!

### 11.8 react-virtualized를 사용한 렌더링 최적화

react-virtualized를 사용하면 예를 들어 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고
크기만 차지하게끔 할 수 있다. 그리고 만약 스크롤이 되면 해당 스크롤 위치에서 보여주어야 하는 컴포넌트를 
자연스럽게 렌더링한다! 

`yarn add react-virtualized`

최적화를 수행하기 전 각 항목의 실제 크기를 px단위로 알아내야 한다.

*TodoList.js 참고*

- List 컴포넌트를 사용하기 위해 rowRenderer라는 함수를 새로 작성
- 이 함수는 react-virtualized의 List 컴포넌트에서 각 TodoItem을 렌더링할 때 사용.
- 이 함수를 List 컴포넌트의 props로 설정.
- 이 함수는 index, key, style 값을 객체 타입으로 받아 와서 사용.

List 컴포넌트를 사용할 때는 해당 리스트의 전체 크기와 각 항목의 높이, 각 항목을 렌더링할 때
사용해야 하는 함수, 그리고 배열을 props로 넣어 주어야 한다. 

### 11.9 정리

리액트 컴포넌트의 렌더링은 기본적으로 빠르기 때문에 개발할 때 최적화 작업에 많이 신경쓰거나 
모든 컴포넌트에 일일이 React.memo를 작성할 필요는 없다!!<br/>
단, 리스트와 관련된 컴포넌트를 만들 때 보여 줄 항목이 100개 이상이고 업데이트가 자주 발생한다면, 최적화가 필요하다!! 