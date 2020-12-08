import React, { Component } from 'react';
import { arrayOf, object, func } from 'prop-types';
import * as immutable from 'object-path-immutable';

import RefreshRedirect from 'sly/web/components/common/RefreshRedirect';
import { prefetch, query, withAuth } from 'sly/web/services/api';
import { COMMUNITY_ENTITY_TYPE } from 'sly/web/constants/entityTypes';
import { USER_SAVE_INIT_STATUS, USER_SAVE_DELETE_STATUS } from 'sly/web/constants/userSave';
import SlyEvent from 'sly/web/services/helpers/events';
import { generateAskAgentQuestionContents } from 'sly/web/services/helpers/agents';
import { objectToURLQueryParams } from 'sly/web/services/helpers/url';
import withModal from 'sly/web/controllers/withModal';
import withNotification from 'sly/web/controllers/withNotification';
import CommunityAskQuestionAgentFormContainer from 'sly/web/containers/CommunityAskQuestionAgentFormContainer';
import AddOrEditNoteForSavedCommunityContainer from 'sly/web/containers/AddOrEditNoteForSavedCommunityContainer';
import FamilyHomePage from 'sly/web/components/pages/familyDashboard/Home';

@query('updateUserSave', 'updateUserSave')

@prefetch('userSaves', 'getUserSaves', getUserSaves => getUserSaves({
  'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
  'filter[status]': USER_SAVE_INIT_STATUS,
}))
@prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))
@query('updateUuidAux', 'updateUuidAux')
@withModal
@withNotification
@withAuth
export default class HomePageContainer extends Component {
  static propTypes = {
    userSaves: arrayOf(object),
    uuidAux: object,
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
    howSlyWorksVideoPlaying: false,
  };

  handleOnGallerySlideChange = (userSaveId, i) => {
    const { currentGalleryImage } = this.state;
    currentGalleryImage[userSaveId] = i;

    this.setState({
      currentGalleryImage,
    });
  };

  handleToggleHowSlyWorksVideoPlaying = () => {
    const { howSlyWorksVideoPlaying } = this;
    this.setState({ howSlyWorksVideoPlaying: !howSlyWorksVideoPlaying });
    const event = {
      action: 'start', category: 'howSlyWorksVideo', label: 'dashboard-family-favorites',
    };
    if (howSlyWorksVideoPlaying) {
      event.action = 'stop';
    }
    SlyEvent.getInstance().sendEvent(event);
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
      e.preventDefault();

      const rawUserSave = rawUserSaves[i];
      const onComplete = () => {
        hideModal();
        status.userSaves.refetch();
        notifyInfo(`Note ${userSave.info.note ? 'Edited' : 'Added'}`);
      };
      const initialValues = {
        note: userSave.info.note,
      };
      const modalComponentProps = {
        hideModal,
        userSave,
        rawUserSave,
        community,
        onComplete,
        onCancel: hideModal,
        isEditMode: !!userSave.info.note,
        initialValues,
      };

      showModal(<AddOrEditNoteForSavedCommunityContainer {...modalComponentProps} />, null, 'noPadding', false);
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

  render() {
    const { status, userSaves, uuidAux } = this.props;
    const { currentGalleryImage, howSlyWorksVideoPlaying } = this.state;
    const clickHandlers = [];

    if (status.uuidAux && status.uuidAux.error) {
      return <RefreshRedirect to="/" />;
    }
    // if (status.uuidAux.hasFinished) {
    //   clickHandlers = userSaves.map(this.getClickHandler);
    // }
    console.log('Seeing uuidAux', uuidAux);

    return (
      <FamilyHomePage
        userSaves={userSaves}
        onGallerySlideChange={this.handleOnGallerySlideChange}
        toggleHowSlyWorksVideoPlaying={this.handleToggleHowSlyWorksVideoPlaying}
        currentGalleryImage={currentGalleryImage}
        onLocationSearch={this.handleOnLocationSearch}
        ishowSlyWorksVideoPlaying={howSlyWorksVideoPlaying}
        onUnfavouriteClick={this.handleUnfavouriteClick}
        clickHandlers={clickHandlers}
        isLoading={!status.userSaves.hasFinished}
      />
    );
  }
}
