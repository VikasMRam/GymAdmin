import React, { Component } from 'react';
import { oneOf } from 'prop-types';

import SlyEvent from 'sly/web/services/helpers/events';
import CommunityWizardAcknowledgement from 'sly/web/components/organisms/CommunityWizardAcknowledgement';

const sendEvent = (category, action, label, value) => SlyEvent.getInstance().sendEvent({
  category,
  action,
  label,
  value,
});

export default class CommunityWizardAcknowledgementContainer extends Component {
  static propTypes = {
    type: oneOf(['pricingWizard', 'bat']).isRequired,
  };

  state = {
    isHowSlyWorksVideoPlaying: false,
  };

  handleToggleHowSlyWorksVideoPlaying = () => {
    const { type } = this.props;
    const { isHowSlyWorksVideoPlaying } = this.state;

    this.setState({ isHowSlyWorksVideoPlaying: !isHowSlyWorksVideoPlaying });

    if (isHowSlyWorksVideoPlaying) {
      sendEvent('howSlyWorksVideo', 'stop', `${type}-wizardAcknowledgement`);
    } else {
      sendEvent('howSlyWorksVideo', 'start', `${type}-wizardAcknowledgement`);
    }
  };

  render() {
    const { isHowSlyWorksVideoPlaying } = this.state;
    const { type, ...props } = this.props;

    return (
      <CommunityWizardAcknowledgement
        {...props}
        onVideoThumbnailClick={this.handleToggleHowSlyWorksVideoPlaying}
        isVideoPlaying={isHowSlyWorksVideoPlaying}
        onVideoPause={e => sendEvent('howSlyWorksVideo', e.target.ended ? 'complete' : 'pause', `${type}-wizardAcknowledgement`, e.target.currentTime)}
        onVideoPlay={e => sendEvent('howSlyWorksVideo', 'play', `${type}-wizardAcknowledgement`, e.target.currentTime)}
      />
    );
  }
}

