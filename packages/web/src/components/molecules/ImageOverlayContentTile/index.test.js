import React from 'react';
import { shallow } from 'enzyme';

import ImageOverlayContentTile, { StyledImage, ContentWrapper }
  from 'sly/components/molecules/ImageOverlayContentTile';

const image =
  'https://d1qiigpe5txw4q.cloudfront.net/uploads/dbede7dcc263e098e3705e818b5ff463/RGP-June-2014_sd.jpg';
const content = <p><b>test</b></p>;

const wrap = (props = {}) => shallow(<ImageOverlayContentTile {...props} />);

describe('ImageOverlayContentTile', () => {
  it('renders image', () => {
    const wrapper = wrap({
      image, children: content,
    });
    const img = wrapper.find(StyledImage);

    expect(img).toHaveLength(1);
    expect(img.prop('path')).toBe(image);
  });

  it('renders content', () => {
    const wrapper = wrap({
      image, children: content,
    });
    const children = wrapper.find(ContentWrapper);

    expect(children).toHaveLength(1);
  });
});
