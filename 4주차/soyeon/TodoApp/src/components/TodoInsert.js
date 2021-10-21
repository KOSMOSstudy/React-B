// 새로운 항목을 입력하고 추가
// state를 통해 input의 상태를 관리
import React, { useCallback, useState } from 'react';
import {MdAdd} from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({onInsert}) => {

  const [value, setValue] = useState('');

  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    e => {
      onInsert(value);
      setValue(''); // value값 초기화

      // submit 새로고침 방지
      e.preventDefault();
    },
    [onInsert, value],
  );

  return(
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input 
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}/>
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;