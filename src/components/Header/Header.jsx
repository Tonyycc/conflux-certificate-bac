import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { confluxPortalConnect } from "../../utils/confluxPortal";
import { formatAddress } from "../../utils/Address";

import { Context as UserContext } from "../../contexts/UserContext";

import { Button } from "../Button";
import { HeaderWrapper, TitleContainer, Typography, HeaderMenu, ButtonWrappers } from "./styles";

const Header = () => {
  let { pathname } = useLocation();

  const { cfxAddress, updateCfxAddress, updatIsLogged } =
    useContext(UserContext);

  const handleClick = async () => {
    const addr = await confluxPortalConnect();
    updateCfxAddress(addr);
    updatIsLogged(true);
  };

  return (
    <HeaderWrapper>
      <TitleContainer>
        <Typography>Conflux Certificate</Typography>
      </TitleContainer>
      <HeaderMenu>
        <ul>
          <li>
            <Link
              to="/minter"
              className={
                pathname === "/minter" || pathname === "/" ? "active" : ""
              }
            >
              Mint Certificate
            </Link>
          </li>
          <li>
            <Link
              to="/view-nfts"
              className={pathname === "/view-nfts" ? "active" : ""}
            >
              View All Nfts
            </Link>
          </li>
        </ul>
        <ButtonWrappers>
          <Button
            backgroundColor="white"
            onClick={cfxAddress === "" ? handleClick : () => null}
          >
            {cfxAddress !== "" ? formatAddress(cfxAddress) : "Connect Wallet"}
          </Button>
        </ButtonWrappers>
      </HeaderMenu>
    </HeaderWrapper>
  );
};

export default Header;
