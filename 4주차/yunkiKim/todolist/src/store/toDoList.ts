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
        });
    },

    setCurrData(currData: string): void {
        this.currData = currData;
        console.log(this.currData);
    }

});

export default TodoList;