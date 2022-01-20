import React, { useContext } from "react";
import styled from "styled-components";

import { Button } from "../components/Button";

import { confluxPortalConnect } from "../utils/confluxPortal";
import { Context as UserContext } from "../contexts/UserContext";

const Box = styled.div`
  display: grid;
  place-items: center;
  width: 100vw;
`;

const NotLogged = () => {
  const { updateCfxAddress, updatIsLogged } = useContext(UserContext);

  const handleClick = async () => {
    const addr = await confluxPortalConnect();
    updateCfxAddress(addr);
    updatIsLogged(true);
  };
  return (
    <Box>
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
    </Box>
  );
};

export default NotLogged;
