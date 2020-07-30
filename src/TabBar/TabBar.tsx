import React from "react";
import styled from "styled-components";

import PlusSign from "../Assets/PlusSign.svg";

export type CardItem = {
    id: string;
    taskTitle: string;
    priority: number;
    isFinished: boolean;
};

const Container = styled.div`
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

type Props = {
    onClick: (status: boolean) => void;
}

const TabBar = (props: Props) => {
    const { onClick } = props;

    return (
        <Container>
            <PlusButton onClick={() => onClick(true)} />
        </Container>
    );
};

export default TabBar;
