import React from "react";
import styled, { keyframes } from "styled-components";

import CloseSign from "../Assets/CloseSign.svg";

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
  margin-bottom: 20px;
  width: 100%;
  height: 150px;
  border-radius: 5px;
  background-color: #cafff5;
  box-shadow: 0px 6px 3px 3px #b1e5ff;
  animation: ${hintAnimation} 0.3s ${(props) => props.theme.animationTiming};
`;

const Input = styled.input`
  width: 300px;
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
  background: url(${CloseSign});
  display: flex;
  align-self: flex-end;
  width: 15px;
  height: 15px;
  background-size: 100% 100%;
  margin-right: 15px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 15px;
  color: #828282;
`;

type Props = {
  handleChange: (e: any) => void;
  addButtonPressed: () => void;
  closeButtonPressed: () => void;
};

const EditModeCard = (props: Props) => {
  const { handleChange, addButtonPressed, closeButtonPressed } = props;

  return (
    <Container>
      <Close onClick={closeButtonPressed} />
      <Title>input task</Title>
      <Input type="text" onChange={(e) => handleChange(e)} />
      <AddButton onClick={addButtonPressed}>Add Task</AddButton>
    </Container>
  );
};

export default EditModeCard;
