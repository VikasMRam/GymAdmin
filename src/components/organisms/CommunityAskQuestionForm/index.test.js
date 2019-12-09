import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import CommunityAskQuestionForm from 'sly/components/organisms/CommunityAskQuestionForm';

const handleSubmit = jest.fn();
const communityName = 'Rhoda Goldman Plaza';
const user = { id: 1, name: 'Pranesh Kumar' };
const error = 'Blah';

const wrap = (props = {}) => shallow(<CommunityAskQuestionForm handleSubmit={handleSubmit} communityName={communityName} {...props} />);

describe('CommunityAskQuestionForm', () => {
  it('render name and email when user is not passed', () => {
    const wrapper = wrap({});
    expect(wrapper.find('StyledHeading').dive().dive().dive().render()
      .text()).toContain(communityName);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'question' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(wrapper.find('strong')).toHaveLength(0);
  });

  it('does not render name and email when user is passed', () => {
    const wrapper = wrap({ user });
    expect(wrapper.find('StyledHeading').dive().dive().dive().render()
      .text()).toContain(communityName);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(0);
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(0);
    expect(wrapper.find(Field).filter({ name: 'question' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(wrapper.find('strong')).toHaveLength(0);
  });

  it('render error when error is passed', () => {
    const wrapper = wrap({ error });
    expect(wrapper.find('StyledHeading').dive().dive().dive().render()
      .text()).toContain(communityName);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'question' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(wrapper.find('strong')).toHaveLength(1);
  });

  it('handles onFormSubmit', () => {
    const wrapper = wrap({});
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
