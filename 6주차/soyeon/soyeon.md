# 6주차 React 스터디 정리

| 장   | 제목                                 |
| ---- | ------------------------------------ |
| 14장 | 외부 API를 연동하여 뉴스 뷰어 만들기         |
| 전역상태관리 | recoil |

## 14장

### 14.5 데이터 연동하기 

#### API 호출

useEffect를 사용해 컴포넌트가 처음 렌더링되는 시점에 API를 요청한다.

**!주의!**
useEffect에 등록하는 함수에 async를 붙이면 안된다!!!

왜냐하면 useEffect에서 반환해야 하는 값은 뒷정리 함수이기 때문이다.
따라서 useEffect 내부에서 async/await을 사용하고 싶다면, 함수 내부에 
async 키워드가 붙은 또다른 함수를 만들어서 사용해 주어야 한다.

*/components/NewsList.js 참고*

데이터를 불러와서 뉴스 데이터 배열을 map 함수를 사용해 컴포넌트 배열로 변환할 때 
신경써야 하는 부분이 있다!

→ **map** 함수를 사용하기 전에 꼭 **!articles**를 조회하여 해당 값이 현재 null이 아닌지 검사해야 한다!!! 

만약 이 작업을 하지 않으면 아직 데이터가 없을 때 null에는 map 함수가 없기 때문에 렌더링 과정에서 오류가 발생한다.

### 14.6 카테고리 기능 구현하기 

*components/Categories.js 참고*

해당 컴포넌트에서는 categories라는 배열 안에 name과 text 값이 들어가 있는 객체들을 넣어 
주어서 한글로 된 카테고리와 실제 카테고리 값을 연결시켜 주었다.
- name : 실제 카테고리 값
- text : 렌데링할 때 사용할 한글 카테고리

#### API를 호출할 때 카테고리 지정하기 

*/components/NewsList.js 참고*

현재 category 값이 무엇인지에 따라 요청할 주소가 동적으로 바뀌고 있다.
category값이 all 이라면 query 값을 공백으로 설정하고, all이 아니라면 **"&category=카테고리"**
형태의 문자열을 만들도록 했다. 그리고 이 query를 요청할 때 주소에 포함시켜 주었다.

category 값이 바뀔 때마다 뉴스를 새로 불러오기 때문에 useEffect의 의존 배열에 category를 넣어주어야 한다!! 

> 의존 배열 : 두 번째 파라미터로 설정하는 배열

### 14.7 리액트 라우터 적용하기 

`yarn add react-router-dom`

> index.js에 <BrowserRouter> 적용

*/components/NewsPages.js 참고*

선택된 category 값을 URL 파라미터를 통해 사용할 것이므로 Categories 컴포넌트에서 
현재 선택된 카테고리 값을 알려 줄 필요도 없고 onSelect 함수를 따로 전달해 줄 필요도 없다.

#### App 컴포넌트에서 Route 정의

```jsx
import React from 'react';
import NewsPage from './pages/NewsPage';
import { Route } from 'react-router-dom';

const App = () => {
  return <Route path="/:category?" component={NewsPage} />;
};

export default App;
```
위 코드에서 사용된 path에 /:category?와 같은 형태로 맨 뒤에 물음표 문자가 들어가 있다.
이는 category 값이 **선택적**이라는 의미이다! 있을 수도 있고 없을 수도 있고!
category URL 파라미터가 없다면 전체 카테고리를 선택한 것으로 간주한다.

#### Categories에서 NavLink 사용하기

*/components/categories.js 참고*

NavLink로 만들어진 Category 컴포넌트에 to 값은 "/카테고리이름"으로 설정해 주었다.
카테고리 중 '전체보기'의 경우는 예외적으로 "/all"대신 **"/"**로 설정하였다.
to 값이 "/"를 가리키고 있을 때는 **exact 값을 true**로 해주어야 한다!!!

### 14.8 usePromise custom hook 만들기 

*/lib/usePromise.js 참고*

이 훅은 Promise의 대기 중, 완료 결과, 실패 결과에 대한 상태를 관리하며, usePromise의 
의존 배열 deps를 파라미터로 받아온다. 파라미터로 받아 온 deps 배열은 usePromise 내부에서
사용한 useEffect의 의존 배열로 설정된다.

