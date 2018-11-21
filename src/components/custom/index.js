import React from 'react';
import cn from 'classnames';
import style from './style.scss';

// eslint-disable-next-line
export const Button = ({ onClick, value, className }) => (
  <input className={className ? cn(style.button, className) : style.button} type="button" onClick={onClick} value={value} />
);

// eslint-disable-next-line
export const Input = ({ onClick, className, ...restProps }) => (
  <input className={className ? cn(style.input, className) : style.input} {...restProps} />
);

export const InputField = ({ onClick, className, input, ...restProps }) => (
  <input {...input} className={className ? cn(style.input, className) : style.input} {...restProps} />
);

