import React from 'react';
import { shallow } from 'enzyme';

import EbookForm from './index';

import { Block } from 'sly/components/atoms/index';

const error = 'Required field';

const wrap = (props = {}) => shallow(<EbookForm {...props} />);

describe('EbookForm', () => {
  it('render EbookForm', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    expect(wrapper.find('StyledField').filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(wrapper.find(Block)).toHaveLength(0);
  });

  it('should render error message', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit, error });

    expect(wrapper.find('StyledField').filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(wrapper.find(Block)).toHaveLength(1);
    expect(wrapper.find(Block).contains(error)).toBeTruthy();
  });

  it('Should call handleSubmit prop for valid form submission', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('Form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
