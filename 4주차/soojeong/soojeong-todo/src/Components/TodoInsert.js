import React, { useState, useCallback } from 'react';
import './TodoInsert.scss';
import { MdArrowRightAlt } from 'react-icons/md';

const TodoInsert = ({onInsert}) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    //onClick - onSubmit 차이 : onSubmit 이벤트는 인풋에서 엔터를 누를 시에도 이벤트 발생
    const onSubmit = useCallback(
        e => {
            onInsert(value);
            setValue(''); //value값 초기화하기

            //submit 이벤트는 새로고침을 발생시킴->이를 방지하기 위해 함수호출
            e.preventDefault();
        },
        [onInsert, value],
    );


    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input 
                placeholder="할 일을 입력하세요" 
                value = {value}
                onChange={onChange}
            />
            <button type="submit">
                <MdArrowRightAlt />
            </button>
        </form>
    );
};

export default TodoInsert;