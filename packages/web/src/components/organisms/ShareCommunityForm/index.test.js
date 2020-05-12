import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import ShareCommunityForm from 'sly/web/components/organisms/ShareCommunityForm';

const wrap = (props = {}) => shallow(<ShareCommunityForm {...props} />);

describe('ShareCommunityForm', () => {
  it('renders', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    expect(wrapper.find(Field)).toHaveLength(3);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('renders when from disabled', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit, fromEnabled: false });

    expect(wrapper.find(Field)).toHaveLength(2);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('handles onFormSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
