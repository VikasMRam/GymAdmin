import React from 'react';
import { shallow } from 'enzyme';

import subscriptionList from 'sly/web/services/notifications/subscriptionList';
import Subscriptions from 'sly/web/services/notifications/Subscriptions';

const wrap = (props = {}) => shallow((
  <Subscriptions.WrappedComponent {...props}>
    <div>children</div>
  </Subscriptions.WrappedComponent>
));

describe('Subscriptions', () => {
  let notifyInfo;
  let ws;

  beforeEach(() => {
    const close = jest.fn();
    global.Notification = jest.fn();
    global.Notification.prototype.close = close;
    global.Notification.requestPermission = jest.fn(fn => fn('granted'));

    Object.entries(subscriptionList).forEach(([key, func]) => {
      subscriptionList[key] = jest.fn(func);
    });

    notifyInfo = jest.fn();

    ws = {
      pubsub: {
        on: jest.fn(),
        off: jest.fn(),
      },
    };
  });

  it('should subscribe for each subscriptionList elem', () => {
    const wrapper = wrap({ notifyInfo, ws });
    const { onMessage } = wrapper.instance();

    Object.keys(subscriptionList).forEach((key) => {
      expect(ws.pubsub.on).toHaveBeenCalledWith(key, onMessage);
    });

    wrapper.unmount();

    Object.keys(subscriptionList).forEach((key) => {
      expect(ws.pubsub.off).toHaveBeenCalledWith(key, onMessage);
    });
  });

  it('should notify with in-page', async () => {
    const makeLink = jest.fn(() => 'test-link');
    subscriptionList.TEST_MESSAGE = makeLink;

    const notificationMessage = 'not mess';
    const message = { type: 'TEST_MESSAGE', payload: { notificationMessage } };

    const instance = wrap({ ws, notifyInfo, extraProp: 'extraProp' }).instance();
    await instance.onMessage(message);

    expect(makeLink).toHaveBeenCalledWith({
      message,
      ...instance.props,
    });

    expect(notifyInfo).toHaveBeenCalled();
    const link = shallow(notifyInfo.mock.calls[0][0]);
    expect(link.prop('to')).toEqual('test-link');
    expect(link.contains(notificationMessage)).toBeTruthy();
  });

  it('should notify with in-page when it is logged in but not granted', async () => {
    global.Notification.requestPermission = jest.fn(fn => fn('default'));
    const makeLink = jest.fn(() => 'test-link');
    subscriptionList.TEST_MESSAGE = makeLink;

    const notificationMessage = 'not mess';
    const message = { type: 'TEST_MESSAGE', payload: { notificationMessage } };

    const instance = wrap({ ws, notifyInfo, extraProp: 'extraProp', user: {} }).instance();
    await instance.onMessage(message);

    expect(makeLink).toHaveBeenCalledWith({
      message,
      ...instance.props,
    });

    expect(notifyInfo).toHaveBeenCalled();
    const link = shallow(notifyInfo.mock.calls[0][0]);
    expect(link.prop('to')).toEqual('test-link');
    expect(link.contains(notificationMessage)).toBeTruthy();
  });

  it('should notify with notification', async () => {
    const makeLink = jest.fn(() => 'test-link');
    subscriptionList.TEST_MESSAGE = makeLink;

    const notificationMessage = 'not mess';
    const message = { type: 'TEST_MESSAGE', payload: { notificationMessage } };

    const user = {};
    const instance = wrap({ ws, notifyInfo, extraProp: 'extraProp', user }).instance();
    await instance.onMessage(message);

    expect(makeLink).toHaveBeenCalledWith({
      message,
      ...instance.props,
    });

    expect(notifyInfo).not.toHaveBeenCalled();
    expect(Notification).toHaveBeenCalledWith('Seniorly', {
      badge: '/logomark-2x.png',
      body: 'not mess',
      icon: '/logomark-4x.png',
    });
  });
});
