import styled from 'styled-components';

export const UserMessageContainer = styled.div`
  margin: auto;
  height: 100vh; 
  width: 100%;
  background: darkgrey; 
  border-radius: .3rem;
  position: fixed;
`;

export const MessageContainer = styled.div`
  height: 100vh; 
  width: 20rem; 
  background: black;
  text-align: center;
  margin-top: 3.5rem;
  color: white;
  float: left;
`;
    
export const MessagebarContainer = styled.div`
  padding-left: 15.5rem;
  float: left;
  z-index: 1;
`;