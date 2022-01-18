import React, { useState, createContext } from "react";

export const Context = createContext({
  totalSupply: null,
  updateTotalSupply: () => null,
  nfts: [],
  updateNfts: () => null,
});

const ContractContext = ({children}) => {
  const [totalSupply, setTotalSupply] = useState("");
  const [nfts, setNfts] = useState([]);

  return (
    <Context.Provider
      value={{ totalSupply, updateTotalSupply: setTotalSupply, nfts, updateNfts: setNfts }}
    >
    {children}
    </Context.Provider>
  );
};

export default ContractContext;
