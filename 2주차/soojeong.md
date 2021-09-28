# 2주차 React 스터디 정리

| 장  | 제목                 |
| --- | -------------------- |
| 4장 | 이벤트 핸들링        |
| 5장 | ref: DOM에 이름 달기 |

## 4장

**이벤트란 ?** 사용자가 웹 브라우저에서 DOM요소들과 상호작용하는 것.

### 4.1 리액트의 이벤트 시스템

**이벤트를 사용하기 전, 주의 사항**

1. 이벤트 이름은 **_카멜 표기법으로 작성_**한다.

2. 이벤트에 실행할 자바스크립트 코드를 전달 X -> **_함수 형태의 값을 전달_**한다.  
   => 화살표 함수 문법으로 함수를 만들어 직접 전달해도 되고, 렌더링 부분 외부에 미리 만들어놓고 전달하는 방법들이 있다.

3. **_DOM요소에만 이벤트를 설정_**할 수 있다.  
   => DOM 요소에는 이벤트 설정이 가능하지만, 우리가 직접 만든 컴포넌트 자체에서는 설정할 수 없다. 전달받은 props를 컴포넌트 내부의 DOM 이벤트로 설정할 수는 있다.

<br/>

### 4.2 예제로 이벤트 핸들링 익히기

#### onChange 이벤트

```jsx
import React, { Component } from "react";

class EventPractice extends Component {
    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input
                    type="text"
                    name="message"
                    palceholder="아무거나 입력"
                    onChange={(e) => {
                        console.log(e);
                    }}
                />
            </div>
        );
    }
}
```

위 코드에서 아래 코드는

```jsx
onChange={
    (e) => {
        console.log(e);
    }
}
```

콘솔에 기록되는 e는 SyntheticEvent로, 웹 브라우저의 네이티브 이벤트를 감싸는 객체라고 할 수 있다.  
**SyntheticEvent** => 네이티브 이벤트와 달리 이벤트가 끝나고나면 초기화 되므로 정보를 참조할 수 없다. 비동기적으로 이벤트 객체를 참조할 일이 있으면 e.persist() 함수를 호출해야 한다!

<br />

#### state에 input 값 담아보기

class에 state 초깃값을 설정해주고, 이벤트 핸들링 함수 내부에서 this.setState 메서드를 호출하여 state를 업데이트 할 수 있다.

```jsx
/*초기값 설정*/
    state = {
        message : ''
    }

/*input에 value와 setState 추가*/
onChange={
    (e) => {
        this.setState({
            message : e.target.value
        })
    }
}
```

위 코드를 실행시켜보면, input 값이 state로 잘 들어갔는지 확인할 수 없다.  
button 예제코드를 하나 더 추가하여 확인해보려고 한다.

```jsx
<button onClick={
    () => {
        alert(this.state.message);
        this.setState({
            message : ''
        });
    }
>확인</button>
```

확인 버튼을 누르면, state에 값이 잘 들어가는 것을 확인할 수 있다.

<br />

#### 임의 메서드 다루기

지금까지의 예제들은 이벤트를 처리하면서 렌더링하는 동시에 함수를 만들어 전달했다.  
이 방법 대신, 함수를 <u>미리 준비하는 방법</u>이 있는데 **가독성이 훨씬 높다는 장점**이 있다.

+_상황에 따라 렌더링 메서드 내부에서 만드는 것이 효율적일 때도 있음 !_

```jsx
constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
}

handleChange(e) {
    this.setState({
        message: e.target.value
    });
}

handleClick() {
    alert(this.state.message);
    this.setState({
        message: ''
    });
}
```

임의 메서드가 이벤트로 등록되어도 this를 컴포넌트 자신으로 제대로 가리키기 위해서는 메서드를 <u>this와 바인딩하는 작업이</u>이 필요하다.  
해당 constructor 함수에서 바인딩이 이루어지는 것을 볼 수 있다.

메서드 바인딩은 생성자 메서드에서 하는 것이 정석이나,  
간결하게 나타낼 수 있는 방법으로 **transform-class-properties 문법**을 사용하여 **"화살표 함수"** 형태로 메서드를 정의하는 것이다.

이를 이용하면, constructor 함수 부분이 사라지고, 아래와 같이 간결하게 표현할 수 있다.

```jsx
handleChange = (e) => {
    this.setState({
        message: e.target.value,
    });
};

handleClick = () => {
    alert(this.state.message);
    this.setState({
        message: "",
    });
};
```

