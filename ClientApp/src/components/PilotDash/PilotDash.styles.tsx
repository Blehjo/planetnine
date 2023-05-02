import styled from "styled-components";

export const PilotDashContainer = styled.div`
    margin: auto;
    height: 30vh; 
    background: red; 
    border-radius: .3rem;
    overflow-y: auto;
    @media (max-width: 991px) {
        margin-bottom: 3rem;
    }
    @media (max-width: 899px) {
        margin-bottom: 7rem;
    }
    @media (max-width: 770px) {
        margin-bottom: 8rem;
    }
`;

export const MarginContainer = styled.div`
    margin: 5rem 1rem 5rem 1rem;
`;

export const PilotContainer = styled.div`
    margin-top: 1rem;
`;

export const HeaderContainer = styled.div`
    position: fixed;
    color: white;
    background: black;
    padding: 1rem;
    margin: .5rem;
    opacity: 0.7;
    border-radius: .5rem;
`;