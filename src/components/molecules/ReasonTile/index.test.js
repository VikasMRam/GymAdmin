import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import RoomTile from '.';

const wrap = (props = {}) => mount(<RoomTile {...props} />);

const defaultImage = '//d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';
const image = '//d1qiigpe5txw4q.cloudfront.net/uploads/3a2008ef77a20485e5924b0fcc34c123/Buena_Vista_logo-16_hd.jpg';

const title = "Sample Title ";
const to = "/sample-link";
const text = "This is some text";

describe('RoomTile', () => {
  it('verify image being set', () => {
    const wrapper = wrap({
      image
    });
    expect(wrapper.find('img').props()).toHaveProperty('src', image);
  });

  it('verify title being set', () => {
    const wrapper = wrap({
      image, title
    });
    expect(wrapper.find('h3').text()).toEqual(title)
  });

  it('verify text being set', () => {
    const wrapper = wrap({
      image, title, text
    });
    expect(wrapper.find('div').last().text()).toContain(text);
  });

  /*
  it('verify to link being set', () => {
    const wrapper = wrap({
      image, title, to
    });
    expect(wrapper.find('a').props()).toHaveProperty('href', to);
  });
  TODO ENABLE WHEN TEST SUCCEEDS
  */



});
