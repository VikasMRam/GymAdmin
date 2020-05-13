import React, { Component } from 'react';
import dayjs from 'dayjs';
import { arrayOf, object } from 'prop-types';

import { prefetch } from 'sly/web/services/api';
import eventPropType from 'sly/web/propTypes/event';
import performerPropType from 'sly/web/propTypes/performer';
import CurtainUpPage from 'sly/web/components/pages/CurtainUpPage';

@prefetch('events', 'getEvents', (req) => {
  const lastDayOfWeek = dayjs().utc().endOf('week').hour(23)
    .minute(59)
    .second(59)
    .format();
  const today = dayjs().utc().format();

  return req({
    'filter[live_at]': `bet:${today},${lastDayOfWeek}`,
    sort: 'live_at',
    'page-size': 2,
  });
})

@prefetch('performers', 'getPerformers', req => req({
  sort: '-updated_at',
}))

export default class CurtainUpPageContainer extends Component {
  static propTypes = {
    events: arrayOf(eventPropType),
    performers: arrayOf(performerPropType),
    status: object,
  };

  render() {
    const { events, performers, status } = this.props;
    const { hasFinished: eventsHasFinished } = status.events;
    const { hasFinished: performersHasFinished } = status.performers;

    return (
      <CurtainUpPage
        events={events}
        performers={performers}
        eventsIsLoading={!eventsHasFinished}
        performersIsLoading={!performersHasFinished}
      />
    );
  }
}
