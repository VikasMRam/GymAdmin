import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import CommunityBookATourContactForm from 'sly/web/components/organisms/CommunityBookATourContactForm';
import TosAndPrivacy from 'sly/web/components/molecules/TosAndPrivacy/index';

const onAdvisorHelpClick = jest.fn();
const fullName = 'Pranesh Kumar';
const phone = '9999999999';
const contactByTextMsg = 'no';
const error = 'Blah';
const heading = 'Do you have any questions about this tour?';

const wrap = (props = {}) =>
  shallow(<CommunityBookATourContactForm onAdvisorHelpClick={onAdvisorHelpClick} heading={heading} {...props} />);

describe('CommunityBookATourContactForm', () => {
  it('render name and phone when userDetails is not passed', () => {
    const wrapper = wrap();
    expect(wrapper.contains(heading)).toBe(true);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);
    expect(wrapper.find('Block').filter({ palette: 'danger' })).toHaveLength(0);
  });

  it('does not render name, phone and contactByTextMsg when user is passed', () => {
    const wrapper = wrap({ user: { name: fullName, phoneNumber: phone, contactByTextMsg } });
    expect(wrapper.contains(heading)).toBe(true);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(0);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(0);

    expect(wrapper.find('StyledField')).toHaveLength(0);
    expect(wrapper.find('Block').filter({ palette: 'danger' })).toHaveLength(0);
    expect(wrapper.find(TosAndPrivacy)).toHaveLength(0);
  });

  it('does not render name when name is passed', () => {
    const wrapper = wrap({ user: { name: fullName } });
    expect(wrapper.contains(heading)).toBe(true);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(0);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);
    // expect(wrapper.find(Field).filter({ name: 'notes' })).toHaveLength(1);

    expect(wrapper.find('Block').filter({ palette: 'danger' })).toHaveLength(0);
    expect(wrapper.find(TosAndPrivacy)).toHaveLength(0);
  });

  it('does not render phone when phone is passed', () => {
    const wrapper = wrap({ user: { phoneNumber: phone } });
    expect(wrapper.contains(heading)).toBe(true);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(0);
    expect(wrapper.find('Block').filter({ palette: 'danger' })).toHaveLength(0);
    expect(wrapper.find(TosAndPrivacy)).toHaveLength(0);
  });

  it('render error when error is passed', () => {
    const wrapper = wrap({ error });
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);

    expect(wrapper.find('Block').filter({ palette: 'danger' })).toHaveLength(1);
    expect(wrapper.find(TosAndPrivacy)).toHaveLength(1);
  });

  it('renders tos when user is not passed', () => {
    const wrapper = wrap({ user: { name: fullName } });
    expect(wrapper.find(TosAndPrivacy)).toHaveLength(0);
  });
});
