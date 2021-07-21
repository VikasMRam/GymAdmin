import React, { Component } from 'react';
import { func, object, string, bool } from 'prop-types';
import loadable from '@loadable/component';

import Thankyou from 'sly/web/components/molecules/Thankyou';
import SlyEvent from 'sly/web/services/helpers/events';
import withModal from 'sly/web/controllers/withModal';
import { recordEntityCta } from 'sly/web/services/helpers/localStorage';

const ListingAgentFormContainer = loadable(() => import(/* webpackChunkName: "chunkAskQuestionToAgentFormContainer" */'sly/web/listing/containers/ListingAgentFormContainer'));


@withModal

export default class ListingAgentQuestionContainer extends Component {
  static typeHydrationId = 'AskAgentQuestionContainer';

  static propTypes = {
    type: string.isRequired,
    listing: object.isRequired,
    agent: object,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    children: func,
    heading: string,
    description: string,
  };

  static defaultProps = {
    heading: 'Contact us about this room',
    description: '(415) 475-8655', // ToDO get this number dynamically
  };


  handleToggleAskAgentQuestionModal = (isAskAgentQuestionModalVisible, subType) => {
    const { listing: { id }, type } = this.props;
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

  recordCtaEntity = () => {
    const { type, listing } = this.props;
    if (listing) {
      recordEntityCta(type, listing.id);
    }
  }

  showSuccessModal = () => {
    const { showModal, hideModal } = this.props;
    this.recordCtaEntity();
    showModal(<Thankyou
      heading="Success!"
      subheading={'Your request has been sent and we will connect with' +
    ' you shortly.'}
      onClose={hideModal}
      doneText="Finish"
    />);
  }

  openAskAgentQuestionModal = (subType) => {
    const { type, listing, agent, showModal, hideModal, heading, description } = this.props;

    const toggleAskAgentQuestionModal = () => {
      this.handleToggleAskAgentQuestionModal(true, subType);
      hideModal();
    };
    const onClose = () => {
      this.handleToggleAskAgentQuestionModal(true, subType);
    };
    const postSubmit = (showSuccessPopup) => {
      this.recordCtaEntity();
      toggleAskAgentQuestionModal();
      if (showSuccessPopup) {
        this.showSuccessModal();
      }
    };

    const modalComponentProps = {
      toggleAskAgentQuestionModal,
      entityId: listing.id,
      category: 'listing',
      heading,
      description,
      messageLabel: 'Message',
      type,
      postSubmit,
    };
    showModal(<ListingAgentFormContainer {...modalComponentProps} />, onClose);
    this.handleToggleAskAgentQuestionModal(false, subType);
  };

  renderForm() {
    const { listing, type, heading, description } = this.props;
    const {
      info,
    } = listing;
    const { phoneNumber = '' } = info;

    const postSubmit = (showSuccessPopup) => {
      this.recordCtaEntity();
      if (showSuccessPopup) {
        this.showSuccessModal();
      }
    };

    const staticComponentProps = {
      entityId: listing.id,
      category: 'listing',
      heading,
      description,
      type,
      messageLabel: 'Message',
      postSubmit,
    };
    return (<ListingAgentFormContainer phoneNumber={phoneNumber} {...staticComponentProps} />);
  }

  render() {
    if (this.props.children) {
      return this.props.children(this.openAskAgentQuestionModal);
    }
    return this.renderForm();
  }
}
