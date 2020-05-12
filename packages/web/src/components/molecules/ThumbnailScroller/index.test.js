import React from 'react';
import { shallow } from 'enzyme';

import { Thumbnail } from 'sly/web/components/atoms';
import ThumbnailScroller from 'sly/web/components/molecules/ThumbnailScroller';
import RhodaGoldmanPlaza from 'sly/web/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const wrap = (props = {}) => shallow(<ThumbnailScroller {...props} />);

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
    const onClick = jest.fn();
    const wrapper = wrap({ thumbnails, onClick });
    wrapper.find(Thumbnail).at(4).simulate('click');
    expect(onClick).toHaveBeenCalledWith(4);
  });
});
