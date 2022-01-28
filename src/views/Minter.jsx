import React, { useState, useContext, useCallback } from "react";
import styled from "styled-components";

import { Container } from "../components/Layout";
import { Button } from "../components/Button";
import Loader from "../components/Icons/Loader";

import NotLogged from "./NotLogged";

import { Context as UserContext } from "../contexts/UserContext";
import { Context as ContractContext } from "../contexts/ContractContext";

import { pinFileToIPFS, pinJSONToIPFS } from "../utils/pinata";
import { mintNFT } from "../utils/contractInteraction";
import { buildNftMetadata } from "../utils/dataConstructor";

import config from "../data/config.json";

const NotAdminText = styled.h3`
  color: #ff2e00;
  font-size: 22px;
`;

const FormWrapper = styled.div`
  background: rgba(3, 2, 2, 0.5);
  border-radius: 16px;
  padding: 16px;
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
  const [endDate, setEndDate] = useState(""); //parseInt((new Date('2021.11.12').getTime() / 1000).toFixed(0));
  const [signedBy, setSignedBy] = useState("");
  const [studentName, setStudentName] = useState("");

  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleMinting = useCallback(async () => {
    const metadata = buildNftMetadata({
      blockchainTimeStamp,
      cid,
      endDate,
      signedBy,
      studentName,
      totalSupply,
    });
    try {
      const cid = await pinJSONToIPFS(metadata);
      mintNFT(
        "cfxtest:aam7cusap85jevvahgffs5merc5vrsmetesswajsep",
        totalSupply,
        cid
      );
      updateTotalSupply((prevValue) => Number(prevValue) + 1);
    } catch (error) {
      console.error(error);
      return;
    }
  }, [
    blockchainTimeStamp,
    cid,
    endDate,
    signedBy,
    studentName,
    totalSupply,
    updateTotalSupply,
  ]);

  if (!isLogged) return <NotLogged />;

  return (
    <Container style={{ marginTop: 64 }}>
      {cfxAddress !== config.adminAddress && (
        <NotAdminText>
          You not have authorization for mint this NFT. Please change your
          wallet address.
        </NotAdminText>
      )}

      {cfxAddress === config.adminAddress && (
        <FormWrapper>
          <h2>Mint new Conflux Certificate</h2>
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

            <span style={{ marginLeft: "16px" }}>CID:</span>

            {isImageUploading ? (
              <div style={{ display: "flex" }}>
                <Loader></Loader>
                <span style={{ marginLeft: 8 }}>
                  Uploading Image to IPFS Network, please wait...
                </span>
              </div>
            ) : null}

            <p>{cid !== "" && cid}</p>
          </Content>

          <Content>
            <span>Student Name:</span>
            <input
              type="text"
              value={studentName}
              onChange={(event) => {
                setStudentName(event.target.value);
              }}
            />
          </Content>

          <Content>
            <span>End Date (UNIX):</span>
            <input
              type="text"
              value={endDate}
              onChange={(event) => {
                setEndDate(event.target.value);
              }}
            />
          </Content>
          <Content>
            <span>Signed By:</span>
            <input
              type="text"
              value={signedBy}
              onChange={(event) => {
                setSignedBy(event.target.value);
              }}
            />
          </Content>
          <Content>
            <span>Blockchain StampId:</span>
            <input
              type="text"
              value={blockchainTimeStamp}
              onChange={(event) => {
                setBlockchainTimeStamp(event.target.value);
              }}
            />
          </Content>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Button disabled={!!!cid} onClick={handleMinting}>
              Mint Certificate
            </Button>
          </div>
        </FormWrapper>
      )}
    </Container>
  );
};

export default Minter;
