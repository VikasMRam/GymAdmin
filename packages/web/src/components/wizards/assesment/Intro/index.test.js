import React from 'react';
import { shallow } from 'enzyme';

import { Intro } from 'sly/web/components/wizards/assesment';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
};
const wrap = (props = {}) => shallow(<Intro {...defaultProps} {...props} />);

describe('Wizards|Assesment - Steps|Intro', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('StyledIcon')).toHaveLength(1);
    expect(wrapper.find('PaddedHeading')).toHaveLength(1);
    expect(wrapper.find('Field').filter({ type: 'button' })).toHaveLength(2);
  });

  it('handles submit', () => {
    const wrapper = wrap();

    wrapper.find('StyledForm').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
