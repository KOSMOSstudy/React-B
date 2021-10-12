# 3주차 React 스터디 정리

| 장   | 제목          |
| ---- | ------------- |
| 6장 | 컴포넌트 반복 |
| 7장 | 컴포넌트와 라이프사이클 메서드 |
| 8장 | Hooks |


## **6장**

### **6.1 자바스크립트 배열의 map() 함수**

자바스크립트 배열 객체의 내장 함수인 **map()** 함수를 사용하여 반복되는 컴포넌트를 렌더링할 수 있다.

`map()` 메소드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환하는 함수이다.

```jsx
arr.map(callback(currentValue[, index[, array]])[, thisArg])
```

`map()` 함수는 `callback` 함수, `thisArg` (옵셔널) 를 매개변수로 받는다. 그리고 `callback` 함수는 `currentValue` , `index` (옵셔널), `array` (옵셔널) 3개의 매개변수를 받는다

- `callback`
    - `currentValue` : 현재 처리하고 있는 요소
    - `index` : 현재 처리하고 있는 요소의 index 값
    - `array`  : 현재 처리하고 있는 원본 배열
- `thisArg` : callback 함수 내부에서 사용할 this 레퍼런스

그리고 배열의 각 요소에 대해 실행한 `callback` 의 결과를 모은 새로운 배열을 리턴한다.

```jsx
var numbers = [1, 4, 9];
var doubles = numbers.map(function (num) {
  return num * 2;
});
// doubles = [2, 8, 18]
```

### **6.2 데이터 배열을 컴포넌트 배열로 변환하기**

기존 배열로 컴포넌트를 구성된 배열을 생성

```jsx
import React from 'react';

const IterationSample = () => {
  const names = ['눈사람', '얼음', '눈', '바람'];
  const nameList = names.map(name => <li>{name}</li>);
  return <ul>{nameList}</ul>;
};

export default IterationSample;
```

이 컴포넌트를 App.js와 랜더링 하게되면 정상적으로 동작하는것처럼 보이겠지만 

개발자 도구로 보았을 때 에러가 났음을 확인할 수 있다.

 <kbd><img src="https://user-images.githubusercontent.com/67777124/136027999-07c4ab0d-8538-4906-869a-7cd7f28b0f8f.png"></kbd>

경고 메시지를 보면 리스트에 있는 각 자손 요소(child)가 "key" prop이 없다고 나온다.

key가 무엇인지 알아보자.

### **6.3 key**

리액트에서 **key**는 컴포넌트 배열을 렌더링 했을 때, 
어떤 원소에 변동이 있었는지 식별하는 것을 돕는데 사용되는 속성이다.

고유번호 없이 Key를 설정하는 방법은 아래와 같다.

```jsx
import React from 'react';

const IterationSample = () => {
  const names = ['눈사람', '얼음', '눈', '바람'];
  const nameList = names.map((name, index) => <li key={index}>{name}</li>);
  return <ul>{nameList}</ul>;
};

export default IterationSample;
```

항목의 순서가 바뀔 수 있는 경우 key에 index를 사용하는 것은 권장하지 않는다. 
(효율적으로 리렌더링을 하지 못하기 때문)

렌더링한 항목에 대한 안정적인 ID가 없을 때, 최후의 수단으로 index를 key로 사용한다.

### **6.4 응용**

초기상태 설정하는 방법을 알아보자

`IterationSample` 컴포넌트에서 `useState` 를 사용하여 상태를 설정한다.

```jsx
import React, { useState } from 'react';

const IterationSample = () => {
  **const [names, setNames] = useState([
    { id: 1, text: '눈사람' },
    { id: 2, text: '얼음' },
    { id: 3, text: '눈' },
    { id: 4, text: '바람' },**
  ]);
  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(5);

  const nameList = names.map(name => <li key={name.id}>{name.text}</li>);
  return <ul>{nameList}</ul>;
};

export default IterationSample;
```

고유의 ID를 가지고 있는 객체들의 배열을 넣어주고

새로 추가할 데이터를 입력받기 위해 `inputText` 와, 

`nextId` 를 통해 추가될 데이터의 id(key)를 계산해 주도록 했다.

<추가 기능은 생략.. (추후 업데이트 예정 ㅠㅜ)>

### **6.5 정리**

배열을 변형할 때는 배열에 직접 접근하여 수정하는 것이 아니라 `concat`, `filter` 등의 

배열 내장 함수를 사용하여 새로운 배열을 만든 후 

