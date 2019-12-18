import { Fragment } from 'react';

import redirectTo from './redirectTo';

const history = { push: jest.fn(), replace: jest.fn() };
const routes = [{ path: '/known/path', component: Fragment }];

describe('Given the redirectTo function', () => {
  beforeEach(() => {
    window.location.replace = jest.fn();
    window.location.assign = jest.fn();
    history.push.mockReset();
    history.replace.mockReset();
  });

  describe('when redirectTo is called and the path does not match any route', () => {
    it('should force hard page navigation using the window.location.assign()', () => {
      redirectTo(routes, history)('/unrecognized/path');

      expect(window.location.assign).toHaveBeenCalledWith('/unrecognized/path');
      expect(history.push).not.toHaveBeenCalled();
    });
  });

  describe('when redirectTo is called and the path matches a route', () => {
    it('should do soft navigation using history.push', () => {
      redirectTo(routes, history)(routes[0].path);

      expect(window.location.assign).not.toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledWith(routes[0].path);
    });
  });

  describe('when redirectTo is called with the replace flag set to true and the path does not match any route', () => {
    it('should force hard page navigation using the window.location.replace()', () => {
      redirectTo(routes, history)('/unrecognized/path', true);

      expect(window.location.replace).toHaveBeenCalledWith('/unrecognized/path');
      expect(history.replace).not.toHaveBeenCalled();
    });
  });

  describe('when redirectTo is called and the path matches a route', () => {
    it('should do soft navigation using history.replace', () => {
      redirectTo(routes, history)(routes[0].path, true);

      expect(window.location.replace).not.toHaveBeenCalled();
      expect(history.replace).toHaveBeenCalledWith(routes[0].path);
    });
  });
});
