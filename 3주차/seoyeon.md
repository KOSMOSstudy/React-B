# 3주차(6, 7, 8장)

# <6장 : 컴포넌트 반복>

## 6.1 자바스크립트 배열의 map() 함수

→ 목표 : 리액트 프로젝트에서 반복적인 내용을 효율적으로 보여 주고 관리하는 방법

### 6.1.1 문법

```jsx
arr.map(callback, [thisArg])
```

- callback : 새로운 배열의 요소를 생성하는 함수 (파라미터 3가지)
    - currentValue: 현재 처리하고 있는 요소
    - index : 현재 처리하고 있는 요소의 index 값
    - array : 현재 처리하고 있는 원본 배열
- thisArg(선택적) : callback 함수 내부에서 사용할 this reference

### 6.1.2 예제

```jsx
//map 함수를 사용한 배열 [1,2,3,4,5]의 각 요소를 제곱해서 새로운 배열을 생성하기

var numbers = [1, 2, 3, 4, 5];

var processed = numbers.map(function(num)){
	return num * numb;
});

console.log(processed);
```

※ 콘솔에서 [Shift] + [Enter] 를 누르면 새 줄을 들여 쓸 수 있음

→ **map 함수는 기존 배열로 새로운 배열을 만드는 역할**

```jsx
const numbers = [1, 2, 3, 4, 5];               // var 키워드 대신 const
const result = numbers.map(num=>num * num);    // function 대신 화살표 함수
console.log(result);
```

## 6.2 데이터 배열을 컴포넌트 배열로 변환하기

→ 기존 배열로 컴포넌트로 구성된 배열 생성 가능

### 6.2.1 컴포넌트 수정하기

```jsx
import React from 'react';

const IterationSample = () => {
	const names = ['눈사람', '얼음', '눈', '바람'];
	const nameList = names.map(name => <li>{name}</li>);
	return <ul>{nameList}</ul>;
};

export default IterationSample;
```

→ 문자열로 구성된 배열을 선언하고 JSX 코드로 된 배열을 새로 생성한 후 nameList에 담는다.

→ map 함수에서 JSX 작성 시, DOM 요소를 작성해도 되고 컴포넌트를 사용해도 된다.

### 6.2.2 App component에서 예제 component rendering

```jsx
import React, {Component} from 'react';
import IterationSample from './IterationSample';

class App extends Component {
	render() {
		return (
			<IterationSample/>
		);
	}
}

export default App;
```

→ 실행 시, key가 없다는 경고 message를 받음.

## 6.3 key

- 사용 목적 : 컴포넌트 배열을 렌더링했을 때, 어떤 원소에 변동이 있었는지 알아내려고 사용. 유동적인 데이터를 다룰 때에는 원소를 새로 생성 또는 제거, 수정도 가능.
- key가 없으면 Virtual DOM을 비교하는 과정에서 리스트를 순차적으로 비교하면서 변화를 감지.
- key를 사용하면 key를 사용하여 어떤 변화가 일어났는지 더욱 빠르게 알아낼 수 있다.

### 6.3.1 key 설정

→ key값 설정 시, map 함수의 인자로 전달되는 함수 내부에서 컴포넌트 props를 설정하듯이 설정.

→ key 값은 언제나 유일해야 함. (데이터가 가진 고유값을 key 값으로 설정)

ex) 게시판의 게시물을 렌더링한다면 게시물 번호를 key 값으로 설정

```jsx
const articleList = articles.map(article => (
	<Article
		title={article.title}
		writer={article.writer}
		key={article.id}
	/>
);
```

→ 고유 번호가 없는 경우? : map 함수에 전달되는 callback 함수의 인수인 index 값을 사용

```jsx
import React from 'react';

const IterationSample = () => {
	const names = ['눈사람', '얼음', '눈', '바람'];
	const nameList = names.map((name, index) => <li key={index}>{name}</li>);
	return <ul>{nameList}</ul>;
};

export default IterationSample;
```

→ 이렇게 하면 key 없다고 오류 메세지가 안뜸

→ 그렇지만 고유한 값이 없을 때만, index 값을 key로 사용해야한다.

