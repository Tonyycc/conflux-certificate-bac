import React, { useCallback, useContext, useEffect } from "react";
import styled from "styled-components";

import { LoadingNfts } from "../components/LoadingNfts";
import {Nfts} from "../components/Nfts";

import NotLogged from "./NotLogged";
import { Context as UserContext } from "../contexts/UserContext";
import { Context as ContractContext } from "../contexts/ContractContext";
import {queryAllNfts} from "../utils/contractInteraction";

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 64px;
  max-width: 90%;
`;

const ViewNfts = () => {
  const { isLogged } = useContext(UserContext);
  const { totalSupply,  nfts, updateNfts } = useContext(ContractContext);

  const getAllNfts = useCallback(async() => {
    const nfts = await queryAllNfts(totalSupply);
    updateNfts(nfts);
  }, [updateNfts, totalSupply]);

  useEffect(() => {
    getAllNfts();
  }, [getAllNfts]);

  if (!isLogged) return <NotLogged />;

  return (
    <Wrapper>
      {
        (nfts.length <= 0) ? <LoadingNfts /> : <Nfts nfts={nfts} />
      }

    </Wrapper>
  );
};

export default ViewNfts;
