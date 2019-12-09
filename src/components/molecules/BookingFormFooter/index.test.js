import React from 'react';
import { shallow } from 'enzyme';

import BookingFormFooter from 'sly/components/molecules/BookingFormFooter';

const wrap = (props = {}) => shallow(<BookingFormFooter {...props} />);

describe('BookingFormFooter', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('PreferenceWrapper').childAt(0).render().text()).toContain('Select a Date');
    expect(wrapper.find('PreferenceWrapper').childAt(1).render().text()).toContain('Select a Time');
    expect(wrapper.find('StyledButton').render().text()).toContain('Continue');
  });

  it('renders with date', () => {
    const wrapper = wrap({ date: '2018-1-9' });
    expect(wrapper.find('PreferenceWrapper').childAt(0).render().text()).toContain('Tuesday, Jan 9');
    expect(wrapper.find('PreferenceWrapper').childAt(1).render().text()).toContain('Select a Time');
  });

  it('renders with time', () => {
    const wrapper = wrap({ time: 'Anytime' });
    expect(wrapper.find('PreferenceWrapper').childAt(0).render().text()).toContain('Select a Date');
    expect(wrapper.find('PreferenceWrapper').childAt(1).render().text()).toContain('Anytime');
  });

  it('renders with date and time', () => {
    const wrapper = wrap({ date: '2018-1-9', time: 'Anytime' });
    expect(wrapper.find('PreferenceWrapper').childAt(0).render().text()).toContain('Tuesday, Jan 9');
    expect(wrapper.find('PreferenceWrapper').childAt(1).render().text()).toContain('Anytime');
  });

  it('renders with isFinalStep', () => {
    const wrapper = wrap({ isFinalStep: true });
    expect(wrapper.find('PreferenceWrapper').childAt(0).render().text()).toContain('Select a Date');
    expect(wrapper.find('PreferenceWrapper').childAt(1).render().text()).toContain('Select a Time');
    expect(wrapper.find('StyledButton').render().text()).toContain('Send Tour Request');
  });

  it('renders with isFinalStep, date and time', () => {
    const wrapper = wrap({ date: '2018-1-9', time: 'Anytime', isFinalStep: true });
    expect(wrapper.find('PreferenceWrapper').childAt(0).render().text()).toContain('Tuesday, Jan 9');
    expect(wrapper.find('PreferenceWrapper').childAt(1).render().text()).toContain('Anytime');
    expect(wrapper.find('StyledButton').render().text()).toContain('Send Tour Request');
  });

  it('onProgressClick is called', () => {
    const onProgressClick = jest.fn();
    const wrapper = wrap({ onProgressClick });
    wrapper.find('StyledButton').simulate('click');
    expect(onProgressClick).toHaveBeenCalled();
  });

  it('renders when isButtonDisabled', () => {
    const wrapper = wrap({ isButtonDisabled: true });
    expect(wrapper.find('StyledButton').at(0).props().disabled).toBe(true);
  });
});
