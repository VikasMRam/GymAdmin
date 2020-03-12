export const DASHBOARD_PATH = '/dashboard';

const FAMILY_DASHBOARD_PATH = `${DASHBOARD_PATH}/family`;
const AGENT_DASHBOARD_PATH = `${DASHBOARD_PATH}/agent`;

export const NEWFAMILIES = 'new';
export const PROSPECTING = 'prospecting';
export const CONNECTED = 'connected';
export const CLOSED = 'closed';
const familyTypes = [
  NEWFAMILIES,
  PROSPECTING,
  CONNECTED,
  CLOSED,

];

export const OVERDUE = 'overdue';
export const UPCOMING = 'upcoming';
export const TODAY = 'today';
export const COMPLETED = 'completed';
const taskTypes = [
  TODAY,
  OVERDUE,
  UPCOMING,
  COMPLETED,
];

export const FAMILY_DASHBOARD_FAVORITES_PATH = `${FAMILY_DASHBOARD_PATH}/favorites`;
export const FAMILY_DASHBOARD_ACCOUNT_PATH = `${FAMILY_DASHBOARD_PATH}/my-account`;
export const AGENT_DASHBOARD_FAMILIES_PATH = `${AGENT_DASHBOARD_PATH}/my-families/:clientType(${familyTypes.join('|')})?`;
export const AGENT_DASHBOARD_FAMILIES_DETAILS_PATH = `${AGENT_DASHBOARD_PATH}/my-families/:id/:tab?`;
export const AGENT_DASHBOARD_TASKS_BASE_PATH = `${AGENT_DASHBOARD_PATH}/tasks`;
export const AGENT_DASHBOARD_TASKS_PATH = `${AGENT_DASHBOARD_TASKS_BASE_PATH}/:taskType(${taskTypes.join('|')})?`;
export const AGENT_DASHBOARD_CONTACTS_PATH = `${AGENT_DASHBOARD_PATH}/my-contacts`;
export const AGENT_DASHBOARD_CONTEXT_TASKS_PATH = `:contextPath/:taskType(${taskTypes.join('|')})?`;
export const FAMILY_DASHBOARD_MESSAGES_PATH = `${FAMILY_DASHBOARD_PATH}/messages`;
export const AGENT_DASHBOARD_MESSAGES_PATH = `${AGENT_DASHBOARD_PATH}/messages`;
export const AGENT_DASHBOARD_MESSAGE_DETAILS_PATH = `${AGENT_DASHBOARD_PATH}/messages/:id`;
export const FAMILY_DASHBOARD_MESSAGE_DETAILS_PATH = `${FAMILY_DASHBOARD_PATH}/messages/:id`;
export const AGENT_DASHBOARD_ACCOUNT_PATH = `${AGENT_DASHBOARD_PATH}/my-account`;
export const AGENT_DASHBOARD_PROFILE_PATH = `${AGENT_DASHBOARD_PATH}/my-profile`;

export const SUMMARY = 'summary';
export const ACTIVITY = 'activity';
export const FAMILY_DETAILS = 'family-details';
export const COMMUNITIES = 'communities';
export const PARTNER_AGENTS = 'partner-agents';
export const TASKS = 'tasks';
export const MESSAGES = 'messages';
export const AGENT_DETAILS = 'agent-details';
export const CONTACTS = 'contacts';

export const ADMIN_DASHBOARD_CALLS_PATH = `${AGENT_DASHBOARD_PATH}/calls`;
export const ADMIN_DASHBOARD_CALL_DETAILS_PATH = `${ADMIN_DASHBOARD_CALLS_PATH}/:id/:tab?`;
export const ADMIN_DASHBOARD_AGENTS_PATH = `${AGENT_DASHBOARD_PATH}/agents`;
export const ADMIN_DASHBOARD_AGENT_DETAILS_PATH = `${ADMIN_DASHBOARD_AGENTS_PATH}/:id/:tab?`;
