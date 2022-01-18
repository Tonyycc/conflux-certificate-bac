import React, { useContext } from "react";
import styled from "styled-components";

import { StyledButton } from "../components/Button/Button";

import { confluxPortalConnect } from "../utils/confluxPortal";
import { Context as UserContext } from "../contexts/UserContext";

const Box = styled.div`
  display: grid;
  place-items: center;
  width: 100vw;
`;

const AuthButton = styled(StyledButton)`
  background: #e55d39;
  color: #dafafc;
  font-size: 26px;
  margin-top: 300px;
  padding: 16px 64px;

  &:hover {
    opacity: 0.8;
  }
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
      <AuthButton onClick={handleClick}>Connect Wallet</AuthButton>
    </Box>
  );
};

export default NotLogged;
