# 6주차 React 스터디 정리

| 장           | 제목                                 |
| ------------ | ------------------------------------ |
| 14장         | 외부 API를 연동하여 뉴스 뷰어 만들기 |
| 전역상태관리 | recoil                               |

## 14 장

### 14.5 데이터 연동하기

useEffect를 사용하여 컴포넌트가 처음 렌더링되는 시점에 API를 요청하면 된다.

📌 **주의할 점** : useEffect에 등록하는 함수에 async를 붙이면 안된다.  
**이유** => useEffect에서 반환해야 하는 값은 뒷정리 함수이기 때문이다.

만약 사용하고 싶다면 함수 내부에 async 키워드가 붙은 또 다른 함수를 만들어서 사용해야 한다.

```javascript
//NewsList.js 코드
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const NewsList = () => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //async를 사용하는 함수 따로 선언
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "https://newsapi.org/v2/top-headlines?country=kr&apiKey=myAppkey"
                );
                setArticles(response.data.articles);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    //대기 중일 때
    if (loading) {
        return <NewsListBlock>대기 중 ...</NewsListBlock>;
    }
    // 아직 articles 값이 설정되지 않았을 때
    if (!articles) {
        return null;
    }

    //article값이 유효할 때
    return (
        <NewsListBlock>
            {articles.map((article) => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};

export default NewsList;
```

이때 중요한 점은 map함수를 사용하기 전, !articles를 조회하여 해당 값이 현재 null이 아닌지 검사해야한다.  
**이유** => 데이터가 없을 때 null에는 map 함수가 없기 때문에 렌더링과정에서 오류가 발생한다.

<br />

### 14.6 카테고리 기능 구현하기

카테고리 컴포넌트에 전체보기, 비즈니스, 엔터테인먼트, 건강, 과학, 스포츠, 기술과 같이 7가지를 만들어볼 것이다.

```javascript
import React from "react";
import styled from "styled-components";

const categories = [
    {
        name: "all",
        text: "전체보기",
    },
    {
        name: "business",
        text: "비즈니스",
    },
    {
        name: "entertainment",
        text: "엔터테인먼트",
    },
    {
        name: "health",
        text: "건강",
    },
    {
        name: "science",
        text: "과학",
    },
    {
        name: "sports",
        text: "스포츠",
    },
    {
        name: "technology",
        text: "기술",
    },
];

const CategoriesBlock = styled.div`
    display: flex;
    padding: 1rem;
    width: 768px;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
        width: 100%auto;
        overflow-x: auto;
    }
`;

const Category = styled.div`
    font-size: 1.125rem;
    cursor: pointer;
    white-space: pre;
    text-decoration: none;
    color: inherit;
    padding-bottom: 0.25rem;

    &:hover {
        color: #495057;
    }

    & + & {
        margin-left: 1rem;
    }
`;

const Categories = () => {
    return (
        <Categories>
            {categories.map((c) => (
                <Category key={c.name}>{c.text}</Category>
            ))}
        </Categories>
    );
};

export default Categories;
```

이를 App컴포넌트에 렌더링하게 되면, 7가지의 카테고리가 함께 나타난다.

선택된 카테고리의 상태변화를 나타내기 위해 useState로 관리하고, 업데이트하는 onSelect 함수를 만들것이다.

```javascript
//App.js
import React, { useState, useCallback } from "react";
import NewsList from "./Components/NewsList";
import Categories from "./Components/Categories";

const App = () => {
    const [category, setCategory] = useState("all");
    const onSelect = useCallback((category) => setCategory(category), []);

    return (
        <>
            <Categories category={category} onSelect={onSelect} />
            <NewsList category={category} />
        </>
    );
};

export default App;
```

App.js 파일에 useState와 onSelect를 생성하고 나면 props로 전달받은 onSelect를 각 Category 컴포넌트의 onClick으로 설정해줄 필요가 있다.

```javascript
//const Category에 추가하는 부분
    ${props => props.active && css`
        font-weight: 600;
        border-bottom: 2px solid #22b8cf;
        color: #22b8cf;
        &:hover {
            color: #3bc9db;
        }
    `}

//const Categories
const Categories = ({onSelect, category}) => {
    return (
        <CategoriesBlock>
            {categories.map(c=>(
                <Category
                    key={c.name}
                    active={category === c.name}
                    onClick={() => onSelect(c.name)}
                >{c.text}</Category>
            ))}
        </CategoriesBlock>
    );
};
```

이때 선택된 카테고리의 상태는 변하지만, 그 카테고리 내용을 불러오지는 않았기 때문에 props로 받아온 category에 따라 API를 요청해야 한다.  
요청된 API에 따라 List를 불러와야하므로 NewsList.js의 코드에 추가적인 내용을 넣어야 한다.

