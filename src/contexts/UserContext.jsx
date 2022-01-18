import React, { useState, createContext } from "react";

export const Context = createContext({
  cfxAddress: null,
  isLogged: null,
  updatIsLogged: () => null,
  updateCfxAddress: () => null,
  networkId: null,
});

const UserContext = ({children}) => {
  const [cfxAddress, setCfxAddress] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Context.Provider
      value={{ cfxAddress, isLogged, updatIsLogged: setIsLogged, updateCfxAddress: setCfxAddress, networkId: 1 }}
    >
    {children}
    </Context.Provider>
  );
};

export default UserContext;
