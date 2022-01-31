import React, { useState, createContext } from "react";

export const Context = createContext({
  totalSupply: null,
  updateTotalSupply: () => null,
});

const ContractContext = ({ children }) => {
  const [totalSupply, setTotalSupply] = useState("");

  return (
    <Context.Provider
      value={{ totalSupply, updateTotalSupply: setTotalSupply }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContractContext;
