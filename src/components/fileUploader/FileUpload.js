import React from 'react';
import Dropzone from 'react-dropzone';
import { uploadFile } from 'src/screens/auth/redux/api';
import style from './fileUpload.scss';

class FileUpload extends React.Component {
  
  state = {
    files: []
  }

  handleOnDrop = (files) => {
    this.setState({
      files: files.map(file => ({
        ...file,
        preview: URL.createObjectURL(file)
      }))
    });
    uploadFile(files[0]).then(({ url }) => {
      console.log('results is', url);
      // eslint-disable-next-line
      const { onSuccess } = this.props;
      if (typeof onSuccess === 'function') {
        onSuccess(url);
      } 
    }).catch(err => err);
  }

  handleRemove = () => {
    this.setState({ files : [] });
    // eslint-disable-next-line
    const { onRemove } = this.props;
    if (typeof onRemove === 'function') {
      onRemove();
    }
  }
  
  componentWillUnmount() {
    const {files} = this.state;
    for (let i = files.length; i >= 0; i--) {
      const file = files[0];
      URL.revokeObjectURL(file.preview);
    }
  }

  handleOnCancel = () => this.setState({ files : [] });
  render() {
    return (
      <div className={style.container}>
        {this.state.files.length === 0 && (
        <Dropzone className={style.dropzone} multiple={false} onDrop={this.handleOnDrop} onFileDialogCancel={this.handleOnCancel}>
          <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>)}
        {this.state.files.map((file, i) => (<img alt="f" key={i} src={file.preview} />))}
        {this.state.files.length > 0 && <button type="button" onClick={this.handleRemove}>Remove</button>}
      </div>
    );
  }
}

export default FileUpload;
