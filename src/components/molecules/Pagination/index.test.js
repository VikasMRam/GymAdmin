import React from 'react';
import { shallow } from 'enzyme';

import { Button, Icon } from 'sly/components/atoms';

import Pagination from '.';

const wrap = (props={}) => shallow(<Pagination {...props} />);

const onChange = jest.fn();

const small = {
  current: 0,
  range: 5,
  total: 5,
  onChange 
};

const large = {
  current: 50,
  range: 5,
  total: 100,
  onChange,
};

describe('Pagination', () => {
  it('should render elements under range', () => {
    const wrapper = wrap(small);
    expect(wrapper.children()).toHaveLength(6);
    for (let i = 0; i < 5; ++i) {
      const button = wrapper.childAt(i);
      expect(button.prop('children')).toEqual(i + 1);
      button.simulate('click'); 
      if (i) {
        expect(onChange).lastCalledWith(i);
      } else {
        expect(onChange).toHaveBeenCalledTimes(0);
      }
      expect(button.prop('palette')).toEqual(i === 0 ? 'primary' : 'grayscale');
    }
  });

  it('should render next button but not prev', () => {
    const wrapper = wrap({ ...small, current: 0 });
    const nextButton = wrapper.childAt(5);
    const nextIcon = nextButton.dive().dive().find(Icon);
    expect(nextIcon.prop('flip')).toEqual(true);
    nextButton.simulate('click');
    expect(onChange).lastCalledWith(1);
  });

  it('should render prev button but not next', () => {
    const wrapper = wrap({ ...small, current: 4 });
    const prevButton = wrapper.childAt(0);
    const prevIcon = prevButton.dive().dive().find(Icon);
    expect(prevIcon.prop('flip')).toEqual(false);
    prevButton.simulate('click');
    expect(onChange).lastCalledWith(3);
  });

  it('should render both next and prev buttons', () => {
    const wrapper = wrap({ ...small, current: 3 });
    expect(wrapper.children()).toHaveLength(7);

    const prevButton = wrapper.childAt(0);
    const prevIcon = prevButton.dive().dive().find(Icon);
    expect(prevIcon.prop('flip')).toEqual(false);
    prevButton.simulate('click');
    expect(onChange).lastCalledWith(2);

    const nextButton = wrapper.childAt(6);
    const nextIcon = nextButton.dive().dive().find(Icon);
    expect(nextIcon.prop('flip')).toEqual(true);
    nextButton.simulate('click');
    expect(onChange).lastCalledWith(4);
  });

  it('should render elements above range, centers on selected', () => {
    const wrapper = wrap(large);

    const first = wrapper.childAt(1);
    expect(first.prop('children')).toEqual(1);
    first.simulate('click');
    expect(onChange).lastCalledWith(0);

    const firstDots = wrapper.childAt(2);
    expect(firstDots.prop('children')).toEqual('...');

    const fortyNine = wrapper.childAt(3);
    expect(fortyNine.prop('children')).toEqual(49);
    expect(fortyNine.prop('palette')).toEqual('grayscale');
    fortyNine.simulate('click');
    expect(onChange).lastCalledWith(48);

    const fiftyOne = wrapper.childAt(5);
    expect(fiftyOne.prop('ghost')).toEqual(false);
    expect(fiftyOne.prop('palette')).toEqual('primary');
    onChange.mockReset();
    fiftyOne.simulate('click');
    expect(onChange).toHaveBeenCalledTimes(0);

    const fiftyThree = wrapper.childAt(7);
    expect(fiftyThree.prop('ghost')).toEqual(true);
    expect(fiftyThree.prop('palette')).toEqual('grayscale');
    fiftyThree.simulate('click');
    expect(onChange).lastCalledWith(52);

    const secondDots = wrapper.childAt(8);
    expect(secondDots.prop('children')).toEqual('...');

    const hundred = wrapper.childAt(9);
    expect(hundred.prop('ghost')).toEqual(true);
    expect(hundred.prop('palette')).toEqual('grayscale');
    hundred.simulate('click');
    expect(onChange).lastCalledWith(99);
  });
});