→ index를 key로 사용하면 배열이 변경될 때 효율적으로 rerendering하지 못함. 왜지

## 6.4 응용

- 목표 : 동적인 배열 렌더링 및 index 값을 key로 사용해야 하는 상황(고유한 값이 없을 때)에서 어떻게 고유 값을 만들 수 있는지 알아보기
1. **초기 상태 설정   2. 데이터 추가 기능 구현   3. 데이터 제거 기능 구현**

### 6.4.1 초기 상태 설정하기

- useState를 사용하여 상태를 설정
1. 데이터 배열   2. input의 상태(텍스트 입력)   3.새로운 항목 추가 시 사용할 고유 id를 위한 상태

```jsx
import React, {useState} from 'react';

const IterationSample = () => {
	const [names, setNames] = useState([
		{ id: 1, text: '눈사람' },
		{ id: 2, text: '얼음' },
		{ id: 3, text: '눈' },
		{ id: 4, text: '바람' }
	]);
	const [inputText, setInputText] = useState('');
	const [nextId, setNextId] = useState(5);   // 새로운 항목을 추가할 때 사용할 id

	const nameList = names.map(name => <li key={name.id}>{name.text}</li>);
	return <ul>{namesList}</ul>;
);

export default IterationSample;
```

### 6.4.2 데이터 추가 기능 구현하기

```jsx
import React, { useState } from 'react';

const IterationSample = () => {
	const [names, setNames] = useState([
		{ id: 1, text: '눈사람' },
		{ id: 2, text: '얼음' },
		{ id: 3, text: '눈' },
		{ id: 4, text: '바람' }
	]);
	const [inputText, setInputText] = useState('');
	const [nextId, setNextId] = useState(5);    // 새로운 항목을 추가할 때 사용할 id

	const onChange = e => setInputText(e.target.value);

	const namesList = names.map(name => <li key={name.id}>{name.text}</li>);
	return (
		<>
			<input value={inputText} onChange={onChange} />
			<button> 추가 </button>
			<ul>{namesList}</ul>
		</>
	);
};

export default IterationSample;
```

↓ onClick 함수까지 구현

```jsx
import React, { useState } from 'react';

const IterationSample = () => {
	const [names, setNames] = useState([
		{ id: 1, text: '눈사람' },
		{ id: 2, text: '얼음' },
		{ id: 3, text: '눈' },
		{ id: 4, text: '바람' }
	]);
	const [inputText, setInputText] = useState('');
	const [nextId, setNextId] = useState(5);    // 새로운 항목을 추가할 때 사용할 id

	const onChange = e => setInputText(e.target.value);
	
	// 이 부분을 새로 구현.
	**const onClick = () => {
		const nextNames = names.concat({
					id: nextId, // nextId 값을 id로 설정하고
					text: inputText
		});
		setNextId(nextId + 1);  // nextId 값에 1 더하기
		setNames(nextNames);    // names 값을 업데이트 한다.
		setInputText('');       // inputText를 비운다.
	};**
	
	const namesList = names.map(name => <li key={name.id}>{name.text}</li>);
	return (
		<>
			<input value={inputText} onChange={onChange} />
			<button> 추가 </button>
			<ul>{namesList}</ul>
		</>
	);
};

export default IterationSample;
```

→ 기존 코드와의 차이점 : push 안 쓰고 concat을 사용 (즉, concat이 새로운 배열을 만들어준다)

**※ 불변성 유지 : 리액트에서 기존 상태를 그대로 두면서 새로운 값을 상태로 설정하는 것.**

→ 불변성 유지를 해야 나중에 리액트 컴포넌트의 성능을 최적화 할 수 있음.

- 데이터 제거 기능 구현하기

→ filter 함수 사용 : 배열에서 특정 조건을 만족하는 원소들만 쉽게 분류할 수 있음

↓ filter 함수를 사용하여 IterationSample 컴포넌트의 항목 제거 기능을 구현

