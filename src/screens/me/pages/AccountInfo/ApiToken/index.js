import React from 'react';
import { getApiTokenAction, deleteApiTokenAction, updateApiTokenAction } from 'src/screens/auth/redux/action';
import { Button } from 'src/components/custom';
import { connect } from 'react-redux';
import { WrapperLang } from 'src/lang/components';
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

  render() {
    const { loading }= this.state;
    // eslint-disable-next-line
    const { tokenApi } = this.props;
    if (loading) return <div>loading...</div>;
    return (
      <WrapperLang>
        {ts => (
          <div className={style.container}>
            {tokenApi && <div className={style.token}>{tokenApi}</div>}
            {tokenApi && <Button type="button" onClick={this.handleDelete} value={ts('me.accountInfo.apiTokenDelete')} />}
            {!tokenApi && <Button type="button" onClick={this.handleUpdate} value={ts('me.accountInfo.apiTokenNew')} />}
          </div>
        )}
      </WrapperLang>
    );
  }
}
const mapState = state => ({
  tokenApi: state.auth.tokenApi
});
const mapDispatch = { getApiTokenAction, deleteApiTokenAction, updateApiTokenAction };
export default connect(mapState, mapDispatch)(ApiToken);
