import React from 'react';
import { MdClose } from 'react-icons/md';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LabelLang from 'src/lang/components/LabelLang';
// actions
import { hideAlert } from 'src/screens/app/redux/action';
// style
import style from './Alert.scss';

const typeClass = {
  primary: 'alert-primary',
  secondary: 'alert-secondary',
  success: 'alert-success',
  danger: 'alert-danger',
  warning: 'alert-warning',
  info: 'alert-info',
  light: 'alert-light',
  dark: 'alert-dark',
};

class Alert extends React.PureComponent {
  // static propTypes = {
  //   configAlert: PropTypes.object,
  //   hideAlert: PropTypes.func,
  //   isShowClose: PropTypes.bool,
  // }

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      message: '',
      type: '',
      isShowClose: false,
    };
    // bind
    this.handleShowAlert = ::this.handleShowAlert;
  }

  componentWillReceiveProps(nextProps) {
    this.handleShowAlert(nextProps);
  }

  getTypeClass = type => typeClass[type] || 'alert-primary';

  configDefault = {
    isShow: false,
    message: '',
    timeOut: 5000,
    type: '',
    isShowClose: false,
    callBack: () => {},
  }

  handleShowAlert(props) {
    const { configAlert } = props;
    const config = Object.assign({}, this.configDefault, configAlert);
    if (config.isShow && config.timeOut) {
      setTimeout(() => {
        this.props.hideAlert();
        // call back
        config.callBack();
      }, config.timeOut);
    }
    this.setState({ ...config });
  }

  render() {
    const {
      isShow, type, message, values, isShowClose,
    } = this.state;
    const tyleClassName = this.getTypeClass(type);
    if (!isShow) return null;
    return (
      <div className={`alert ${style.alerts} animated ${tyleClassName} ${isShow && style.slideInDown}`} role="alert">
        {
          isShowClose && (
            <MdClose className={style.close} onClick={() => this.setState({ isShow: false })} />
          )
        }
        <span><LabelLang id={message} values={values} /></span>
      </div>
    );
  }
}

// Alert.defaultProps = {
//   configAlert: null,
// };

// Alert.propTypes = {
//   configAlert: PropTypes.object,
// };

const mapState = state => ({
  configAlert: state.app.configAlert,
});

const mapDispatch = ({
  hideAlert,
});

export default connect(mapState, mapDispatch)(Alert);
