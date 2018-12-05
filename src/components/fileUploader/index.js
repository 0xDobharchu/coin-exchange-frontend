import React from 'react';
import Dropzone from 'react-dropzone';
import { LabelLang } from 'src/lang/components';
import { uploadFile } from 'src/screens/auth/redux/api';
import style from './fileUpload.scss';

export const RECEIPT_TYPE = 'receipt';
export const VERIFICATION_TYPE = 'verification';

class FileUpload extends React.Component {
  
  state = {
    url: '',
  }

  handleOnDrop = (files) => {
    // eslint-disable-next-line
    const { type } = this.props;
    const uploadType = type || VERIFICATION_TYPE;
    uploadFile(files[0], uploadType).then(({ url }) => {
      // eslint-disable-next-line
      const { onSuccess } = this.props;
      this.setState({ url });
      if (typeof onSuccess === 'function') {
        onSuccess(url);
      } 
    }).catch(err => err);
  }

  handleRemove = () => {
    this.setState({ url : '' });
    // eslint-disable-next-line
    const { onRemove } = this.props;
    if (typeof onRemove === 'function') {
      onRemove();
    }
  }

  handleOnCancel = f => f
  
  render() {
    const { url } = this.state;
    return (
      <div className={style.container}>
        {!url && (
        <Dropzone className={style.dropzone} multiple={false} onDrop={this.handleOnDrop} onFileDialogCancel={this.handleOnCancel}>
          <p><LabelLang id="app.common.fileupload" /></p>
        </Dropzone>)}
        {url && (<img alt={url} src={url} />)}
        {url && (
        <button type="button" onClick={this.handleRemove}>
          <LabelLang id="app.common.remove" />
        </button>)}
      </div>
    );
  }
}

export default FileUpload;