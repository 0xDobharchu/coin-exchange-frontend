
import React from 'react';
import { Field } from 'redux-form';
import createForm from 'src/components/core/form/createForm';
import dropdownField from 'src/components/core/form/fields/dropdown';
import { withRouter } from 'react-router-dom';
import currentUser from 'src/utils/authentication';
import {MdPerson} from 'react-icons/md';
import LabelLang from 'src/lang/components/LabelLang';
import { URL } from 'src/resources/constants/url';
import styles from './styles.scss';

const Form = createForm({
  propsReduxForm: {
    form: 'SignOutForm',
    initialValues: {
    },
  },
});

class UserLogin extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Form>
        <div className={styles.welcome}><span className={styles.icon}><MdPerson color="#3f2184" size="28px" /></span>
          <Field
            containerClassName={styles['logined-container']}
            name="dropdown"
            className={styles.logined}
            component={dropdownField}
            validate={[]}
            toggle={currentUser.getCurrentUser().name}
            list={[
              {
                label: <LabelLang id="user.setting" />,
                onClick:  () => {
                  this.props.history.push(URL.ME);
                }
              },
              {
                label: <LabelLang id="me.logout" />,
                onClick:  () => {
                  currentUser.removeAccessToken();
                  this.props.history.push(URL.HOME);
                }
              }
            ]}
          />
        </div>
      </Form>
    );
  }
}

export default withRouter(UserLogin);
