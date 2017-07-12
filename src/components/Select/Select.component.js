// Develop dependencies
import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
// Custom dependencies
import styles from './Select.component.css';

const Select = observer(({name, defaultValue, handlerOnChange, options}) => {
  return (
    <select
      name={name}
      value={defaultValue}
      onChange={handlerOnChange}
      className={styles.select}>
      {renderOptions(options)}
    </select>
  );
});
Select.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.number,
  handlerOnChange: PropTypes.func,
  options: PropTypes.array
};

export default Select;

// Render functions
function renderOptions(options) {
  return options.map((optionValue, i) => {
    return (
      <option key={i} value={optionValue}>
        {optionValue}
      </option>
    );
  });
}
