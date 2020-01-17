import React, { PureComponent } from 'react';

import { Experiment, Variant } from 'sly/services/experiments';
import cursor from 'sly/components/helpers/cursor';
import textDecoration from 'sly/components/helpers/textDecoration';
import { Span } from 'sly/components/atoms';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import HowItWorksPopup from 'sly/components/organisms/HowItWorksPopup';

const ClickHereToSeeHowItWorks = textDecoration(cursor(Span));

export default class HowItWorksBannerNotificationContainer extends PureComponent {
  static typeHydrationId = 'HowItWorksBannerNotificationContainer';

  state = {
    howItWorksModalOpened: false,
  };

  onHowItWorksClick = () => {
    this.setState({
      howItWorksModalOpened: true,
    });
  };

  render() {
    const { howItWorksModalOpened } = this.state;

    return (
      <Experiment name="Community_DetailPage_How_It_Works_Banner_Notification">
        <Variant name="With_Banner">
          <BannerNotification palette="warning" childrenPalette="slate">
            Just starting your senior living search?&nbsp;<ClickHereToSeeHowItWorks onClick={this.onHowItWorksClick}>Click here to see how it works.</ClickHereToSeeHowItWorks>
          </BannerNotification>
          {howItWorksModalOpened && <HowItWorksPopup />}
        </Variant>
        <Variant name="Without_Banner" />
      </Experiment>
    );
  }
}
