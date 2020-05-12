import React from 'react';
import { shallow } from 'enzyme';

import Select from 'sly/web/components/atoms/Select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const groupedOptions = [
  {
    label: 'Firefox',
    options: [
      { label: '2.0 or higher', value: '2.0 or higher' },
      { label: '1.5.x', value: '1.5.x' },
    ],
  },
  {
    label: 'Microsoft Internet Explorer',
    options: [
      { label: '7.0 or higher', value: '7.0 or higher' },
      { label: '6.x', value: '6.x' },
      { label: '5.x', value: '5.x' },
    ],
  },
];

const defaultProps = {
  options,
};

const wrap = (props = {}) => shallow(<Select {...defaultProps} {...props} />);

describe('Select', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Select')).toHaveLength(1);
    expect(wrapper.find('Select').prop('options')).toBe(options);
  });

  it('renders with grouped options', () => {
    const wrapper = wrap({
      options: groupedOptions,
    });

    expect(wrapper.find('Select')).toHaveLength(1);
    expect(wrapper.find('Select').prop('options')).toBe(groupedOptions);
  });
});
