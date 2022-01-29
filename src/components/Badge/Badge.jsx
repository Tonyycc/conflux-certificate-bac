import React from "react";
import styled from "styled-components";

const BadgeWrapper = styled.div`
    background: white;
    border: 1px solid rgba(4, 4, 5, 0.1);;
    border-radius: 16px;
    display: flex;
    padding: 8px;
    flex-direction: column;
    cursor: pointer;

    &:hover {
        border: 1px solid rgba(4, 4, 5, 0.5);;
    }
`

const Title = styled.span`
    font-size: 12px;
    color: blue;
    font-weight: bold;
`

const Content = styled.p`
    font-size: 10px;
`

const Badge = (props) => {
    const { title, content } = props;
    return (
        <BadgeWrapper>
            <Title>{title}</Title>
            <Content>{content}</Content>
        </BadgeWrapper>
    )
};

export default Badge;
