/* eslint camelcase:0 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegCopy, FaCloudUploadAlt } from 'react-icons/fa';
import { formatMoneyByLocale } from 'src/utils/format/curency';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ClockCount from 'src/components/clockCount';
import TooltipInfo from 'src/components/tooltipInfo';
import FileUploader from 'src/components/fileUploader';
import cx from 'classnames';
import { getBankInfo, addReceiptOrder } from './action';
import styles from './styles.scss';

const DATA_TEMPLATE = {
  'CUSTOMER AMOUNT': {
    intlKey: 'CUSTOMER AMOUNT',
    text: null,
    className: 'money',
    copyable: true,
  },
  'YOUR AMOUNT': {
    intlKey: 'YOUR AMOUNT',
    text: null,
    className: 'money',
    copyable: true,
  },
  'ACCOUNT NAME': { intlKey: 'ACCOUNT NAME', text: null, copyable: true },
  'ACCOUNT NUMBER': { intlKey: 'ACCOUNT NUMBER', text: null, copyable: true },
  'BANK NAME': { intlKey: 'BANK NAME', text: null, copyable: true },
  'BANK ID': { intlKey: 'BANK ID', text: null, copyable: true },
  'REFERENCE CODE': { intlKey: 'REFERENCE CODE', text: null, className: 'reference-code', copyable: true },
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
    this.setState({ uploaded: true, imgUploadedUrl });
  }

  onDone() {
    const { addReceiptOrder, showAlert, onDone, orderInfo = {} } = this.props;
    const { imgUploadedUrl } = this.state;
    if (typeof onDone === 'function') {
      onDone();
    }
    addReceiptOrder({
      receiptId: orderInfo?.id,
      receiptImgUrl: imgUploadedUrl
    }).then(() => {
      showAlert({
        message: 'Successful!',
        timeOut: 3000,
        isShowClose: true,
        type: 'success',
      });
    });
  }

  onExpired() {
    this.setState({ expired: true });
  }

  getBankInfo() {
    const { bankInfo, getBankInfo, userCountry, orderInfo } = this.props;
    if (bankInfo !== null && bankInfo !== {}) {
      this.setState({ data: this.updateBankInfoFromData(bankInfo) });
      return;
    }
    try {
      this.showLoading(true);
      getBankInfo({
        country: userCountry,
        currency: orderInfo?.fiatLocalCurrency,
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

  showLoading(isLoading = false) {
    this.setState({
      isLoading,
    });
  }

  copied() {
    const { showAlert } = this.props;
    showAlert({
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
        <FaRegCopy className={styles.copyIcon} color="green" />
      </CopyToClipboard>
    );
  }

  renderInfo() {
    const { data } = this.state;
    return (
      <Container className={styles.infos}>
        {Object.entries(data).map(([name, value]) => {
          if (!value.text) {
            return null;
          }
          return (
            <Row key={name} className={styles.infoItem}>
              <Col xs={12} sm={6}>
                <span className={styles.infoTitle}>{value.intlKey}</span>
              </Col>
              <Col xs={12} sm={6}>
                <span className={cx(styles.infoValue, styles[value?.className])}>{value.text}</span>
                {value.copyable && this.renderCopyIcon(value.text)}
                {value.extraInfo && <TooltipInfo message={value.extraInfo.intlKey} />}
              </Col>
            </Row>
          );
        })}
      </Container>
    );
  }

  render() {
    const { showUploader, uploaded, expired, isLoading } = this.state;
    const { orderInfo: { createdAt, status } } = this.props;
    return (
      <Container className={styles.container}>
        { isLoading && <span>Loading...</span>}
        <Row>
          <Card border="secondary" className={styles.card}>
            <Card.Header>BANK TRANSFER INFO</Card.Header>
            <Card.Body>
              <Container>
                <Row>
                  <div className={styles.orderTimeout}>
                    <span className={styles.text}>
                      {!expired && 'Will expired in '}
                      <ClockCount
                        startAt={createdAt}
                        expiredText="Expired"
                        onExpired={this.onExpired}
                      />
                    </span>
                  </div>
                </Row>
                <Row>
                  {this.renderInfo()}
                </Row>
                <Row>
                  <div className={styles.note}>
                    <span className={styles.noteTitle}>Important</span>
                    <span className={styles.noteContent}>You must send the exact amount & reference code as instructed and upload the payment proof below so we can proceed sending coins to you.</span>
                  </div>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Row>
        <Row className={styles.uploadContainer}>
          { showUploader &&
            (
              <FileUploader
                onSuccess={this.onUploaded}
              />
            )
          }
          {
            (uploaded || status === STATUS.TRANSFERRING) ?
              (
                <button type="submit" className={styles.doneBtn} onClick={this.onDone}>
                  Save
                </button>
              ) :
              (
                <button type="submit" className={styles.uploadBtn} onClick={this.onUpload}>
                  <FaCloudUploadAlt className={styles.uploadIcon} />
                  Upload Your Receipt
                </button>
              )
          }
        </Row>
      </Container>
    );
  }
}

BankTransferInfo.defaultProps = {
  orderInfo: {},
  bankInfo: null,
  getBankInfo: null
};

BankTransferInfo.propTypes = {
  orderInfo: PropTypes.object,
  onDone: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  bankInfo: PropTypes.object,
  getBankInfo: PropTypes.func,
};

const mapState = (state) => {
  return {
    ipInfo: state.app?.ipInfo,
    userCountry: state.app?.userCountry,
  };
};

export default connect(mapState, { showAlert, getBankInfo, addReceiptOrder })(BankTransferInfo);
