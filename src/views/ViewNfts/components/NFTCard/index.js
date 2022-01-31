import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../../components/Button";
import { Card, Image, NameCard } from "./styles";

const DEFAULT_IMAGE =
  "https://testnet.confluxscan.io/static/media/tokenIdNotFound.777d780f.jpg";

export const NFTCard = ({ image, name, tokenId }) => {
  let navigate = useNavigate();

  return (
    <Card>
      <Image src={image} alt={name} />
      <NameCard>{name}</NameCard>
      <Button
        backgroundColor="black"
        color="white"
        marginTop={16}
        onClick={() => navigate(`/nft/${process.env.REACT_APP_CONTRACT}/${tokenId}`)}
      >
        View #{tokenId}
      </Button>
    </Card>
  );
};

NFTCard.defaultProperties = {
  name: "Not Found",
  image: DEFAULT_IMAGE,
  tokenId: "0x0",
};
