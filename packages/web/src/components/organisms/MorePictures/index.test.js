import React from 'react';
import { shallow } from 'enzyme';

import MorePictures from 'sly/web/components/organisms/MorePictures';
import { ResponsiveImage } from 'sly/web/components/atoms';

const images = [
  {
    id: 'ddb49929f3915891cb67da8ad0ea663e',
    path: 'first-image.jpeg',
    alt: 'first image',
  },
  {
    id: '7c580d1d286425f89fb2f6c5ab0b0cc0',
    path: 'second-image.jpg',
    alt: 'second image',
  },
];

const onPictureClick = jest.fn();

const wrap = () => shallow(<MorePictures images={images} onPictureClick={onPictureClick} />);

describe('MorePictures', () => {
  it('renders Image properly', () => {
    const wrapper = wrap();

    const tiles = wrapper.find(ResponsiveImage);
    expect(tiles).toHaveLength(2);
    tiles.forEach((tile, i) => {
      expect(tile.prop('path')).toBe(images[i].path);
      expect(tile.prop('alt')).toBe(images[i].alt);
    });
  });

  it('when an image is clicked it calls back the `onPictureClick` prop', () => {
    const wrapper = wrap();

    wrapper.find(ResponsiveImage).at(1).simulate('click');
    expect(onPictureClick).toHaveBeenCalledWith(images[1], 1);
  });
});
