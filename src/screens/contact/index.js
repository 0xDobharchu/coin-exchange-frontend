import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createForm from '@/components/core/form/createForm';
import { Field, formValueSelector } from 'redux-form';
import textareaField, { textareaValidator } from 'src/components/core/form/fields/textarea';
import { contactActions } from './action';
import inputField, { inputValidator } from '@/components/core/form/fields/input';

const ContactForm = createForm({
  propsReduxForm: {
    form: 'ContactForm',
    initialValues: {
      input: '',
    },
  },
});

const selectorForm = formValueSelector('ContactForm');

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmiting: false,
    };
  }

  submitAddContact=() => {
    this.setState({ isSubmiting: true });
    const { fullname, email, phone, description } = this.props;
    if (fullname && email && phone && description) {
      console.log(fullname, email, phone, description);
      this.props.addContact(fullname, email, phone, description).then((data) => {
        console.log('data addContact', data);
        this.setState({ isSubmiting: false });
        alert('Contact success');
      }, (err) => {
        alert('Contact fail');
        this.setState({ isSubmiting: false });
        console.log('submitAddContact', err);
      });
    }
  }

  render() {
    const { isSubmiting } = this.state;
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <h2>Contact us</h2>
          <ContactForm onSubmit={this.submitAddContact}>
            <div className="form-group">
              <label htmlFor="fullname">Your name</label>
              <Field
                name="fullname"
                className="form-control"
                component={inputField}
                validate={inputValidator}
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                className="form-control"
                component={inputField}
                validate={inputValidator}
                type="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <Field
                name="phone"
                className="form-control"
                component={inputField}
                validate={inputValidator}
                type="phone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field
                name="description"
                className="form-control"
                component={textareaField}
                validate={textareaValidator}
                type="description"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Submit</button>
              {isSubmiting && <img alt="is login" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
            </div>
          </ContactForm>
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
