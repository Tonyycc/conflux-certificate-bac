import React from "react";
import UserContext from "./contexts/UserContext";
import ContractContext from "./contexts/ContractContext";

const Providers = ({ children }) => {
  return (
  <UserContext>
    <ContractContext>
      {children}
    </ContractContext>
  </UserContext>);
};

export default Providers;
