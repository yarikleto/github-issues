// Develop dependencies
import React from 'react';
import {observer} from 'mobx-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// Custom dependencies
import { PopapErrors } from '../../components';
import styles from './Input.component.css';

const Input = observer(({
  type,
  labelTitle,
  id,
  value,
  handlerOnChange,
  handlerOnBlur,
  errorList
}) => {
  const hasErrors = (errorList || []).length !== 0;
  return (
    <div className={styles['user-input']}>
      <label className={styles['user-input__label']} htmlFor={id}>
        {labelTitle}
      </label>
      <div className={styles['user-input__wrapper-input']}>
        <input
          id={id}
          type={type}
          value={value}
          onChange={handlerOnChange}
          onBlur={handlerOnBlur}
          className={classNames(styles['user-input__input'], {
            [styles['user-input__input--error']]: hasErrors
          })}
        />
        <PopapErrors errorList={errorList}/>
      </div>
    </div>
  );
});
Input.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handlerOnChange: PropTypes.func.isRequired,
  handlerOnBlur: PropTypes.func.isRequired,
  errorList: PropTypes.array
};

Input.displayName = 'Input';
export default Input;

