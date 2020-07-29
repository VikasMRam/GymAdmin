import React, { Component } from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router';

import emailPropType from 'sly/common/propTypes/email';
import { prefetch } from 'sly/web/services/api';
import EmailViewPage from 'sly/web/components/pages/EmailViewPage';

@withRouter
@prefetch('email', 'getEmail', (req, { match }) => req({
  id: match.params.id,
}))

export default class EmailViewPageContainer extends Component {
  static propTypes = {
    email: emailPropType.isRequired,
    status: object,
  };

  render() {
    const { email, status, ...props } = this.props;

    // TODO: handle error

    const html = email && email.html ? email.html : '';

    return (
      <EmailViewPage html={html} />
    );
  }
}
