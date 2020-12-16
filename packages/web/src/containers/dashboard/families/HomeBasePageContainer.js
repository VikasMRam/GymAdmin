import React, { Component } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { arrayOf, object, func } from 'prop-types';
import * as immutable from 'object-path-immutable';

import RefreshRedirect from 'sly/web/components/common/RefreshRedirect';
import { prefetch, query, withAuth } from 'sly/web/services/api';
import { COMMUNITY_ENTITY_TYPE } from 'sly/web/constants/entityTypes';
import { USER_SAVE_INIT_STATUS, USER_SAVE_DELETE_STATUS } from 'sly/web/constants/userSave';
import SlyEvent from 'sly/web/services/helpers/events';
import { generateAskAgentQuestionContents } from 'sly/web/services/helpers/agents';
import { objectToURLQueryParams, parseURLQueryParams } from 'sly/web/services/helpers/url';
import withModal from 'sly/web/controllers/withModal';
import withNotification from 'sly/web/controllers/withNotification';
import CommunityAskQuestionAgentFormContainer from 'sly/web/containers/CommunityAskQuestionAgentFormContainer';
import AskQuestionToAgentFormContainer from 'sly/web/containers/AskQuestionToAgentFormContainer';

import FamilyHomePage from 'sly/web/components/pages/familyDashboard/Home';
import PostConversionGreetingForm from 'sly/web/components/organisms/PostConversionGreetingForm';
import Modal, { HeaderWithClose, PaddedHeaderWithCloseBody } from 'sly/web/components/atoms/NewModal';
import MatchedAgent from 'sly/web/components/organisms/MatchedAgent';
import { Block, Link } from 'sly/common/components/atoms';


@query('updateUserSave', 'updateUserSave')

@prefetch('userSaves', 'getUserSaves', getUserSaves => getUserSaves({
  'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
  'filter[status]': USER_SAVE_INIT_STATUS,
}))
@prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))
@prefetch('homeBase', 'getHomeBase', req => req({ id: 'me' }))
@query('updateUuidAux', 'updateUuidAux')
@withModal
@withNotification
@withAuth
export default class HomeBasePageContainer extends Component {
  static propTypes = {
    userSaves: arrayOf(object),
    uuidAux: object,
    homeBase: object,
    updateUserSave: func.isRequired,
    status: object,
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
    modalOpen: false,
  };

  handleOnGallerySlideChange = (userSaveId, i) => {
    const { currentGalleryImage } = this.state;
    currentGalleryImage[userSaveId] = i;

    this.setState({
      currentGalleryImage,
    });
  };

  handleOnLocationSearch = (result) => {
    const event = {
      action: 'submit', category: 'dashboardFamilyFavoritesSearch', label: result.displayText,
    };
    SlyEvent.getInstance().sendEvent(event);

    const { history } = this.props;
    const { activeDiscoverHome } = this.state;

    history.push(activeDiscoverHome ?
      `${result.url}?${objectToURLQueryParams(activeDiscoverHome.searchParams)}` : result.url);
  };
  handleBannerClose = () => {
    console.log('Banner Close was clicked');
  }

  handleUnfavouriteClick = (id) => {
    const { updateUserSave, status, notifyInfo } = this.props;
    const { result: rawUserSaves } = status.userSaves;
    const rawUserSave = rawUserSaves.find(us => us.id === id);
    const userSave = immutable.set(rawUserSave, 'attributes.status', USER_SAVE_DELETE_STATUS);

    return updateUserSave({ id }, userSave)
      .then(() => status.userSaves.refetch())
      .then(() => notifyInfo('Community has been removed from favorites'));
  };
  getClickHandler = (userSave, i) => {
    const { status, showModal, hideModal, notifyInfo } = this.props;
    const { result: rawUserSaves = [] } = status.userSaves;
    const { community } = userSave;

    const openAskAgentQuestionModal = (e) => {
      e.preventDefault();

      const { addressString, name } = community;
      const [, city] = addressString.split(',');
      const { heading, placeholder, question } = generateAskAgentQuestionContents(name, city);

      const modalComponentProps = {
        toggleAskAgentQuestionModal: hideModal,
        notifyInfo,
        community,
        heading,
        placeholder,
        question,
      };

      showModal(<CommunityAskQuestionAgentFormContainer {...modalComponentProps} />);
    };

    const openNoteModification = (e) => {
      showModal(<AskQuestionToAgentFormContainer {...modalComponentProps} />,false);
    };

    const onUnfavouriteClick = (e) => {
      e.preventDefault();

      this.handleUnfavouriteClick(userSave.id);
    };

    return {
      openAskAgentQuestionModal,
      openNoteModification,
      onUnfavouriteClick,
    };
  };
  
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
    showModal(<AskQuestionToAgentFormContainer entityId='homeBase' postSubmit={this.closeAskAgentQuestionModal}/>,this.closeAskAgentQuestionModal)
  }

  closeRequestConfirmationModal = () => {
    const { hideModal, history, location } = this.props;
    // this.setState({
    //   modalOpen: false,
    // });
    SlyEvent.getInstance().sendEvent({
      category: 'homeBase',
      action: 'closeModal',
      label: 'requestConfirmation',
    });
    const qp = parseURLQueryParams(search);
    hideModal();
    if (qp.entry) {
      delete qp['entry']
      history.push(`${location.url}?${objectToURLQueryParams(qp)}`)
    }

  }
  openRequestConfirmationModal = (qp) => {
    const { showModal, history } = this.props;
    showModal(<PostConversionGreetingForm onReturnClick={this.closeRequestConfirmationModal} heading="Your request was sent." />);
  }

  render() {
    const { location: { search }, history, status, homeBase } = this.props;
    const { currentGalleryImage, modalOpen } = this.state;
    const qp = parseURLQueryParams(search);
    const clickHandlers = [];
    
    if (status.homeBase && status.homeBase.error) {
      return <RefreshRedirect to="/" />;
    }
    // if (qp.entry) {
    //   this.openRequestConfirmationModal(qp);
    // }

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
          clickHandlers={clickHandlers}
          openAskAgentQuestionModal={this.openAskAgentQuestionModal}
          isLoading={!status.homeBase.hasFinished}
          showBanner
        />
      </div>
    );
  }
}
