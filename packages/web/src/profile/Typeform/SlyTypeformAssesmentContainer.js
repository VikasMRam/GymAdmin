import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { object, string } from 'prop-types';

import SlyTypeformGetAssessmentBox from './SlyTypeformAssesmentBox';
import SlyTypeformStickyFooter from './SlyTypeformStickyFooter';

import SlyTypeformCommunityPricingTable from 'sly/web/profile/Typeform/SlyTypeformPricingTable';
import communityPropType from 'sly/common/propTypes/community';
import SlyTypeform from 'sly/web/profile/Typeform/Typeform';
import {
  ASSESSMENT_WIZARD_COMPLETED,
} from 'sly/web/assessment/constants';
import { TypeformEventCategory, TypeformEventLabel, TypeformEventAction } from 'sly/web/constants/typeform';
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
import SlyEvent from 'sly/web/services/helpers/events';


const SlyTypeformAssessmentContainer = (props) => {
  const { layout, community, wizardType, children } = props;
  const {
    startingRate,
    id,
    rates,
    propInfo,
  } = community;

  const {
    maxRate,
  } = (propInfo || {});

  const [hasAlreadyRequestedPricing, setHasAlreadyRequestedPricing] = useState(false);
  // const [completedAssessment, setCompletedAssessment] = useState(false);

  const { requestInfo: { normalized: uuidActions } } = usePrefetch('getUuidActions', {
    'filter[actionType]': PROFILE_CONTACTED,
    'filter[actionInfo-slug]': id,
  }, { sessionOnly: true });

  const userRequestedPricing = useHasPricingRequest(uuidActions);

  const completedAssessment = isBrowser && !!localStorage.getItem(ASSESSMENT_WIZARD_COMPLETED);

  useEffect(() => {
    setHasAlreadyRequestedPricing(userRequestedPricing);
  }, [userRequestedPricing]);

  const sendEvent = (action, label, value) => SlyEvent.getInstance().sendEvent({
    category: TypeformEventCategory.typeformWizard,
    action,
    label,
    value,
  });
  const onSubmitHandler = () => {
    setHasAlreadyRequestedPricing(true);
    let eventLabel = '';
    if (layout === 'pricing-table') {
      eventLabel = TypeformEventLabel.pricingButton;
    } else if (layout === 'sidebar') {
      eventLabel = TypeformEventLabel.sideBarButton;
    }
    sendEvent(TypeformEventAction.submit, eventLabel, '');
  };

  const onReadyHandler = () => {
    let eventLabel = '';
    if (layout === 'pricing-table') {
      eventLabel = TypeformEventLabel.pricingButton;
    } else if (layout === 'sidebar') {
      eventLabel = TypeformEventLabel.sideBarButton;
    }
    sendEvent(TypeformEventAction.launch, eventLabel, '');
  };


  const extraProps = {
    onSubmitHandler,
    onReadyHandler,
  };

  const typeformContainer = (wizardType, hasAlreadyRequestedPricing) => {
    return (
      <>
        {
          wizardType === 'POPUP_BUTTON' && hasAlreadyRequestedPricing ?
            <StyledButton sx={{ cursor: 'unset' }} disabled>
              <Checkmark mr="s" />Pricing Requested
            </StyledButton> :  <SlyTypeform {...props}  {...extraProps} />
        }
        {
          wizardType !== 'POPUP_BUTTON' &&  <SlyTypeform {...props} {...extraProps} />
        }
      </>
    );
  };
  return (
    <Block>
      {
        layout === 'sidebar' &&
        <Box p="l !important" >
          {startingRate > 0 && <PaddedCommunityPricing id={id} estimated={rates !== 'Provided'} price={startingRate} max={maxRate} />}
          {typeformContainer(wizardType, hasAlreadyRequestedPricing)}
        </Box>
      }
      {
        layout === 'pricing-table' &&
        <SlyTypeformCommunityPricingTable {...props} hasAlreadyRequestedPricing={hasAlreadyRequestedPricing} {...extraProps} />
      }
      {
        layout === 'box' && !hasAlreadyRequestedPricing &&
        <SlyTypeformGetAssessmentBox
          community={community}
          slug={community.id}
          popupButtonStyle={{
            width: '100%',
            height: 'max-content%',
            color: 'black',
            pallete: 'none !important',
            variant: 'neutral !important',
            textAlign: 'center',
            padding: 0,
            borderColor: 'white !important',
            border: '1px solid !important',
            background: 'white',
            }}
          hasAlreadyRequestedPricing={hasAlreadyRequestedPricing}
          {...extraProps}
          {...props}
        />
      }
      {
        layout === 'footer' &&
        <SlyTypeformStickyFooter
          community={community}
          slug={community.id}
          hasAlreadyRequestedPricing={hasAlreadyRequestedPricing}
          {...extraProps}
          {...props}
        />
      }
      {
        !layout &&
        <>
          {typeformContainer(wizardType, hasAlreadyRequestedPricing)}
        </>
      }
      {children}
    </Block>
  );
};

SlyTypeformAssessmentContainer.propTypes = {
  layout: string,
  community: communityPropType,
  wizardType: string.isRequired,
  formId: string.isRequired,
  popupButtonName: string,
  children: object,
};

export default SlyTypeformAssessmentContainer;
