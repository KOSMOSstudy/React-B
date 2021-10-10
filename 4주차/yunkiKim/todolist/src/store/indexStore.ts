import TodoList from "./toDoList";
import {TodoListType} from "../lib/type/todoList";

export type IndexStore = {
    TodoList: TodoListType,
}

const indexStore = (): IndexStore => ({
    TodoList,
});

export default indexStore;