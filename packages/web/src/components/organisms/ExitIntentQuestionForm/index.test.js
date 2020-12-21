import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import ExitIntentQuestionForm from '.';

const handleSubmit = jest.fn();
const title = 'Wait! Get support from a Seniorly Local Advisors. This is a free service.';
const error = 'Error message';

const wrap = (props = {}) => shallow(<ExitIntentQuestionForm handleSubmit={handleSubmit} {...props} />);

describe('ExitIntentQuestionForm', () => {
  it('should render ExitIntentQuestionForm', () => {
    const wrapper = wrap({});

    expect(wrapper.find('StyledHeading').dive().dive()
      .render()
      .text()).toContain(title);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'question' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(wrapper.find('strong')).toHaveLength(0);
  });

  it('render error when error is passed', () => {
    const wrapper = wrap({ error });

    expect(wrapper.find('StyledHeading').dive().dive()
      .render()
      .text()).toContain(title);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'question' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(wrapper.find('strong')).toHaveLength(1);
  });

  it('handles onFormSubmit', () => {
    const wrapper = wrap({});

    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
