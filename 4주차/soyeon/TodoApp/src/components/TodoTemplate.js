// 화면 가운데 정렬, 앱 타이틀을 보여줌
// children으로 내부 jsx를 props로 받아 와서 렌더링
import React from 'react';
import './TodoTemplate.scss';

const TodoTemplate = ({children}) => {
  return(
    <div className="TodoTemplate">
      <div className="app-title">일정 관리</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default TodoTemplate;