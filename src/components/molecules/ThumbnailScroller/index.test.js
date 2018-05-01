import React from 'react';
import { shallow } from 'enzyme';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import { Thumbnail } from 'sly/components/atoms';
import ThumbnailScroller from '.';

const wrap = (props = {}) => shallow(<ThumbnailScroller {...props} />);

const onClick = jest.fn();

const { name, gallery } = RhodaGoldmanPlaza;
const images = gallery.images || [];
const thumbnails = images.map((img, i) => {
  const newImg = img;
  newImg.src = img.thumb;
  newImg.alt = `${name} ${i + 1} thumbnail`;
  return newImg;
});

describe('ThumbnailScroller', () => {
  it('default', () => {
    const wrapper = wrap({ thumbnails });
    expect(wrapper.find(Thumbnail)).toHaveLength(thumbnails.length);
  });

  it('onClick called', () => {
    const wrapper = wrap({ thumbnails, onClick });
    wrapper.find(Thumbnail).at(4).simulate('click');
    expect(onClick).toHaveBeenCalledWith(4);
  });
});
