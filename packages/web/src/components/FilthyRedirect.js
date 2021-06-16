import React from 'react';
import { Redirect } from 'react-router-dom';
import { object, func, bool } from 'prop-types';
import loadable from '@loadable/component';
import { useLocation } from 'react-router';

import { isBrowser } from 'sly/web/config';
import { parseURLQueryParams, objectToURLQueryParams } from 'sly/web/services/helpers/url';
import { THANK_YOU, CARE_ASSESSMENT_WIZARD, ADD_RATING } from 'sly/web/constants/modalType';
import Thankyou from 'sly/web/components/molecules/Thankyou';

const CareAssessmentController = loadable(() => import(/* webpackChunkName: "chunkCareAssessmentController" */'sly/web/external/apps/wizards/careAssessment/Controller'));
const CommunityAddRatingFormContainer = loadable(() => import(/* webpackChunkName: "chunkCommunityAddRatingFormContainer" */'sly/web/containers/CommunityAddRatingFormContainer'));

const FilthyRedirect = ({
  isModalOpen, showModal,
}) => {
  const location = useLocation();

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
};

export default FilthyRedirect;
