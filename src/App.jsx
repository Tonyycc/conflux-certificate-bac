import React, { useCallback, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Minter, ViewNfts } from "./views";
import { NFT } from "./views";

import { getTotalSupply } from "./utils/contractInteraction";
import { requireConfluxProvider } from "./utils/confluxPortal";

import { Context as UserContract } from "./contexts/UserContext";
import { Context as ContractContext } from "./contexts/ContractContext";

const App = () => {
  const { updateNetworkId } = useContext(UserContract);
  const { updateTotalSupply } = useContext(ContractContext);

  const queryTotalSupply = useCallback(async () => {
    const supply = await getTotalSupply();
    updateTotalSupply(supply);
  }, [updateTotalSupply]);

  useEffect(() => {
    requireConfluxProvider();
    updateNetworkId(window["conflux"].request({method: "cfx_chainId"}));
    queryTotalSupply();
  }, [queryTotalSupply, updateNetworkId]);

  /** Suscriptions to Conflux wallets events */
  useEffect(() => {
    window["conflux"].on("chainChanged", (chainId) => {
      updateNetworkId(chainId);
    });
    return window["conflux"].off("chainChanged", (chainId) => {
      updateNetworkId(chainId);
    });
  }, [updateNetworkId]);


  useEffect(() => {
    window["conflux"].on("accountsChanged", (addr) => {
      console.log(addr);
    });
  });

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Minter />} />
        <Route path="minter" element={<Minter />} />
        <Route path="view-nfts" element={<ViewNfts />} />
        <Route path="nft/:contract/:tokenId" element={<NFT />} />
        <Route path="*" element={<div>Not Found!</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
