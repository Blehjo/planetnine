import styled from 'styled-components';

// @button-color-default: fade(@text-color-secondary, 40);

export const ButtonContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all @base-transition-time ease-in-out;
  font-size: 30px;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;

export const ActiveContainer = styled.div`
  composes: button;
  color: @text-color-secondary;
  background: @secondary-blue;
  box-shadow: inset -2px 0px 3px rgba(0, 0, 0, 0.25), inset 2px 0px 3px rgba(0, 0, 0, 0.25);
`;

export const IconContainer = styled.div`
  font-family: 'ionicons';
  font-size: 1.5em;
  margin-bottom: @base-margin-small;
`;

export const TextContainer = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.65em;
`;