/* eslint camelcase:0 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { API_URL } from 'src/resources/constants/url';
import { connect } from 'react-redux';
// import { uploadReceipAtmCashTransfer, getCashCenterBankInfo } from '@/reducers/exchange/action';
import { showAlert } from 'src/screens/app/redux/action';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegCopy, FaCloudUploadAlt } from 'react-icons/fa';
import { formatMoneyByLocale } from 'src/utils/format/curency';
import ClockCount from 'src/components/clockCount';
import TooltipInfo from 'src/components/tooltipInfo';
import FileUploader from 'src/components/fileUploader';
import { getBankInfo } from './action';
import './styles.scss';


const DATA_TEMPLATE = {
  'CUSTOMER AMOUNT': {
    intlKey: 'customer_amount',
    text: null,
    className: 'money',
    copyable: true,
  },
  'YOUR AMOUNT': {
    intlKey: 'amount',
    text: null,
    className: 'money',
    copyable: true,
  },
  'ACCOUNT NAME': { intlKey: 'account_name', text: null, copyable: true },
  'ACCOUNT NUMBER': { intlKey: 'account_number', text: null, copyable: true },
  'BANK NAME': { intlKey: 'bank_name', text: null, copyable: true },
  'BANK ID': { intlKey: 'bank_id', text: null, copyable: true },
  'REFERENCE CODE': { intlKey: 'reference_code', text: null, className: 'reference-code', copyable: true },
};

const STATUS = {
  TRANSFERRING: 'transferring',
};

class BankTransferInfo extends PureComponent {
  constructor() {
    super();
    this.state = {
      data: DATA_TEMPLATE,
      showUploader: false,
      uploaded: false,
      imgUploadedUrl: null,
      isLoading: false,
      expired: false,
    };

    this.uploader = React.createRef();
    this.modalRef = null;

    this.onUpload = :: this.onUpload;
    this.onUploaded = :: this.onUploaded;
    this.onDone = :: this.onDone;
    this.saveReceipt = :: this.saveReceipt;
    this.copied = :: this.copied;
    this.getBankInfo = :: this.getBankInfo;
    this.onExpired = :: this.onExpired;
  }

  static getDerivedStateFromProps({ orderInfo }, prevState) {
    const newData = { ...prevState?.data };
    const { fiatLocalAmount, fiatLocalCurrency, refCode } = orderInfo;
    fiatLocalAmount && fiatLocalCurrency && (newData['YOUR AMOUNT'].text = `${formatMoneyByLocale(fiatLocalAmount, fiatLocalCurrency, 2)} ${fiatLocalCurrency}`);
    refCode && (newData['REFERENCE CODE'].text = refCode);
    return { data: newData };
  }

  componentDidMount() {
    this.getBankInfo();
  }

  onUpload() {
    this.setState({ showUploader: true });
  }

  onUploaded(imgUploadedUrl) {
    this.setState({ uploaded: true, imgUploadedUrl }, this.saveReceipt);
  }

  onDone() {
    if (typeof this.props.onDone === 'function') {
      typeof this.props.onDone();
    }
  }

  onExpired() {
    this.setState({ expired: true });
  }

  getBankInfo() {
    const { bankInfo } = this.props;
    if (bankInfo !== null && bankInfo !== {}) {
      this.setState({ data: this.updateBankInfoFromData(bankInfo) });
      return;
    }
    try {
      this.showLoading(true);
      this.props.getBankInfo({
        country: 'HK',
        currency: 'HKD'
      }).then(info => {
        this.setState({ data: this.updateBankInfoFromData(info) });
        this.showLoading(false);
      }).catch(() => {this.showLoading(false); });
    } catch (e) {
      console.warn(e);
    }
  }

  updateBankInfoFromData = (info = {}) => {
    const { data } = this.state;
    const newData = { ...data };
    newData['ACCOUNT NAME'].text = info.accountName;
    newData['ACCOUNT NUMBER'].text = info.accountNumber;
    newData['BANK ID'].text = info.bankId;
    newData['BANK NAME'].text = info.bankName;
    return newData;
  }

  saveReceipt() {
    this.showLoading(true);
    const { orderInfo, saveReceiptHandle } = this.props;
    const { imgUploadedUrl } = this.state;
    const data = {
      receipt_url: imgUploadedUrl,
    };

    // override save receipt func
    if (typeof saveReceiptHandle === 'function') {
      saveReceiptHandle({
        data,
        successFn: () => {
          this.showLoading(false);
        },
        errorFn: () => {
          this.showLoading(false);
        },
      });
      return;
    }

    this.props.uploadReceipAtmCashTransfer({
      PATH_URL: `${API_URL.EXCHANGE.SEND_ATM_CASH_TRANSFER}/${orderInfo?.id}`,
      METHOD: 'PUT',
      data,
      successFn: () => {
        this.showLoading(false);
      },
      errorFn: () => {
        this.showLoading(false);
      },
    });
  }

  showLoading(isLoading = false) {
    this.setState({
      isLoading,
    });
  }

  copied() {
    this.props.showAlert({
      message: 'Copied',
      timeOut: 3000,
      isShowClose: true,
      type: 'success',
      callBack: () => { },
    });
  }

  renderCopyIcon(text) {
    return (
      <CopyToClipboard text={text} onCopy={this.copied}>
        <FaRegCopy className="copy-icon" />
      </CopyToClipboard>
    );
  }

  renderInfo() {
    const { data } = this.state;
    return (
      <React.Fragment>
        {Object.entries(data).map(([name, value]) => {
          if (!value.text) {
            return null;
          }
          return (
            <div key={name} className="row-item info-item">
              <div>
                <span className="title">{value.intlKey}</span>
              </div>
              <div>
                <span className={`value ${value.className && value.className}`}>{value.text}</span>
                {value.copyable && this.renderCopyIcon(value.text)}
                {value.extraInfo && <TooltipInfo message={value.extraInfo.intlKey} />}
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }

  render() {
    const { showUploader, uploaded, expired, isLoading } = this.state;
    const { orderInfo: { createdAt, status } } = this.props;
    return (
      <div className="transaction-info-container">
        { isLoading && <span>Loading...</span>}
        <div className="item">
          <div className="payment-detail">
            <span className="text">
              {!expired && 'Will expired in '}
              <ClockCount
                startAt={createdAt}
                expiredText="Expired"
                onExpired={this.onExpired}
              />
            </span>
          </div>
        </div>
        <div className="item info-group">
          {this.renderInfo()}
        </div>
        <div className="item notice">
          <span className="notice-tilte">Important</span>
          <span className="notice-desc">Note!</span>
        </div>
        <div className="item">
          { showUploader &&
            (
              <FileUploader
                className="uploader-zone"
                onSuccess={this.onUploaded}
              />
            )
          }
          {
            (uploaded || status === STATUS.TRANSFERRING) ?
              (
                <button type="submit" className="btn btn-upload-receipt" onClick={this.onDone}>
                  Done
                </button>
              ) :
              (
                <button type="submit" className="btn btn-upload-receipt" onClick={this.onUpload}>
                  <FaCloudUploadAlt />
                  Upload
                </button>
              )
          }
        </div>
      </div>
    );
  }
}

BankTransferInfo.defaultProps = {
  /* eslint react/default-props-match-prop-types:0 */
  orderInfo: {},
  bankInfo: null,
  saveReceiptUrl: null,
  saveReceiptHandle: () => null,
  getBankInfo: null
};

BankTransferInfo.propTypes = {
  /* eslint react/no-unused-prop-types:0 */
  orderInfo: PropTypes.object,
  // uploadReceipAtmCashTransfer: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  ipInfo: PropTypes.object.isRequired,
  bankInfo: PropTypes.object,
  saveReceiptHandle: PropTypes.func,
  getBankInfo: PropTypes.func,
};

const mapState = (state) => {
  return {
    ipInfo: state.app?.ipInfo,
  };
};

export default connect(mapState, { showAlert, getBankInfo })(BankTransferInfo);
