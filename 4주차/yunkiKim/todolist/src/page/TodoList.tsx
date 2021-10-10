import styled from 'styled-components';

import Header from "../components/Header";
import WriteList from "../components/WriteList";
import ShowLists from "../components/ShowLists";
import {FunctionComponent} from "react";

const TodoListBox = styled.section`
  height: 483px;
  width: 657px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


const TodoList: FunctionComponent = () => {
    return (
        <TodoListBox>
            <Header />
            <WriteList />
            <ShowLists />
        </TodoListBox>
    )
}

export default TodoList;