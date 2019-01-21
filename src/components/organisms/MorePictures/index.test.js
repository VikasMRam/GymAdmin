import React from 'react';
import { shallow } from 'enzyme';

import MorePictures from 'sly/components/organisms/MorePictures';
import { Image } from 'sly/components/atoms';

const gallery = {
  images: [
    {
      id: 'ddb49929f3915891cb67da8ad0ea663e',
      sd:
        'https://d1qiigpe5txw4q.cloudfront.net/uploads/dbede7dcc263e098e3705e818b5ff463/RGP-June-2014_sd.jpg',
      hd:
        'https://d1qiigpe5txw4q.cloudfront.net/uploads/dbede7dcc263e098e3705e818b5ff463/RGP-June-2014_hd.jpg',
    },
    {
      id: '7c580d1d286425f89fb2f6c5ab0b0cc0',
      sd:
        'https://d1qiigpe5txw4q.cloudfront.net/uploads/dbede7dcc263e098e3705e818b5ff463/building%20pics%20jan%202014-20_sd.jpg',
      hd:
        'https://d1qiigpe5txw4q.cloudfront.net/uploads/dbede7dcc263e098e3705e818b5ff463/building%20pics%20jan%202014-20_hd.jpg',
    },
  ],
};
const communityName = 'test';
const state = 'ca';
const city = 'sf';

const wrap = () => shallow(<MorePictures gallery={gallery} communityName={communityName} city={city} state={state} />);

describe('MorePictures', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders Image properly', () => {
    const wrapper = wrap();
    expect(wrapper.find(Image)).toHaveLength(2);
  });

  it('renders Image with correct image alt', () => {
    const wrapper = wrap();
    const tiles = wrapper.find(Image);

    tiles.forEach((t, i) => {
      expect(t.prop('alt')).toBe(`${communityName} ${city} ${state} ${i + 1}`);
    });
  });
});
