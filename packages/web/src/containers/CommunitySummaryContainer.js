import React, { useCallback, useState } from 'react';
import { bool, string } from 'prop-types';
import { useParams } from 'react-router-dom';

import SlyEvent from 'sly/web/services/helpers/events';
import CommunitySummary from 'sly/web/components/organisms/CommunitySummary';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import { useQuery, useAuth } from 'sly/web/services/api';
import { useNotification } from 'sly/web/components/helpers/notification';
import { withHydration } from 'sly/web/services/partialHydration';
import {
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_FAILED,
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_SUCCESS,
} from 'sly/web/constants/notifications';
import { USER_SAVE_DELETE_STATUS } from 'sly/web/constants/userSave';
import { COMMUNITY_ENTITY_TYPE } from 'sly/web/constants/entityTypes';
import Modal, { ModalBody } from 'sly/web/components/atoms/NewModal';
import { isCommunityAlreadySaved, getCommunityUserSave } from 'sly/web/profile/helpers';


const ShareCommunityFormContainer = withHydration(/* #__LOADABLE__ */() => import(/* webpackChunkName: "chunkShareCommunityFormContainer" */'sly/web/containers/ShareCommunityFormContainer'));
const SaveCommunityContainer = withHydration(/* #__LOADABLE__ */() => import(/* webpackChunkName: "chunkSaveCommunityContainer" */'sly/web/containers/SaveCommunityContainer'));


const CommunitySummaryContainer = ({ isAdmin, className, ...props }) => {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState('');
  const { notifyError, notifyInfo } = useNotification();
  const { user, ensureAuthenticated } = useAuth();

  const updateOldUserSave = useQuery('updateOldUserSave');

  const { requestInfo: { normalized: community } } = usePrefetch('getCommunity', {
    id: params.communitySlug,
    include: 'similar-communities,questions,agents',
  });

  const { requestInfo: { normalized: userSaves }, fetch: refetchUserSaves } = usePrefetch('getUserSaves', {
    'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
    'filter[entity_slug]': community?.id,
  });


  const sendEvent = useCallback((action, category) =>
    SlyEvent.getInstance().sendEvent({
      action,
      category,
      label: community.id,
    }), []);

  const conciergeNumberClicked = useCallback(() => sendEvent('click', 'conciergeNumberClicked'), []);

  const communityNumberClicked = useCallback(() => sendEvent('click', 'communityNumberClicked'), []);

  const goToReviews = useCallback(() => sendEvent('click', 'viewReviews'), []);


  const authenticatedUpdateUserSave = (id, data) => {
    return ensureAuthenticated(
      'Sign up to add to your favorites list',
      () => updateOldUserSave({ id }, data),
    );
  };


  const handleFavouriteClick = () => {
    if (isCommunityAlreadySaved(community, userSaves)) {
      const userSaveToUpdate = getCommunityUserSave(community, userSaves);
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
      ensureAuthenticated().then(() => {
        setIsModalOpen('save');
      });
      sendEvent('click', 'saveCommunity');
    }
  };


  const handleShareClick = () => {
    setIsModalOpen('share');
    sendEvent('click', 'shareCommunity');
  };

  const setModalClosed = () => {
    sendEvent('close-modal', `${isModalOpen}Community`);
    setIsModalOpen('');
  };

  if (!community) return null;

  return (
    <>
      <CommunitySummary
        community={community}
        isAdmin={isAdmin}
        onConciergeNumberClicked={conciergeNumberClicked}
        onCommunityNumberClicked={communityNumberClicked}
        goToReviews={goToReviews}
        className={className}
        searchParams={params}
        isFavorited={isCommunityAlreadySaved(community, userSaves)}
        onSaveClick={handleFavouriteClick}
        onShareClick={handleShareClick}
        {...props}
      />
      {isModalOpen &&
        <Modal onClose={setModalClosed}>
          <ModalBody>
            {isModalOpen === 'save' && <SaveCommunityContainer
              slug={community?.id}
              notifyInfo={notifyInfo}
              notifyError={notifyError}
              onCancelClick={setModalClosed}
              onDoneButtonClick={setModalClosed}
            />}
            {
              isModalOpen === 'share' &&
                <ShareCommunityFormContainer
                  notifyInfo={notifyInfo}
                  fromEnabled={!user || !user.email}
                  mainImage={community.mainImage}
                  communitySlug={community.id}
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

CommunitySummaryContainer.propTypes = {
  isAdmin: bool,
  className: string,
};

CommunitySummaryContainer.typeHydrationId = 'CommunitySummaryContainer';

export default CommunitySummaryContainer;
