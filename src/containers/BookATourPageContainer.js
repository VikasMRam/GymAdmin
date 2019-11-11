import React, { Component } from 'react';
import { object, func, string, shape } from 'prop-types';
import { withRouter } from 'react-router';

import { query } from 'sly/services/newApi';
import { community as communityPropType } from 'sly/propTypes/community';
import { connectController } from 'sly/controllers';
import withServerState from 'sly/store/withServerState';
import { getDetail } from 'sly/store/selectors';
import { resourceDetailReadRequest, resourceCreateRequest } from 'sly/store/resource/actions';
import SlyEvent from 'sly/services/helpers/events';
import { BOOK_A_TOUR } from 'sly/services/api/actions';
import BookATourPage from 'sly/components/pages/BookATourPage';
import { getUserDetailsFromUAAndForm } from 'sly/services/helpers/userDetails';
import { getLastSegment, replaceLastSegment } from 'sly/services/helpers/url';
import { TOUR_BOOKED } from 'sly/services/newApi/constants';
import { withRedirectTo } from 'sly/services/redirectTo';

const eventCategory = 'BAT';

const mapStateToProps = (state, { match }) => ({
  user: getDetail(state, 'user', 'me'),
  userAction: getDetail(state, 'userAction') || {},
  community: getDetail(state, 'community', match.params.communitySlug),
});

const mapDispatchToProps = dispatch => ({
  postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
});

const mapPropsToActions = ({ match }) => ({
  community: resourceDetailReadRequest('community', match.params.communitySlug, {
    include: 'similar-communities',
  }),
  userAction: resourceDetailReadRequest('userAction'),
});

const handleResponses = (responses, { location }, redirect) => {
  const {
    community,
  } = responses;

  const {
    pathname,
  } = location;

  community(null, (error) => {
    if (error.response) {
      if (error.response.status === 301) {
        redirect(replaceLastSegment(pathname, getLastSegment(error.location)));
        return null;
      }

      if (error.response.status === 404) {
        // Not found so redirect to city page
        redirect(replaceLastSegment(pathname));
        return null;
      }
    }

    return Promise.reject(error);
  });
};

@withServerState(
  mapPropsToActions,
  handleResponses,
)

@connectController(
  mapStateToProps,
  mapDispatchToProps
)

@query('createAction', 'createUuidAction')

@withRouter
@withRedirectTo

export default class BookATourPageContainer extends Component {
  static propTypes = {
    community: communityPropType,
    user: object,
    userAction: object,
    postUserAction: func.isRequired,
    history: object.isRequired,
    createAction: func.isRequired,
    match: shape({ url: string }),
    redirectTo: func.isRequired
  };


  handleComplete = (data) => {
    const {
      community, postUserAction, userAction, createAction, match,
    } = this.props;

    const {
      name, phone, medicaidCoverage, contactByTextMsg, ...restData
    } = data;

    const { userDetails } = userAction;
    const user = getUserDetailsFromUAAndForm({ userDetails, formData: data });
    const value = {
      ...restData,
      slug: community.id,
      user,
    };
    const payload = {
      action: BOOK_A_TOUR,
      value,
    };

    return Promise.all([
      postUserAction(payload),
      createAction({
        type: 'UUIDAction',
        attributes: {
          actionInfo: {
            slug: community.id,
            scheduledDay: data.scheduledDate,
            scheduledTime: data.scheduledTime,
          },
          actionType: TOUR_BOOKED,
          actionPage: match.url,
        },
      }),
    ]).then(() => {
      const event = {
        action: 'tour-booked', category: eventCategory, label: community.id,
      };
      SlyEvent.getInstance().sendEvent(event);
    });
  };

  render() {
    const {
      community, user, userAction, redirectTo, match
    } = this.props;

    if (!community || !userAction) {
      return null;
    }

    const userDetails = userAction ? userAction.userDetails : null;
    return (
      <BookATourPage
        community={community}
        user={user}
        userDetails={userDetails}
        onComplete={this.handleComplete}
        redirectTo={redirectTo}
        match={match}
      />
    );
  }
}