<br/>

#### Input 여러 개 다루기

event 객체를 활용하여 **e.target.name**을 사용하면 된다.  
e.target.name에서의 'name'은 선언한 해당 인풋의 변수를 가리킨다.

```jsx
handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
};
```

객체 안에서 key를 []로 감싸면, 그 안에 넣은 레퍼런스가 가리키는 실제 값이 key 값으로 사용된다.

<br/>

#### onKeyPress 이벤트 핸들링

위 예제처럼 확인버튼을 누르지 않고도, 텍스트 입력 후 엔터키를 눌러 넘어가도록 만들 수 있다.

```jsx
/*keyClick 함수 만들기*/
handleKeyClick = (e) => {
    if(e.key === 'Enter') {
        this.handleClick();
    }
}

/*엔터를 눌러 넘어가고 싶은 input에 이벤트 추가하기*/
onKeyPress = {this.handleKeyClick}
```

해당 이벤트를 추가한 후, 엔터키를 누르면 handleClick() 이벤트가 실행된다.  
그리고 message Input에서 텍스트를 입력 후, 엔터를 누르면 확인버튼을 눌렀을 때와 똑같은 실행결과가 나타난다.

<br/>

## 5장

> 컴포넌트 **"내부"**에서 **"DOM에 직접 접근해야 할 때"**는 ref를 사용한다. ref를 사용하지 않고도 원하는 기능을 구현할 수 있는지 고려한 후 사용하자!

> 서로 다른 컴포넌트끼리 데이터를 교류할 때 ref를 사용하는 것은 잘못된 것이다.컴포넌트끼리 데이터교류를 할 땐, 언제나 데이터를 **부모<->자식** 흐름으로 교류해야 한다는 것을 잊지 말자 !

<br/>

### 5.1 ref는 어떤 상황에서 사용해야 할까?

**- ref는 "DOM을 직접적으로 건드려야 할 때 사용한다."**

5장에서는 클래스형 컴포넌트로 ref를 만들어볼 예정이다.  
+함수형 컴포넌트로 ref를 사용하려면 Hooks를 이용해야 한다.

DOM을 꼭 사용해야 하는 상황(직접적으로 접근해야 할 때)

-   특정 Input에 포커스 주기
-   스크롤 박스 조작하기
-   Canvas 요소에 그림 그리기

<br/>

### 5.2 ref 사용

> ref를 사용하는 방법은 2가지이다.

1. **콜백 함수를 통한 ref 설정**  
   ref를 달고자 하는 요소에 ref라는 콜백 함수를 props로 전달해주면 된다.  
   콜백 함수는 ref를 파라미터로 전달받고, 함수 내부에서 ref를 컴포넌트의 멤버 변수로 설정해준다.

    ```jsx
    <input
        ref={(ref) => {
            this.input = ref;
        }}
    />
    ```

    위 예시코드와 같이 쓸 수가 있는데,  
     this.input은 input 요소의 DOM을 가리킨다고 볼 수 있다.  
     ref의 이름은 원하는 것으로 지정할 수 있으며, DOM 타입과 관계없이 this.superman = ref 처럼 마음대로 지정한다.

2. **createRef를 통한 ref 설정**  
   createRef는 리액트에 내장되어 있는 함수다.(v16.3버전부터 적용)

    ```jsx
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

    우선 컴포넌트 내부에서 멤버 변수로 React.createRef()를 담아야 한다.  
     그리고 해당 멤버 변수를 ref를 달고자 하는 요소에 ref.props 요소로 넣어주면 된다.  
     후에 ref를 설정해 준 DOM에 접근하고 싶다면, this.input.current를 조회하면 된다.  
     **<-> 콜백함수와 다른 점: 뒷 부분에 .current를 넣어주어야 한다.**

    - ref 예제 적용시켜보기  
      5장에 나오는 예제인 ValidationSample.js 에 콜백함수를 적용시켜 볼 것이다.

    ```jsx
    handleButtonClick = () => {
        this.setState({
            clicked: true,
            valudated: this.state.password === '0000'
        });
        this.inputPassword.focus();
    }

    render(){
        return(
            <div>
                <input
                    ref= {(ref) => this.inputPassword=ref}
                    type='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''}
                 />
                 <button onClick={this.handleButtonClick}>검증하기</button>
            </div>
        );
    }
    ```

    input에 콜백함수를 이용하여 this.inputPassword 라는 이름으로 지정해주었다.  
     그리고 버튼클릭 이벤트에 해당 DOM에 포커싱되도록 focus 함수를 넣었다.  
     실행시켜보면, 비밀번호를 누르고 검증하기 버튼을 눌렀을 때 Input 창에 커서가 깜빡깜빡 머물러 있는 것을 볼 수 있다.

<br/>

### 5.3 컴포넌트에 ref 달기

5.2에서는 DOM 요소에 ref를 달았다면, 이번에는 컴포넌트 자체에 ref를 달아볼 것이다.  
사용법은 부모 컴포넌트인 App.js로 들어간 후,

```jsx
<MyComponent
    ref={(ref) => {
        this.myComponent = ref;
    }}
