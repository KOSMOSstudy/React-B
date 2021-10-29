import styled from "styled-components";

const NewsLink = styled.a.attrs({target: "_blank", rel: "noopener noreferrer"})`
  color: black;
`;

const NewsItemBlock = styled.div`
  display: flex;
  
  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 160px;
      height: 100px;
      object-fit: cover;
    }
  }
  
  .contents {
    h2 {
      margin: 0;
    }
    
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }
  
  & + & {
    margin-top: 3rem;
  }
`;

const NewsItem = ({article}) => {
  const {title, description, url, urlToImage} = article;

  return (
    <NewsItemBlock>
      {
        urlToImage && (
          <div className="thumbnail">
            <NewsLink href={url}>
              <img src={urlToImage} alt={`${title} thumbnail`}/>
            </NewsLink>
          </div>
        )
      }
      <div className="contents">
        <h2>
          <NewsLink href={url}>
            {title}
          </NewsLink>
        </h2>
        <p>{description}</p>
      </div>
    </NewsItemBlock>
  );
}

export default NewsItem;