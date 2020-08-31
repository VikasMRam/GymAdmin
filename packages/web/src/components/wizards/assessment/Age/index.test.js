import React from 'react';
import { shallow } from 'enzyme';

import Age from '.';

const handleSubmit = jest.fn();
const whoNeedsHelp = 'parents';
const defaultProps = {
  handleSubmit,
  whoNeedsHelp,
};
const wrap = (props = {}) => shallow(<Age {...defaultProps} {...props} />);

describe('Wizards|assessment - Steps|Age', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('PaddedHeading').contains('How old is your parent(s)?')).toBeTruthy();
    expect(wrapper.find('Field').filter({ type: 'boxChoice' })).toHaveLength(1);
    expect(wrapper.find('StyledTipBox')).toHaveLength(1);
  });

  it('renders without tip', () => {
    const wrapper = wrap({
      hasTip: false,
    });
    expect(wrapper.find('PaddedHeading').contains('How old is your parent(s)?')).toBeTruthy();
    expect(wrapper.find('Field').filter({ type: 'boxChoice' })).toHaveLength(1);
    expect(wrapper.find('StyledTipBox')).toHaveLength(0);
  });

  it('renders correct heading for parents', () => {
    const wrapper = wrap();

    expect(wrapper.find('PaddedHeading').contains('How old is your parent(s)?')).toBeTruthy();
  });

  it('renders correct heading for myself-and-spouse', () => {
    const wrapper = wrap({
      whoNeedsHelp: 'myself-and-spouse',
    });

    expect(wrapper.find('PaddedHeading').contains('How old are you and your spouse?')).toBeTruthy();
  });

  it('renders correct heading for myself', () => {
    const wrapper = wrap({
      whoNeedsHelp: 'myself',
    });

    expect(wrapper.find('PaddedHeading').contains('How old are you?')).toBeTruthy();
  });

  it('renders correct heading for friend', () => {
    const wrapper = wrap({
      whoNeedsHelp: 'friend',
    });

    expect(wrapper.find('PaddedHeading').contains('How old is your friend?')).toBeTruthy();
  });

  it('renders correct heading for other options', () => {
    const wrapper = wrap({
      whoNeedsHelp: 'mom',
    });

    expect(wrapper.find('PaddedHeading').contains('How old is the person(s) you are searching for?')).toBeTruthy();
  });

  it('handles submit', () => {
    const wrapper = wrap();

    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
