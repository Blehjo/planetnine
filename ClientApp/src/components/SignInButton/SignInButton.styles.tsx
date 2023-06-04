import styled from 'styled-components';

export const DropdownContainer = styled.div`
    position: fixed;
    top: 4rem;
    right: 2rem;
    height: auto;
    text-align: left;
    width: 12rem;
    padding: 1rem;
    background: black;
    border-radius: .5rem;
    border: solid;
    div {
        margin-bottom: .5rem;
        cursor: pointer;
    }
    @media (max-width: 576px) {
        display: none;
    }
`;

export const ModalContainer = styled.div`
    position: fixed;
    top: 15%;
    height: auto;
    width: 15rem;
    padding: 1rem;
    background: black;
    border: solid;
    border-radius: .5rem;
    left: 50%;
    transform: translate(-50%, 0);
    div {
        margin: 1rem;
        cursor: pointer;
    }
`;