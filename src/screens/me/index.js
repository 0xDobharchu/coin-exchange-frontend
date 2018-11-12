import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { Switch, Route } from 'react-router-dom';
import DynamicImport from 'src/screens/app/components/DynamicImport';

console.log(DynamicImport);

const Loading = () => (<div>Loading...</div>);

const Me = props => (
  <DynamicImport loading={Loading} load={() => import('src/screens/me/pages/Me/Me')}>
    {Component => <Component {...props} />}
  </DynamicImport>
);

export default Me;