이를 새로운 상태로 설정해 주어야 한다는 점을 기억하자.

## **7장**

### **7.1 라이프사이클 메서드의 이해**

모든 리액트 컴포넌트에는 라이프사이클(수명 주기)이 존재한다. 

리액트 프로젝트를 진행하다 보면, **컴포넌트를 처음으로 렌더링**할 때 혹은 

**컴포넌트를 업데이트**하기 전후로 어떤 작업을 처리해야할 수도 있고, 

불필요한 업데이트를 방지해야 할 수도 있다. 이때 컴포넌트의 라이프사이클 메서드를 사용한다.

라이프사이클 메서드는 총 아홉 가지이다.

**`Will`**접두사 - 어떤 작업을 작동하기 **전**에 실행되는 메서드

**`Did`** 접두사 - 어떤 작업을 작동한 **후**에 실행되는 메서드

이 메서드들을 컴포넌트 클래스에서 덮어 써 선언함으로 사용할 수 있다.

라이프사이클은 총 세 가지 **마운트, 업데이트, 언마운트**로 나눈다.

> **마운트** : 페이지에 컴포넌트가 나타남
> 
1. `constructor` 메서드 : 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드
2. `getDerivedStateFromProps` 메서드 : `props` 에 있는 값을 `state` 에 넣을 때 사용하는 메서드
3. `render` 메서드 : 준비한 UI를 렌더링하는 메서드
4. `componentDidMount` 메서드 : 컴포넌트가 웹 브라우저상에 나타난 후에 호출하는 메서드

> **업데이트** : 컴포넌트 정보를 업데이트(리렌더링)
> 
- `props` 가 바뀔 때
- `state` 가 바뀔 때
- 부모 컴포넌트가 리렌더링될 때
- `this.forceUpdate` 로 강제로 렌더링을 트리거할 때

위의 경우에서 업데이트를 하게 된다면 아래와 같은 메서드를 호출한다.

1. `getDerivedStateFromProps` 메서드 : `props` 에 있는 값을 `state` 에 넣을 때 사용하는 메서드 (마운트에서도 호출됨)
2. `shouldComponentUpdate` 메서드 : 컴포넌트가 리렌더링을 해야 할지 말아야 할지를 결정하는 메서드 ( `true` 를 반환하면 리렌더링, `false` 면 리렌더링 하지 않음.)
3. `render` 메서드 : 준비한 UI를 렌더링하는 메서드
4. `getSnapshotBeforeUpdate` : 컴포넌트 변화를 DOM에 반영하기 직전에 호출하는 메서드
5. `componentDidUpdate` : 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드

> **언마운트** : 페이지에서 컴포넌트가 사라짐
> 

`componentWIllUnmount` : 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메서드

### **7.2 라이프사이클 메서드 살펴보기**

### `render`

컴포넌트의 모양새를 정의하는 메서드. 라이프사이클 메서드 중 유일한 **필수 메서드**이다.

이 메서드 안에서 `this.props` 와 `this.state` 에 접근할 수 있다.

이 메서드 안에서 이벤트 설정이 아닌 곳에서 `setState` 를 사용해선 안되고, 브라우저의 DOM에 접근해서도 안된다. DOM 정보를 가져오거나 `state` 에 변화를 줄 때는 `componentDidMount` 에서 처리해야 한다.

### `constructor`

```jsx
constructor(props) {
  super(props);
}
```

컴포넌트의 생성자 메서드로 컴포넌트를 만들 때 처음으로 실행된다. 초기 `state` 를 정할 수 있다.

### `getDerivedStateFromProps`

`props` 로 받아 온 값을 `state` 에 동기화시키는 용도.

```jsx
static getDerivedStateFromProps(nextProps, prevState) {
  // 여기서는 setState 를 하는 것이 아니라
  // 특정 props 가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태로
  // 사용됩니다.
  /*
  if (nextProps.value !== prevState.value) {
    return { value: nextProps.value };
  }
  return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
  */
}
```

### `componentDidMount`

```jsx
componentDidMount() {
  // 외부 라이브러리 연동: D3, masonry, etc
  // 컴포넌트에서 필요한 데이터 요청: Ajax, GraphQL, etc
  // DOM 에 관련된 작업: 스크롤 설정, 크기 읽어오기 등
}
```

