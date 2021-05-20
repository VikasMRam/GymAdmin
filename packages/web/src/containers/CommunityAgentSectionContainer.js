import React, { Component } from 'react';
import { func } from 'prop-types';
import loadable from '@loadable/component';

import withModal from 'sly/web/controllers/withModal';
import CommunityAgentSection from 'sly/web/components/molecules/CommunityAgentSection';
import agentPropType from 'sly/common/propTypes/agent';

const AdvisorHelpPopup = loadable(() => import(/* webpackChunkName: "chunkAdvisorHelpPopup" */ 'sly/web/components/molecules/AdvisorHelpPopup'));

@withModal
export default class CommunityAgentSectionContainer extends Component {
  static typeHydrationId = 'CommunityAgentSectionContainer'
  static propTypes = {
    agent: agentPropType.isRequired,
    showModal: func,
    closeModal: func,
  };

  render() {
    const { agent, showModal, hideModal, ...props } = this.props;
    return (
      <CommunityAgentSection
        agent={agent}
        onAdvisorHelpClick={() =>
          showModal(<AdvisorHelpPopup onButtonClick={hideModal} />)
        }
        {...props}
      />
    );
  }
}
