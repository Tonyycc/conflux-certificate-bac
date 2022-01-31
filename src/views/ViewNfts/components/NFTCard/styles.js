import styled from "styled-components";

import { Box } from "../../../../components/Box";

export const Card = styled(Box)`
    align-items: center;
    background-color: white;
    border: 1px solid rgba(4, 4, 5, 0.1);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    padding: 16px 8px;
`;

export const Image = styled.img`
    border-radius: 16px;
    height: 180px;
    width: 220px;
`;

export const NameCard = styled.h3`
    font-size: 14px;
    font-weight: bold;
`;