컴포넌트를 만들고 첫 렌더링을 마친 후 실행한다. 이 안에서 다른 자바스크립트 라이브러리 또는 프레임워크의 함수를 호출하거나 이벤트 등록, `setTimeout` , `setInterval` , 네트워크 요청 같은 비동기 작업을 처리하면 된다.

### `shouldComponentUpdate`

```jsx
shouldComponentUpdate(nextProps, nextState) {
  // return false 하면 업데이트를 안함
  // return this.props.checked !== nextProps.checked
  return true;
}
```

`props` 또는 `state` 를 변경했을 때 리렌더링을 시작할지 여부를 지정하는 메서드. 이 메서드를 따로 생성하지 않으면 기본적으로 `true` 를 반환해서 언제나 리렌더링을 한다. `false` 를 반환하면 업데이트 과정이 여기서 중지된다. (리렌더링되지 않는다.)

리액트에서는 변화가 발생하는 부분만 업데이트를 해줘서 성능이 꽤 잘 나오는 것이다.

하지만, 변화가 발생한 부분만 감지해내기 위해서는 Virtual DOM 에 한번 그려줘야하는 수고가 있다.

즉, 현재 컴포넌트의 상태가 업데이트되지 않아도, 부모 컴포넌트가 리렌더링되면, 자식 컴포넌트들도 렌더링 된다는 뜻이다. 

(여기서 "렌더링" 된다는건, render() 함수가 호출된다는 의미입니다.)

변화가 없으면 물론 DOM 조작은 하지 않게 된다. 그저 Virutal DOM 에만 렌더링 할 뿐, 이 작업은 그렇게 부하가 많은 작업은 아니지만, 컴포넌트가 무수히 많이 렌더링된다면 얘기가 조금 달라진다.

쓸대없이 낭비되고 있는 이 CPU 처리량을 줄여주기 위해서 우리는 Virtual DOM 에 리렌더링 하는것도,불필요할경우엔 방지하기 위해서 shouldComponentUpdate 를 작성하는 것이다.

### `getSnapshotBeforeUpdate`

이 API 가 발생하는 시점은 다음과 같다.

1. render()
2. **getSnapshotBeforeUpdate()**
3. 실제 DOM 에 변화 발생
4. componentDidUpdate

API를 통해서, DOM 변화가 일어나기 직전의 DOM 상태를 가져오고, 여기서 리턴하는 값은 componentDidUpdate 에서 3번째 파라미터로 받아올 수 있게 된다.

`render` 에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출. 

주로 업데이트 직전의 값을 참고할 일이 있을 때 활용된다.

```jsx
getSnapshotBeforeUpdate(prevProps, prevState) {
  if(prevState.array !== this.state.array) {
    const { scrollTop, scrollHeight } = this.list
    return { scrollTop, scrollHeight };
  }
}
```

### `componentDidUpdate`

```java
componentDidUpdate(prevProps, prevState, snapshot){...}
```

리렌더링을 완료한 후 실행한다. `prevProps` 또는 `prevState` 를 사용하여 컴포넌트가 이전에 가졌던 데이터에 접근할 수 있다. 또한 `getSnapshotBeforeUpdate` 에서 반환한 값이 있다면 여기서 `snapshot` 값을 전달받을 수 있다.

### `componentWillUnmount`

```jsx
componentWillUnmount() {
  // 이벤트, setTimeout, 외부 라이브러리 인스턴스 제거
}
```

컴포넌트를 DOM에서 제거할 때 실행. `componentDidMount` 에서 등록한 이벤트,  setTimeout 을 걸은것이 있다면 clearTimeout 을 통하여 제거를 한다. 추가적으로, 외부 라이브러리를 사용한게 있고 해당 라이브러리에 dispose 기능이 있다면 여기서 호출해도 OK

### `componentDidCatch`

컴포넌트 렌더링 도중에 에러가 발생했을 때 애플리케이션이 먹통이 되지 않고 오류 UI를 보여줄 수 있게 해준다.

```
componentDidCatch(error, info) {
  this.setState({
    error: true
  });
  console.log({ error, info });
}
```

`error` 파라미터는 어떤 에러가 발생했는지 알려주고 `info` 파라미터는 어디에 있는 코드에서 오류가 발생했는지에 대한 정보를 준다.

### **7.3 라이프사이클 메서드 사용하기**

책에 있는 예제도 좋지만 해당 자료가 이해가 더 쉬워서 카운터 예제를 가져왔다.

