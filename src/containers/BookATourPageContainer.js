import React from 'react';
import { object, func, bool } from 'prop-types';

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

const eventCategory = 'BAT';

const BookATourPageContainer = ({
  community, user, postUserAction, history, userAction,
}) => {
  if (!community || !userAction) {
    return null;
  }
  const { id, url } = community;
  const handleComplete = (data, openConfirmationModal) => {
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
        const event = {
          action: 'tour-booked', category: eventCategory, label: id,
        };
        SlyEvent.getInstance().sendEvent(event);
        history.push(url);
        openConfirmationModal();
      });
  };

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
          onComplete={handleComplete}
          showModal={show}
          hideModal={hide}
        />
      )}
    </ModalController>
  );
};

BookATourPageContainer.propTypes = {
  community: communityPropType,
  user: object,
  userAction: object,
  postUserAction: func.isRequired,
  history: object.isRequired,
};

const getCommunitySlug = match => match.params.communitySlug;
const mapStateToProps = (state, { match }) => {
  const communitySlug = getCommunitySlug(match);
  return {
    user: getDetail(state, 'user', 'me'),
    userAction: getDetail(state, 'userAction') || {},
    community: getDetail(state, 'community', communitySlug),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
  };
};

const mapPropsToActions = ({ match }) => ({
  community: resourceDetailReadRequest('community', getCommunitySlug(match), {
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

export default withServerState(
  mapPropsToActions,
  handleResponses,
)(connectController(
  mapStateToProps,
  mapDispatchToProps
)(BookATourPageContainer));
