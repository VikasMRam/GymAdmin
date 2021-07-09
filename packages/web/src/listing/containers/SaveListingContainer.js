import React, { Component } from 'react';
import { object, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError, clearSubmitErrors } from 'redux-form';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import { size } from 'sly/common/components/themes';
import SlyEvent from 'sly/web/services/helpers/events';
import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import { USER_SAVE_INIT_STATUS } from 'sly/web/constants/userSave';
import { LISTING_ENTITY_TYPE } from 'sly/web/constants/entityTypes';
import { NOTIFICATIONS_LISTING_ADD_FAVORITE_SUCCESS, NOTIFICATIONS_LISTING_ADD_FAVORITE_FAILED } from 'sly/web/constants/notifications';
import { listing as listingPropType } from 'sly/common/propTypes/listing';
import { withAuth, prefetch, query } from 'sly/web/services/api';
import { Block } from 'sly/web/components/atoms';
import AddNoteFormContainer from 'sly/web/containers/AddNoteFormContainer';
import ListingSaved from 'sly/web/listing/components/ListingSaved';
import { USER_SAVE } from 'sly/web/services/api/constants';
import { ensureAuthenticated } from 'sly/web/store/authenticated/actions';

const PaddedBlock = styled(Block)`
  padding: ${size('spacing.xxLarge')};
`;

const mapStateToProps = (state, ownProps) => {
  const { slug, userSaves } = ownProps;
  const userSave = userSaves && userSaves.find(us => us.entityType === LISTING_ENTITY_TYPE && us.entitySlug === slug);
  return {
    userSave,
  };
};

@withAuth
@withRouter
@prefetch('listing', 'getListing', (req, { slug }) => req({
  id: slug,
  include: 'similar-listings,agent,community,reviews',
}))
@prefetch('userSaves', 'getUserSaves', (req, { slug }) => req({
  'filter[entity_type]': LISTING_ENTITY_TYPE,
  'filter[entity_slug]': slug,
}))
@query('createAction', 'createUuidAction')
@query('createUserSave')
@query('updateOldUserSave')
@connect(mapStateToProps, { ensureAuthenticated, clearSubmitErrors })

export default class SaveListingContainer extends Component {
  static propTypes = {
    match: object,
    slug: string,
    user: object,
    userSave: object,
    status: object.isRequired,
    createUserSave: func,
    updateOldUserSave: func,
    createAction: func,
    listing: listingPropType,
    notification: string,
    setQueryParams: func,
    notifyInfo: func,
    notifyError: func,
    onDoneButtonClick: func,
    onCancelClick: func,
  };

  state = { updatingUserSave: false };

  // FIXME: ugly hack to convert a declarative intent in an imperative one
  componentDidMount() {
    const { createUserSave, updateUserSave } = this;
    const { userSave } = this.props;

    if (userSave) {
      updateUserSave(USER_SAVE_INIT_STATUS);
    } else {
      createUserSave();
    }
  }

  authenticatedCreateUserSave = (data) => {
    const { ensureAuthenticated, createUserSave } = this.props;
    return ensureAuthenticated(
      'Sign up to add to your favorites list',
      () => createUserSave(data),
    );
  };

  authenticatedUpdateUserSave = (id, data) => {
    const { ensureAuthenticated, updateOldUserSave } = this.props;
    return ensureAuthenticated(
      'Sign up to add to your favorites list',
      () => updateOldUserSave({ id }, data),
    );
  };

  createUserSave = () => {
    const { handleModalClose } = this;
    const {
      listing, notifyInfo, notifyError, createAction, match, status,
    } = this.props;
    const { id } = listing;
    const payload = {
      attributes: {
        entityType: LISTING_ENTITY_TYPE,
        entitySlug: id,
      },
    };

    this.setState({
      updatingUserSave: true,
    });

    this.authenticatedCreateUserSave(payload)
      .then(({ body }) => createAction({
        type: 'UUIDAction',
        attributes: {
          actionInfo: {
            entitySlug: listing.id,
            entityType: 'Listing',
            userSaveID: body.data.id,
          },
          actionPage: match.url,
          actionType: USER_SAVE,
        },
      }))
      .then(() => status.userSaves.refetch())
      .then(() => {
        this.setState({
          updatingUserSave: false,
        });
        notifyInfo(NOTIFICATIONS_LISTING_ADD_FAVORITE_SUCCESS);
      }, () => {
        handleModalClose();
        notifyError(NOTIFICATIONS_LISTING_ADD_FAVORITE_FAILED);
      });
  };

  updateUserSave = (status) => {
    const { handleModalClose } = this;
    const {
      userSave, notifyInfo, notifyError, createAction, listing, match, status: prefetchStatus,
    } = this.props;
    const { id } = userSave;

    this.setState({
      updatingUserSave: true,
    });

    this.authenticatedUpdateUserSave(id, {
      status,
    })
      .then(({ body }) => createAction({
        type: 'UUIDAction',
        attributes: {
          actionInfo: {
            entitySlug: listing.id,
            entityType: 'Listing',
            userSaveID: body.data.id,
          },
          actionPage: match.url,
          actionType: USER_SAVE,
        },
      }))
      .then(() => prefetchStatus.userSaves.refetch())
      .then(() => {
        this.setState({
          updatingUserSave: false,
        });
        notifyInfo(NOTIFICATIONS_LISTING_ADD_FAVORITE_SUCCESS);
      }, () => {
        handleModalClose();
        notifyError(NOTIFICATIONS_LISTING_ADD_FAVORITE_FAILED);
      });
  };

  handleSubmitSaveListingForm = (data, next) => {
    const {
      updateOldUserSave, userSave, clearSubmitErrors, status,
    } = this.props;

    const { id } = userSave;

    clearSubmitErrors();
    return updateOldUserSave({ id }, {
      note: data.note,
    })
      .then(status.userSaves.refetch)
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
    const { listing, onDoneButtonClick } = this.props;
    const { id } = listing;

    onDoneButtonClick();
    const event = {
      action: 'close-modal', category: 'saveListing', label: id,
    };
    SlyEvent.getInstance().sendEvent(event);
  };

  render() {
    const { handleSubmitSaveListingForm } = this;
    const { listing, onDoneButtonClick, onCancelClick } = this.props;
    const { updatingUserSave } = this.state;

    if (updatingUserSave) {
      return <PaddedBlock>Updating...</PaddedBlock>;
    }

    const PaddedListingSaved = () => (
      <PaddedBlock>
        <ListingSaved name="Success" onDoneButtonClicked={onDoneButtonClick} />
      </PaddedBlock>
    );

    return (
      <WizardController
        formName="SaveListingForm"
      >
        {({
            data, next, ...props
          }) => (
            <WizardSteps {...props}>
              <WizardStep
                component={AddNoteFormContainer}
                name="Note"
                onSubmit={data => handleSubmitSaveListingForm(data, next)}
                heading="Listing saved"
                placeholder="What are some things about this listing that you like..."
                onCancelClick={onCancelClick}
              />
              <WizardStep
                component={PaddedListingSaved}
                name="Success"
              />
            </WizardSteps>
        )}
      </WizardController>
    );
  }
}
