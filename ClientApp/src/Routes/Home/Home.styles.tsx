import styled from 'styled-components';

export const HomeContainer = styled.div`
  position: fixed;
  left: 16.5rem;
  display: flex;
  height: 100vh;
  width: auto;
  right: .5rem;
  flex-direction: column;
  background-image: url("https://cdn.pixabay.com/photo/2014/12/27/16/38/planet-581239_1280.jpg");

  background-size: cover;
  @media (max-width: 717px) {
    left: 4.5rem;
  }
`;

export const TextContainer = styled.div`
  height: 75%;
  width: 75%;
  margin: auto;
  font-size: 200%;
  overflow-y: auto;
`;