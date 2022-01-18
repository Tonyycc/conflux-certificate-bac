import React from "react";
import styled from "styled-components";

const CardLoader = styled.div`
    background-color: #fff;
    box-shadow: 0 1px 2px 1px rgba(0,0,0,.08), 0 -1px 3px 0 rgba(0,0,0,0.06);
    padding: 8px;
    position: relative;
    border-radius: 2px;
    margin-bottom: 0;
    height: 200px;
    overflow: hidden;
    opacity: 0.7;

    &:only-child {
        margin-top:0;
    }

    &:before {
        content: '';
        height: 110px;
        display: block;
        background-color: #DAFAFC;
        box-shadow: -48px 78px 0 -48px #DAFAFC, -51px 102px 0 -51px #DAFAFC;
    }

    &:after {
    content: '';
    background-color: #333;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    animation-duration: 0.6s;
    animation-iteration-count: infinite;
    animation-name: loader-animate;
    animation-timing-function: linear;
    background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 81%);
    background: -o-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 81%);
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 81%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#00ffffff',GradientType=1 );
    }

    @keyframes loader-animate{
        0%{
            transform: translate3d(-100%, 0, 0);
        }
        100%{
            transform: translate3d(100%, 0, 0);
        }
   }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 16px;
    margin-top: 32px;
`

const LoadingNfts = () => {
    return (
        <>
            <h3>Loading Certificates...</h3>
            <Grid>
                <CardLoader />
                <CardLoader />
                <CardLoader />
                <CardLoader />
                <CardLoader />
            </Grid>
        </>
    );
}

export default LoadingNfts;