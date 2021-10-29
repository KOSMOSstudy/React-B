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
