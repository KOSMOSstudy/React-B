import styled from 'styled-components';

import Header from "../components/Header";
import WriteList from "../components/WriteList";
import ShowLists from "../components/ShowLists";

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
            <ShowLists />
        </TodoListBox>
    )
}

export default TodoList;