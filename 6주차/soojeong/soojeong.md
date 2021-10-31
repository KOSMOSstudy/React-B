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
