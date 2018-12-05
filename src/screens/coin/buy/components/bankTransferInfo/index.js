/* eslint camelcase:0 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { formatMoneyByLocale } from 'src/utils/format/curency';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ClockCount from 'src/components/clockCount';
import TooltipInfo from 'src/components/tooltipInfo';
import FileUploader, { RECEIPT_TYPE } from 'src/components/fileUploader';
import Loading from 'src/components/loading';
import LabelLang from 'src/lang/components/LabelLang';
import reqErrorAlert from 'src/utils/errorHandler/reqErrorAlert';
import cx from 'classnames';
import { getBankInfo, addReceiptOrder } from './action';
import styles from './styles.scss';


const getIntlKey = (name) => `coin.components.bankTransferInfo.${name}`;

const DATA_TEMPLATE = {
  'CUSTOMER AMOUNT': {
    intlKey: getIntlKey('customerAmount'),
    text: null,
    className: 'money',
    copyable: true,
  },
  'YOUR AMOUNT': {
    intlKey: getIntlKey('yourAmount'),
    text: null,
    className: 'money',
    copyable: true,
  },
  'ACCOUNT NAME': { intlKey: getIntlKey('accountName'), text: null, copyable: true },
  'ACCOUNT NUMBER': { intlKey: getIntlKey('accountNumber'), text: null, copyable: true },
  'BANK NAME': { intlKey: getIntlKey('bankName'), text: null, copyable: true },
  'BANK ID': { intlKey: getIntlKey('bankId'), text: null, copyable: true },
  'REFERENCE CODE': { intlKey: getIntlKey('refCode'), text: null, className: 'reference-code', copyable: true },
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
    this.onRemoveReceipt = ::this.onRemoveReceipt;
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

  onRemoveReceipt() {
    this.setState({ uploaded: false, imgUploadedUrl: null });
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
        message: getIntlKey('saveReceiptSuccessMsg'),
        timeOut: 3000,
        isShowClose: true,
        type: 'success',
      });
    }).catch(e => {
      reqErrorAlert(e, { message: <LabelLang id={getIntlKey('saveReceiptFailedMsg')} />});
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
      }).catch((e) => {
        reqErrorAlert(e, { message: <LabelLang id={getIntlKey('getBankInfoFailedMsg')} />});
      }).finally(() => {
        this.showLoading(false);
      });
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
      message: 'app.common.copied',
      timeOut: 3000,
      isShowClose: true,
      type: 'success',
      callBack: () => { },
    });
  }

  renderInfo() {
    const { data, isLoading } = this.state;
    if (isLoading) {
      return (
        <Container><Loading color='green' className={styles.loadingIcon} /></Container>
      );
    }
    return (
      <Container className={styles.infos}>
        {
          !data['BANK ID']?.text && (
            <Row>
              <span className={styles.canNotGetBankInfo}>
                <LabelLang
                  id={getIntlKey('retryGetBankInfo')}
                  values={{
                    retry: (
                      <span role='presentation' className={cx('common-clickable', styles.getBtn)} onClick={this.getBankInfo}>
                        <LabelLang id={getIntlKey('retryBtn')} />
                      </span>
                    )
                  }}
                />
              </span>
            </Row>
          )
        }
        {Object.entries(data).map(([name, value]) => {
          if (!value.text) {
            return null;
          }
          return (
            <Row key={name} className={styles.infoItem}>
              <Col xs={12} sm={6}>
                <span className={styles.infoTitle}><LabelLang id={value.intlKey} /></span>
              </Col>
              <Col xs={12} sm={6}>
                <CopyToClipboard text={value.text} onCopy={this.copied}>
                  <span className={cx(styles.infoValue, styles[value?.className])}>{value.text}</span>
                </CopyToClipboard>
                {value.extraInfo && <TooltipInfo message={<LabelLang id={value.extraInfo.intlKey} />} />}
              </Col>
            </Row>
          );
        })}
      </Container>
    );
  }

  render() {
    const { showUploader, uploaded, expired } = this.state;
    const { orderInfo: { createdAt, status, duration } } = this.props;
    return (
      <Container className={styles.container}>
        <Row>
          <Card border="secondary" className={styles.card}>
            <Card.Header><LabelLang id={getIntlKey('nameCard')} /></Card.Header>
            <Card.Body>
              <Container>
                <Row>
                  <div className={styles.orderTimeout}>
                    <span className={styles.text}>
                      {!expired && <LabelLang id={getIntlKey('willExpiredIn')} />}
                      <ClockCount
                        duration={duration}
                        startAt={createdAt}
                        expiredText={<LabelLang id={getIntlKey('expiredText')} />}
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
                    <span className={styles.noteTitle}><LabelLang id={getIntlKey('noteTitle')} /></span>
                    <span className={styles.noteContent}><LabelLang id={getIntlKey('noteDesc')} /></span>
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
              type={RECEIPT_TYPE}
              onSuccess={this.onUploaded}
              onRemove={this.onRemoveReceipt}
            />
          )
          }
          {
            (uploaded || status === STATUS.TRANSFERRING) ?
              (
                <button type="submit" className={styles.doneBtn} onClick={this.onDone}>
                  <LabelLang id={getIntlKey('saveBtn')} />
                </button>
              ) :
              (
                <button type="submit" className={styles.uploadBtn} onClick={this.onUpload}>
                  <FaCloudUploadAlt className={styles.uploadIcon} />
                  <LabelLang id={getIntlKey('uploadBtn')} />
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
