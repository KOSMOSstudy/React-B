import styled from "styled-components";

import AddList from "./AddList";
import InputList from "./InputList";
import {FunctionComponent} from "react";

const WriteListBox = styled.section`
  height: 65px;
  width: 657px;
  display: flex;
`;

const WriteList: FunctionComponent = () => {
    return (
        <WriteListBox>
            <InputList />
            <AddList />
        </WriteListBox>
    );
}

export default WriteList;