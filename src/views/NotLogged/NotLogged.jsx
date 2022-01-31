import React from "react";

import { Grid } from "../../components/Box";
import { Button } from "../../components/Button";

import useConfluxAuth from "./hooks/useConfluxAuth";

const NotLogged = () => {
  const { handleClick } = useConfluxAuth();

  return (
    <Grid placeItems="center" justifyContent="center">
      <Button
        backgroundColor="#e55d39"
        color="#dafafc"
        fontSize={26}
        marginTop={300}
        padding="16px 64px"
        onClick={handleClick}
      >
        Connect Wallet
      </Button>
    </Grid>
  );
};

export default NotLogged;
