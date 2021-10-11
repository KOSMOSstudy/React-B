import {FunctionComponent} from "react";
import styled, {css} from "styled-components";
import {Observer} from 'mobx-react';

import CheckBox from "./CheckBox";
import indexStore, {IndexStore} from '../store/indexStore';

const ShowListBox = styled.section`
  height: 334px;
  width: 657px;
  background-color: white;
`;

const ListBox = styled.div`
  height: 57px;
  width: 657px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
`;

const ListData = styled.p<{done: boolean}>`
  width: 428px;
  font-size: 20px;
  position: relative;
  left: 77px;
  overflow: hidden;
  
  ${({done}) => done && css`
    color: #7c7b7b;
    text-decoration: line-through;
  `}
`;

const DeleteButton = styled.button`
  padding: 0;
  border: 0;
  background-color: white;
  position: relative;
  left: 150px;
`;

const DeleteIcon = styled.img`
  height: 30px;
  width: 30px;
`;

const ShowLists: FunctionComponent = () => {
    const {TodoList} = indexStore() as IndexStore;

    const handleClick = ({target: {name}}: {target: {name: string}}) => {
        console.log(name);
        TodoList.setDone(Number(name));
    }

    return (
        <Observer>
            {
                () => (
                    <ShowListBox>
                        {TodoList.lists.map(({id, data, done}) => (
                            <ListBox key={id}>
                                <label>
                                    <CheckBox
                                        checked={done}
                                        todoId={id}
                                        onClick={handleClick}
                                    />
                                </label>
                                <ListData done={done}>{data}</ListData>
                                <DeleteButton>
                                    <DeleteIcon src='/deleteList.svg' alt='delete list button'/>
                                </DeleteButton>
                            </ListBox>
                        ))}
                    </ShowListBox>
                )
            }
        </Observer>
    );
}

export default ShowLists;