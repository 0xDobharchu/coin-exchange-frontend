import React from 'react';
import { Link } from 'react-router-dom';
import imgNinja from 'src/assets/images/ninja-header-black.svg';
import styles from './styles.scss';

const Header = () => {
  const logo = <Link to="/" className="d-inline-block mt-1"><img alt="logo" src={imgNinja} width="100" /></Link>;
  const navLinks = (
    <span>
      <span><Link to="/">Product</Link></span>
      <span><Link to="/">Research</Link></span>
    </span>
  );
  const btnJoin = <Link className="btn btn-primary-landing" to="/">Join with us</Link>;
  return (
    <div className={`${styles.container} row d-none d-md-flex`}>
      <div className="col-2">
        {logo}
      </div>
      <div className="col-10">
        <div className="text-right">
          <span className="mr-4">{navLinks}</span>
          {btnJoin}
        </div>
      </div>
    </div>
  );
};

export default Header;
