import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import { queryNft } from "../utils/contractInteraction";

const NFT = () => {
  const [metadata, setMetadata] = useState({});

  let params = useParams();

  const getNFT = useCallback(async() => {
    const nft = await queryNft(params.tokenId);
    setMetadata(nft);
  }, [params.tokenId]);

  useEffect(() => {
      getNFT();
  }, [getNFT])

  if (Object.entries(metadata).length === 0) return <p>Sorry, this NFT doesn't exist. Check it again or try again.)</p>

  return (
      <>
        <img src={metadata.image} alt={metadata.name} width={250} />
      </>
  )
  
};

export default NFT;
