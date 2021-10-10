export interface List {
    id: number,
    data: string,
}

export type TodoListType = {
    lists: List[];
    id: number;
    currData: string;
    setList(): void;
    setCurrData(currData: string): void;
}
