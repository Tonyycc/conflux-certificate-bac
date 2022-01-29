import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;

  a {
    text-decoration: none;
    color: black;
    font-weight: bold;
  }
`;

const Card = styled.div`
  align-items: center;
  background: white;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.08),
    0 -1px 3px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  max-width: 250px;
  padding: 8px;
  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
`;

const Image = styled.img``;

const Nfts = ({ nfts }) => {
  return (
    <Box>
      {nfts.map(({ name, image, tokenId }) => (
        <Link to={`/nft/${process.env.REACT_APP_CONTRACT}/${tokenId}`}>
          <Card key={name}>
            <Image
              src={image}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src =
                  "https://testnet.confluxscan.io/static/media/tokenIdNotFound.777d780f.jpg";
                currentTarget.width="240"
              }}
              alt={name}
              width={240}
              height={160}
            />
            {tokenId}
          </Card>
        </Link>
      ))}
    </Box>
  );
};

export default Nfts;
