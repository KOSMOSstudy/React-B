// API를 요청하고 뉴스 데이터가 들어 있는 배열을 컴포넌트 배열로 변환해 렌더링
import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

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

const NewsList = ({ category }) => {

  // const [articles, setArticles] = useState(null);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   //async를 사용하는 함수 따로 선언
  //   const fetchData = async() => {
  //     // 요청 중 loading -> true
  //     setLoading(true);
  //     try{
  //       const query = category === 'all' ? '' : `&category=${category}`;
  //       const response = await axios.get(
  //         `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=f5f4c537bfaa495ebcf98d1dd590b20c`,
  //       );
  //       setArticles(response.data.articles);
  //     }catch(e){
  //       console.log(e);
  //     }
  //     // 요청이 끝나면 loading -> false
  //     setLoading(false);
  //   };
  //   fetchData();
  // },[category]);

  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
        `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=f5f4c537bfaa495ebcf98d1dd590b20c`,
    );
  }, [category]);

  // 대기 중일 때 
  if(loading){
    return <NewsListBlock>대기 중...</NewsListBlock>
  }

  // 아직 response 값이 설정되지 않았을 떄
  if(!response){
    return null;
  }

  if(error){
    return <NewsListBlock>에러 발생!</NewsListBlock>
  }

  // response 값이 유효할 때
  const { articles } = response.data;

  return(
    <NewsListBlock>
      {articles.map(article => (
        <NewsItem key={article.url} article={article} />
      ))}  
    </NewsListBlock>
  );
};

export default NewsList;