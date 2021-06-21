import React from 'react';
import { shallow } from 'enzyme';

import Budget from '.';

const handleSubmit = jest.fn();
const change = jest.fn();
const whoNeedsHelp = 'parents';
const city = 'city-name';
const state = 'California';
// const cityFormatted = 'City Name';
// const stateFormatted = 'CA';
const amount = 2000;
// const formattedAmount = '$2,000';
const defaultProps = {
  handleSubmit,
  change,
  whoNeedsHelp,
  city,
  state,
  amount,
};
const expHeading = 'Some families have benefits to help cover senior living costs. Does your parent have access to any of these benefits?';
const wrap = (props = {}) => shallow(<Budget {...defaultProps} {...props} />);

describe('Wizards|assessment - Steps|Budget', () => {
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

  it('renders correct heading for parents', () => {
    const wrapper = wrap({
      whoNeedsHelp: 'parents',
    });

    expect(wrapper.find('Heading').contains(expHeading)).toBeTruthy();
  });

  it('renders correct heading for myself', () => {
    const wrapper = wrap({
      whoNeedsHelp: 'myself',
    });

    expect(wrapper.find('Heading').contains('Some families have benefits to help cover senior living costs. Do you have access to any of these benefits?')).toBeTruthy();
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