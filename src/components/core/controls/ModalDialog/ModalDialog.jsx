import React from 'react';
import PropTypes from 'prop-types';
// style
import style from './ModalDialog.scss';

class ModalDialog extends React.Component {
  constructor(props) {
    super(props);
    // bind
    this.open = :: this.open;
    this.close = :: this.close;
    this.onClosePanel = :: this.onClosePanel;
  }

  componentDidMount() {
    this.props.hasOwnProperty('onRef') && this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.hasOwnProperty('onRef') && this.props.onRef(undefined);
  }

  onClosePanel() {
    if (this.props.isDismiss) {
      this.close();
    }
  }

  open() {
    this.modalRef && this.modalRef.classList.add(style['modal-custom-show']);
    this.contentRef && this.contentRef.classList.add(style['zoomIn']);
    this.currentOffset = window.scrollY;
    document.body.classList.add(style['hide-scroll']);
    const freezeStyle = 'height: 100%; position: fixed; width: 100%';
    document.body.setAttribute('style', freezeStyle);
  }

  close() {
    this.modalRef && this.modalRef.classList.remove(style['modal-custom-show']);
    this.contentRef && this.contentRef.classList.remove('zoomIn');
    document.body.classList.remove('hide-scroll');
    document.body.removeAttribute('style');
    window.scrollTo(0, this.currentOffset);
    if (this.props.hasOwnProperty('onClose')) this.props.onClose();
  }

  render() {
    const { title, children, className, close } = this.props;
    return (
      <div className={`${style['modal']} ${style['modal-dialog-custom']} ${className || ''}`} ref={modal => this.modalRef = modal}>
        <div className={`${style['modal-backdrop']} show`} />
        <div className={style['position']} role="presentation" onClick={this.onClosePanel}>
          <div className={`${style['modal-dialog-content']} ${style['animated']}`} role="presentation" onClick={e => e.stopPropagation()} ref={content => this.contentRef = content}>
            {close && (
            <div className={style['close']} role="presentation" onClick={this.onClosePanel}>
              <span className={style['closeIcon']}>×</span>
            </div>)}
            {title && (
            <div className={style['modal-custom-header']}>
              <p className={style['modal-custom-title']}>{title}</p>
            </div>)}
            <div className={style['modal-custom-body']}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ModalDialog.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  onRef: PropTypes.func,
  isDismiss: PropTypes.bool,
  close: PropTypes.bool,
};

ModalDialog.defaultProps = {
  isDismiss: true,
  close: false,
  className: '',
  title: '',
  onRef: null
};

export default ModalDialog;
