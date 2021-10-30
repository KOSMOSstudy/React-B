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