import styled from "styled-components";

const HeaderBox = styled.header`
  height: 93px;
  width: 657px;
  background-color: #26ACB5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderTitle = styled.h3`
  font-size: 40px;
  color: white;
  font-weight: normal;
`;

const Header = () => {
    return (
        <HeaderBox>
            <HeaderTitle>일정 관리</HeaderTitle>
        </HeaderBox>
    )
}

export default Header;