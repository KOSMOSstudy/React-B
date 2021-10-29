import {useState} from "react";

import {Api} from "./lib/custormAxios";
import {ServerPath} from "./lib/path";
import NewsItem from "./components/NewsItem";
import NewsList from "./components/NewsList";

function App() {
  return (
    <NewsList></NewsList>
  );
  // const [data, setData] = useState(null);
  //
  // const handleClick = () => {
  //   Api({
  //     method: 'GET',
  //     url: `${process.env.REACT_APP_API_ORIGIN}${ServerPath.getNews}`,
  //     params: {
  //       country: `${process.env.REACT_APP_API_COUNTRY}`,
  //       apiKey: `${process.env.REACT_APP_API_KEY}`,
  //     }
  //   })
  //     .then(({data}) => {
  //       setData(data);
  //     })
  //     .catch(err => err);
  // }
  //
  // return (
  //   <div>
  //     <div>
  //       <button onClick={handleClick}>불러오기</button>
  //     </div>
  //     {data && <textarea rows="7" value={JSON.stringify(data, null, 2)} readOnly />}
  //   </div>
  // );
}

export default App;