/>
```

식으로 선언하며, MyComponent 내부의 메서드나 멤버 변수에 접근할 수 있다.  
ex ) myComponent.input , myComponent.handleClick 등등 ,,

ref와 컴포넌트를 활용하여 스크롤바 내리기 예제를 만들어볼 것이다.  
예제의 순서는

1.  ScrollBox 컴포넌트 만들기
2.  컴포넌트에 ref 달기
3.  ref를 이용하여 컴포넌트 내부 메서드 호출하기
    로 진행할 것이다.

ScrollBox 컴포넌트를 만들고 최상위 DOM인 div에 ref를 단 코드다.

```jsx
import React, { Component } from "react";

class ScrollBox extends Component {
    render() {
        const style = {
            border: "1px solid black",
            height: "300px",
            width: "300px",
            overflow: "auto",
            position: "relative",
        };

        const innerStyle = {
            width: "100%",
            height: "650px",
            background: "linear-gradient(white, black)",
        };

        return (
            <div
                style={style}
                ref={(ref) => {
                    this.box = ref;
                }}
            >
                <div style={innerStyle}></div>
            </div>
        );
    }
}
```

위 코드를 입력하면 스크롤이 있는 박스가 하나 생성된다.  
그리고 버튼을 눌렀을 때, 스크롤을 아래쪽으로 이동시키는 예제 코드도 써보려고 한다.  
이때 이용해야 할 것은 DOM 노드가 가진 다음의 값들을 사용한다.

-   ScrollTop : 세로 스크롤바 위치 (0~350)
-   ScrollHeight : 스크롤이 있는 박스 안의 div 높이 (650)
-   ClientHeight : 스크롤이 있는 박스의 높이 (300)

```jsx
class ScrollBox extends Component {
    scrollToBottom = () => {
        const { scrollHeight, clientHeight } = this.box;
        /*위 문장은 비구조화 할당 문법
            const scrollHeight = this.box.scrollHeight;
            const clientHeight = this.box.clientHeight; 와 같은 의미다.
        */
        this.box.scrollTop = scrollHeight - clientHeight;
    };
}
```

부모 컴포넌트인 App 컴포넌트 파일로 가서, ScrollBox에 ref를 달아줄 것이다.

```jsx
class App extends Component {
    render() {
        return (
            <div>
                <ScrollBox ref={(ref) => (this.scrollBox = ref)} />
                <button onClick={() => this.scrollBox.scrollToBottom()}>
                    맨 밑으로
                </button>
            </div>
        );
    }
}
```

'맨 밑으로' 버튼을 누르면 스크롤이 맨 아래로 내려가는 것을 볼 수 있다.

<br/>

**컴포넌트가 처음 렌더링 될 때는 값이 undefined다.**  
그래서 onClick = {this.scrollBox.scrollToBottom} 이라고 쓰면 오류가 날 수 있다.  
위 코드와 같이 **화살표 함수 문법을 사용하여 새로운 함수를 만들고, 그 내부에서 메서드를 실행**하면 버튼을 누를 때 this.scrollBox.scrollToBottom 값을 읽어 와서 실행하므로 오류가 발생하지 않는다.

---

<모르는 점 질문>

1. 4장 이벤트핸들링 마지막 예제코드에서 기존의 form 내용을 복사하라고 나와있는데 form 내용이 전 예제코드의 어디부터 어디까지를 말하는건지를 잘 모르겠습니다.

2. 5장(154p) 컴포넌트 메서드 생성에서 왜 ScrollTop 값이 0부터 350까지인지 모르겠습니다.
