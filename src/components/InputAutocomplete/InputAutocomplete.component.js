// Develop dependencies
import React, {PureComponent} from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Custom dependencies
import {PopapErrors, AutocompleteList} from './../../components';
import styles from './InputAutocomplete.component.css';

@observer
export default class InputAutocomplete extends PureComponent {
  deactivateTimeoutId = null;
  state = {
    InputIsFocused: false
  }
  render() {
    // props values
    const {
      type,
      id,
      value,
      handlerOnChange,
      autocompleteData,
      handlerOnClick,
      labelTitle,
      errorList
    } = this.props;
    // state values
    const {InputIsFocused} = this.state;
    // computed values
    const hasErrors = (errorList || []).length !== 0;

    return (
      <div className={styles['input-autocomplete']}>
        <label className={styles['input-autocomplete__label']} htmlFor={id}>
          {labelTitle}
        </label>
        <div className={styles['input-autocomplete__wrapper-input']}>
          <input
            onFocus={this._activateFocus}
            onBlur={this._deactivateFocus}
            id={id}
            type={type}
            value={value}
            onChange={handlerOnChange}
            className={classNames(styles['input-autocomplete__input'], {
              [styles['input-autocomplete__input--error']]: hasErrors
            })}/>
          <PopapErrors errorList={errorList}/>
          <AutocompleteList
            data={autocompleteData}
            handlerOnClick={handlerOnClick}
            isDisplay={InputIsFocused}
          />
        </div>
      </div>
    );
  }

  _activateFocus = () => {
    clearTimeout(this.deactivateTimeoutId);
    this.setState({InputIsFocused: true});
  };

  _deactivateFocus = () => {
    clearTimeout(this.deactivateTimeoutId);
    this.deactivateTimeoutId = setTimeout(() => {
      this.setState({InputIsFocused: false});
    }, 500);
  };
}

InputAutocomplete.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handlerOnChange: PropTypes.func.isRequired,
  handlerOnClick: PropTypes.func.isRequired,
  autocompleteData: PropTypes.array.isRequired,
  errorList: PropTypes.array
};
