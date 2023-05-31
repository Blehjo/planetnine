import styled from 'styled-components';

export const MessageContainer = styled.div`
  position: absolute;
  left: @base-margin;
  bottom: @base-margin;
  padding: @base-padding;
  color: @white;
  background: rgba(0,0,0,0.4);
  border-radius: @base-margin;
  font-size: 0.9em;

  > i {
    margin-right: @base-margin-small;
  }
`;
