import React from 'react';
import { autobind } from 'autobind-decorator';

import styles, { InputContainer, WrapperContainer } from './FileUploader.styles';


class FileUploader extends React.Component {
  state = {}

  render() {
    const { children } = this.props;
    return (
      <WrapperContainer className={"styles.wrapper"}>
        <InputContainer>
        <input key="input" className={"styles.input"} type="file" onChange={(e) => this._handleFileChange(e)} />
        </InputContainer>
        {children}
      </WrapperContainer>
    );
  }

  // @autobind
  _handleFileChange(e) {
    e.preventDefault();
    const { onFinish } = this.props;
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      const uri = reader.result;
      const decoded = JSON.parse(uri);
      console.log('done reading');
      onFinish(decoded);
    }
    reader.readAsText(file);
    console.log('end of code');
  }
}


export default FileUploader;
