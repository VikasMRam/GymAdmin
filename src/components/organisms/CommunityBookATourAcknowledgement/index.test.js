import React from 'react';
import { shallow } from 'enzyme';

import CommunityBookATourAcknowledgement from 'sly/components/organisms/CommunityBookATourAcknowledgement';

const similarCommunititesHref = 'www.teamseniorly.com';
const heading = 'temp heading';
const subheading = 'temp subheading';

const defaultProps = {
  similarCommunititesHref,
  heading,
  subheading,
};

const wrap = (props = {}) => shallow(<CommunityBookATourAcknowledgement {...defaultProps} {...props} />);

describe('CommunityBookATourAcknowledgement', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
    expect(wrapper.contains(heading)).toBeTruthy();
    expect(wrapper.contains(subheading)).toBeTruthy();
  });

  it('onButtonClick is called', () => {
    const wrapper = wrap();
    expect(wrapper.find('StyledButton').prop('href')).toEqual(similarCommunititesHref);
  });
});
