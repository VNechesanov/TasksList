import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { LayoutItem } from "../App";
import SectionItem from './SectionItem/SectionItem';
import { makeId } from "../utils";
import EditModeCard from "../EditeModeCard/EditeModeCard";
import BaseContainer from "../BaseContainer/BaseContainer";
import TabBar from "../TabBar/TabBar";
import { saveSectionsToLocalStorage, getSectionsFromLocalStorage } from "../store";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
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

  const onClick = (status: boolean) => {
    setEditModeState(status);
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
    <BaseContainer width='300px'>
      <HeaderWrapper>
        <TabBar onClick={onClick} />
      </HeaderWrapper>
      {isEditModeOpen && (
        <EditModeCard
          handleChange={handleChange}
          addButtonPressed={addButtonPressed}
          closeButtonPressed={editModeCloseButtonPressed}
        />
      )}
      {renderSections()}
    </BaseContainer>
  )
};

export default Sections;