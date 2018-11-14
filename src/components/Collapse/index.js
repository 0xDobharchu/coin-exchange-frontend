import React from 'react';
import ExpandArrowSVG from 'src/assets/images/icon/expand-arrow-white.svg';
import './styles.scss';
import { FormattedHTMLMessage } from 'react-intl';

class Collapse extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
    this.toggle = ::this.toggle;
  }

  toggle() {
    this.setState(state => ({ isCollapsed: !state.isCollapsed }));
  }

  render() {
    const { isCollapsed } = this.state;
    const {
      label, content, isList, index, theme = 'black'
    } = this.props;
    const classWrapper = theme === 'black' ? 'collapse-custom-black' : 'collapse-custom-white';
    return (
      <div className={classWrapper}>
        <div className="head" onClick={() => {}} onKeyPress={this.toggle} role="button" tabIndex={index}>
          <div className="label">
            <div className="index">
              {index}
              {index > 9 ? '.' : '. '}
            </div>
            <div className="collapse-content">{label}</div>
          </div>
          <div className="extend">
            <img
              className={isCollapsed ? 'rotate' : ''}
              src={ExpandArrowSVG}
              alt="arrow"
            />
          </div>
        </div>
        <div
          className={`content ${isList ? '' : 'noList'} ${
            !isCollapsed ? '' : 'd-none'
          }`}
        >
          {isList ? (
            <dl>
              {content.map(item => [
                <dt>{item.title}</dt>,
                <dd>{item.content}</dd>,
              ])}
            </dl>
          ) : (
            <div>
              <FormattedHTMLMessage
                id="temp"
                defaultMessage={content}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Collapse;
