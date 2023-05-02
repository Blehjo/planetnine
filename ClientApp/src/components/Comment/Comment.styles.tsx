import styled from "styled-components";

export const CommentContainer = styled.div`
    .modalIcon {
        font-size: 55px;
    }

    @media (min-width: 900px) {
        position: fixed;
        top: 0;
        right: 0;
        height: 75vh; 
        width: 18rem; 
        background: black;
        text-align: center;
        color: white;
        margin-top: 3.5rem;
        float: right;
        overflow-y: auto;
    }

    @media (max-width: 899px) {
        position: fixed;
        background: black;
        text-align: center;
        bottom: 0;
        left: 0;
        width: 100%;
        margin-left: 16rem;
        padding-right: 16rem;
        height: 50vh;
        z-index: 5;
        overflow-y: auto;
        .notifications {
            display: none;
        }
        .modalicons {
            margin-top: 1rem;
        }
        .modalIcon {
            font-size: 55px;
        }
    }
    @media (max-width: 717px) {
        position: fixed;
        background: black;
        text-align: center;
        bottom: 0;
        left: 0;
        width: 100%;
        margin-left: 4rem;
        padding-right: 4rem;
        padding-bottom: 8rem;
        height: 50vh;
        overflow-y: auto;
        z-index: 5;
        .notifications {
            display: none;
        }
        .modalicons {
            margin-top: 1rem;
        }
        .modalIcon {
            font-size: 55px;
        }
    }
    @media (max-width: 500px) {
        height: 40%;
    }
`;

export const CommentBarContainer = styled.div`
    z-index: 1;
    @media (min-width: 900px) {
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
        overflow-y: auto;
    }

    @media (max-width: 899px) {
        position: fixed;
        background: black;
        text-align: center;
        bottom: 0;
        left: 0;
        width: 100%;
        margin-left: 16rem;
        padding-right: 16rem;
        height: 50vh;
        z-index: 5;
        overflow-y: auto;

    }
    @media (max-width: 717px) {
        position: fixed;
        background: black;
        text-align: center;
        bottom: 0;
        left: 0;
        width: 100%;
        margin-left: 4rem;
        padding-right: 4rem;
        padding-bottom: 8rem;
        height: 50vh;
        overflow-y: auto;
        z-index: 5;
    }
    @media (max-width: 500px) {
        height: 40%;
    }
`;

export const CardContainer = styled.div`
    margin: 1rem;
    border-style: solid;
    border-radius: .5rem;
    border-color: white;
    padding: .2rem;
`;

export const FormContainer = styled.div`
    @media (min-width: 900px) {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 18rem; 
        background: black;
        text-align: center;
        color: white;
        margin-top: 3.5rem;
        float: right;
    }
    
    @media (max-width: 899px) {
        position: fixed;
        bottom: 0;
        left: 16rem;
        padding-right: 16rem;
        width: 100%;
        background: black;
        z-index: 5;
    }

    @media (max-width: 717px) {
        position: fixed;
        background: black;
        text-align: center;
        bottom: 0;
        left: 0;
        width: 100%;
        margin-left: 4rem;
        padding-right: 4rem;
        height: 15%;
        z-index: 5;
        .notifications {
            display: none;
        }
        .modalicons {
            margin-top: 1rem;
        }
        .modalIcon {
            font-size: 55px;
        }
    }
    
    @media (max-width: 500px) {
        position: fixed;
        bottom: 0;
    }
`;

export const InnerComments = styled.div`
    height: 75vh;
    overflow-y: auto;
`;