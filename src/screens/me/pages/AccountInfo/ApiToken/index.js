import React from 'react';
import Loading from 'src/components/loading';
import { getApiTokenAction, deleteApiTokenAction, updateApiTokenAction } from 'src/screens/auth/redux/action';
import { Button } from 'src/components/custom';
import { connect } from 'react-redux';
import {showAlert} from 'src/screens/app/redux/action';
import { WrapperLang } from 'src/lang/components';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import style from './styles.scss';

class ApiToken extends React.Component {
  state = {
    loading: true
  }
  componentDidMount() {
    // eslint-disable-next-line
    this.props.getApiTokenAction().then(() => this.setState({ loading: false })).catch(err=>err);
  }
  // eslint-disable-next-line
  handleDelete = () => this.props.deleteApiTokenAction();
  // eslint-disable-next-line
  handleUpdate = () => this.props.updateApiTokenAction();

  // eslint-disable-next-line
  showMessage = (message, type) => this.props.showAlert({ message, type });
  showSuccess = id => this.showMessage(id, 'success');
  handleOnClickCopy = () => this.showSuccess('me.accountInfo.alert.apiTokenCopyLinkSuccess');
  render() {
    const { loading }= this.state;
    // eslint-disable-next-line
    const { tokenApi } = this.props;
    if (loading) return <Loading />;
    return (
      <WrapperLang>
        {ts => (
          <div className={style.container}>
            {tokenApi && <div className={style.token}>{tokenApi}</div>}
            <CopyToClipboard text={tokenApi} onCopy={this.handleOnClickCopy}>
              <Button value={ts('me.accountInfo.apiTokenCopy')} />
            </CopyToClipboard>
            <Button type="button" onClick={this.handleUpdate} value={ts('me.accountInfo.apiTokenNew')} />
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
