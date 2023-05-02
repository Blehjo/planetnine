import styled from 'styled-components';

export const PostContainer = styled.div`
  margin: .5rem;
`;

export const PostDashContainer = styled.div`
  margin: 5rem .5rem -4.5rem .5rem;
`;

export const ModalContainer = styled.div`
  background: rgb(20, 20, 35);
  color: white;
  position: relative;
`;

export const CardContainer = styled.div`
  margin-top: 1rem;
`;

export const TextContainer = styled.div`
  padding: 1rem;
`;

export const CommentContainer = styled.div`
  margin: auto;
  position: relative; 
  height: 60%;
  overflow-y: auto;
  width: auto;
`;

export const FormContainer = styled.div`
    @media (min-width: 900px) {
      position: absolute;
      bottom: 0;
      text-align: center;
      color: white;
      margin-top: 3.5rem;
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
        height: 40%;
        position: fixed;
        bottom: 0;
    }
`;