import {atom, selector} from "recoil";

import {FilterItemType} from "../lib/todoItem";

export const todoListState = atom({
  key: 'todoListTodoListState',
  default: [],
});

export const todoListFilterState = atom({
  key: 'todoListTodoListFilterState',
  default: `${FilterItemType.all}`,
});

export const filteredTodoListState = selector({
  key: 'todoListFilteredTodoListState',
  get: (({get}) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case `${FilterItemType.completed}`:
        return list.filter((item) => item.isComplete);
      case `${FilterItemType.uncompleted}`:
        return list.filter((item) => !item.isComplete);
      case `${FilterItemType.all}`:
        return list;
      default:
        return new Error('invalid FilterItemType');
    }
  })
});

export const todoListStatsState = selector({
  key: 'todoListTodoListStatsState',
  get: ({get}) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
})