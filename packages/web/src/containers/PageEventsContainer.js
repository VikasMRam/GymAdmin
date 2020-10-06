import { Component } from 'react';
import { withRouter } from 'react-router';

import SlyEvent from 'sly/web/services/helpers/events';
import { extractEventFromQuery } from 'sly/web/services/helpers/queryParamEvents';

@withRouter
export default class PageEventsContainer extends Component {
  static typeHydrationId = 'PageEventsContainer';

  sendQueryEvents() {
    const { history, location: { pathname, search, hash } } = this.props;

    const { event, search: searchWithoutEvent } = extractEventFromQuery(search);
    if (event) {
      SlyEvent.getInstance().sendEvent(event);
      history.replace(pathname + searchWithoutEvent + hash);
      return true;
    }
    return false;
  }

  componentDidMount() {
    const { location: { pathname, search } } = this.props;

    if (this.sendQueryEvents()) {
      return;
    }

    SlyEvent.getInstance().sendPageView(pathname, search);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (prevProps.location !== location) {
      if (this.sendQueryEvents()) {
        return;
      }

      SlyEvent.getInstance().sendPageView(location.pathname, location.search);
    }
  }

  render() {
    return null;
  }
}
