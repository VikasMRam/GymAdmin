import React from 'react';
import { shallow } from 'enzyme';

import { BoxChoiceTile } from 'sly/web/components/atoms';
import BoxChoice from 'sly/web/components/molecules/BoxChoice';

const options = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
  { value: 'third', label: 'Third' },
];
const onChange = jest.fn();
const wrap = (props = {}) =>
  shallow(<BoxChoice onChange={onChange} options={options} {...props} />);

describe('BoxChoice', () => {
  it('renders', () => {
    const wrapper = wrap();

    const boxTiles = wrapper.find(BoxChoiceTile);
    expect(boxTiles).toHaveLength(options.length);
  });

  it('renders with single choice selected', () => {
    const { value } = options[1];
    const wrapper = wrap({ value });

    const boxTiles = wrapper.find(BoxChoiceTile);
    expect(boxTiles).toHaveLength(options.length);
    expect(boxTiles.at(1).prop('selected')).toBe(true);
  });

  it('renders with multiple choices selected', () => {
    const value = [options[1].value, options[2].value];
    const wrapper = wrap({ value, multiChoice: true });

    const boxTiles = wrapper.find(BoxChoiceTile);
    expect(boxTiles).toHaveLength(options.length);
    expect(boxTiles.at(1).prop('selected')).toBe(true);
    expect(boxTiles.at(2).prop('selected')).toBe(true);
  });
});
