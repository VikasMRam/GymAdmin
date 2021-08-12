import React from 'react';
import styled from 'styled-components';

import SlyTypeform from 'sly/web/profile/Typeform/Typeform';
import {
  ASSESSMENT_WIZARD_COMPLETED,
} from 'sly/web/assessment/constants';
import { isBrowser } from 'sly/web/config';
import { Block, Box, space, Button } from 'sly/common/system';
import CommunityPricing from 'sly/web/components/molecules/CommunityPricing';
import { Checkmark } from 'sly/common/icons';
import fullWidth from 'sly/web/components/helpers/fullWidth';

const PaddedCommunityPricing = styled(CommunityPricing)`
  margin-bottom:${space('l')};
`;

const StyledButton = fullWidth(Button);
import { usePrefetch } from 'sly/web/services/api';
import { useHasPricingRequest } from 'sly/web/profile/hooks/useHasPricingRequest';
import { PROFILE_CONTACTED } from 'sly/web/services/api/constants';
import communityPropType from 'sly/common/propTypes/community';


const SlyTypeformAssessmentContainer = (props) => {
  const { layout, community, wizardType, formId, popupButtonName, children } = props;
  const {
    startingRate,
    id,
    rates,
    propInfo,
  } = community;

  const {
    maxRate,
  } = (propInfo || {});

  const { requestInfo: { normalized: uuidActions } } = usePrefetch('getUuidActions', {
    'filter[actionType]': PROFILE_CONTACTED,
    'filter[actionInfo-slug]': id,
  }, { sessionOnly: true });
  const hasAlreadyRequestedPricing = useHasPricingRequest(uuidActions);
  // const completedAssessment = isBrowser && !!localStorage.getItem(ASSESSMENT_WIZARD_COMPLETED);

  return (
    <Block>
      {
        layout === 'sidebar' &&
        <Box p="l !important" >
          {startingRate > 0 && <PaddedCommunityPricing id={id} estimated={rates !== 'Provided'} price={startingRate} max={maxRate} />}
          {
          hasAlreadyRequestedPricing ?
            <StyledButton sx={{ cursor: 'unset' }} disabled>
              <Checkmark mr="s" />Pricing Requested
            </StyledButton>
          :
            <SlyTypeform wizardType="POPUP_BUTTON" formId={formId} popupButtonName={popupButtonName} />
        }
        </Box>
      }
      {children}
    </Block>
  );
};

export default SlyTypeformAssessmentContainer;
