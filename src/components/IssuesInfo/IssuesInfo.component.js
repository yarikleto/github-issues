// Develop dependencies
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const IssuesInfo = inject('store')(
  observer(({ match, store }) => {
    const issue = store.getIssueByNumber(match.params.number);
    if (typeof issue === 'undefined')
      return (
        <div>
          <h1>Не найдено</h1>
          <Link to="/">Вернуться назад</Link>
        </div>
      );
    return (
      <div>
        <h4>{issue.title}</h4>
        <p>
          {issue.body}
        </p>
        <Link to="/">Назад</Link>
      </div>
    );
  })
);

export default IssuesInfo;
