import React, { Component } from 'react';
import { object, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError, clearSubmitErrors } from 'redux-form';
import { withRouter } from 'react-router';

import SlyEvent from 'sly/services/helpers/events';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import { USER_SAVE_INIT_STATUS } from 'sly/constants/userSave';
import { COMMUNITY_ENTITY_TYPE } from 'sly/constants/entityTypes';
import { NOTIFICATIONS_COMMUNITY_ADD_FAVORITE_FAILED } from 'sly/constants/notifications';
import { community as communityPropType } from 'sly/propTypes/community';
import { withApi, withUser, prefetch } from 'sly/services/newApi';
import { ensureAuthenticated } from 'sly/store/authenticated/actions';
import SaveCommunityFormContainer from 'sly/containers/SaveCommunityFormContainer';
import CommunitySaved from 'sly/components/organisms/CommunitySaved';

const mapStateToProps = (state, ownProps) => {
  const { slug, userSaves } = ownProps;
  const userSave = userSaves && userSaves.find(us => us.entityType === COMMUNITY_ENTITY_TYPE && us.entitySlug === slug);
  return {
    userSave,
  };
};

// FIXME: hack because createUser is not JSON:API, should use @query
const mapDispatchToProps = (dispatch, { api }) => ({
  createUserSave: data => dispatch(ensureAuthenticated(
    'Sign up to add to your favorites list',
    () => api.createUserSave(data),
  )),
  updateUserSave: (id, data) => dispatch(ensureAuthenticated(
    'Sign up to add to your favorites list',
    () => api.updateUserSave({ id }, data),
  )),
});

const getCommunitySlug = match => match.params.communitySlug;

@withRouter

@withApi

@withUser

@prefetch('community', 'getCommunity', (req, { slug }) => req({
  id: slug,
  include: 'similar-communities,questions,agents',
}))

@prefetch('userSaves', 'getUserSaves', (req, { match }) => req({
  'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
  'filter[entity_slug]': getCommunitySlug(match),
}))

@connect(mapStateToProps, mapDispatchToProps)

export default class SaveCommunityContainer extends Component {
  static propTypes = {
    slug: string,
    user: object,
    userSave: object,
    createUserSave: func,
    updateUserSave: func,
    community: communityPropType,
    notification: string,
    setQueryParams: func,
    notifyInfo: func,
    notifyError: func,
    onDoneButtonClicked: func,
  };

  state = { updatingUserSave: false };

  // FIXME: ugly hack to convert a declarative intent in an imperative one
  componentDidMount() {
    const { createUserSave, updateUserSave } = this;
    const { userSave, status } = this.props;
    console.log({ status })

    if (userSave) {
      updateUserSave(USER_SAVE_INIT_STATUS);
    } else {
      createUserSave();
    }
  }

  createUserSave = () => {
    const { handleModalClose } = this;
    const {
      community, createUserSave, notifyError,
    } = this.props;
    const { id } = community;
    const payload = {
      entityType: COMMUNITY_ENTITY_TYPE,
      entitySlug: id,
    };

    this.setState({
      updatingUserSave: true,
    });
    createUserSave(payload)
      .then(() => {
        this.setState({
          updatingUserSave: false,
        });
      }, () => {
        handleModalClose();
        notifyError(NOTIFICATIONS_COMMUNITY_ADD_FAVORITE_FAILED);
      });
  };

  updateUserSave = (status) => {
    const { handleModalClose } = this;
    const {
      userSave, updateUserSave, notifyError,
    } = this.props;
    const { id } = userSave;

    this.setState({
      updatingUserSave: true,
    });
    updateUserSave(id, {
      status,
    })
      .then(() => {
        this.setState({
          updatingUserSave: false,
        });
      }, () => {
        handleModalClose();
        notifyError(NOTIFICATIONS_COMMUNITY_ADD_FAVORITE_FAILED);
      });
  };

  handleSubmitSaveCommunityForm = (data, next) => {
    const {
      updateUserSave, userSave,
    } = this.props;
    const { id } = userSave;

    clearSubmitErrors();
    return updateUserSave(id, {
      note: data.note,
    })
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { response } = r;
        return response.json().then((data) => {
          const errorMessage = Object.values(data.errors).join('. ');
          throw new SubmissionError({ _error: errorMessage });
        });
      })
      .then(() => next());
  };

  handleModalClose = () => {
    const { community, onDoneButtonClicked } = this.props;
    const { id } = community;

    onDoneButtonClicked();
    const event = {
      action: 'close-modal', category: 'saveCommunity', label: id,
    };
    SlyEvent.getInstance().sendEvent(event);
  };

  render() {
    const { handleSubmitSaveCommunityForm } = this;
    const { community, onDoneButtonClicked } = this.props;
    const { updatingUserSave } = this.state;

    if (updatingUserSave) {
      return 'Updating...';
    }

    return (
      <WizardController
        formName="SaveCommunityForm"
      >
        {({
          data, next, ...props
        }) => (
          <WizardSteps {...props}>
            <WizardStep
              component={SaveCommunityFormContainer}
              name="Note"
              onSubmit={data => handleSubmitSaveCommunityForm(data, next)}
            />
            <WizardStep
              component={CommunitySaved}
              name="Success"
              similarCommunities={community.similarProperties}
              onDoneButtonClicked={onDoneButtonClicked}
            />
          </WizardSteps>
        )}
      </WizardController>
    );
  }
}

