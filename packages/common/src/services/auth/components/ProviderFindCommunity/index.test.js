import React from 'react';
import { shallow } from 'enzyme';

import ProviderFindCommunity from '.';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
};
const wrap = (props = {}) => shallow(<ProviderFindCommunity {...defaultProps} {...props} />);

describe('ProviderFindCommunity', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Field')).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it('render error when error is passed', () => {
    const error = 'Blah';
    const wrapper = wrap({ error });
    const errors = wrapper.find('Block').first();

    expect(wrapper.find('Button')).toHaveLength(1);
    expect(errors.contains(error)).toBeTruthy();
  });

  it('handles submit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('Form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('handles onNotFound', () => {
    const handleSubmit = jest.fn();
    const onNotFound = jest.fn();
    const wrapper = wrap({ handleSubmit, onNotFound });

    wrapper.find('ButtonLink').simulate('click');
    expect(onNotFound).toHaveBeenCalled();
  });
});
