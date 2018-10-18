import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import { Button } from 'sly/components/atoms/index';

import SaveCommunityForm from '.';

const wrap = (props = {}) => shallow(<SaveCommunityForm {...props} />);

describe('SaveCommunityForm', () => {
  it('render SaveCommunityForm', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    expect(wrapper.find('StyledImage')).toHaveLength(1);
    expect(wrapper.find(Field)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('handles onFormSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
