import React, { PureComponent } from 'react';
import { func } from 'prop-types';

import { withAuth } from 'sly/services/api';
import CommunityPartnersPage from 'sly/components/pages/CommunityPartnersPage'
import SlyEvent from 'sly/services/helpers/events';


const category = 'ProvidersMarketingPage';
const action = 'click';
const label = 'register';

@withAuth
export default class CommunityPartnersPageContainer extends PureComponent {
  static propTypes = {
    ensureAuthenticated: func,
  };

  onRegisterClick = () => {
    const { ensureAuthenticated } = this.props;
    SlyEvent.getInstance().sendEvent({
      category,
      action,
      label,
    });
    ensureAuthenticated({register:true, provider:true});
  };

  render() {
    return (
      <CommunityPartnersPage onRegisterClick={this.onRegisterClick} />
    );
  }
}
