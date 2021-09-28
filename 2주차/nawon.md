# 2주차 React 스터디 정리

| 장   | 제목          |
| ---- | ------------- |
| 4장 | 이벤트 핸들링 |
| 5장 | ref: DOM에 이름 달기 |

## 4장
### 4.1 리액트의 이벤트 시스템
**이벤트**: 사용자가 웹 브라우저에서 DOM 요소들과 상호작용 하는 것  
```js
ex) onmouseover, onClick, onchange ...
```

#### 이벤트를 사용할 때 주의 사항
- 이벤트의 이름은 카멜 표기법으로 작성한다
- 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달한다
- DOM 요소에만 이벤트를 설정할 수 있다
  - div, button, input, form, span 같은 DOM 요소에는 이벤트를 설정할 수 있지만, 우리가 직접 만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없다
  ```js
  <MyComponent onClick={doSomething}/>
  ```
  위와 같은 경우는 그냥 이름이 onClick인 props를 MyComponent에게 전달해줄 뿐이다
  ```js
  <div onClick={this.props.onClick}>
  ...
  </div>
  ```
  이렇게 전달받은 props를 컴포넌트 내부의 DOM 이벤트로 설정할 수는 있다  
  
#### 이벤트 종류
```js
Clipboard, Touch, Composition, UI, Keyboard, Wheel, Keyboard, Wheel, Focus, Media, Form, Image, Mouse, Animation, Selection, Transition ...
```

### 4.2 예제로 이벤트 핸들링 익히기 
`클래스형 컴포넌트`
- 순서
  - 컴포넌트 생성
  - onChange 이벤트 핸들링 하기
  - 임의 메서드 만들기
  - input 여러개 다루기
  - onKeyPress 이벤트 핸들링 하기

#### 컴포넌트 생성
하던대로 EventPractice 클래스형 컴포넌트 생성하여 App.js에서 부르는 코드 작성하기

#### onChange 이벤트 핸들링 하기
```js
onChange={
  (e) => {
    console.log(e);
   }
}
```
이때 콘솔에 기록되는 e객체는 **SyntheticEvent**  
- SyntheticEvent
  - 웹 브라우저의 네이티브 이벤트를 감싸는 객체
  - 네이티브 이벤트와 인터페이스가 같으므므로 순수 자바스크립트에서 HTML 이벤트를 다룰 때와 똑같이 사용하면 된다
  - 그러나 네이티브 이벤트와 달리 이벤트가 끝나고 나면 이벤트가 초기화되므로 정보를 창조할 수 없다
  - 따라서 비동기적으로 이벤트 객체를 참조할 일이 있다면 e.persist()함수를 호출해줘야 한다
  
  
ex) onChange 이벤트가 발생할 때, 앞으로 변할 인풋값을 콘솔에 기록하는 코드(값이 바뀔 때마다 바뀌는 값을 콘솔에 기록함)
```js
onChange={
  (e) => {
    console.log(e.target.value);
   }
}
```
- **state에 input 값 담기**
  - 생성자 메서드인 constructor에서 state 초기값 설정
  ```js
  state = {
    message: ''
  } 
  ```
  - 이벤트 핸들링 함수 내부에서 this.setState 메서드 호출하여 state 업데이트 하기
  ```js
  onChange={
    (e) => {
      this.setState({
        message: e.target.value
        });
     }
  }
  ```
  - input의 value 값을 state에 있는 값으로 설정하기
  ```js
  value={this.state.message}
  ```

여기까지 했다면 인풋값이 state에 잘 담겼을 것이다  

- **버튼 누를 때 인풋값을 공백으로 설정**  
앞 과정이 잘 됐는지 확인할 겸, 버튼 클릭시 인풋값을 alert으로 띄우고 인풋값은 초기화해보기
```js
//지금까지 했던 인풋
<input
  ...
  value={this.state.message}
  onChange={
    (e) => {
      this.setState({
        message: e.target.value
        });
     }
  }
 />
 //버튼 생성
<button onClick={
  () => {
    alert(this.state.message);
    this.setState({ 
      message: '';
      });
  }
}>확인</button>
```

#### 임의 메서드 만들기
이벤트를 처리할 때 렌더링과 동시에 함수를 만들어 전달하는 방법으로 지금껏 작성했는데, 이번엔 함수를 미리 준비하여 전달하는 방법을 알아볼 예정  
(기능상 차이 거의 없음 / 가독성은 높음 / 그때 그때 편한 걸로 사용)
- 바벨의 **transform-class-properties** 문법을 사용
```js
class EventPractice extends Component {
  state = {
    message: ''
  }
  
  handleChange = e => {
  this.setState({
      message: e.target.value
    });
  }
  
   handleClick = e => {
    alert(this.state.message);
    this.setState({
      message: ''
    });
  }
 
 
 render() {
  return (
  ...
    <input
    ...
    value={this.state.message}
    onChange={this.state.handleChange}
   />
  
    <button onClick={this.state.handleClick}>확인</button>
  );
 }
}

```
깔끔!  

#### input 여러개 다루기
- e.target.name
  onChange이벤트 핸들러에서 e.target.name은 해당 인풋의 name을 

#### onKeyPress 이벤트 핸들링 하기
위와 아주아주 유사하므로 이 부분만 적어보자면
```js
handleKeyPress = e => {
  if(e.key === 'Enter') {
    this.handleClick();
  }
}
```




## 5장
### 5.1 ref는 어떤 상황에서 할까
**DOM을 꼭 직접 건드려야할 때** ref를 사용한다

- 순서
  - ValidationSample 컴포넌트 만들기
  - input에 ref 달기
  - 버튼을 누를 때 input에 포커스 주기

> 잠시 스킵

- state 만으로 해결할 수 없는 기능 예시
  - 특정 input에 포커스 주기
  - 스크롤 박스 조작하기
  - Canvas 요소에 그림 그리기 등  
  
이때는 어쩔 수 없이 DOM에 직접적으로 접근해야하는데 이를 위해 ref 사용
  
### 5.2 ref 사용
#### ref 사용하는 방법
  - 콜백 함수를 통한 ref 설정
  ref를 달고자하는 요소에 `ref라는 콜백함수`를 props로 전달해주면 되고, 이 콜백함수는 `ref값`을 파라미터로 전달받는다  
  그리고 함수 내부에서 파라미터로 받은 ref를 컴포넌트의 멤버 변수로 설정해준다
  ```js
  <input
      ref={(ref) => {
          this.input = ref;
      }}
  />
  ```
  이렇게 하면 this.input은 input 요소의 DOM을 가리키지만 DOM타입과 관계없이 `this.nawon = ref` 이렇게 마음대로 이름 지정해도 된다  
  
  - createRef를 통한 ref 설정
  컴포넌트 내부에서 멤버 변수로 React.createRef()를 담아주어야한다  
  그리고 해당 멤버 변수를 ref를 달고자 하는 요수에 ref props로 넣어주면 ref 설정 완료된다  
  
  ```js
  import React, { Component } from "react";

  class RefSample extends Component {
      input = React.createRef();

      handleFocus = () => {
          this.input.current.focus();
      };

      render() {
          return (
              <div>
                  <input ref={this.input} />
              </div>
          );
      }
  }

export default RefSample;
```

#### 5.3 컴포넌트 ref 달기
> to be continued
