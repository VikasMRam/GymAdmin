import React from 'react';
import { shallow } from 'enzyme';

import subscriptionList from 'sly/services/notifications/subscriptionList';
import Subscriptions from 'sly/services/notifications/Subscriptions';

const wrap = (props = {}) => shallow((
  <Subscriptions.WrappedComponent {...props}>
    <div>children</div>
  </Subscriptions.WrappedComponent>
));

describe('Subscriptions', () => {
  let notifyInfo;
  let ws;

  beforeEach(() => {
    Object.entries(subscriptionList).forEach(([key, func]) => {
      subscriptionList[key] = jest.fn(func);
    });

    notifyInfo = jest.fn();

    ws = {
      on: jest.fn(),
      off: jest.fn(),
    };
  });

  it('should subscribe for each subscriptionList elem', () => {
    const wrapper = wrap({ notifyInfo, ws });
    const { onMessage } = wrapper.instance();

    Object.keys(subscriptionList).forEach((key) => {
      expect(ws.on).toHaveBeenCalledWith(key, onMessage);
    });

    wrapper.unmount();

    Object.keys(subscriptionList).forEach((key) => {
      expect(ws.off).toHaveBeenCalledWith(key, onMessage);
    });
  });

  it('should notify', () => {
    const makeLink = jest.fn(() => 'test-link');
    subscriptionList['TEST_MESSAGE'] = makeLink;

    const notificationMessage = 'not mess';
    const message = { type: 'TEST_MESSAGE', payload: { notificationMessage } };

    const instance = wrap({ ws, notifyInfo, extraProp: 'extraProp' }).instance();
    instance.onMessage(message);

    expect(makeLink).toHaveBeenCalledWith({
      message,
      ...instance.props,
    });

    expect(notifyInfo).toHaveBeenCalled();
    const link = shallow(notifyInfo.mock.calls[0][0]);
    expect(link.prop('to')).toEqual('test-link');
    expect(link.contains(notificationMessage)).toBeTruthy();
  });
});
