/* eslint-disable max-len */

import React from "react";
import { Container } from 'semantic-ui-react'

function MyContainer({ children }: any) {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default MyContainer;
