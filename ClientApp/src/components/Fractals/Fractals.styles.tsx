import styled from "styled-components";

export const FractalTreeContainer = styled.div`
    position: relative;
    height: 100vh;
`;

export const FractalGUIContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`;

export const ControllerContainer = styled.div`
  display: flex;
  opacity: .5;
  position: absolute;
  top: 0;
  left: 0;
`;

export const ButtonContainer = styled.div`
  justify-content: space-between;
  margin: .2rem;
`;

export const DragStyle = styled.input`
  -webkit-appearance: none;
  background: #f5f6fa;
  margin-top: 2em;
  margin-left: 0em;
  width: 20em;
  height: 1em;
  border-radius: 1em;
  cursor: pointer;
  box-shadow: 0px 0.5px 0.75px black;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 2px solid white;
    height: 25px;
    width: 25px;
    opacity: 0.8;
    border-radius: 50%;
    background: gray;
  }
`;