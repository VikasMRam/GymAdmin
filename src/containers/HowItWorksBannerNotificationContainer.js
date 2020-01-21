import React, { PureComponent } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';

import { Experiment, Variant } from 'sly/services/experiments';
import cursor from 'sly/components/helpers/cursor';
import textDecoration from 'sly/components/helpers/textDecoration';
import { BANNER_COMMUNITY_PROFILE_HOW_IT_WORKS_SHOWN } from  'sly/constants/banner';
import { Span } from 'sly/components/atoms';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import HowItWorksPopup from 'sly/components/organisms/HowItWorksPopup';

const ClickHereToSeeHowItWorks = textDecoration(cursor(Span));

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
    howItWorksModalOpened: false,
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
      howItWorksModalOpened: true,
    });
  };

  handleMatchClick = () => {
    const { askAgent } = this.props;

    this.setState({
      howItWorksModalOpened: false,
    });
    askAgent();
  };

  handleHowItWorksPopupClose = () => {
    this.setState({
      howItWorksModalOpened: false,
    });
  };

  render() {
    const { howItWorksModalOpened, experimentDisabled } = this.state;

    return (
      <>
        <Experiment name="Community_DetailPage_How_It_Works_Banner_Notification" defaultVariant="Without_Banner" disabled={experimentDisabled}>
          <Variant name="With_Banner">
            <BannerNotification palette="warning" childrenPalette="slate">
              Just starting your senior living search?&nbsp;<ClickHereToSeeHowItWorks onClick={this.handleHowItWorksClick}>Click here to see how it works.</ClickHereToSeeHowItWorks>
            </BannerNotification>
          </Variant>
          <Variant name="Without_Banner" />
        </Experiment>
        {howItWorksModalOpened && <HowItWorksPopup onClose={this.handleHowItWorksPopupClose} onMatchClick={this.handleMatchClick} />}
      </>
    );
  }
}
