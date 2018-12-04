import React from 'react';
import { connect } from 'react-redux';
import { LabelLang } from 'src/lang/components';
import { showAlert } from 'src/screens/app/redux/action';
import { updateProfileAction } from 'src/screens/auth/redux/action';
import BankInfoForm from './form/BankInfoForm';
import style from './style.scss';

// eslint-disable-next-line
class BankInfo extends React.Component {

  constructor(props) {
    super(props);
    this.bankInfoForm = React.createRef();
  }
  // eslint-disable-next-line
  showMessage = (message, type) => this.props.showAlert({ message, type });
  showSuccess = id => this.showMessage(id, 'success');
  showError = id => this.showMessage(id, 'danger');
  handleSubmit = values => {
    //eslint-disable-next-line
    this.props.updateProfileAction({ payment_info: JSON.stringify(values) }).then(() => {
      this.bankInfoForm.current.getWrappedInstance().ref.getWrappedInstance().wrapped.switchViewMode();
      this.showSuccess('me.bankInfo.alert.success'); 
    }).catch(() => this.showError('me.bankInfo.alert.failed'));
  };

  // eslint-disable-next-line
  handleDelete = () => this.props.updateProfileAction({ payment_info: '' }).then(() => {
    this.bankInfoForm.current.getWrappedInstance().ref.getWrappedInstance().wrapped.toggleEdit();
    this.showSuccess('me.bankInfo.alert.deleteSuccess'); 
  }).catch(() => this.showError('me.bankInfo.alert.deleteFailed'));

  render() {
    return (
      <div className={style.container}>
        <div className={style.content}>
          <LabelLang id="me.bankInfo.desc" />
        </div>
        <label className={style.title}><LabelLang id="me.bankInfo.title" /></label>
        <div className={style.lineTitle} />
        <div className={style.block1}>
          <BankInfoForm ref={this.bankInfoForm} isEditMode={false} onSubmit={this.handleSubmit} onDelete={this.handleDelete} />
        </div>
      </div>
    );
  }
}

export default connect(null, { updateProfileAction, showAlert })(BankInfo);