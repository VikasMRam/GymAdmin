import React, { Component } from 'react';
import { string } from 'prop-types';

import HowSlyWorksVideo from 'sly/components/organisms/HowSlyWorksVideo';
import SlyEvent from 'sly/services/helpers/events';

const sendEvent = (category, action, label, value) =>
  SlyEvent.getInstance().sendEvent({
    category,
    action,
    label,
    value,
  });

export default class HowSlyWorksVideoContainer extends Component {
  static displayName = 'HowSlyWorksVideoContainer';
  static propTypes = {
    eventLabel: string,
  };

  state = {
    isPlaying: false,
  };

  toggleIsPlaying = () => {
    this.setState(state => ({ isPlaying: !state.isPlaying }));
  };

  render() {
    const { eventLabel } = this.props;
    const { isPlaying } = this.state;

    return (
      <HowSlyWorksVideo
        isPlaying={isPlaying}
        onThumbnailClick={this.toggleIsPlaying}
        onPause={e =>
          sendEvent(
            'howSlyWorksVideo',
            e.target.ended ? 'complete' : 'pause',
            eventLabel,
            e.target.currentTime
          )
        }
        onPlay={e =>
          sendEvent(
            'howSlyWorksVideo',
            'play',
            eventLabel,
            e.target.currentTime
          )
        }
      />
    );
  }
}
