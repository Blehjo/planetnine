import { MessageContainer } from "./Message.styles";

const Message = ({ text, children }) => {
  return (
    <MessageContainer>
      {children}
    </MessageContainer>
  );
}


export default Message;
