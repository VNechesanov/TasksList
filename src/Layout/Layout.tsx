import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _uniqueId from "lodash/uniqueId";
import _isEqual from "lodash/isEqual";

import Card from "../Card/Card";
import EditModeCard from "../EditeModeCard/EditeModeCard";
import BaseContainer from "../BaseContainer/BaseContainer";
import TabBar from "../TabBar/TabBar";
import { getCardsfromLocalStorage } from "../store";

export type CardItem = {
  id: string;
  taskTitle: string;
  priority: number;
  isFinished: boolean;
};

const Stub = styled.div`
  display: flex;
  justify-content: center;
  font-size: 65px;
  color: #005c65;
  height: 100%;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Title = styled.div`
  width: 50%; 
  left: 0;
  font-size: 17px;
  line-height: 15px;
  margin-left: 42px;
  color: #005c65;
`;

const CardsArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;

type Props = {
  storageKey: string;
  title: string;
}

const Layout = (props: Props) => {
  const { storageKey, title } = props;
  const [isEditModeOpen, setEditModeState] = useState(false);
  const [cardsProps, setCardProps] = useState([] as CardItem[]);
  const [taskTitle, setTaskText] = useState("");
  const [priority, setPriority] = useState(0);
  const [storeId, setId] = useState(storageKey);

  const handleChange = (e: any) => {
    setTaskText(e.target.value);
  };

  const checkBoxTypeHandler = (type: number) => {
    setPriority(type);
  };

  const addButtonPressed = () => {
    setEditModeState(false);
    const id: string = _uniqueId();

    setCardProps(
      cardsProps.concat({
        id,
        taskTitle,
        priority,
        isFinished: false
      })
    );
  };

  const editModeCloseButtonPressed = () => {
    setEditModeState(false);
  };

  const onRemoveClick = (filteredCards: CardItem[]) => {
    setCardProps(filteredCards);
  };

  const isMarkerChecked = (index: number, item: CardItem) => {
    const copiedCardsProps = [...cardsProps];

    copiedCardsProps[index] = item;

    setCardProps(copiedCardsProps);
  }

  const onClick = (status: boolean) => {
    setEditModeState(status);
  };

  useEffect(() => {
    const cardPropsFromStorage = getCardsfromLocalStorage(storageKey);

    if (!_isEqual(cardPropsFromStorage, cardsProps)) {
      setCardProps(cardsProps.concat(cardPropsFromStorage))
    }

    if (storeId !== storageKey) {
      setCardProps([]);
      setId(storageKey)
    }

  }, [cardsProps, storageKey, storeId, setId]);

  const renderCards = () => {
    const copied = storeId !== storageKey ? [] : [...cardsProps];
    const sortedArr = copied.sort(
      (a: CardItem, b: CardItem) => b.priority - a.priority
    );

    const cardsArr: JSX.Element[] = []

    sortedArr.forEach((item) => {
      cardsArr.push(
        <Card
          key={_uniqueId()}
          id={item.id}
          cardsArray={cardsProps}
          taskTitle={item.taskTitle}
          onRemoveClick={onRemoveClick}
          isFinished={item.isFinished}
          isMarkerChecked={isMarkerChecked}
          priority={item.priority}
          storageKey={storageKey}
        />
      )
    });

    return cardsArr;
  };

  return (

    <BaseContainer width='80%'>
      <HeaderWrapper>
        <Title>{title}</Title>
        <TabBar onClick={onClick} />
      </HeaderWrapper>
      {isEditModeOpen && (
        <EditModeCard
          handleChange={handleChange}
          addButtonPressed={addButtonPressed}
          closeButtonPressed={editModeCloseButtonPressed}
          checkBoxTypeHandler={checkBoxTypeHandler}
          isCheckBoxNeed
        />
      )}
      {cardsProps.length !== 0 || isEditModeOpen ? (
        <CardsArea>
          {renderCards()}
        </CardsArea>
      ) : (
          <Stub>You have no active tasks</Stub>
        )}
    </BaseContainer>
  );
};

export default Layout;
