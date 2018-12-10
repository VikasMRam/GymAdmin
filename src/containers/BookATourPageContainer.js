import React from 'react';
import { object, func, bool } from 'prop-types';

import { community as communityPropType } from 'sly/propTypes/community';
import { connectController } from 'sly/controllers';
import withServerState from 'sly/store/withServerState';
import { getDetail, isResourceDetailRequestComplete } from 'sly/store/selectors';
import { resourceDetailReadRequest, resourceCreateRequest } from 'sly/store/resource/actions';
import SlyEvent from 'sly/services/helpers/events';
import { BOOK_A_TOUR } from 'sly/services/api/actions';
import BookATourPage from 'sly/components/pages/BookATourPage';
import { getUserDetailsFromUAAndForm } from 'sly/services/helpers/userDetails';
import { win } from 'sly/services/experiments';

const eventCategory = 'BAT';

const BookATourPageContainer = ({
  community, user, postUserAction, history, userAction, isUserFetchDone,
}) => {
  if (!community || !userAction || !isUserFetchDone) {
    return null;
  }
  const { id, url } = community;
  const handleComplete = (data, toggleConfirmationModal) => {
    const {
      name, phone, medicaidCoverage, contactByTextMsg, ...restData
    } = data;
    const { userDetails } = userAction;
    const user = getUserDetailsFromUAAndForm({ userDetails, formData: data });
    const value = {
      ...restData,
      slug: id,
      user,
    };
    const payload = {
      action: BOOK_A_TOUR,
      value,
    };

    return postUserAction(payload)
      .then(() => {
        win('Organisms_CommunityBookATourContactForm');
        const event = {
          action: 'tour-booked', category: eventCategory, label: id,
        };
        SlyEvent.getInstance().sendEvent(event);
        history.push(url);
        toggleConfirmationModal('booking');
      });
  };

  const userDetails = userAction ? userAction.userDetails : null;
  return (
    <BookATourPage
      community={community}
      user={user}
      userDetails={userDetails}
      onComplete={handleComplete}
    />
  );
};

BookATourPageContainer.propTypes = {
  community: communityPropType,
  user: object,
  userAction: object,
  postUserAction: func.isRequired,
  history: object.isRequired,
  isUserFetchDone: bool,
};

const getCommunitySlug = match => match.params.communitySlug;
const mapStateToProps = (state, { match }) => {
  const communitySlug = getCommunitySlug(match);
  return {
    user: getDetail(state, 'user', 'me'),
    userAction: getDetail(state, 'userAction'),
    community: getDetail(state, 'community', communitySlug),
    isUserFetchDone: isResourceDetailRequestComplete(state, 'user'),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
  };
};

const fetchData = (dispatch, { match }) =>
  Promise.all([
    dispatch(resourceDetailReadRequest('community', getCommunitySlug(match), {
      include: 'similar-communities',
    })),
    dispatch(resourceDetailReadRequest('userAction')),
  ]);

const handleError = (err) => {
  if (err.response) {
    if (err.response.status !== 200) {
      if (err.location) {
        const redUrl = err.location.split('/');
        return {
          errorCode: err.response.status,
          redirectUrl: redUrl[redUrl.length - 1],
        };
      }
      return { errorCode: err.response.status };
    }
    return { errorCode: null };
  }
  throw err;
};

export default withServerState({
  fetchData,
  handleError,
})(connectController(
  mapStateToProps,
  mapDispatchToProps
)(BookATourPageContainer));
