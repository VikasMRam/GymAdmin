import React, { Component } from 'react';
import { arrayOf, object, func } from 'prop-types';
import * as immutable from 'object-path-immutable';

import RefreshRedirect from 'sly/components/common/RefreshRedirect';
import { prefetch, query } from 'sly/services/newApi';
import { COMMUNITY_ENTITY_TYPE } from 'sly/constants/entityTypes';
import { USER_SAVE_INIT_STATUS, USER_SAVE_DELETE_STATUS } from 'sly/constants/userSave';
import SlyEvent from 'sly/services/helpers/events';
import { generateAskAgentQuestionContents } from 'sly/services/helpers/agents';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/search';
import withModal from 'sly/controllers/withModal';
import withNotification from 'sly/controllers/withNotification';
import CommunityAskQuestionAgentFormContainer from 'sly/containers/CommunityAskQuestionAgentFormContainer';
import AddOrEditNoteForSavedCommunityContainer from 'sly/containers/AddOrEditNoteForSavedCommunityContainer';
import DashboardFavoritesPage from 'sly/components/pages/DashboardFavoritesPage';

@query('updateUserSave', 'updateUserSave')

@prefetch('userSaves', 'getUserSaves', getUserSaves => getUserSaves({
  'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
  'filter[status]': USER_SAVE_INIT_STATUS,
}))

@withModal
@withNotification

export default class DashboardFavoritesPageContainer extends Component {
  static propTypes = {
    userSaves: arrayOf(object),
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
      action: 'submit', category: 'dashboardFamilyFavoritesSearch', label: result.formatted_address,
    };
    SlyEvent.getInstance().sendEvent(event);

    const { history } = this.props;
    const { activeDiscoverHome } = this.state;
    const searchParams = getSearchParamFromPlacesResponse(result);
    const { path } = filterLinkPath(searchParams, activeDiscoverHome ? activeDiscoverHome.searchParams : {});
    history.push(path);
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
    const { status, userSaves } = this.props;
    const { currentGalleryImage, howSlyWorksVideoPlaying } = this.state;
    let clickHandlers = [];

    if (status.userSaves && status.userSaves.error) {
      return <RefreshRedirect to="/" />;
    }
    if (status.userSaves.hasFinished) {
      clickHandlers = userSaves.map(this.getClickHandler);
    }

    return (
      <DashboardFavoritesPage
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
