import React from "react";

import useGetNfts from "./hooks/useGetNfts";

import { LoadingCards } from "./components/LoadingCards";
import { Container } from "../../components/Layout";
import { Grid } from "../../components/Box";
import { NFTCard } from "./components/NFTCard";

const ViewNfts = () => {
  const { nfts, isLoading } = useGetNfts();

  if (isLoading) return <LoadingCards />;

  return (
    <Container>
      <Grid
        gridTemplateColumns="repeat(6, 1fr)"
        gridColumnGap="16px"
        gridRowGap="16px"
      >
        {nfts.map((meta) => (
          <NFTCard key={meta.name} {...meta} />
        ))}
      </Grid>
    </Container>
  );
};

export default ViewNfts;
