import React, { Component } from 'react';
import { object, func, string, shape } from 'prop-types';

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
import ModalController from 'sly/controllers/ModalController';
import { TOUR_BOOKED } from 'sly/services/newApi/constants';

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

export default class BookATourPageContainer extends Component {
  static propTypes = {
    community: communityPropType,
    user: object,
    userAction: object,
    postUserAction: func.isRequired,
    history: object.isRequired,
    createAction: func.isRequired,
    match: shape({ url: string }),
  };

  handleComplete = (data) => {
    const {
      community, postUserAction, history, userAction, createAction, match,
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
      history.push(community.url);
    });
  };

  render() {
    const {
      community, user, userAction,
    } = this.props;

    if (!community || !userAction) {
      return null;
    }

    const userDetails = userAction ? userAction.userDetails : null;
    return (
      <ModalController>
        {({
          show,
          hide,
        }) => (
          <BookATourPage
            community={community}
            user={user}
            userDetails={userDetails}
            onComplete={this.handleComplete}
            showModal={show}
            hideModal={hide}
          />
        )}
      </ModalController>
    );
  }
}
