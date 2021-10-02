# 3주차 React 스터디 정리

| 6장 | 컴포넌트 반복 |
| 7장 | 컴포넌트와 라이프사이클 메서드 |
| 8장 | Hooks |

## 6장

### 6.1 자바스크립트 배열의 map() 함수

자바스크립트 배열 객체의 내장 함수인 'map' 함수를 사용하면 반복되는 컴포넌트를 렌더링 할 수 있다!

#### 문법
`arr.map(callback, [thisArg])`

이 함수의 파라미터는 다음과 같다.
- callback : 새로운 배열의 요소를 생성하는 함수로 파라미터는 총 3개.
    currentValue : 현재 처리하고 있는 요소
    index : 현재 처리하고 있는 요소의 index 값
    array : 현재 처리하고 있는 원본 배열
- thisArg(선택항목) : callback 함수 내부에서 사용할 this 레퍼런스

#### Example

```javascript
var numbers = [1, 2, 3, 4, 5];

var processed = numbers.map(function(num){
  return num * num;
});

console.log(processed);
```
위의 코드를 콘솔에 입력하고 콘솔 실행 화면을 확인해보면
[1, 4, 9, 16, 25] 가 결과로 출력될 것이다.

이처럼 map 함수는 기존 배열로 **새로운 배열을 만드는** 역할을 한다.
그렇다면 이번에는 자바스크립트로 작성했던 코드를 jsx로 바꿔보자.

```jsx
const numbers = [1, 2, 3, 4, 5];
const result = numbers.map(num => num * num);
console.log(result);
```
실행해보면 결과는 동일하게 나올 것이다. 

### 6.2 데이터 배열을 컴포넌트 배열로 변환하기

앞에서는 기존 배열에 있는 값을 활용해 새로운 배열을 생성했다.
똑같은 원리로 기존 배열로 컴포넌트로 구성된 배열을 생성할 수 있다!! 

그럼 앞에 작성했던 컴포넌트를 살짝 수정해보자.
```javascript
import React from 'react';

const IterationSample = () => {
  const names = ['눈사람', '얼음', '눈', '바람'];
  const nameList = names.map(name => <li>{name}<li/>);
  return <ul>{nameList}<ul/>
};
export default IterationSample;
```
문자열로 구성된 배열을 선언하고 그 배열 값을 사용해 li 태그의 jsx 코드로 된 배열을 
새로 생성한 후 nameList에 담았다.
<br/>
map 함수에서 jsx를 작성할 때는 앞서 다룬 예제처럼 DOM 요소를 작성해도 되고, 컴포넌트를 사용해도 된다.

### 6.3 key

아마 앞의 코드를 실행해보면 **"key" prop이 없다는 경고 메시지**를 보았을 것이다.
key란 무엇인지 알아보자:)

> 리액트에서 key는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내기 위해 사용한다.
예를 들어, 유동적인 데이터를 다룰 때는 원소를 생성/제거/수정할 수도 있다.
key가 없을 경우에는 VirtualDOM을 비교하는 과정에서 리스트를 순차적으로 비교하면서 변화를 감지한다.
하지만, key가 있다면 이 값을 사용해 어떤 변화가 일어났는지 더더 빠르게 알아낼 수 있다!! 

key값을 설정할 때는 map 함수 인자로 전달되는 함수 내부에서 컴포넌트 props를 설정하듯이 설정하면 된다.
***주의 : key 값은 항상 유일해야 한다!!!!***
따라서 데이터가 가진 **고윳값**을 key값으로 설정해야 한다!!

#### 고윳값이 있을 때 
```jsx
const articleList = articles.map(article => (
  <Article
    title = {article.title}
    writer = {article.writer}
    key={article.id} />
));
```
예를 들어 게시판의 게시물을 렌더링한다면 게시물 번호를 key값으로 사용하면 된다.

#### 고윳값이 없을 때

하지만 우리가 만들었던 예제는 이런 고유한 번호가 없다.
이런 경우에는 map 함수에 전달되는 콜백 함수의 인수인 index 값을 사용하면 된다!

