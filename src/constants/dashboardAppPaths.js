export const DASHBOARD_PATH = '/dashboard';

const FAMILY_DASHBOARD_PATH = `${DASHBOARD_PATH}/family`;
const AGENT_DASHBOARD_PATH = `${DASHBOARD_PATH}/agent`;

export const PROSPECTING = 'prospecting';
export const CONNECTED = 'connected';
export const CLOSED = 'closed';
const familyTypes = [
  PROSPECTING,
  CONNECTED,
  CLOSED,
];
export const FAMILY_DASHBOARD_FAVORITES_PATH = `${FAMILY_DASHBOARD_PATH}/favorites`;
export const FAMILY_DASHBOARD_PROFILE_PATH = `${FAMILY_DASHBOARD_PATH}/my-profile`;
export const AGENT_DASHBOARD_FAMILIES_PATH = `${AGENT_DASHBOARD_PATH}/my-families/:clientType(${familyTypes.join('|')})?`;
export const AGENT_DASHBOARD_FAMILIES_DETAILS_PATH = `${AGENT_DASHBOARD_PATH}/my-families/:id/:tab?`;
export const AGENT_DASHBOARD_TASKS_PATH = `${AGENT_DASHBOARD_PATH}/tasks`;
export const FAMILY_DASHBOARD_MESSAGES_PATH = `${FAMILY_DASHBOARD_PATH}/messages`;
export const AGENT_DASHBOARD_MESSAGES_PATH = `${AGENT_DASHBOARD_PATH}/messages`;
export const AGENT_DASHBOARD_MESSAGE_DETAILS_PATH = `${AGENT_DASHBOARD_PATH}/messages/:id`;
export const FAMILY_DASHBOARD_MESSAGE_DETAILS_PATH = `${FAMILY_DASHBOARD_PATH}/messages/:id`;

export const SUMMARY = 'summary';
export const ACTIVITY = 'activity';
export const FAMILY_DETAILS = 'family-details';
export const COMMUNITIES = 'communities';
export const PARTNER_AGENTS = 'partner-agents';
export const TASKS = 'tasks';
export const MESSAGES = 'messages';

export const ADMIN_DASHBOARD_CALLS_PATH = `${AGENT_DASHBOARD_PATH}/calls`;
export const ADMIN_DASHBOARD_CALL_DETAILS_PATH = `${ADMIN_DASHBOARD_CALLS_PATH}/:id/:tab?`;

