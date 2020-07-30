import React from 'react';
import styled from 'styled-components';
import { LayoutItem } from '../../App';

const Section = styled.div`
  width: 100%;
  min-height: 50px;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  margin-bottom: 15px;
  font-weight: 150;
  font-size: 20px;
`;

type Props = {
    id: string;
    title: string;
    layoutItems: LayoutItem[];
    layoutItemsUpdate: (items: LayoutItem[]) => void;
}

const SectionItem = (props: Props) => {
    const { id, title, layoutItems, layoutItemsUpdate } = props;

    const onSectionClick = () => {
        const copiedArr = [...layoutItems];

        for (let i = 0; i < copiedArr.length; i++) {
            if (copiedArr[i].id === id) {
                copiedArr[i].isNeedToRender = true;
            } else {
                copiedArr[i].isNeedToRender = false;
            }
        }

        layoutItemsUpdate(copiedArr);
    }

    return <Section onClick={() => onSectionClick()}>{title}</Section>
}

export default SectionItem;