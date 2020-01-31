import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { string, func } from 'prop-types';

import { createValidator, required } from 'sly/services/validation';
import { withRedirectTo } from 'sly/services/redirectTo';
import SlyEvent from 'sly/services/helpers/events';
import GetHelpNow from 'sly/components/organisms/GetHelpNow';

const validate = createValidator({
  what: [required],
});

const ReduxForm = reduxForm({
  form: 'GetHelpNow',
  validate,
})(GetHelpNow);

@withRedirectTo

export default class GetHelpNowContainer extends Component {
  static propTypes = {
    communitySlug: string.isRequired,
    redirectTo: func.isRequired,
    askAgent: func.isRequired,
  };

  handleSubmit = ({ what }) => {
    const { redirectTo, communitySlug, askAgent } = this.props;

    const event = {
      action: 'submitted',
      category: 'side-column-get-help-now',
      label: what,
    };

    SlyEvent.getInstance().sendEvent(event);

    if (what === 'get-detailed-pricing' || what === 'find-a-room-now') {
      redirectTo(`/custom-pricing/${communitySlug}${what === 'find-a-room-now' ? '?type=availability' : ''}`);
    } else if (what === 'ask-anything-about-senior-living') {
      askAgent('ask-anything-about-senior-living');
    } else if (what === 'other') {
      askAgent('other');
    } else if (what === 'how-do-i-pay-for-senior-living') {
      redirectTo(`/resources/articles/how-to-pay-for-senior-housing?utm_campaign=get_help_now&utm_source=${communitySlug}`);
    }
  };

  render() {
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
      />
    );
  }
}
