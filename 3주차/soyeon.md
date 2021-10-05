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

이처럼 map 함수는 기존 배열로 **새로운 배열을 만드는** 역할을 한다.<br/>
그렇다면 이번에는 자바스크립트로 작성했던 코드를 jsx로 바꿔보자.

```jsx
const numbers = [1, 2, 3, 4, 5];
const result = numbers.map(num => num * num);
console.log(result);
```
실행해보면 결과는 동일하게 나올 것이다. 

### 6.2 데이터 배열을 컴포넌트 배열로 변환하기

앞에서는 기존 배열에 있는 값을 활용해 새로운 배열을 생성했다.<br/>
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

아마 앞의 코드를 실행해보면 **"key" prop이 없다는 경고 메시지**를 보았을 것이다.<br/>
key란 무엇인지 알아보자:)

> 리액트에서 key는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내기 위해 사용한다.
예를 들어, 유동적인 데이터를 다룰 때는 원소를 생성/제거/수정할 수도 있다.
key가 없을 경우에는 VirtualDOM을 비교하는 과정에서 리스트를 순차적으로 비교하면서 변화를 감지한다.
하지만, key가 있다면 이 값을 사용해 어떤 변화가 일어났는지 더더 빠르게 알아낼 수 있다!! 

key값을 설정할 때는 map 함수 인자로 전달되는 함수 내부에서 컴포넌트 props를 설정하듯이 설정하면 된다.<br/>
***주의 : key 값은 항상 유일해야 한다!!!!***<br/>
따라서 데이터가 가진 **고윳값**을 key값으로 설정해야 한다!!<br/>

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

하지만 우리가 만들었던 예제는 이런 고유한 번호가 없다.<br/>
이런 경우에는 map 함수에 전달되는 콜백 함수의 인수인 index 값을 사용하면 된다!

```jsx
const IterationSample = () => {
  const names = ['눈사람', '얼음', '눈', '바람'];
  const nameList = names.map((name, index) => <li key={index}>{name}<li/>);
  return <ul>{nameList}<ul/>
};
```
위와 같이 key 값에 index 값을 넣어주면 더이상 경고 메시지가 발생하지 않을 것이다.<br/>
**단, 고유한 값이 없을 때만 index 값을 key 값으로 사용해야 한다!**<br/>
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
*배열에 새 항목을 추가할 때 **concat**을 사용한 이유*

> push는 기존 배열 자체를 변경해 주는 반면, concat은 새로운 배열을 만들어 준다.<br/>
즉, concat은 기존 배열을 **변경하지 않고 상태를 유지**한다.<br/>
리액트에서 상태를 업데이트 할 때는 기존 상태를 그대로 두면서 새로운 값을 설정해야 한다.<br/>
이를 **불변성 유지** 라고 한다! 불변성 유지를 해 주어야 리액트 컴포넌트의 성능을 최적화할 수 있다.<br/>

#### 3) 데이터 제거 기능 구현하기

이번에는 각 항목을 더블클릭하면 해당 항목이 지워지는 기능을 구현해보자.<br/>
앞에서와 같이 **불변성을 유지**하면서 업데이트를 해주어야 한다! <br/>
불변성을 유지하면서 데이터를 지우기 위해서는 내장함수 **filter**를 사용하면 된다.<br/>

> filter 함수 사용<br/>
filter 함수의 인자에 분류하고 싶은 조건을 반환하는 함수를 넣어 주면 된다.<br/>
예를 들어 배열에서 3보다 큰 숫자만 출력하고 싶다면 아래와 같이 하면 된다.<br/>
`const numbers = [1, 2, 3, 4, 5, 6];`<br/>
`const example = numbers.filter(num => num > 3);`<br/>
이렇게 하고 실행을 해보면 [4, 5, 6]이 출력되는 것을 확인할 수 있다.

- 더블클릭할 때 사용하는 이벤트 : onDoubleClick
- 더블클릭하면 항목을 지워주는 onRemove 함수를 작성하고 이를 li 태그에 등록한다.

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

