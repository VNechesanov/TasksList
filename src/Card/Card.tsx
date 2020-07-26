import React, { useContext } from "react";
import styled from "styled-components";

import PlusSign from "../Assets/PlusSign.svg";
import { CardsContext, CardItem } from "../Layout/Layout";
import { Priority, priorityColorCodes } from "../EditeModeCard/EditeModeCard";
import { saveCardsToLocalStorage } from "../store";

type MarkerColor = {
  color: string;
};

type FinishedTask = {
  isMarkerChecked: boolean;
}

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
  background: url(${PlusSign});
  display: flex;
  align-self: flex-end;
  width: 15px;
  height: 15px;
  background-size: 100% 100%;
  margin-right: 15px;
  margin-top: 15px;
  transform: rotate(45deg);
  cursor: pointer;
`;

const TaskTitle = styled.div<FinishedTask>`
  display: flex;
  justify-content: center;
  font-size: 25px;
  color: #005c65;
  opacity: ${(props) => props.isMarkerChecked ? 0.2 : 1};
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

const CheckMarker = styled.div`
  align-self: center;
  margin-top: 11px;
  margin-left: 15px;
`;

export type CardProps = {
  id: string;
  taskTitle: string;
  onRemoveClick: (filteredCards: CardItem[]) => void;
  isFinished: boolean;
  isMarkerChecked: (index: number, item: CardItem) => void;
  priority: number;
};

const Card = (props: CardProps) => {
  const { id, taskTitle, onRemoveClick, isFinished, isMarkerChecked, priority } = props;
  const { cardsArray } = useContext(CardsContext);

  const newCardsArr = [...cardsArray];
  let index: number = 0;

  const handleMarkerClick = () => {
    const foundItem = newCardsArr.find(n => n.id === id);
    index = newCardsArr.indexOf(foundItem as CardItem);
    newCardsArr[index].isFinished = !newCardsArr[index].isFinished;

    saveCardsToLocalStorage(newCardsArr);
    isMarkerChecked(index, newCardsArr[index]);
  }

  saveCardsToLocalStorage(newCardsArr);

  const removeButtonClick = () => {
    const copiedArray = [...(cardsArray as CardItem[])];
    const filteredArray = copiedArray.filter((c) => c.id !== id);
    if (cardsArray.length === 1) {
      saveCardsToLocalStorage([]);
    }
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

  const checkMarker =
    <svg width="25" height="25" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0.5"
        y="0.5"
        width="11"
        height="11"
        rx="1.5"
        fill={isFinished ? getMarkerColor() : 'none'}
        stroke={getMarkerColor()}
        strokeLinejoin="round"
      />

      {isFinished && <path d="M3 6L5.18182 8L9 4" stroke="#fff" />}
    </svg>

  return (
    <Container >
      <PriorityMarker color={getMarkerColor()} />
      <CheckMarker
        onClick={() => handleMarkerClick()}
      >
        {checkMarker}
      </CheckMarker>
      <LocalWrapper>
        <Close onClick={() => removeButtonClick()} />
        <TaskTitle isMarkerChecked={isFinished}>{taskTitle}</TaskTitle>
      </LocalWrapper>
    </Container>
  );
};

export default Card;