### 14.9 정리 

14장에서는 외부 API를 연동해 사용하는 방법을 알아보았다.

리액트 컴포넌트에서 API를 연동하여 개발할 때의 **유의사항**
- useEffect에 등록하는 함수는 async로 작성하면 안된다!!! 
- 대신에 함수 내부에 async 함수를 따로 만들어 주어야 한다.

## Recoil

### 주요 개념

### 개요

Recoil을 사용하면 *atoms*(공유상태)에서 *selectors*(순수함수)를 거쳐 React 컴포넌트로 내려가는 data-flow graph를 만들 수 있다. Atoms는 컴포넌트가 구독할 수 있는 상태의 단위다. Selectors는 atoms 상태값을 동기 또는 비동기 방식을 통해 변환한다.

### Atoms

Atoms는 상태의 단위이며 업데이트와 구독이 가능하다.

atom이 업데이트되면 각각의 구독된 컴포넌트는 새로운 값을 반영하여 다시 렌더링 된다. atoms는 런타임에서 생성될 수도 있다. Atoms는 React의 로컬 컴포넌트의 상태 대신 사용할 수 있다. 동일한 atom이 여러 컴포넌트에서 사용되는 경우 모든 컴포넌트는 상태를 공유한다.

Atom 은 `atom` 함수를 사용해 생성한다!

```jsx
const fontSizeState = atom({
	key: 'fontSizeState',
	default: 14,
});
```

Atoms는 디버깅, 지속성 및 모든 atoms의 map을 볼 수 있는 특정 고급 API에 사용되는 **고유한 키**가 필요하다!!! 두 개의 atom이 같은 키를 갖는 것은 오류이기 때문에 키 값은 전역적으로 **고유하도록** 해야한다!! React 컴포넌트 상태처럼 기본값(default)도 갖는다.

#### useRecoilState

컴포넌트에서 atom을 읽고 쓰려면 `useRecoilState` 라는 훅을 사용한다. React의 `useState` 와 비슷하지만 상태가 컴포넌트 간에 공유될 수 있다는 차이가 있다.

```jsx
function FontButton(){
	const [fontSize, setFontSize] = useRecoilState(fontSizeState);
	return(
		<button onClick={() => setFontSize((size) => size + 1)} style = {{fontSize}}>
			Click to Enlarge
		</button>
	);
}
```

버튼을 클릭하면 버튼의 글꼴 크기가 1만큼 증가하며, fontSizeState atom을 사용하는 다른 컴포넌트의 글꼴 크기도 같이 변화한다! 

```jsx
function Text(){
	const [fontSize, setFontSize] = useRecoilState(fontSizeState);
	return <p style={{fontSize}}>This text will increase in size too.</p>;
}
```

### Selectors

**Selector**는 atoms나 다른 selectors를 입력으로 받아들이는 순수 함수(pure function)이다. 상위의 atoms 또는 selectors가 업데이트되면 하위의 selector 함수도 다시 실행된다. 컴포넌트들은 selectors를 atoms처럼 구독할 수 있으며 selectors가 변경되면 컴포넌트들도 다시 렌더링된다.

Selectors는 상태를 기반으로 파생 데이터를 계산하는 데에 사용된다. 최소한의 상태 집합만 atoms에 저장하고 다른 모든 파생되는 데이터는 selectors에 명시한 함수를 통해 효율적으로 계산함으로써 쓸모없는 상태의 보존을 방지한다.

Selectors는 어떤 컴포넌트가 자신을 필요로하는지, 또 자신은 어떤 상태에 의존하는지를 추적하기 때문에 이러한 함수적인 접근방식을 매우 효율적으로 만든다.

**컴포넌트 관점에서 보면 selectors와 atoms는 동일한 인터페이스를 가지므로 서로 대처할 수 있다!**

> Selectors는 `selector` 함수를 사용해 정의한다.
> 

```jsx
const fontSizeLabelState = selector({
	key: 'fontSizeLabelState',
	get: ({get}) => {
		const fontSize = get(fontSizeState);
		const unit = 'px';

		return `${fontSize}${unit}`;
	},
});
```
`get`속성은 계산될 함수이다.
이를 통해서 atoms와 다른 selectors에 접근할 수 있다.
selectors에 접근하면 자동으로 종속관계가 생성되므로, 참조했던 다른 atoms나 selectors가 업데이트되면 이 함수도 다시 실행된다.

