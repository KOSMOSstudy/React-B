import {useState} from 'react';
import {useSetRecoilState} from "recoil";

import {todoListState} from "../store/todoList";
import {getTodoItem} from "../lib/todoItem";

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((prevTodoList) => [
      ...prevTodoList,
      getTodoItem(inputValue),
    ]);
    setInputValue('');
  };

  const handleChange = ({target: {value}}) => {
    setInputValue(value);
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      <button onClick={addItem}>Add</button>
    </div>
  )
}

export default TodoItemCreator;