import styled from "styled-components";
import PropTypes from 'prop-types';
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

const NewsList = ({category}) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

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

  if(loading) {
    return <NewsListBlock>로딩 중...</NewsListBlock>
  }

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