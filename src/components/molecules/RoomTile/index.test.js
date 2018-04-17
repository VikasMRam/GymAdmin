import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import RoomTile from '.';

const wrap = (props = {}) => mount(<RoomTile {...props} />);

const defaultImage = '//d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';
const image = '//d1qiigpe5txw4q.cloudfront.net/uploads/3a2008ef77a20485e5924b0fcc34c123/Buena_Vista_logo-16_hd.jpg';
const roomType = 'testRoomType';
const shareTypePrivate = 'Private';
const shareTypeShared = 'Shared';
const price = 300;
const priceShared = 200;
const priceType = 'Monthly Rate';
const onInquireOrBookClickedSpy = sinon.spy();

describe('RoomTile', () => {
  it('verify default image', () => {
    const wrapper = wrap({
      roomType, shareType: shareTypePrivate, price, priceType,
    });
    expect(wrapper.find('img').props()).toHaveProperty('src', defaultImage);
  });

  it('verify image being set', () => {
    const wrapper = wrap({
      image, roomType, shareType: shareTypePrivate, price, priceType,
    });
    expect(wrapper.find('img').props()).toHaveProperty('src', image);
  });

  it('verify onInquireOrBookClicked callback', () => {
    const wrapper = wrap({
      image, roomType, shareType: shareTypePrivate, price, priceType, onInquireOrBookClicked: onInquireOrBookClickedSpy,
    });
    wrapper.find('Button').simulate('click');
    expect(onInquireOrBookClickedSpy.getCalls()).toHaveLength(1);
  });

  it('verify price for private room', () => {
    const wrapper = wrap({
      image, roomType, shareType: shareTypePrivate, price, priceShared, priceType,
    });
    expect(wrapper.find('div').last().text()).toContain(`${roomType} ${shareTypePrivate}$${price} per month`);
  });

  it('verify price for shared room', () => {
    const wrapper = wrap({
      image, roomType, shareType: shareTypeShared, price, priceShared, priceType,
    });
    expect(wrapper.find('div').last().text()).toContain(`${roomType} ${shareTypeShared}$${priceShared} per month`);
  });
});
