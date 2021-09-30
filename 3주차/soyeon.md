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

내용 placeholder

### 6.5 정리

내용 placeholder

## 7장

### 7.1 라이프사이클 메서드의 이해

내용 placeholder

### 7.2 라이프사이클 메서드 살펴보기

내용 placeholder

### 7.3 라이프사이클 메서드 사용하기

내용 placeholder

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
