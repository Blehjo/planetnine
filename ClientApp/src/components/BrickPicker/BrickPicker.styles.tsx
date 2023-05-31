import styled from 'styled-components';

// @brick-height: 60px;
// @tip-size: 7px;


export const BrickPickerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const BrickContainer = styled.div`
  color: white;
  height: .2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

export const BrickIconContainer = styled.div`
  height: 40px;
  // margin-right: @base-margin-small;
`;

export const PickerContainter = styled.div`
  position: absolute;
  top: (@brick-height + @base-margin + 5px);
  left: -(@base-margin / 2);
  padding: base-padding;
  background: secondary-blue;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  border: 1px solid primary-blue;

  &:after {
    content: ' ';
    position: absolute;
    top: -(@tip-size);
    left: @base-margin;
    border-left: @tip-size solid transparent !important;
    border-right: @tip-size solid transparent !important;
    border-bottom-width: @tip-size;
    border-bottom-style: solid;
    border-color: @secondary-blue;
  }
`;

export const BrickExampleContainer = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:last-child {
    margin-right: 0;
  }
`;

export const BrickThumb = styled.div`
  height: 50px;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 3px 7px rgba(0,0,0,0.6);
  transition: all base-transition-time ease-in-out;

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
    box-shadow: 0px 5px 10px rgba(0,0,0,0.4);
  }
`;

export const SelectedContainer = styled.div`
  composes: brickThumb;
  background-color: tertiary-blue;
`;

export const LabelContainer = styled.div`
  color: white;
`;