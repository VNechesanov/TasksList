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

type ContainerHeight = {
  height: number;
}

const Container = styled.div<ContainerHeight>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  width: 80%;
  height: ${(props) => `${props.height}px`};
  border-radius: 5px;
  background-color: #ddfaff;
  box-shadow: 0px 6px 3px 3px #70cede;
`;

const TabBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 50%;
  margin-bottom: 15px;
  margin-right: 58px;
  margin-bottom: 15px;
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
  margin-left: 5px;
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
  margin-right: 15px;
  align-self: center;
  text-align: center;
`;

const PopUpBox = styled.div`
  position: absolute;
  visibility: hidden;
  white-space: nowrap;
  width: 104px;
  overflow: hidden;
  display: flex;
  height: 16px;
  font-size: 11px;
  line-height: 12px;
  color: #a9a9a9;
  border-radius: 5px 16px 16px 5px;
  line-height: 16px;
  padding: 8px 10px;
  top: -8px;
  left: -95px;
  background-color: #fff;
  box-shadow: 5px 12px 32px rgba(147, 147, 149, 0.2);

  ${Hint}:hover & {
    visibility: visible;
    animation: ${hintAnimation} 0.3s ${(props) => props.theme.animationTiming};
  }
`;

const HintText = styled.div`
  margin-left: 5px;
`;

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

  const plusButtonClicked = () => {
    setEditModeState(true);
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

  const renterTabBar = () => {
    return (
      <TabBar>
        <Hint>
          <InfoSign />
          <PopUpBox>
            <HintText>add a new card</HintText>
            <InfoSign />
          </PopUpBox>
        </Hint>
        <PlusButton onClick={() => plusButtonClicked()} />
      </TabBar>
    );
  };

  return (

    <Container height={window.innerHeight - 100}>
      <HeaderWrapper>
        <Title>{title}</Title>
        {renterTabBar()}
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
    </Container>
  );
};

export default Layout;
