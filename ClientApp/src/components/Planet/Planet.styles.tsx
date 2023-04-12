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
    height: 100vh; 
    width: 100%;
    background: darkred;
    margin-top: 3.5rem;
    color: white;
    float: left;
`;
    
export const FixedContainer = styled.div`
  padding-left: 15.5rem;
  padding-right: 25rem;
  float: left;
  z-index: 1;
`;