```jsx
const IterationSample = () => {
  const names = ['눈사람', '얼음', '눈', '바람'];
  const nameList = names.map((name, index) => <li key={index}>{name}<li/>);
  return <ul>{nameList}<ul/>
};
```
위와 같이 key 값에 index 값을 넣어주면 더이상 경고 메시지가 발생하지 않을 것이다.
**단, 고유한 값이 없을 때만 index 값을 key 값으로 사용해야 한다!**
index를 key 값으로 사용하면 배열이 변경될 때 효율적으로 리렌더링하지 못한다.

### 6.4 응용

index를 key 값으로 사용하는 것이 비효율적인 것을 알았으니 이러한 상황에서 어떻게 고윳값을 
만들 수 있는지 알아보자!

#### 1) 초기 상태 설정하기

```javascript
(...생략)
const IterationSample = () => {
  const [names, setNames] = useState([
    {id: 1, text: '눈사람'},
    {id: 2, text: '얼음'},
    {id: 3, text: '눈'},
    {id: 4, text: '바람'}
  ]);
  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(5); //새로운 항목을 추가할 때 사용할 id

  const nameList = names.map(name => <li key={name.id}>{name.text}</li>>);
  return <ul>{nameList}</ul>;
};
```
- useState를 사용해 상태 설정 (데이터 배열, input, 새로운 항목 추가 시 사용할 고유 id)
- 배열은 객체 형태 (문자열, 고유 id 값)
- map 함수 사용 시 key 값을 index가 아닌 name.id 값으로 지정

#### 2) 데이터 추가 기능 구현하기

새로운 이름을 등록할 수 있는 기능을 구현해보자!

- ul태그 위에 input과 button을 렌더링하고 input을 관리하는 함수를 작성한다.
- '추가' 버튼을 눌렀을 때 발생하는 onClick 함수를 작성한다. 

```javascript
(...생략)
const onChange = e => setInputText(e.target.value);
const onClick = () => {
  const nextNames = names.concat({
    id: nextId,
    text: inputText
  });
  setNextId(nextId + 1); // nextId 값에 1을 더해준다.
  setNames(nextNames); // names 값을 업데이트한다.
  setInputText(''); // inputText를 공백으로 만든다.
}
const nameList = names.map(name => <li key={name.id}>{name.text}</li>>);
return(
  <>
    <input value={inputText} onChange={onChange} />
    <button onClick={onClick}>추가</button>
    <ul>{nameList}</ul>;
  </>
); 
```
*배열에 새 항목을 추가할 때 concat을 사용한 이유*

> push는 기존 배열 자체를 변경해 주는 반면, concat은 새로운 배열을 만들어 준다.
즉, concat은 기존 배열을 변경하지 않고 상태를 유지한다.
리액트에서 상태를 업데이트 할 때는 기존 상태를 그대로 두면서 새로운 값을 설정해야 한다.
이를 **불변성 유지** 라고 한다! 불변성 유지를 해 주어야 리액트 컴포넌트의 성능을 최적화할 수 있다.

#### 3) 데이터 제거 기능 구현하기

이번에는 각 항목을 더블클릭하면 해당 항목이 지워지는 기능을 구현해보자.
앞에서와 같이 **불변성을 유지**하면서 업데이트를 해주어야 한다! 
불변성을 유지하면서 데이터를 지우기 위해서는 내장함수 **filter**를 사용하면 된다.

> filter 함수 사용
filter 함수의 인자에 분류하고 싶은 조건을 반환하는 함수를 넣어 주면 된다.
예를 들어 배열에서 3보다 큰 숫자만 출력하고 싶다면 아래와 같이 하면 된다.
`const numbers = [1, 2, 3, 4, 5, 6];`
`const example = numbers.filter(num => num > 3);`
이렇게 하고 실행을 해보면 [4, 5, 6]이 출력되는 것을 확인할 수 있다.

- 더블클릭할 때 사용하는 이벤트 : onDoubleClick
- 더블클릭하면 항목을 지워주는 onRemove 함수를 작성하고 이를 li 태그에 등록한다.\