이 `fontSizeLabelState`예시에서 selector는 `fontSizeState`라는 하나의 atom에 의존성을 갖는다.
개념적으로 `fontSizeLabelState`selector는 `fontSizeState`를 입력으로 사용하고 형식화된 글꼴 크기 
레이블을 출력으로 반환하는 순수 함수처럼 동작한다.

#### useRecoilValue()

Selectors는 `useRecoilValue`를 사용해 읽을 수 있다.
이는 하나의 atom이나 selector를 인자로 받아 대응하는 값을 반환한다.
`fontSizeLabelState`selector는 writable하지 않기 때문에 `useRecoilState()`를 사용하지 않는다.

```jsx
function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const fontSizeLabel = useRecoilValue(fontSizeLabelState);

  return (
    <>
      <div>Current font size: ${fontSizeLabel}</div>

      <button onClick={setFontSize(fontSize + 1)} style={{fontSize}}>
        Click to Enlarge
      </button>
    </>
  );
}
```
버튼을 클릭하면 버튼의 글씨 크기가 증가하는 동시에 현재 글씨 크기를 반영하도록 글씨 크기 레이블을
업데이트 하는 두 가지 작업이 수행된다.

#### useRecoilState() vs useRecoilValue()

차이에 대해 자세히 알아보기 ~!!!!!! 

### 설치

`yarn add recoil`

### Recoil 시작하기

`yarn create react-app rocoil-tutorial`

`yarn add recoil`

#### RecoilRoot

**RecoilRoot**는 recoil 상태를 사용하는 컴포넌트로 부모 트리 어딘가에 나타내야 한다.
루트 컴포넌트가 **RecoilRoot**를 넣기 가장 좋은 장소이다!

#### Atom

**Atom**은 
- **상태(state)**의 일부를 나타낸다. 
- 어떤 컴포넌트에서나 읽고 쓸 수 있다.

→ atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 *구독한다.* 그래서 atom에 어떤 변화가 있으면 그 
atom을 구독하는 모든 컴포넌트들이 재렌더링 되는 결과가 발생할 것이다.

**useRecoilState()**
: 컴포넌트가 atom을 읽고 쓰게 하기 위해서 사용

<사용예시>

```jsx
const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}
```

#### Selector

**Selector**는
- 파생된 상태(derived state)의 일부를 나타낸다.
- 파생된 상태 = 상태의 **변화**

**useRecoilValue()**
: selector의 값을 읽기 위해 사용

<사용예시>

```jsx
const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
});
function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}
```
### 도입부

Recoil과 React를 설치했다고 가정하고 간단한 todo 리스트 애플리케이션을 만들어보자!

- todo 아이템 추가
- todo 아이템 수정
- todo 아이템 삭제
- todo 아이템 필터링
- 유용한 통계 표시

### Atoms

Atoms는 애플리케이션 상태의 source of truth를 갖는다.
todo 리스트에서 source of truth는 todo 아이템을 나타내는 객체로 이루어진 배열이 될 것이다.

atom 리스트를 `todoListState`라고 하고 이것을 `atom()`함수를 통해 생성한다.
```jsx
const todoListState = atom({
  key: 'todoListState',
  default: [],
});
```
- atom에 고유한 `key`값을 준다.
- 비어있는 배열 값을 `default`로 설정.

위에서 생성한 atom의 항목을 읽기 위해 `useRecoilValue()`훅을 TodoList 컴포넌트에서 사용해보자!
```jsx
function TodoList() {
  const todoList = useRecoilValue(todoListState);

  return (
    <>
      {/* <TodoListStats /> */}
      {/* <TodoListFilters /> */}
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}
```

#### todo 아이템 생성

todo 아이템을 생성하기 위해서는 `todoListState`내용을 업데이트하는 setter 함수에 접근해야 한다.

`TodoItemCreateor`컴포넌트의 setter 함수를 얻기 위해 `useRecoilState()`훅을 사용할 수 있다!
```jsx
function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = ({target: {value}}) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

// 고유한 Id 생성을 위한 유틸리티
let id = 0;
function getId() {
  return id++;
}
```
기존의 todo 리스트를 기반으로 새 todo 리스트를 만들 수 있도록 setter 함수의 **updater** 형식을
사용한다는 점의 **유의!!** 

