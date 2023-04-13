import styled from 'styled-components';

export const MoonContainer = styled.div`
  margin: auto;
  height: 100vh; 
  background: darkgrey;
  border-radius: .3rem;
`;

export const MoonBarContainer = styled.div`
    height: 100vh; 
    width: 100%;
    background: darkgrey; 
    border-radius: .3rem;
    position: fixed;
    padding: 4rem;
    margin-left: 17rem;
    margin-right: 100rem;
`;

export const MoonPanelContainer = styled.div`
  background: darkred;
  margin-top: 3.5rem;
  color: white;
  height: 100vh;
  overflow-y: auto;
  padding-left: 15.5rem;
`;
    
export const FixedMoonContainer = styled.div`
  margin-right: 25rem;
  float: left;
  z-index: 2;
`;