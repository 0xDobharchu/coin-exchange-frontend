import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createForm from 'src/components/core/form/createForm';
import { formValueSelector } from 'redux-form';
import textareaField from 'src/components/core/form/fields/textarea';
import inputField from 'src/components/core/form/fields/input';
import LabelLang from 'src/lang/components/LabelLang';
import { FieldLang } from 'src/lang/components';
import { isEmail, isRequired } from 'src/components/core/form/validator';
import { URL } from 'src/resources/constants/url';
import cx from 'classnames';
import contactActions  from './action';
import style from './style.scss';

const ContactForm = createForm({
  propsReduxForm: {
    form: 'ContactForm'
  },
});

const selectorForm = formValueSelector('ContactForm');

class Contact extends React.Component {
  constructor(props) {
    super(props);
  }

  submitAddContact=() => {
    let { fullname, phone, email, description } = this.props;
    if (!phone) phone = '';

    console.log(fullname, email, phone, description);
    if (fullname && email && description) {
      this.props.addContact(fullname,  phone, email, description).then((data) => {
        console.log('data addContact', data);
        this.props.showAlert({
          message: 'landingPage.contactUS.message',
          timeOut: 3000,
        });
        this.props.history.push(URL.HOME);
      }, (err) => {
        this.props.showAlert({
          message: 'app.common.error',
          type: 'danger',
          timeOut: 2000,
        });
        console.log('submitAddContact', err);
      });
    }
  }

  render() {
    return (

      <div className={cx('container', style['contact-warper'])}>
        <div className="row">
          <div className="col-sm-10 col-md-9 col-lg-7 mx-auto">
            <h5 className={cx(style.contactTitle, 'text-center')}><LabelLang id="landingPage.contactUS.title" /></h5>
            <div className={cx('card', style['contact-card'])}>
              <div className="card-body">
                <ContactForm onSubmit={this.submitAddContact}>
                  <div className="form-group">
                    <FieldLang
                      name="fullname"
                      className="form-control"
                      component={inputField}
                      validate={isRequired('landingPage.contactUS.requiredYourName')}
                      type="text"
                      placeholder="landingPage.contactUS.placeholderYourName"
                    />
                  </div>
                  <div className="form-group">
                    <FieldLang
                      name="email"
                      className="form-control"
                      component={inputField}
                      validate={[isRequired('landingPage.contactUS.requiredEmail'), isEmail('landingPage.contactUS.notValidEmail')]}
                      type="email"
                      placeholder="landingPage.contactUS.placeholderYourEmail"
                    />
                  </div>
                  <div className="form-group">
                    <FieldLang
                      name="phone"
                      className="form-control"
                      component={inputField}
                      placeholder="landingPage.contactUS.placeholderPhone"
                      type="phone"
                    />
                  </div>
                  <div className="form-group">
                    <FieldLang
                      name="description"
                      className="form-control"
                      component={textareaField}
                      placeholder="landingPage.contactUS.placeholderDescription"
                      type="text"
                      validate={isRequired('landingPage.contactUS.requiredDescription')}
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className={cx('btn btn-primary btn-block', style.buttonContact)}><LabelLang id="landingPage.contactUS.contactButton" /></button>
                  </div>
                </ContactForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fullname: selectorForm(state, 'fullname'),
  email: selectorForm(state, 'email'),
  phone: selectorForm(state, 'phone'),
  description: selectorForm(state, 'description')
});

const mapDispatch = dispatch => ({
  addContact: bindActionCreators(contactActions.addContact, dispatch),
});

const connectedContactPage = connect(mapStateToProps, mapDispatch)(Contact);
export default connectedContactPage;
