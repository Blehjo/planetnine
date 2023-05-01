import styled from "styled-components";

export const SideContainer = styled.div`
    @media (min-width: 718px) {
        display: flex;
        font-size: 15px;
        width: 16rem;
        color: white; 
        height: 100vh;
        overflow-y: auto;
        margin-top: 3rem; 
        overflow-x: hidden;
        .icons {
            font-size: 20px;
        }
    }

    @media (max-width: 717px) {
        display: flex;
        height: 100vh;
        width: 4rem;
        color: white;
        padding-top: 1rem;
        .icons {
            font-size: 20px;
            margin: -.2rem;
        }
        .ms-4 {
            display: none;
        }
    }
`;  