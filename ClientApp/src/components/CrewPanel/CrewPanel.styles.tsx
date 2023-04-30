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
        margin-left: 15.65rem;
        bottom: 0;
        left: 0;
        height: 18%;
        z-index: 5;
        .notifications {
            visibility: hidden;
        }
    }

    @media (max-width: 767px) {
        position: fixed;
        background: black;
        text-align: center;
        margin-left: 4rem;
        bottom: 0;
        left: 0;
        height: 18%;
        z-index: 5;
        .notifications {
            visibility: hidden;
        }
    }
`;