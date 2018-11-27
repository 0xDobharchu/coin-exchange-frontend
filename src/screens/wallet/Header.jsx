import React from 'react';
import PropTypes from 'prop-types';

import style from './styles.scss';


class Header extends React.Component {
  constructor(props) {
    super(props);   
  }  

  renderLink(){
    const { hasLink, title, icon, icon2, linkTitle, onLinkClick, onIcon2Click } = this.props;
    if (!hasLink) return "";
    let html ='';
    if (icon){
     html = <img onClick={onLinkClick} src={icon} />
    }
    else    
      html = <div onClick={onLinkClick} className={style.headerLink}>{linkTitle}</div>
    if (icon2){
      html = <div> <img className={style['header-icon-2']} onClick={onIcon2Click} src={icon2} />{html} </div>
    }
    return html;
    
  }

  render() {
    const { hasLink, title, linkTitle, onLinkClick } = this.props;
    return (
        <div className={style.headerBox}>          
          <span className={style.headerText}>{title}</span>  
          {this.renderLink()}
        </div>
    );
  }
}

Header.propTypes = {
  hasLink: PropTypes.bool,
  title: PropTypes.string,
  linkTitle: PropTypes.string,
  icon : PropTypes.any,
  icon2: PropTypes.any,
  onLinkClick: PropTypes.func,
  onIcon2Click: PropTypes.func,
};

export default Header;
