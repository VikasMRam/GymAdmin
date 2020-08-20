import React from 'react';
import { shallow } from 'enzyme';

import LocalExpert from '.';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
};
const wrap = (props = {}) => shallow(<LocalExpert {...defaultProps} {...props} />);

describe('Wizards|assessment - Steps|Feeling', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('PaddedHeading')).toHaveLength(1);
    expect(wrapper.find('PaddedHeading').contains('Are you interested in working with a Local Senior Living Expert? They can help you find senior living options that fit your budget and care needs.')).toBeTruthy();
    expect(wrapper.find('Field').filter({ type: 'boxChoice' })).toHaveLength(1);
    expect(wrapper.find('StyledTipBox')).toHaveLength(1);
  });

  it('renders without tip', () => {
    const wrapper = wrap({
      hasTip: false,
    });

    expect(wrapper.find('PaddedHeading')).toHaveLength(1);
    expect(wrapper.find('PaddedHeading').contains('Are you interested in working with a Local Senior Living Expert? They can help you find senior living options that fit your budget and care needs.')).toBeTruthy();
    expect(wrapper.find('Field').filter({ type: 'boxChoice' })).toHaveLength(1);
    expect(wrapper.find('StyledTipBox')).toHaveLength(0);
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
