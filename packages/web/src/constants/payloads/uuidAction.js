import { UUIDACTION_RESOURCE_TYPE } from 'sly/constants/resourceTypes';

export const newUuidAction = {
  data: {
    id: null,
    type: UUIDACTION_RESOURCE_TYPE,
    attributes: {
      actionType: '',
      actionPage: '',
      actionInfo: {
        slug: '',
        entityType: '',
      },
    },
  },
};
