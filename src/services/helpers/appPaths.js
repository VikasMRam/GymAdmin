import { generatePath } from 'react-router';

import { AGENT_DASHBOARD_FAMILIES_DETAILS_PATH } from 'sly/constants/dashboardAppPaths';

export const getAppPathForEntity = (entity) => {
  const { entityType, id: entityId } = entity;
  switch (entityType) {
    case 'Client':
      return generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, {
        id: entityId,
      });
    default:
      return '';
  }
};

// FIXME: move to right helper
export const stripPageNumber = (qs) => {
  return qs.replace(/&page-number=\d+/,  '');
};
