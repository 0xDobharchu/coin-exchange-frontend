import React from 'react';
import Dropzone from 'react-dropzone';
import { LabelLang } from 'src/lang/components';
import { uploadFile } from 'src/screens/auth/redux/api';
import style from './fileUpload.scss';

export const RECEIPT_TYPE = 'receipt';
export const VERIFICATION_TYPE = 'verification';

class FileUploadField extends React.Component {
  
  handleOnDrop = (files) => {
    // eslint-disable-next-line
    const { type, input : { value: url, onChange } } = this.props;
    const uploadType = type || VERIFICATION_TYPE;
    uploadFile(files[0], uploadType).then(({ url }) => {
      // eslint-disable-next-line
      onChange(url);
    }).catch(err => err);
  }

  handleRemove = () => {
    // eslint-disable-next-line
    const { type, input : { onChange } } = this.props;
    onChange('');
  }

  handleOnCancel = f => f
  
  render() {
    // eslint-disable-next-line
    const { input : { value: url, onChange } } = this.props;
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

export default FileUploadField;