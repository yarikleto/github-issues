// Develop dependencies
import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
// Custom dependencies
import styles from './AutocompleteList.component.css';

const AutocompleteList = observer(({data, handlerOnClick, isDisplay}) => {
  if (isDisplay === false || data.length === 0)
    return null;
  return (
    <ul className={styles['autocomplete-list']}>
      {data.map((itemValue, i) => {
        return (
          <li
            className={styles['autocomplete-list__item']}
            key={i}
            onClick={handlerOnClick(itemValue)}>
            {itemValue}
          </li>
        );
      })}
    </ul>
  );
});

AutocompleteList.propTypes = {
  data: PropTypes.array.isRequired,
  handlerOnClick: PropTypes.func.isRequired,
  isDisplay: PropTypes.bool.isRequired,
};

AutocompleteList.displayName = 'AutocompleteList';
export default AutocompleteList;