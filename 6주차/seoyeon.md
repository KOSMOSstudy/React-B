# 6주차(14장 6절~끝까지, Recoil)

# <14장 : 외부 API를 연동하여 뉴스 뷰어 만들기>

## 14.5 데이터 연동하기

NewsList 컴포넌트에서 이전에 연습 삼아 사용했던 API를 호출

useEffect를 사용하여 컴포넌트가 처음 렌더링 되는 시점에 API를 요청하면 된다.

※ 주의점 : useEffect에 등록하는 함수에 async를 붙이면 안된다. useEffect에서 반환해야 하는 값은 뒷정리 함수이기 때문

↓ NewsList.js

```jsx
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px){
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try{
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=kr&apiKey=0a8c4202385d4ec1bb-93b7e277b3c51f',
        );
        setArticles(response.data.articles);
      }catch(e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if(loading){
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }
  if(!articles){
    return null;
  }
  return (
    <NewsListBlock>
      {articles.map(article => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
```

## 14.6 카테고리 기능 구현하기

### 14.6.1 카테고리 선택 UI 만들기

components 디렉터리에 Categories.js 파일을 생성한 뒤, 다음과 같이 작성

```jsx
import React from 'react';
import styled from 'styled-components';

const categories = [
  {
    name: 'all',
    text: '전체보기'
  },
  {
    name: 'business',
    text: '비즈니스'
  },
  {
    name: 'entertainment',
    text: '엔터테인먼트'
  },
  {
    name: 'health',
    text: '건강'
  },
  {
    name: 'science',
    text: '과학'
  },
  {
    name: 'sports',
    text: '스포츠'
  },
  {
    name: 'technology',
    text: '기술'
  }
];

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px){
    width: 100%;
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
    <CategoriesBlock>
      {categories.map( c => {
        <Category key={c.name}>{c.text}</Category>
      })}
    </CategoriesBlock>
  );
};

export default Categories;
```

↓ App.js

```jsx
import React from 'react';
import Categories from './components/Categories';
import NewsList from './components/NewsList';

const App = () => {
  return(
    <>
    <Categories />
    <NewsList />
    </>
  );
};

export default App;
```

이제 App에서 category 상태를 useState로 관리.

추가로 category 값을 업데이트하는 onSelect 라는 함수도 생성한 뒤,

category와 onSelect 함수를 Categories 컴포넌트에게 props로 전달, category 값을 NewsList 컴포넌트에게도 전달

↓ App.js

```jsx
import React, { useState, useCallback } from 'react';
import Categories from './components/Categories';
import NewsList from './components/NewsList';

const App = () => {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback(category => setCategory(category), []);
  return(
    <>
    <Categories category={category} onSelect={onSelect}/>
    <NewsList category={category}/>
    </>
  );
};

export default App;
```

Categories에서 props로 전달받은 onSelect를 각 Category 컴포넌트의 onClick으로 설정해 주고 현재 선택된 카테고리 값에 따라 다른 스타일을 적용

↓ Categories.js

```jsx
import React from 'react';
import styled from 'styled-components';

const categories = [
  {
    name: 'all',
    text: '전체보기'
  },
  {
    name: 'business',
    text: '비즈니스'
  },
  {
    name: 'entertainment',
    text: '엔터테인먼트'
  },
  {
    name: 'health',
    text: '건강'
  },
  {
    name: 'science',
    text: '과학'
  },
  {
    name: 'sports',
    text: '스포츠'
  },
  {
    name: 'technology',
    text: '기술'
  }
];

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px){
    width: 100%;
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

  ${props => 
    props.active && css`
      font-weight: 600;
      border-bottom: 2px solid #22b8cf;
      &:hover{
        color: #3bc9db;
      }
   `}

  & + & {
    margin-left: 1rem;
  }
`;
const Categories = ({onSelect, category}) => {
  return (
    <CategoriesBlock>
      {categories.map( c => {
        <Category 
        key={c.name}
        active={category === c.name}
        onClick={() => onSelect(c.name)}
        >
          {c.text}
        </Category>
      })}
    </CategoriesBlock>
  );
};

