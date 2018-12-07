import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import CommunityBookATourContactForm from 'sly/components/organisms/CommunityBookATourContactForm';
import { Link, Block } from 'sly/components/atoms';

const onAdvisorHelpClick = jest.fn();
const fullName = 'Pranesh Kumar';
const phone = '9999999999';
const contactByTextMsg = 'no';
const error = 'Blah';
const heading = 'Do you have any questions about this tour?';
const subheading = 'A local senior living advisor will help get you set up a tour with this community.';

const wrap = (props = {}) =>
  shallow(<CommunityBookATourContactForm onAdvisorHelpClick={onAdvisorHelpClick} heading={heading} subheading={subheading} {...props} />);

describe('CommunityBookATourContactForm', () => {
  it('render name and phone when userDetails is not passed', () => {
    const wrapper = wrap();
    expect(wrapper.contains(heading)).toBe(true);
    expect(wrapper.contains(subheading)).toBe(true);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'notes' })).toHaveLength(1);
    expect(wrapper.find('Styled(Field)')).toHaveLength(1);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(0);
  });

  it('does not render name, phone and contactByTextMsg when userDetails is passed', () => {
    const wrapper = wrap({ userDetails: { fullName, phone, contactByTextMsg } });
    expect(wrapper.contains(heading)).toBe(true);
    expect(wrapper.contains(subheading)).toBe(true);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(0);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(0);

    expect(wrapper.find('Styled(Field)')).toHaveLength(0);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(0);
    expect(wrapper.find(Link).filter({ href: '/tos' })).toHaveLength(1);
  });

  it('does not render name when name is passed', () => {
    const wrapper = wrap({ userDetails: { fullName } });
    expect(wrapper.contains(heading)).toBe(true);
    expect(wrapper.contains(subheading)).toBe(true);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(0);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);

    expect(wrapper.find('Styled(Field)')).toHaveLength(1);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(0);
    expect(wrapper.find(Link).filter({ href: '/tos' })).toHaveLength(1);
  });

  it('does not render phone when phone is passed', () => {
    const wrapper = wrap({ userDetails: { phone } });
    expect(wrapper.contains(heading)).toBe(true);
    expect(wrapper.contains(subheading)).toBe(true);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(0);

    expect(wrapper.find('Styled(Field)')).toHaveLength(1);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(0);
    expect(wrapper.find(Link).filter({ href: '/tos' })).toHaveLength(1);
  });

  // it('does not render contactByTextMsg when contactByTextMsg is passed', () => {
  //   const wrapper = wrap({ userDetails: { contactByTextMsg } });
  //   expect(wrapper.contains(heading)).toBe(true);
  //   expect(wrapper.contains(subheading)).toBe(true);
  //   expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
  //   expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);
  //   expect(wrapper.find(Field).filter({ name: 'notes' })).toHaveLength(1);
  //   expect(wrapper.find('Styled(Field)')).toHaveLength(0);
  //   expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(0);
  //   expect(wrapper.find(Link).filter({ href: '/tos' })).toHaveLength(1);
  // });

  it('render error when error is passed', () => {
    const wrapper = wrap({ error });
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'notes' })).toHaveLength(1);
    expect(wrapper.find('Styled(Field)')).toHaveLength(1);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(1);
    expect(wrapper.find(Link).filter({ href: '/tos' })).toHaveLength(1);
  });

  it('handles onAdvisorHelpClick', () => {
    const wrapper = wrap();
    wrapper.find(Link).at(0).simulate('click');
    expect(onAdvisorHelpClick).toHaveBeenCalled();
  });

  // it('handles onContactByTextMsgChange', () => {
  //   const onContactByTextMsgChange = jest.fn();
  //   const wrapper = wrap({ onContactByTextMsgChange });
  //   wrapper.find('Styled(Field)').simulate('change');
  //   expect(onContactByTextMsgChange).toHaveBeenCalled();
  // });

  it('renders tos when user is not passed', () => {
    const wrapper = wrap({ user: { name: fullName } });
    expect(wrapper.find(Link).filter({ href: '/tos' })).toHaveLength(0);
  });
});
