import React from "react";
import styled from "styled-components";

const Box = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
`;

const Card = styled.div`
    align-items: center;
    background: white;
    border-radius: 2px;
    box-shadow: 0 1px 2px 1px rgba(0,0,0,.08), 0 -1px 3px 0 rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    max-width: 250px;
    padding: 8px;
`;

const Image = styled.img``;

const Nfts = ({nfts}) => {
    return (
        <Box>
            {nfts.map(({ name, image, description }) =>
                (
                    <Card>
                        <Image src={image} alt={name} width={240}/>
                        {name}
                    </Card>
                ))
            }
        </Box>
    )
};

export default Nfts;