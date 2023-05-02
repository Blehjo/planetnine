import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
`;

export const AiContainer = styled.div`
  margin: 4rem 16.5rem 0rem 16rem;
  float: left;
  z-index: 2;
  @media (min-width: 995px) {
    margin: 4rem 16.5rem 0rem 16rem;
  }
  @media (max-width: 994px) {
    margin: 4rem 1rem 0rem 16rem;
  }
  @media (max-width: 767px) {
    margin: 4rem 1rem 0rem 5rem;
  }
`;

export const UserAiContainer = styled.div`
  position: relative;
  border-radius: .3rem;
  z-index: 2;
`;

export const CrewContainer = styled.div`
  height: 90vh;
  margin-left: .5rem;
  margin-bottom: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  background: #d4d4d4;
  border-radius: .2rem;
  text-align: center;
  @media (max-width: 767px) {
    margin-left: 12rem;
    height: 20vh;
  }
  @media (max-width: 717px) {
    margin-left: .5rem;
    height: 20vh;
  }
`;

export const HeadingContainer = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  background: white;
  margin: 1rem;
  padding: .5rem;
  border-radius: .2rem;
  
`;

export const FormContainer = styled.div`
  position: relative;
  background: #d4d4d4;
  overflow-y: hidden;
  overflow-x: hidden;
  border-radius: .2rem;
  height: 90vh;
  @media (max-width: 767px) {
    margin-left: 12rem;
    margin-bottom: 15rem;
    height: 60vh;
  }
  @media (max-width: 717px) {
    margin-left: .5rem;
    margin-bottom: 15rem;
    height: 60vh;
  }
`;

export const ChatContainer = styled.div`
  background: white;
  margin: 1rem;
  padding: .5rem;
  border-radius: .2rem
`;

export const TextBox = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  width: 100%;
  margin: 1rem;
`;

export const FirstColumnContainer = styled.div`
  text-align: center;
  color: black;
  z-index: 2;
`;

export const DropdownContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 1rem;
`;