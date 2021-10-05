# 3주차 React 스터디 정리

| 장   | 제목          |
| ---- | ------------- |
| 6장 | 컴포넌트 반복 |
| 7장 | 컴포넌트와 라이프사이클 메서드 |
| 8장 | Hooks |

## 6장

### 6.1 자바스크립트 배열의 map() 함수

### 6.2 데이터 배열을 컴포넌트 배열로 변환하기

### 6.3 key

### 6.4 응용

### 6.5 정리

[6장](https://iskull-dev.tistory.com/145?category=947081)

## 7장

### 7.1 라이프사이클 메서드의 이해

각 컴포넌트는 컴포넌트를 감독하고 관리할 수 있는 라이프사이클이 있으며  
라이프 사이클은 mount, update, unmount로 나뉘어져 있다.  
#### Mount
DOM에 엘리먼트들을 넣는 과정이다. 마운트 과정에서는 4개의 메서드들이  
호출된다.
1. contructor()  
컴포넌트가 초기화 될때 가장 먼저 실행된다.  
   
2. getDerivedSateFromProps()  
DOM에 엘리먼트 렌더링이 끝나면 곧바로 실행된다. props의 변화에 따라  
   state 값에 변화를 줄 떄 사용한다.
   
3. render()
라이프 사이클에서 반드시 사용되야 하는 메서드이고 매번 호출된다. DOM에  
   실질적인 HTML을 내보내는 메서드이다.
   
4. componentDidMount()
컴포넌트가 첫 렌더링 된 후 실행된다. 이 안에서 다른 라이브러리, 프레임워크의  
   함수를 호출하거나 비동기 작업을 처리하면 된다.
   
#### Update
컴포넌트 props, state가 바뀔 때, 부모 컴포넌트가 리렌더링 될때, this.forceUpdate로  
강제 업데이트 될 때 업데이트가 된다.  
컴포넌트가 업데이트 될 때 다음과 같은 메서드들이 호출된다.  
1. getDerivedStateFromProps()  
컴포넌트가 업데이트 될때 가장 먼저 호출되는 메서드이다. props의 변화에 따라 state값에 변화를  
   줄때 사용한다.
   
2. shouldComponentUpdate()  
Boolean을 반환해 컴포넌트 업데이트를 해야 할지 여부를 결정한다. Default는 true이다.
   
3. render()  
컴포넌트를 리렌더링 한다.
   
4. getSnapshotBeforeUpdate()  
업데이트 이전의 props, state를 확인할 수 있다. 이 메서드를 사용한다면 componentDidUpdate()  
   메서드와 같이 사용해야 에러가 발생하지 않는다. 
   
5. componentDidUpdate()  
업데이트가 끝난 후 실행되는 메서드이다. 여기서는 DOM관련 처리를 해도 된다. 
   
#### Unmount
컴포넌트를 돔에서 제거하는 과정이다  
1. componentWillUnmount()  
컴포넌트를 돔에서 제거하기 전에 실행된다.
   
[출처](https://www.w3schools.com/react/react_lifecycle.asp)
   
#### componentDidCatch() 
컴포넌트 렌더링 도중 에러가 발생하면 애플리케이션이 뻗는 대신 오류 UI를 보여준다. 하지만 이 메서드는  
자신에게서 발생하는 에러를 잡아내지 못하고 this.props.children으로 전달되는 컴포넌트에서 발생하는  
에러만 잡아낼 수 있다.

### 7.2 라이프사이클 메서드 살펴보기

### 7.3 라이프사이클 메서드 사용하기

### 7.4 정리
[7.1일부, 7.2, 7.3, 7.4](https://iskull-dev.tistory.com/146?category=947081)

## 8장
#### 리액트에서의 훅
훅은 리액트 16.8부터 지원하는 새로운 기능이다. 훅은 상태와 다른 리액트 기능들을 클래스 사용 없이 사용할  
수 있게 해준다. 이는 오직 함수형 컴포넌트에서만 동작한다. 훅은 이전 버전과도 호환된다.
#### 훅의 사용 조건  
훅은 JS의 함수와 비슷하지만 이를 사용하기 위해서는 다음과 같은 두 개의 조건이 준수되어야 한다.  
1. top level에서만 훅을 호출하라  
루프, 조건, nested function안에서 훅을 호춣하면 안된다. 이 규칙은 훅들이 컴포넌트 렌더 때 마다 같은  
   순서로 호출되게 해준다.
   
2. 리액트 함수 안에서만 훅을 호출하라  
일반적인 JS함수 내부에서 훅을 호출하지 말라. 대신 리액트 함수형 컴포넌트에서 호출해야 한다.  
   
### 8.1 useState
상태 유지 값과 그 값을 갱신하는 함수를 반환한다. setState 함수는 state를 갱신할 때 사용한다.  
새 state값을 받아 컴포넌트 리렌더링 큐에 등록한다. 


### 8.2 useEffect

함수 컴포넌트의 본문 내부에서 side effect는 허용되지 않는다. 이를 허용한다면 버그, UI의 불일치를  
야기한다. 이런 side effect를 useEffect내부에서 하면 된다. useEffect의 동작은 기본적으로 모든  
렌더링이 완료된 후에 수행되지만 어떤 상태가 변경되었을 때 실행되게 할 수 도 있다.

### 8.3 useReducer

useReducer는 useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다름 값으로  
업데이트를 해주고 싶을 때 사용한다. reducer는 현재 상태 그리고 업데이트를 위한 정보를 담은 action값을  
전달받아 새로운 상태를 반환하는 함수이다. reducer함수를 만들떄는 불변성을 지켜주어야 한다. 따라서 반드시  
업데이트 한 상태를 반환해야 한다.

### 8.4 useMemo
useMemo는 no side-effect를 위한 것이다. useMemo는 메모이제이션 정도의 기능만을 제공하기 위한  
것 이므로 애플리케이션의 동작의 변경이 아닌 오직 퍼포먼스 향상을 위해서만 사용해야 한다.

### 8.5 useCallback
useMemo와 상당히 비슷하다. 렌더링 성능 최적화를 위해 사용하며 만들어놓았던 함수를 재사용할 수 있다.  
컴포넌트가 리렌더링 될 때 리액트는 매번 새로 만들어진 함수를 사용한다. 따라서 리렌더링이 자주 일어 나면  
useCallback을 통해 최적화를 해야 한다.

### 8.6 useRef

함수형 컴포넌트에서 ref를 쉽게 사용할 수 있게 한다.

### 8.7 커스텀 Hooks 만들기

내용 placeholder

### 8.8 다른 Hooks

내용 placeholder

### 8.9 정리

내용 placeholder
[8장](https://iskull-dev.tistory.com/148?category=947081)  
[리액트 훅의 동작 과정](https://hewonjeong.github.io/deep-dive-how-do-react-hooks-really-work-ko/)
------

질문, 이해가 안 갔던 것, 궁금한 것, 스터디장이나 다른 사람들에게 물어보고 싶은 것, 기타 등등이 있으시면 써주시고, 이 문구는 지워주세요!
