import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import CommunitySATContactForm from 'sly/components/organisms/CommunitySATContactForm';
import { Link, Block } from 'sly/components/atoms';

const onAdvisorHelpClick = jest.fn();
const user = { id: 1, name: 'Pranesh Kumar' };
const error = 'Blah';
const guHeading = 'How can we contact you about this community tour?';
const userHeading = 'Do you have any questions about this tour?';

const wrap = (props = {}) =>
  shallow(<CommunitySATContactForm onAdvisorHelpClick={onAdvisorHelpClick} {...props} />);

describe('CommunitySATContactForm', () => {
  it('render name and email when user is not passed', () => {
    const wrapper = wrap();
    expect(wrapper.contains(guHeading)).toBe(true);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'note' })).toHaveLength(0);
    expect(wrapper.find({ type: 'checkbox' })).toHaveLength(1);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(0);
  });

  it('does not render name, note and email when user is passed', () => {
    const wrapper = wrap({ user });
    expect(wrapper.contains(userHeading)).toBe(true);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(0);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(0);
    expect(wrapper.find(Field).filter({ name: 'note' })).toHaveLength(1);
    expect(wrapper.find({ type: 'checkbox' })).toHaveLength(0);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(0);
  });

  it('render error when error is passed', () => {
    const wrapper = wrap({ error });
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'note' })).toHaveLength(0);
    expect(wrapper.find({ type: 'checkbox' })).toHaveLength(1);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(1);
  });

  it('handles onAdvisorHelpClick', () => {
    const wrapper = wrap();
    wrapper.find(Link).at(0).simulate('click');
    expect(onAdvisorHelpClick).toHaveBeenCalled();
  });
});
