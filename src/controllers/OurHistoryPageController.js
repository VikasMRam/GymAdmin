import React, { Component } from 'react';
import { func, object } from 'prop-types';

import OurHistoryPage from 'sly/components/pages/OurHistoryPage';
import { connectController } from 'sly/controllers';
import { TeamMembersData as profiles } from 'sly/services/helpers/our_team';
import { PressTileContents as press } from 'sly/services/helpers/press';

class OurHistoryPageController extends Component {
  static propTypes = {
    activeProfile: object,
    handleModalProfile: func,
    set: func,
  };

  handleModalProfile = (profile) => {
    const { set } = this.props;
    console.log(profile);
    set({
      activeProfile: profile,
    });
  }

  render() {
    const { activeProfile } = this.props;
    return <OurHistoryPage profiles={profiles} press={press} activeProfile={activeProfile} setModalProfile={this.handleModalProfile} />;
  }
}

const mapStateToProps = (state, { controller }) => {
  return {
    activeProfile: controller.activeProfile || null,
  };
};

export default connectController(mapStateToProps, {})(OurHistoryPageController);
