import React from 'react';
import { shallow } from 'enzyme';

import CommunitySATDateForm from 'sly/components/organisms/CommunitySATDateForm';
import { Block } from 'sly/components/atoms';

const error = 'Blah';
const wrap = (props = {}) => shallow(<CommunitySATDateForm {...props} />);

describe('CommunitySATDateForm', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('StyledField')).toHaveLength(1);
    expect(wrapper.find('StyledTimeField')).toHaveLength(2);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(0);
  });

  it('render error when error is passed', () => {
    const wrapper = wrap({ error });

    expect(wrapper.find('StyledField')).toHaveLength(1);
    expect(wrapper.find('StyledTimeField')).toHaveLength(2);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(1);
  });

  it('onDateChange gets called', () => {
    const onDateChange = jest.fn();
    const wrapper = wrap({ onDateChange });
    const dateField = wrapper.find('StyledField');

    expect(dateField).toHaveLength(1);
    dateField.at(0).simulate('change');
    expect(onDateChange).toHaveBeenCalled();
  });

  it('onTimeChange gets called', () => {
    const onTimeChange = jest.fn();
    const wrapper = wrap({ onTimeChange });
    const timeField = wrapper.find('StyledTimeField');

    expect(timeField).toHaveLength(2);
    timeField.at(0).simulate('change');
    expect(onTimeChange).toHaveBeenCalled();
  });
});