모든 리액트 컴포넌트에는 라이프사이클(수명 주기)이 존재한다.<br/>
프로젝트를 진행하면서 컴포넌트를 처음으로 렌더링할 때 어떤 작업을 처리해야 할 지/컴포넌트를 업데이트하기 전후 어떤 작업을 처리해야 할 지/불필요한 업데이트를 방지해야 할 수 있다.<br/>
이때는 컴포넌트의 라이프사이클 메서드를 사용한다.<br/> 
앞으로 배울 **라이프사이클 메서드는 클래스형 컴포넌트에서만 사용이 가능하다!**

>메서드의 종류는 총 9가지이다.<br/>
**Will** 접두사가 붙은 메서드 : 어떤 작업을 작동하기 **전**에 실행되는 메서드<br/>
**Did** 접두사가 붙은 메서드 : 어떤 작업을 작동한 **후**에 실행되는 메서드<br/>
이 메서드들은 우리가 컴포넌트 클래스에서 덮어 써 선엄함으로써 사용할 수 있다.

>라이프사이클은 총 3가지이다.<br/>
**마운트** : 페이지에 컴포넌트가 나타남<br/>
**업데이트** : 컴포넌트 정보를 업데잍트(리렌더링)<br/>
**언마운트** : 페이지에서 컴포넌트가 사라짐

#### 마운트

DOM이 생성되고 웹 브라우저상에 나타나는 것을 '마운트'라고 한다.
이때 호출되는 메서드는 다음과 같다.<br/>
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

이러한 경우 컴포넌트가 업데이트 되고 이때 호출되는 메서드는 다음과 같다.<br/>
`getDerivedStateFromProps -> shouldComponentUpdate -> (true 반환 시 render 호출, false 반환 시 여기서 작업 취소) -> render -> getSnapshotBeforeUpdate -> (웹 브라우저상의 실제 DOM 변화) -> componentDidMount`
- **getDerivedStateFromProps** : 마운트 과정 + 업데이트 시작 전에도 호출된다. props의 변화에 따라 state 값에도 변화를 주고 싶을 때 사용한다.
- **shouldComponentUpdate** : 컴포넌트 리렌더링의 여부를 결정하는 메서드이다. true or false 값을 반환해야 한다.
>true를 반환하면 다음 라이프사이클 메서드를 계속 실행한다.<br/>
false를 반환하면 작업을 중지한다.(컴포넌트 리렌더링 X)<br/>
만약 특정 함수에서 this.forceUpdate() 함수를 호출하면 이 과정을 생략하고 바로 render 함수를 호출한다.

- **render** : 컴포넌트를 리렌더링한다.
- **getSnapshotBeforeUpdate** : 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드이다.
- **componentDidUpdate** : 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드이다.

#### 언마운트

마운트의 반대 과정으로 컴포넌트를 DOM에서 제거하는 것을 '언마운트'라고 한다.
언마운트할 때 호출하는 메서드는 `componentWillUnmount`이다.

- **componentWillUnmount** : 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메서드이다.

### 7.2 라이프사이클 메서드 살펴보기

#### render() 함수

`render(){...}`

render 메서드는 컴포넌트의 모양새를 정의한다.<br/>
이 메서드 안에서 this.props와 this.state에 접근할 수 있으며 리액트 요소를 반환한다.<br/>
여기서 요소는 div와 같은 태그가 될 수도 있고 따로 선언한 컴포넌트가 될 수도 있다.<br/>
보여주고 싶은 것이 없다면 null/false를 반환한다.

**!주의!**<br/>
이 메서드 안에서는 이벤트 설정이 아닌 곳에서 setState를 사용하면 X. <br/>
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

리액트 v16.3 이후 새로 만든 라이프사이클 메서드.<br/>
*props로 받아 온 값을 state에 동기화시키는 용도*로 사용된다.<br/>
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

이 메서드는 컴포넌트를 만들고 첫 렌더링을 다 마친 후 실행된다.<br/>
이 안에서 다른 자바스크립트 라이브러리 또는 프레임워크 함수를 호출하거나 이벤트 등록, setTimeout, setInterval, 네트워크 요청
같은 비동기 작업을 처리하면 된다.

#### shouldComponentUpdate 메서드

`shouldComponentUpdate(nextProps, nextState){...}`

