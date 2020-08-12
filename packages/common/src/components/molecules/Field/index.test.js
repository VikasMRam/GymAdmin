import React from 'react';
import { shallow } from 'enzyme';

import Field from '.';

import MultipleChoice from 'sly/web/components/molecules/MultipleChoice';

const wrap = (props = {}) => shallow(<Field name="name" {...props} />);

describe('Field', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeTruthy();
  });

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
    expect(wrapper.contains('foo label')).toBeTruthy();
  });

  it('does not render error when passed in without invalid', () => {
    const wrapper = wrap({ message: 'foo error' });
    expect(wrapper.contains('foo error')).toBeFalsy();
  });

  it('renders error when passed in along with invalid', () => {
    const wrapper = wrap({ message: 'foo error', invalid: true });
    expect(wrapper.find('StyledInputMessage[message="foo error"][icon="close"]')).toHaveLength(1);
  });

  it('renders character count when maxLength is provided', () => {
    const maxLength = 20;
    const wrapper = wrap({ showCharacterCount: true, maxLength });
    expect(wrapper.find('[data-testid="CharCount"]')).toHaveLength(1);
    expect(wrapper.find('[data-testid="CharCount"]').dive().render()
      .text()).toBe(`0/${maxLength}`);
  });

  it('character count is updated', () => {
    const maxLength = 20;
    const value = 'test val';
    const wrapper = wrap({ showCharacterCount: true, value, maxLength });
    expect(wrapper.find('[data-testid="CharCount"]')).toHaveLength(1);
    expect(wrapper.find('[data-testid="CharCount"]').dive().render()
      .text()).toBe(`${value.length}/${maxLength}`);
  });

  it('renders * if marked as required', () => {
    const wrapper = wrap({ label: 'label', required: true });
    expect(wrapper.find('LabelWrapper').find('Label').find('Block').text()).toEqual('*');
  });

  describe('MultipleChoice', () => {
    const options = [
      { value: 'first', label: 'First' },
      { value: 'second', label: 'Second' },
    ];

    it('should create a MultiPlechoice and pass onChange', () => {
      const onChange = jest.fn();
      const wrapper = wrap({ type: 'multiplechoice', options, onChange });

      const multipleChoice = wrapper.find('InputBlock').childAt(0).childAt(0);
      expect(multipleChoice.type()).toBe(MultipleChoice);
      expect(multipleChoice.prop('onChange')).toBe(onChange);
    });
  });
});
