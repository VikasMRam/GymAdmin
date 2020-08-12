import React from 'react';
import { shallow } from 'enzyme';

import ProviderConfirmation from '.';

const defaultProps = {
  mode: 'Approved',
};
const wrap = (props = {}) => shallow(<ProviderConfirmation {...defaultProps} {...props} />);

describe('ProviderConfirmation|Web', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Heading')).toHaveLength(1);
    expect(wrapper.find('Paragraph')).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it('renders with mode NotFound', () => {
    const wrapper = wrap({
      mode: 'NotFound',
    });

    expect(wrapper.find('Heading')).toHaveLength(1);
    expect(wrapper.find('Paragraph')).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it('handles onSubmit', () => {
    const onSubmit = jest.fn();
    const mode = 'NeedApproval';
    const wrapper = wrap({ onSubmit, mode });

    expect(wrapper.find('Heading')).toHaveLength(1);
    wrapper.find('Button').simulate('click');
    expect(onSubmit).toHaveBeenCalled();
  });
});
