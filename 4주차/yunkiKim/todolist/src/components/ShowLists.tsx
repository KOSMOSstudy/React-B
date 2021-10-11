import {useState} from "react";
import styled from "styled-components";
import {FunctionComponent} from "react";
import CheckBox from "./CheckBox";

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

// const CheckBox = styled.input`
//   height: 24px;
//   width: 24px;
//   position: relative;
//   left: 28px;
//   background-color: red;
// `;

const List = styled.p`
  font-size: 20px;
  position: relative;
  left: 77px;
`;

const DeleteButton = styled.button`
  padding: 0;
  border: 0;
  background-color: white;
  position: relative;
  left: 510px;
`;

const DeleteIcon = styled.img`
  height: 30px;
  width: 30px;
`;

const ShowLists: FunctionComponent = () => {
    const [checked, setChecked] = useState(false);

    const handleClick = () => {
        console.log(1);
        setChecked(!checked);
    }

    return (
        <ShowListBox>
            <ListBox>
                <label>
                    <CheckBox checked={checked} onClick={handleClick} />
                </label>
                <List>todo1</List>
                <DeleteButton>
                    <DeleteIcon src='/deleteList.svg' alt='delete list button'/>
                </DeleteButton>
            </ListBox>
        </ShowListBox>
    );
}

export default ShowLists;