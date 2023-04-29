import styled from 'styled-components';

export const PlanetContainer = styled.div`
  margin: auto;
  height: 100vh; 
  background: darkgrey;
  border-radius: .3rem;
`;

export const PlanetBarContainer = styled.div`
    height: 100vh; 
    width: 100%;
    background: darkgrey; 
    border-radius: .3rem;
    position: fixed;
    padding: 4rem;
    margin-left: 17rem;
    margin-right: 100rem;
`;

export const PlanetPanelContainer = styled.div`
  margin-top: 3.5rem;
  color: white;
  height: 92vh;
  overflow-y: auto;
  padding-left: 15.5rem;
`;
    
export const FixedContainer = styled.div`
  margin-right: 20rem;
  background: darkred;
  height: 100vh;
  float: left;
  z-index: 2;
`;