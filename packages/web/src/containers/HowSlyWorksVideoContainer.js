import React, { Component } from 'react';
import { string, bool } from 'prop-types';

import HowSlyWorksVideo from 'sly/web/components/organisms/HowSlyWorksVideo';
import SlyEvent from 'sly/web/services/helpers/events';

const sendEvent = (category, action, label, value) =>
  SlyEvent.getInstance().sendEvent({
    category,
    action,
    label,
    value,
  });

export default class HowSlyWorksVideoContainer extends Component {
  static displayName = 'HowSlyWorksVideoContainer';
  static typeHydrationId = 'HowSlyWorksVideoContainer';
  static propTypes = {
    eventLabel: string,
    className: string,
    isPlaying: bool,
  };

  state = {
    isPlaying: this.props.isPlaying || false,
  };

  toggleIsPlaying = () => {
    this.setState(state => ({ isPlaying: !state.isPlaying }));
  };

  render() {
    const { eventLabel, className } = this.props;
    const { isPlaying } = this.state;

    return (
      <HowSlyWorksVideo
        className={className}
        isPlaying={isPlaying}
        onThumbnailClick={this.toggleIsPlaying}
        onPause={e =>
          sendEvent(
            'howSlyWorksVideo',
            e.target.ended ? 'complete' : 'pause',
            eventLabel,
            e.target.currentTime,
          )
        }
        onPlay={e =>
          sendEvent(
            'howSlyWorksVideo',
            'play',
            eventLabel,
            e.target.currentTime,
          )
        }
      />
    );
  }
}
