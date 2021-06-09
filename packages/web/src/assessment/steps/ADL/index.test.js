import React from 'react';
import { shallow } from 'enzyme';

import ADL from '.';

const handleSubmit = jest.fn();
const change = jest.fn();
const whoNeedsHelp = 'parents';
const defaultProps = {
  handleSubmit,
  whoNeedsHelp,
  change,
};
const expHeading = 'Does your parent need help with any of the following?';
const wrap = (props = {}) => shallow(<ADL {...defaultProps} {...props} />);

describe('Wizards|assessment - Steps|ADL', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Heading').contains(expHeading)).toBeTruthy();
    expect(wrapper.find('Field').filter({ type: 'boxChoice' })).toHaveLength(1);
    expect(wrapper.find('TipBox')).toHaveLength(1);
  });

  it('renders without tip', () => {
    const wrapper = wrap({
      hasTip: false,
    });

    expect(wrapper.find('Heading').contains(expHeading)).toBeTruthy();
    expect(wrapper.find('Field').filter({ type: 'boxChoice' })).toHaveLength(1);
    expect(wrapper.find('TipBox')).toHaveLength(0);
  });

  it('renders correct heading for spouse', () => {
    const wrapper = wrap({
      whoNeedsHelp: 'spouse',
    });

    expect(wrapper.find('Heading').contains('Does your spouse or partner need help with any of the following?')).toBeTruthy();
  });

  it('renders correct heading for myself', () => {
    const wrapper = wrap({
      whoNeedsHelp: 'myself',
    });

    expect(wrapper.find('Heading').contains('Do you need help with any of the following?')).toBeTruthy();
  });

  it('renders correct heading for other options', () => {
    const wrapper = wrap({
      whoNeedsHelp: 'other',
    });
    expect(wrapper.find('Heading').contains('Do you need help with any of the following?')).toBeTruthy();
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
