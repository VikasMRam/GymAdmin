import React from 'react';
import { shallow } from 'enzyme';

import { Who } from 'sly/web/components/wizards/assesment';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
};
const wrap = (props = {}) => shallow(<Who {...defaultProps} {...props} />);

describe('Wizards|Assesment - Steps|Who', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('PaddedHeading')).toHaveLength(1);
    expect(wrapper.find('Field').filter({ type: 'select' })).toHaveLength(1);
    expect(wrapper.find('StyledTipBox')).toHaveLength(1);
  });

  it('renders without tip', () => {
    const wrapper = wrap({
      hasTip: false,
    });

    expect(wrapper.find('PaddedHeading')).toHaveLength(1);
    expect(wrapper.find('Field').filter({ type: 'select' })).toHaveLength(1);
    expect(wrapper.find('StyledTipBox')).toHaveLength(0);
  });

  it('handles submit', () => {
    const wrapper = wrap();

    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
