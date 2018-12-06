import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'src/components/core/controls/input';
import cx from 'classnames';
import styles from './styles.scss';

class AutocompleteInput extends Component {
  constructor(props) {
    super();
    this.state = {
      result: props.data || [],
      show: false,
      isValid: true,
    };
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    const state = { data: nextProps.data || [] };

    if (!nextState?.term) {
      state.result = nextProps.data;
    }
    return state;
  }

  componentDidUpdate(prevProps, prevState) {
    const { term } = this.state;
    if (term !== prevState.term) {
      this.handleCallbackData();
    }
  }

  handleCallbackData = () => {
    const { onChange, strict } = this.props;
    const { term, data } = this.state;
    const isValid = strict ? data.some(d => d.value === term) : true;

    this.setState({ isValid });

    if (typeof onChange === 'function') {
      onChange({
        value: term,
        isValid
      });
    }
  }
  
  onClick = (value) => {
    this.setState({ show: false, term: value });
  }

  onChangeTerm = (e) => {
    const term = e?.target?.value || '';
    const { data } = this.state;

    const result = data.filter(({ value }) => value?.includes(term));
    this.setState({ result, term });
  }

  onFocus = () => {
    const { onFocus } = this.props;
    if (typeof onFocus === 'function') {
      onFocus();
    }
    this.setState({ show: true });
  }

  onBlur = () => {
    const { onBlur } = this.props;
    if (typeof onBlur === 'function') {
      onBlur();
    }
    setTimeout(() => {
      this.setState({ show: false });
    }, 300);
  }

  renderResult = () => {
    const { result } = this.state;
    if (result.length === 0) return null;

    const items = result.map(({ value, label }, index) =>
      <div className={styles.item} role="presentation" key={`${index}-${value}`} onClick={() => this.onClick(value)}><span>{label}</span></div>);
    if (items.length) {
      return (
        <div className={styles.items}>{items}</div>
      );
    }
  }

  render() {
    const { show, term, isValid } = this.state;
    const { placeholder, containerClassname, inputClassname } = this.props;
    return (
      <div className={cx(styles.container, containerClassname)}>
        <Input
          placeholder={placeholder}
          onChange={this.onChangeTerm}
          name="autocomplete-input"
          className={cx(styles.input, inputClassname, !isValid && 'border-danger')}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          value={term}
          autoCompleteOff
        />
        { show && this.renderResult() }
      </div>
    );
  }
}

AutocompleteInput.defaultProps = {
  onChange: null,
  strict: false,
  placeholder: '',
  containerClassname: '',
  inputClassname: ''
};

AutocompleteInput.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  onChange: PropTypes.func,
  strict: PropTypes.bool,
  placeholder: PropTypes.string,
  containerClassname: PropTypes.string,
  inputClassname: PropTypes.string,
};

export default AutocompleteInput;