import React, {useState, useRef, useCallback} from 'react';
import TodoTemplate from './Components/TodoTemplates';
import TodoInsert from './Components/TodoInsert';
import TodoList from './Components/TodoList';

const App = () => {
  //TodoList의 props로 전달될 배열
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링 해보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어보기',
      checked: false,
    }
  ]);

  //고윳값으로 사용될 id
  //ref를 사용해서 변수를 담기
  //props로 전달해야 할 함수를 만들 때는 useCallback을 사용하여 함수감싸는 것을 습관화해라 !!!!
  //이때, Ref를 사용하는 이유는? -> id 값은 렌더링되는 정보가 아니기 때문
  const nextId = useRef(4);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos(todos.concat(todo));
    nextId.current += 1;
    },
    [todos],
  );

  //배열의 불변성을 지키면서 배열 원소를 제거해야 할 경우, 배열 내장 함수인 filter를 사용하면 간편
  //filter 함수에는 조건을 확인해주는 함수를 파라미터로 넣어야한다
  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
     [todos],
  );

  //수정기능 함수
  const onToggle = useCallback(
    id => {
      setTodos(todos.map(todo =>
        todo.id === id ? {...todo, checked: !todo.checked} : todo,
        ),
      );
    },
    [todos],
  )

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
};

export default App;
