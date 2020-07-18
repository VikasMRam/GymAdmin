import list from 'sly/web/services/notifications/subscriptionList';
import { NOTIFY_MESSAGE_NEW } from 'sly/web/constants/notifications';
import { AGENT_ND_ROLE, CUSTOMER_ROLE } from 'sly/common/constants/roles';

describe('subscriptionList', () => {
  it('should have all handlers', () => {
    expect(Object.keys(list)).toEqual([
      NOTIFY_MESSAGE_NEW,
    ]);
  });

  it('should generate new message Link', () => {
    const makeLink = list[NOTIFY_MESSAGE_NEW];
    expect(makeLink({
      user: { roleID: AGENT_ND_ROLE },
      message: { payload: { conversationId: 'myconvId' } },
    })).toEqual('/dashboard/agent/messages/myconvId');
    expect(makeLink({
      user: { roleID: CUSTOMER_ROLE },
      message: { payload: { conversationId: 'custconvId' } },
    })).toEqual('/dashboard/family/messages/custconvId');
  });
});
