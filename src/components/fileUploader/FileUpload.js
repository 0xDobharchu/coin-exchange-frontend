import React from 'react';
import Dropzone from 'react-dropzone';
import { LabelLang } from 'src/lang/components';
import { uploadFile } from 'src/screens/auth/redux/api';
import style from './fileUpload.scss';

class FileUpload extends React.Component {
  
  state = {
    url: '',
  }

  handleOnDrop = (files) => {
    uploadFile(files[0]).then(({ url }) => {
      console.log('results is', url);
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
    return (
      <div className={style.container}>
        {!this.state.url && (
        <Dropzone className={style.dropzone} multiple={false} onDrop={this.handleOnDrop} onFileDialogCancel={this.handleOnCancel}>
          <p><LabelLang id="app.common.fileupload" /></p>
        </Dropzone>)}
        {this.state.url && (<img alt="f" src={this.state.url} />)}
        {this.state.url && <button type="button" onClick={this.handleRemove}><LabelLang id="app.common.remove" /></button>}
      </div>
    );
  }
}

export default FileUpload;
