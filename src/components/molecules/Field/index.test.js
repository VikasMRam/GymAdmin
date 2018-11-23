import React from 'react';
import { shallow } from 'enzyme';

import MultipleChoice from 'sly/components/molecules/MultipleChoice';
import Field from '.';

const wrap = (props = {}) => shallow(<Field name="name" {...props} />);

describe('Field', () => {
  it('renders input props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.find({ id: 'foo' })).toHaveLength(1);
  });

  it('renders name', () => {
    const wrapper = wrap();
    expect(wrapper.find({ name: 'name' })).toHaveLength(1);
  });

  it('renders label when passed in', () => {
    const wrapper = wrap({ label: 'foo label' });
    expect(wrapper.contains('foo label')).toBe(true);
  });

  it('does not render error when passed in without invalid', () => {
    const wrapper = wrap({ error: 'foo error' });
    expect(wrapper.contains('foo error')).toBe(false);
  });

  it('renders error when passed in along with invalid', () => {
    const wrapper = wrap({ error: 'foo error', invalid: true });
    expect(wrapper.contains('foo error')).toBe(true);
  });

  describe('MultipleChoice', () => {
    const options = [
      { value: 'first', label: 'First' },
      { value: 'second', label: 'Second' },
    ];

    it('should create a MultiPlechoice and pass onChange', () => {
      const onChange = jest.fn();
      const wrapper = wrap({ type: 'multiplechoice', options, onChange });
      const multipleChoice = wrapper.childAt(0);
      expect(multipleChoice.type()).toBe(MultipleChoice);
      expect(multipleChoice.prop('onChange')).toBe(onChange);
    });
  });
});
