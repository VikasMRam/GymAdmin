export const DASHBOARD_PATH = '/dashboard';

const FAMILY_DASHBOARD_PATH = `${DASHBOARD_PATH}/family`;
const AGENT_DASHBOARD_PATH = `${DASHBOARD_PATH}/agent`;

export const NEWFAMILIES = 'new';
export const PROSPECTING = 'prospecting';
export const CONNECTED = 'connected';
export const CLOSED = 'closed';
export const WON = 'won';
const familyTypes = [
  NEWFAMILIES,
  PROSPECTING,
  CONNECTED,
  CLOSED,
  WON,
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

export const DASHBOARD_ACCOUNT_PATH = `${DASHBOARD_PATH}/my-account`;
export const FAMILY_DASHBOARD_FAVORITES_PATH = `${FAMILY_DASHBOARD_PATH}/favorites`;
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
export const AGENT_DASHBOARD_PROFILE_PATH = `${AGENT_DASHBOARD_PATH}/my-profile`;


export const DASHBOARD_COMMUNITIES_PATH = `${DASHBOARD_PATH}/communities`;
export const DASHBOARD_COMMUNITIES_DETAIL_PATH = `${DASHBOARD_PATH}/communities/:id/:tab?`;
export const DASHBOARD_COMMUNITIES_DETAIL_EDIT_PATH = `${DASHBOARD_PATH}/communities/:id/edits/:editId`;

export const SUMMARY = 'summary';
export const ACTIVITY = 'activity';
export const FAMILY_DETAILS = 'family-details';
export const COMMUNITIES = 'communities';
export const PARTNER_AGENTS = 'partner-agents';
export const TASKS = 'tasks';
export const MESSAGES = 'messages';
export const EMAILS = 'emails';
export const PROFILE = 'profile';
export const PRICING = 'pricing';
export const LISTINGS = 'listings';
export const PHOTOS = 'photos';
export const SERVICES = 'services';
export const CLIENTS = 'clients';
export const AGENT_DETAILS = 'agent-details';
export const CONTACTS = 'contacts';
export const EDITS = 'edits';
export const ADMIN = 'admin';

export const ADMIN_DASHBOARD_CALLS_PATH = `${AGENT_DASHBOARD_PATH}/calls`;
export const ADMIN_DASHBOARD_CALL_DETAILS_PATH = `${ADMIN_DASHBOARD_CALLS_PATH}/:id/:tab?`;
export const ADMIN_DASHBOARD_AGENTS_PATH = `${AGENT_DASHBOARD_PATH}/agents`;
export const ADMIN_DASHBOARD_AGENT_DETAILS_PATH = `${ADMIN_DASHBOARD_AGENTS_PATH}/:id/:tab?`;