```javascript
//NewsList.js
//파라미터에 category 추가
const NewsList = ({category}) => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        //async를 사용하는 함수 따로 선언
        const fetchData = async () => {
            setLoading(true);
            try {
                const query = category === 'all' ? '' : `&category=${category}`;
                const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=myAppkey`,);
                setArticles(response.data.articles);
            }
            catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [category]);
```

category 값이 무엇인지에 따라 주소가 동적으로 바뀌게 된다.  
이때 category 값이 all이라면 query 값을 공백으로, 아니라면 "&category=카테고리" 형태의 문자열을 만들도록 했다.

그리고 useEffect의 두번째 파라미터 배열에 category를 넣어주어야 한다.  
이유 => category의 값이 바뀔 때마다 뉴스를 새로 불러와야하기 때문.

<br />

### 14.7 리액트 라우터 적용하기

위 예제같은 경우, 카테고리 값을 useState로 관리했다.  
이번에는 리액트 라우터의 URL 파라미터를 사용하여 관리해볼 것이다.

리액트 라우터를 적용할 때 만들어야 할 페이지는 하나이다.

```javascript
//NewsPage.js
import React from "react";
import Categories from "../Components/Categories";
import NewsList from "../Components/NewsList";

const NewsPage = ({ match }) => {
    //카테고리가 선택되지 않았다면 기본값 all로 사용
    const category = match.params.category || "all";

    return (
        <>
            <Categories />
            <NewsList category={category} />
        </>
    );
};

export default NewsPage;
```

선택된 category 값을 URL 파라미터로 사용할 것이기 때문에 Categories에서 현재 선택된 카테고리 값을 알려줄 필요가 없다.  
동시에 onSelect 함수를 따로 전달할 필요도 없다.

그렇기 때문에 기존의 App 컴포넌트의 내용도 줄어들게 된다.

```javascript
//App.js
import React from "react";
import { Route } from "react-router-dom";
import NewsPage from "./pages/NewsPage";

const App = () => {
    return <Route path="/:category?" component={NewsPage} />;
};

export default App;
```

path 주소규칙 속 ? 문자는 category 값이 **선택적**이라는 의미를 가진다.  
=> 있을 수도, 없을 수도 있다는 뜻이며 파라미터가 없다면 전체 가테고리를 선택한 것으로 간주한다.

추가로 선택된 카테고리에 스타일을 주는 기능을 NavLink로 대체할 수 있다.  
특정 컴포넌트에 styled-components를 사용할 땐 **styled(컴포넌트이름)``**과 같은 형식을 사용한다.

```javascript
//Catogories.js
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

...

const Category = styled(NavLink)`
    font-size: 1.125rem;
    cursor: pointer;
    white-space: pre;
    text-decoration: none;
    color: inherit;
    padding-bottom: 0.25rem;

    &:hover{
        color: #495057;
    }

    &.active {
        font-weight: 600;
        border-bottom: 2px solid #22b8cf;
        color: #22b8cf;
        &:hover {
            color: #3bc9db;
        }
    }

    &+& {
        margin-left: 1rem;
    }
`;

const Categories = () => {
    return (
        <CategoriesBlock>
            {categories.map(c=>(
                <Category
                    key={c.name}
                    activeClassName = "acitve"
                    exact = {c.name === 'all'}
                    to={c.name === 'all' ? '/' : `/${c.name}`}
                >{c.text}</Category>
            ))}
        </CategoriesBlock>
    );
};

export default Categories;
```

to 값이 "/"를 가리키고 있을 때는 exact 값을 true로 해주어야 한다.  
이유 => 설정하지 않을 시, 다른 카테고리가 선택되어도 전체보기 링크에 active 스타일이 적용된다.

<br />

### 14.8 usePromise custom hook 만들기

컴포넌트에서 Promise를 사용해야 하는 경우 더 간결하게 만들어주는 커스텀 Hook을 만들어볼 수도 있다.

프로젝트의 다양한 곳에서 사용될 수 있는 **유틸 함수**들은 lib디렉토리를 만든 후 그 안에 작성한다.

```javascript
//lib디렉토리 usePromise.js
import { useState, useEffect } from "react";

