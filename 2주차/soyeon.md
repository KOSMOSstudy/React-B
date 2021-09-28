# 2주차 React 스터디 정리

| 4장 | 이벤트 핸들링 |
| 5장 | ref: DOM에 이름 달기 |

## 4장

### 4.1 리액트의 이벤트 시스템

리액트의 이벤트 시스템은 웹 브라우저의 HTML 이벤트와 인터페이스가 동일하기 때문에 사용법이 비슷하다.
하지만 주의해야 할 몇가지 사항이 있다.

#### 이벤트를 사용할 때 주의 사항 
1. 이벤트 이름은 '카멜 표기법'으로 작성한다.
   Ex) onClick, onKeyUp
2. 이벤트를 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달한다.
   : 화살표 함수로 함수를 만들어서 바로 전달해도 되고 렌더링 부분 외부에 미리 만들어서 전달해도 된다.
3. DOM 요소에만 이벤트를 설정할 수 있다.
   : div, firm, span, button 등의 DOM 요소에는 이벤트를 설정할 수 있지만 우리가 직접 만든 컴포넌트에는 
     자체적으로 이벤트를 설정할 수 없다.
   Ex) <MyComponent onClick={doSomething} />
       MyComponent에 onClick 값을 설정한다면 MyComponent를 클릭할 때 doSomething 함수를 실행하는 것 (X)
       -> 그냥 이름이 onClick인 props를 MyComponent에게 전달해주는 것(O)

#### 이벤트 종류

리액트에서 지원하는 이벤트의 종류
: Clipboard, Touch, Composition, UI, Keyboard, Wheel, Focus 등등 

### 4.2 예제로 이벤트 핸들링 익히기

```jsx
import React, { Component } from 'react';

class EventPractice extends Component{
  render(){
    return(
      <div>
        <h1>이벤트 연습</h1>
        <input 
          type = "text"
          name = "message"
          placeholder = "아무거나 입력해 보세요"
          onChange = {
            (e) => {
              console.log(e.target.value);
            }
          }
        />
      </div>
    );
  }
}

export default EventPractice;
```
console.log(e)만 했을 경우 이벤트가 끝나고 나면 이벤트가 초기화되므로 정보를 참조할 수 없다. 
만약 비동기적으로 이벤트 객체를 참조할 일이 있다면 e.persist()함수를 호출해 주어야 한다.
참조가 필요하다면 e.target.value를 통해 앞으로 변할 인풋 값을 콘솔에 기록을 할 수 있다.

#### state에 input 값 담기

state 를 추가하고 input 태그 안의 내용을 살짝 아래와 같이 바꿔보자
```jsx
state ={
    message: ''  
  }
```
```jsx
<input 
  value = {this.state.message}
  onChange = {
    (e) => {
      this.setState({
        message: e.target.value
      })
    }
  }
/> 
```
#### 버튼을 누를 때 comment 값을 공백으로 설정

버튼을 클릭하면 입력한 input을 alert를 통해 보여준 다음 comment값을 공백으로 설정하는 버튼을 생성한다.
input 태그 밑에 아래와 같은 button 태그를 작성해보자.

```jsx
<button onClick={
  () => {
    alert(this.state.message);
    this.setState({
      message: ''
    });
  }
}>확인</button>
```
#### 임의 메서드 만들기

우리는 앞에서 '이벤트를 실행할 자바스크립트 코드를 전달하는 것이 아니라 함수 형태의 값을 전달한다'고 배웠다.
그래서 지금까지는 이벤트를 처리할 때 렌더링을 하는 동시에 함수를 만들어서 전달했다.
이 방법 대신 '함수를 미리 준비해 전달하는 방법'도 있다.
성능상으로 차이는 별로 없지만 가독성이 좋다! 

1. 기본 방식
constructor와 handleChange, handleClick 함수를 만들어보자

