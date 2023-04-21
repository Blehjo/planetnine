import styled from 'styled-components';

export const UserMessageContainer = styled.div`
  height: 100vh; 
  position: relative;
  background: darkred; 
  border-radius: .3rem;
  padding: 4rem;
  margin-left: 18rem;
  z-index: 2;
`;

export const MessageContainer = styled.div`
  height: 100vh; 
  width: 18rem; 
  background: darkred;
  text-align: center;
  margin-top: 3.5rem;
  color: black;
  float: left;
  z-index: 2;
`;
    
export const MessagebarContainer = styled.div`
  margin-left: 15.5rem;
  margin-right: 25rem;
  float: left;
  z-index: 2;
`;

export const FormContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  margin-left: 3rem;
`;