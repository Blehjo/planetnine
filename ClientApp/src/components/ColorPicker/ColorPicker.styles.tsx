import styled from 'styled-components';

export const ColorPickerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;


export const BrickContainer = styled.div`
  width: 35px;
`;

export const PickerContainer = styled.div`
  position: absolute;
  top: ~'calc(100% + 35px)';
  left: ~'calc(50% - 15px)';
  display: none;
  // transform: translateX();
`;

export const VisibleContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: ~'calc(50% - 15px)';
`;