```jsx
constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

handleChange(e){
  this.setState({
    message: e.target.value
  });
}

handleClick(){
  alert(this.state.message);
  this.setState({
    message: ''
  });
}
```
위와 같이 함수를 만든 후 이벤트에서 this.handle--로 함수를 호출해주면 된다.
함수가 호출될 때 this는 호출부에 따라 결정되므로 임의 메서드가 등록되어도 this를 컴포넌트 자신으로 제대로 가리키기
위해서 바인딩 작업이 필요하다.
만약 바인딩 작업을 하지 않은면 this가 undefined를 가리키게 된다.
이러한 바인딩 작업을 constructor 함수에서 해준다.

#### Property Initializer Syntax를 사용한 메서드 작성

메서드 바인딩은 생성자 메서드에서 하는 것이 정석이다!
하지만 새 메서드를 만들 때마다 constructor도 수정해야 하기 때문에 불편하다고 느낄 수 있다.
이러한 경우 '바벨의 transform-class-properties 문법'을 사용해 화살표 함수 형태로 메서드를 정의할 수 있다!!

```jsx
handleChange = (e) => {
  this.setState({
    message: e.target.value
  });
}
```
위와 같이 화살표 형태로만 바꿔주면 constructor는 없어도 된다!! 

#### input 여러 개 다루기

지금까지는 input 값을 state에 넣는 방법을 배웠다. 
그럼 input이 여러 개일 때는 어떻게 해야 할까? 
이런 경우에는 event 객체를 활용하면 된다!!!

```jsx
state = {
  username: '',
  message: ''
}
handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  });
}
handleClick = () => {
  alert(this.state.username + ':' + this.state.message);
  this.setState({
    username: '',
    message: ''
});

// ...
<input 
  type="text"
  name="username"
  placeholder="사용자명"
  value={this.state.username}
  onChange={this.handleChane}
/>
```
state에 username 이라는 값을 추가하고 e.target.name값을 활용하면 된다.
이 값은 해당 input의 name 값을 가리킨다.
처음에는 name 값이 username인 input을 렌더링 해준 것이다.
위의 코드에서 핵심은 '[e.target.name]: e.target.value' 이다!!! 
객체 안에서 key를 []로 감싸면 그 안에 넣은 레퍼런스가 가리키는 실제 값이 key값으로 사용된다!! 
Ex)
```jsx
const name = 'variantKey'
const object = {
  [name] : 'value'
};
```
의 실행결과는 
'variantKey' : 'value' 이다.

#### onKeyPress 이벤트 핸들링

키를 눌렀을 때 발생하는 KeyPress 이벤트를 처리하는 방법이다.
comment input에서 enter를 눌렀을 때 handleClick 메서드를 호출하도록 코드를 작성해보자.

```jsx
handleKeyPress = (e) => {
  if(e.key === 'Enter'){
    this.handleClick();
  }
}
```
메서드를 하나 더 정의한 후 두 번째 input 태그에 onKeyPress 이벤트에서 위의 메서드를 호출하면 
input에 입력을 한 후 enter키를 누르면 메서드가 잘 실행된다.

## 5장

### 5.1 ref는 어떤 상황에서 사용해야 할까?

ref는 일단 특정 DOM에 작업을 해야 할 때 사용한다.
더 자세하게는 'DOM을 직접적으로 건드려야 할 때' ref를 사용한다.

#### 예제 컴포넌트 생성
```jsx
import React, { Component } from 'react';
import './Validation.css';

class Validation extends Component{
  state = {
    password: '',
    clicked: false,
    validated: false
  }
  handleChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }
  handleButtonClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.password === '0000'
    })
  }
  render(){
    return(
      <div>
        <input 
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''}
        />
        <button onClick={this.handleButtonClick}>검증하기</button>
      </div>
    );
  }
}
export default Validation
```
input에서는 onChange이벤트가 발생하면 handleChange를 호출해 state의 password 값을 업데이트하게 하였다.
button에서는 onClick이벤트가 발생하면 handleButtonClick을 호출해 clicked 값을 참으로 설정하고 
validated 값을 검증 결과로 설정했다.
input의 className은 버튼을 누르기 전에는 비어있는 문자열로 버튼을 누르면 검증 결과에 따라 success 혹은 failure 값을 설정한다. 
그리고 이 className 값에 따라 input 색상이 초록 혹은 빨강을 나타난다.

