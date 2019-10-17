import React from 'react';
import { bool, func, string } from 'prop-types';
import styled from 'styled-components';

import { assetPath } from 'sly/components/themes';
import VideoThumbnail from 'sly/components/molecules/VideoThumbnail';

const StyledVideo = styled.video`
  width: 100%!important;
  max-height: 100%;
  object-fit: fill;
`;

const HowSlyWorksVideo = ({
  isPlaying, onPause, onPlay, onThumbnailClick, className,
}) => (
  <div className={className}>
    {!isPlaying &&
      <VideoThumbnail src={assetPath('images/how-sly-works-video-thumbnail.jpg')} onClick={onThumbnailClick} />
    }
    {isPlaying &&
      <StyledVideo
        autoPlay
        controls
        controlsList="nodownload"
        onPause={onPause}
        onPlay={onPlay}
      >
        <source src="https://d1qiigpe5txw4q.cloudfront.net/appassets/seniorly_hiw_1.mp4" type="video/mp4" />
        <source src="https://d1qiigpe5txw4q.cloudfront.net/appassets/seniorly_hiw_1.webm" type="video/webm" />
      </StyledVideo>
    }
  </div>
);

HowSlyWorksVideo.propTypes = {
  isPlaying: bool,
  onPause: func,
  onPlay: func,
  onThumbnailClick: func,
  className: string,
};

export default HowSlyWorksVideo;
