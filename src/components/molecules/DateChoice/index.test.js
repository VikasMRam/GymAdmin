import React from 'react';
import { shallow } from 'enzyme';

import { LATER_DATE } from 'sly/constants/date';
import DateChoice from 'sly/components/molecules/DateChoice';
import DateChoiceTile from 'sly/components/molecules/DateChoiceTile';

const onChange = jest.fn();
const wrap = (props = {}) =>
  shallow(<DateChoice onChange={onChange} {...props} />);

describe('DateChoice', () => {
  it('renders', () => {
    const fromDate = '2018-1-20';
    const toDate = '2018-1-31';
    const wrapper = wrap({ from: fromDate, to: toDate });

    const dateTiles = wrapper.find(DateChoiceTile);
    expect(dateTiles).toHaveLength(10);
  });

  it('renders with hasLaterDate', () => {
    const fromDate = '2018-1-20';
    const toDate = '2018-1-31';
    const wrapper = wrap({ from: fromDate, to: toDate, hasLaterDate: true });

    const dateTiles = wrapper.find(DateChoiceTile);
    expect(dateTiles).toHaveLength(10);
    expect(wrapper.find('StyledBoxChoiceTile')).toHaveLength(1);
  });

  it('renders with single date selected', () => {
    const fromDate = '2018-1-20';
    const selectedDate = '2018-1-25';
    const toDate = '2018-1-31';
    const wrapper = wrap({ from: fromDate, to: toDate, value: selectedDate });

    const dateTiles = wrapper.find(DateChoiceTile);
    expect(dateTiles).toHaveLength(10);
    expect(dateTiles.at(4).prop('selected')).toBe(true);
  });

  it('renders with multiple dates selected', () => {
    const fromDate = '2018-1-20';
    const value = ['2018-1-25', '2018-1-26'];
    const toDate = '2018-1-31';
    const wrapper = wrap({
      from: fromDate, to: toDate, multiChoice: true, value,
    });

    const dateTiles = wrapper.find(DateChoiceTile);
    expect(dateTiles).toHaveLength(10);
    expect(dateTiles.at(4).prop('selected')).toBe(true);
    expect(dateTiles.at(5).prop('selected')).toBe(true);
  });

  it('renders with later date selected', () => {
    const fromDate = '2018-1-20';
    const selectedDate = LATER_DATE;
    const toDate = '2018-1-31';
    const wrapper = wrap({
      from: fromDate, to: toDate, value: selectedDate, hasLaterDate: true,
    });

    const dateTiles = wrapper.find(DateChoiceTile);
    expect(dateTiles).toHaveLength(10);
    expect(wrapper.find('StyledBoxChoiceTile').prop('selected')).toBe(true);
  });
});
