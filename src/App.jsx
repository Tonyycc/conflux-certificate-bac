import React, { useCallback, useEffect, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Header } from "./components/Header";

import { Minter, ViewNfts } from "./views";

import { getTotalSupply } from "./utils/contractInteraction";

import { Context as ContractContext } from "./contexts/ContractContext";

const App = () => {
  if (typeof window.conflux === 'undefined') {
    alert("You need to install Conflux Portal");
  }

  const { updateTotalSupply } = useContext(ContractContext);

  
  const queryTotalSupply = useCallback(async () => {
    const supply = await getTotalSupply();
    updateTotalSupply(supply);
  }, [updateTotalSupply]);

  useEffect(() => {
    queryTotalSupply();
  }, [queryTotalSupply]);

  return (
    <BrowserRouter>
    <Header />
        <Routes>
          <Route path="/" element={<Minter />} />
          <Route path="minter" element={<Minter />} />
          <Route path="view-nfts" element={<ViewNfts />} />
          <Route path="*" element={<div>Not Found!</div>} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
