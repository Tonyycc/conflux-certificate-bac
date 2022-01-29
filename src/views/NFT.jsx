import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Hashicon } from "@emeraldpay/hashicon-react";

import Badge from "../components/Badge/Badge";

import { queryNft } from "../utils/contractInteraction";

const VisorWrapper = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: calc(100vh - 70px);
`;

const ImageWrapper = styled.div`
  display: grid;
  place-items: center;
  grid-area: 1 / 1 / 2 / 2;

  img {
    border-radius: 16px;
    width: 600px;
  }
`;

const Details = styled.div`
  border-left: 1px solid gray;
  padding: 16px;
`;

const NFT = () => {
  const [metadata, setMetadata] = useState({});

  let params = useParams();

  const getNFT = useCallback(async () => {
    const nft = await queryNft(params.tokenId);
    setMetadata(nft);
  }, [params.tokenId]);

  useEffect(() => {
    getNFT();
  }, [getNFT]);

  if (Object.entries(metadata).length === 0)
    return <p>Sorry, this NFT doesn't exist. Check it again or try again.)</p>;

  return (
    <VisorWrapper>
      <ImageWrapper>
        <img src={metadata.image} alt={metadata.name} />
      </ImageWrapper>
      <Details>
        <h2>{metadata.name}</h2>
        <div
          style={{
            marginTop: 16,
          }}
        >
          <span>Owner</span>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                background: "black",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                width: 40,
                height: 40,
              }}
            >
              <Hashicon
                value="cfxtest:aatag9yw22pcu6jbnse58na7nrjf2kn2xuuzb5rps4"
                size={25}
              />
            </div>
            <p
              style={{
                marginLeft: 8,
                fontWeight: "bold",
              }}
            >
              cfxtest:aatag9yw22pcu6jbnse58na7nrjf2kn2xuuzb5rps4
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
          }}
        >
          <span>Properties</span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, auto)",
              gap: 16
            }}
          >
            {metadata.attributes.map(({ trait_type, value }) => (
              <Badge title={trait_type} content={value} />
            ))}
          </div>
        </div>
      </Details>
    </VisorWrapper>
  );
};

export default NFT;
