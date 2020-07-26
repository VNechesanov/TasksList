import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import _uniqueId from "lodash/uniqueId";
import _isEqual from "lodash/isEqual";

import Card from "../Card/Card";
import EditModeCard from "../EditeModeCard/EditeModeCard";
import PlusSign from "../Assets/PlusSign.svg";
import InfoLogo from "../Assets/InfoLogo.svg";
import { getCardsfromLocalStorage } from "../store";

export type CardItem = {
  id: string;
  taskTitle: string;
  priority: number;
  isFinished: boolean;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin: 0;
  width: 500px;
  min-height: 130px;
  border-radius: 5px;
  background-color: #ddfaff;
  box-shadow: 0px 6px 3px 3px #70cede;
`;

const TabBar = styled.div`
  display: flex;
  flex-direction: row;
`;

const PlusButton = styled.div`
  background: url(${PlusSign});
  width: 15px;
  height: 15px;
  background-size: 100% 100%;
  margin-bottom: 15px;
  cursor: pointer;
`;

const InfoSign = styled.div`
  background: url(${InfoLogo});
  min-width: 15px;
  min-height: 15px;
  background-size: 100% 100%;
  margin-bottom: 15px;
  cursor: pointer;
`;

const hintAnimation = keyframes`
  from {
  opacity: 0;
  }

  to {
  opacity: 1;
  }
`;

const Hint = styled.div`
  position: relative;
  margin-left: 15px;
  align-self: center;
  text-align: center;
`;

const PopUpBox = styled.div`
  position: absolute;
  visibility: hidden;
  white-space: nowrap;
  width: auto;
  overflow: hidden;
  display: flex;
  height: 16px;
  font-size: 11px;
  line-height: 12px;
  color: #a9a9a9;
  border-radius: 16px 5px 5px 16px;
  line-height: 16px;
  padding: 8px 10px;
  top: -8px;
  left: -10px;
  background-color: #fff;
  box-shadow: 5px 12px 32px rgba(147, 147, 149, 0.2);

  ${Hint}:hover & {
    visibility: visible;
    animation: ${hintAnimation} 0.3s ${(props) => props.theme.animationTiming};
  }
`;

const HintText = styled.div`
  margin-left: 8px;
`;

const Stub = styled.div`
  display: flex;
  justify-content: center;
  font-size: 45px;
  color: #005c65;
`;

export const CardsContext = React.createContext<{
  cardsArray: CardItem[];
}>({ cardsArray: [] });

const Layout = () => {
  const [isEditModeOpen, setEditModeState] = useState(false);
  const [cardsProps, setCardProps] = useState([] as CardItem[]);
  const [taskTitle, setTaskText] = useState("");
  const [priority, setPriority] = useState(0);

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

  const plusButtonClicked = () => {
    setEditModeState(true);
  };

  useEffect(() => {
    const cardPropsFromStorage = getCardsfromLocalStorage();

    if (!_isEqual(cardPropsFromStorage, cardsProps)) {
      setCardProps(cardsProps.concat(cardPropsFromStorage))
    }

  }, [cardsProps]);

  const renderCards = () => {
    const copied = [...cardsProps];
    const sortedArr = copied.sort(
      (a: CardItem, b: CardItem) => b.priority - a.priority
    );

    const cardsArr: JSX.Element[] = []

    sortedArr.forEach((item) => {
      cardsArr.push(
        <Card
          key={_uniqueId()}
          id={item.id}
          taskTitle={item.taskTitle}
          onRemoveClick={onRemoveClick}
          isFinished={item.isFinished}
          isMarkerChecked={isMarkerChecked}
          priority={item.priority}
        />
      )
    });

    return cardsArr;
  };

  const renterTabBar = () => {
    return (
      <TabBar>
        <PlusButton onClick={() => plusButtonClicked()} />
        <Hint>
          <InfoSign />
          <PopUpBox>
            <InfoSign />
            <HintText>click on the plus button to add a new card</HintText>
          </PopUpBox>
        </Hint>
      </TabBar>
    );
  };

  return (
    <CardsContext.Provider value={{ cardsArray: cardsProps }}>
      <Container>
        {renterTabBar()}
        {isEditModeOpen && (
          <EditModeCard
            handleChange={handleChange}
            addButtonPressed={addButtonPressed}
            closeButtonPressed={editModeCloseButtonPressed}
            checkBoxTypeHandler={checkBoxTypeHandler}
          />
        )}
        {cardsProps.length !== 0 || isEditModeOpen ? (
          renderCards()
        ) : (
            <Stub>You have no active tasks</Stub>
          )}
      </Container>
    </CardsContext.Provider>
  );
};

export default Layout;
