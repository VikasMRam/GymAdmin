import React from 'react';
import { shallow } from 'enzyme';

import MultipleChoice from 'sly/components/molecules/MultipleChoice';
import Field from 'sly/components/molecules/Field';

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
    const wrapper = wrap({ message: 'foo error' });
    expect(wrapper.contains('foo error')).toBe(false);
  });

  it('renders error when passed in along with invalid', () => {
    const wrapper = wrap({ message: 'foo error', invalid: true });
    expect(wrapper.find('StyledInputMessage[message="foo error"][icon="close"]')).toHaveLength(1);
  });

  it('renders character count when maxLength is provided', () => {
    const maxLength = 20;
    const wrapper = wrap({ showCharacterCount: true, maxLength });
    expect(wrapper.find('CharCount')).toHaveLength(1);
    expect(wrapper.find('CharCount').dive().dive().render()
      .text()).toBe(`0/${maxLength}`);
  });

  it('renders * if marked as required', () => {
    const wrapper = wrap({ label: 'label', required: true });
    expect(wrapper.find('Span').children().text()).toEqual('*');
  });

  it('character count is updated', () => {
    const maxLength = 20;
    const value = 'test val';
    const wrapper = wrap({ showCharacterCount: true, value, maxLength });
    expect(wrapper.find('CharCount')).toHaveLength(1);
    expect(wrapper.find('CharCount').dive().dive().render()
      .text()).toBe(`${value.length}/${maxLength}`);
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