```jsx
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    number: 0
  }

  constructor(props) {
    super(props);
    console.log('constructor');
  }

  componentWillMount() {
    console.log('componentWillMount (deprecated)');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 5 의 배수라면 리렌더링 하지 않음
    console.log('shouldComponentUpdate');
    if (nextState.number % 5 === 0) return false;
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
  }

  handleIncrease = () => {
    const { number } = this.state;
    this.setState({
      number: number + 1
    });
  }

  handleDecrease = () => {
    this.setState(
      ({ number }) => ({
        number: number - 1
      })
    );
  }

  render() {
    console.log('render');
    return (
      <div>
        <h1>카운터</h1>
        <div>값: {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}

export default Counter;
```

<kbd><img src="https://user-images.githubusercontent.com/67777124/136028078-04f05fbe-358d-4fb8-9718-a847748be959.png" height="200"></kbd>


5의 배수일때 리랜더링 하지 않게 shouldComponentUpdate로그가 찍히는 것과 

LifeCycle에 맞게 로그가 찍히는 것을 확인할 수 있었다!

### **7.4 정리**

라이프사이클 메서드는 컴포넌트 상태에 변화가 있을 때마다 실행하는 메서드이다. 이 메서드들은 서드파티 라이브러리를 사용하거나 DOM을 직접 건드려야 하는 상황에서 유용하다. 컴포넌트 업데이트의 성능을 개선할 때는 `shouldComponentUpdate` 가 중요하게 사용된다.

## **8장**

**Hooks**는 리액트v16.8에 새로 도입된 기능으로 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 렌더링 직후 작업을 설정하는 useEffect 등의 기능을 제공하여 기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있게 해준다.

### **8.1 useState**

useState는 가장 기본적인 Hook이며, 함수형 컴포넌트에서도 가변적 상태를 지닐 수 있게 해준다.

```jsx
import React, {useState} from "react";

const Counter = () => {
    const [value,setValue] = useState(0);

    return(
        <div>
            <p>
                현재 카운터의 값은 <b>{value}</b> 입니다!
            </p>
            <button onClick={()=>setValue(value+1)}>+1</button>
            <button onClick={()=>setValue(value-1)}>-1</button>
        </div>
    )
}

export default Counter;
```

useState 함수의 파라미터에는 상태의 기본값을 넣어 준다.

이 함수가 호출되면 배열을 반환을 하게된다. 그 배열의 첫 번째 원소는 상태 값, 
두 번째 원소는 상태를 설정하는 함수이다.

이 함수에 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고 
컴포넌트가 정상적으로 리렌더링된다.

### **8.2 useEffect**

리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook이다.
클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태

```jsx
useEffect(()=>{
        console.log('랜더링이 완료되었습니다.');
        console.log({
            name,nickname
        });

        console.log('마운트될 때만 실행됩니다.');

        console.log(name);

        console.log('effect');
        console.log(name);
        return () => {
            console.log('cleanup');
            console.log(name);
        };
    });
```

숨기기 처리 코드

### 특정 값이 업데이트될 때만 실행하고 싶을 때

useEffect를 사용할 때, 특정 값이 변경될 때만 호출하고 싶을 경우에는 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어 주면 된다 [name]

```jsx
useEffect(()=>{
    console.log({ name });
  },[name]);
```

배열 안에는 useState를 통해 관리하고 있는 상태를 넣어 줘도 되고, 
props로 전달받은 값을 넣어 줘도 ㅇㅋ

### 마운트될 때만 실행하고 싶을 때

useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 

업데이트 될 때는 실행하지 않으려면 함수의 두 번째 파라미터로 비어 있는 배열을 넣어 주면 된다.

### 뒷정리하기

useEffect는 기본적으로 렌더링되고 난 직후마다 실행되며, 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라진다.
컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면 
useEffect에서 뒷정리(clean up) 함수를 반환해야함.

```jsx
useEffect(() => {
    console.log("effect");
    console.log(name);
    return () => {
      console.log("cleanup");
      console.log(name);
    };
  }, [name]);
```

```jsx
       <button
       onClick={()=>{
         setVisible(!visaible);
       }}
       >
         {visaible ? '숨기기': '보이기'}

       </button>
```

렌더링될 때마다 뒷정리 함수가 계속 나타나는 것을 확인할 수 있다.
뒷정리 함수가 호출될 때는 업데이트되기 직전의 값을 보여준다.
오직 언마운트될 때만 뒷정리 함수를 호출하고 싶다면 
useEffect 함수의 두 번째 파라미터에 비어 있는 배열을 넣으면 된다.

