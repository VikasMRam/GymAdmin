import React from 'react';
import { shallow } from 'enzyme';

import { Feeling } from 'sly/web/components/wizards/assesment';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
};
const wrap = (props = {}) => shallow(<Feeling {...defaultProps} {...props} />);

describe('Wizards|Assesment - Steps|Feeling', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('PaddedHeading')).toHaveLength(1);
    expect(wrapper.find('StyledField').filter({ type: 'boxChoice' })).toHaveLength(1);
    expect(wrapper.find('StyledTipBox')).toHaveLength(1);
  });

  it('renders without tip', () => {
    const wrapper = wrap({
      hasTip: false,
    });

    expect(wrapper.find('PaddedHeading')).toHaveLength(1);
    expect(wrapper.find('StyledField').filter({ type: 'boxChoice' })).toHaveLength(1);
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