```jsx
import React, { useState } from 'react';

const IterationSample = () => {
	const [names, setNames] = useState([
		{ id: 1, text: '눈사람' },
		{ id: 2, text: '얼음' },
		{ id: 3, text: '눈' },
		{ id: 4, text: '바람' }
	]);
	const [inputText, setInputText] = useState('');
	const [nextId, setNextId] = useState(5);    // 새로운 항목을 추가할 때 사용할 id

	const onChange = e => setInputText(e.target.value);
	
	const onClick = () => {
		const nextNames = names.concat({
					id: nextId, // nextId 값을 id로 설정하고
					text: inputText
		});
		setNextId(nextId + 1);  // nextId 값에 1 더하기
		setNames(nextNames);    // names 값을 업데이트 한다.
		setInputText('');       // inputText를 비운다.
	};

	// 이 부분을 새로 구현
	**const onRemove = (id) => {
    const nextNames = names.filter((name) => name.id !== id);
    setNames(nextNames);
	};**

	const namesList = names.map((name) => (
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
        {name.text}
    </li>
	));
	
	const namesList = names.map(name => <li key={name.id}>{name.text}</li>);
	return (
		<>
			<input value={inputText} onChange={onChange} />
			<button> 추가 </button>
			<ul>{namesList}</ul>
		</>
	);
};

export default IterationSample;
```

## 6.5 정리

1. component 배열을 렌더링할 때에는 key 값 설정에 항상 주의해야 한다. 
2. key 값은 언제나 유일해야 한다. (key 값 중복 시 렌더링 과정에서 오류가 발생)
3. 배열을 변경할 때에는 직접 접근 X / concat, filter 등의 내장 함수를 사용하여 새로운 배열을 만든 후, 새로운 상태로 설정해주어야 함. 

# <7장 : 컴포넌트의 라이프사이클 메서드>

## 7.1 라이프사이클 메서드의 이해

![Untitled](3%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(6,%207,%208%E1%84%8C%E1%85%A1%E1%86%BC)%2056efcf44cec2492b8a81e737365d5590/Untitled.png)

- 라이프사이클 메서드의 종류는 총 9가지
    - Will 접두사가 붙은 메서드 : 어떤 작업을 작동하기 전에 실행되는 메서드
    - Did : 접두사가 붙은 메서드는 어떤 작업을 작동한 후에 실행되는 메서드

→ 이 메서드 들은 우리가 컴포넌트 클래스에서 덮어 써 선언함으로써 사용할 수 있음

- 라이프 사이클은 1. 마운트   2. 업데이트   3. 언마운트   세 가지 카테고리로 나뉜다.

- 마운트 : DOM이 생성되고 웹 브라우저 상에 나타나는 것을 마운트라고 한다.
    
    ![Untitled](3%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(6,%207,%208%E1%84%8C%E1%85%A1%E1%86%BC)%2056efcf44cec2492b8a81e737365d5590/Untitled%201.png)
    
    - constructor: 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드
    - getDerivedStateFromProps: props에 있는 값을 state에 넣을 때 사용하는 메서드
    - render : 우리가 준비한 UI를 렌더링하는 메서드
    - componentDidMount : 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드

- 업데이트 되는 경우
1. props가 바뀔 때
2. state가 바뀔 때
3. 부모 컴포넌트가 리렌더링 될 때
4. this.forceUpdate로 강제로 렌더링을 trigger 할 때

![Untitled](3%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(6,%207,%208%E1%84%8C%E1%85%A1%E1%86%BC)%2056efcf44cec2492b8a81e737365d5590/Untitled%202.png)

- 언마운트 : 마운트의 반대 과정으로, 컴포넌트를 DOM에서 제거하는 것을 말함
    
    ![Untitled](3%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(6,%207,%208%E1%84%8C%E1%85%A1%E1%86%BC)%2056efcf44cec2492b8a81e737365d5590/Untitled%203.png)
    
    - componenetWillUnmount : 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출
    

## 7.2 라이프사이클 메서드 살펴보기

### 7.2.1 render() 함수

→ 라이프 사이클 메서드 중 유일한 필수 메서드

→ this.props와 this.state에 접근 가능하고 리액트 요소를 반환한다. 

- 요소는 div 같은 태그가 될 수도 있고, 다로 선언한 컴포넌트가 될 수도 있음.
- 아무것도 보여주고 싶지 않을 때에는 null 값이나 false 값을 반환하기
- 이벤트 설정이 아닌 곳에서 setState를 사용하면 X
- 브라우저의 DOM에 접근해서도 X
- DOM 정보를 가져오거나 state에 변화를 줄 때에는 componentDidMount에서 처리해야함

