import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import CommuntityQuestionAndAnswer, { AskQuestionButton, LeaveAnswerButton, AnswersCountTextDiv } from 'sly/components/organisms/CommunityQuestionAnswers/index';
import CommunityAskQuestionFormContainer from 'sly/containers/CommunityAskQuestionFormContainer';
import CommunityLeaveAnAnswerFormContainer from 'sly/containers/CommunityLeaveAnAnswerFormContainer';
import CommunityQuestion from 'sly/components/molecules/CommunityQuestion';
import CommunityAnswer from 'sly/components/molecules/CommunityAnswer';

const communityName = 'Rhoda Goldman Plaza';
const communitySlug = 'rhoda-goldman-plaza';
const questions = [];
const setModal = sinon.spy();
const onLeaveAnswerButtonClick = sinon.spy();

const defaultProps = {
  communityName, communitySlug, questions,
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

const wrap = (props = {}) => shallow(<CommuntityQuestionAndAnswer {...defaultProps} {...props} />);

describe('CommuntityQuestionAndAnswer', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('verify communityName is shown', () => {
    const wrapper = wrap({});
    expect(wrapper.text()).toContain(communityName);
  });

  it('verify no Modals are open by default', () => {
    const wrapper = wrap({});
    expect(wrapper.find(CommunityAskQuestionFormContainer)).toHaveLength(0);
    expect(wrapper.find(CommunityLeaveAnAnswerFormContainer)).toHaveLength(0);
  });

  it('verify open Ask a Question Modal', () => {
    const wrapper = wrap({ isQuestionModalOpenValue: true });
    expect(wrapper.find(CommunityAskQuestionFormContainer)).toHaveLength(1);
    expect(wrapper.find(CommunityLeaveAnAnswerFormContainer)).toHaveLength(0);
  });

  it('verify open Leave an Answer Modal', () => {
    const wrapper = wrap({ answerQuestionValue: { foo: 'bar' } });
    expect(wrapper.find(CommunityAskQuestionFormContainer)).toHaveLength(0);
    expect(wrapper.find(CommunityLeaveAnAnswerFormContainer)).toHaveLength(1);
  });

  it('verify click on Ask a Question Button', () => {
    const wrapper = wrap({ setModal });
    const askQuestionButton = wrapper.find(AskQuestionButton);
    askQuestionButton.simulate('click');
    expect(setModal.getCalls()).toHaveLength(1);
  });

  it('verify render Question', () => {
    const wrapper = wrap({ questions: [question1] });
    const communityQuestion = wrapper.find(CommunityQuestion);
    expect(communityQuestion).toHaveLength(1);
    const communityAnswer = wrapper.find(CommunityAnswer);
    expect(communityAnswer).toHaveLength(0);
    expect(wrapper.find(AnswersCountTextDiv).render().text()).toEqual('No answers yet.');
  });

  it('verify render Question with Answer', () => {
    const wrapper = wrap({ questions: [question2] });
    const communityQuestion = wrapper.find(CommunityQuestion);
    expect(communityQuestion).toHaveLength(1);
    const communityAnswer = wrapper.find(CommunityAnswer);
    expect(communityAnswer).toHaveLength(1);
    expect(wrapper.find(AnswersCountTextDiv).render().text()).toEqual('1 Answer');
  });

  it('verify click on Leave Answer Button', () => {
    const wrapper = wrap({ questions: [question1], answerQuestion: onLeaveAnswerButtonClick });
    const leaveAnswerButton = wrapper.find(LeaveAnswerButton);
    leaveAnswerButton.simulate('click');
    expect(onLeaveAnswerButtonClick.getCalls()).toHaveLength(1);
  });
});
