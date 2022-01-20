import React, { useState, useContext, useCallback } from "react";
import styled from "styled-components";

import { Container } from "../components/Layout";
import { Button } from "../components/Button";

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
  
  const [blockchainTimeStamp, setBlockchainTimeStamp] = useState("63ab21ef7f1a979bf1128de5bc40c84c89d3a6bd");
  const [cid, setCid] = useState("");
  const [endDate, setEndDate] = useState("1636696800"); //parseInt((new Date('2021.11.12').getTime() / 1000).toFixed(0));
  const [signedBy, setSignedBy] = useState("KLCfXDY823gqQK94ywaqwRQ3R6n1");
  const [studentName, setStudentName] = useState("Luis Antonio Cruz Aguilar");

  const handleMinting = useCallback(async () => {
    const metadata = buildNftMetadata({
        blockchainTimeStamp,
        cid,
        endDate,
        signedBy,
        studentName,
        totalSupply
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
  }, [blockchainTimeStamp,
    cid,
    endDate,
    signedBy,
    studentName,
    totalSupply, updateTotalSupply]);

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
                const cid = await pinFileToIPFS(event.target.files[0]);
                setCid(cid);
              }}
            />

            <span style={{ marginLeft: "16px" }}>CID:</span>
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

          <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "end" }}>
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