### 7.2.2 constructor 메서드

→ 컴포넌트의 생성자 메서드. 컴포넌트를 만들 때 처음으로 실행됨. 이 메서드에서는 초기 state를 설정할 수 있음.

### 7.2.3 getDerivedStateFromProps 메서드

```jsx
static getDerivedStateFromProps(nextProps, prevState) {
	if(nextProps.value !== prevState.value) {   //조건에 따라 특정 값 동기화
		return { value: nextProps.value };
	}
	return null;   // state를 변경할 필요가 없다면 null을 반환
}
```

- react v16.3 이후에 새로 만든 라이프사이클 메서드. props로 받아온 값을 state에 동기화시키는 용도로 사용하며, 컴포넌트가 마운트될 때와 업데이트 될 때 호출된다.

### 7.2.4 componentDidMount 메서드

```jsx
componenetDidMount() { ... }
```

→ 컴포넌트를 만들고 첫 렌더링을 다 마친 후 실행함. 

→ 다른 JS 라이브러리 또는 프레임워크의 함수를 호출하거나 이벤트 등록, setTimeout, setInterval, 네트워크 요청 같은 비동기 작업을 처리함

### 7.2.5 shuldComponentUpdate 메서드

```jsx
shouldComponentUpdate(nextProps, nextState) { ... }
```

- props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메서드.
- 반드시 true 값 또는 false 값을 반환해야 함. (기본적으로는 true  값 반환 / false 값 반환 시 중지)
- 현재 props와 state는 this.props와 this.state로 접근하고 새로 설정돌 props 또는 state는 nextProps와 nextState로 접근할 수 있음

### 7.2.6 getSnapshotBeforeUpdate 메서드

```jsx
getSnapshotBeforeUpdate(prevProps, prevState) {
	if(prevState.array !== this.state.array) {
		const { scrollTop, scrollHeight } = this.list
		return {scrollTop, scrollHeight };
	}
}
```

- 리액트 v16.3 이후에 만든 메서드.
- render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출됨.
- 반환값은 componentDidUpdate에서 세 번째 파라미터인 snapshot 값으로 전달 받을 수 있고 주로 업데이트하기 직전의 값을 참고할 일이 있을 때 활용된다.( ex, 스크롤바 위치 유지)

### 7.2.7 componenetDidUpdate 메서드

```jsx
componentDidUpdate(prevProps, prevState, snapshot) { ... }
```

- reRendering을 완료한 후에 실행. (업데이트 끝난 직후) 즉, DOM 관련 처리를 해도 무방함
- 여기서 prevProps 또는 prevState를 활용하여 컴포넌트가 이전에 가졌던 데이터에 접근할 수 있음
- getSnapshotBeforeUpdate에서 반환한 값이 있다면 여기서 snapshot 값을 전달받을 수 있음

### 7.2.8 componentWillUnmount 메서드

```jsx
componenetWillUnMount() { ... }
```

- component를 DOM에서 제거할 때 실행
- componentDidMount에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거 작업을 해야 한다.

### 7.2.9 componenetDidCatch 메서드

```jsx
componenetDidCatch(error, info) {
	this.setState({
		error: true
	});
	console.log({ error, info });
}
```

- error : 컴포넌트에 어떤 에러가 생겼는지 알려줌
- info : 어디에 있는 코드에서 오류가 발생했는지에 대한 정보를 줌.
- 서버 API를 호출하여 따로 수집할 수도 있음!
- 컴포넌트 자신에게 발생하는 에러를 잡아낼 수 없고 자신의 this.props.children으로 전달되는 컴포넌트에서 발생하는 에러만 잡아낼 수 있다

## 7.3 라이프사이클 메서드 사용하기

![Untitled](3%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(6,%207,%208%E1%84%8C%E1%85%A1%E1%86%BC)%2056efcf44cec2492b8a81e737365d5590/Untitled%204.png)

### 7.3.1 예제 컴포넌트 생성

