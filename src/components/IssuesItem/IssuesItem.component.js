// Develop dependencies
import React from 'react';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
// Custom dependencies
import styles from './IssuesItem.component.css';

const IssuesItem = observer(({issue}) => {
  return (
    <li className={styles['issues-list__item']} id={issue.number}>
      <div className={styles['issues-list__number']}>#{issue.number}</div>
      <div className={styles['issues-list__user-info']}>
        <div className={styles['issues-list__avatar-wrapper']}>
          <img
            src={issue.userAvatar}
            alt="user avatar"
            className={styles['issues-list__avatar']}/>
        </div>
        <div className={styles['issues-list__name']}>
          {issue.nickname}
        </div>
        <a
          href={issue.userGithubLink}
          className={styles['issues-list__github-link']}
          target='_blank'
        >
          GitHub
        </a>
      </div>
      <Link to={`/issue/${issue.number}`} className={styles['issues-list__title']}>
        {issue.title}
      </Link>
      <div className={styles['issues-list__opening-date']}>
        {getFormatedDate(issue.openingDate)}
      </div>
    </li>
  );
});
IssuesItem.propTypes = {
  issue: PropTypes.object.isRequired
};

IssuesItem.displayName = 'IssuesItem';
export default IssuesItem;

function getFormatedDate(date) {
  return new Date(date).toLocaleString();
}