```javascript
(...생략)
const onRemove = id => {
  const nextNames = names.filter(name => name.id !== id);
  setNames(nextNames);
};
const nameList = names.map(name => (
  <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
    {name.text}
  </li>
));
(...생략)
```
위의 코드에서는 filter를 사용해 id가 클릭되지 않은 id의 이름들만 남기고 이를 nexttNames로 설정한다.

### 6.5 정리

- 컴포넌트 배열을 렌더링할 때에는 key 값 설정에 주의해야 한다.
- key 값은 언제나 유일해야 한다. (중복된다면 렌더링 과정에서 Error)
- 상태 안에서 배열을 변형할 때에는 직접 접근해 수정하는 것이 아니라 concat, filter 등의 배열 내장 함수를 사용해 새로운 배열을 만든 후 새로운 상태로 설정해야 한다.

## 7장

### 7.1 라이프사이클 메서드의 이해

모든 리액트 컴포넌트에는 라이프사이클(수명 주기)이 존재한다.
프로젝트를 진행하면서 컴포넌트를 처음으로 렌더링할 때 어떤 작업을 처리해야 할 지/컴포넌트를 업데이트하기 전후 어떤 작업을 처리해야 할 지/불필요한 업데이트를 방지해야 할 수 있다.
이때는 컴포넌트의 라이프사이클 메서드를 사용한다. 
앞으로 배울 **라이프사이클 메서드는 클래스형 컴포넌트에서만 사용이 가능하다!**

>메서드의 종류는 총 9가지이다.
**Will** 접두사가 붙은 메서드 : 어떤 작업을 작동하기 **전**에 실행되는 메서드
**Did** 접두사가 붙은 메서드 : 어떤 작업을 작동한 **후**에 실행되는 메서드
이 메서드들은 우리가 컴포넌트 클래스에서 덮어 써 선엄함으로써 사용할 수 있다.

>라이프사이클은 총 3가지이다.
**마운트** : 페이지에 컴포넌트가 나타남
**업데이트** : 컴포넌트 정보를 업데잍트(리렌더링)
**언마운트** : 페이지에서 컴포넌트가 사라짐

#### 마운트

DOM이 생성되고 웹 브라우저상에 나타나는 것을 '마운트'라고 한다.
이때 호출되는 메서드는 다음과 같다.
`컴포넌트 생성 -> constructor -> getDerivedStateFromProps -> render -> componentDidMount`
- **constructor** : 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드
- **getDerivedStateFromProps** : props에 있는 값을 state에 넣을 때 사용하는 메서드
- **render** : 우리가 준비한 UI를 렌더링하는 메서드
- **componeneDidMount** : 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드\

#### 업데이트

컴포넌트는 다음과 같은 총 4가지 경우에 업데이트한다.
1. props가 바뀔 때 : 컴포넌트에 전달하는 props 값이 바뀔 때
2. state가 바뀔 때 : 컴포넌트 자신이 들고 있는 state가 setState를 통해 업데이트 될 때
3. 부모 컴포넌트가 리렌더링될 때 : 자신에게 할당된/들고 있는 props/state가 바뀌지 않아도 부모 컴포넌트가 리렌더링되면 자식 컴포넌트도 리렌더링
4. this.forceUpdate로 강제로 렌더링을 트리거할 때

이러한 경우 컴포넌트가 업데이트 되고 이때 호출되는 메서드는 다음과 같다.
`getDerivedStateFromProps -> shouldComponentUpdate -> (true 반환 시 render 호출, false 반환 시 여기서 작업 취소) -> render -> getSnapshotBeforeUpdate -> (웹 브라우저상의 실제 DOM 변화) -> componentDidMount`
- **getDerivedStateFromProps** : 마운트 과정 + 업데이트 시작 전에도 호출된다. props의 변화에 따라 state 값에도 변화를 주고 싶을 때 사용한다.
- **shouldComponentUpdate** : 컴포넌트 리렌더링의 여부를 결정하는 메서드이다. true or false 값을 반환해야 한다.
>true를 반환하면 다음 라이프사이클 메서드를 계속 실행한다.
false를 반환하면 작업을 중지한다.(컴포넌트 리렌더링 X)
만약 특정 함수에서 this.forceUpdate() 함수를 호출하면 이 과정을 생략하고 바로 render 함수를 호출한다.

