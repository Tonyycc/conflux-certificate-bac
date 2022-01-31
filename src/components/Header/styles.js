import styled from "styled-components";
import { Box } from "../Box";

export const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 70px;
  margin-bottom: 32px;
  width: 100%;
`;


export const TitleContainer = styled(Box)`
  align-items: center;
  display: flex;
  justify-content: center;
  height: inherit;
  width: 22%;
`;


export const Typography = styled.h1`
  font-size: 26px;
  font-weight: bold;
`;


export const HeaderMenu = styled.div`
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

export const ButtonWrappers = styled.div``;
