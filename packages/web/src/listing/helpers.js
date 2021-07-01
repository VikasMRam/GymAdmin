import { LISTING_ENTITY_TYPE } from 'sly/web/constants/entityTypes';
import { USER_SAVE_DELETE_STATUS } from 'sly/web/constants/userSave';

export function getListingUserSave(listing, userSaves) {
  return (
    userSaves &&
    userSaves.find(
      ({ entityType, entitySlug }) =>
        entityType === LISTING_ENTITY_TYPE && entitySlug === listing.id,
    )
  );
}


export function isListingAlreadySaved(listing, userSaves) {
  const userSaveOfListing = getListingUserSave(listing, userSaves);
  return (
    userSaveOfListing &&
    userSaveOfListing.status !== USER_SAVE_DELETE_STATUS
  );
}
