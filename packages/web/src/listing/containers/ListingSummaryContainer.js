import React, { useCallback, useState } from 'react';
import { bool, string } from 'prop-types';
import { useParams } from 'react-router-dom';

import SlyEvent from 'sly/web/services/helpers/events';
import ListingSummary from 'sly/web/listing/components/ListingSummary';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import { useQuery, useAuth } from 'sly/web/services/api';
import { useNotification } from 'sly/web/components/helpers/notification';
import { withHydration } from 'sly/web/services/partialHydration';
import {
  NOTIFICATIONS_LISTING_REMOVE_FAVORITE_FAILED,
  NOTIFICATIONS_LISTING_REMOVE_FAVORITE_SUCCESS,
} from 'sly/web/constants/notifications';
import { USER_SAVE_DELETE_STATUS } from 'sly/web/constants/userSave';
import { LISTING_ENTITY_TYPE } from 'sly/web/constants/entityTypes';
import Modal, { ModalBody } from 'sly/web/components/atoms/NewModal';
import { isListingAlreadySaved, getListingUserSave } from 'sly/web/listing/helpers';


const ShareListingFormContainer = withHydration(/* #__LOADABLE__ */() => import(/* webpackChunkName: "chunkShareListingFormContainer" */'sly/web/listing/containers/ShareListingFormContainer'));
const SaveListingContainer = withHydration(/* #__LOADABLE__ */() => import(/* webpackChunkName: "chunkSaveListingContainer" */'sly/web/listing/containers/SaveListingContainer'));


const ListingSummaryContainer = ({ isAdmin, className, ...props }) => {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState('');
  const { notifyError, notifyInfo } = useNotification();
  const { user, ensureAuthenticated } = useAuth();

  const updateOldUserSave = useQuery('updateOldUserSave');

  const { requestInfo: { normalized: listing } } = usePrefetch('getListing', {
    id: params.id,
    include: 'similar-listings,agent,community,reviews',
  });

  const { requestInfo: { normalized: userSaves }, fetch: refetchUserSaves } = usePrefetch('getUserSaves', {
    'filter[entity_type]': LISTING_ENTITY_TYPE,
    'filter[entity_slug]': listing.id,
  });


  const sendEvent = useCallback((action, category) =>
    SlyEvent.getInstance().sendEvent({
      action,
      category,
      label: listing.id,
    }), []);

  const conciergeNumberClicked = useCallback(() => sendEvent('click', 'conciergeNumberClicked'), []);

  const listingNumberClicked = useCallback(() => sendEvent('click', 'listingNumberClicked'), []);

  const goToReviews = useCallback(() => sendEvent('click', 'viewReviews'), []);


  const authenticatedUpdateUserSave = (id, data) => {
    return ensureAuthenticated(
      'Sign up to add to your favorites list',
      () => updateOldUserSave({ id }, data),
    );
  };


  const handleFavouriteClick = () => {
    if (isListingAlreadySaved(listing, userSaves)) {
      const userSaveToUpdate = getListingUserSave(listing, userSaves);
      authenticatedUpdateUserSave(userSaveToUpdate.id, {
        status: USER_SAVE_DELETE_STATUS,
      })
        .then(refetchUserSaves)
        .then(() => notifyInfo(NOTIFICATIONS_LISTING_REMOVE_FAVORITE_SUCCESS))
        .catch(() =>
          notifyError(NOTIFICATIONS_LISTING_REMOVE_FAVORITE_FAILED),
        );

      sendEvent('click', 'unsaveListing');
    } else {
      ensureAuthenticated().then(() => {
        setIsModalOpen('save');
      });
      sendEvent('click', 'saveListing');
    }
  };


  const handleShareClick = () => {
    setIsModalOpen('share');
    sendEvent('click', 'shareListing');
  };

  const setModalClosed = () => {
    sendEvent('close-modal', `${isModalOpen}Listing`);
    setIsModalOpen('');
  };


  return (
    <>
      <ListingSummary
        listing={listing}
        isAdmin={isAdmin}
        onConciergeNumberClicked={conciergeNumberClicked}
        onListingNumberClicked={listingNumberClicked}
        goToReviews={goToReviews}
        className={className}
        searchParams={params}
        isFavorited={isListingAlreadySaved(listing, userSaves)}
        onSaveClick={handleFavouriteClick}
        onShareClick={handleShareClick}
        {...props}
      />
      {isModalOpen &&
        <Modal onClose={setModalClosed}>
          <ModalBody>
            { isModalOpen === 'save' && <SaveListingContainer
              slug={listing.id}
              notifyInfo={notifyInfo}
              notifyError={notifyError}
              onCancelClick={setModalClosed}
              onDoneButtonClick={setModalClosed}
            />}
            {
              isModalOpen === 'share' &&
                <ShareListingFormContainer
                  notifyInfo={notifyInfo}
                  fromEnabled={!user || !user.email}
                  mainImage={listing.mainImage}
                  listingSlug={listing.id}
                  onSuccess={setModalClosed}
                  onCancelClick={setModalClosed}
                />
            }
          </ModalBody>
        </Modal>
      }
    </>
  );
};

ListingSummaryContainer.propTypes = {
  isAdmin: bool,
  className: string,
};

ListingSummaryContainer.typeHydrationId = 'ListingSummaryContainer';

export default ListingSummaryContainer;
