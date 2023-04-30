import styled from 'styled-components';

export const NotificationsContainer = styled.div`
    .modalIcon {
        font-size: 55px;
    }

    @media (min-width: 718px) {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh; 
        width: 18rem; 
        background: black;
        text-align: center;
        color: white;
        margin-top: 3.5rem;
        float: right;
    }

    @media (max-width: 717px) {
        position: fixed;
        background: black;
        text-align: center;
        bottom: 0;
        left: 0;
        width: 100%;
        margin-left: 4rem;
        margin-top: -2rem;
        height: 12%;
        z-index: 5;
        .notifications {
            visibility: hidden;
        }
        .modalIcon {
            font-size: 55px;
        }
    }
`;

export const SidebarContainer = styled.div`
    z-index: 1;
`;

export const ActionsContainer = styled.div`
    padding: 1rem;
`;

export const IconContainer = styled.div`
    margin: -2rem 1rem 1rem 1rem;
`;

export const CardContainer = styled.div`
    margin: 1rem;
    border-style: solid;
    border-radius: .5rem;
    border-color: white;
    padding: .2rem;
`;