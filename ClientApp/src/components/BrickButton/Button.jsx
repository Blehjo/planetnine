import { ActiveContainer, ButtonContainer, IconContainer, TextContainer } from './Button.styles';

const Button = ({ text, icon, active, onClick }) => (
  <ButtonContainer className={"active ? styles.active : styles.button"} onClick={onClick}>
    <IconContainer>
      <i className={`ion-${icon}`} />
    </IconContainer>
    <TextContainer>
      {text}
    </TextContainer>
  </ButtonContainer>
);


export default Button;
