# 6주차 React 스터디 정리

| 장           | 제목                                 |
| ------------ | ------------------------------------ |
| 14장         | 외부 API를 연동하여 뉴스 뷰어 만들기 |
| 전역상태관리 | recoil                               |

## 14 장

## **14 장**

### **14.5 데이터 연동하기**

컴포넌트가 화면에 보이는 시점에 API를 요청
이때 useEffect를 사용하여 컴포넌트가 처음 렌더링되는 시점에 API를 요청하면 됨

⚠ useEffect에 등록하는 함수에 async를 붙이면 안됨
useEffect 내부에서 async/await를 사용하고 싶다면,
함수 내부에 async 키워드가 붙은 또 다른 함수를 만들어서 사용해야함

```jsx
const NewsList = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // async를 사용하는 함수 따로 선언
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          ‘https://newsapi.org/v2/top-headlines?country=kr&apiKey‘,
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };뉴스 카테고리는 총 여섯 개이며, 다음과 같이 영어로 되어 있습니다.

• business(비즈니스)

• entertainment(연예)

• health(건강)

• science(과학)

• sports(스포츠)

• technology(기술)
    fetchData();
  }, []);

  // 대기 중일 때
  if (loading) {
    return <NewsListBlock>대기 중…</NewsListBlock>;
  }
  // 아직 articles 값이 설정되지 않았을 때
  if (!articles) {
    return null;
  }

  // articles 값이 유효할 때
  return (
    <NewsListBlock>
      {articles.map(article => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};
```

### **14.6 카테고리 기능 구현하기**

뉴스 카테고리는 총 여섯 개이며, 다음과 같이 영어로 되어 있음

- **business**(비즈니스)
- **entertainment**(연예)
- **health**(건강)
- **science**(과학)
- **sports**(스포츠)
- **technology**(기술)

![Untitled](6%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%20React%20%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%84%83%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%202796a9b640cc44a6afeab957197d4fd3/Untitled.png)

components 디렉터리에 Categories.js 컴포넌트 파일을 생성하여 디자인 코드 작성

(components/Categories.js 참고!)

그 다음 App에서 NewsList 컴포넌트 상단에 렌더링하면 완성

이제 App에서 category 상태를 useState로 관리하는 작업을 진행

```jsx
import React, { useState, useCallback } from ‘react‘;
import NewsList from ‘./components/NewsList‘;
import Categories from ‘./components/Categories‘;

const App = () => {
  const [category, setCategory] = useState(‘all‘);
  const onSelect = useCallback(category => setCategory(category), []);

return (
    <>
      <Categories category={category} onSelect={onSelect} />
      <NewsList category={category} />
    </>
  );
};
```

현재 선택된 카테고리 값에 따라 다른 스타일을 적용(components/Categories.js)