export default function usePromise(promiseCreator, deps) {
    //대기 중/완료/실패에 대한 상태관리
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
    }, deps);

    return [loading, resolved, error];
}
```

usePromise를 사용하면 useEffect 설정을 직접 하지 않아도 되어 코드가 간결해진다.

<br />

### 14.9 정리

📌**유의 사항**

1. useEffect에 등록하는 함수는 async로 작성하면 안되고, 내부에 async 함수를 따로 만들어야 한다.

2. usePromise로 코드를 간결하게 할 수는 있으나 사용해야 할 API 종류가 많아지면 번거로워질수도 있다.  
   => 리덕스와 리덕스 미들웨어를 사용하면 쉽게 요청에 대한 상태를 관리할 수 있다.

<br />

## recoil

### 주요 개념

> 💡 Recoil을 사용하면 atoms(공유 상태)에서 selectors(순수 함수)를 거쳐 React 컴포넌트로 내려가는 data-flow 그래프를 만들 수 있다.

> 💡 **Atoms** : 컴포넌트가 구독할 수 있는 상태의 단위다.

업데이트가 되면 각각의 구독된 컴포넌트는 새로운 값을 반영하여 다시 렌더링된다.  
atoms는 런타임에서 생성될 수도 있으며 React의 로컬컴포넌트 상태 대신 사용할 수 있다.  
동일한 atom이 여러 컴포넌트에서 사용되는 경우 모든 컴포넌트는 상태를 공유한다.

Atoms는 `atom` 함수를 사용하여 생성한다.  
디버깅, 지속성 및 모든 atoms의 map을 볼 수 있는 특정 고급 API에 사용되는 고유한 키가 필요하나,  
2개의 키를 갖는 것은 오류이기 때문에 키 값은 전역적으로 고유하도록 해야한다.

컴포넌트에서 atom을 읽고 쓰기 위해서는 `useRecoilState`라는 훅을 사용한다.

> 💡 **Selectors** : atoms나 다른 selectors를 입력으로 받아들이는 순수 함수(pure function)다.

상위의 atoms나 selectors가 업데이트되면 하위의 selector 함수도 다시 실행된다.  
컴포넌트는 atoms처럼 selectors를 구독할 수 있으며 변경되면 컴포넌트들도 다시 렌더링된다.

주로 상태를 기반으로 하는 파생 데이터를 계산하는 데 사용된다.  
어떤 컴포넌트가 자신을 필요로하는지, 자신은 어떤 상태에 의존하는지를 추적하기 때문에 이러한 함수적 접근방식을 매우 효율적으로 만든다.

Selector는 `selector` 함수를 사용하여 정의한다.  
selector를 읽기 위해서는 `useRecoilValue()`를 사용한다.  
useRecoilValue는 하나의 atom이나 selector를 인자로 받아서 대응하는 값을 반환한다.

=> 컴포넌트의 관점에서 보면 selectors와 atoms는 동일한 인터페이스를 가지므로 서로 대체할 수 있다.

<br />

### 설치

<라이브러리 설치>

> yarn add recoil 명령어 사용

Recoil은 Webpack이나 Rollup과 같은 모듈 번들러와도 문제없이 호환된다.  
빌드는 ES5로 트랜스파일되지 않고 같이 사용하는 것은 지원하지 않는다.  
Recoil은 ES6의 Map과 Set타입에 의존하는데, polyfills를 통해 에뮬레이션하는 것은 성능상의 문제를 야기할 수 있다.

버전 0.0.11 이후 Recoil은 script태그에 직접 사용될 수 있는 UMD 빌드를 제공한다.  
그리고 Recoil 심볼을 글로벌 네임스페이스에 노출시킨다.  
최신 버전으로부터 손상이 일어날 수 있기 때문에 안정된 특정 버전 번호 및 빌드에 연결시키는 것이 좋다.

> **ESLint** : useRecoilCallback()을 사용하기 위해 전달된 종속성이 잘못 지정되었을 때 경고를 표시하고 해결방안을 제시한다.

`eslint-plugin-react-hooks`를 사용할 때, eslint 설정을 사용하는 경우 useRecoilCallback을 additionalHooks 목록에 추가하는 것이 좋다.  
이때 additionalHooks의 형식은 정규식 문자열이다.

< Nightly Builds >  
아래 명령어를 통해 nightly 브랜치를 이용할 수 있다.

> yarn add https://github.com/facebookexperimental/Recoil.git#nightly

<br />

### Recoil 시작하기

> 💡 **Recoil** : 리액트를 위한 상태 관리 라이브러리

루트 컴포넌트가 RecoilRoot를 넣기에 가장 좋은 장소.

**Atom**  
Atoms는 어떤 컴포넌트에서나 읽고 쓸 수 있다.  
atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독한다.  
그래서 변화가 있을 때 atom을 구독하는 모든 컴포넌트들은 재렌더링된다.

**Selector**  
Selector은 파생된 상태의 일부를 나타낸다.  
파생된 상태는 상태의 변화이며, 어떤 방법으로든 주어진 상태를 수정하는 순수 함수에 전달된 상태의 결과물로 생각할 수 있다.

<br />

### 도입부

TodoList 예제를 만들어보면서 Atoms와 Selector 개념을 이용해볼 것이다.

### Atoms

Atoms는 어플리케이션 상태의 source of truth를 갖는다.  
todoList에서 source of truth는 todo 아이템을 나타내는 객체로 이루어진 배열이 될 것이다.

Atom 리스트를 todoListState라고 선언하고 atom()를 이용해서 생성하게 되면,

```javascript
const todoListState = atom({
    key: "todoListState",
    default: [],
});
```

고유한 key를 주고 비어있는 배열 값을 default로 설정한다.  
Atom을 읽기 위해서 `useRecoilValue()`사용할 것이며, 이를 TodoList 컴포넌트를 따로 만들어 사용할 것이다.

새로운 todo 아이템을 만들기 위해서 선언했던 todoListState 내용을 업데이트하는 setter 함수에 접근해야 한다.  
setter함수를 얻기 위해 `useSetRecoilState()` 훅을 사용할 수 있다.

```javascript
//TodoItemCreator.js
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

