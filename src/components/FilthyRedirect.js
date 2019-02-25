import React from 'react';
import { Redirect } from 'react-router-dom';
import { object, func, bool, string } from 'prop-types';
import { connect } from 'react-redux';

import { isBrowser } from 'sly/config';
import { parseURLQueryParams, objectToURLQueryParams } from 'sly/services/helpers/url';
import { THANK_YOU, CARE_ASSESSMENT_WIZARD, ADD_RATING } from 'sly/constants/modalType';
import Thankyou from 'sly/components/molecules/Thankyou';
import CareAssessmentController from 'sly/external/wizards/careAssessment/Controller';
import CommunityAddRatingFormContainer from 'sly/containers/CommunityAddRatingFormContainer';

const FilthyRedirect = ({
  location, isModalOpen, showModal,
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
      showModal(<CommunityAddRatingFormContainer showModal={showModal} />);
      if (isBrowser) {
        return <Redirect to={newLocation} />;
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

export default FilthyRedirect;
