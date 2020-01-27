import React from 'react';
import { shallow } from 'enzyme';

import { Block } from 'sly/components/atoms';
import MeetOthersTile, { StyledImage, StyledHeading }
  from 'sly/components/molecules/MeetOthersTile';

const image =
  'https://d1qiigpe5txw4q.cloudfront.net/uploads/dbede7dcc263e098e3705e818b5ff463/RGP-June-2014_sd.jpg';
const title = 'title title';
const description = 'test description';

const wrap = (props = {}) => shallow(<MeetOthersTile {...props} />);

describe('MeetOthersTile', () => {
  it('renders image', () => {
    const wrapper = wrap({
      image, title, description,
    });
    const img = wrapper.find(StyledImage);

    expect(img).toHaveLength(1);
    expect(img.prop('path')).toBe(image);
  });

  it('renders title', () => {
    const wrapper = wrap({
      image, title, description,
    });
    const titleElem = wrapper.find(StyledHeading);

    expect(titleElem).toHaveLength(1);
    expect(titleElem.dive().render().text()).toBe(title);
  });

  it('renders description', () => {
    const wrapper = wrap({
      image, title, description,
    });
    const descElem = wrapper.find(Block);

    expect(descElem).toHaveLength(1);
    expect(descElem.text()).toBe(description);
  });
});
