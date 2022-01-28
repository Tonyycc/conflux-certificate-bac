import React from "react";
import styled from "styled-components";

const LoaderWrapper = styled.div`
    border-radius: 50%;
    width: 24px;
    height: 24px;
    border: .25rem solid rgba(255,255,255, 0.2);
    border-top-color: rgb(255,255,255);
    animation: spin 1s infinite linear;

    @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
    }
`;

const Loader = (props) => {
  return (
    <LoaderWrapper {...props}>
      
    </LoaderWrapper>
  );
};

export default Loader;