```jsx
import React, { Component } from "react";

class LifeCycleSample extends Component {
    state = {
        number: 0,
        color: null,
    };

    myRef = null;    //ref를 설정할 부분

    constructor(props) {
        super(props);
        console.log("constructor");
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("getDerivedStateFromProps");
        if (nextProps.color !== prevState.color) {
            return { color: nextProps.color };
        }
        return null;
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate", nextProps, nextState);
        //숫자의 마지막 자리가 4이면 리렌더링 X
        return nextState.number % 10 !== 4;
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    handleClick = () => {
        this.setState({
            number: this.state.number + 1,
        });
    };

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("getSnapshotBeforeUpdate");
        if (prevProps.color !== this.props.color) {
            return this.myRef.style.color;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate", prevProps, prevState);
        if (snapshot) {
            console.log("업데이트되기 직전 색상 : ", snapshot);
        }
    }

    render() {
        console.log("render");

        const style = {
            color: this.state.color,
        };

        return (
            <div>
                <h1 style={style} ref={(ref) => (this.myRef = ref)}>
                    {this.state.number}
                </h1>
                <p>color: {this.state.color}</p>
                <button onClick={this.handleClick}>더하기</button>
            </div>
        );
    }
}

export default LifeCycleSample;
```

- getDerivedStateFromProps는 부모에게서 받은 color 값을 state에 동기화 하고 있음
- getSnapshotBeforeUpdate는 DOM에 변화가 일어나기 직전의 색상 속성을 snapshot 값으로 반환하여 이것을 componentDidUpdate에서 조회할 수 있게 했음

### 7.3.2 App 컴포넌트에서 예제 컴포넌트 사용

```jsx
import React, { Component } from "react";
import "./App.css";
import LifeCycleSample from "./LifeCycleSample";

function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
    state = {
        color: "#000000",
    };

    handleClick = () => {
        this.setState({
            color: getRandomColor(),
        });
    };

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>랜덤 색상</button>
                <LifeCycleSample color={this.state.color} />
            </div>
        );
    }
}

export default App;
```

- getRandomColor 함수는 state의 color 값을 랜덤 색상으로 설정한다.

※ React.StrictMode 적용

- React.StrictMode가 적용되어 있으면 일부 라이브사이클이 두 번씩 호출된다. 개발 환경에서만 두 번씩 호출되고 프로덕션 환경에서는 정상적으로 호출됨. (App Component만 렌더링하면 한 번만 호출된다)

### 7.3.3 에러 잡아내기

render함수를 다음과 같이 수정함.

```jsx
//render 함수 retrn 값에 
{this.props.missing.value}   //추가
```

※ ErrorBoundary 라는 컴포넌트를 생성

```jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
	state = {
		error: false
	};
	componentDidCatch(error, info){
		this.setState({
			error: true
		});
		console.log({error, info});
	}
	render(){
		if(this.state.error)
			return <div>에러가 발생했습니다</div>;
		return this.props.children;
	}
}
export default ErrorBoundary;
```

에러 발생 시, componentDidCatch 메서드가 호출.

이 메서드는 this.state.error 값을 true로 업데이트 해줌. 

render 함수는 this.state.error 값이 true라면 에러가 발생했음을 알리는 메세지를 띄움

ErrorBoundary를 사용하려면

```jsx
import ErrorBoundary from './ErrorBoundary';    // 추가

//기존 <LifeCycleSample color={this.state.color} /> 부분을
<ErrorBoundary></ErrorBoundary>    // 로 감싸준다.
```

## 7.4 정리

![Untitled](3%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(6,%207,%208%E1%84%8C%E1%85%A1%E1%86%BC)%2056efcf44cec2492b8a81e737365d5590/Untitled%205.png)

# <8장 : Hooks>

→ Hooks는 리액트 v16.8에 새로 도입된 기능으로 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 렌더링 직후 작업을 설정하는 useEffect등의 기능을 제공하여 기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있게 해 준다.

```jsx
$ yarn create react-app hooks-tutorial    // 새로운 프로젝트 생성
```

## 8.1 useState

↓ useState를 이용해서 숫자 카운터 구현

