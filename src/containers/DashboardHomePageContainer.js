import React, { Component } from 'react';
import { query } from 'redux-bees';

import api from 'sly/services/api/beesApi';

@query('user', api.getUser, perform => perform({ userId: 'me' }))

export default class DashboardHomePageContainer extends Component {
  render() {
    return 'it\'s the dashboard baby';
  }
}
