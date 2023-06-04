import React from 'react';
import If from 'if-only';
import isEqual from 'lodash/isEqual';

import { displayNameFromDimensions, getBrickIconFromDimensions } from '../../utils/index';
import { bricks } from '../../utils/threejs/constants';

import { BrickContainer, BrickExampleContainer, BrickIconContainer, BrickPickerContainer, BrickThumb, LabelContainer, PickerContainter, SelectedContainer } from './BrickPicker.styles';

class BrickPicker extends React.Component {
  state = {
    open: false,
  }

  constructor(props) {
    super(props);
    this._togglePicker = this._togglePicker.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this._handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClickOutside);
  }

  render() {
    const { selectedSize, handleSetBrick } = this.props;
    const { open } = this.state;
    // console.log("Bricks: ",  bricks)
    return (
      <BrickPickerContainer>
        <BrickContainer onClick={this._togglePicker}>
          <BrickIconContainer>
            {getBrickIconFromDimensions(selectedSize)}
          </BrickIconContainer>
        </BrickContainer>
        {
          open &&
          <PickerContainter ref={(picker) => this.picker = picker}>
            {bricks.map((b, i) => (
              <BrickExampleContainer key={i}>
                <div onClick={() => handleSetBrick(b)}>
                  {
                    isEqual(selectedSize, b) ?
                    <SelectedContainer>
                      {getBrickIconFromDimensions(b)}
                    </SelectedContainer> :
                    <BrickThumb>
                      {getBrickIconFromDimensions(b)}
                    </BrickThumb>
                  }
                </div>
                <LabelContainer>
                  {/* {getBrickIconFromDimensions(b)} */}
                  {displayNameFromDimensions(b)}
                </LabelContainer>
              </BrickExampleContainer>
            ))}
          </PickerContainter>

        }
      </BrickPickerContainer>
    );
  }

  _togglePicker() {
    this.setState({
      open: !this.state.open
    });
  }

  _handleClickOutside(event) {
    if (this.picker && !this.picker.contains(event.target)) {
      // this.setState({
      //   open: false,
      // });
    }
  }
}


export default BrickPicker;
