import React from 'react';
import { shallow } from 'enzyme';

import Pagination from 'sly/web/components/molecules/Pagination';

const wrap = (props = {}) => shallow(<Pagination {...props} />);

const small = {
  current: 0,
  range: 5,
  total: 5,
  basePath: '/test',
  pageParam: 'page-number',
};

const large = {
  current: 50,
  range: 5,
  total: 100,
  basePath: '/test',
  pageParam: 'page-number',
};

describe('Pagination', () => {
  it('should render elements under range', () => {
    const wrapper = wrap(small);
    expect(wrapper.children()).toHaveLength(6);
    for (let i = 0; i < 5; i += 1) {
      const button = wrapper.childAt(i);
      expect(button.prop('children')).toEqual(i + 1);
      expect(button.prop('to')).toEqual(i === 0 ? '/test' : `/test?page-number=${i}`);
      expect(button.prop('palette')).toEqual(i === 0 ? 'primary' : 'slate');
    }
  });

  it('should render next button but not prev', () => {
    const wrapper = wrap({ ...small, current: 0 });
    const nextButton = wrapper.childAt(5);
    const nextIcon = nextButton.dive().dive().dive().dive()
      .find('Icon');
    expect(nextIcon.prop('rotate')).toEqual(0);
    expect(nextButton.prop('to')).toEqual('/test?page-number=1');
  });

  it('should render prev button but not next', () => {
    const wrapper = wrap({ ...small, current: 4 });
    const prevButton = wrapper.childAt(0);
    const prevIcon = prevButton.dive().dive().dive().dive()
      .find('Icon');
    expect(prevIcon.prop('rotate')).toEqual(2);
    expect(prevButton.prop('to')).toEqual('/test?page-number=3');
  });

  it('should render both next and prev buttons', () => {
    const wrapper = wrap({ ...small, current: 3 });
    expect(wrapper.children()).toHaveLength(7);

    const prevButton = wrapper.childAt(0);
    const prevIcon = prevButton.dive().dive().dive().dive()
      .find('Icon');
    expect(prevIcon.prop('rotate')).toEqual(2);
    expect(prevButton.prop('to')).toEqual('/test?page-number=2');

    const nextButton = wrapper.childAt(6);
    const nextIcon = nextButton.dive().dive().dive().dive()
      .find('Icon');
    expect(nextIcon.prop('rotate')).toEqual(0);
    expect(nextButton.prop('to')).toEqual('/test?page-number=4');
  });

  it('should render elements above range, centers on selected', () => {
    const wrapper = wrap(large);

    const first = wrapper.childAt(1);
    expect(first.prop('children')).toEqual(1);
    first.simulate('click');
    expect(first.prop('to')).toEqual('/test');

    const firstDots = wrapper.childAt(2);
    expect(firstDots.prop('children')).toEqual('...');

    const fortyNine = wrapper.childAt(3);
    expect(fortyNine.prop('children')).toEqual(49);
    expect(fortyNine.prop('palette')).toEqual('slate');
    expect(fortyNine.prop('to')).toEqual('/test?page-number=48');

    const fiftyOne = wrapper.childAt(5);
    expect(fiftyOne.prop('ghost')).toEqual(true);
    expect(fiftyOne.prop('palette')).toEqual('primary');
    expect(fiftyOne.prop('to')).toEqual('/test?page-number=50');


    const fiftyThree = wrapper.childAt(7);
    expect(fiftyThree.prop('ghost')).toEqual(true);
    expect(fiftyThree.prop('palette')).toEqual('slate');
    expect(fiftyThree.prop('to')).toEqual('/test?page-number=52');

    const secondDots = wrapper.childAt(8);
    expect(secondDots.prop('children')).toEqual('...');

    const hundred = wrapper.childAt(9);
    expect(hundred.prop('ghost')).toEqual(true);
    expect(hundred.prop('palette')).toEqual('slate');
    expect(hundred.prop('to')).toEqual('/test?page-number=99');
  });
});

