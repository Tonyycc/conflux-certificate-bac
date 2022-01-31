import { useContext, useEffect, useState } from "react";
import { Context as ContractContext } from "../../../contexts/ContractContext";
import { queryAllNfts } from "../../../utils/contractInteraction";

const useGetNfts = () => {
  const { totalSupply } = useContext(ContractContext);

  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (totalSupply > 0) {
      const fetchNfts = async () => {
        let response = await queryAllNfts(totalSupply);
        setNfts(response);
        setIsLoading(false);
      };
      fetchNfts();
    }
  }, [totalSupply]);

  return { nfts, isLoading };
};

export default useGetNfts;
