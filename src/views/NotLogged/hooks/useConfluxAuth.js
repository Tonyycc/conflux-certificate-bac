import { useContext } from "react";
import { confluxPortalConnect } from "../../../utils/confluxPortal";
import { Context as UserContext } from "../../../contexts/UserContext";

const useConfluxAuth = () => {
  const { updateCfxAddress, updatIsLogged } = useContext(UserContext);

  const handleClick = async () => {
    const addr = await confluxPortalConnect();
    updateCfxAddress(addr);
    updatIsLogged(true);
  };

  return {
    handleClick,
  };
};

export default useConfluxAuth;
