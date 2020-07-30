import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import { LayoutItem } from "../App";
import PlusSign from "../Assets/PlusSign.svg";
import InfoLogo from "../Assets/InfoLogo.svg";
import SectionItem from './SectionItem/SectionItem';
import { makeId } from "../utils";
import { saveSectionsToLocalStorage, getSectionsFromLocalStorage } from "../store";
import EditModeCard from "../EditeModeCard/EditeModeCard";

type ContainerHeight = {
  height: number;
}

const Container = styled.div <ContainerHeight>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin: 0;
  width: 300px;
  height: ${(props) => `${props.height}px`};
  border-radius: 5px;
  background-color: #ddfaff;
  box-shadow: 0px 6px 3px 3px #70cede;
  overflow-y: scroll;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const TabBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
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

type Props = {
  getLayoutsArray: (items: LayoutItem[]) => void;
}

const Sections = (props: Props) => {
  const { getLayoutsArray } = props;
  const [layoutItems, setLayoutItems] = useState(getSectionsFromLocalStorage());
  const [isEditModeOpen, setEditModeState] = useState(false);
  const [taskTitle, setTaskText] = useState("");

  const handleChange = (e: any) => {
    setTaskText(e.target.value);
  };

  const plusButtonClicked = () => {
    setEditModeState(true);
  };

  const addButtonPressed = () => {
    setEditModeState(false);
    const sectionId = `section_${makeId(15)}`
    if (layoutItems.length === 0) {
      setLayoutItems(layoutItems.concat({
        id: sectionId,
        title: taskTitle,
        isNeedToRender: true,
      }));
    } else {
      const copiedArray: LayoutItem[] = [...layoutItems];

      for (let i = 0; i < copiedArray.length; i++) {
        copiedArray[i].isNeedToRender = false;
      }

      const completedArray: LayoutItem[] = copiedArray.concat({
        id: sectionId,
        title: taskTitle,
        isNeedToRender: true,
      })

      setLayoutItems(completedArray);
    }
  };

  const editModeCloseButtonPressed = () => {
    setEditModeState(false);
  };

  const layoutItemsUpdate = (items: LayoutItem[]) => {
    setLayoutItems(items);
  }

  const renterTabBar = () => {
    return (
      <TabBar>
        <PlusButton onClick={() => plusButtonClicked()} />
        <Hint>
          <InfoSign />
          <PopUpBox>
            <InfoSign />
            <HintText>add a new section</HintText>
          </PopUpBox>
        </Hint>
      </TabBar>
    );
  };

  const renderSections = () => {
    const sections = getSectionsFromLocalStorage();

    return sections.map(s => {
      return <SectionItem id={s.id} title={s.title} layoutItems={layoutItems} layoutItemsUpdate={layoutItemsUpdate} />
    })
  }

  useEffect(() => {
    getLayoutsArray(layoutItems)
    saveSectionsToLocalStorage(layoutItems)
  }, [getLayoutsArray, layoutItems])

  return (
    <Container height={window.innerHeight - 100}>
      <HeaderWrapper>
        {renterTabBar()}
      </HeaderWrapper>
      {isEditModeOpen && (
        <EditModeCard
          handleChange={handleChange}
          addButtonPressed={addButtonPressed}
          closeButtonPressed={editModeCloseButtonPressed}
        />
      )}
      {renderSections()}
    </Container>
  )
};

export default Sections;