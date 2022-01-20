import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import { Button } from "../Button";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { confluxPortalConnect } from "../../utils/confluxPortal";
import { formatAddress } from "../../utils/Address";
import { Context as UserContext } from "../../contexts/UserContext";

const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 70px;
  width: 100%;
`;

const Box = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: inherit;
  width: 22%;
`;

const Typography = styled.h1`
  font-size: 26px;
  font-weight: bold;
`;

const HeaderMenu = styled.div`
  align-items: center;
  background: #030202;
  border-radius: 0px 0px 0px 128px;
  display: flex;
  height: inherit;
  justify-content: space-around;
  width: 78%;

  ul {
    display: flex;

    li {
      margin-right: 64px;
      font-weight: bold;
      list-style: none;

      a {
        color: #9eb1b3;
        text-decoration: none;

        &:hover {
          color: #dafafc;
        }
      }
    }

    .active {
      color: #dafafc;
    }
  }
`;

const ButtonWrappers = styled.div``;

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
      <Box>
        <Typography>Conflux Certificate</Typography>
      </Box>
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
          <Button marginRight={32} disabled>
            Testnet Network
          </Button>
          <Button
            startIcon={<AccountBalanceWalletIcon />}
            onClick={cfxAddress !== "" ? handleClick : () => null}
          >
            {cfxAddress !== "" ? formatAddress(cfxAddress) : "Connect Wallet"}
          </Button>
        </ButtonWrappers>
      </HeaderMenu>
    </HeaderWrapper>
  );
};

export default Header;
