import React, {FunctionComponent, useCallback} from "react";
import {Observer} from 'mobx-react';
import styled from "styled-components";

import indexStore, {IndexStore} from "../store/indexStore";

const ListInput = styled.input`
  height: 65px;
  width: 588px;
  background-color: black;
  color: white;
  font-size: 20px;
  caret-color: white;
  padding: 0;
  border: 0;
`;

const InputList: FunctionComponent = () => {
    const {TodoList} = indexStore() as IndexStore;

    const handleChange = useCallback(({target: {value}}: {target: {value: string}}): void => {
        TodoList.setCurrData(value);
    }, [TodoList]);

    return (
        <Observer>
            {() => <ListInput
                type='text'
                onChange={handleChange}
            />}
        </Observer>
    );
}

export default InputList;