```jsx
import React, { useState } from 'react';

const Counter = () => {
  const [value, setValue] = useState(0);

  return(
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b>입니다.
      </p>
      <button onClick={() => setValue(value+1)}>+1</button>
      <button onClick={() => setValue(value-1)}>-1</button>
    </div>
  );
};
export default Counter;
```

useState는 import 구문을 통해 불러오고

```jsx
const [value, setValue] = useState(0);
```

을 통해 사용된다.

### 8.1.1 useState를 여러 번 사용하기

```jsx
import React, { useState } from 'react';
const Info = () => {
	const [name, setName] = useState('');
	const [nickname, setNickname] = useState('');

	const onChangeName = e => {
		setName(e.target.value);
	};

	const onChangeNickname = e => {
		setNickname(e.target.value);
	};

	return {
		<div>
			<div>
				<input value={name} onChange={onChangeName} />
				<input value={nickname} onChange={onChangeNickname} />
			</div>
		</div>
		<div>
			<div>
				<b>이름:</b> {name}
			</div>
			<div>
				<b>닉네임:</b> {nickname}
			</div>
		</div>
	);
};

export default Info;
```

이후 실행

```jsx
import React from 'react';
import Info from './Info';

const App = () => {
	return <Info />;
};

export default App;
```

## 8.2 useEffect

- useEffect란 : 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook
- 클래스형 컴포넌트의 componenetDidMount와 componentDidUpdate를 합친 형태로 봐도 무방

```jsx
useEffect(()=>{
  console.log('렌더링이 완료되었습니다');
  console.log({
    name,
    nickname
  });
},[]);
```

### 8.2.1 마운트될 때만 실행하고 싶을 때

```jsx
useEffect(() => {
	console.log('마운트 될 때만 실행');
}, []);
```

### 8.2.2 특정 값이 업데이트될 때만 실행하고 싶을 때

```jsx
useEffect(()=>{
  console.log(name);
},[name]);
```

### 8.2.3 뒷정리하기

```jsx
import React, {useState} from 'react';
import Info from './Info';

const App = () => {
  const [visible, setVisible] = useState(false);
  return(
    <div>
      <button onClick={()=>{
        setVisible(!visible)
      }}>
        {visible ? '숨기기' : '보이기'}
      </button>
      {visible && <Info />}
    </div>
  );
};
export default App;
```

**※ 오직 언마운트 될 때만 뒷정리 하수를 호출하고 싶다면 useEffect 함수의 두번째 파라미터에 비어있는 배열을 넣으면 된다.**

```jsx
useEffect(()=>{
    console.log('effect');
    return() => {
      console.log('unmount');
    };
  },[]);
```

## 8.3 useReducer

- counter 구현하기

```jsx
import React, { useReducer } from 'react';

function reducer(state, action){
  // action.type에 따라 다른 작업 수행
  switch(action.type){
    case 'INCREMENT':
      return {value: state.value + 1};
    case 'DECREMENT':
      return {value: state.value - 1};
    default:
      // 아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}
const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });
  return(
    <div>
      <p>현재 카운터 값은 <b>{state.value}</b></p> 
      <button onClick={() => dispatch({type : 'INCREMENT'})}>+1</button>
      <button onClick={() => dispatch({type : 'DECREMENT'})}>-1</button>
    </div>
  );
}
export default Counter;
```

### 8.3.2 인풋 상태 관리하기

```jsx
import react, {useReducer } from 'react';

function reducer(state, action){
  return{
    ...state,
    [action.name]: action.value
  };
}
const Info = () => {
  const[state, dispatch] = useReducer(reducer, {
    name: '',
    nickname: ''
  });
  const {name, nickname} = state;
  const onChange = e => {
    dispatch(e.target); // e.target 값을 액션 값으로 사용
  };
  return(
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input nickname="nickname" value={nickname} onChange={onChange} />
      </div>
      (...)
    </div>
  );
};
export default Info;
```

## 8.4 useMemo

- useMemo를 사용하여 함수형 컴포넌트 내부에서 발생하는 연산을 최적화 가능

```jsx
import React, { useState } from 'react';

const getAverage = numbers => {
  if(numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');

  const onChange = e => {
    setNumber(e.target.value);
  };

  const onInsert = e => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
  };
  
  const avg = useMemo(() => getAverage(list), [list]);

  return(
    <div>
      <input value = {number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key = {index}>{value}</li>
        ))}
      </ul>
      <div>
          <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```

