function getId() {
  let id = 0;
  return () => id++;
}

const id = getId();

export const getTodoItem = (inputValue) => ({
  id: id(),
  text: inputValue,
  isComplete: false,
});

export const replaceItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export const removeItemAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export const ModifyType = {
  editList: 'edit',
  checkDone: 'done',
};
Object.freeze(ModifyType);

export const FilterItemType = {
  all: 'Show All',
  completed: 'Show Completed',
  uncompleted: 'Show uncompleted'
}