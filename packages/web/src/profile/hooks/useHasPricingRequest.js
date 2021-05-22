import { useMemo } from 'react';
import isMatch from 'lodash/isMatch';

import {
  PRICING_REQUEST,
  PROFILE_CONTACTED,
} from 'sly/web/services/api/constants';

const createHasProfileAction = uuidActions => (
  type,
  actionInfo,
) => {
  if (!uuidActions) return false;
  return uuidActions.some((uuidAction) => {
    return (
      uuidAction.actionType === type &&
      isMatch(uuidAction.actionInfo, actionInfo)
    );
  });
};

export function useHasPricingRequest(uuidActions) {
  const hasProfileAction = useMemo(
    () => createHasProfileAction(uuidActions),
    [uuidActions],
  );
  return useMemo(
    () =>
      hasProfileAction(PROFILE_CONTACTED, {
        contactType: PRICING_REQUEST,
      }),
    [hasProfileAction],
  );
}
