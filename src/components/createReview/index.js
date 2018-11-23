import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createForm from 'src/components/core/form/createForm';
import { formValueSelector } from 'redux-form';
import textareaField from 'src/components/core/form/fields/textarea';
import LabelLang from 'src/lang/components/LabelLang';
import {FieldLang, MyMessage} from 'src/lang/components';
import { isRequired } from 'src/components/core/form/validator';
import { showAlert } from 'src/screens/app/redux/action';
import cx from 'classnames';
import addReview  from './action';
import style from './style.scss';

const ReviewForm = createForm({
  propsReduxForm: {
    form: 'ReviewForm',
    initialValues: {
      input: '',
    },
  },
});

const selectorForm = formValueSelector('ReviewForm');

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmiting: false,
    };
  }

  submitAddReview=() => {
    this.setState({ isSubmiting: true });
    const { order, review } = this.props;

    if (order && review) {
      const message = <MyMessage id='review.thanksMessage' />;
      this.setState({ message: message });
      this.props.addReview(order, review).then(() => {
        this.props.showAlert({
          message: message,
          timeOut: 5000,
        });
      }, () => {
        this.props.showAlert({
          message: <MyMessage id='app.common.error' />,
          type: 'danger',
          timeOut: 2000,
        });
        this.setState({ isSubmiting: false });
      });
    }
  }

  render() {
    const { message, isSubmiting } = this.state;
    return (

      <div className={cx('container', style.reviewWarper)}>
        <div className="row">
          <div className="col-sm-10 col-md-9 col-lg-7 mx-auto">
            <h5 className={cx(style.reviewTitle, 'text-center')}>
              <LabelLang id="review.label.description" />
            </h5>
            <div className={cx('card', style.reviewCard)}>
              <div className="card-body">
                {isSubmiting ? (message):  (
                  <ReviewForm onSubmit={this.submitAddReview}>
                    <FieldLang
                      containerClassName="form-group"
                      name="review"
                      className="form-control"
                      component={textareaField}
                      validate={isRequired(<LabelLang id="review.label.required" />)}
                      type="text"
                      placeholder="review.label.description"
                    />
                    <div className="form-group">
                      <button type="submit" className={cx('btn btn-primary btn-block', style.buttonReview)}><LabelLang id="review.label.button" /></button>
                    </div>
                  </ReviewForm>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  review: selectorForm(state, 'review')
});

const mapDispatch = dispatch => ({
  addReview: bindActionCreators(addReview, dispatch),
  showAlert: bindActionCreators(showAlert, dispatch),
});

const connectedContactPage = connect(mapStateToProps, mapDispatch)(Review);
export default connectedContactPage;
