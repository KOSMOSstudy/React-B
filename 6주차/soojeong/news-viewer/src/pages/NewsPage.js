import React from 'react';
import Categories from '../Components/Categories';
import NewsList from '../Components/NewsList';

const NewsPage = ({match}) => {
    //카테고리가 선택되지 않았다면 기본값 all로 사용
    const category = match.params.category || 'all';

    return (
        <>
            <Categories />
            <NewsList category={category} />
        </>
    );
};

export default NewsPage;