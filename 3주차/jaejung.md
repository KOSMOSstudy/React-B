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

<요건 다음에 다시...>

### **8.1 useState**

내용 placeholder

### **8.2 useEffect**

내용 placeholder

### **8.3 useReducer**

내용 placeholder

### **8.4 useMemo**

내용 placeholder

### **8.5 useCallback**

내용 placeholder

### **8.6 useRef**

내용 placeholder

### **8.7 커스텀 Hooks 만들기**

내용 placeholder

### **8.8 다른 Hooks**

내용 placeholder

### **8.9 정리**

내용 placeholder

