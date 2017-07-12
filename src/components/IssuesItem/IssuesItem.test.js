import React from 'react';
import IssuesItem from './IssuesItem.component';
import { shallow } from 'enzyme';

describe('IssuesItem', () => {
  const issue = {
    number: 1,
    userAvatar: '',
    nickname: 'testNickname',
    userGithubLink: 'test.ru',
    title: 'Test title',
    openingDate: new Date()
  };
  const issuesItem = shallow(<IssuesItem issue={issue}/>);
  
  test('Каждое обращение должно отображаться с указанием номера', () => {
    expect(issuesItem.text().includes(issue.number)).toEqual(true);
  });
  test('Каждое обращение должно отображаться с указанием даты обращения', () => {
    const formatDate = new Date(issue.openingDate).toLocaleString();
    expect(issuesItem.text().includes(formatDate)).toEqual(true);
  });
});
