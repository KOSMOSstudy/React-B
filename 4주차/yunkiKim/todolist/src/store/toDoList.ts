import {observable} from "mobx";

import {List} from "../lib/type/todoList";


const TodoList = observable({
    lists: [] as Array<List>,
    id: 0,
    currData: '',

    setList(): void {
        this.lists = (this.lists as List[]).concat({
            id: this.id++,
            data: this.currData,
            done: false,
        });
    },

    setCurrData(currData: string): void {
        this.currData = currData;
    },

    setDone(todoId: number): void {
        this.lists = this.lists.map((list) => (
            list.id === todoId ? ({...list, done: !list.done}) : list
        ));
    },

    deleteList(todoId: number): void {
        this.lists = this.lists.filter(({id}) => todoId !== id);
    }

});

export default TodoList;