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
    border-width: .1px;
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
    border-width: .1px;
    left: 50%;
    transform: translate(-50%, 0);
    div {
        text-align: left;
        margin: 1rem;
        cursor: pointer;
    }
`;