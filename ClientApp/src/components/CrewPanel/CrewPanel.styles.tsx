import styled from 'styled-components';

export const CrewContainer = styled.div`
    @media (min-width: 995px) {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh; 
        width: 16rem; 
        background: black;
        text-align: center;
        color: white;
        margin-top: 3.5rem;
        float: right;
    }

    @media (max-width: 994px) {
        position: fixed;
        background: black;
        text-align: center;
        margin-left: 16rem;
        padding-right: 16rem;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 10%;
        z-index: 5;
        .notifications {
            display: none;
        }
    }

    @media (max-width: 717px) {
        position: fixed;
        background: black;
        text-align: center;
        margin-left: 4rem;
        padding-right: 4rem;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 7%;
        z-index: 5;
        .notifications {
            display: none;
        }
    }
`;