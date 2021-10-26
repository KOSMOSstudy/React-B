import React from 'react';
import WithRouterSample from './WithRouterSample';
import { withRouter } from 'react-router-dom';


const data = {
  velopert: {
    name: '김민준',
    description: '리액트를 좋아하는 개발자'
  },
  gildong: {
    name: '홍길동',
    description: '고전 소설 홍길동전의 주인공'
  }
};

//URL 파라미터를 사용할 때는 라우트로 
//사용되는 컴포넌트에서 받아 오는 match라는 객체 안의 params 값을 참조합니다

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = data[username];
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
      <WithRouterSample />
    </div>
  );
};



export default withRouter(Profile);