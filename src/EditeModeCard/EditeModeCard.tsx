import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import PlusSign from "../Assets/PlusSign.svg";

type CheckBoxProps = {
  clickedBox: number;
};

export enum Priority {
  low = 1,
  medium = 2,
  max = 3,
}

export const priorityColorCodes = {
  low: "#82FFDD",
  medium: "#EBE700",
  max: "#FF8787",
};

const hintAnimation = keyframes`
  from {
  opacity: 0;
  }

  to {
  opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  margin-bottom: 20px;
  width: 60%;
  height: auto;
  border-radius: 5px;
  background-color: #cafff5;
  box-shadow: 0px 6px 3px 3px #b1e5ff;
  animation: ${hintAnimation} 0.3s ${(props) => props.theme.animationTiming};
`;

const Input = styled.input`
  width: auto;
  border: none;
  border-radius: 2px;
  border-bottom: 2px solid #a4e2ff;
  outline: none;
  margin-top: 20px;
  background-color: transparent;
`;

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  min-height: 28px;
  width: 80px;
  margin-top: 14px;
  border-radius: 2px;
  background-color: #fcfcfc;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
`;

const Close = styled.div`
  background: url(${PlusSign});
  display: flex;
  align-self: flex-end;
  width: 15px;
  height: 15px;
  background-size: 100% 100%;
  margin-right: 15px;
  transform: rotate(45deg);
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 15px;
  color: #828282;
  margin-top: 5px;
`;

const Description = styled.div`
  font-size: 11px;
  color: #828282;
  margin-top: 5px;
`;

const PriorityContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-around;
`;

const CheckBox = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 2px;
  margin-left: 5px;
  margin-top: 10px;
`;

const LowPriority = styled(CheckBox) <CheckBoxProps>`
  background-color: ${(props) =>
    props.clickedBox === Priority.low ? priorityColorCodes.low : "#fff"};
`;

const MediumPriority = styled(CheckBox) <CheckBoxProps>`
  background-color: ${(props) =>
    props.clickedBox === Priority.medium ? priorityColorCodes.medium : "#fff"};
`;

const HighPriority = styled(CheckBox) <CheckBoxProps>`
  background-color: ${(props) =>
    props.clickedBox === Priority.max ? priorityColorCodes.max : "#fff"};
`;

const CheckBoxItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  handleChange: (e: any) => void;
  addButtonPressed: () => void;
  closeButtonPressed: () => void;
  checkBoxTypeHandler?: (type: number) => void;
  checkBox?: number;
};

const EditModeCard = (props: Props) => {
  const {
    handleChange,
    addButtonPressed,
    closeButtonPressed,
    checkBoxTypeHandler,
    checkBox = 0,
  } = props;
  const [checkBoxType, setCheckBox] = useState(checkBox);

  const typeHandler = (type: number) => {
    setCheckBox(type);
    checkBoxTypeHandler && checkBoxTypeHandler(type);
  };

  const title = checkBoxTypeHandler ? `input task` : `input section`;
  const buttonTitle = checkBoxTypeHandler ? `Add Task` : `Add Section`;

  return (
    <Container>
      <Close onClick={closeButtonPressed} />
      <Title>{title}</Title>
      <Input type="text" onChange={(e) => handleChange(e)} />
      {checkBoxTypeHandler &&
        <>
          <Title>select priority</Title>
          <PriorityContainer>
            <CheckBoxItem>
              <LowPriority
                onClick={() => typeHandler(Priority.low)}
                clickedBox={checkBoxType}
              />
              <Description>low priority</Description>
            </CheckBoxItem>
            <CheckBoxItem>
              <MediumPriority
                onClick={() => typeHandler(Priority.medium)}
                clickedBox={checkBoxType}
              />
              <Description>medium priority</Description>
            </CheckBoxItem>
            <CheckBoxItem>
              <HighPriority
                onClick={() => typeHandler(Priority.max)}
                clickedBox={checkBoxType}
              />
              <Description>high priority</Description>
            </CheckBoxItem>
          </PriorityContainer>
        </>}
      <AddButton onClick={addButtonPressed}>{buttonTitle}</AddButton>
    </Container>
  );
};

export default EditModeCard;
