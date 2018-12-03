import React from 'react';
import ExpandArrowSVG from 'src/assets/images/icon/expand-arrow-white.svg';
import { FormattedHTMLMessage } from 'react-intl';
import cx from 'classnames';
import styles from './styles.scss';

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
    const classWrapper = theme === 'black' ? styles.collapseCustomBlack: styles.collapseCustomWhite;
    return (
      <div className={classWrapper}>
        <div className={styles.head} onClick={() => { this.toggle(); }} onKeyPress={this.toggle} role="button" tabIndex={index}>
          <div className={styles.label}>
            <div className={styles.index}>
              {index}
              {index > 9 ? '.' : '. '}
            </div>
            <div className={styles.collapseContent}>{label}</div>
          </div>
          <div className={styles.extend}>
            <img
              className={isCollapsed ? styles.rotate : ''}
              src={ExpandArrowSVG}
              alt="arrow"
            />
          </div>
        </div>
        <div
          className={cx(styles.content, isList ? '' : styles.noList, !isCollapsed ? '' : 'd-none')}
        >
          {isList ? (
            <dl>
              {content.map((item, index) => (
                <React.Fragment key={index}>
                  <dt>{item.title}</dt>
                  <dd>{item.content}</dd>
                </React.Fragment>
              ))}
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
