import React from "react";
import styled from "styled-components";

import Layout from "../src/Layout/Layout";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0;
  margin-top: 30px;
`;

const App = () => {
  return (
    <Container>
      <Layout />
    </Container>
  );
};

export default App;