import { todoListState } from "TodoList";

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

export default TodoItemCreator;
```

TodoItemCreator.js를 만들면서 유의해야 할 점은 기존 리스트를 기반으로 새 todo 리스트를 만들 수 있도록 setter 함수의 updater 형식을 사용한다는 점에 유의해야 한다.

그 다음 todo 리스트의 값을 표시하는 동시에 텍스트를 변경하고 항목을 삭제하는 TodoItem 컴포넌트를 만들 것이다.

```javascript
//TodoItem.js
import React from "react";
import { useRecoilState } from "recoil";

import { todoListState } from "TodoList";

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

export default TodoItem;
```

<br />

### Selectors

Selector는 파생된 상태의 일부이다.  
파생된 상태는 다른 데이터에 의존하는 동적인 데이터를 만들 수 있기 때문에 강력한 개념이라고 할 수 있다.

이 recoil 예제에서는 다음 것들이 파생된 상태로 간주된다.

-   **필터링 된 todo 리스트** : 전체 todo 리스트에서 일부 기준에 따라 특정 항목이 필터링 된 새 리스트

-   **Todo 리스트 통계** : 전체 todo 리스트에서 목록의 총 항목 수, 완료된 항목 수, 완료된 항목의 백분율 같은 리스트의 유요한 속성들을 계산하여 파생

필터링 된 todo리스트를 구현하기 위해서 atom에 저장되는 필터 기준을 정해야 한다.

<필터 옵션>

1. Show All (기본값)
2. Show Completed
3. Show Uncompleted

```javascript
import React, { atom, selector } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "TodoList";

const todoListFilterState = atom({
    key: "todoListFilterState",
    default: "Show All",
});

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

function TodoListFilter() {
    const [filter, setFilter] = useRecoilState(todoListFilterState);

    const updateFilter = ({ target: { value } }) => {
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

export default TodoListFilter;
```

filteredTodoListState는 내부적으로 2개의 의존성 todoListFilterState, todoListState을 추적한다.  
그래서 2가지 중 하나라도 변하면 filteredTodoListState는 재실행된다.

컴포넌트 관점으로 보면 selector는 atom을 읽을 때 사용하는 같은 훅을 사용해 읽을 수 있다.  
특정한 훅은 `쓰기 가능 상태 (useRecoilState())` 에서만 작동한다.  
모든 atom은 쓰기 가능 상태이지만 selector는 일부만 쓰기 가능한 상태로 간주된다.

그리고 이 예제에서 사용할 4가지의 통계가 있는데,

1. todo 항목의 총 개수
2. 완료된 todo 항목들의 총 개수
3. 완료되지 않은 todo 항목들의 총 개수
4. 완료된 항목의 백분율

필요한 데이터를 포함하는 객체를 반환하는 selector가 든 컴포넌트를 만들 것이다.

```javascript
//TodoListStats.js
import React, { selector } from "react";
import { useRecoilValue } from "recoil";
import { todoListState } from "TodoList";

const todoListStatsState = selector({
    key: "todoListStatsState",
    get: ({ get }) => {
        const todoList = get(todoListState);
        const totalNum = todoList.length;
        const totalCompletedNum = todoList.filter(
            (item) => item.isComplete
        ).length;
        const totalUncompletedNum = totalNum - totalCompletedNum;
        const percentCompleted =
            totalNum === 0 ? 0 : totalCompletedNum / totalNum;

        return {
            totalNum,
            totalCompletedNum,
            totalUncompletedNum,
            percentCompleted,
        };
    },
});

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

export default TodoListStats;
```

마무리로 TodoList.js를 수정해준다.

```javascript
//TodoList.js
function TodoList() {
    const todoList = useRecoilValue(filteredTodoListState);

    return (
        <>
            <TodoListStats />
            <TodoListFilter />
            <TodoItemCreator />

            {todoList.map((todoItem) => (
                <TodoItem key={todoItem.id} item={todoItem} />
            ))}
        </>
    );
}

export default TodoList;
```

---

질문, 이해가 안 갔던 것, 궁금한 것, 스터디장이나 다른 사람들에게 물어보고 싶은 것, 기타 등등이 있으시면 써주시고, 이 문구는 지워주세요!