```jsx
${props =>
    props.active && css`
      font-weight: 600;
      border-bottom: 2px solid #22b8cf;
      color: #22b8cf;
      &:hover {
        color: #3bc9db;
      }
  `}

  & + & {
    margin-left: 1rem;
  }
`;
const Categories = ({ onSelect, category }) => {
  return (
    <CategoriesBlock>
      {categories.map(c => (
        <Category
          key={c.name}
          active={category === c.name}
          onClick={() => onSelect(c.name)}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};
```

API를 호출할 때 카테고리 지정하기
NewsList 컴포넌트에서 현재 props로 받아 온 category에 따라

카테고리를 지정하여 API를 요청하도록 구현

```jsx
useEffect(() => {
  // async를 사용하는 함수 따로 선언
  const fetchData = async () => {
    setLoading(true);
    try {
      const query = category === "all" ? "" : `&category=${category}`;
      return axios.get(
        `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=`
      );
      setArticles(response.data.articles);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  fetchData();
}, [category]);
```

현재 category 값이 무엇 인지에 따라 요청할 주소가 동적으로 바뀌는 것을 확인할 수 있다.

### **14.7 리액트 라우터 적용하기**

기존에는 카테고리 값을 useState로 관리했는데,

이번에는 이 값을 리액트 라우터의 URL 파라미터를 사용하여 관리해보자

`yarn add react-router-dom`

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
```

NewsPage.js 파일을 만들어서 카테고리가 선택되지 않았으면 기본값 all로 사용되는 js 파일 생성(pages/NewsPage.js)

```jsx
import React from "react";
import { Route } from "react-router-dom";
import NewsPage from "./pages/NewsPage";

const App = () => {
  return <Route path="/:category?" component={NewsPage} />;
};

export default App;
```

위 코드에서 사용된 path에 /:category?와 같은 형태로 맨 뒤에 물음표 문자가 들어가 있는데. 이는 category 값이 선택적(optional)이라는 의미이다.

즉, 있을 수도 있고 없을 수도 있다는 뜻. category URL 파라미터가 없다면 전체 카테고리를 선택한 것으로 간주한다..

Categories에서 NavLink 사용하기

선택된 카테고리에 다른 스타일을 주는 기능을 NavLink로 대체해보자.

```jsx
const Category = styled(NavLink)`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;&:hover {
    color: #495057;
  }&.active {
    font-weight: 600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  }
```

작업을 마쳤다면,

카테고리를 클릭할 때 페이지 주소가 바뀌고 이에 따라 뉴스 목록을 잘 보여 주는지 확인.

### **14.8 usePromise custom hook 만들기**

컴포넌트에서 API 호출처럼 Promise를 사용해야 하는 경우

더욱 간결하게 코드를 작성할 수 있도록 해 주는 커스텀 Hook을 만들어 보자

```jsx
import { useState, useEffect } from "react";
export default function usePromise(promiseCreator, deps) {
  // 대기 중/완료/실패에 대한 상태 관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return [loading, resolved, error];
}
```

⚠ 프로젝트의 다양한 곳에서 사용될 수 있는 유틸 함수들은 보통 이렇게 src 디렉터리에 lib 디렉터리를 만든 후 그 안에 작성한다.

코드를 저장한 뒤 NewsList 컴포넌트에서 usePromise 사용

```jsx
const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=5c8db3a9f6c1491ca26b715ced27c6e5`,
    );
  }, [category]);
```

usePromise를 사용하면 NewsList에서 대기 중 상태 관리와 useEffect 설정을 직접 하지 않아도 되므로

코드가 훨씬 간결해진다.

### **14.9 정리**

⚠ useEffect에 등록하는 함수는 async로 작성하면 안 된다 그 대신 함수 내부에 async 함수를 따로 만들어 주어야

지금은 usePromise라는 커스텀 Hook을 만들어 사용함으로써 코드가 조금 간결해지기는 했지만, 나중에 사용해야 할 API의 종류가 많아지면 요청을 위한 상태 관리를 하는 것이 번거로워질 수 있다.

뒤에 나올 리덕스와 리덕스 미들웨어를 배우면 좀 더 쉽게 요청에 대한 상태를 관리할 수 있습니다.

## **recoil**

### **주요 개념**

호환성 및 단순함을 이유로 React 자체에 내장된 상태 관리 기능을 사용하는 것이 가장 좋다.

그러나 `React는 다음과 같은 한계`가 있다.

- 컴포넌트의 상태는 공통된 상위요소까지 끌어올림으로써 공유될 수 있지만, 이 과정에서 거대한 트리가 다시 렌더링되는 효과를 야기하기도 한다.
- Context는 단일 값만 저장할 수 있으며, 자체 소비자(consumer)를 가지는 여러 값들의 집합을 담을 수는 없다.
- 이 두가지 특성이 트리의 최상단(state가 존재하는 곳)부터 트리의 잎(state가 사용되는 곳)까지의 코드 분할을 어렵게한다.

Recoil을 사용하면 *`atoms* (공유 상태)`에서 *`selectors\* (순수 함수)`를 거쳐 React 컴포넌트로 내려가는 data-flow graph를 만들 수 있다.

`Atoms`는 컴포넌트가 구독할 수 있는 상태의 단위다.

- atom이 업데이트되면 각각의 구독된 컴포넌트는 새로운 값을 반영하여 다시 렌더링 된다.
- atoms는 런타임에서 생성될 수도 있다.
- Atoms는 React의 로컬 컴포넌트의 상태 대신 사용할 수 있다.
- 동일한 atom이 여러 컴포넌트에서 사용되는 경우 모든 컴포넌트는 상태를 공유한다.

`Selectors`는 atoms 상태값을 동기 또는 비동기 방식을 통해 변환한다.

- 컴포넌트들은 selectors를 atoms처럼 구독할 수 있으며 selectors가 변경되면 컴포넌트들도 다시 렌더링된다.
- Selectors는 상태를 기반으로 하는 파생 데이터를 계산하는 데 사용된다.
- Selectors는 어떤 컴포넌트가 자신을 필요로하는지, 또 자신은 어떤 상태에 의존하는지를 추적하기 때문에 이러한 함수적인 접근방식을 매우 효율적으로 만든다.

### **설치**

Recoil 패키지는 [npm](https://www.npmjs.com/get-npm)에 존재한다.

```jsx
yarn add recoil
```

### **Recoil 시작하기**

(설치 및 어플리케이션 생성 부분 생략)

**RecoilRoot**

recoil 상태를 사용하는 컴포넌트는 부모 트리 어딘가에 나타나는 `RecoilRoot` 가 필요하다.

루트 컴포넌트가 `RecoilRoot`를 넣기에 가장 좋은 장소다.

```jsx
import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}
```

**Atom**

**Atom**은 **상태**(**state**)의 일부를 나타낸다. Atoms는 어떤 컴포넌트에서나 읽고 쓸 수 있다. atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 **구독**한다. 그래서 atom에 어떤 변화가 있으면 그 atom을 구독하는 모든 컴포넌트들이 재 렌더링 되는 결과가 발생할 것이다.

```jsx
const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
```

컴포넌트가 atom을 읽고 쓰게 하기 위해서는 `useRecoilState()` 사용하면 된다

`useRecoilState`은 hook의 `useState` 와 사용하는 방식이 동일하다.

배열 첫번째 요소에 상태의 값이 들어가고 두번째 요소에 상태를 변경할 수 있는 함수가 들어간다. 차이점은 이 변경된 상태가 자동으로 전역으로 상태가 공유된다는 것이다. 구독이나 연결과 같은 작업은 필요없다. `useRecoilState` 을 사용한 `Atom` 의 상태는 이 상태를 사용하고 있는 다른 컴포넌트와 자동으로 공유된다.

반대로 `useRecoilValue` 는 상태를 변경하는 함수 없이 `Atom` 값만 받는다.

**selector**

**Selector**는 파생된 상태(**derived state**)의 일부를 나타낸다. 파생된 상태는 상태의 **변화**다. 파생된 상태를 어떤 방법으로든 주어진 상태를 수정하는 순수 함수에 전달된 상태의 결과물로 생각할 수 있다.

### **도입부**

이 튜토리얼에서는 간단한 todo 리스트 애플리케이션을 제작한다.

### **Atoms**

atom 리스트를 `todoListState`라고 하고 이것을 `atom()` 함수를 이용해 생성할 것이다.

```jsx
const todoListState = atom({
  key: "todoListState",
  default: [],
});
```

우리는 atom에 고유한 `key`를 주고 비어있는 배열 값을 `default`로 설정할 것이다.

이 atom의 항목을 읽기 위해,  `useRecoilValue()` 훅을  `TodoList` 컴포넌트에서 사용할 수 있다.

새로운 todo 아이템을 생성하기 위해 우리는 `todoListState` 내용을 업데이트하는 setter 함수에 접근해야 한다.

`TodoItemCreator` 컴포넌트의 setter 함수를 얻기 위해 `useSetRecoilState()` 훅을 사용할 수 있다.

```jsx
function TodoItemCreator() {
  const [inputValue, setInputValue] = useState("");
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
    setInputValue("");
  };

  const onChange = ({ target: { value } }) => {
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

기존 todo 리스트를 기반으로 새 todo 리스트를 만들 수 있도록 setter 함수의 **updater** 형식을 사용한다는 점에 유의해야 한다.

`TodoItem` 컴포넌트는 todo 리스트의 값을 표시하는 동시에 텍스트를 변경하고 항목을 삭제할 수 있다.  `todoListState`를 읽고 항목 텍스트를 업데이트하고, 완료된 것으로 표시하고, 삭제하는 데 사용하는 setter 함수를 얻기 위해 `useRecoilState()`를 사용한다.

```jsx
function TodoItem({ item }) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({ target: { value } }) => {
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

### **Selectors**

**Selector**는 파생된 상태(**derived state**)의 일부를 나타낸다. 파생된 상태를 어떤 방법으로든 주어진 상태를 수정하는 순수 함수에 전달된 상태의 결과물로 생각할 수 있다.

1. **필터링 된 todo 리스트: 전체 todo 리스트에서 일부 기준에 따라 특정 항목**
2. **Todo 리스트 통계** : **총 항목 수, 완료된 항목 수, 완료된 항목 등 백분율 같은 리스트의 유용한 속성들을 계산하여 파생**

우리는 atom에 저장될 수 있는 필터 기준을 선택해야 한다. 사용될 필터옵션은 아래에서 차근차근 소개가 될것이고 일단, 기본값은 "Show All" 필어 아래와 같이 구현 가능하다.

```jsx
const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});
```

`todoListFilterState`와 `todoListState`를 사용해서 필터링 된 리스트를 파생하는 `filteredTodoListState` selector를 구성할 수 있다.

```jsx
const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});
```

`todoListFilterState`와 `todoListState` 둘 중 하나라도 변하면

`filteredTodoListState`는 재 실행된다.
