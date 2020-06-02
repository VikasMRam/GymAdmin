import React, { PureComponent } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';

import { BANNER_COMMUNITY_PROFILE_HOW_IT_WORKS_SHOWN } from  'sly/web/constants/banner';
import { Experiment, Variant } from 'sly/web/services/experiments';
import cursor from 'sly/web/components/helpers/cursor';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import SlyEvent from 'sly/web/services/helpers/events';
import { Span, Block } from 'sly/web/components/atoms';
import BannerNotification from 'sly/web/components/molecules/BannerNotification';
import HowItWorksPopup from 'sly/web/components/organisms/HowItWorksPopup';
import { textDecoration, textAlign } from 'sly/web/components/helpers/text';

const ClickHereToSeeHowItWorks = textDecoration(cursor(Span));

const CenteredText = fullWidth(textAlign(Block));

const mapStateToProps = state => ({
  selectedExperimentVariants: state.experiments || {},
});

@connect(mapStateToProps)

export default class HowItWorksBannerNotificationContainer extends PureComponent {
  static propTypes = {
    askAgent: func.isRequired,
    selectedExperimentVariants: object,
  };

  state = {
    modalOpened: false,
    // make experiment disabled in SSR so that frontend can enable by
    // checking presence of localStorage item
    experimentDisabled: true,
  };

  componentDidMount() {
    const { selectedExperimentVariants } = this.props;

    if (localStorage.getItem(BANNER_COMMUNITY_PROFILE_HOW_IT_WORKS_SHOWN) !== BANNER_COMMUNITY_PROFILE_HOW_IT_WORKS_SHOWN) {
      this.setState({
        experimentDisabled: false,
      });
    }
    if (selectedExperimentVariants.Community_DetailPage_How_It_Works_Banner_Notification) {
      localStorage.setItem(BANNER_COMMUNITY_PROFILE_HOW_IT_WORKS_SHOWN, BANNER_COMMUNITY_PROFILE_HOW_IT_WORKS_SHOWN);
    }
  }

  handleHowItWorksClick = () => {
    this.setState({
      experimentDisabled: true,
      modalOpened: true,
    });
    const event = {
      action: 'open-modal',
      category: 'how-it-works-banner-notification',
    };

    SlyEvent.getInstance().sendEvent(event);
  };

  handleMatchClick = () => {
    const { askAgent } = this.props;

    this.setState({
      modalOpened: false,
    });
    askAgent();
  };

  handlePopupClose = () => {
    this.setState({
      modalOpened: false,
    });
    const event = {
      action: 'close-modal',
      category: 'how-it-works-banner-notification',
    };

    SlyEvent.getInstance().sendEvent(event);
  };

  handleBannerCloseClick = () => {
    const event = {
      action: 'dismiss',
      category: 'how-it-works-banner-notification',
    };

    SlyEvent.getInstance().sendEvent(event);
    this.setState({
      experimentDisabled: true,
    });
  };

  render() {
    const { modalOpened, experimentDisabled } = this.state;

    return (
      <>
        <Experiment name="Community_DetailPage_How_It_Works_Banner_Notification" defaultVariant="Without_Banner" disabled={experimentDisabled}>
          <Variant name="With_Banner">
            <BannerNotification palette="warning" childrenPalette="slate" onCloseClick={this.handleBannerCloseClick}>
              <CenteredText>
                Just starting your senior living search?&nbsp;<ClickHereToSeeHowItWorks onClick={this.handleHowItWorksClick}>Click here to see how it works.</ClickHereToSeeHowItWorks>
              </CenteredText>
            </BannerNotification>
          </Variant>
          <Variant name="Without_Banner" />
        </Experiment>
        {modalOpened && <HowItWorksPopup onClose={this.handlePopupClose} onMatchClick={this.handleMatchClick} />}
      </>
    );
  }
}
