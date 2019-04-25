import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import AddNoteForm from 'sly/components/organisms/AddNoteForm';

const wrap = (props = {}) => shallow(<AddNoteForm {...props} />);

describe('AddNoteForm', () => {
  it('renders', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    expect(wrapper.find(Field)).toHaveLength(1);
  });

  it('handles onFormSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
