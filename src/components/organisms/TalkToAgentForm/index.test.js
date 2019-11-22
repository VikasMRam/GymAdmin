import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import TalkToAgentForm from 'sly/components/organisms/TalkToAgentForm';

const wrap = (props = {}) => shallow(<TalkToAgentForm {...props} />);

describe('TalkToAgentForm', () => {
  it('renders', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    expect(wrapper.find(Field)).toHaveLength(3);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('renders with hasEmail', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit, hasEmail: true });

    expect(wrapper.find(Field)).toHaveLength(4);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('renders when from disabled', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit, fromEnabled: false });

    expect(wrapper.find(Field)).toHaveLength(3);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('handles onFormSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
