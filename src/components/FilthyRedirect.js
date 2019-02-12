import React from 'react';
import { Redirect } from 'react-router-dom';
import { object, func, bool } from 'prop-types';

import { isBrowser } from 'sly/config';
import { parseURLQueryParams, objectToURLQueryParams } from 'sly/services/helpers/url';
import { THANK_YOU, CARE_ASSESSMENT_WIZARD } from 'sly/constants/modalType';
import Thankyou from 'sly/components/molecules/Thankyou';
import CareAssessmentController from 'sly/external/wizards/careAssessment/Controller';

const FilthyRedirect = ({ location, isModalOpen, showModal }) => {
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
      break;
    case CARE_ASSESSMENT_WIZARD:
      showModal(<CareAssessmentController locationSearchParams={{ city, state }} />, null, 'wizard');
      break;
    default:
      break;
  }

  if (qp.modal && isBrowser) {
    return <Redirect to={newLocation} />;
  }

  return null;
};

FilthyRedirect.propTypes = {
  location: object,
  isModalOpen: bool,
  showModal: func,
  history: object,
};

export default FilthyRedirect;
