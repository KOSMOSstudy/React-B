import styled from 'styled-components';

const TodoListBox = styled.section`
  height: 483px;
  width: 657px;
  background-color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


const TodoList = () => {
    return (
        <TodoListBox />
    )
}

export default TodoList;