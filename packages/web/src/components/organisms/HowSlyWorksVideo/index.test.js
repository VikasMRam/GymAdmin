import React from 'react';
import { shallow } from 'enzyme';

import HowSlyWorksVideo from 'sly/web/components/organisms/HowSlyWorksVideo';
import VideoThumbnail from 'sly/web/components/molecules/VideoThumbnail';

const wrap = (props = {}) => shallow(<HowSlyWorksVideo {...props} />);

describe('HowSlyWorksVideo', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find(VideoThumbnail)).toHaveLength(1);
    expect(wrapper.find('StyledVideo')).toHaveLength(0);
  });

  it('renders when playing', () => {
    const wrapper = wrap({ isPlaying: true });
    expect(wrapper.find(VideoThumbnail)).toHaveLength(0);
    expect(wrapper.find('StyledVideo')).toHaveLength(1);
  });

  it('calls onThumbnailClick', () => {
    const onThumbnailClick = jest.fn();
    const wrapper = wrap({ onThumbnailClick });

    wrapper.find(VideoThumbnail).simulate('click');
    expect(onThumbnailClick).toHaveBeenCalled();
  });
});
