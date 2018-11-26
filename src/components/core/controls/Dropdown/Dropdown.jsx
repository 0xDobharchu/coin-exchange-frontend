import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'src/utils/isEqual';
// component
// style
import cn from 'classnames';
import ExpandArrowSVG from 'src/assets/images/icon/expand-arrow.svg';
import SEARCH_ICON_SVG from 'src/assets/images/icon/ic_search.svg';
import style from './Dropdown.scss';

class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: props.placeholder,
      isShow: props.isShow || false,
      idActive: -1,
      itemList: props.source,
    };
    // bind
    this.toogle = ::this.toogle;
    this.onItemSelected = ::this.onItemSelected;
    this.setDefaultItem = ::this.setDefaultItem;
    this.filterSource = ::this.filterSource;
    this.handleShow = ::this.handleShow;
    // will store item selecting
    this.itemSelecting = {};
    this.isDirtyDefault = false;
  }

  onItemSelected(item) {
    this.itemSelecting = item;
    this.setState({ text: item.value, idActive: item.id });
    this.toogle();
    // call back
    // eslint-disable-next-line
    this.props.hasOwnProperty('onItemSelected') && this.props.onItemSelected(item);
  }

  handleShow() {
    this.toogle();
    // eslint-disable-next-line
    if (this.props.hasSearch) {
      this.searchBoxRef.focus();
    }
  }

  toogle() {
    this.setState(state => ({
      isShow: !state.isShow
    }));
  }

  setDefaultItem(nextProps = null) {
    const { defaultId, source } = nextProps || this.props;
    // eslint-disable-next-line
    if (nextProps && !isEqual(nextProps.source, this.props.source)) {
      this.isDirtyDefault = false;
      this.setState({ itemList: nextProps.source });
    }
    const { idActive } = this.state;
    if (!this.isDirtyDefault && defaultId && source && source.length > 0 && idActive !== defaultId) {
      const itemDefault = source.find(item => item.id === defaultId);
      if (itemDefault) {
        this.setState({ text: itemDefault.value, idActive: itemDefault.id });
        this.itemSelecting = itemDefault;
        this.isDirtyDefault = true;
      }
      // call back
      // eslint-disable-next-line
      this.props.hasOwnProperty('afterSetDefault') && this.props.afterSetDefault(itemDefault);
    }
  }

  filterSource(searchValue) {
    clearTimeout(this.searchTimeOut);
    this.searchTimeOut = setTimeout(() => {
      const { source } = this.props;
      const compareValue = value => value.toLowerCase().indexOf(searchValue.trim().toLowerCase()) !== -1;
      this.setState({
        itemList: source.filter(item => compareValue(item.value)),
      });
    }, 50);
  }

  componentDidMount() {
    this.setDefaultItem();
    // eslint-disable-next-line
    this.props.hasOwnProperty('onRef') && this.props.onRef(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setDefaultItem(nextProps);
  }

  componentWillUnmount() {
    // eslint-disable-next-line
    this.props.hasOwnProperty('onRef') && this.props.onRef(undefined);
  }

  render() {
    const { className, hasSearch } = this.props;
    const {
      itemList, text, isShow, idActive
    } = this.state;

    return (
      <div className={`${style.dropdown} ${style.dropdown_custom} ${className || ''}`}>
        <button type="button" className={`btn ${isShow ? 'show-flex' : ''}`} onClick={this.handleShow}>
          <p>{text}</p>
          <div>
            <img src={ExpandArrowSVG} alt="expand arrow" />
          </div>
        </button>
        <ul className={`${style.dropdown_custom_menu} ${isShow ? style.show : style.hide}`}>
          {
            hasSearch && (
              <li className={`${style.dropdown_custom_item} ${style.search_block}`}>
                <input
                  className={style.search_box}
                  onChange={e => this.filterSource(e.target.value)}
                  type="text"
                  // eslint-disable-next-line
                  ref={search => this.searchBoxRef = search}
                />
                <img className="search-icon" src={SEARCH_ICON_SVG} alt="search icon" />
              </li>
            )
          }
          <div className="result" style={this.props.customResultCss || {}}>
            {
              itemList.length > 0 ? (
                itemList.map(item => (
                  <li
                    role="presentation"
                    key={item.id}
                    className={`${style.dropdown_custom_item} ${idActive === item.id ? 'active' : ''} ${item.className ? item.className : ''}`}
                    style={item.style || null}
                    // eslint-disable-next-line
                    onClick={() => (!item.disableClick ? this.onItemSelected(item) : '')}
                    // onClick={this.onItemSelected}
                  >
                    {item.value}
                  </li>
                ))
              ) : (
                <li className={cn(style.dropdown_custom_item, style.no_results)}>
                  No results match
                </li>
              )
            }
          </div>
        </ul>
      </div>
    );
  }
}

Dropdown.propTypes = {
  // placeholder: PropTypes.string,
  // onRef: PropTypes.func,
  // className: PropTypes.string,
  // onItemSelected: PropTypes.func,
  // defaultId: PropTypes.any,
  source: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    value: PropTypes.string,
    style: PropTypes.object,
  })).isRequired,
  // afterSetDefault: PropTypes.func,
  // hasSearch: PropTypes.bool,
  // isShow: PropTypes.bool,

};

Dropdown.defaultProps = {
  // hasSearch: false,
};

export default Dropdown;
