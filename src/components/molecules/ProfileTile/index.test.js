import React from 'react';
import { shallow } from 'enzyme';

import ProfileTile, { ImageWrapper } from 'sly/components/molecules/ProfileTile';

const profile = {
  heading: 'Arthur Bretschneider',
  subHeading: 'Founder & CEO',
  imageUrl: 'team/Arthur-a2b97989c2264366a85578f9a9103196.jpg',
  description:
    `Arthur is a third generation senior housing operator. After selling his family’s senior housing company,
     he held two financial analyst roles in real estate and finance companies. He then founded a consulting firm, assisting
     real estate developers and other financial institutions in entering the senior housing market. While pursuing his MBA
     at Berkeley-Haas, he created Seniorly to solve a problem he noticed while running his family's business.
     Arthur is a native San Franciscan, and when he isn't working he is usually at Crissy Field with his wife,
     two boys and Jack Russell terrier.
   `,
};

const wrap = (props = {}) => shallow(<ProfileTile profile={profile} {...props} />);

describe('ProfileTile', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders ProfileTile - regular layout', () => {
    const wrapper = wrap();
    expect(wrapper.contains(profile.heading)).toEqual(true);
    expect(wrapper.contains(profile.subHeading)).toEqual(true);
    expect(wrapper.find(ImageWrapper).prop('src')).toEqual(profile.imageUrl);
    expect(wrapper.contains(profile.description)).toEqual(false);
  });

  it('renders ProfileTile - modal layout', () => {
    const wrapper = wrap({ layout: 'modal' });
    expect(wrapper.contains(profile.heading)).toEqual(true);
    expect(wrapper.contains(profile.subHeading)).toEqual(true);
    expect(wrapper.find(ImageWrapper).prop('src')).toEqual(profile.imageUrl);
    expect(wrapper.contains(profile.description)).toEqual(true);
  });
});
