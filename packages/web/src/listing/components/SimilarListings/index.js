import React, { useCallback, useState } from 'react';
import { arrayOf, func, object, bool, string, number } from 'prop-types';

import { listing as listingPropType } from 'sly/common/propTypes/listing';
import EntityTile from 'sly/web/components/common/EntityTile';
import { Link, space, sx } from 'sly/common/system';
import { useAuth, usePrefetch, useQuery } from 'sly/web/services/api';
import { LISTING_ENTITY_TYPE } from 'sly/web/constants/entityTypes';
import { getListingUserSave, isListingAlreadySaved } from 'sly/web/listing/helpers';
import { USER_SAVE_DELETE_STATUS } from 'sly/web/constants/userSave';
import {
  NOTIFICATIONS_LISTING_REMOVE_FAVORITE_FAILED,
  NOTIFICATIONS_LISTING_REMOVE_FAVORITE_SUCCESS,
} from 'sly/web/constants/notifications';
import SlyEvent from 'sly/web/services/helpers/events';
import { useNotification } from 'sly/web/components/helpers/notification';
import Modal, { ModalBody } from 'sly/web/components/atoms/NewModal';
import { withHydration } from 'sly/web/services/partialHydration';

const SaveListingContainer = withHydration(/* #__LOADABLE__ */() => import(/* webpackChunkName: "chunkSaveListingContainer" */'sly/web/listing/containers/SaveListingContainer'));


const ListingTileContainer = ({
  listing,
  layout,
  getEvent,
  canFavourite,
  index,
  onListingClick,
}) => {
  const [activeListingIndex, setActiveListingIndex] = useState(null);

  const { notifyError, notifyInfo } = useNotification();

  const { requestInfo: { normalized: listingInfo } } = usePrefetch('getListing', {
    id: listing.id,
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
    }), [listing]);

  const { ensureAuthenticated } = useAuth();

  const updateOldUserSave = useQuery('updateOldUserSave');

  const authenticatedUpdateUserSave = useCallback((id, data) => {
    return ensureAuthenticated(
      'Sign up to add to your favorites list',
      () => updateOldUserSave({ id }, data),
    );
  }, []);

  const handleFavouriteClick = useCallback((evt) => {
    evt.preventDefault();
    if (isListingAlreadySaved(listingInfo, userSaves)) {
      const userSaveToUpdate = getListingUserSave(listingInfo, userSaves);
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
      ensureAuthenticated().then(() => setActiveListingIndex(index));
      sendEvent('click', 'saveListing');
    }
  }, [listingInfo, userSaves]);

  const onModalClose = useCallback(() => {
    setActiveListingIndex(null);
    refetchUserSaves();
  }, []);

  if (!listingInfo) return null;

  return (
    <>
      <Link
        key={listing.id}
        to={listing.url}
        onClick={onListingClick}
        event={getEvent(listing, index)}
        sx={{
          '&:hover': {
            textDecoration: 'none',
            boxShadow: sx`0 ${space('xxs')} ${space('m')} 0 rgba(0, 0, 0, 0.1)`,
          },
        }}
      >
        <EntityTile
          entity={listing}
          layout={layout}
          event={getEvent(listingInfo, index)}
          sx={{
            img: { borderRadius: sx`${space('xxs')} ${space('xxs')} 0 0` },
            span: { font: 'body-m' },
            h3: { mb: 's' },
            height: '100%',
            '& > div > div:last-child': {  p: 'm' },
            'button svg': { color: isListingAlreadySaved(listingInfo, userSaves) && 'red.lighter-20' },
          }}
          canFavourite={canFavourite}
          onUnfavouriteClick={handleFavouriteClick}
          onFavouriteClick={handleFavouriteClick}
          isFavourite={isListingAlreadySaved(listingInfo, userSaves)}
        />
      </Link>
      <Modal onClose={onModalClose} isOpen={typeof activeListingIndex === 'number'}>
        <ModalBody>
          <SaveListingContainer
            slug={typeof activeListingIndex === 'number' && listingInfo.id}
            notifyInfo={notifyInfo}
            notifyError={notifyError}
            onCancelClick={onModalClose}
            onDoneButtonClick={onModalClose}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

ListingTileContainer.propTypes = {
  listing: listingPropType,
  layout: string,
  getEvent: func,
  canFavourite: bool,
  index: number,
  onListingClick: func,
};

const SimilarListings = ({ listings, onListingClick, listingStyle, getEvent, canFavourite }) => {
  const { layout = 'column' } = listingStyle;

  return (
    <>
      {listings.map((listing, index) => canFavourite
        ? (
          <ListingTileContainer
            key={listing.id}
            onListingClick={onListingClick}
            layout={layout}
            canFavourite={canFavourite}
            listing={listing}
            getEvent={getEvent}
            index={index}
          />
        )
        : (
          <Link
            key={listing.id}
            to={listing.url}
            onClick={onListingClick}
            event={getEvent(listing, index)}
            sx={{
              '&:hover': {
                textDecoration: 'none',
              },
            }}
          >
            <EntityTile entity={listing} layout={layout} event={getEvent(listing, index)} />
          </Link>
        ))}
      {listings?.length > 1 && <div />}
    </>
  );
};

SimilarListings.propTypes = {
  listings: arrayOf(listingPropType).isRequired,
  onListingClick: func,
  getEvent: func,
  listingStyle: object,
  canFavourite: bool,
};

SimilarListings.defaultProps = {
  onListingClick: () => {},
  getEvent: () => {},
  canFavourite: false,
};


export default SimilarListings;
