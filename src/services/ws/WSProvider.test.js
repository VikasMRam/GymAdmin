import React from 'react';
import { shallow } from 'enzyme';
import WS from 'jest-websocket-mock';

const user = {};

describe('WSProvider', () => {
  let server;
  let WSProvider;

  const wrap = (props = {}) => shallow(<WSProvider {...props}><div>children</div></WSProvider>);

  beforeEach(() => {
    console.debug = jest.fn();
    jest.resetModules();
    WSProvider = require('./WSProvider').default.WrappedComponent;
    server = new WS('ws://localhost/v0/platform/notifications');
  });

  afterEach(() => {
    WS.clean();
  });

  it('should not connect when there is not user', async () => {
    const proto = WebSocket.prototype;
    global.WebSocket = jest.fn(WebSocket);
    WebSocket.prototype = proto;
    shallow(<WSProvider user={null}><div>children</div></WSProvider>);
    expect(WebSocket).not.toHaveBeenCalled();
    shallow(<WSProvider user={{}}><div>children</div></WSProvider>);
    expect(WebSocket).toHaveBeenCalled();
  });

  it('should be able to throw', async () => {
    wrap();
    await server.connected;
    expect(() => server.error()).toThrow();
  });

  it('should connect on mount (only once)', async () => {
    wrap({ user });
    await server.connected;
    expect(() => wrap({ user })).toThrow('already instantiated');
  });

  it('should throw on blank message type', async () => {
    const handler = jest.fn();
    const provider = wrap({ user }).instance();
    provider.pubsub.on('message', handler);
    await server.connected;
    expect(() => server.send('faulty')).toThrow('can\'t parse JSON');
    expect(() => server.send('{"message":"hello"}')).toThrow('message with no type');
  });

  it('should receive message to which we subscribe', async () => {
    const handler = jest.fn();
    const provider = wrap({ user }).instance();
    provider.pubsub.on('message', handler);
    await server.connected;

    const message = { message: { type: 'message', message: 'foo' } };
    const messageTxt = JSON.stringify(message);
    await server.send(messageTxt);
    expect(handler).toHaveBeenCalledWith(message.message);
  });

  it('should reconnect on disconnection', () => {
    jest.useFakeTimers();
    WSProvider.prototype.setup = jest.fn(WSProvider.prototype.setup);
    const provider = wrap({ user }).instance();
    jest.advanceTimersByTime(1);

    expect(() => {
      server.close();
      jest.advanceTimersByTime(1);
    }).toThrow();

    expect(provider.setup).toHaveBeenCalledTimes(3);
  });
});
