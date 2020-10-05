import React, { Component } from 'react';
import { func, object, string } from 'prop-types';
import loadable from '@loadable/component';

import { withRouter } from 'react-router';
import { generateAskAgentQuestionContents } from 'sly/web/services/helpers/agents';
import { AA_CONSULTATION_REQUESTED } from 'sly/web/services/api/constants';
import Thankyou from 'sly/web/components/molecules/Thankyou';
import SlyEvent from 'sly/web/services/helpers/events';
import withModal from 'sly/web/controllers/withModal';
import withNotification from 'sly/web/controllers/withNotification';
import { prefetch } from 'sly/web/services/api';
import { recordEntityCta } from 'sly/web/services/helpers/localStorage';

const AskQuestionToAgentFormContainer = loadable(() =>
  import(/* webpackChunkName: "chunkAskQuestionToAgentFormContainer" */ 'sly/web/containers/AskQuestionToAgentFormContainer'),
);

@withRouter
@prefetch('community', 'getCommunity', (req, { match }) =>
  req({
    id: match.params.communitySlug,
    include: 'similar-communities,questions,agents',
  }),
)
@withModal
@withNotification

export default class AskAgentQuestionContainer extends Component {
  static typeHydrationId = 'AskAgentQuestionContainer';

  static propTypes = {
    type: string.isRequired,
    community: object.isRequired,
    notifyInfo: func.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    children: func,
  };

  handleToggleAskAgentQuestionModal = (isAskAgentQuestionModalVisible, subType) => {
    const { community: { id }, type } = this.props;
    const action = isAskAgentQuestionModalVisible ? 'close-modal' : 'open-modal';
    let category = 'AskAgentQuestion';
    if (type) {
      category += `-${type}`;
    }

    if (subType && typeof subType === 'string') {
      category += `-${subType}`;
    }
    const event = {
      action,
      category,
      label: type === 'how-it-works-banner-notification' ? 'agent' : id,
    };

    SlyEvent.getInstance().sendEvent(event);
  };

  openAskAgentQuestionModal = (subType) => {
    const { type, community, showModal, hideModal, notifyInfo } = this.props;

    const toggleAskAgentQuestionModal = () => {
      this.handleToggleAskAgentQuestionModal(true, subType);
      hideModal();
    };
    const onClose = () => {
      this.handleToggleAskAgentQuestionModal(true, subType);
    };
    const postSubmit = () => {
      // notifyInfo('Request sent successfully');
      toggleAskAgentQuestionModal();
      if (community) {
        recordEntityCta(type, community.id);
      }
      showModal(<Thankyou
        heading="Success!"
        subheading={'Your request has been sent and we will connect with' +
      ' you shortly.'}
        onClose={hideModal}
        doneText="Finish"
      />);
    };

    if (type === 'how-it-works-banner-notification' || type === 'side-column-get-help-now') {
      // const postSubmit = () => {
      //   notifyInfo('Question sent successfully');
      //   toggleAskAgentQuestionModal();
      // };
      let initialValues = {};
      if (type === 'how-it-works-banner-notification') {
        initialValues = {
          message: `I want to know about the senior living options in ${community.address.city}. Please give me a call or text with pricing and availability information`,
        };
      }
      const modalComponentProps = {
        heading: "Let's Begin Your Senior Living Search",
        initialValues,
        entityId: community.id,
        category: 'community',
        showMessageFieldFirst: true,
        postSubmit,
        type,
      };
      showModal(<AskQuestionToAgentFormContainer {...modalComponentProps} />, onClose);
    } else if (type === 'aa-sidebar' || type === 'aa-footer') {
      const initialValues = {};

      const modalComponentProps = {
        heading: 'We understand selling your home is a big deal.',
        description: 'Tell us how to connect with you and our team will reach out to share how we work with real estate agents.',
        initialValues,
        entityId: community.id,
        category: 'community',
        hideMessage: true,
        postSubmit,
        type,
      };
      showModal(<AskQuestionToAgentFormContainer actionType={AA_CONSULTATION_REQUESTED} {...modalComponentProps} />, onClose);
    } else {
      const { heading, description, placeholder, question } = generateAskAgentQuestionContents(
        community.name,
        community.address.city,
        type,
      );
      const modalComponentProps = {
        toggleAskAgentQuestionModal,
        notifyInfo,
        entityId: community.id,
        category: 'community',
        heading,
        description,
        placeholder,
        question,
        type,
        postSubmit,
      };
      showModal(<AskQuestionToAgentFormContainer {...modalComponentProps} />, onClose);
    }

    this.handleToggleAskAgentQuestionModal(false, subType);
  };

  render() {
    return this.props.children(this.openAskAgentQuestionModal);
  }
}
