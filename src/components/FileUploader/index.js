import React from 'react';
import DropzoneComponent from 'react-dropzone-component';

export default class FileUploader extends React.Component {
  constructor(props) {
    super(props);

    this.djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: 'image/jpeg,image/png,image/gif'
    };

    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: 'http://35.198.235.226:2203/uploadHandler',
    };

    // If you want to attach multiple callbacks, simply
    // create an array filled with all your callbacks.
    this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

    // Simple callbacks work too, of course
    this.callback = () => console.log('Hello!');

    this.success = file => {
      console.log('uploaded', file.name);
      this.props.onSuccess('https://storage.googleapis.com/coin-exchange-staging/' + file.name);
    };
    this.progress = file => console.log('progress', file);

    this.removedfile = file => {
      console.log('removing...', file);
      this.props.onRemove();
    };
    this.dropzone = null;
  }

  render() {
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;

    // For a list of all possible events (there are many), see README.md!
    const eventHandlers = {
      init: dz => this.dropzone = dz,
      drop: this.callbackArray,
      addedfile: this.callback,
      success: this.success,
      removedfile: this.removedfile,
      uploadprogress: this.progress
    };
    return (<DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />);
  }
}