### **8.3 useReducer**

useReducer는 useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트 해주고 싶을 때 사용하는 Hook

useReducer는 현재상태, 그리고 업데이를 위해 필요한 정보를 담은 액션 값을 전달받아 새로운 상태를 반환하는 함수이다.
 리듀서 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜야 한다.

17장에서 다룰 리덕스에서 사용하는 액션 객체에는 어떤 액션인지 알려 주는 type 필드가 꼭 있어야 하지만, useReducer에서 사용하는 액션 객체는 반드시 type을 지니고 있을 필요가 없다. 
심지어 객체가 아니라 문자열이나 숫자여도 상관없다.

```jsx
import React, { useReducer } from "react";

function reducer(state, action) {
  //action.type에 따라 다른 작업 수행
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      return state;
  }
}
const CounterWithUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
};
```

useReducer의 첫 번째 파라미터에는 리듀서 함수를 넣고, 두 번째 파라미터에는 해당 리듀서의 기본값을 넣어 준다.
이 Hook을 사용하면 state 값과 dispatch 함수를 받아 오는데, state는 현재 가리키고 있는 상태고, dispatch는 액션을 발생시키는 함수이다.dispatch(action)과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어 주면 리듀서 함수가 호출되는 구조

useReducer를 사용했을 때 장점⇒컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼수 있다.

### 인풋 상태 관리하기

기존에는 인풋이 여러 개여서 useState를 여러 번 사용했는데, useReducer를 사용하면 기존에 클래스형 컴포넌트에서 input 태그에 name 값을 할당하고 e.target.name을 참조하여 setState를 해 준 것과 유사한 방식으로 작업을 처리할 수 있다.

```jsx
import React,{ useState, useEffect, useReducer} from "react";

function reducer(state, action){
    return{
        ...state,
        [action.name]: action.value
    };
}

const Info = () =>{
    const [state, dispatch] = useReducer(reducer,{
        name:'',
        nockname:''
    })
   
    const [name, nickname] = state;
    const onChange = e => {
        dispatch(e.target);
    };
    return(
        <>
        <div>
            <input value={name} onChange={onChange}/>
            <input value={nickname} onChange={onChange}/>
        </div>
        <div>
            <div>
                <b>이름: {name}</b>
                <br/>
                <b>닉네임: {nickname}</b>
            </div>
        </div>
        </>
    );
}

export default Info;
```

useReducer에서의 액션은 그 어떤 값도 사용 가능하다. 
그래서 이번에는 이벤트 객체가 지니고 있는 e.target 값 자체를 액션 값으로 사용했다. 

이런 식으로 인풋을 관리하면 아무리 인풋의 개수가 많아져도 코드를 깔끔하게 유지할 수 있다.

### **8.4 useMemo**

useMemo를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있습니다.

평균을 구해주는 함수형 컴포넌트를 작성해 봅시다.

```jsx
import React, { useState } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((prev, curr) => prev + curr);
  return sum / numbers.length;
};
const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = (e) => {
    setNumber(e.target.value);
  };
  const onInsert = (e) => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };
  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>))}
      </ul>
      <div>
        <b>평균값:</b>
        {getAverage(list)}
      </div>
    </div>);
};

export default Average;
```

숫자를 등록할 때 뿐만 아니라 인풋 내용이 수정될 때도 우리가 만든 getAverage 함수가 호출되는 것을 확인할 수 있습니다.인풋 내용이 바뀔 때는 평균값을 다시 계산할 필요가 없는데, 이렇게 렌더링할 때마다 계산하는 것은 낭비!!

useMemo Hook을 사용하면 이러한 작업을 최적화할 수 있습니다. 렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식입니다.

변경사항:`const avg = useMemo(() => getAverage(list), [list]);<b>평균값:</b>{avg}`

이제 list 배열의 내용이 바뀔 때만 getAverage 함수가 호출됩니다.

### **8.5 useCallback**

내용 placeholder

useMemo와 상당히 비슷한 함수입니다. 주로 렌더링 성능을 최적화해야 하는 상황에서 사용하는데요.이 Hook을 사용하면 만들어 놨던 **함수를 재사용**할 수 있습니다.

방금 위에서 구현 Average 컴포넌트를 보면 onChange와 onInsert라는 함수를 선언해주었습니다. 이렇게 선언하면 컴포넌트가 리렌더링될 때마다 새로 만들어진 함수를 사용하게 됩니다. 대부분의 경우 이러한 방식은 문제없지만, 컴포넌트의 렌더링이 자주 발생하거나 렌더링해야 할 컴포넌트의 개수가 많아지면 이 부분을 최적화해 주는 것이 좋습니다.

