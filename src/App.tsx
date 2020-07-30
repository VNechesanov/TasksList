import React, { useState, useCallback } from "react";
import styled from "styled-components";
import _isEmpty from "lodash/isEmpty";

import Layout from "../src/Layout/Layout";
import Sections from "../src/Sections/Sections";

export type LayoutItem = {
  id: string;
  title: string;
  isNeedToRender: boolean;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const SectionsContainer = styled.div`
  left: 0;
  margin-left: 30px;
`;

const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const App = () => {
  const [layout, setLayout] = useState({ id: '', title: '', isNeedToRender: false } as LayoutItem);

  const layoutsArray = useCallback((items: LayoutItem[]) => {
    setLayout(items.find(i => i.isNeedToRender === true) as LayoutItem)
  }, [])

  return (
    <Container>
      <SectionsContainer>
        <Sections getLayoutsArray={layoutsArray} />
      </SectionsContainer>
      <LayoutContainer>
        {_isEmpty(layout)
          ?
          <Layout storageKey={''} title={''} />
          :
          <Layout storageKey={layout.id} title={layout.title} />
        }
      </LayoutContainer>
    </Container>
  );
};

export default App;
