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
  @media (min-width: 900px) {
    margin-right: 18rem;
    color: white;
    height: 92vh;
    overflow-y: auto;
  }
  @media (max-width: 899px) {
    margin-right: 0rem;
    margin-bottom: 8rem;
  }
`;
    
export const FixedMoonContainer = styled.div`
h1 {
  align: left !important;
  float: left;
}
margin-right: 18rem;
background: darkred;
height: 100vh;
float: left;
z-index: 2;
@media (max-width: 899px) {
    h1 {
      align: left !important;
      float: left;
    }
    margin-right: 0rem;
  }
`;