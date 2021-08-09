import React from 'react';
import { mount } from 'enzyme';
import { Route, Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';

import PageEventsContainer from './PageEventsContainer';

import SlyEvent from 'sly/web/services/helpers/events';
import config from 'sly/web/config';

jest.mock('sly/web/services/helpers/events');
jest.mock('sly/web/config');
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

      expect(mockEvents.sendPageView).toHaveBeenCalledWith('/home', '?query=true');

      act(() => history.push('/search?new-page=true'));

      expect(mockEvents.sendPageView).toHaveBeenCalledWith('/search', '?new-page=true');
      expect(mockEvents.sendEvent).not.toHaveBeenCalled();
      expect(history.replace).not.toHaveBeenCalled();
    });
  });
});
