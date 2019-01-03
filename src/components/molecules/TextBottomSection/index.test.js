import React from 'react';
import { shallow } from 'enzyme';

import TextBottomSection from 'sly/components/molecules/TextBottomSection';


const communityName = 'Rhoda Goldman Plaza';

const wrap = (props = {}) => shallow(<TextBottomSection
  heading={`Have experience with ${communityName}?`}
  subHeading="Your review can help other families with their senior living search."
  buttonText="Write a review"
  {...props}
/>);

describe('TextBottomSection', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders TextBottomSection', () => {
    const wrapper = wrap();
    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.contains('Have experience with Rhoda Goldman Plaza?')).toBeTruthy();
    expect(wrapper.contains('Your review can help other families with their senior living search.')).toBeTruthy();
  });

  it('handles onButtonClick', () => {
    const onButtonClick = jest.fn();
    const wrapper = wrap({ onButtonClick });
    expect(wrapper.find('Button')).toHaveLength(1);
    const button = wrapper.find('Button');
    button.simulate('click');
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });
});
