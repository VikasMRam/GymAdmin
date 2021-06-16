import { COMMUNITY_ENTITY_TYPE } from "sly/web/constants/entityTypes";
import { USER_SAVE_DELETE_STATUS } from "sly/web/constants/userSave";

export function getCommunityUserSave(community, userSaves) {
  return (
    userSaves &&
    userSaves.find(
      ({ entityType, entitySlug }) =>
        entityType === COMMUNITY_ENTITY_TYPE && entitySlug === community.id,
    )
  );
}


export function isCommunityAlreadySaved(community, userSaves) {
  const userSaveOfCommunity = getCommunityUserSave(community, userSaves);
  return (
    userSaveOfCommunity &&
    userSaveOfCommunity.status !== USER_SAVE_DELETE_STATUS
  );
}
