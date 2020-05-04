import React, { PureComponent } from 'react';
import { func, object } from 'prop-types';

import { withAuth, withUser } from 'sly/services/api';
import withNotification from 'sly/controllers/withNotification';
import { withProps } from 'sly/services/helpers/hocs';
import { parseURLQueryParams } from 'sly/services/helpers/url';
import CommunityPartnersPage from 'sly/components/pages/CommunityPartnersPage'
import SlyEvent from 'sly/services/helpers/events';


const category = 'ProvidersMarketingPage';
const action = 'click';
const label = 'register';

@withAuth
@withUser
@withNotification
@withProps(({ match, location }) => ({
  queryParams: parseURLQueryParams(location.search),
}))
export default class CommunityPartnersPageContainer extends PureComponent {
  static propTypes = {
    ensureAuthenticated: func,
    queryParams: object,
    user: object,
    notifyError: func,

  };

  onRegisterClick = () => {
    const { ensureAuthenticated, queryParams, user, notifyError } = this.props;
    if (user) {
      notifyError("Cannot create an account as user is already logged in.")
    }
    SlyEvent.getInstance().sendEvent({
      category,
      action,
      label,
    });
    const data = {register:true, provider:true};
    if (queryParams['prop']) {
      data.prop = queryParams['prop']
    }
    console.log(data);
    ensureAuthenticated(data);
  };

  render() {
    return (
      <CommunityPartnersPage onRegisterClick={this.onRegisterClick} />
    );
  }
}
