// todo 배열을 props로 받아 온 후, 이를 배열 내장 함수 map을 이용해 여러개의 TodoListItem 컴포넌트로 변환해 보여줌
import React, { useCallback } from 'react';
import {List} from 'react-virtualized';
import TodoListItem from './TodoListIetm';
import './TodoList.scss';

const TodoList = ({todos, onRemove, onToggle}) => {
  const rowRenderer= useCallback(
    ({index, key, style}) => {
      const todo = todos[index];
      return(
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos],
  );

  return(
    <List
      className="TodoList"
      width={512} // 전체 크기
      height={513} // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos}
      style={{outline: 'none'}} // List에 기본 적용되는 outline 스타일 제거
    />
  );
};

export default React.memo(TodoList);