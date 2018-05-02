import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon'

import { Button } from 'sly/components/atoms';

import MultipleChoice from '.';

const wrap = (props={}) => shallow(<MultipleChoice {...props} />);

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
    expect(first.dive().type()).toBe(Button);
    expect(second.dive().type()).toBe(Button);
  });

  it('should make buttons from options', () => {
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
});


