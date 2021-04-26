import React, { PureComponent } from 'react';
import { func, object } from 'prop-types';

import { withAuth, normalizeResponse, query, withUser } from 'sly/web/services/api';
import withNotification from 'sly/web/controllers/withNotification';
import { withProps } from 'sly/web/services/helpers/hocs';
import { parseURLQueryParams } from 'sly/web/services/helpers/url';
import CommunityPartnersPage from 'sly/web/components/pages/CommunityPartnersPage'
import SlyEvent from 'sly/web/services/helpers/events';


const category = 'ProvidersMarketingPage';
const action = 'click';
const label = 'register';

@withAuth
@withUser
@withNotification
@withProps(({ match, location }) => ({
  queryParams: parseURLQueryParams(location.search),
}))

@query('getCommunity', 'getCommunity')

export default class CommunityPartnersPageContainer extends PureComponent {
  static propTypes = {
    ensureAuthenticated: func,
    queryParams: object,
    user: object,
    notifyError: func,
    getCommunity: func,
  };

  state = {
    community: {}
  };

  componentDidMount() {
    const { queryParams, getCommunity } = this.props;
    if ( !queryParams ) {
      return
    }
    const { prop } = queryParams;
    if ( !prop ) {
      return
    }
    return getCommunity({id: prop}).then((resp) => {
      const community = normalizeResponse(resp.body);
      return this.setState({
        community
      });
    });
  }

  onRegisterClick = () => {
    const { ensureAuthenticated, user, notifyError } = this.props;
    const { community } = this.state;
    if (user) {
      notifyError("Cannot create an account as user is already logged in.")
    }
    SlyEvent.getInstance().sendEvent({
      category,
      action,
      label,
    });
    const data = {register:true, provider:true};
    if (community.id) {
      data.community = {value: community.id, label: `${community.name}: ${community.address.city}, ${community.address.state}`}
    }
    ensureAuthenticated(data);
  };

  render() {
    const { user } = this.props;
    return (
      <CommunityPartnersPage onRegisterClick={this.onRegisterClick} user={user}/>
    );
  }
}
