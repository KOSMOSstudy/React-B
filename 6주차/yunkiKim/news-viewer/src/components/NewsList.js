import styled from "styled-components";
import PropTypes from 'prop-types';

import {Api} from "../lib/custormAxios";
import NewsItem from "./NewsItem";
import {ServerPath} from "../lib/path";
import usePromise from "../lib/usePromise";

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

const NewsList = ({category}) => {
  const [loading, response, error] = usePromise(() => {
    return Api({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ORIGIN}${ServerPath.getNews}`,
      params: {
        country: `${process.env.REACT_APP_API_COUNTRY}`,
        category: `${category === 'all' ? '' : category}`,
        apiKey: `${process.env.REACT_APP_API_KEY}`,
      }
    })
      .then(res => res)
      .catch(err => err);
  }, [category]);


  if(loading) {
    return <NewsListBlock>로딩 중...</NewsListBlock>
  }

  if(!response) {
    return null;
  }

  if(error) {
    return <NewsListBlock>에러 발생</NewsListBlock>
  }

  const {data: {articles}} = response;
  return (
    <NewsListBlock>
      {articles && articles.map(articles => (
        <NewsItem key={articles.url} article={articles} />
      ))}
    </NewsListBlock>
  )
}

NewsList.propTypes = {
  category: PropTypes.string.isRequired,
}

export default NewsList;