import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  h2 {
    margin: 10px 0;
  }
`;

export const AiContainer = styled.div`
  margin-left: 12rem;
  margin-right: 21.5rem;
  float: left;
  z-index: 2;
`;

export const UserAiContainer = styled.div`
  height: 100vh; 
  position: relative;
  border-radius: .3rem;
  padding: 4rem;
  z-index: 2;
`;

export const CrewContainer = styled.div`
  margin-bottom: 1rem;
  overflow-y: auto;
  background: #d4d4d4;
  border-radius: .2rem;
  text-align: center;
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

`;

export const ChatContainer = styled.div`
  background: white;
  margin: 1rem;
  padding: .5rem;
  border-radius: .2rem
`;

export const TextBox = styled.div`
  position: absolute;
  bottom: 0;
`;

export const FirstColumnContainer = styled.div`
  height: 100vh; 
  background: white;
  text-align: center;
  margin-top: 3.5rem;
  color: black;
  float: left;
  z-index: 2;
`;