import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { StyledButton } from "../Button";
import { useLocation } from "react-router-dom";

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
          <StyledButton sx={{ marginRight: "16px" }} variant="outlined">
            Testnet Network
          </StyledButton>
          <StyledButton variant="contained" color="primary">
            Connect Wallet
          </StyledButton>
        </ButtonWrappers>
      </HeaderMenu>
    </HeaderWrapper>
  );
};

export default Header;
