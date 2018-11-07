import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'src/app';

const container = document.getElementById('root-app');
ReactDom.render(<Router><App /></Router>, container);