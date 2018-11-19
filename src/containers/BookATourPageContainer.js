import React from 'react';
import { object } from 'prop-types';

import { community as communityPropType } from 'sly/propTypes/community';
import { connectController } from 'sly/controllers';
import withServerState from 'sly/store/withServerState';
import { getDetail } from 'sly/store/selectors';
import { resourceDetailReadRequest } from 'sly/store/resource/actions';

import BookATourPage from 'sly/components/pages/BookATourPage';

const BookATourPageContainer = ({ community, user }) => {
  if (!community) {
    return null;
  }

  return (
    <BookATourPage
      community={community}
      user={user}
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