이 메서드는 props 또는 state를 변경했을 때, 리렌더링을 시작할 지 여부를 지정하는 메서드이다.<br/>
여기서는 반드시 true 혹은 false 값을 반환해야 한다.
컴포넌트 생성 시 이 메서드를 따로 생성하지 않으면 기본적으로 항상 true를 반환한다.
이 메서드가 false 값을 반환하면 업데이트 과정은 여기서 중지된다.

이 메서드 안에서 현재 props와 state는 this.props와 this.state로 접근한다.<br/>
새로 설정될 props 또는 state는 nextProps와 nextState로 접근할 수 있다.

#### getSnapshotBeforeUpdate 메서드

이 메서드는 리액트 v16.3 이후 만든 메서드로 render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출된다.<br/>
이 메서드에서 반환하는 값은 componentDidUpdate에서 세 번째 파라미터인 snapshot 값으로 전달받을 수 있다.<br/>
주로 업데이트하기 직전의 값을 참고할 일이 있을 때 활용된다. (Ex. 스크롤바 위치 유지)

```javascript
getSnapshotBeforeUpdate(prevProps, prevState){
  if(prevState.array !== this.state.array){
    const {scrollTop, scrollHeight} = this.list;
    return {scrollTop, scrollHeight};
  }
}
```

#### componentDidUpdate 메서드

`componentDidUpdate(prevProps, prevState, snapshot){...}`

이 메서드는 리렌더링을 완료한 후 실행된다.<br/>
업데이트가 끝난 직후이므로, DOM 관련 처리를 해도 무방하다.<br/>
여기서는 prevProps, prevState를 사용해 컴포넌트가 이전에 가졌던 데이터에 접근이 가능하다.<br/>
또한 getSnapshotBeforeUpdate에서 반환한 값이 있다면 여기서 snapshot 값을 전달받을 수 있다.

### 7.3 라이프사이클 메서드 사용하기

예제 컴포넌트를 만들어보자

LifeCycleSample.js
```javascript
import React, { Component } from 'react';

class LifeCycleSample extends Component{
  state = {
    number: 0,
    color: null,
  }
  myRef = null; // ref를 설정할 부분
  constructor(props){
    super(props);
    console.log('constructor');
  }
  static getDerivedStateFromProps(nextProps, prevState){
    console.log('getDerivedStateFromProps');
    if(nextProps.color !== prevState.color){
      return{ color: nextProps.color };
    }
    return null;
  }
  componentDidMount(){
    console.log('componentDidMount');
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('shouldComponentUpdate', nextProps, nextState);
    // 숫자의 마지막 자리가 4면 리렌더링 x
    return nextState.number % 10 !== 4;
  }
  componentWillUnmount(){
    console.log('componentWillUnmount');
  }
  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    });
  }
  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log('getSnapshotBeforeUpdate');
    if(prevProps.color !== this.props.color){
      return this.myRef.style.color;
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('componentDidMount', prevProps, prevState);
    if(snapshot){
      console.log('업데이트되기 직전 색상: ', snapshot);
    }
  }
  render(){
    console.log('render');

    const style = {
      color: this.props.color
    };

    return(
      <div>
        {/* 에러 발생코드 */}
        {/* {this.props.missing.value} */}
        <h1 style = {style} ref = {ref => this.myRef = ref}> 
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>
          더하기
        </button>
      </div>
    )
  }
}
export default LifeCycleSample;
```
이 컴포넌트는 메서드를 실행할 때마다 콘솔 디버거에 기록하고 부모 컴포넌트에서 props로 색상을 받아 버튼을 누르면 state.number값을 1씩 더한다.<br/>
- getDerivedFromProps : 부모에게서 받은 color 값을 state에 동기화
- getSnapshotBeforeUpdate : DOM에 변화가 일어나기 직전의 색상 속성을 snapshot 값으로 반환
- componentDidUpdate : snapshot 값을 조회
- shouldComponentUpdate : state.number 값의 마지막 자리 수가 4이면 리렌더링 취소

