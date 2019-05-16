export const DASHBOARD_PATH = '/dashboard';

const FAMILY_DASHBOARD_PATH = `${DASHBOARD_PATH}/family`;
const AGENT_DASHBOARD_PATH = `${DASHBOARD_PATH}/agent`;
const ADMIN_DASHBOARD_PATH = `${DASHBOARD_PATH}/admin`;

export const FAMILY_DASHBOARD_FAVORITES_PATH = `${FAMILY_DASHBOARD_PATH}/favorites`;
export const FAMILY_DASHBOARD_PROFILE_PATH = `${FAMILY_DASHBOARD_PATH}/my-profile`;
export const FAMILY_DASHBOARD_FAMILIES_PATH = `${AGENT_DASHBOARD_PATH}/my-families`;
export const FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH = `${AGENT_DASHBOARD_PATH}/my-families/:id/:tab?`;

export const SUMMARY = 'summary';
export const ACTIVITY = 'activity';
export const FAMILY_DETAILS = 'family-details';
export const COMMUNITIES = 'communities';

export const ADMIN_DASHBOARD_CALLS_PATH = `${ADMIN_DASHBOARD_PATH}/calls`;
export const ADMIN_DASHBOARD_CALLS_DETAILS_PATH = `${ADMIN_DASHBOARD_CALLS_PATH}/:id`;
