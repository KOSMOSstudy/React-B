export interface List {
    id: number,
    data: string,
    done: boolean,
}

export type TodoListType = {
    lists: List[];
    id: number;
    currData: string;
    setList(): void;
    setCurrData(currData: string): void;
    setDone(todoId: number): void;
    deleteList(todoId: number): void;
}
