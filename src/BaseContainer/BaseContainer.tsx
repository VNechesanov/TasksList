import React from "react";
import styled from "styled-components";

type ContainerHeight = {
    height: number;
    width: string;
}

const Container = styled.div<ContainerHeight>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  width: ${(props) => props.width};
  height: ${(props) => `${props.height}px`};
  border-radius: 5px;
  background-color: #979797;
  box-shadow: 5px 12px 32px #494949;
`;

type Props = {
    width: string;
} & React.HTMLAttributes<HTMLDivElement>;

const BaseContainer = (props: Props) => {
    const { width, children } = props;

    return (
        <Container height={window.innerHeight - 100} width={width}>
            {children}
        </Container>
    );
};

export default BaseContainer;
