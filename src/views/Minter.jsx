/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Container } from "../components/Layout";
import { Button } from "../components/Button";
import Loader from "../components/Icons/Loader";
import Input from "../components/Input/Input";

import NotLogged from "./NotLogged";
import NotAdmin from "./NotAdmin";

import { Context as UserContext } from "../contexts/UserContext";
import { Context as ContractContext } from "../contexts/ContractContext";

import { pinFileToIPFS, pinJSONToIPFS } from "../utils/pinata";
import { mintNFT } from "../utils/contractInteraction";
import { buildNftMetadata } from "../utils/dataConstructor";

import { ADMIN_ADDRESS } from "../utils/contractInteraction";

const FormWrapper = styled.div`
  color: white;
  background: rgba(3, 2, 2);
  border-radius: 16px;
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
`;

const Content = styled.div`
  display: flex;
  color: white;
  margin: 32px 0;

  span {
    font-weight: bold;
    margin-right: 8px;
  }

  p {
    font-weight: 300;
  }
`;

const SelectImage = styled.input``;

const Minter = () => {
  const { cfxAddress, isLogged } = useContext(UserContext);
  const { totalSupply, updateTotalSupply } = useContext(ContractContext);

  const [blockchainTimeStamp, setBlockchainTimeStamp] = useState("");
  const [cid, setCid] = useState("");
  const [cfxAddressToMint, setCfxAddressToMint] = useState("");
  const [endDate, setEndDate] = useState("");
  const [unixEndDate, setUnixEndDate] = useState(""); //parseInt((new Date('2021.11.12').getTime() / 1000).toFixed(0));
  const [signedBy, setSignedBy] = useState("");
  const [studentName, setStudentName] = useState("");
  const [stampingAddress, setStampingAddress] = useState("");

  const [isImageUploading, setIsImageUploading] = useState(false);
  const [txHash, setTxHash] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (txHash !== "")
      return navigate(`/nft/${process.env.REACT_APP_CONTRACT}/${totalSupply}`);
  }, [txHash]);

  const handleMint = useCallback(async () => {
    const metadata = buildNftMetadata({
      blockchainTimeStamp,
      cid,
      endDate: unixEndDate,
      signedBy,
      studentName,
      totalSupply,
      stampingAddress,
    });
    try {
      const cid = await pinJSONToIPFS(metadata);
      const hash = await mintNFT(cfxAddressToMint, totalSupply, cid);
      
      setTxHash(hash);
      updateTotalSupply((prevValue) => Number(prevValue) + 1);
    } catch (error) {
      console.error(error);
      return;
    }
  }, [
    blockchainTimeStamp,
    cfxAddressToMint,
    cid,
    signedBy,
    stampingAddress,
    studentName,
    totalSupply,
    unixEndDate,
    updateTotalSupply,
  ]);

  if (!isLogged) return <NotLogged />;

  if (cfxAddress !== ADMIN_ADDRESS) return <NotAdmin />;

  return (
    <Container style={{ marginTop: 64 }}>
      {cfxAddress === ADMIN_ADDRESS && (
        <FormWrapper>
          <h2 style={{ textAlign: "center", margin: 16, fontSize: 32 }}>
            {`📄 Mint new Conflux Certificate #${totalSupply} 📄`}
          </h2>
          <Content>
            <SelectImage
              type="file"
              accept="image/*"
              onChange={async (event) => {
                event.preventDefault();
                setIsImageUploading(true);
                const cid = await pinFileToIPFS(event.target.files[0]);
                setCid(cid);
                setIsImageUploading(false);
              }}
            />
          </Content>
          <Content>
            <span>CID:</span>

            {isImageUploading ? (
              <div style={{ display: "flex" }}>
                <Loader></Loader>
                <span style={{ marginLeft: 8 }}>Uploading Image...</span>
              </div>
            ) : null}

            <p>
              {cid !== "" ? (
                <a
                  style={{
                    color: "white",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  href={`https://gateway.pinata.cloud/ipfs/${cid}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {cid}🔗
                </a>
              ) : (
                "SELECT IMAGE 🔼"
              )}
            </p>
          </Content>

          <Input
            label="CFX address to mint"
            value={cfxAddressToMint}
            onChange={(event) => {
              setCfxAddressToMint(event.target.value);
            }}
          />

          <Input
            label="Student Name"
            name="studentName"
            value={studentName}
            onChange={(event) => {
              setStudentName(event.target.value);
            }}
          />

          <Input
            label="End Date (UNIX)"
            type="date"
            value={endDate}
            onChange={(event) => {
              setEndDate(event.target.value);
              setUnixEndDate(
                parseInt(
                  (new Date(event.target.value).getTime() / 1000).toFixed(0)
                )
              );
            }}
          />

          <Input
            label="Signed By"
            value={signedBy}
            onChange={(event) => {
              setSignedBy(event.target.value);
            }}
          />

          <Input
            label="Blockchain StampId"
            value={blockchainTimeStamp}
            onChange={(event) => {
              setBlockchainTimeStamp(event.target.value);
            }}
          />

          <Input
            label="Stamping Address"
            value={stampingAddress}
            onChange={(event) => {
              setStampingAddress(event.target.value);
            }}
          />

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Button disabled={!cid} onClick={handleMint}>
              Mint Certificate
            </Button>
          </div>
        </FormWrapper>
      )}
    </Container>
  );
};

export default Minter;
