import React from 'react';
import { shallow } from 'enzyme';

import Medicaid from '.';

const handleSubmit = jest.fn();
const whoNeedsHelp = 'parents';
const defaultProps = {
  handleSubmit,
  whoNeedsHelp,
};
const wrap = (props = {}) => shallow(<Medicaid {...defaultProps} {...props} />);

describe('Wizards|assessment - Steps|Medicaid', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('PaddedHeading').contains('Do your parents qualify for Medicaid?')).toBeTruthy();
    expect(wrapper.find('Field').filter({ type: 'boxChoice' })).toHaveLength(1);
    expect(wrapper.find('StyledTipBox')).toHaveLength(1);
  });

  it('renders without tip', () => {
    const wrapper = wrap({
      hasTip: false,
    });

    expect(wrapper.find('PaddedHeading').contains('Do your parents qualify for Medicaid?')).toBeTruthy();
    expect(wrapper.find('Field').filter({ type: 'boxChoice' })).toHaveLength(1);
    expect(wrapper.find('StyledTipBox')).toHaveLength(0);
  });

  it('renders correct heading for myself-and-spouse', () => {
    const wrapper = wrap({
      whoNeedsHelp: 'myself-and-spouse',
    });

    expect(wrapper.find('PaddedHeading').contains('Do you or your spouse qualify for Medicaid?')).toBeTruthy();
  });

  it('renders correct heading for myself', () => {
    const wrapper = wrap({
      whoNeedsHelp: 'myself',
    });

    expect(wrapper.find('PaddedHeading').contains('Do you qualify for Medicaid?')).toBeTruthy();
  });

  it('renders correct heading for other options', () => {
    const wrapper = wrap({
      whoNeedsHelp: 'friend',
    });

    expect(wrapper.find('PaddedHeading').contains('Does your friend(s) qualify for Medicaid?')).toBeTruthy();
  });

  it('handles submit', () => {
    const wrapper = wrap();

    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('handles onSkipClick', () => {
    const onSkipClick = jest.fn();
    const wrapper = wrap({
      onSkipClick,
    });

    wrapper.find('Footer').dive().find('Button')
      .at(0)
      .simulate('click');
    expect(onSkipClick).toHaveBeenCalled();
  });

  it('handles onBackClick', () => {
    const onBackClick = jest.fn();
    const wrapper = wrap({
      onBackClick,
    });

    wrapper.find('Footer').dive().find('StyledIconButton')
      .simulate('click');
    expect(onBackClick).toHaveBeenCalled();
  });
});
