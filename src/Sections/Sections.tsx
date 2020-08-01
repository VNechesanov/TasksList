import React, { useState, useEffect } from "react";
import moment from 'moment';
import _groupBy from 'lodash/groupBy';
import _map from 'lodash/map';
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

const Stub = styled.div`
  display: flex;
  justify-content: center;
  font-size: 65px;
  color: #F2F2F2;
  height: 100%;
  align-items: center;
  text-align: center;
`;

const SectionTitle = styled.div`
  font-size: 15px;
  color: #F2F2F2;
  font-weight: 200;
  margin-bottom: 15px;
`;

const SectionContainer = styled.div`
  width: 90%;
  height: auto;
  border-radius: 5px;
  background-color: #868686;
  margin-bottom: 15px;
  padding: 15px;
`;

const SectionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
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
        date: moment().unix() * 1000,
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
        date: moment().unix() * 1000,
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
    const groupedData = _groupBy(sections, s => moment(s.date).format('YYYY, MMM-DD'))

    return _map(groupedData, (values, key) => {
      const marker = key === moment().format('YYYY, MMM-DD') ? '(this day)' : '';

      return <SectionContainer>
        <SectionTitle>{`${key} ${marker}`}</SectionTitle>
        {values.map(s => {
          return <SectionItem id={s.id} title={s.title} layoutItems={layoutItems} layoutItemsUpdate={layoutItemsUpdate} />
        })}

      </SectionContainer>
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
      <SectionArea>
        {layoutItems.length !== 0 || isEditModeOpen ? renderSections() : <Stub>You have no sections</Stub>}
      </SectionArea>
    </BaseContainer>
  )
};

export default Sections;