#### DOM을 꼭 사용해야 하는 이유

앞의 예제에서는 state를 활용해 필요한 기능을 구현했다.
하지만 state 만으로 해결할 수 없는 기능이 있다.
  - 특정 input에 포커스 주기
  - 스크롤 박스 조작하기
  - Canvas 요소에 그림 그리기 등
위와 같은 경우에는 어쩔 수 없이 DOM에 접근해야 하기 때문에 ref를 사용한다!

### 5.2 ref 사용

ref를 사용하는 방법은 크게 두 가지이다.

1. 콜백 함수를 통한 ref 설정
ref를 만드는 가장 기본적인 방법이다.
ref를 달고자 하는 요소에 ref 라는 콜백 함수를 props로 전달해 주면 된다.
이 콜백 함수는 ref 값을 파라미터로 전달받고 함수 내부에서 파라미터로 받은 ref를 컴포넌트의 멤버 변수로 설정한다.
Ex)
```jsx
<input ref={(ref) => {this.input=ref}} />
```
위와 이 하면 앞으로 this.input은 요소의 DOM을 가리킨다.
ref의 이름은 원하는 것으로 자유롭게 지정할 수 있다.

2. createRef를 통한 ref 설정
ref를 만드는 또 다른 방법은 리액트의 내장되어 있는 createRef 함수를 사용하는 것이다.
이 방법을 사용하면 더 적은 코드로 쉽게 사용이 가능하다! 
이 기능은 v16.3부터 작동된다.

```jsx
import React, { Component } from 'react';

class RefSample extends Component{
  input = React.createRef();

  handleFocus = () => {
    this.input.current.focus();
  }
  render(){
    return(
      <div>
        <input ref={this.input}/>
      </div>
    );
  }
}

export default RefSample;
```
createRef를 사용해 ref를 만들려면 우선 컴포넌트 내부에서 멤버 변수로 React.createRef()를 담아주어야 한다.
그리고 해당 변수를 ref를 달고자 하는 요소에 ref props로 넣어주면 ref 설정이 완료된다.
ref를 설정한 후 DOM에 접근하려면 this.input.current를 조회하면 된다.
이 점이 콜백함수를 사용할 때와 다른 점이다.

### 5.3 컴포넌트에 ref 달기

리액트에서는 컴포넌트에도 ref를 달 수 있다.
이 방법은 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 쓴다.
컴포넌트에 ref를 다는 방법은 DOM에 ref를 다는 방법과 같다.

#### 사용방법

```jsx
<MyComponent 
  ref = {(ref) => {this.MyComponent=ref}}
/>
```
이렇게 하면 MyComponent 내부의 메서드 및 멤버 변수에도 접근할 수 있다. 
즉, 내부의 ref에도 접근이 가능하다.
Ex) myComponent.handleClick, myComponent.input 등등

#### 컴포넌트에 ref 달고 내부 메서드 사용

```jsx
<div>
  <ScrollBox ref={(ref) => this.scrollBox=ref}/>
  <button onClick={() => this.scrollBox.scrollToBottom()}>
    맨밑으로
  </button>
</div>
```
위의 코드에서 주의할 점이 있다.
'this.scrollBox.scrollToBottom' 이렇게만 작성해도 틀린 것은 아니다.
하지만 처음 렌더링될 때는 this.scrollBox 값이 undefined이므로 값을 읽어오는 과정에서 오류가 발생한다.
따라서 화살표 함수 문법을 사용해 아예 새로운 함수를 만들고 그 내부에서 메서드를실행하면 버튼을 누를 때 
이미 한 번 렌더링을 해서 this.scrollBox를 설정한 시점이기 때문에 값을 읽어와서 실행하므로 오류가 발생하지 않는다.
