import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createForm from '@/components/core/form/createForm';
import { formValueSelector } from 'redux-form';
import textareaField from 'src/components/core/form/fields/textarea';
import inputField from '@/components/core/form/fields/input';
import LabelLang from 'src/lang/components/LabelLang';
import { FieldLang } from 'src/lang/components';
import { isEmail, isRequired } from 'src/components/core/form/validator';
import { contactActions } from './action';

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
    const { fullname, phone, email, description } = this.props;
    console.log(fullname, email, phone, description);
    if (fullname && email && phone && description) {      
      const message = 'Thank you! Your message has been sent. You should receive a response from one of our representatives within 12-24 hours.';
      this.props.addContact(fullname,  phone, email, description).then((data) => {
        console.log('data addContact', data);
        this.setState({ isSubmiting: false });
        alert(message);        
        this.props.history.push('/');
      }, (err) => {
        alert('OH! something went wrong!');
        this.setState({ isSubmiting: false });
        console.log('submitAddContact', err);
      });
    }    
  }

  render() {
    const { isSubmiting } = this.state;
    return (
      <div className="container">        
        <h2><LabelLang id="landingPage.contactUS.title" /></h2>
        <ContactForm onSubmit={this.submitAddContact}>
          <div className="form-group">
            <label htmlFor="fullname"><LabelLang id="landingPage.contactUS.yourName" /></label>
            <FieldLang
              name="fullname"
              className="form-control"
              component={inputField}
              validate={isRequired(<LabelLang id="landingPage.contactUS.requiredYourName" />)}
              type="text"
              placeholder="landingPage.contactUS.placeholderYourName"
            />                                          
          </div>            
          <div className="form-group">
            <label htmlFor="email"><LabelLang id="landingPage.contactUS.email" /></label>
            <FieldLang
              name="email"
              className="form-control"
              component={inputField}
              validate={[isRequired(<LabelLang id="landingPage.contactUS.requiredEmail" />), isEmail(<LabelLang id="landingPage.contactUS.notValidEmail" />)]}
              type="email"
              placeholder="Enter your email"
            />            
          </div>
          <div className="form-group">
            <label htmlFor="phone"><LabelLang id="landingPage.contactUS.phone" /></label>
            <FieldLang
              name="phone"
              className="form-control"
              component={inputField}    
              placeholder="landingPage.contactUS.placeholderPhone"                           
              type="phone"                
            /> 
          </div>
          <div className="form-group">
            <label htmlFor="description"><LabelLang id="landingPage.contactUS.description" /></label>
            <FieldLang
              name="description"
              className="form-control"
              component={textareaField}  
              placeholder="landingPage.contactUS.placeholderDescription"                                         
              type="text"  
              validate={[isRequired(<LabelLang id="landingPage.contactUS.requiredDescription" />)]}              
            />               
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary"><LabelLang id="landingPage.contactUS.contactButton" /></button>
            {isSubmiting && <img alt="is login" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
          </div>
        </ContactForm>
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
