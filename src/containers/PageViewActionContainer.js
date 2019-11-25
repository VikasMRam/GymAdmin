import React, { Component } from 'react';
import { object, string } from 'prop-types';
import withRouter from 'react-router/withRouter';

import { query } from 'sly/services/newApi';
import SlyEvent from 'sly/services/helpers/events';
import { extractEventFromQuery } from 'sly/services/helpers/queryParamEvents';

@query('createAction', 'createUuidAction')
@withRouter
export default class PageViewActionContainer extends Component {
  static typeHydrationId = 'PageViewActionContainer';
  static propTypes = {
    actionInfo: object.isRequired,
    actionType: string.isRequired,
  };

  componentDidMount() {
    const { match, location: { pathname, search, hash }, history, createAction, actionType, actionInfo } = this.props;

    const { event, search: searchWithoutEvent } = extractEventFromQuery(search);
    if (event) {
      SlyEvent.getInstance().sendEvent(event);
      history.replace(pathname + searchWithoutEvent + hash);
    }

    SlyEvent.getInstance().sendPageView(pathname, searchWithoutEvent);

    createAction({
      type: 'UUIDAction',
      attributes: {
        actionInfo,
        actionPage: match.url,
        actionType,
      },
    });
  }

  componentDidUpdate() {
    const { history, location: { pathname, search, hash } } = this.props;

    const { event, search: searchWithoutEvent } = extractEventFromQuery(search);
    if (event) {
      SlyEvent.getInstance().sendEvent(event);
      history.replace(pathname + searchWithoutEvent + hash);
    }
  }

  render() {
    return null;
  }
}
