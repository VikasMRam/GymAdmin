import React, { Component } from 'react';
import { arrayOf, object, func } from 'prop-types';
import { stringify } from 'query-string';

import RefreshRedirect from 'sly/web/components/common/RefreshRedirect';
import { prefetch, query, withAuth } from 'sly/web/services/api';
import SlyEvent from 'sly/web/services/helpers/events';
import { parseURLQueryParams, removeQueryParamFromURL } from 'sly/web/services/helpers/url';
import { addToLocalStorage, retrieveLocalStorage } from 'sly/web/services/helpers/localStorage';
import { shouldShowModal, getWelcomeBannerContent, getWelcomeModalContent } from 'sly/web/services/helpers/homeBase';
import withModal from 'sly/web/controllers/withModal';
import withNotification from 'sly/web/controllers/withNotification';
import AskQuestionToAgentFormContainer from 'sly/web/containers/AskQuestionToAgentFormContainer';
import FamilyHomePage from 'sly/web/components/pages/familyDashboard/Home';
import EntryModal from 'sly/web/components/organisms/homeBase/EntryModal';

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
    homeBase: { client: {}, agent: {} },
  };

  state = {
    showBanner: true,
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
    const {
      location,
      history,
    } = this.props;
    const { pathname, search, hash } = location;
    const params = removeQueryParamFromURL('modal', search);
    history.replace(`${pathname}${stringify(params)}${hash}`);
    SlyEvent.getInstance().sendEvent({
      category: 'homeBase',
      action: 'closeModal',
      label: 'requestConfirmation',
    });
  }

  render() {
    const { location: { search }, status, homeBase, uuidAux } = this.props;
    const { currentGalleryImage, showBanner } = this.state;
    const qp = parseURLQueryParams(search);
    const bannerSeen = retrieveLocalStorage('welcomeBannerSeen');

    if (status.homeBase && status.homeBase.error) {
      return <RefreshRedirect to="/" />;
    }

    return (
      <div>
        <EntryModal content={getWelcomeModalContent(qp.modal)} isOpen={shouldShowModal(qp.modal)} onClose={this.closeRequestConfirmationModal} />
        <FamilyHomePage
          homeBase={homeBase}
          uuidAux={uuidAux}
          onBannerClose={this.handleBannerClose}
          onGallerySlideChange={this.handleOnGallerySlideChange}
          toggleHowSlyWorksVideoPlaying={this.handleToggleHowSlyWorksVideoPlaying}
          currentGalleryImage={currentGalleryImage}
          onLocationSearch={this.handleOnLocationSearch}
          onUnfavouriteClick={this.handleUnfavouriteClick}
          onMarketplaceTileClick={this.handleMarketplaceTileClick}
          openAskAgentQuestionModal={this.openAskAgentQuestionModal}
          isLoading={!status.homeBase.hasFinished}
          // showBanner={showBanner && !bannerSeen}
          showBanner={showBanner}
          welcomeBannerContent={getWelcomeBannerContent(homeBase, qp.modal)}
        />
      </div>
    );
  }
}
