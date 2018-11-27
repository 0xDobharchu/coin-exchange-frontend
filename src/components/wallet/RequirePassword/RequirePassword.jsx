import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';

import {connect} from "react-redux";

import InputMobile from '../InputMobile'

import Button from 'src/components/core/controls/Button';

import { Modal } from 'react-bootstrap';

import  style from './RequirePassword.scss';
import { hideRequirePassword } from 'src/screens/app/redux/action';


class RequirePassword extends React.Component {
  
  static propTypes = {
    app: PropTypes.object,  
    onFinish: PropTypes.func,
    intl: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    

    this.state = {   
      isShowPassword: false,    
      password: '',
      onFinish: null,                        
    }
  }


  componentWillReceiveProps(nextProps) { 
    let props = nextProps.app.passwordData || {}; 
    if (props.isShow)
      this.setState({isShowPassword: true, onFinish: props.onFinish})               
    else{
      this.setState({password: ''});
    }
  }
   
  componentDidMount() {    
    
  }  

  onFinish = () => {
    const { onFinish } = this.state;
    
    if (onFinish) {
      onFinish(this.state.password);
      this.onClose();
    }
    else{

    }
  }   

  onClose=() => {   
  this.setState({ isShowPassword: false, password: ''}, () => {
    this.props.hideRequirePassword();
  });    
}

onPasswordChange=(e)=>{
  let password = e.target.value;
  this.setState({password})
}
_handleKeyPress=(e)=> {
  if (e.key === 'Enter') {
    this.onFinish();
  }
}

render() {  
  
  const { messages } = this.props.intl;  
  
  return (                   
        <Modal 
          show={this.state.isShowPassword} 
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={this.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>{messages['requirePassword.title']}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p>{messages['requirePassword.description']}</p>
              <InputMobile onKeyPress={this._handleKeyPress} value={this.state.password} placeholder="Your password..." onChange={(evt) => {this.onPasswordChange(evt)}} />
              
              <Button disabled={this.state.password.trim().length < 8} className={"btn-block " + style.buttonUnlock} variant="primary" onClick={this.onFinish}>{messages['requirePassword.btnUnlockText']}</Button>
              
            </div>            
          </Modal.Body>                                            
        </Modal>
    )
  }
}

const mapState = state => ({
  app: state.app,
});

const mapDispatch = ({
  hideRequirePassword
});

export default injectIntl(connect(mapState, mapDispatch)(RequirePassword));