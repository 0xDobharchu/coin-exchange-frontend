import React from 'react';
import Loading from 'src/components/loading';
import { getApiTokenAction, deleteApiTokenAction, updateApiTokenAction } from 'src/screens/auth/redux/action';
import { Button } from 'src/components/custom';
import { connect } from 'react-redux';
import {showAlert} from 'src/screens/app/redux/action';
import { WrapperLang } from 'src/lang/components';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ConfirmDialog from 'src/components/confirmDialog';
import style from './styles.scss';

class ApiToken extends React.Component {
  constructor(props) {
    super(props);
    this.confirmDialogRenew = React.createRef();
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    // eslint-disable-next-line
    this.props.getApiTokenAction().then(() => this.setState({ loading: false })).catch(err=>err);
  }
  // eslint-disable-next-line
  handleDelete = () => this.props.deleteApiTokenAction();
  // eslint-disable-next-line
  handleUpdate = () => this.confirmDialogRenew.current.show();

  // eslint-disable-next-line
  showMessage = (message, type) => this.props.showAlert({ message, type });
  showSuccess = id => this.showMessage(id, 'success');
  handleOnClickCopy = () => this.showSuccess('me.accountInfo.alert.apiTokenCopyLinkSuccess');
  
  // eslint-disable-next-line
  onConfirmRenew = () => this.props.updateApiTokenAction().then(() => {
    this.showSuccess('me.accountInfo.alert.renewSuccess');
  }).catch(err => err);
  
  render() {
    const { loading }= this.state;
    // eslint-disable-next-line
    const { tokenApi } = this.props;
    if (loading) return <Loading />;
    return (
      <WrapperLang>
        {ts => (
          <div className={style.container}>
            <div className={style.tokenClipboard}>
              {tokenApi && <div className={style.token}>{tokenApi}</div>}
              <CopyToClipboard text={tokenApi} onCopy={this.handleOnClickCopy}>
                <Button className={style.copy} value={ts('me.accountInfo.apiTokenCopy')} />
              </CopyToClipboard>
            </div>
            <Button type="button" className={style.renew} onClick={this.handleUpdate} value={ts('me.accountInfo.apiTokenNew')} />
            <ConfirmDialog
              title={ts('me.accountInfo.dialog.renew.title')}
              body={ts('me.accountInfo.dialog.renew.body')}
              confirmText={ts('me.accountInfo.dialog.renew.confirm')}
              cancelText={ts('me.accountInfo.dialog.renew.cancel')}
              ref={this.confirmDialogRenew}
              onConfirm={this.onConfirmRenew}
            />
          </div>
        )}
      </WrapperLang>
    );
  }
}
const mapState = state => ({
  tokenApi: state.auth.tokenApi
});
const mapDispatch = { getApiTokenAction, deleteApiTokenAction, updateApiTokenAction, showAlert };
export default connect(mapState, mapDispatch)(ApiToken);
