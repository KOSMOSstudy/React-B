# 3주차 React 스터디 정리

| 장   | 제목          |
| ---- | ------------- |
| 6장 | 컴포넌트 반복 |
| 7장 | 컴포넌트와 라이프사이클 메서드 |
| 8장 | Hooks |
---
## 6장

### 1. map 함수의 이해

> 자바스크립트 배열 객체의 내장 함수인 map 함수를 사용하여 반복되는 컴포넌트를 렌더링 해보자

- map 함수

  map 함수는 파라미터로 전달된 함수를 사용해서 배열 내 각 요소를 원하는 규칙에 따라 <br/> 변환 후 ***새로운 배열***을 생성한다.
  주의해야 할 점은 ***새로운 배열***을 생성한다는 것이다.

1. 문법
```jsx
arr.map(callback, [thisArg])
  
  // - callback : 새로운 배열의 요소를 생성하는 함수로 파라미터는 3가지가 있다
  //    - currentValue : 현재 처리하고 있는 쇼로
  //    - index : 현재 처리하고 있는 요소의 index 값
  //    - array : 현재 처리하고 있는 원본 배열
  // - thisArg(선택) : callback 함수 내부에서 사용할 this 레퍼런스
```

2. 예제
```jsx
const numbers = [1, 2, 3, 4, 5];

const result = numbers.map(num => num * num);
```
위의 예제 코드를 보면 기존 배열을 제곱하여 새로운 배열을 만들어 낸다. <br/>
위의 코드를 실행하고 결과를 찍어보면 numbers는 변경되지 않고 result에 numbers의 요소들을 제곱하여 새로운 배열을 저장한다.

### 2. 데이터 배열을 컴포넌트 배열로 변환하기
map 함수를 사용하여 컴포넌트를 반복해보자
```jsx
import React from 'react';

const IterationSample = () => {
  const names = ['눈사람', '얼음', '눈', '바람'];
  const nameList = names.map(name => <li>{name}</li>);
  return <ul>{nameList}</ul>;
};

export default IterationSample;
```
이렇게 map 함수를 사용하면 반복되는 컴포넌트를 쉽게 나타낼 수 있다.


### 3. key
> key는 초반에 배웠던 Virtual DOM의 성능을 향상시킨다.

Virtual DOM을 비교하는 과정에서 기존의 DOM을 순차적으로 비교하며 변화를 감지하는데 <br/>
key가 있을 때 더욱 빠르게 변화를 감지할 수 있어 성능 향상에 도움이 된다. <br/>

```jsx
import React from 'react';

const IterationSample = () => {
  const names = ['눈사람', '얼음', '눈', '바람'];
  const nameList = names.map((name, index) => <li key={index}>{name}</li>);
  return <ul>{nameList}</ul>;
};

export default IterationSample;
```

이렇게 key를 추가하면 React의 성능이 향상된다.<br/>
여기서 한가지 더 중요한 점은 key 값은 유니크한 값이여야한다는 것이다.<br/>
지금의 코드에서는 index의 값이 컴포넌트 내에서 중복될 일이 없지만 코드가 길어지고 복잡해 진다면 index값이 중복이 될 수 있다. 이럴 경우 key를 사용하는 의미가 없어질 수도 있다.

```jsx
import React from 'react';

const IterationSample = () => {
  const names = ['눈사람', '얼음', '눈', '바람'];
  const nameList = names.map((name, index) => <li key={"names" + index}>{name}</li>);
  return <ul>{nameList}</ul>;
};

export default IterationSample;
```
조금 극단적인 예시이지만 이런식으로 key값을 완전히 유니크한 값이 되도록 바꿔줄수 있다.<br/>
이와같은 방법을 사용하지 않아도 해당 값이 유니크한 값이면 key값으로 사용해도 무방하다.

### 4. 정리

6장에서는 map 사용하여 반복되는 데이터를 렌더링하는 법을 배웠다. <br/>
기억해야할 내용은 <br/>
1. map 함수는 기존의 배열을 가지고 새로운 배열을 만들어 낸다
2. 컴포넌트 배열 렌더링 시 Key 값 성정을 잊지 말자 
3. 상태안에서 배열을 변형할 때는 concat, filter 등 배열 내장 함수를 사용하자 

<br/><br/>

-----

## 7장

### 1. 라이프사이클 메서드의 이해
> 라이프사이클은 리액트에서 매우매우매우 중요한 개념이다. 

라이프사이클 혹은 생명주기로도 불리는 이녀석은 컴포넌트의 수명을 정할때 사용하는 아주 중요한 녀석이다.<br/>
컴포넌트의 수명은 ( 렌더링 전 ~ 끝 ) 이렇게 나뉘는데 지금은 간단하게 업데이트에 따라 바뀌는 녀석 이라고 생각하면 좋다.<br/>
이 개념이 가장 중요한 이유는 Virtual DOM의 성능떄문이다. 값이 변화할때 업데이트를 진행해야하는데 우리의 친구 Virtual DOM은 변화된 내용을 비교하며 찾는데 불필요한 업데이트가 많다면 지속적으로 업데이트를 해야하기 때문에 Virtual DOM은 바빠지고 성능이 매우 안좋아진다.<br/><br/>
그래서 우리는 리액트의 라이프사이클을 이해하고 불필요한 업데이트를 방지해야한다.<br/>
( 잘못 하용한다면 무한 루프에 빠질수도 있다. )

