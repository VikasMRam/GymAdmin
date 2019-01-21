import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import CommunityLeaveAnAnswerForm from 'sly/components/organisms/CommunityLeaveAnAnswerForm';

const handleSubmit = jest.fn();
const questionText = 'How is the experience in Rhoda Goldman Plaza';
const error = 'Blah';

const wrap = (props = {}) => shallow(<CommunityLeaveAnAnswerForm handleSubmit={handleSubmit} questionText={questionText} {...props} />);

describe('CommunityLeaveAnAnswerForm', () => {
  it('render CommunityLeaveAnAnswerForm', () => {
    const wrapper = wrap({ });
    expect(wrapper.find('QuestionTextDiv').html()).toContain(questionText);
    expect(wrapper.find(Field).filter({ name: 'answer' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(wrapper.find('strong')).toHaveLength(0);
  });

  it('render error when error is passed', () => {
    const wrapper = wrap({ error });
    expect(wrapper.find('QuestionTextDiv').html()).toContain(questionText);
    expect(wrapper.find(Field).filter({ name: 'answer' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(wrapper.find('strong')).toHaveLength(1);
  });

  it('handles onFormSubmit', () => {
    const wrapper = wrap({ });
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
