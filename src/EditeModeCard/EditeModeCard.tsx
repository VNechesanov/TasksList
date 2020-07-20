import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
  margin-bottom: 20px;
  width: 100%;
  height: 100px;
  border-radius: 2px;
  background-color: #fbfeff;
  box-shadow: 0px 9px 3px -2px #b1e5ff;
`;

const Card = () => {
  return <Container />;
};

export default Card;
