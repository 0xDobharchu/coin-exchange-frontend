/* eslint react/prop-types:0 */
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import {LabelLang} from 'src/lang/components';
import cx from 'classnames';

const inputField = ({
  input, meta, toggle, labelText, labelClassName, containerClassName, list ,className
}) => {
  const {
    onChange, onBlur, onFocus, value
  } = input;
  const _toggle = toggle || 'Toggle';
  const _list = list || [];
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  const selectedItem = _list.find(i => i.value === value) || {};
  return (
    <div className={containerClassName ? containerClassName : ''}>
      {labelText && (<label className={labelClassName ||  ''}>{ <LabelLang id={labelText} /> }</label>)}
      <Dropdown value={selectedItem.value} className={cx('dropdown-warper', className || '')}>
        <Dropdown.Toggle variant="basic" onFocus={() => onFocus()} onBlur={() => onBlur()}>
          {selectedItem?.label || _toggle}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            _list.map((item, index) => (
              item && (
                <Dropdown.Item
                  key={item.id || index}
                  onClick={() => {
                    onChange(item?.value);
                    if (typeof item?.onClick === 'function') {
                      item?.onClick();
                    }
                  }}
                  value={item?.value}
                >
                  {item?.label}
                </Dropdown.Item>
              )
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
      { shouldShowError && <small className="text-danger"><LabelLang id={error} /></small>}
    </div>
  );
};

export default inputField;
export dropdownValidator from './validator';
