import React, { useState } from "react";
import styled from "styled-components";
import _uniqueId from "lodash/uniqueId";

import Card from "../Card/Card";
import PlusSign from "../Assets/PlusSign.svg";

export type CardType = {
  id: string;
  card: JSX.Element;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  margin: 0;
  width: 500px;
  min-height: 130px;
  border-radius: 5px;
  background-color: #ddfaff;
  box-shadow: 0px 8px 3px -2px #018aa0;
`;

const Add = styled.div`
  background: url(${PlusSign});
  width: 15px;
  height: 15px;
  background-size: 100% 100%;
  margin-bottom: 15px;
`;

export const CardsContext = React.createContext<{
  cardsArray: CardType[];
}>({ cardsArray: [] });

const Layout = () => {
  const [cards, setCard] = useState([] as CardType[]);

  const onRemoveClick = (filteredCards: CardType[]) => {
    setCard(filteredCards);
  };

  const addClicked = () => {
    const id: string = _uniqueId();

    setCard(
      cards.concat({
        id,
        card: <Card id={id} onRemoveClick={onRemoveClick} />,
      })
    );
  };

  const renderCards = () => {
    return cards.map((item) => {
      return item.card;
    });
  };

  return (
    <CardsContext.Provider value={{ cardsArray: cards }}>
      <Container>
        <Add onClick={() => addClicked()} />
        {renderCards()}
      </Container>
    </CardsContext.Provider>
  );
};

export default Layout;
