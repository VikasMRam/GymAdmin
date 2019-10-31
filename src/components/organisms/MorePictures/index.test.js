import React from 'react';
import { shallow } from 'enzyme';
import MorePictures from 'sly/components/organisms/MorePictures';
import { Image } from 'sly/components/atoms';

const images = [
  {
    id: 'ddb49929f3915891cb67da8ad0ea663e',
    src: 'https://first-image.jpeg',
    alt: 'first image',
  },
  {
    id: '7c580d1d286425f89fb2f6c5ab0b0cc0',
    src: 'https://second-image.jpg',
    alt: 'second image',
  },
];

const onPictureClick = jest.fn();

const wrap = () => shallow(<MorePictures images={images} onPictureClick={onPictureClick} />);

describe('MorePictures', () => {
  it('renders Image properly', () => {
    const wrapper = wrap();

    const tiles = wrapper.find(Image);
    expect(tiles).toHaveLength(2);
    tiles.forEach((tile, i) => {
      expect(tile.prop('src')).toBe(images[i].src);
      expect(tile.prop('alt')).toBe(images[i].alt);
    });
  });

  it('when an image is clicked it calls back the `onPictureClick` prop', () => {
    const wrapper = wrap();

    wrapper.find(Image).at(1).simulate('click');
    expect(onPictureClick).toHaveBeenCalledWith(images[1], 1);
  });
});
