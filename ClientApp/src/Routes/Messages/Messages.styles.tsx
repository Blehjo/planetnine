import styled from 'styled-components';

export const UserMessageContainer = styled.div`
  height: 100vh; 
  width: 100%;
  background: darkgrey; 
  border-radius: .3rem;
  position: fixed;
  margin-left: 17rem;
  margin-right: 100rem;
`;

export const MessageContainer = styled.div`
  height: 100vh; 
  width: 18rem; 
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