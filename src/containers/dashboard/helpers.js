import { CONTACT_RESOURCE_TYPE, SLY_ENTITY_RESOURCE_TYPE } from 'sly/constants/resourceTypes';

export function saveContactPayload({ name, email, mobilePhone, entity }) {
  const payload = {
    type: CONTACT_RESOURCE_TYPE,
    id: null,
    attributes: {
      email,
      name,
      mobilePhone,
    },
    relationships: {
      entities: {
        data: [{ type: SLY_ENTITY_RESOURCE_TYPE, id: entity.id, attributes: { entityType: entity.type } }],
      },
    },
  };

  return payload;
}
