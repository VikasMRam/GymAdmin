import React from 'react';
import { mount } from 'enzyme';
import { Route, Router } from 'react-router';
import { createMemoryHistory } from 'history';

import PageEventsContainer from './PageEventsContainer';

import SlyEvent from 'sly/services/helpers/events';
import config from 'sly/config';


jest.mock('sly/services/helpers/events');
jest.mock('sly/config');
jest.mock('react-helmet', () => ({ children }) => <div className="helmet">{children}</div>);

const mockEvents = {
  sendPageView: jest.fn(),
  sendEvent: jest.fn(),
};
SlyEvent.getInstance.mockReturnValue(mockEvents);
config.host = 'http://seniorly-unit-test.com';

function mountComponent(url) {
  const history = createMemoryHistory({ initialEntries: [url] });

  jest.spyOn(history, 'replace');

  const wrapper = mount(
    <Router history={history}>
      <Route path="*" render={() => <PageEventsContainer />} />
    </Router>,
  );

  return { wrapper, history };
}

describe('Given the PageEventsContainer', () => {
  beforeEach(() => {
    mockEvents.sendPageView.mockReset();
    mockEvents.sendEvent.mockReset();
  });


  describe('when mounted without an event in the query', () => {
    it('should send a page view event only and not do any redirecting', () => {
      const { history } = mountComponent('/home?query=true');

      expect(mockEvents.sendPageView).toHaveBeenCalledWith('/home', '?query=true');

      expect(mockEvents.sendEvent).not.toHaveBeenCalled();
      expect(history.replace).not.toHaveBeenCalled();
    });
  });

  describe('when the location is updated without an event in the url', () => {
    it('should send a page view event only and not do any redirecting', () => {
      const { history } = mountComponent('/home?query=true');

      history.push('/search?new-page=true');

      expect(mockEvents.sendPageView).toHaveBeenCalledWith('/home', '?query=true');
      expect(mockEvents.sendPageView).toHaveBeenCalledWith('/search', '?new-page=true');

      expect(mockEvents.sendEvent).not.toHaveBeenCalled();
      expect(history.replace).not.toHaveBeenCalled();
    });
  });

  describe('when mounted with a sly event in the query params', () => {
    it('should publish the event and remove it from the query parameter before publishing a page view event', () => {
      const { history } = mountComponent('/home?query=true&sly_action=clicky&sly_category=McClick');

      expect(mockEvents.sendEvent).toHaveBeenCalledWith({ action: 'clicky', category: 'McClick' });
      expect(history.replace).toHaveBeenCalledWith('/home?query=true');

      expect(mockEvents.sendPageView).toHaveBeenCalledWith('/home', '?query=true');
    });
  });

  describe('when updated to a new url which contains a sly event', () => {
    it('should publish the event and remove it from the query parameter before publishing a page view event', () => {
      const { history } = mountComponent('/');

      history.push('/search?query=foo_bar_jones&sly_action=searched&sly_category=quickly&page=1');

      expect(mockEvents.sendEvent).toHaveBeenCalledWith({ action: 'searched', category: 'quickly' });
      expect(history.replace).toHaveBeenCalledWith('/search?query=foo_bar_jones&page=1');

      expect(mockEvents.sendPageView).toHaveBeenCalledWith('/search', '?query=foo_bar_jones&page=1');
    });
  });
});
