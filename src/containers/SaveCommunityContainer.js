import React, { Component } from 'react';
import { object, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError, clearSubmitErrors } from 'redux-form';

import SlyEvent from 'sly/services/helpers/events';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import { USER_SAVE_INIT_STATUS } from 'sly/constants/userSave';
import { COMMUNITY_ENTITY_TYPE } from 'sly/constants/entityTypes';
import { NOTIFICATIONS_COMMUNITY_ADD_FAVORITE_FAILED } from 'sly/constants/notifications';
import { resourceCreateRequest, resourceUpdateRequest } from 'sly/store/resource/actions';
import { community as communityPropType } from 'sly/propTypes/community';
import { getDetail, getDetails } from 'sly/store/selectors';
import { ensureAuthenticated } from 'sly/store/authenticated/actions';
import SaveCommunityFormContainer from 'sly/containers/SaveCommunityFormContainer';
import CommunitySaved from 'sly/components/organisms/CommunitySaved';

class SaveCommunityContainer extends Component {
  static propTypes = {
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

  componentDidMount() {
    const { createUserSave, updateUserSave } = this;
    const { userSave } = this.props;

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

    this.updatingUserSave = true;
    createUserSave(payload)
      .then(() => {
        this.updatingUserSave = false;
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

    this.updatingUserSave = true;
    updateUserSave(id, {
      status,
    })
      .then(() => {
        this.updatingUserSave = false;
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
    const { updatingUserSave, handleSubmitSaveCommunityForm } = this;
    const { community, onDoneButtonClicked } = this.props;
    const { similarProperties } = community;

    if (updatingUserSave) {
      return null;
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
              similarCommunities={similarProperties}
              onDoneButtonClicked={onDoneButtonClicked}
            />
          </WizardSteps>
        )}
      </WizardController>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps;
  const community = getDetail(state, 'community', slug);
  const user = getDetail(state, 'user', 'me');
  const userSaves = getDetails(state, 'userSave');
  const userSave = userSaves.find(us => us.entityType === COMMUNITY_ENTITY_TYPE && us.entitySlug === slug);

  return {
    user,
    community,
    userSave,
  };
};

const mapDispatchToProps = dispatch => ({
  createUserSave: data => dispatch(ensureAuthenticated(
    'Sign up to add to your favorites list',
    resourceCreateRequest('userSave', data),
  )),
  updateUserSave: (id, data) => dispatch(ensureAuthenticated(
    'Sign up to add to your favorites list',
    resourceUpdateRequest('userSave', id, data),
  )),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveCommunityContainer);