- **render** : 컴포넌트를 리렌더링한다.
- **getSnapshotBeforeUpdate** : 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드이다.
- **componentDidUpdate** : 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드이다.

#### 언마운트

마운트의 반대 과정으로 컴포넌트를 DOM에서 제거하는 것을 '언마운트'라고 한다.
언마운트할 때 호출하는 메서드는 `componentWillUnmount`이다.

- **componentWillUnmount** : 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메서드이다.

### 7.2 라이프사이클 메서드 살펴보기



### 7.3 라이프사이클 메서드 사용하기

#### render() 함수

`render(){...}`

render 메서드는 컴포넌트의 모양새를 정의한다.
이 메서드 안에서 this.props와 this.state에 접근할 수 있으며 리액트 요소를 반환한다.
여기서 요소는 div와 같은 태그가 될 수도 있고 따로 선언한 컴포넌트가 될 수도 있다.
보여주고 싶은 것이 없다면 null/false를 반환한다.

**!주의!**
이 메서드 안에서는 이벤트 설정이 아닌 곳에서 setState를 사용하면 X. 
브라우저의 DOM에 접근 X. `e.target.innerHTML = "something"`(X)
```jsx
<div>
  {setState("someValue");}
</div>
```
위와 같이 코드를 작성하면 안된다!
DOM 정보를 가져오거나 state에 변화를 줄 때에는 componentDidMount에서 처리해야 한다.

#### constructor 메서드

`constructor(props){...}`

constructor는 컴포넌트의 생성자 메서드로 컴포넌트를 만들 때 처음으로 실행된다.
이 메서드에서는 초기 state를 정할 수 있다.

#### getDerivedStateFromProps 메서드

리액트 v16.3 이후 새로 만든 라이프사이클 메서드.
*props로 받아 온 값을 state에 동기화시키는 용도*로 사용된다.
컴포넌트가 마운트될 때와 업데이트될 때 호출된다.

```javascript
static getDerivedStateFromProps(nextProps, prevState){ // 조건에 따라 특정 값 동기화
  if(nextProps.value !== prevState.value){
    return{value: nextProps.value};
  }
  return null; // state를 변경할 필요가 없다면 null 반환
}
```

#### componentDidMount 메서드

`componentDidMount(){...}`

이 메서드는 컴포넌트를 만들고 첫 렌더링을 다 마친 후 실행된다.
이 안에서 다른 자바스크립트 라이브러리 또는 프레임워크 함수를 호출하거나 이벤트 등록, setTimeout, setInterval, 네트워크 요청
같은 비동기 작업을 처리하면 된다.

#### shouldComponentUpdate 메서드

`shouldComponentUpdate(nextProps, nextState){...}`

이 메서드는 props 또는 state를 변경했을 때, 리렌더링을 시작할 지 여부를 지정하는 메서드이다.
여기서는 반드시 true 혹은 false 값을 반환해야 한다.
컴포넌트 생성 시 이 메서드를 따로 생성하지 않으면 기본적으로 항상 true를 반환한다.
이 메서드가 false 값을 반환하면 업데이트 과정은 여기서 중지된다.

이 메서드 안에서 현재 props와 state는 this.props와 this.state로 접근한다. 
새로 설정될 props 또는 state는 nextProps와 nextState로 접근할 수 있다.

### 7.4 정리

내용 placeholder

## 8장

### 8.1 useState

내용 placeholder

### 8.2 useEffect

내용 placeholder

### 8.3 useReducer

내용 placeholder

### 8.4 useMemo

내용 placeholder

### 8.5 useCallback

내용 placeholder

### 8.6 useRef

내용 placeholder

### 8.7 커스텀 Hooks 만들기

내용 placeholder

### 8.8 다른 Hooks

내용 placeholder

### 8.9 정리

내용 placeholder

------

질문, 이해가 안 갔던 것, 궁금한 것, 스터디장이나 다른 사람들에게 물어보고 싶은 것, 기타 등등이 있으시면 써주시고, 이 문구는 지워주세요!
