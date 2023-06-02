import styled from 'styled-components';

export const SceneContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  pointer-events: none;
  transition: transform @base-transition-time ease-in-out;

  // allow pointer events to all children
  * {
    pointer-events: auto;
  }
`

export const ShiftedContainer = styled.div`
  composes: scene;
  position: relative;
  transform: translate3d(-@shift-amount, 0, 0);
`