```jsx
const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []); //컴포넌트가 처음 렌더링될 때만 함수 생성

  const onInsert = useCallback(e => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  },[number, list]);//number 혹은 list가 바뀌었을 때만 함수 생성
```

useCallback의 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고, 두 번째 파라미터에는 배열을 넣으면 됩니다.이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시해야 합니다.

비어 있는 배열을 넣게 되면 컴포넌트가 렌더링될 때 만들었던 함수를 계속해서 재사용하게 되며, 배열 안에 number와 list 등을 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가될 때 새로 만들어진 함수를 사용하게 됩니다.

### **8.6 useRef**

함수형 컴포넌트에서 ref를 쉽게 사용 가능

`const inputEl = useRef(null);`

```jsx
const onInsert = useCallback(
    (e) => {
      const nextList = list.concat(parseInt(number));
      setList(nextList);
      setNumber("");
      inputEl.current.focus();
    },
    [number, list]
  );
```

`<input value={number} onChange={onChange} ref={inputEl} />`

useRef를 사용하여 ref를 설정하면 

useRef를 통해 만든 객체 안의 cureent 값이 실제 엘리먼트를 가리킵니다.

### 로컬 변수 사용하기

추가로 컴포넌트 로컬 변수를 사용해야 할 때도 useRef를 활용할 수 있다.

```jsx
import React, { useRef } from "react";

const RefSample = () => {
  const id = useRef(1);

  const setId = (n) => {
    id.current = n;
  };
  const printId = () => {
    console.log(id.current);
  };
  return (
    <div>
      refsample
      {printId()}
    </div>);
};

export default RefSample;
```

이렇게 ref 안의 값이 바뀌어도 컴포넌트가 렌더링되지 않는다는 점에는 주의

렌더링과 관련되지 않은 값을 관리할 때만 이러한 방식으로 코드를 작성 해야 한다.

### **8.7 커스텀 Hooks 만들기**

여러 컴포넌트에서 비슷한 기능을 공유할 경우, 
이를 우리만의 Hook으로 작성하여 로직을 재사용할 수 있다.

위에서 Info 컴포넌트에서 여러 개의 인풋을 관리하기 위해 useReducer로 작성했던 로직을 useInputs라는 Hook으로 따로 분리

```jsx
import React, { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}
export default function UseInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = (e) => {
    dispatch(e.target);
  };
  return [state, onChange];
```

이 Hook을 Info 컴포넌트에서 사용

```jsx
import React from "react";
import useInputs from "./useInputs";

const CustomHookInfo = () => {
const [state, onChange] = useInputs({
  name: "",
  nickname: "",
});
const { name, nickname } = state;
return (
  <div>
    <div>
      <input name="name" value={name} onChange={onChange} />
      <input name="nickname" value={nickname} onChange={onChange} />
    </div>
    <div>
      <div>
        <b>이름:</b>
        {name}
      </div>
      <div>
        <b>닉네임:</b>
        {nickname}
      </div>
    </div>
  </div>
);
};

export default CustomHookInfo;
```

### **8.8 다른 Hooks**

생략

### **8.9 정리**

리액트에서 Hooks 패턴을 사용하면 클래스형 컴포넌트를 작성하지 않고도 대부분의 기능을 구현할 수 있다. 이러한 기능이 리액트에 릴리즈 되었다고 해서 기존의 swtState를 사용하는 방식이 잘못된것은 아니다. 물론 훅을 통해 구현할 수 있더라도 말이다.

리액트 메뉴얼에 따르면, 기존의 클래스형 컴포텉느응 앞으로도 계속해서 지원될 예정이라고 한다 그렇기에 유지보수 하고 있는 프로젝트에서 클래스형 컴포넌트를 사용하고 있다면, 이를 굳이 함수형 컴포넌트와 훅을 사용할 필요는 없다. 다만 메뉴얼에서는 새로 작성하는 컴포넌트의 경우 함수형 컴포넌트와 훅을 사용할것을 권장하고 있다. 앞으로 우리가 프로젝트를 개발할때는 함수형 컴포넌트 사용을 첫번째 옵션으로 두고 꼭 필요한 상황에서만 클래스형 컴포넌트를 구현하자.

