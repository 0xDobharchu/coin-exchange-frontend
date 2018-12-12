import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'src/components/core/controls/input';
import cx from 'classnames';
import styles from './styles.scss';

class AutocompleteField extends Component {
  constructor(props) {
    super();
    this.state = {
      result: props.data || [],
      show: false,
      isValid: true,
      value: null,
      term: ''
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
    const { selectedId } = this.props;
    if (term !== prevState.term) {
      this.handleCallbackData();
    }
    if (selectedId && selectedId !== prevProps.selectedId) {
      this.setDefaultValueViaId(selectedId);
    }
  }

  setDefaultValueViaId = (id) => {
    const { data } = this.props;
    const found = data?.find(d => d?.id === id);
    found && this.setState({ value: found.value, term: found.label, isValid: true });
  }

  handleCallbackData = () => {
    const { onChange, strict } = this.props;
    // eslint-disable-next-line
    const { term, data, value } = this.state;
    const isValid = strict ? data.some(d => d?.label === term) : true;

    this.setState({ isValid });

    if (typeof onChange === 'function') {
      onChange(term);
    }
  }
  
  onClick = (data) => {
    this.setState({ show: false, term: data?.label, value: data?.value });
  }

  onChangeTerm = (e) => {
    const term = e?.target?.value || '';
    const { data } = this.state;

    const result = data.filter(({ label }) => label?.includes(term));
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

    const items = result.map(data =>
      <div className={styles.item} role="presentation" key={data?.id} onClick={() => this.onClick(data)}><span>{data?.label}</span></div>);
    if (items.length) {
      return (
        <div className={styles.items}>{items}</div>
      );
    }
  }

  render() {
    const { show, isValid } = this.state;
    const { containerClassname, inputClassname, strict, onChange, data, selectedId, value, ...inputProps } = this.props;
    return (
      <div className={cx(styles.container, containerClassname)}>
        <Input
          {...inputProps}
          onChange={this.onChangeTerm}
          name="autocomplete-input"
          className={cx(styles.input, inputClassname, !isValid && 'border-danger')}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          value={value}
          autoCompleteOff
        />
        { show && this.renderResult() }
      </div>
    );
  }
}

AutocompleteField.defaultProps = {
  onChange: null,
  strict: false,
  containerClassname: '',
  inputClassname: '',
  selectedId: null
};

AutocompleteField.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      value: PropTypes.any,
      label: PropTypes.string
    })
  ).isRequired,
  onChange: PropTypes.func,
  strict: PropTypes.bool,
  containerClassname: PropTypes.string,
  inputClassname: PropTypes.string,
  selectedId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
};

export default AutocompleteField;