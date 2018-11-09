import React from 'react';
import { shallow } from 'enzyme';

import BookingFormFooter from 'sly/components/molecules/BookingFormFooter';

import { Button } from 'sly/components/atoms';

const wrap = (props = {}) => shallow(<BookingFormFooter {...props} />);

describe('BookingFormFooter', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('PreferenceWrapper').childAt(0).dive().text()).toContain('Select a Date');
    expect(wrapper.find('PreferenceWrapper').childAt(1).text()).toContain('Select a Time');
    expect(wrapper.find(Button).dive().dive().text()).toContain('Next');
  });

  it('renders with date', () => {
    const wrapper = wrap({ date: '2018-1-9' });
    expect(wrapper.find('PreferenceWrapper').childAt(0).dive().text()).toContain('Tuesday, JAN 9');
    expect(wrapper.find('PreferenceWrapper').childAt(1).text()).toContain('Select a Time');
  });

  it('renders with time', () => {
    const wrapper = wrap({ time: 'Anytime' });
    expect(wrapper.find('PreferenceWrapper').childAt(0).dive().text()).toContain('Select a Date');
    expect(wrapper.find('PreferenceWrapper').childAt(1).text()).toContain('Anytime');
  });

  it('renders with date and time', () => {
    const wrapper = wrap({ date: '2018-1-9', time: 'Anytime' });
    expect(wrapper.find('PreferenceWrapper').childAt(0).dive().text()).toContain('Tuesday, JAN 9');
    expect(wrapper.find('PreferenceWrapper').childAt(1).text()).toContain('Anytime');
  });

  it('renders with finalStep', () => {
    const wrapper = wrap({ finalStep: true });
    expect(wrapper.find('PreferenceWrapper').childAt(0).dive().text()).toContain('Select a Date');
    expect(wrapper.find('PreferenceWrapper').childAt(1).text()).toContain('Select a Time');
    expect(wrapper.find(Button).dive().dive().text()).toContain('Send Tour Request');
  });

  it('renders with finalStep, date and time', () => {
    const wrapper = wrap({ date: '2018-1-9', time: 'Anytime', finalStep: true });
    expect(wrapper.find('PreferenceWrapper').childAt(0).dive().text()).toContain('Tuesday, JAN 9');
    expect(wrapper.find('PreferenceWrapper').childAt(1).text()).toContain('Anytime');
    expect(wrapper.find(Button).dive().dive().text()).toContain('Send Tour Request');
  });
});
