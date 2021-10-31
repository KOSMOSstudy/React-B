import {useRecoilState} from "recoil";
import PropTypes from 'prop-types';

import {todoListState} from "../store/todoList";
import {ModifyType, removeItemAtIndex, replaceItemAtIndex} from "../lib/todoItem";

const TodoItem = ({item}) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const handleChange = ({target: {value, name}}) => {
    let newList;
    switch (name) {
      case ModifyType.editList:
        newList = replaceItemAtIndex(todoList, index, {
          ...item,
          text: value,
        });
        break;
      case ModifyType.checkDone:
        newList = replaceItemAtIndex(todoList, index, {
          ...item,
          isComplete: !item.isComplete,
        });
        break;
      default:
        throw new Error('invalid ModifyType');
    }

    setTodoList(newList);
  }

  const handleClick = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  }

  return (
    <div>
      <input
        type="text"
        name={ModifyType.editList}
        value={item.text}
        onChange={handleChange}
      />
      <input
        type="checkbox"
        name={ModifyType.checkDone}
        checked={item.isComplete}
        onChange={handleChange}
      />
      <button onClick={handleClick}>X</button>
    </div>
  )

}

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    isComplete: PropTypes.bool,
  }).isRequired,
};

export default TodoItem;