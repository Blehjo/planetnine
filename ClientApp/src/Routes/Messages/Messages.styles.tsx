import styled from 'styled-components';

export const UserMessageContainer = styled.div`
  height: 92vh; 
  position: relative;
  background: darkred; 
  padding: 4rem;
  margin-top: 3.5rem;
  margin-left: 16rem;
  z-index: 2;
`;

export const MessageContainer = styled.div`
  height: 92vh; 
  width: 18rem; 
  background: darkred;
  text-align: center;
  margin-top: 3.5rem;
  margin-left: 1rem;
  color: black;
  float: left;
  z-index: 2;
`;

export const CollectionContainer = styled.div`
  height: 92vh;
`;
    
export const MessagebarContainer = styled.div`
  margin: .5rem 18.5rem 0rem 15.5rem;
  float: left;
  z-index: 2;
  @media (min-width: 900px) {
    margin: .5rem 18.5rem 0rem 15.5rem;
  }
  @media (max-width: 899px) {
    margin: 0rem;
    padding: 0rem;
  }
`;

export const FormContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  margin-left: 3rem;
  @media (max-width: 899px) {
    bottom: 5rem;
  }
`;