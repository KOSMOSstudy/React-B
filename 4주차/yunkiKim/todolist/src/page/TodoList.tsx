import styled from 'styled-components';

import Header from "../components/Header";
import WriteList from "../components/WriteList";

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
            <WriteList />
        </TodoListBox>
    )
}

export default TodoList;