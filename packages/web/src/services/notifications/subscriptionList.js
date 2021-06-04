import { NOTIFY_MESSAGE_NEW } from 'sly/web/constants/notifications';
import { AGENT_ND_ROLE, CUSTOMER_ROLE } from 'sly/common/constants/roles';
import { AGENT_DASHBOARD_MESSAGES_PATH, FAMILY_DASHBOARD_MESSAGES_PATH } from 'sly/web/dashboard/dashboardAppPaths';

const getNewMessageLink = (roleId, conversationId) => {
  switch (roleId) {
    case AGENT_ND_ROLE: return `${AGENT_DASHBOARD_MESSAGES_PATH}/${conversationId}`;
    case CUSTOMER_ROLE: return `${FAMILY_DASHBOARD_MESSAGES_PATH}/${conversationId}`;
    default: return '/';
  }
};

export default {
  [NOTIFY_MESSAGE_NEW]: ({ message, user }) => getNewMessageLink(user.roleID, message.payload.conversationId),
};
