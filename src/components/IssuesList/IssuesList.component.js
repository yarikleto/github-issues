// Develop dependenсies
import React from 'react';
import {inject, observer} from 'mobx-react';
// Custom dependenсies
import {IssuesItem} from '../../components';
import styles from './IssuesList.component.css';

const IssuesList = inject('store')(observer(({store}) => {
  return (
    <div>
      <ul className={styles['issues-list']}>
        {renderIssues(store)}
      </ul>
      {renderDownloadIssuesButton(store)}
    </div>
  );
}));

IssuesList.displayName = 'IssuesList';
export default IssuesList;

// Render functions
function renderIssues({issues}) {
  return issues.map(issue => {
    return <IssuesItem key={issue.id} issue={issue}/>;
  });
}

function renderDownloadIssuesButton({isDisplayDownloadIssuesButton, downloadMoreIssues}) {
  if (isDisplayDownloadIssuesButton === true) 
    return (
      <div className={styles['issues-list__download-button-wrapper']}>
        <button
          onClick={downloadMoreIssues}
          className={styles['issues-list__download-button']}>Загрузить еще...</button>
      </div>
    );
  return null;
}
