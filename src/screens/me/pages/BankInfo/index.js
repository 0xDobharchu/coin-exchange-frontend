import React from 'react';
import { connect } from 'react-redux';
import { LabelLang } from 'src/lang/components';
import { showAlert } from 'src/screens/app/redux/action';
import ConfirmDialog from 'src/components/confirmDialog';
import { updateProfileAction } from 'src/screens/auth/redux/action';
import BankInfoForm from './form/BankInfoForm';
import style from './style.scss';

// eslint-disable-next-line
class BankInfo extends React.Component {

  constructor(props) {
    super(props);
    this.bankInfoForm = React.createRef();
    this.confirmDialogUpdate = React.createRef();
    this.confirmDialogDelete = React.createRef();
  }
  // eslint-disable-next-line
  showMessage = (message, type) => this.props.showAlert({ message, type });
  showSuccess = id => this.showMessage(id, 'success');
  showError = id => this.showMessage(id, 'danger');
  handleSubmit = values => {
    this.confirmDialogUpdate.current.show(values);
  };
  onConfirmUpdate = values => {
    //eslint-disable-next-line
    this.props.updateProfileAction({ payment_info: JSON.stringify(values) }).then(() => {
      this.bankInfoForm.current.getWrappedInstance().ref.getWrappedInstance().wrapped.switchViewMode();
      this.showSuccess('me.bankInfo.alert.success'); 
    }).catch(() => this.showError('me.bankInfo.alert.failed'));
  }

  handleDelete = () => this.confirmDialogDelete.current.show();;
  // eslint-disable-next-line
  onConfirmDelete = () => this.props.updateProfileAction({ payment_info: '' }).then(() => {
    this.bankInfoForm.current.getWrappedInstance().ref.getWrappedInstance().wrapped.toggleEdit();
    this.showSuccess('me.bankInfo.alert.deleteSuccess'); 
  }).catch(() => this.showError('me.bankInfo.alert.deleteFailed'));

  render() {
    return (
      <div className={style.container}>
        <div className={style.content}>
          <LabelLang id="me.bankInfo.desc" />
        </div>
        <div className={style.block1}>
          <BankInfoForm ref={this.bankInfoForm} isEditMode={false} onSubmit={this.handleSubmit} onDelete={this.handleDelete} />
        </div>
        <ConfirmDialog
          title={<LabelLang id="me.bankInfo.dialog.update.title" />}
          body={<LabelLang id="me.bankInfo.dialog.update.body" />}
          confirmText={<LabelLang id="me.bankInfo.dialog.update.confirm" />}
          cancelText={<LabelLang id="me.bankInfo.dialog.update.cancel" />}
          ref={this.confirmDialogUpdate}
          onConfirm={this.onConfirmUpdate}
        />
        <ConfirmDialog
          title={<LabelLang id="me.bankInfo.dialog.delete.title" />}
          body={<LabelLang id="me.bankInfo.dialog.delete.body" />}
          confirmText={<LabelLang id="me.bankInfo.dialog.delete.confirm" />}
          cancelText={<LabelLang id="me.bankInfo.dialog.delete.cancel" />}
          ref={this.confirmDialogDelete}
          onConfirm={this.onConfirmDelete}
        />
      </div>
    );
  }
}

export default connect(null, { updateProfileAction, showAlert })(BankInfo);