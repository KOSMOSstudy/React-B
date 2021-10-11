import styled, {css} from "styled-components";
import {FunctionComponent} from "react";

const CheckBoxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  left: 28px;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const HiddenCheckBox = styled.input.attrs({type: 'checkbox'})`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const CustomCheckBox = styled.div<{checked: boolean}>`
  display: inline-block;
  height: 24px;
  width: 24px;
  border: 2px solid black;
  background: white;
  ${({checked}) => checked && css`background: #26ACB5`};

  ${Icon} {
    visibility: ${({checked}) => (checked ? 'visible' : 'hidden')}
  }
`;

const CheckBox: FunctionComponent<{checked: boolean, onClick: any}> = ({checked, ...props}) => {
  return (
      <CheckBoxContainer>
        <HiddenCheckBox {...props} />
        <CustomCheckBox checked={checked}>
          <Icon viewBox='0 0 24 24'>
              <polyline points='15 7 9 17 5 12'/>
          </Icon>
        </CustomCheckBox>
      </CheckBoxContainer>
  )
}

export default CheckBox;