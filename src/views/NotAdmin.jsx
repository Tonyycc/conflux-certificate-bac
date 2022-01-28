import React from "react";
import styled from "styled-components";

import { Container } from "../components/Layout";

import {ADMIN_ADDRESS} from "../utils/contractInteraction";

const NotAdminText = styled.h3`
  color: #ff2e00;
  font-size: 22px;
`;

const NotAdmin = (props) => {
    const {cfxAddress} = props;
    return (
        <Container style={{ marginTop: 64 }}>
          {cfxAddress !== ADMIN_ADDRESS && (
            <NotAdminText>
              You not have authorization for mint this NFT. Please change your
              wallet address.
            </NotAdminText>
          )}
        </Container>
      );
};

export default NotAdmin;
