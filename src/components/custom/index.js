import React from 'react';
import Switch from 'rc-switch';
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

export const PasswordField = ({ onClick, className, input, ...restProps }) => (
  <input {...input} type="password" className={className ? cn(style.input, className) : style.input} {...restProps} />
);

export const Label = ({ className, children, ...restProps }) => (
  <label className={className ? cn(style.label, className) : style.label} {...restProps}>{children}</label>
);

export const CSwitch = () => (
  <div className={style.customSwitch}>
    <Switch />
  </div>
);


