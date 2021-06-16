import React, { useCallback, useEffect, useState, useRef } from 'react';
import { arrayOf, func, object, bool } from 'prop-types';

import { community as communityPropType } from 'sly/common/propTypes/community';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';
import { Block, Link } from "sly/common/system";
import { useAuth, usePrefetch, useQuery } from "sly/web/services/api";
import { COMMUNITY_ENTITY_TYPE } from "sly/web/constants/entityTypes";
import { getCommunityUserSave, isCommunityAlreadySaved } from "sly/web/profile/helpers";
import { USER_SAVE_DELETE_STATUS } from "sly/web/constants/userSave";
import {
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_FAILED,
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_SUCCESS
} from "sly/web/constants/notifications";
import SlyEvent from "sly/web/services/helpers/events";
import { useNotification } from "sly/web/components/helpers/notification";
import Modal, { ModalBody } from "sly/web/components/atoms/NewModal";
import { withHydration } from "sly/web/services/partialHydration";

const SaveCommunityContainer = withHydration(/* #__LOADABLE__ */() => import(/* webpackChunkName: "chunkSaveCommunityContainer" */'sly/web/containers/SaveCommunityContainer'));

const CommunityTileContainer = ({
  community,
  layout,
  getEvent,
  canFavourite,
  index,
  onCommunityClick,
}) => {
  const [activeCommunityIndex, setActiveCommunityIndex] = useState(null);

  const { notifyError, notifyInfo } = useNotification();

  const { requestInfo: { normalized: communityInfo } } = usePrefetch('getCommunity', {
    id: community.id,
    include: 'similar-communities,questions,agents',
  });

  const { requestInfo: { normalized: userSaves }, fetch: refetchUserSaves } = usePrefetch('getUserSaves', {
    'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
    'filter[entity_slug]': community.id,
  });

  const sendEvent = useCallback((action, category) =>
    SlyEvent.getInstance().sendEvent({
      action,
      category,
      label: community.id,
    }), [community]);

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
    if (isCommunityAlreadySaved(communityInfo, userSaves)) {
      const userSaveToUpdate = getCommunityUserSave(communityInfo, userSaves);
      authenticatedUpdateUserSave(userSaveToUpdate.id, {
        status: USER_SAVE_DELETE_STATUS,
      })
        .then(refetchUserSaves)
        .then(() => notifyInfo(NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_SUCCESS))
        .catch(() =>
          notifyError(NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_FAILED),
        );

      sendEvent('click', 'unsaveCommunity');
    } else {
      ensureAuthenticated().then(() => setActiveCommunityIndex(index));
      sendEvent('click', 'saveCommunity');
    }
  }, [communityInfo, userSaves]);

  const onModalClose = useCallback(() => {
    setActiveCommunityIndex(null);
    refetchUserSaves();
  }, []);

  if (!communityInfo) return null;

  return (
    <>
      <Link
        key={community.id}
        to={community.url}
        onClick={onCommunityClick}
        event={getEvent(community, index)}
        sx={{
          '&:hover': {
            textDecoration: 'none',
          }
        }}
      >
        <CommunityTile
          community={communityInfo}
          layout={layout}
          event={getEvent(communityInfo, index)}
          sx={{
            span: { font: 'body-m' },
            h3: { mb: 's' },
            height: '100%',
            '& > div > div:last-child': {  p: 'l' },
          }}
          canFavourite={canFavourite}
          onUnfavouriteClick={handleFavouriteClick}
          onFavouriteClick={handleFavouriteClick}
          isFavourite={isCommunityAlreadySaved(communityInfo, userSaves)}
        />
      </Link>
      <Modal onClose={onModalClose} isOpen={typeof activeCommunityIndex === 'number'}>
        <ModalBody>
          <SaveCommunityContainer
            slug={typeof activeCommunityIndex === 'number' && communityInfo.id}
            notifyInfo={notifyInfo}
            notifyError={notifyError}
            onCancelClick={onModalClose}
            onDoneButtonClick={onModalClose}
          />
        </ModalBody>
      </Modal>
    </>
  )
};

const SimilarCommunities = ({ communities, onCommunityClick, communityStyle, getEvent, canFavourite }) => {
  const { layout = 'column' } = communityStyle;

  return (
    <>
      {communities.map((community, index) => canFavourite
        ? (
          <CommunityTileContainer
            key={community.id}
            onCommunityClick={onCommunityClick}
            layout={layout}
            canFavourite={canFavourite}
            community={community}
            getEvent={getEvent}
            index={index}
          />
        )
        : (
          <Link
            key={community.id}
            to={community.url}
            onClick={onCommunityClick}
            event={getEvent(community, index)}
            sx={{
              '&:hover': {
                textDecoration: 'none',
              }
            }}
          >
            <CommunityTile community={community} layout={layout} event={getEvent(community, index)} />
          </Link>
        ))}
      {communities?.length > 1 && <Block />}
    </>
  )
};

SimilarCommunities.propTypes = {
  communities: arrayOf(communityPropType).isRequired,
  onCommunityClick: func,
  getEvent: func,
  communityStyle: object,
  canFavourite: bool,
};

SimilarCommunities.defaultProps = {
  onCommunityClick: () => {},
  getEvent: () => {},
  canFavourite: false,
};


export default SimilarCommunities;
