import React, { useContext } from "react";
import styled from "styled-components";

import CloseSign from "../Assets/CloseSign.svg";
import { CardsContext, CardType } from "../Layout/Layout";
import { Priority, priorityColorCodes } from "../EditeModeCard/EditeModeCard";

type MarkerColor = {
  color: string;
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  margin-bottom: 20px;
  width: 100%;
  height: 80px;
  border-radius: 5px;
  background-color: #f1fdff;
  box-shadow: 0px 6px 3px 3px #b1e5ff;
`;

const Close = styled.div`
  background: url(${CloseSign});
  display: flex;
  align-self: flex-end;
  width: 15px;
  height: 15px;
  background-size: 100% 100%;
  margin-right: 15px;
  margin-top: 15px;
  cursor: pointer;
`;

const TaskTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 25px;
  color: #005c65;
`;

const PriorityMarker = styled.div<MarkerColor>`
  height: 100%;
  width: 10px;
  left: 0;
  border-radius: 5px 0px 0px 5px;
  background-color: ${(props) => props.color};
`;

const LocalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

type Props = {
  id: string;
  taskTitle: string;
  onRemoveClick: (filteredCards: CardType[]) => void;
  priority: number;
};

const Card = (props: Props) => {
  const { id, taskTitle, onRemoveClick, priority } = props;
  const { cardsArray } = useContext(CardsContext);

  const removeButtonClick = () => {
    const copiedArray = [...(cardsArray as CardType[])];
    const filteredArray = copiedArray.filter((c) => c.id !== id);

    onRemoveClick(filteredArray);
  };

  const getMarkerColor = () => {
    switch (priority) {
      case Priority.low:
        return priorityColorCodes.low;
      case Priority.medium:
        return priorityColorCodes.medium;
      case Priority.max:
        return priorityColorCodes.max;

      default:
        return "";
    }
  };

  return (
    <Container>
      <PriorityMarker color={getMarkerColor()} />
      <LocalWrapper>
        <Close onClick={() => removeButtonClick()} />
        <TaskTitle>{taskTitle}</TaskTitle>
      </LocalWrapper>
    </Container>
  );
};

export default Card;
