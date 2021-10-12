import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({todos, onRemove, onToggle}) => {
    return (
        <div className="TodoList">
            {todos.map(todo => (
                //각 항목마다 가지고 있는 고윳값을 id로, 여러 종류의 값을 전달해야 하는 경우 객체 통째로 전달이 편함
                <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/>
            ))}
        </div>
    );
};

export default TodoList;