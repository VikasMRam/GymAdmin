import React from 'react';
import { shallow } from 'enzyme';
import WS from 'jest-websocket-mock';
import WSContext from 'sly/services/ws/WSContext';

const wait = time => new Promise(resolve => setTimeout(resolve, time));

describe('WSProvider', () => {
  let server;
  let WSProvider;

  beforeEach(() => {
    jest.resetModules();
    WSProvider = require('./WSProvider').default;
    server = new WS('ws://localhost/v0/platform/notifications');
  });

  afterEach(() => {
    WS.clean();
  });

  it('should connect on mount (only once)', async () => {
    shallow(<WSProvider><div>children</div></WSProvider>);
    await server.connected;
    expect(() => server.error()).toThrow();
    expect(() => shallow(<WSProvider><div>children</div></WSProvider>)).toThrow('already instantiated');
  });

  it('should throw on blank message type', async () => {
    const handler = jest.fn();
    const provider = shallow(<WSProvider> <div>children</div> </WSProvider>).instance();
    provider.pubsub.on('message', handler);
    await server.connected;
    expect(() => server.send('faulty')).toThrow('can\'t parse JSON');
    expect(() => server.send('{"message":"hello"}')).toThrow('message with no type');
  });

  it('should receive message to which we subscribe', async () => {
    const handler = jest.fn();
    const provider = shallow(<WSProvider><div>children</div></WSProvider>).instance();
    provider.pubsub.on('message', handler);
    await server.connected;

    const message = { type: 'message', message: 'foo' };
    const messageTxt = JSON.stringify(message);
    await server.send(messageTxt);
    expect(handler).toHaveBeenCalledWith(message);
  });

  it('should reconnect on disconnection', async () => {
    WSProvider.prototype.setup = jest.fn(WSProvider.prototype.setup);
    const provider = shallow(<WSProvider><div>children</div></WSProvider>).instance();

    await server.connected;
    await server.close({ wasClean: true });
    await wait(1);

    expect(provider.setup).toHaveBeenCalledTimes(3);
  });
});
