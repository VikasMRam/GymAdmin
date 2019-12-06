import React from 'react';
import { shallow } from 'enzyme';

import { Button } from 'sly/components/atoms';
import MultipleChoice from 'sly/components/molecules/MultipleChoice';

const wrap = (props = {}) => shallow(<MultipleChoice {...props} />);

const options = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
];

describe('MultipleChoice', () => {
  it('should make buttons from options', () => {
    const wrapper = wrap({ options });
    expect(wrapper.children()).toHaveLength(2);
    const first = wrapper.childAt(0);
    const second = wrapper.childAt(1);
    expect(first.dive().prop('children')).toEqual('First');
    expect(first.dive().render()[0].attribs.type).toBe('button');
    expect(second.dive().prop('children')).toEqual('Second');
    expect(second.dive().render()[0].attribs.type).toBe('button');
  });

  it('should send the right value onChange', () => {
    const onChange = jest.fn();
    const wrapper = wrap({ options, onChange, value: ['first'] });
    expect(wrapper.children()).toHaveLength(2);
    const first = wrapper.childAt(0);
    const second = wrapper.childAt(1);
    first.prop('onClick')();
    expect(onChange).toHaveBeenLastCalledWith([]);
    second.prop('onClick')();
    expect(onChange).toHaveBeenLastCalledWith(['first', 'second']);
  });

  it('should highlight the right options per value', () => {
    const wrapper = wrap({ options, value: ['second'] });
    expect(wrapper.children()).toHaveLength(2);
    const first = wrapper.childAt(0);
    expect(first.prop('selected')).toEqual(false);
    const second = wrapper.childAt(1);
    expect(second.prop('selected')).toEqual(true);
  });

  it('should highlight the right options per value when singlechoice', () => {
    const wrapper = wrap({ options, type: 'singlechoice', value: 'second' });
    expect(wrapper.children()).toHaveLength(2);
    const first = wrapper.childAt(0);
    expect(first.prop('selected')).toEqual(false);
    const second = wrapper.childAt(1);
    expect(second.prop('selected')).toEqual(true);
  });

  it('should send the right value onChange when singlechoice', () => {
    const onChange = jest.fn();
    const wrapper = wrap({
      options, onChange, type: 'singlechoice', value: 'first',
    });
    expect(wrapper.children()).toHaveLength(2);
    const first = wrapper.childAt(0);
    const second = wrapper.childAt(1);
    first.prop('onClick')();
    expect(onChange).toHaveBeenLastCalledWith('first');
    second.prop('onClick')();
    expect(onChange).toHaveBeenLastCalledWith('second');
  });

  it('should send the right value onBlur', () => {
    const onBlur = jest.fn();
    const wrapper = wrap({ options, onBlur, value: 'value' });
    wrapper.prop('onBlur')();
    expect(onBlur).toHaveBeenCalledWith('value');
  });
});
