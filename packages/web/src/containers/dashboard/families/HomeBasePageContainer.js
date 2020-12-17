import React, { Component } from 'react';
import { arrayOf, object, func } from 'prop-types';

import RefreshRedirect from 'sly/web/components/common/RefreshRedirect';
import { prefetch, query, withAuth } from 'sly/web/services/api';
import SlyEvent from 'sly/web/services/helpers/events';
import { objectToURLQueryParams, parseURLQueryParams } from 'sly/web/services/helpers/url';
import { addToLocalStorage, retrieveLocalStorage } from 'sly/web/services/helpers/localStorage';
import withModal from 'sly/web/controllers/withModal';
import withNotification from 'sly/web/controllers/withNotification';
import AskQuestionToAgentFormContainer from 'sly/web/containers/AskQuestionToAgentFormContainer';
import FamilyHomePage from 'sly/web/components/pages/familyDashboard/Home';
import PostConversionGreetingForm from 'sly/web/components/organisms/PostConversionGreetingForm';
import Modal, { HeaderWithClose, PaddedHeaderWithCloseBody } from 'sly/web/components/atoms/NewModal';
import MatchedAgent from 'sly/web/components/organisms/MatchedAgent';
import { Block, Link } from 'sly/common/components/atoms';

@prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))
@prefetch('homeBase', 'getHomeBase', req => req({ id: 'me' }))
@query('updateUuidAux', 'updateUuidAux')
@withModal
@withNotification
@withAuth
export default class HomeBasePageContainer extends Component {
  static propTypes = {
    uuidAux: object,
    homeBase: object,
    status: object,
    location: object,
    history: object,
    notifyInfo: func.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
  };

  static defaultProps = {
    userSaves: [],
  };

  state = {
    currentGalleryImage: {},
    showBanner: true,
    modalOpen: false,
  };

  handleOnGallerySlideChange = (userSaveId, i) => {
    const { currentGalleryImage } = this.state;
    currentGalleryImage[userSaveId] = i;

    this.setState({
      currentGalleryImage,
    });
  };

  handleBannerClose = () => {
    const event = {
      action: 'click', category: 'welcomeBannerClose',
    };
    SlyEvent.getInstance().sendEvent(event);
    this.setState({
      showBanner: false,
    });
    addToLocalStorage('welcomeBannerSeen', true);
  }

  handleMarketplaceTileClick = (evt, { category, label, value }) => {
    const event = {
      action: 'click', category, label, value,
    };
    SlyEvent.getInstance().sendEvent(event);
    console.log('Marketplace Offer was clicked');
  }

  closeAskAgentQuestionModal = () => {
    const { hideModal } = this.props;
    SlyEvent.getInstance().sendEvent({
      category: 'homeBase',
      action: 'closeModal',
      label: 'askAgentQuestion',
    });
    hideModal();
  }
  openAskAgentQuestionModal = () => {
    const { showModal } = this.props;
    showModal(<AskQuestionToAgentFormContainer entityId="homeBase" postSubmit={this.closeAskAgentQuestionModal} />, this.closeAskAgentQuestionModal);
  }

  closeRequestConfirmationModal = () => {
    const { hideModal, history, location: { search } } = this.props;
    // this.setState({
    //   modalOpen: false,
    // });
    SlyEvent.getInstance().sendEvent({
      category: 'homeBase',
      action: 'closeModal',
      label: 'requestConfirmation',
    });
    const qp = parseURLQueryParams(search);
    console.log('seeing location', location.url);
    hideModal();
    if (qp.entry) {
      delete qp.entry;
      history.push(`${location.url}?${objectToURLQueryParams(qp)}`);
    }
  }
  openRequestConfirmationModal = (qp) => {
    const { showModal, history } = this.props;
    showModal(<PostConversionGreetingForm onReturnClick={this.closeRequestConfirmationModal} heading="Your request was sent." />);
  }

  render() {
    const { location: { search }, status, homeBase } = this.props;
    const { currentGalleryImage, modalOpen, showBanner } = this.state;
    const qp = parseURLQueryParams(search);
    // const clickHandlers = [];
    const bannerSeen = retrieveLocalStorage('welcomeBannerSeen');
    // if (bannerSeen) {
    //   this.setState({
    //     showBanner: false,
    //   });
    // }
    if (status.homeBase && status.homeBase.error) {
      return <RefreshRedirect to="/" />;
    }
    if (qp.entry) {
      this.openRequestConfirmationModal(qp);
    }

    return (
      <div>
        {/* <Modal isOpen={modalOpen} onClose={this.toggleModal}> */}
        {/*  <HeaderWithClose onClose={this.toggleModal} /> */}
        {/*  <PaddedHeaderWithCloseBody> */}
        {/*    {agent && */}
        {/*      <MatchedAgent */}
        {/*        hasBox={false} */}
        {/*        agent={agent} */}
        {/*        heading={`Request sent! Your Local Senior Living Expert, ${agent.name} will get back to you with pricing information on this community.`} */}
        {/*      /> */}
        {/*    } */}
        {/*  </PaddedHeaderWithCloseBody> */}
        {/* </Modal> */}
        <FamilyHomePage
          homeBase={homeBase}
          onBannerClose={this.handleBannerClose}
          onGallerySlideChange={this.handleOnGallerySlideChange}
          toggleHowSlyWorksVideoPlaying={this.handleToggleHowSlyWorksVideoPlaying}
          currentGalleryImage={currentGalleryImage}
          onLocationSearch={this.handleOnLocationSearch}
          onUnfavouriteClick={this.handleUnfavouriteClick}
          onMarketplaceTileClick={this.handleMarketplaceTileClick}
          openAskAgentQuestionModal={this.openAskAgentQuestionModal}
          isLoading={!status.homeBase.hasFinished}
          showBanner={showBanner && !bannerSeen}
        />
      </div>
    );
  }
}
