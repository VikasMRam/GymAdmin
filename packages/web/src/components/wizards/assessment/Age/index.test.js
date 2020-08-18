import React from 'react';
import { shallow } from 'enzyme';

import { Age } from 'sly/web/components/wizards/assessment';

const handleSubmit = jest.fn();
const change= jest.fn();
const whoNeedsHelp = 'parents';
const defaultProps = {
  handleSubmit,
  whoNeedsHelp,
  change,
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
    expect(wrapper.find('StyledField').filter({ type: 'boxChoice' })).toHaveLength(1);
    expect(wrapper.find('StyledTipBox')).toHaveLength(1);
  });

  it('renders without tip', () => {
    const wrapper = wrap({
      hasTip: false,
    });

    expect(wrapper.find('PaddedHeading').contains('How old is your parent(s)?')).toBeTruthy();
    expect(wrapper.find('StyledField').filter({ type: 'boxChoice' })).toHaveLength(1);
    expect(wrapper.find('StyledTipBox')).toHaveLength(0);
  });
  /** Fix after options are good */
  /*
  it('renders correct heading for myself-and-spouse', () => {
    const wrapper = wrap({
      whoNeedsHelp: 'myself-and-spouse',
    });

    expect(wrapper.find('PaddedHeading').contains('Which activities do you and your spouse need help with?')).toBeTruthy();
  });

  it('renders correct heading for myself', () => {
    const wrapper = wrap({
      whoNeedsHelp: 'myself',
    });

    expect(wrapper.find('PaddedHeading').contains('Which activities do you need help with?')).toBeTruthy();
  });

  it('renders correct heading for other options', () => {
    const wrapper = wrap({
      whoNeedsHelp: 'mom',
    });

    expect(wrapper.find('PaddedHeading').contains('Which activities below does your mom need help with?')).toBeTruthy();
  });
  */

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
