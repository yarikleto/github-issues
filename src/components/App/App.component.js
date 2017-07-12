// Develop dependencies
import React from 'react';
import {Route, Link} from 'react-router-dom';
// Custom dependencies
import styles from './App.component.css';
import {SearchForm, ResultArea} from '../../components';
const App = () => {
  return (
    <div>
      <div className={styles.app__title}>
        <Link to="/" className={styles['app__logo-link']}>
          GitHub Issues
        </Link>
      </div>
      <div className={styles.container}>
        <Route exact path="/" component={SearchForm}/>
        <ResultArea/>
      </div>
    </div>
  );
};

App.displayName = 'App';
export default App;