ErrorBoundary.js
```javascript
import React, { Component } from 'react';

class ErrorBoundary extends Component{
  state = {
    errar: false
  };
  componentDidCatch(error, info){
    this.setState({
      error: true
    });
    console.log({error, info});
  }
  render(){
    if(this.state.error) return <div>에러가 발생했습니다.</div>;
    return this.props.children;
  }
}
export default ErrorBoundary;
```
에러가 발생하면 componentDidCatch 메서드가 호출된다.<br/>
이 메서드 내에서 this.state.error 값을 true로 업데이트 해준다.<br/>
이 값이 true라면 문구를 보여준다. <br/>

>Truthy & Falsy<br/>
False의미 : !undefined, !null, !undefined, !null, !0, !'', !NaN<br/>
이 외의 값들은 모두 true를 의미한다!! <br/>

### 7.4 정리

라이프사이클 메서드는 **컴포넌트 상태에 변화가 있을 때마다 실행**하는 메서드이다.<br/>
이 메서드들은 서드파티 라이브러리를 사용하거나 DOM을 직접 건드려야 하는 상황에서 유용하다!<br/>
컴포넌트 업데이트의 성능을 개선할 때는 *shouldComponentUpdate*가 중요하게 사용된다!(~11장에서 다시)

>*서드파티 라이브러리??*<br/>
'서드파티'란 '제3자'라는 뜻으로 개인 개발자나 프로젝트 팀, 혹은 업체등에서 개발하는 라이브러리이다.<br/>
프로그래밍 개발과 개발자 사이에 플러그인, 라이브러리, 프레임워크 등을 서드파티로 볼 수 있다.<br/>
서비스와 사용자 사이에 서드파티는 응용 프로그램, 애플리케이션, 웹 서비스로 볼 수 있다. 

## 8장

> Hooks는 리액트 v16.8에 새로 도입된 기능으로 **함수형 컴포넌트에서** 다양한 작업을 할 수 있게 해준다.

### 8.1 useState

'useState'는 가장 기본적인 Hooks이며 함수형 컴포넌트에서 **가변적인 상태**를 지닐 수 있게 해준다.<br/>
상태를 관리해야 한다면 이 Hook을 사용하면 된다! 
이 기능을 사용해서 카운터를 구현해보자

```javascript
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
useState 함수의 파라미터에는 **상태의 기본값**을 넣어준다.
현재 코드에서는 0을 기본값으로 설정했다.
이 함수가 호출되면 배열을 반환하고 배열의 요소는 두 가지이다.
1. 상태 값 : value
2. 상태를 설정하는 함수 : setValue()

#### useState를 여러 번 사용하기

useState 함수는 하나의 상태 값만 관리할 수 있다.
만약 컴포넌트에서 관리해야 할 상태가 여러 개면 useState를 여러 번 사용하면 된다!

```javascript
const [name, setName] = useState('');
const [nickname, setNickname] = useState('');
```

### 8.2 useEffect

useEffect는 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있다.
클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태로 볼 수 있다.

Info.js
```javascript
(...)
useEffect(()=>{
  console.log('렌더링이 완료되었습니다');
  console.log({
    name,
    nickname
  });
},[]);
(...)
```
만약 맨 처음 화면에 렌더링될 때만 실행하고 업데이트 될 때는 실행하지 않으려면 함수의 두 번째 파라미터로 비어 있는 배열을 넣어주면 된다.
두 번째 파라미터인 빈 배열을 없애면 컴포넌트가 업데이트 될 때마다 console창에서 확인이 가능하다.

#### 특정 값이 업데이트될 때만 실행하고 싶을 때

useEffect를 사용해 특정 값에 대해서만 검사를 하고 싶다면 useEffect의 **두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값**을 넣어 주면 된다!

```javascript
useEffect(()=>{
  console.log(name);
},[name]);
```
위의 코드를 보면 배열 안에 name을 넣어 name이 변경되는 경우에만 console.log(name)을 수행한다.<br/>
배열 안에는 useState로 관리하고 있는 상태를 넣어도 되고 props로 전달받은 값을 넣어줘도 된다.

#### 뒷정리하기 

useEffect는 기본적으로 렌더링되고 난 직후 실행된다.
두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행 조건이 달라진다.<br/>
**컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 실행하고 싶다**면 뒷정리(cleanup)함수를 반환해주어야 한다!!!<br/>

Info.js
```javascript
useEffect(()=>{
  console.log('effect');
  console.log(name);
  return()=>{
    console.log(cleanup);
  };
});
```
처음 렌더링될 때는 'effect'가 나타나고 그 이후 name이 업데이트 되기 직전에 cleanup이 나타나고 name이 업데이트되면서 effect와 변경 내용이 나타난다.

App.js
App 컴포넌트에서 Info 컴포넌트의 가시성을 바꿀 수 있게 해준다.

```javascript
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
이대로 실행하면 컴포넌트가 나타날 때는 콘솔에 effect가 나타나고 사라질 때는 cleanup이 나타난다.
하지만 이름을 입력해보면 렌더링될 때마다 뒷정리 함수가 계속 나타난다.
그리고 뒷정리 함수가 호출될 때는 업데이트되기 직전의 값을 보여준다.

