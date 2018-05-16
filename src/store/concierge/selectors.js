import { getDetail } from 'sly/store/selectors';

import { REQUEST_CALLBACK, ASSESSMENT } from 'sly/services/api/actions';

const isCallback = slug => contact =>
  contact.slug === slug
  && contact.contactType === REQUEST_CALLBACK;

const isAssessment = ({
  typeOfCare,
  typeOfRoom,
  timeToMove,
  budget
}) => typeOfCare && typeOfRoom && timeToMove && budget;

export const conciergeSelector = (state, slug) => {
  const { currentStep, modalIsOpen } = state.concierge;
  const userActions = getDetail(state, 'userAction');
  const callbackRequested = (userActions.profilesContacted || [])
    .some(isCallback(slug));
  const advancedInfoSent = isAssessment(userActions.userDetails || {});

  return {
    currentStep,
    modalIsOpen,
    callbackRequested,
    advancedInfoSent,
  };
}
