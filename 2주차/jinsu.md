# 2주차 React 스터디 정리

| 장   | 제목          |
| ---- | ------------- |
| 4장 | 이벤트 핸들링 |
| 5장 | ref: DOM에 이름 달기 |

-----
## 4장 이벤트 핸들링
> 이번 4장에서는 HTML, Javascript, CSS 를 사용해 경험해 봤던 onClick, onChange 등의 이벤트 핸들링을 React에서 어떻게 사용하는지에 대해 다룬다.

<br/>

### 4.1 리액트의 이벤트 시스템

> 리액트 이벤트 핸들링을 배우기에 앞서 기억해야 할 3가지 주의사항

1. 이벤트 이름은 카멜 표기법으로
    - onClick, onChange, onKeyUp ... 
2. 이벤트에 실행할 JS 코드가 아닌 함수 형태의 값
    - HTML에서 사용했던 것 처럼 실행할 코드가 아니라 함수 형태의 객체를 전달
3. DOM 요소에만 이벤트 설정 가능
    - div, button, input, form, span ... 등 DOM 요소에만 가능

<br/>

> 리엑트에서 지원하는 이벤트 종류
1. KeyBoard
2. Focus
3. Form
4. Mouse
5. Media
6. Image
   ...

추가적인 이벤트는 [요기](https://facebook.github.io/react/docs/events.html)<br/><br/>

### 4.2 예제로 이벤트 핸들링 익히기

***이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달한다.***

> 클래스형 컴포넌트
```jsx
// 방법 1
<button onClick ={
  () => {
    alert(this.state.message);
    this.setState({
      message: ''
    });
  }
}>
```

```jsx
// 방법 2-1 , 직접 바인딩 하기
~(생략)~
constructor(props){
  super(props);
  this.handleClick = this.handleClick.bind(this);
}

handleClick() {
  alert(this.state.message);
  this.setState({
    message: ''
  });
}
~(생략)~
<button onClick={this.handleClick}>확인</button>
```

```jsx
// 방법 2-2 , transform-class-properties 문법 사용하여 정의 => 화살표 함수 사용하기
~(생략)~
handleClick = () =>{
  alert(this.state.message);
  this.setState({
    message: ''
  });
}
~(생략)~
<button onClick={this.handleClick}>확인</button>
```
<br/>
클래스형 컴포넌트에서 사용할 수 있는 3가지 방법이다. <br/>
1번의 경우 거의 사용하지 않으니 슬 쩍 넘어가고 2-1, 2-2를 보면된다.<br/><br/>
2-1의 경우 클래스의 임의 메서드가 특정 HTML 요소의 이벤트로 등록되는 과정에서 메서드와 this 관계가 끊어진다. <br/>
this를 자신으로 제대로 가리키기 위해서는 메서드를 this와 바인딩 해야한다. (안하면 this -> undefined) <br/><br/>
매번 바인딩 하기 귀찮다면 그리고 가독성이 조금 더 좋아보이려면 2-2를 사용하는 것을 적극 추천한다. (이것도 귀찮다면 함수형 컴포넌트를 사용하자)<br/><br/>

> 함수형 컴포넌트

```jsx
// 방법 2-1 , 직접 바인딩 하기
~(생략)~
const onClick = () => {
  alert("눌렀다!");
};

~(생략)~
<button onClick={onClick}>버-튼</button>
```
<br/>

-----

## 5장 ref: DOM에 이름 달기
일반적으로 HTML에서 특정 DOM 요소에 CSS로 스타일을 적용한다거나 Javascript 코드로 DOM을 조작하기 위해서 id를 사용한다
```jsx
<div id="my_id">야호</div>
```
이런식으로 id 값을 지정해서 사용하는데 기억해야 할 점은 <br/>
- ***HTML에서 DOM의 id는 유일(unique)해야한다!***<br/>
id가 중복된다면 내가 원하는 특정 DOM에 원하는 이벤트, 조작을 할 수 없기 때문이다.<br/><br/>

그렇다면 ref는 뭘까요?
- ***ref는 리액트 내부 DOM에 id를 지정하는 방법!***<br/>
JSX안에서 HTML에서 사용한 것 처럼 id를 사용하면 DOM을 렌더링할 때 그대로 전달되기 때문에 같은 컴포넌트를 여러번 사용하면 id가 중복되기 쉽다.<br/> 
따라서 정말 특수한 경우가 아니면 사용하지 않는다. <br/><br/>

### 5.1 ref는 어떤 상황에서 사용해야 할까?
- ***DOM을 꼭 직접적으로 건드려야 할 때***<br/>

state를 사용해서 필요한 기능을 대부분 구현할 수 있지만 
- 특정 input에 포커스 주기
- 스크롤 박스 조작하기
- Canvas 요소에 그림 그리기 
- ... 등등 <br/>

이럴 경우에는 DOM을 직접적으로 접근해야하기 때문에 ref를 사용한다. <br/><br/>

### 5.2 ref 사용
> 콜백 함수를 통한 ref 설정
```jsx
// this.input는 꼭 DOM의 이름을 사용하지 않고,
// this.hi 이런식으로 원하는 이름으로 작성해도 된다.
<input ref={(ref) => {this.input=ref}} />
```
> createRef를 통한 ref 설정
```jsx
~(생략)~
class RefSample extends Component{
  input = React.createRef();

  // ref를 설정하고 DOM에 접근할 때
  // this.input 뒤에 .current 이 친구를 꼭 넣어주어야함
  handleFocus = () => {
    this.input.current.focus();
  }
~(생략)~
  <input ref={this.input} />
}
```

두가지 방법 중 편한 방법을 선택해서 사용하자<br/><br/>

### 5.3 컴포넌트에 ref 달기
- ***컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용해보자~***<br/>
내부 메서드 및 멤버 변수에도 접근 가능!

```jsx
~(생략)~
  <div>
    <ScrollBox ref={(ref) => this.scrollBox=ref}/>
    <button onClick={() => this.scrollBox.scrollToBottom()}>
  </div>
~(생략)~
```
이렇게 사용하면 ScrollBox 컴포넌트 내부의 scrollToBottom() 메서드를 쉽게 사용할 수 있다.<br/>

- ***주의 해야 할 점!***<br/>
컴포넌트 사이에서 데이터를 교류할 때 부모 <-> 자식 흐름이 아닌 <br/>
ref를 사용해서 전달하게 된다면 앱 규모가 커질수록 구조가 꼬여버리고 유지 보수가 불가능해진다.<br/>
따라서 항상 부모 <-> 자식 흐름으로 데이터 흐름을 지키자!

------

