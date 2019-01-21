import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import SaveCommunityForm from 'sly/components/organisms/SaveCommunityForm';

const wrap = (props = {}) => shallow(<SaveCommunityForm {...props} />);

describe('SaveCommunityForm', () => {
  it('renders', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    expect(wrapper.find(Field)).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('handles onFormSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
