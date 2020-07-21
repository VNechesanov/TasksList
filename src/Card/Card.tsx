import React, { useContext } from "react";
import styled from "styled-components";

import CloseSign from "../Assets/CloseSign.svg";
import { CardsContext, CardType } from "../Layout/Layout";

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

type Props = {
  id: string;
  taskTitle: string;
  onRemoveClick: (filteredCards: CardType[]) => void;
};

const Card = (props: Props) => {
  const { id, taskTitle, onRemoveClick } = props;
  const { cardsArray } = useContext(CardsContext);

  const remobeButtonClick = () => {
    const copiedArray = [...(cardsArray as CardType[])];
    const filteredArray = copiedArray.filter((c) => c.id !== id);

    onRemoveClick(filteredArray);
  };

  return (
    <Container>
      <Close onClick={() => remobeButtonClick()} />
      <TaskTitle>{taskTitle}</TaskTitle>
    </Container>
  );
};

export default Card;
