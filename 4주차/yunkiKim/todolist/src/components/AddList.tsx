import {useObserver} from 'mobx-react';
import {FunctionComponent, useCallback} from "react";
import styled from "styled-components";

import indexStore, {IndexStore} from "../store/indexStore";

const AddListBox = styled.button`
  height: 65px;
  width: 70px;
  background-color: #C4C4C4;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  padding: 0;
`;

const AddListIcon = styled.img``;

const AddList: FunctionComponent = () => {
    const {TodoList} = indexStore() as IndexStore;

    const handleClick = useCallback(() => {
        TodoList.setList();
    }, []);

    return useObserver(() => (
        <AddListBox onClick={handleClick}>
            <AddListIcon src='/addList.svg' alt='add list button'/>
        </AddListBox>
    ));
}

export default AddList;