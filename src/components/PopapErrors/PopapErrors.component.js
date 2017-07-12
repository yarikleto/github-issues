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
  displayPopaTimeoutId = null;

  componentWillReceiveProps(newProps) {
    // Если поступил старый props, то пропускаем
    if (newProps.errorList === this.props.errorList) return;
    if (newProps.errorList !== null && newProps.errorList.length !== 0) {
      clearTimeout(this.displayPopaTimeoutId);
      this.setState({isDisplayPopup: true});
      this.displayPopaTimeoutId = setTimeout(() => {
        this.setState({isDisplayPopup: false});
      }, 2000);
    }
  }

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