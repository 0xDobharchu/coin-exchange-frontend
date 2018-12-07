import React from 'react';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { submitVerifyLevel3Action } from 'src/screens/auth/redux/action';
import { LabelLang } from 'src/lang/components';
import IDVerificationForm from './IDVerificationForm';
import { DOC_TYPES, getColorByLevel, getCurrentLevel, getStatusByLevel} from '../util';

class IDCardBlock extends React.PureComponent {

  handleSubmitForm = values => {
    // eslint-disable-next-line
    const { showAlert, submitVerifyLevel3Action } = this.props;
    const { back_image, front_image, id_type } = values;
    if (id_type === DOC_TYPES[0].value) {
      if (!back_image) {
        showAlert({
          message: 'me.accountLevel.alert.imageIdentifierPassportRequired',
          timeOut: 3000,
          type: 'danger'
        });
        return;
      }
    } else {
      if (!back_image || !front_image) {
        showAlert({
          message: 'me.accountLevel.alert.imageIdentifierRequired',
          timeOut: 3000,
          type: 'danger'
        });
        return;
      }
    }
    submitVerifyLevel3Action(values);
    showAlert({
      message: 'me.accountLevel.alert.lv3',
      timeOut: 3000,
      type: 'success'
    });
  }

  render() {
    // eslint-disable-next-line
    const { style, verified, level, levelStatus } = this.props;
    const currentLevel = getCurrentLevel(level, levelStatus);

    return (
      <div className={style.collapse_custom}>
        <div className={style.head}>
          <p className={style.label}>
            <LabelLang id="me.accountLevel.step3" />
          </p>
          <div className={style.extend}>
            <span className={`badge badge-${getColorByLevel(4, level, levelStatus)}`}>{getStatusByLevel(4, level, levelStatus)}</span>
          </div>
        </div>
        <div className={style.content}>
          <p className={style.text}><LabelLang id="me.accountLevel.wrm3" /></p>
        </div>
        {2 <= currentLevel && <IDVerificationForm onSubmit={this.handleSubmitForm} />}
      </div>
    );
  }
}

const mapState = state => ({
  verified: state.auth.profile?.verified || null,
  level: state.auth.profile.verification_level,
  levelStatus: state.auth.profile.verification_status,
});
const mapDispatch = {
  showAlert,
  submitVerifyLevel3Action
};

export default connect(mapState, mapDispatch)(IDCardBlock);