export default Categories;
```

### 14.6.2 API를 호출할 때 카테고리 지정하기

NewsList 컴포넌트에서 현재 props로 받아 옴 category에 따라 카테고리를 지정하여 API를 요청하도록 구현. NewsList.js에서 NewsList에 매개변수로 {category}를 추가하고 try 문을 다음과 같이 수정한다.

↓ NewsList.js

```jsx
try{
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0a8c4202385d4ec1bb-93b7e277b3c51f`,
        );
        setArticles(response.data.articles);
      }
```

위와 같이 바꾸면, 현재 카테고리 값이 무엇인지에 따라 요청할 주소가 동적으로 바뀜

category 값이 all 이라면 query 값을 공백으로 설정하고, all이 아니라면 "&category=카테고리" 형태의 문자열을 만들도록함. 그리고 이 query를 요청할 때 주소에 포함 ${query}

category 값이 바뀔 때마다 뉴스를 새로 불러와야 하기 때문에 useEffect의 의존 배열(두 번째 파라미터로 설정하는 배열)에 category를 넣어주어야 한다.

## 14.7 리액트 라우터 적용하기

```jsx
$ yarn add react-router-dom
```

index.js를 다음과 같이 수정

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

pages 디렉토리를 만들고 그 안에 NewsPage.js를 생성 후 다음과 같이 작성

```jsx
import React from 'react';
import Categories from '../components/Categories';
import NewsList from '../components/NewsList';

const NewsPage = ({match}) => {
  const category = match.params.category || 'all';

  return (
    <>
    <Categories />
    <NewsList category={category} />
    </>
  );
};

export default NewsPage;
```

여기까지 작성 이후 App.js에서 기존 내용을 모두 지우고 Route를 정의

```jsx
import React from 'react';
import {Route} from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
  return <Route path="/:category?" component={NewsPage} />
};

export default App;
```

- /:category? 의 의미

category의 값이 선택적이라는 의미. 즉, 있을 수도 있고 없을 수도 있다는 뜻. 

category URL 파라미터가 없다면 전체 카테고리를 선택한 것으로 간주

### 14.7.3 Categories 에서 NavLink 사용하기

Categories에서 기존의 onSelect 함수를 호출하여 카테고리를 선택하고, 선택된 카테고리에 다른 스타일을 주는 기능을 NavLink로 대체

↓ Categories.js 수정

```jsx
import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom'

const categories = [
  {
    name: 'all',
    text: '전체보기'
  },
  {
    name: 'business',
    text: '비즈니스'
  },
  {
    name: 'entertainment',
    text: '엔터테인먼트'
  },
  {
    name: 'health',
    text: '건강'
  },
  {
    name: 'science',
    text: '과학'
  },
  {
    name: 'sports',
    text: '스포츠'
  },
  {
    name: 'technology',
    text: '기술'
  }
];

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px){
    width: 100%;
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

  &.active {
    font-weight: 600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover {
      color: #3bc9db
    }
  }

  & + & {
    margin-left: 1rem;
  }
`;
const Categories = ({onSelect, category}) => {
  return (
    <CategoriesBlock>
      {categories.map( c => {
        <Category 
        key={c.name}
        activeClassName="active"
        exact={c.name === 'all'}
        to={c.name === 'all' ? '/' : `/${c.name}`}
        onClick={() => onSelect(c.name)}
        >
          {c.text}
        </Category>
      })}
    </CategoriesBlock>
  );
};

export default Categories;
```

NavLink 로 만들어진 Category 컴포넌트에 to 값은 "/카테고리이름"으로 설정

전체보기의 경우는 "/all" 대신 "/"로 설정

to 값이 "/"를 가리키고 있을 때는 exact 값을 true로 해 주어야 한다.

그렇지 않으면 다른 카테고리가 선택되었을 때에도 전체보기 링크에 active 스타일이 적용되는 오류가 발생한다.

## 14.8 usePromise 커스텀 Hook 만들기

src 디렉터리에 lib 디렉터리를 만들고 그 안에 usePromise.js를 작성

↓ usePromise.js

```jsx
import {useState, useEffect} from 'react';

export default function usePromise(promiseCreator, deps){
  const [loading, setLoading] = usState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try{
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch(e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
  }, deps);

  return [loading, resolved, error];
}
```

프로젝트의 다양한 곳에 쓰일 수 있는 유틸 함수들은 보통 이렇게 src 디렉터리에 lib 디렉터리를 만든 후 그 안에 작성한다.

usePromise Hook은 Promise의 대기 중, 완료 결과, 실패 결과에 대한 상태를 관리하며, usePromise의 의존 배열 deps를 파라미터로 받아 온다. 

파라미터로 받아온 deps 배열은 usePromise 내부에서 사용한 useEffect의 의존 배열로 설정.

여기서 ESLint 경고가 나타남.

위 경고를 무시하려면, 특정 줄에서만 ESLint 규칙을 무시하도록 주석 작성이 필요.

빠른 수정 문구를 클릭하면 자동으로 ESLint 규칙을 비활성화시키는 주석을 입력할 수 있다.

NewsList 컴포넌트에서 usePromise를 사용하는 코드

↓ NewsList.js

```jsx
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromis from '../lib/usePromise';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px){
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({category}) => {
  const [loading, response, error] = usePromis(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0a8c4202385d4ec1bb-93b7e277b3c51f`,
    );
  }, [category]);

  if(loading){
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }
  if(!response){
    return null;
  }
  if(error){
    return <NewsListBlock>에러 발생!</NewsListBlock>
  }
  const {articles} = response.data;
  return (
    <NewsListBlock>
      {articles.map(article => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
```

usePromise를 사용하면 NewsList에서 대기 중 상태 관리와 useEffect 설정을 직접 하지 않아도 되므로 코드가 간결해진다. 무조건 커스텀 Hook을 사용하는 것은 아니지만, 상황에 따라 잘 이용하면 좋음.

## 14.9 정리

리액트 컴포넌트에서 API를 연동하여 개발할 때 유의사항 : useEffect에 등록하는 함수는 async로 작성하면 안된다는 점.

그 대신 함수 내부에 async 함수를 따로 만들어 주어야 한다.

커스텀 Hook을 통해 코드를 간결하게 만들 수는 있지만, 나중에 API 종류가 많아지면 요청을 위한 상태 관리가 힘들기 때문에 리덕스와 리덕스 미들웨어를 배우면 좀 더 쉽게 요청에 대한 상태를 관리할 수 있다.

---

# recoil

## 주요 개념 : *전역 useState*

Recoil 사용으로 *atoms* (공유 상태)에서 *selectors* (순수 함수)를 거쳐 React 컴포넌트로 내려가는 data-flow graph를 만들 수 있다. 

Atoms는 컴포넌트가 구독할 수 있는 상태의 단위다. Selectors는 atoms 상태 값을 동기 또는 비동기 방식을 통해 변환한다.

## 설치

```jsx
$ npm install recoil
또는
$ yarn add recoil
```

- Recoil은 Webpack 또는 Rollup과 같은 모듈 번들러와도 문제없이 호환됨
- Recoil을 ES5로 지원 x
- CDN : Recoil은 <script>태그에 직접 사용될 수 있는 UMD 빌드를 제공. Recoil 심볼을 글로벌 네임스페이스에 노출 시킨다.

## Recoil 시작하기

### React 애플리케이션 생성하기

Recoil은 React를 위한 상태 라이브러리이므로 React가 설치되어 있어야 한다.

```jsx
$ npx create-react-app my-app
```

### Recoil 설치

```jsx
npm install recoil
or
yarn add recoil
```

### RecoilRoot

recoil 상태를 사용하는 컴포넌트는 부모 트리 어딘가에 나타나는 RecoilRoot가 필요함.

Root 컴포넌트가 RecoilRoot를 넣기에 가장 좋은 장소이다.

```jsx
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}
```

## 도입부

Recoil과 React를 설치했다는 가정, 각 섹션의 컴포넌트들은 부모트리에 <RecoilRoot />가 있다고 가정.

간단한 todo list 애플리케이션을 제작함. 

그 과정에서 Recoil API에 의해 노출된 atoms, selectors, atom families와 hook을 다룸 + 최적화

## Atoms

- Atom은 상태(state)의 일부를 나타낸다.  상태의 단위
- 어떤 컴포넌트에서나 읽고 쓸 수 있음.
- atoms는 런타임에서 생성될 수도 있다.
- 업데이트와 구독 가능
- 동일한 atom이 여러 컴포넌트에서 사용되는 경우 모든 컴포넌트는 상태를 공유한다.

Atoms는 `atom`함수를 사용해 생성

```jsx
const fontSizeState = atom({
  key: 'fontSizeState',
  default: 14,
});
```

- 키값은 전역적으로 고유하도록
- React 컴포넌트의 상태처럼 기본값도 가진다

- atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독한다. → atom에 어떤 변화가 있으면, 그 atom을 구독하는 모든 컴포넌트들이 리렌더링 되는 결과가 발생한다.

→ component가 atom을 읽고 쓰게 하기 위해서는 useRecoilState()를 사용한다. 

```jsx
const [text, setText] = useRecoilState(textState);
```

---

Atoms는 애플리케이션 상태의 source of truth를 갖음.

todo list에서 source of truth는 todo 아이템을 나타내는 객체로 이루어진 배열이 된다.

atom list를 todoListState라고 할것. 이것을 atom() 함수를 이용하여 생성

```jsx
const todoListState = atom({
  key: 'todoListState',
  default: [],
});
```

atom에 고유한 key를 주고, 비어 있는 배열 값을 default로 설정.

이를 위해 useRecoilValue() Hook을 TodoList 컴포넌트에서 사용할 수 있음

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

새로운 todo 아이템을 생성하기 위해 todoListState 내용을 업데이트 하는 함수인 setter에 접근해야함 

TodoItemCreator 컴포넌트의 setter 함수를 얻기 위해 useSetRecoilState() 훅을 사용할 수 있다. 

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

※ 기존 todo 리스트를 기반으로 새 todo list를 만들 수 있도록 setter 함수의 updater 형식을 사용한다는 점에 유의

TodoItem 컴포넌트는 todo list 의 값을 표시하는 동시에 텍스트를 변경하고 항목을 삭제할 수 있음

todoListState 를 읽고 항목 텍스트를 업데이트하고, 완료된 것으로 표시하고, 삭제하는 데 사용하는 setter 함수를 얻기 위해 useRecoilState를 사용

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

## Selector

- **Selector**는 파생된 상태(**derived state**)의 일부를 나타냄
- **Selector**는 atoms나 다른 selectors를 입력으로 받아들이는 순수 함수(pure function)
- 상위의 atoms 또는 selectors가 업데이트되면 하위의 selector 함수도 다시 실행
- 컴포넌트들은 selectors를 atoms처럼 구독할 수 있으며 selectors가 변경되면 컴포넌트들도 다시 렌더링
- Selectors는 상태를 기반으로 하는 파생 데이터를 계산하는 데 사용.
- 파생된 상태는 상태의 **변화**
- 파생된 상태를 어떤 방법으로든 주어진 상태를 수정하는 순수 함수에 전달된 상태의 결과물로 생각할 수 있음
- 파생된 상태는 다른 데이터에 의존하는 동적인 데이터를 만들 수 있기 때문에 강력한 개념
- 최소한의 상태 집합만 atoms에 저장하고 다른 모든 파생되는 데이터는 selectors에 명시한 함수를 통해 효율적으로 계산함으로써 쓸모없는 상태의 보존을 방지
- Selectors는 어떤 컴포넌트가 자신을 필요로하는지, 또 자신은 어떤 상태에 의존하는지를 추적하기에 매우 효율적임
- 컴포넌트의 관점에서 보면 selectors와 atoms는 동일한 인터페이스를 가지므로 서로 대체할 수 있다.

Selectors는 `selector`함수를 사용해 정의

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

get 속성은 계산될 함수

get 인자를 통해 atoms와 다른 selectors에 접근할 수 있음

다른 atoms나 selectors에 접근하면 자동으로 종속 관계가 생성되므로, 참조했던 다른 atoms나 selectors가 업데이트되면 이 함수도 다시 실행

```jsx
const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
});
```

useRecoilValue() 훅을 사용해서 charCountState 값을 읽을 수 있음

```jsx
function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}
```

`useRecoilValue()`는 하나의 atom이나 selector를 인자로 받아 대응하는 값을 반환

`fontSizeLabelState` selector는 writable하지 않기 때문에 `useRecoilState()`를 이용하지 않는다.

---

todo 리스트 애플리케이션 맥락에서는 다음과 같은 것들이 파생된 상태로 간주

- **필터링 된 todo 리스트** : 전체 todo 리스트에서 일부 기준에 따라 특정 항목이 필터링 된 새 리스트(예: 이미 완료된 항목 필터링)를 생성되어 파생된다.
- **Todo 리스트 통계** : 전체 todo 리스트에서 목록의 총 항목 수, 완료된 항목 수, 완료된 항목의 백분율 같은 리스트의 유용한 속성들을 계산하여 파생된다.

필터링 된 todo 리스트를 구현하기 위해, atom에 저장될 수 있는 필터 기준을 선택해야 함. 

필터 옵션 : "Show All", "Show Completed", "Show Uncompleted"

기본 값 : "Show All"

```jsx
const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'Show All',
});
```

- filteredTodoListState selector

기능 : 필터링 된 리스트 파생

사용 : todoListFilterState, todoListState

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

사용된 컴포넌트 둘 중 하나라도 변하면, filteredTodoListState는 재실행됨

> 컴포넌트 관점에서 보면 selector는 atom을 읽을 때 사용하는 같은 훅을 사용해서 읽을 수 있다. 그러나 특정한 훅은 **쓰기 가능 상태** (즉, `useRecoilState()`)에서만 작동하는 점을 유의해야 한다. 모든 atom은 쓰기 가능 상태지만 selector는 일부만 쓰기 가능한 상태(`get`과 `set` 속성을 둘 다 가지고 있는 `selector`)로 간주된다.
> 

→ 필터링 된 TodoList를 표시하는 것은 TodoList 컴포넌트에서 한 줄만 바꾸면 됨

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

UI는 'toListFilterState'의 기본값인 'Show All'과 동일

필터를 변경할때 사용하는 TodoListFilter component ↓

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

`TodoListStats` 컴포넌트를 구현하기 위해 동일한 개념을 사용

→ 표시하려고 하는 통계

- todo 항목들의 총개수
- 완료된 todo 항목들의 총개수
- 완료되지 않은 todo 항목들의 총개수
- 완료된 항목의 백분율

'toDoListStatsState' selector : 각 통계에 대해 selector를 만들 수 있지만, 필요한 데이터를 포함하는 객체를 반환하는 selector 하나를 만드는 것이 더 쉬운 방법

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

`todoListStatsState`값을 읽기 위해, 우리는 `useRecoilValue()`를 한 번 더 사용

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

→ 여기까지 다음 사항을 충족하는 todo list 앱을 만들었다.

- todo 아이템 추가
- todo 아이템 수정
- todo 아이템 삭제
- todo 아이템 필터링
- 유용한 통계 표시