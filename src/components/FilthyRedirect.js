import React from 'react';
import { Redirect } from 'react-router-dom';
import { object, func, bool, string } from 'prop-types';
import { connect } from 'react-redux';

import { isBrowser } from 'sly/config';
import { parseURLQueryParams, objectToURLQueryParams } from 'sly/services/helpers/url';
import { THANK_YOU, CARE_ASSESSMENT_WIZARD, ADD_RATING } from 'sly/constants/modalType';
import { getDetail } from 'sly/store/selectors';
import Thankyou from 'sly/components/molecules/Thankyou';
import CareAssessmentController from 'sly/external/wizards/careAssessment/Controller';
import CommunityAddRatingFormContainer from 'sly/containers/CommunityAddRatingFormContainer';

const FilthyRedirect = ({
  location, isModalOpen, showModal, user, communitySlug, communityName,
}) => {
  if (isModalOpen) return null;
  const { search } = location;
  const qp = parseURLQueryParams(search);
  const newQp = { ...qp };
  newQp.modal = undefined;
  newQp.state = undefined;
  newQp.city = undefined;
  const newQpO = objectToURLQueryParams(newQp);
  const newLocation = { ...location };
  newLocation.search = newQpO;
  const { city, state } = qp;

  switch (qp.modal) {
    case THANK_YOU:
      showModal(<Thankyou />);
      if (isBrowser) {
        return <Redirect to={newLocation} />;
      }
      break;
    case CARE_ASSESSMENT_WIZARD:
      showModal(<CareAssessmentController locationSearchParams={{ city, state }} />, null, 'wizard');
      if (isBrowser) {
        return <Redirect to={newLocation} />;
      }
      break;
    case ADD_RATING:
      if (communitySlug && communityName) {
        showModal(<CommunityAddRatingFormContainer user={user} communitySlug={communitySlug} communityName={communityName} showModal={showModal} />);
        if (isBrowser) {
          return <Redirect to={newLocation} />;
        }
      }
      break;
    default:
      break;
  }

  return null;
};

FilthyRedirect.propTypes = {
  location: object,
  isModalOpen: bool,
  showModal: func,
  user: object,
  communitySlug: string,
  communityName: string,
};

const getCommunitySlug = match => match.params.communitySlug;

const mapStateToProps = (state, { location, match }) => {
  const communitySlug = getCommunitySlug(match);
  let community;
  let name;
  if (communitySlug) {
    (community = getDetail(state, 'community', communitySlug));
  }
  if (community) {
    ({ name } = community);
  }

  return {
    user: getDetail(state, 'user', 'me'),
    communitySlug,
    communityName: name,
    location,
  };
};

export default connect(mapStateToProps)(FilthyRedirect);
