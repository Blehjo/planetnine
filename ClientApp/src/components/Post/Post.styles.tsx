import styled from 'styled-components';

export const PostContainer = styled.div`
  margin: .5rem;
  position: relative;
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
  height: 37.5rem;
  overflow-y: auto;
  overflow-x: hidden;
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
      text-align: center;
      margin-left: 4rem;
      margin-bottom: 10rem;
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
      margin-bottom: 10rem;
    }
`;