#### 텍스트 변경 & 항목 삭제 

`TodoItem`컴포넌트는 todo 리스트의 값을 표시하는 동시에 텍스트를 변경하고 항목을 삭제할 수 있다.
우리는 **`todoListState`를 읽고 항목 텍스트를 업데이트하고, 완료된 것으로 표시하고, 삭제하는 데 사용하는**
**setter 함수를 얻기 위해** `useRecoilState()`를 사용한다!!!

```jsx
function TodoItem({item}) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({target: {value}}) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
```

### Selectors 

Selector는 파생된 상태의 일부를 나타낸다. 파생된 상태를 어떤 방법으로든 주어진 상태를 수정하는 순수 함수에
전달된 상태의 결과물로 생각할 수 있다.

> **파생된 상태**
-다른 데이터에 의존하는 동적인 데이터를 만들 수 있는 강력한 개념.
-이 todo 리스트 애플리케이션 맥략에서는 다음의 것들이 파생된 상태로 간주된다.
- **필터링 된 todo 리스트** : 전체 todo 리스트에서 일부 기준에 따라 특정 항목이 필터링 된 새 리스트
- **Todo 리스트 통계** : 전체 todo 리스트에서 목록의 총 항목 수, 완료된 항목 수, 완료된 항목의 백분율 같은 리스트의 유용한 속성들을 계산해 파생.

필터링된 todo 리스트를 구현하기 위해 atom에 저장할 수 있는 필터 기준을 선택한다.
```jsx
const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'Show All',
});
```
우리가 사용할 필터 옵션으로는 ['Show All', 'Show Completed', 'Show Uncompleted']가 있다.
기본 값을 'Show All'이다.

`todoListFilterState`와 `todoListState`를 사용해 우리는 필터링 된 리스트를 **파생**하는
`filteredTodoListState`selector를 구성할 수 있다.
```jsx
const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({get}) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});
```

`filteredTodoListState`는 내부적으로 2개의 의존성 `todoListFilterState`와 `todoListState`을 추적한다. 
그래서 둘 중 하나라도 변하면 `filteredTodoListState`는 재 실행된다.

> 컴포넌트 관점에서 보면 **selector**는 **atom**을 읽을 때 사용하는 같은 훅을 사용해서 읽을 수 있다. 
그러나 특정한 훅은 쓰기 가능 상태 (즉, useRecoilState())에서만 작동하는 점을 유의해야 한다. 
**모든 atom은 쓰기 가능 상태**지만 **selector는 일부만 쓰기 가능**한 상태(`get`과 `set` 속성을 둘 다 가지고 있는 **selector**)로 간주된다. 
이 주제에 대해서 더 많은 정보를 보고 싶다면 Core Concepts 페이지를 보면 된다.

필터링 된 todo 리스트를 표시하는 것은 TodoList 컴포넌트에서 한 줄만 변경하면 될 만큼 간단하다.

```jsx
function TodoList() {
  // changed from todoListState to filteredTodoListState
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem item={todoItem} key={todoItem.id} />
      ))}
    </>
  );
}
```

UI는 'toListFilterState'의 기본값인 'Show All'과 동일하다. 
필터를 변경하려면 우리는 TodoListFilter 컴포넌트를 구현해야 한다.

```jsx
function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({target: {value}}) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}
```

몇 줄의 코드로 우리는 필터링 기능을 구현할 수 있다! 
우리는 TodoListStats 컴포넌트를 구현하기 위해 동일한 개념을 사용할 것이다.

< 표시할 통계 >
- todo 항목들의 총개수
- 완료된 todo 항목들의 총개수
- 완료되지 않은 todo 항목들의 총개수
- 완료된 항목의 백분율

각 통계에 대해 selector를 만들 수 있지만, 필요한 데이터를 포함하는 객체를 반환하는 selector 하나를 만드는 것이 더 쉬운 방법일 것이다. 
우리는 이 selector를 'toDoListStatsState'라고 부를 것이다.

```jsx
const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({get}) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
```

`todoListStatsState`값을 읽기 위해, 우리는 `useRecoilValue()`를 한 번 더 사용할 것이다.

```jsx
function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}
```