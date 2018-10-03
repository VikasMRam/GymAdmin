import React from 'react';
import { shallow, mount } from 'enzyme';

import Rating from 'sly/components/molecules/Rating';
import RatingInput from '.';

const wrap = (props = {}) => shallow(<RatingInput {...props} />);

const element = {
  getBoundingClientRect: () => ({ left: 100 }),
  children: [{
    getBoundingClientRect: () => ({ left: 150 }),
    offsetWidth: 50,
  }],
};

describe('RatingInput', () => {
  it('renders defaultValue', () => {
    const wrapper = wrap();
    const rating = wrapper.find(Rating);
    const props = rating.props();
    expect(props.value).toEqual(3.5);
  });

  it('renders passed defaultValue', () => {
    const wrapper = wrap({ defaultValue: 3 });
    const rating = wrapper.find(Rating);
    const props = rating.props();
    expect(props.value).toEqual(3);
  });


  it('renders value over defaultValue', () => {
    const wrapper = wrap({ value: 2 });
    const rating = wrapper.find(Rating);
    const props = rating.props();
    expect(props.value).toEqual(2);
  });

  it('disables', () => {
    const onChange = jest.fn();
    const wrapper = wrap({ onChange, disabled: true });
    const rating = wrapper.find(Rating);
    const props = rating.props();
    expect(props.palette).toEqual('grayscale');
    rating.simulate('click', {
      clientX: 150,
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('fires onChange', () => {
    const onChange = jest.fn();
    const wrapper = wrap({ onChange });
    wrapper.instance().innerRef.current = element;

    var rating = wrapper.find(Rating);
    rating.simulate('click', {
      clientX: 150,
    });

    rating = wrapper.find(Rating);
    expect(onChange).toHaveBeenCalledWith(3);
    expect(rating.props().value).toEqual(3);
  });

  it('does not fires onChange on mouseover and reset on mouseout', () => {
    const onChange = jest.fn();
    const wrapper = wrap({ onChange });
    wrapper.instance().innerRef.current = element;

    var rating = wrapper.find(Rating);
    rating.simulate('mouseover', {
      clientX: 150,
    });

    rating = wrapper.find(Rating);
    expect(rating.props().value).toEqual(3);
    expect(onChange).not.toHaveBeenCalled();

    rating.simulate('mouseout');
    rating = wrapper.find(Rating);
    expect(rating.props().value).toEqual(3.5);
  });
});

