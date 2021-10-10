import styled from "styled-components";

import AddList from "./AddList";
import InputList from "./InputList";

const WriteListBox = styled.section`
  height: 65px;
  width: 657px;
  display: flex;
`;

const WriteList = () => {
    return (
        <WriteListBox>
            <InputList />
            <AddList />
        </WriteListBox>
    );
}

export default WriteList;