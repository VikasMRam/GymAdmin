import React from 'react';
import { shallow } from 'enzyme';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import Modal from 'sly/components/molecules/Modal';
import ImageGalleryModel from 'sly/components/molecules/ImageGallery';
import FullscreenImageGallery from '.';

const wrap = (props = {}) => shallow(<FullscreenImageGallery {...props} />);

const onClose = jest.fn();

const { name, gallery } = RhodaGoldmanPlaza;
const { images } = gallery;
const galleryImages = images.map((img, i) => {
  const newImg = img;
  newImg.src = img.hd;
  newImg.alt = `${name} ${i + 1}`;
  return newImg;
});

describe('FullscreenImageGallery', () => {
  it('default', () => {
    const wrapper = wrap({ images: galleryImages, onClose });
    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(wrapper.find(ImageGalleryModel)).toHaveLength(1);
  });
});
