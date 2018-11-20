import React from 'react';
import { object } from 'prop-types';

import { community as communityPropType } from 'sly/propTypes/community';
import { connectController } from 'sly/controllers';
import withServerState from 'sly/store/withServerState';
import { getDetail } from 'sly/store/selectors';
import { resourceDetailReadRequest } from 'sly/store/resource/actions';
import SlyEvent from 'sly/services/helpers/events';

import BookATourPage from 'sly/components/pages/BookATourPage';

const handleDateChange = (e, newValue) => {
  const event = {
    action: 'date-changed', category: 'BAT', label: newValue,
  };
  SlyEvent.getInstance().sendEvent(event);
};

const handleTimeChange = (e, newValue) => {
  const event = {
    action: 'time-changed', category: 'BAT', label: newValue,
  };
  SlyEvent.getInstance().sendEvent(event);
};

const handleStepChange = (step) => {
  const event = {
    action: 'step-completed', category: 'BAT', label: step - 1,
  };
  SlyEvent.getInstance().sendEvent(event);
};

const handleComplete = (data) => {
  alert(`completed: ${JSON.stringify(data)}`);
  const event = {
    action: 'tour-booked', category: 'BAT',
  };
  SlyEvent.getInstance().sendEvent(event);
};

const handleContactByTextMsgChange = (e) => {
  const event = {
    action: 'contactByTextMsg-changed', category: 'BAT', label: e.target.checked,
  };
  SlyEvent.getInstance().sendEvent(event);
};

const BookATourPageContainer = ({ community, user }) => {
  if (!community) {
    return null;
  }

  return (
    <BookATourPage
      community={community}
      user={user}
      onDateChange={handleDateChange}
      onTimeChange={handleTimeChange}
      onStepChange={handleStepChange}
      onComplete={handleComplete}
      onContactByTextMsgChange={handleContactByTextMsgChange}
    />
  );
};

BookATourPageContainer.propTypes = {
  community: communityPropType,
  user: object,
};

const getCommunitySlug = match => match.params.communitySlug;
const mapStateToProps = (state, { match }) => {
  const communitySlug = getCommunitySlug(match);
  return {
    user: getDetail(state, 'user', 'me'),
    community: getDetail(state, 'community', communitySlug),
  };
};

const fetchData = (dispatch, { match }) =>
  Promise.all([
    dispatch(resourceDetailReadRequest('community', getCommunitySlug(match), {
      include: 'similar-communities',
    })),
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
})(connectController(mapStateToProps)(BookATourPageContainer));
