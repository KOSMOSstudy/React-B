# 2주차 (4장, 5장)

# <4장 : Event handling>

- event : 사용자가 웹 브라우저에서 DOM 요소들과 상호 작용하는 것

---

### 이벤트를 사용할 때 주의사항

1. 이벤트 이름은 카멜 표기법으로 작성한다.
    
    ex) onclick → onClick      onkeyup → onKeyUp
    
2. 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달한다.
    
    → 리액트에서는 함수 형태의 객체를 전달함. 
    
3. DOM 요소에만 이벤트를 설정할 수 있다.
    
    → div, button, input, form, span은 가능. but 직접 만든 컴포넌트에는 불가능.
    

---

### 컴포넌트 생성 및 불러오기

```jsx
import React, { Component } from 'react';

class EventPractice extends Component {
	render() {
		return (
			<div>
				<h1> 이벤트 연습 </h1>
			</div>
		);
	}
}

export default EventPractice;
```

---

### onChange 이벤트 핸들링하기

```jsx
import React, { Component } from 'react';

class EventPractic extends Component {
	render() {
			return (
				<div>
					<h1>이벤트 연습</h1>
					<input
						type="text";
						name="message";
						placeholder="아무거나 입력해 보세요"
						onChange={
							(e) => {
								console.log(e);
							}
						}
					/>
				</div>
			);
		}
}
export default EventPractice;
```

---

### state에 input 값 담기

```jsx
value={this.state.message}
onChange = {
	(e) => {
		this.setState({
			message: e.target.value
		})
	}
}
```

---

### 버튼을 누를 때 comment 값을 공백으로 설정

```jsx
<button onClick={
	() => {
		alert(this.state.message);
		this.setState({
			message = ''
		});
	}
}>확인</button>
```

---

### input 여러 개 다루기

- event 객체를 활용해서 [e.target.name](http://e.target.name) 값을 사용하면 된다. e.target.name 값은 해당 input의 name을 가리킨다.

```jsx
//핵심 코드
handleChange = e => {
	this.setState({
		[e.target.name]: e.target.value
	});
};
```

---

### onKeyPress 이벤트 핸들링

```jsx
handleKeyPress = (e) => {
  if(e.key === 'Enter'){
    this.handleClick();
  }
}
```

---

# <5장 : ref: DOM에 이름 달기>

- react component 안에서는 id를 사용할 수 있지만, 특수한 경우가 아니면 사용을 권장하지 않는다. JSX 안에서 DOM에 id를 달면 해당 DOM을 렌더링할 때 그대로 전달되기 때문이다. HTML에서 DOM의 id는 유일해야하는데, 중복 id를 가진 DOM이 여러 개 생길 수 있기에 지양한다.

---

### ref를 사용하는 상황

- **DOM을 꼭 직접적으로 건드려야 할 때**

---

### DOM을 꼭 사용해야 하는 상황

- 특정 input에 focus 주기
- 스크롤 박스 조작하기
- Canvas 요소에 기름 그리기 등

→ 이럴 때에는 어쩔 수 없이 DOM에 직접적으로 접근해야 하는데, 이를 위해 바로 ref를 사용

---

### ref 사용

- 콜백 함수를 통한 ref 설정

```jsx
<input ref={(ref) => {this.input=ref}} />
```

- creatRef를 통한 ref 설정

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

→ 콜백 함수를 사용할 때와 다른 점 : 뒷부분에 .current를 넣어 주어야 한다.

---

- input에 ref 달기

```jsx
<input
	ref={(ref) => this.input=ref}
	(...)
/>
```

- 버튼 onClick 이벤트 코드 수정

```jsx
handleButtonClick = () => {
	this.setState({
		clicked: true,
		validated: this.state.password === '0000'
	});
	this.input.focus();
}
```

---

### component에 ref 달기

- 사용법

```jsx
<MyComponent
		ref={(ref) => {this.myComponent=ref}}
/>
```

1. 컴포넌트 파일 생성

1. App 컴포넌트에서 스크롤 박스 컴포넌트 렌더링

1. 컴포넌트에 메서드 생성
- scrollTop : 세로 스크롤 바 위치
- scrollHeight: 스크롤이 있는 박스 안의 div 높이
- clientHeight: 스크롤이 있는 박스의 높이

1. 컴포넌트에 ref 달고 내부 메서드 사용

```jsx
<div>
  <ScrollBox ref={(ref) => this.scrollBox=ref}/>
  <button onClick={() => this.scrollBox.scrollToBottom()}>
    맨밑으로
  </button>
</div>
```

**※ 주의할 점**

문법상으로 onClick = {this.scrollBox.scrollBottom} 같은 형식으로 작성해도 틀린것은 아님.

컴포넌트가 처음 렌더링 될때에는 this.scrollBox 값이 undefined이므로, this.scrollBox.scrollToBottom 값을 읽어오는 과정에서 오류가 생길 수 있음

때문에 화살표 함수 문법을 사용하여 아ㅖ 새로운 함수를 만들고 그 내부에서 this.scrollBox, scrollToBottom 메서드를 실행하면 버튼을 누를 때 (최초 X) this.scrollBox.scrollToBottom 값을 읽어 와서 실행하므로 오류가 발생하지 않는다.