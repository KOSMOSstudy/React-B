import {useRecoilState} from "recoil";
import {todoListFilterState} from "../store/todoList";
import {FilterItemType} from "../lib/todoItem";

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const handleChange = ({target: {value}}) => {
    setFilter(value);
  }

  return (
    <>
      Filter:
      <select value={filter} onChange={handleChange}>
        <option value={FilterItemType.all}>All</option>
        <option value={FilterItemType.completed}>Completed</option>
        <option value={FilterItemType.uncompleted}>UnCompleted</option>
      </select>
    </>
  )
}

export default TodoListFilters;