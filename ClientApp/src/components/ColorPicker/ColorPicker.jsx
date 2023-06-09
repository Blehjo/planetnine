import { GithubPicker } from 'react-color';

import { SimpleBrick } from '../Icons/Icons';
import { colors } from '../../utils/threejs/constants';

import { BrickContainer, ColorPickerContainer, PickerContainer, VisibleContainer } from './ColorPicker.styles';
import { Component } from 'react';


class ColorPicker extends Component {
  state = {
    open: false,
  }

  constructor(props) {
    super(props);
    this._handleChangeColor = this._handleChangeColor.bind(this);
    this._togglePicker = this._togglePicker.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);
  }

  componentDidMount() {
    const { background } = this.props;
    document.addEventListener('mousedown', this._handleClickOutside);
    this.setState({
      background,
    });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClickOutside);
  }

  _handleChangeColor(color) {
    const { handleSetColor } = this.props;
    handleSetColor(color.hex);
    this._togglePicker();
  }

  _handleClickOutside(event) {
    const { background } = this.props;
    if (this.picker && !this.picker.contains(event.target)) {
      this.setState({
        open: false,
        background,
      });
    }
  }

  _togglePicker() {
    const { background } = this.props;
    this.setState({
      open: !this.state.open,
      background
    });
  }

  render() {
    const { background, open } = this.state;
    return (
      <ColorPickerContainer>
        <BrickContainer onClick={this._togglePicker}>
          <SimpleBrick color={background} />
        </BrickContainer>
        {
          open &&
          <VisibleContainer ref={(picker) => this.picker = picker}>
          <GithubPicker
            color={background}
            colors={colors}
            onChangeComplete={this._handleChangeColor}
            onSwatchHover={(color) => this.setState({ background: color.hex })}
          />
          </VisibleContainer> 
        }
      </ColorPickerContainer>
    );
  }
}


export default ColorPicker;