Info.js - useEffect
언마운트될 때만 뒷정리 함수를 호출하고 싶다면 useEffect 함수의 두 번째 파라미터에 비어 있는 배열을 넣으면 된다.

```javascript
useEffect(()=>{
    console.log('effect');
    return() => {
      console.log('unmount');
    };
  },[]);
```

### 8.3 useReducer

useReducer는 useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트해 주고 싶을 때 사용하는 Hook이다.<br/>
리듀서는 **현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션 값을 전달받아 새로운 상태를 반환**하는 함수이다.

```javascript
function reducer(state, action){
  return{...}; // 불변성을 지키면서 업데이트한 새로운 상태를 반환한다.
}
```
액션 값은 주로 다음과 같은 형태이다.<br/>
`{type : ' INCREMENT',}`

>17장에서 다룰 리덕스에서 사용하는 액션 객체는 어떤 액션인지 알려주는 type 필드가 꼭 필요하지만, 
useReducer에서 사용하는 액션 객체는 반드시 type을 지니고 있을 필요가 없다!(문자열, 숫자도 상관없음)

#### 카운터 구현하기

Counter.js
```javascript
function reducer(state, action){ // 리듀서 함수
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
```
useReducer의 첫 번째 파라미터에는 **리듀서 함수**를 넣어 주고, 두 번째 파라미터에는 **해당 리듀서의 기본값**을 넣어 준다.<br/>
이 Hook을 사용하면 state값과 dispatch 함수를 받아온다.<br/>
여기서 state는 현재 가리키고 있는 상태고 dispatch는 액션을 발생시키는 함수이다.
dispatch(action)과 같은 형태이다!!!!<br/> 
함수 안에 **파라미터로 액션 값을 넣어 주면 리듀서 함수가 호출**되는 구조이다.<br/>
위의 코드에서 `INCREMENT/DECREMENT`를 파라미터로 넣어 주면 이에 따라 리듀서 함수가 실행된다!

>장점 : 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다.

#### input 상태 관리하기

기존에는 useState를 여러 개 사용해서 input을 관리했다.
useReducer를 사용하면 기존에 클래스형 컴포넌트에서 input 태그에 name 값을 할당하고
e.target.name을 참조해 setState를 해 준 것과 유사항 방식으로 작업을 처리할 수 있다.

Info.js
```javascript
(...)
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
```
useReducer에서 액션은 어떤 값도 사용이 가능하다.
그래서 위의 코드에서는 e.target값 자체를 액션 값으로 사용했다.

>input 태그의 속성 value / name
**value** : 요소의 초기값으로 사용자가 변경이 가능하다.
**name** : 태그명, 폼(form)데이터 전송 시 서버로 전달되는 이름으로 식별자 역할을 한다.

### 8.4 useMemo

useMemo를 사용하면 함수형 컴포넌트 내부에서 발생하는 **연산을 최적화**할 수 있다.<br/>
리스트에 숫자를 추가하면 추가된 숫자들의 평균을 보여주는 컴포넌트를 작성해보자!

```javascript
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
```
useMemo Hook을 사용하면 특정 값이 바뀌었을 때만 연산을 실행하고
원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용해 작업을 최적화할 수 있다.<br/>
`const avg = useMemo(() => getAverage(list), [list]);`을 보면 리스트가 바뀌었을 경우에만
getAverage 연산을 수행하도록 설정했다.