![jinsu_lifecycle.png](./img/jinsu_lifecycle.png)
[출처] [요기 사이트! (매우 좋음 들어가서 눌러보면서 이해하기 편함)](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

사실 책에 있는 내용도 좋지만 내가 가장 편하게 이해한 사진은 위의 사진이다. <br/>
링크를 출처 링크에 들어가보면 눌러보면서 해당 내용들이 어떤 내용인지 파악하기 더 쉽다.

> 라이프사이클을 이해할때 꼭 기억해야할 내용은 3가지이다.
1. props가 바뀔 때
2. state가 바뀔 때
3. 부모 컴포넌트가 리렌더링될 떄

이 3가지가 컴포넌트가 업데이트 되는 조건이다. 꼭꼭 외우자

### 2. 라이프사이클 메서드 살펴보기
> 해당 메서드들은 클래스형 컴포넌트에서 사용하는데 메서드명만 보면 아! 이녀석은 이럴때 사용하겠구나~! 하는걸 대충 알 수 있다. 
1. render
```jsx
render() {...}
```
    - 컴포넌트 모양새를 정의하는 메서드
    - this.props, this.state에 접근 가능
    - 리액트 요소를 반환 (div, ..)

2. constructor 
```jsx
constructor(props) {...}
```

    - 컴포넌트의 생성자 메서드
    - 초기 state는 여기서 정의!

3. getDerivedStateFromProps
```jsx
static getDerivedStateFromProps(nextProps, prevState){
  if (nextProps.value != = prevState.value){
    return { value: nextProps.value };
  }
  return null;
}
```
    - props로 받아온 값을 state에 동기화 시키는 용도
    - 컴포넌트 마운트, 업데이트 될 때 호출

4. componentDidMount 
```jsx
componentDidMount() {...}
```
    - 컴포넌트 첫 렌더링 끝난 뒤 실행
    - setTimeout, setInteval, 네트워크 요청 등등 비동기 작업 처리 할 때 사용
      ( 자바스크림트 라이브러리 OR 프레임워크의 함수 호출, 이벤트 등록 ...) 

5. shouldComponentUpdate
```jsx
shouldComponentUpdate(nextProps, nextState) {...}
```
    - props, state 변경 시 리렌더링 할지 안할지 
    - 반드시 true or false 값을 반환 (이 메서드를 사용 안하면 언제나 true)

6. getSnapshotBeforeUpdate
```jsx
getSnapshotBeforeUpdate(prevProps, prevState){
  if (prevState.array != = this.state.array){
    const { scrollTop, scrollHeight } = this.list
    return { scrollTop, scrollHeight };
  }
}
```
    - render에서 만들어진 결과물이 실제 브라우저에 반영되기 직전에 호출
    - compoenentDidUpdate의 세번 째 파라미터인 snapshot을 값으로 전달받을 수 있음
      업데이트하기 직전의 값을 참고할 일이 있다면 사용

7. componentDidUpdate
```jsx
componentDidUpdate(prevProps, prevState, snapshot) {...}
```
    - 리렌더링 완료 후 실행
    - DOM 관련 처리 가능

8. componentWillUnmount
```jsx
componentWillUnmount() {...}
```
    - 컴포넌트를 DOM에서 제거할 때 사용
    - componentDidMount에 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거

9. componentDidCatch
```jsx
componentDidCatch(error, info) {
  this.setState({
    error: true
  });
  console.log({ error, info });
}
```
    - error를 통해 어떤 에러가 발생했는지 알 수 있고
    - info를 통해 어디에 있는 코드에서 오류가 발생했는지 알 수 있다.
    - 오류가 발생했을 때 오류 log관리할 때 사용하면 좋다
    - 단! 컴포넌트 자신의 에러는 불가! this.props.children으로 전달되는 컴포넌트 에러만 잡을 수 있음

### 4. 정리
라이프사이클은 매우매우매우 중요한 내용이다. 중요한 만큼 정확하게 이해하고 필요한 상황에 적절하게 사용해야한다.<br/>
잘못사용하게되면 무한루프에 빠질 수 있다. (본인 경험) 

<br/><br/>

-----

## 8장
> Hooks
8장에서는 Hooks에대해 배운다.<br/>
클래스형에서만 가능하던 컴포넌트 상태관리를 함수형에서도 가능하게 만들어준 Hooks!<br/>
이제는 함수형 컴포넌트의 시대가 왔으니 주의깊게 봐야한다

### 1. useState
> 함수형에서 상태값을 관리해 보자~!
기존 클래스형에서는 constructor를 통해 상태값을 초기화 해주고 setState를 통해 값을 변경했다.<br/>
함수형에서는 복잡한거 다 집어치우고 useState만 있으면 손쉽게 상태값을 다룰 수 있따.<br/>

```jsx
const [변수명, set뼌수명] = useState('요기는 초기값');

//ex ..
const [name, setName] = useState('jinsu');
```
클래스형에서는 여러줄에 걸쳐서 초기값을 설정하고 했는데 함수형에서는 이렇게 한줄로 가능하다.<br/>
매우 간결.. 편리.. 아주 좋습니다<br/>
하지만 주의할 점! ***관리할 상태가 여러개라도 useState는 한번에 하나씩!***<br/>
클래스형에서는 여러개의 상태를 한번에 관리했지만 useState는 한번에 한개의 상태만 가능하다<br/>
사실 여러개가 늘어나면 불편할거같지만 가독성도 좋고 뭔가 보기도 좋다 (내기준..)<br/>

간단하게 사용하자면 아래와 같이 사용할 수 있따.
```jsx
// 생략
const [name, setName] = useState('');

const onChangeName = e => {
  setName(e.target.value);
}
// 생략
```

### 2. useEffect
> 함수형에서 컴포넌트가 리렌더링 할 때 특정 작업을 수행할 수 있도록 해보자~!
useEffect는 앞장에서 배웠던 클래스형 컴포넌트의 componentDidMount + componentDidUpdate를 합친 형태라고 생각하면 쉽다.<br/>

```jsx
// 생략
const [name, setName] = useState('');

useEffect(() => {
  console.log('리렌더링!');
  console.log({name});
});

const onChangeName = e => {
  setName(e.target.value);
};
// 생략
```
useEffect는 위와 같이 사용할 수 있다. <br/>

하지만 useEffect는 더욱 강력하게 사용 가능하다<br/>
```jsx
// 마운트될 때만 실행하고싶다!!
useEffect(() => {
  console.log('리렌더링!');
  console.log({name});
}, []);

// 특정 값이 업데이트될 때만 실행하고 싶다!!
useEffect(() => {
  console.log('리렌더링!');
  console.log({name});
}, [name]);

```
더 자세하게 알고싶다면 [요기](https://ko.reactjs.org/docs/hooks-effect.html) <br/>
useState, useEffect는 함수형으로 사용하다보면 제일 많이 보는 구문이다 꼭 기억하고 잘 써먹자!

### 3. useMemo
> 함수형에서 연산을 최적화 해보자~!
useMemo는 이름 그대로 특정 상황을 메모 한다고 생각하면 좋다.<br/>
여러가지 연산을 할텐데 똑같은 연산을 불필요하게 많이 하게 된다면 프로젝트 규모가 커질수록 매우 비효율적이다.<br/>
useMemo를 사용해서 연산을 최적화 해보자
```jsx
// 생략
const avg = useMemo(() => getAverage(list), [list]);
```
useMemo는 특정 연산을 실행할때 특정 내용이 변경될때만 호출 할 수 있도록 도와준다.<br/>
위의 코드에서는 list 값이 변경될때만 getAverage() 함수를 호출하여 변경되지 않았을때 호출되는 것을 막는다.

### 4. useCallback
> 렌더리 성능를 최적화 해보자~!
useCallback은 사실상 useMemo와 하는일이 거의 비슷하다 따라서 아래 코드를 보고 어떤 상황에서 써야하는지만 알고 넘어가자<br/>
```jsx
useCallback(() => {
  console.log('hello world!');
}, []);

useMemo(() => {
  const fn = () => {
    console.log('hello world!');
  };
  return fn;
}, []);
```
두 함수 모두 똑같은일을 하는 코드다.<br/>
- 숫자, 문자열, 객체 등 일반 값을 재사용 => useMemo
- 함수 재사용 => useCallback

간단하게 이렇게 생각하면 좋을 것 같다.

### 5. useRef
> ref를 쉽게 사용해보자~!
useRef는 함수형에서 기존에 배웠던 ref를 쉽게 사용할 수 있도록 도와줍니다.<br/>
```jsx
//생략
const inputEl = useRef(null);
//
const onInsert = useCallback(() => {
  const nextList = list.concat(pareInt(number));
  setList(nextList);
  setNumber('');
  inputEl.current.focus();
}, [number, list]);
//생략
<input value={number} onchange={onChange} ref={inputEl} />
```
이렇게 useRef를 사용하게 되면 조금 더 간결하게 사용할 뿐만 아니라 useRef를 통해 만든 객체 안의 current값이 실제 엘리먼트를 가리키게 된다.

### 6. 정리
이외의 다른 Hooks 들은 <br/>
[요기1](https://nikgraf.github.io/react-hooks/)<br/>
[요기2](https://github.com/rehooks/awesome-react-hooks)<br/>
에서 볼 수 있고 더욱 자세하게 Hooks를 공부하고 싶다면 [공식문서](https://ko.reactjs.org/docs/hooks-intro.html)를 꼭 확인해서 보자(모든 정답은 공식문서에 있다!) <br/>

리액트의 함수형은 클래스형보다 쉽고 강력하다.<br/>
함수형을 잘 다루기 위해서는 꼭 Hooks를 제대로 이해하고 넘어가자!

------
