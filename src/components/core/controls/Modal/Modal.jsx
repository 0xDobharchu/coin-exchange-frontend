import React from 'react';
import PropTypes from 'prop-types';
// component
import Image from 'src/components/core/presentation/Image';
// style
// import iconBackGray from 'src/assets/images/icon/back-chevron-gray.svg';
import iconBackWhite from 'src/assets/images/wallet/icons/back-chevron-white.svg';
// import iconBackBlue from 'src/assets/images/icon/back-chevron.svg';

import iconRightCancel from 'src/assets/images/icon/icon-cancel.svg';

import cx from 'classnames';
import style from './Modal.scss';

class Modal extends React.Component {
  constructor(props) {    

    super(props);    
    
    // bind
    this.open = this.open.bind(this);
    // eslint-disable-next-line
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.props.hasOwnProperty('onRef') && this.props.onRef(this);
  }

  componentWillUnmount() {
    // eslint-disable-next-line
    this.props.hasOwnProperty('onRef') && this.props.onRef(undefined);
  }

  open() {
    // eslint-disable-next-line
    this.modalRef && this.modalRef.classList.add(style['modal_custom_show']);
  }

  close() {
    // eslint-disable-next-line
    this.modalRef && this.modalRef.classList.remove(style['modal_custom_show']);
    // eslint-disable-next-line
    if (this.props.hasOwnProperty('onClose')) this.props.onClose();
  }

  render() {        
    
    // eslint-disable-next-line
    let modalBodyStyle = this.props.modalBodyStyle || {};

    // eslint-disable-next-line
    let customRightIcon = this.props.customRightIcon;

    const { title, children, hideBackButton } = this.props;

    return (
      // eslint-disable-next-line
      <div className={style.modal} ref={modal => this.modalRef = modal}>
        <div className={style.content}>
          <div className={style.modal_custom_header}>
            {
              // eslint-disable-next-line
              !hideBackButton && <div className={style.boxIconBack} onClick={this.close}><Image className={style.iconBackMobile} src={iconBackWhite} alt="back" /></div>
            }
            {
              title && (<p className={style.modal_custom_title}>{title}</p>)
            }
            {
              customRightIcon && <Image className={cx(style.iconRight, this.iconRightMobile)} src={customRightIcon} onClick={this.props.customRightIconClick} />
            }
            <Image className={style.iconRight + ' ' + style.iconCancelDesktop} src={iconRightCancel} onClick={this.close} alt="back" />
          </div>
          <div className={style.modal_custom_body} style={modalBodyStyle}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  // title: PropTypes.string,
  children: PropTypes.node.isRequired,
  // onRef: PropTypes.func,
  // onClose: PropTypes.func,
  // hideBackButton: PropTypes.bool,

  // custom style:    
  // modalBodyStyle: PropTypes.object, // Modal Body style.

  // right icon + action
  // customRightIcon: PropTypes.any,
  // customRightIconClick: PropTypes.func,
};

export default Modal;
