import React from 'react';
import { shallow } from 'enzyme';

import CommunityQuestionAnswers from 'sly/web/components/organisms/CommunityQuestionAnswers';
import CommunityAnswer from 'sly/web/components/molecules/CommunityAnswer';

const communityName = 'Rhoda Goldman Plaza';
const questions = [];
const onLeaveAnswerClick = jest.fn();
const onAskQuestionClick = jest.fn();

const defaultProps = {
  communityName, questions, onLeaveAnswerClick, onAskQuestionClick,
};

const question1 = {
  id: '828',
  contentData: 'are the rental fees per person?  i.e. double for a married couple?',
  contentOwnerId: 2549,
  contentOwnerType: 'User',
  createdAt: '2017-02-08T22:48:30Z',
  creator: 'Marvin Friedman',
  parentId: 0,
  published: false,
  taglist: 'community profile, rhoda-goldman-plaza',
  title: 'are the rental fees per person?  i.e. double for a',
  type: 'Question',
  updatedAt: '2017-02-09T00:40:27Z',
  url: 'are-the-rental-fees-per-person-i-e-double-for-a',
  votes: 5,
  contents: [],
};

const question2 = {
  id: '668',
  contentData: 'Can Rhoda Goldman Plaza accept a resident with memory care needs?',
  contentOwnerId: 1,
  contentOwnerType: 'GuestUser',
  createdAt: '2016-10-25T04:35:13Z',
  creator: 'Guest User',
  parentId: 0,
  published: true,
  taglist: 'community profile,rhoda-goldman-plaza',
  title: 'Can Rhoda Goldman Plaza accept a resident with memory care needs?',
  type: 'Question',
  updatedAt: '2018-04-15T23:33:31Z',
  url: 'can-rhoda-goldman-plaza-accept-a-resident-with-memory-care-needs',
  votes: 196,
  contents: [
    {
      id: '838',
      contentData: 'Yes, Rhoda Goldman Plaza has a memory care wing.',
      contentOwnerId: 17,
      contentOwnerType: 'User',
      createdAt: '2017-03-08T18:39:54Z',
      creator: 'Seniorly Concierge Team',
      parentId: 668,
      published: true,
      taglist: '',
      title: 'Can Rhoda Goldman Plaza accept a resident with memory care needs? answer',
      type: 'Answer',
      updatedAt: '2017-03-08T18:39:54Z',
      url: 'can-rhoda-goldman-plaza-accept-a-resident-with-memory-care-needs-answer',
      votes: 0,
      contents: [],
    },
  ],
};

const communityFaQ1 = {
  id: '828',
  contentData: 'are the rental fees per person?  i.e. double for a married couple?',
  contentOwnerId: 2549,
  contentOwnerType: 'User',
  createdAt: '2017-02-08T22:48:30Z',
  creator: 'Marvin Friedman',
  parentId: 0,
  published: false,
  taglist: 'community profile, rhoda-goldman-plaza',
  title: 'are the rental fees per person?  i.e. double for a',
  type: 'CommunityFAQ',
  updatedAt: '2017-02-09T00:40:27Z',
  url: 'are-the-rental-fees-per-person-i-e-double-for-a',
  votes: 5,
  contents: [],
};

const wrap = (props = {}) => shallow(<CommunityQuestionAnswers {...defaultProps} {...props} />);

describe('CommuntityQuestionAnswers', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('verify communityName is shown', () => {
    const wrapper = wrap();
    expect(wrapper.text()).toContain(communityName);
  });

  it('verify render Question', () => {
    const wrapper = wrap({ questions: [question1] });
    const communityQuestion = wrapper.find('PaddedCommunityQuestion');
    expect(communityQuestion).toHaveLength(1);
    const communityAnswer = wrapper.find(CommunityAnswer);
    expect(communityAnswer).toHaveLength(0);
  });

  it('verify render FAQ', () => {
    const wrapper = wrap({ communityFaQs: [communityFaQ1] });
    const communityQuestion = wrapper.find('PaddedCommunityQuestion');
    expect(communityQuestion).toHaveLength(1);
    const communityAnswer = wrapper.find(CommunityAnswer);
    expect(communityAnswer).toHaveLength(0);
  });

  it('verify render Question & FAQ', () => {
    const wrapper = wrap({ questions: [question1], communityFaQs: [communityFaQ1] });
    const communityQuestion = wrapper.find('PaddedCommunityQuestion');
    expect(communityQuestion).toHaveLength(2);
    expect(communityQuestion.at(0).prop('question')).toEqual(question1);
    expect(communityQuestion.at(1).prop('question')).toEqual(communityFaQ1);
    const communityAnswer = wrapper.find(CommunityAnswer);
    expect(communityAnswer).toHaveLength(0);
  });

  it('verify without any questions', () => {
    const wrapper = wrap({ questions: [] });
    const communityQuestion = wrapper.find('PaddedCommunityQuestion');
    expect(communityQuestion).toHaveLength(0);
    const communityAnswer = wrapper.find(CommunityAnswer);
    expect(communityAnswer).toHaveLength(0);
    expect(wrapper.text())
      .toContain(`What would you like to know about senior living options at ${communityName}? To ask a question, click the button below.`);
  });

  it('verify render Question with Answer', () => {
    const wrapper = wrap({ questions: [question2] });
    const communityQuestion = wrapper.find('PaddedCommunityQuestion');
    expect(communityQuestion).toHaveLength(1);
    const communityAnswer = wrapper.find(CommunityAnswer);
    expect(communityAnswer).toHaveLength(1);
  });

  it.skip('verify click on question Leave Answer Button', () => {
    const onLeaveAnswerClick = jest.fn();
    const wrapper = wrap({ questions: [question1], onLeaveAnswerClick });
    const leaveAnswer = wrapper.find('CursorBlock');
    leaveAnswer.simulate('click');
    expect(onLeaveAnswerClick).toHaveBeenCalledWith(question1);
  });

  it('verify click on FAQ be the first to ask this question', () => {
    const onAskQuestionClick = jest.fn();
    const wrapper = wrap({ communityFaQs: [communityFaQ1], onAskQuestionClick });
    const leaveAnswer = wrapper.find('CursorBlock');
    leaveAnswer.simulate('click');
    expect(onAskQuestionClick).toHaveBeenCalledWith(communityFaQ1);
  });
});
