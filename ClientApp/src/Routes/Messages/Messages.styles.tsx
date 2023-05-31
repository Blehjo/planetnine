import styled from 'styled-components';

export const UserMessageContainer = styled.div`
  height: 90vh;
  margin-left: .5rem;
  margin-bottom: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  background: #d4d4d4;
  border-radius: .2rem;
  text-align: center;
  @media (max-width: 994px) {
    height: 79vh;
  }
  @media (max-width: 767px) {
    margin-left: 12rem;
    height: 20vh;
  }
  @media (max-width: 717px) {
    margin-left: .5rem;
    height: 20vh;
  }
`;

export const MessageContainer = styled.div`
  position: relative;
  border-radius: .3rem;
  z-index: 2;
`;

export const CollectionContainer = styled.div`
  height: 90vh;
  margin-left: .5rem;
  margin-bottom: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  background: #d4d4d4;
  border-radius: .2rem;
  text-align: center;
  @media (max-width: 994px) {
    height: 79vh;
  }
  @media (max-width: 767px) {
    margin-left: 12rem;
    height: 20vh;
  }
  @media (max-width: 717px) {
    margin-left: .5rem;
    height: 20vh;
  }
`;
    
export const MessagebarContainer = styled.div`
  margin: 4rem 16.5rem 0rem 16rem;
  float: left;
  z-index: 2;
  @media (min-width: 995px) {
    margin: 4rem 18.5rem 0rem 16rem;
  }
  @media (max-width: 994px) {
    margin: 4rem 1rem 0rem 16rem;
  }
  @media (max-width: 767px) {
    margin: 4rem 1rem 0rem 5rem;
  }
`;

export const FormContainer = styled.div`
  position: relative;
  background: #d4d4d4;
  overflow-y: hidden;
  overflow-x: hidden;
  border-radius: .2rem;
  height: 90vh;
  @media (max-width: 994px) {
    height: 79vh;
  }
  @media (max-width: 767px) {
    margin-left: 12rem;
    margin-bottom: 15rem;
    height: 58vh;
  }
  @media (max-width: 717px) {
    margin-left: .5rem;
    margin-bottom: 15rem;
    height: 60vh;
  }
`;