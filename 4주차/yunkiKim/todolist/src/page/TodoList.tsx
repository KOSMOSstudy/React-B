import styled from 'styled-components';

import Header from "../components/Header";

const TodoListBox = styled.section`
  height: 483px;
  width: 657px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


const TodoList = () => {
    return (
        <TodoListBox>
            <Header />
        </TodoListBox>
    )
}

export default TodoList;