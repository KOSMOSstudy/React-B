import styled from "styled-components";

const AddListBox = styled.div`
  height: 65px;
  width: 70px;
  background-color: #C4C4C4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddListIcon = styled.img``;

const AddList = () => {
    return (
        <AddListBox>
            <AddListIcon src='/addList.svg' alt='add list button'/>
        </AddListBox>
    )
}

export default AddList;