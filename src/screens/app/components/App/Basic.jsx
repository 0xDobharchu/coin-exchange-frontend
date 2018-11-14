import React from 'react';
import { hot } from 'react-hot-loader';
import App from './App';

const Basic = () => (<App />);

export default process.env.isProduction ? Basic : hot(module)(Basic);
