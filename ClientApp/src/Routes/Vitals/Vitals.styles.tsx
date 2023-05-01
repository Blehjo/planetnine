import styled from 'styled-components';

export const VitalsContainer = styled.div`
  margin: 4rem 21rem 0rem 16.8rem;
  height: 100vh;
  float: left;
  z-index: 2;
  @media (min-width: 900px) {
    margin: 4rem 19rem 0rem 16.8rem;
    overflow-y: auto;
  }
  @media (max-width: 899px) {
    margin: 4rem 1rem 0rem 17rem;
    overflow-y: auto;
  }
  @media (max-width: 717px) {
    margin: 4rem 1rem 0rem 5rem;
    overflow-y: auto;
  }
`;

export const ItemsContainer = styled.div`
  overflow-y: auto;
  margin: auto;
`;