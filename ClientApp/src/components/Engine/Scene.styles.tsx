import styled from 'styled-components';

// @shift-amount: 100px;

export const SceneContainer = styled.div`
  position: absolute;
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
  transform: translate3d(-@shift-amount, 0, 0);
`
