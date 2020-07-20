import React, { useContext } from "react";
import styled from "styled-components";

import CloseSign from "../Assets/CloseSign.svg";
import { CardsContext, CardType } from "../Layout/Layout";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0;
  margin-bottom: 20px;
  width: 100%;
  height: 100px;
  border-radius: 2px;
  background-color: #fbfeff;
  box-shadow: 0px 9px 3px -2px #b1e5ff;
`;

const Close = styled.div`
  background: url(${CloseSign});
  width: 15px;
  height: 15px;
  background-size: 100% 100%;
  margin-bottom: 15px;
`;

type Props = {
  id: string;
  onRemoveClick: (filteredCards: CardType[]) => void;
};

const Card = (props: Props) => {
  const { id, onRemoveClick } = props;
  const { cardsArray } = useContext(CardsContext);

  const remobeButtonClick = () => {
    const copied = [...(cardsArray as CardType[])];
    const filtered = copied.filter((c) => c.id !== id);

    onRemoveClick(filtered);
  };

  return (
    <Container>
      {id}
      <Close onClick={() => remobeButtonClick()} />
    </Container>
  );
};

export default Card;
