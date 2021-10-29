# 6주차 React 스터디 정리

| 장   | 제목                                 |
| ---- | ------------------------------------ |
| 14장 | 외부 API를 연동하여 뉴스 뷰어 만들기         |
| 전역상태관리 | recoil |

## 14 장

### 14.5 데이터 연동하기 
NewsList 컴포넌트에서 useEffect로 API를 호출하면 된다.  
이때 async/await를 그냥 사용하면 clean-up 함수가 되므로. 
이를 사용한다면 별도의 함수를 만들어 사용해야 한다.
src/components/NewsList.js
```jsx
import styled from "styled-components";
import {useEffect, useState} from "react";

import {Api} from "../lib/custormAxios";
import NewsItem from "./NewsItem";
import {ServerPath} from "../lib/path";

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
    setLoading(true);

    Api({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ORIGIN}${ServerPath.getNews}`,
      params: {
        country: `${process.env.REACT_APP_API_COUNTRY}`,
        apiKey: `${process.env.REACT_APP_API_KEY}`,
      }
    })
      .then(({data: {articles}}) => {
        setArticles(articles);
      })
      .catch(err => err);

    setLoading(false);
  }, []);

  if(loading) {
    return <NewsListBlock>로딩 중...</NewsListBlock>
  }

  if(!articles) {
    return null;
  }

  return (
    <NewsListBlock>
      {articles.map(articles => (
        <NewsItem key={articles.url} article={articles} />
      ))}
    </NewsListBlock>
  )
}

export default NewsList;
```

### 14.6 카테고리 기능 구현하기 

카테고리는 한글로 보여주되 내부적으로 사용하는 값은 영어로 한다. 
이를 위해 카테고리 리스트를 가지고 있는 객체를 선언하자. 여기서  
name은 key값, text는 실제로 보여지는 카테고리이다.
src/lib/categories.js
```js
const categories = [
  {
    name: 'all',
    text: '전체보기',
  },
  {
    name: 'business',
    text: '비즈니스',
  },
  {
    name: 'entertainment',
    text: '엔터테인먼트',
  },
  {
    name: 'health',
    text: '건강',
  },
  {
    name: 'science',
    text: '과학',
  },
  {
    name: 'sports',
    text: '스포츠',
  },
  {
    name: 'technology',
    text: '과학',
  },
];

export default categories;
```
이제 화면에 보여질 카테고리 컴포넌트를 만들자.  
```jsx
import styled from "styled-components";

import categories from "../lib/categories";

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
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
      {categories.map(({name, text}) => (
        <Category key={name}>{text}</Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;
```
![결과1](./img/category.png)
이제 선택한 카테고리를 명시적으로 보여주는 기능을 만들자.  
전역상태관리툴을 사용하지 않기 때문에 상태를 최상위 컴포넌트에 선언하자.  
```jsx
import {useCallback, useState} from "react";

import Categories from "./components/Categories";
import NewsList from "./components/NewsList";

function App() {
  const [category, setCategory] = useState('all');

  const handleSelect = useCallback(category => setCategory(category), []);

  return (
    <>
      <Categories category={category} handleSelect={handleSelect} />
      <NewsList category={category} />
    </>
  );
}

export default App;

```
이제 Categories컴포넌트에서 전달받은 props를 사용해 현재. 
선택된 카테고리를 하이라이트 하는 기능을 만들면 된다.  
src/components/Categories.js
```jsx
import styled, {css} from "styled-components";
import PropTypes from 'prop-types';

import categories from "../lib/categories";

const CategoriesBlock = styled.div`
  //...
  
  ${({active}) => active && css`
    font-weight: 600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  `}
`;

const Categories = ({handleSelect, category}) => {
  return (
    <CategoriesBlock>
      {categories.map(({name, text}) => (
        <Category
          key={name}
          active={category === name}
          onClick={() => handleSelect(name)}
        >
          {text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

Categories.propTypes = {
  handleSelect: PropTypes.func,
  categories: PropTypes.string,
};

export default Categories;
```
![categorySelected](./img/categorySelected.png)

이제 지정된 카테고리에 대해 검색을 하는 기능을 만들자. axios요청에서  
쿼리에 category를 추가하면 된다.
src/components/NewsList.js
```jsx
//...
const NewsList = ({category}) => {
 //...
  useEffect(() => {
    setLoading(true);

    Api({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ORIGIN}${ServerPath.getNews}`,
      params: {
        country: `${process.env.REACT_APP_API_COUNTRY}`,
        category: `${category === 'all' ? '' : category}`,
        apiKey: `${process.env.REACT_APP_API_KEY}`,
      }
    })
      .then(({data: {articles}}) => {
        setArticles(articles);
      })
      .catch(err => err);

    setLoading(false);
  }, [category]);

  //...

  return (
    <NewsListBlock>
     //...
    </NewsListBlock>
  )
}

NewsList.propTypes = {
  category: PropTypes.string.isRequired,
}
```
### 14.7 리액트 라우터 적용하기 

이번에는 카테고리를 상태로 관리하는 것이 아닌 파라미터로 관리를 해보자.  
src/index.js
```jsx
//...
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
//...
```
src/App.js. 
여기서 path에 존재하는 ?는 선택적이라는 의미이다.
```jsx
import {Route} from 'react-router-dom';
import NewsPage from "./pages/NewsPage";

function App() {
  return (
    <Route path='/:category?' component={NewsPage}/>
  )
}

export default App;

```
src/pages/NewsPage.js
```jsx
import {useParams} from "react-router-dom";

import Categories from "../components/Categories";
import NewsList from "../components/NewsList";

const NewsPage = () => {
  const {category} = useParams();

  return (
    <>
      <Categories />
      <NewsList category={category || 'all'}/>
    </>
  )
}

export default NewsPage;
```
src/components/Categories.js
```jsx
import styled from "styled-components";

import categories from "../lib/categories";
import {NavLink} from "react-router-dom";

const CategoriesBlock = styled.div`
  //...
`;

const Category = styled(NavLink)`
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
  
 &.active {
   font-weight: 600;
   border-bottom: 2px solid #22b8cf;
   color: #22b8cf;
   &:hover {
     color: #3bc9db;
   }
 } 
`;

const Categories = () => {
  return (
    <CategoriesBlock>
      {categories.map(({name, text}) => (
        <Category
          key={name}
          activeClassName="active"
          //전체보기의 path가 /이므로 exact를 true로
          //해야 한다. 적용하지 않으면 다른 카테고리 선택시에도
          //전체링크가 선택된거 처럼 보인다.
          exact={name === 'all'}
          to={name === 'all' ? '/' : `/${name}`}
        >
          {text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;
```
### 14.8 usePromise custom hook 만들기 

내용 placeholder

### 14.9 정리 

내용 placeholder

## recoil 

### 주요 개념 

내용 placeholder

### 설치

내용 placeholder

### Recoil 시작하기

내용 placeholder

### 도입부

내용 placeholder

### Atoms

내용 placeholder

### Selectors 

내용 placeholder

---

질문, 이해가 안 갔던 것, 궁금한 것, 스터디장이나 다른 사람들에게 물어보고 싶은 것, 기타 등등이 있으시면 써주시고, 이 문구는 지워주세요!
