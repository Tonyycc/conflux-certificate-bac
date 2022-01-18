import React from "react";
import styled from "styled-components";

export const StyledButton = styled.button`
    padding: 8px 16px;
    border: none;
    border-radius: 32px;
    cursor: pointer;
    outline: none;
    font-weight: bold;

    &:hover { 
        opacity: 0.8;
    }
`;

const Button = ({
    children,
    leftIcon,
    rightIcon,
    props,
}) => {
    return (
        <StyledButton {...props}>
            {leftIcon && leftIcon}
            {children}
            {rightIcon && rightIcon}
        </StyledButton>
    )
};

export default Button;