>reduce 함수<br/>
리스트의 원소의 전체 합을 구해주는 함수이다.<br/>
`const sum = numbers.reduce((a, b) => a + b);`<br/>
sum이라는 값은 numbers 리스트에 있는 원소의 전체 합을 reduce 함수를 사용해 구한 값이다.

### 8.5 useCallback

useCallback은 주로 렌더링 성능을 최적화해야 하는 상황에서 주로 사용한다.<br/>
이 Hook을 사용하면 만들어 놨던 함수를 **재사용**할 수 있다! <br/>
앞에서 구현했던 onChange와 onInsert 함수는 컴포넌트가 리렌더링될 때마다 새로 만들어진 함수를 사용하게 된다.
보통은 문제가 없지만 컴포넌트의 렌더링이 자주 발생하거나 렌더링해야 할 컴포넌트가 많아지면 최적화해 주는 것이 좋다.

Average.js
```javascript
const onChange = useCallback(e => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

  const onInsert = useCallback(e => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
  }, [number, list]); // number 혹은 list가 바뀌었을 때만 함수 생성
```
useCallback의 **첫 번째 파라미터에는 생성하고 싶은 함수**를 넣고, **두 번째 파라미터에는 배열**을 넣으면 된다.<br/>
이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시해야 한다.<br/>
onChange처럼 빈 배열을 넣으면 컴포넌트가 렌더링될 때 만들었던 함수를 계속 재사용한다.<br/>
onInsert처럼 배열 안에 number와 list를 넣으면 input내용이 바뀌거나 새로운 항목이 추가될 때 새로 만들어진 함수를 사용한다.<br/>
**함수 내부에서 상태 값에 의존해야 할 때는 그 값을 반드시 배열 안에 포함**시켜야 한다!!!<br/>
onInsert의 경우 기존의 number와 list를 조회해서 nextList를 생성하기 때문에 배열 안에 꼭 넣어주어야 한다!!

### 8.6 useRef

useRef Hook은 함수형 컴포넌트에서 **ref를 쉽게 사용**할 수 있도록 해준다.
Average컴포넌트에서 '등록' 버튼을 눌렀을 때 포커스가 input 쪽으로 넘어가도록 코드를 작성해보자

```javascript
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
    (...)
```
useRef를 사용해 ref를 설정하면 useRef를 통해 만든 객체(=inputEl) 안의 current 값이 실제 엘리먼트를 가리킨다.

#### 로컬 변수 사용하기 

컴포넌트 로컬 변수를 사용해야 할 때도 useRef를 활용할 수 있다.
여기서 로컬 변수란 렌더링과 상관없이 바뀔 수 있는 값을 의미한다.

```javascript
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
```
n에 따라 값이 바뀌어도 리렌더링X
*!주의: 이렇게 ref안의 값이 바뀌어도 컴포넌트가 렌더링되지 않는다!*<br/>
렌더링과 관련되지 않은 값을 관리할 때만 이런 방식으로 코드를 작성해야 한다.

### 8.7 커스텀 Hooks 만들기

여러 컴포넌트에서 비슷한 기능을 공유할 경우, Hook을 만들어 재사용할 수 있다.

useInputs.js
```javascript
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
위의 코드는 Info.js의 일부를 Hook으로 따로 만든 것이다.

Info.js
```javascript
import useInputs from './useInputs';

const Info = () => {
  const [state, onChange] = useInputs({
    name: '',
    nickname: ''
});
(...)
```

### 8.8 다른 Hooks

!더 많은 Hook은 아래 링크를 참고!
<https://nikgraf.github.io/react-hooks/>
<http://github.com/rehooks/awesome-react-hooks>

### 8.9 정리

리액트에서 Hooks 패턴을 사용하면 클래스형 컴포넌트를 사용하지 않고도 대부분의 기능을 구현할 수 있다.<br/>
리액트 매뉴얼에 따르면 기존의 클래스형 컴포넌트는 계속 지원되지만 함수형 컴포넌트와 Hooks 사용을 권장한다.<br/>
앞으로는 클래스형 컴포넌트는 꼭 필요한 상황에서 구현하고 함수형 컴포넌트를 사용하자!:)
