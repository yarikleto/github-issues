// Develop dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom';
// Custom dependencies
import { IssuesList, IssuesInfo } from '../../components';

const ResultArea = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={IssuesList} />
        <Route exact path="/issue/:number" component={IssuesInfo} />
        <Route to="/" render={() => <h1>404</h1>} />
      </Switch>
    </div>
  );
};

export default ResultArea;