useMemo Hook을 사용하려면

```jsx
// import 구문을 다음과 같이 수정
import React, { useState, useMemo } from 'react';

// return 함수 바로 위에
const avg = useMemo(() => getAverage(list), [list]);

// div 평균값을 출력하는 부분에 다음과 같이 입력
<b> 평균값: </b> {avg}
```

## 8.5 useCallback

- useCallback을 활용해서 Averge 컴포넌트를 최적화 할 때 다음과 같은 추가 코드를 삽입

```jsx
const onChange = useCallback(e => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

  const onInsert = useCallback(e => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
  }, [number, list]); // number 혹은 list가 바뀌었을 때만 함수 생성
```

useCallBack의 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고 두 번째 파라미터에는 배열을 넣음.

배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시 해야 함

빈 배열 → 재사용

배열 안에 number와 list를 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가될 때 새로 만들어진 함수를 사용하게 된다.

함수 내부에서 상태값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함시켜 주어야 한다. 

ex) onChange의 경우 기존의 값을 조회하지 않고 바로 설정 → 배열이 비어있어도 상관 X

onInsert는 기존의 number와 list를 조회해서 nextList를 생성하기 때문에 배열 안에 number와 list를 꼭 써주어야 한다.

## 8.6 useRef

- useRef Hook은 함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해준다.

```jsx
const Average = () => {
  (...)
  const inputEl = useRef(null);

  const onChange = useCallback(e => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

  const onInsert = useCallback(e => {
    (...)
    inputEl.current.focus();
  }, [number, list]); // number 혹은 list가 바뀌었을 때만 함수 생성
  
  return(
    (...)
      <input value = {number} onChange={onChange} ref={inputEl}/>
    (...)const Average = () => {
  (...)
  const inputEl = useRef(null);

  const onChange = useCallback(e => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

  const onInsert = useCallback(e => {
    (...)
    inputEl.current.focus();
  }, [number, list]); // number 혹은 list가 바뀌었을 때만 함수 생성
  
  return(
    (...)
      <input value = {number} onChange={onChange} ref={inputEl}/>
    (...)
```

→ useRef를 사용하여 ref를 설정하면 useRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가리킨다.

### 8.6.1 로컬 변수 사용하기

```jsx
import React, { Component } from 'react';

const Local = () => {
  const id= useRef(1);
  const setId = (n) => {
    id.current = n;
  }
  const printId = () => {
    console.log(id.current);
  }
  return(
    <div>
      refsample
    </div>
  );
};

export default MyComponent;
```

→ 함수형 컴포넌트로 바꿔서 작성한다면 ref 안의 값이 바뀌어도 컴포넌트가 렌더링 되지 않는다는 점에는 주의해야한다. 

→ 렌더링과 관련되지 않은 값을 관리할 때만 이러한 방식으로 코드를 작성해야한다.

## 8.7 커스텀 Hooks 만들기

```jsx
import { useReducer } from 'react';

function reducer(state, action){
  return{
    ...state,
    [action.name] : action.value
  };
}

export default function useInputs(initialForm){
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = e => {
    dispatch(e.target);
  };
  return [state, onChange];
}
```
Info.js
```javascript
import useInputs from './useInputs';

const Info = () => {
  const [state, onChange] = useInputs({
    name: '',
    nickname: ''
});
```

## 8.8 다른 Hooks

- 다른 개발자가 만든 Hooks도 라이브러리로 설치하여 사용할 수 있음.

https://nikgraf.github.io/react-hooks/

https://github.com/rehooks/awesome-react-hooks

## 8.9 정리

- Hooks 패턴을 사용하면 클래스형 컴포넌트를 작성하지 않고도 대부분의 기능 구현 가능
- 기존 프로젝트가 클래스형 컴포넌트를 사용하고 있다면 굳이 Hooks를 사용하도록 전환할 필요는 X (꼭 필요한 상황에서만 클래스형으로 구현하세요)
- **새로 작성할 때에는 함수형 컴포넌트와 Hooks를 사용할 것을 권장함.**