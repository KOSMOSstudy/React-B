import {useRecoilValue} from "recoil";

import {filteredTodoListState} from "../store/todoList";
import TodoItemCreator from "../components/TodoItemCreator";
import TodoItem from "../components/TodoItem";
import TodoListFilter from "../components/TodoListFilter";
import TodoListStats from "../components/TodoListStats";

const TodoList = () => {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      <TodoItemCreator />
      <TodoListFilter />
      <TodoListStats />

      {todoList.map(todoItem => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  )
}

export default TodoList;