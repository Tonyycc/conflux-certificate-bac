import React from "react";

import { Container } from "../../../../components/Layout";
import { Grid } from "../../../../components/Box";
import { Card } from "./styles";

export const LoadingCards = () => {
  return (
    <Container>
      <Grid
        gridTemplateColumns="repeat(5, 1fr)"
        gridTemplateRows="1fr"
        gridColumnGap="16px"
      >
        {[1, 2, 3, 4, 5].map((e) => (
          <Card key={e} />
        ))}
      </Grid>
    </Container>
  );
};
