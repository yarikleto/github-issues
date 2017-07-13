// Develop dependencies
import React, {PureComponent} from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
// Custom dependencies
import styles from './PopapErrors.component.css';

@observer
export default class PopapErrors extends PureComponent {
  state = {
    isDisplayPopup: false,
  };
  displayPopapTimeoutId = null;

  render() {
    const { isDisplayPopup } = this.state;
    const { errorList } = this.props;

    if (isDisplayPopup === true)
      return (
        <div className={styles['error-popap']}>
          {renderErrors(errorList)}
        </div>
      );
    return null;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errorList === this.props.errorList) return;
    if (this.isValidArray(newProps.errorList)) {
      clearTimeout(this.displayPopapTimeoutId);
      this.setState({isDisplayPopup: true}, this.doNotDisplayThrough(2000));
    }
  }

  doNotDisplayThrough(delay) {
    this.displayPopapTimeoutId = setTimeout(() => {
      this.setState({isDisplayPopup: false});
    }, 2000);
  }

  isValidArray(array) {
    return array !== null && array.length !== 0;
  }
}
PopapErrors.propTypes = {
  errorList: PropTypes.array,
};


// Render functions

function renderErrors(errorList) {
  if (errorList === null) return null;
  return errorList.map((error, i) => {
    return <div key={i} className={styles.error}>{error}</div>;
  });
}