import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { string, object, bool } from 'prop-types';

import { recordEntityCta } from 'sly/web/services/helpers/localStorage';
import { isBrowser } from 'sly/web/config';
import { useQuery, normalizeResponse } from 'sly/web/services/api';
import { PRICING_REQUEST } from 'sly/web/services/api/constants';
import { objectToURLQueryParams } from 'sly/web/services/helpers/url';
import communityPropType from 'sly/common/propTypes/community';
import SlyEvent, { objectToEventLabel } from 'sly/web/services/helpers/events';
import CommunityPricingTable from 'sly/web/components/organisms/CommunityPricingTable';
import { Link, Block } from 'sly/common/components/atoms';
import Modal, { HeaderWithClose, PaddedHeaderWithCloseBody } from 'sly/web/components/atoms/NewModal';
import GetAssessmentBox from 'sly/web/components/organisms/GetAssessmentBox';
import MatchedAgent from 'sly/web/components/organisms/MatchedAgent';
import PostConversionGreetingForm from 'sly/web/components/organisms/PostConversionGreetingForm';
import SidebarCTAContainer from 'sly/web/containers/communityProfile/SidebarCTAContainer';
import StickyFooterCTAContainer from 'sly/web/containers/communityProfile/StickyFooterCTAContainer';

// TODO: Also has pricing request cta flow, de-couple or rename
// State is in properties ( ? ) ( button text depends on pricing completion)

const GetAssessmentBoxContainer = ({
  layout,
  completedPricing,
  mode,
  community,
  startLink,
  completedAssessment,
  className,
  boxLayout,
  extraProps,
  agentId,
  children,
  ...props
}) => {
  const [agent, setAgent] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  const getAgent = useQuery('getAgent');

  useEffect(() => {
    if (completedAssessment && agentId) {
      getAgent({ id: agentId })
        .then(res => normalizeResponse(res.body))
        .then(res => setAgent(res))
        .catch(err => console.error(err));
    }
  }, [completedAssessment && agentId]);

  const createAction = useQuery('createUuidAction');

  const startAssessmentFlow = useCallback(() => {
    if (isBrowser) {
      SlyEvent.getInstance().sendEvent({
        category: 'assessmentWizard',
        action: 'start',
        label: objectToEventLabel(mode),
      });
    }
  }, [mode]);

  const toggleModal = useCallback(() => {
    setModalOpened(!modalOpened);
    SlyEvent.getInstance().sendEvent({
      category: 'assessmentWizard',
      action: `${modalOpened ? 'close' : 'open'}-modal`,
      label: layout,
    });
  }, [modalOpened, layout]);

  const completedAssessmentFlow = useCallback((evt) => {
    evt.preventDefault();
    if (isBrowser) {
      SlyEvent.getInstance().sendEvent({
        category: 'assessmentWizard',
        action: 'completedStart',
        label: objectToEventLabel(mode),
      });
    }
    if (!completedPricing && community) {
      // send pricing request uuid action
      createAction({
        type: 'UUIDAction',
        attributes: { actionType: PRICING_REQUEST, actionInfo: { data: { communityId: community.id } } },
      }).then(() => {
        return recordEntityCta(PRICING_REQUEST, community.id);
      }, (e) => {
        // console.logError(e) : TODO
        console.log(e);
        return recordEntityCta(PRICING_REQUEST, community.id);
      },
      ).then(toggleModal);
    }
  }, [completedPricing, mode, community]);

  const buttonProps = useMemo(() => {
    const sl = `${startLink}?${objectToURLQueryParams(mode)}`;
    if (completedAssessment) {
      return { onClick: completedAssessmentFlow };
    } return { to: sl, buttonTo: sl, onClick: startAssessmentFlow };
  }, [startLink, mode, completedAssessment]);

  return (
    <div className={className}>
      {layout === 'box' && !completedAssessment && (
        <GetAssessmentBox layout={boxLayout} buttonProps={buttonProps} {...props} />
      )}
      {layout === 'sidebar' && (
        <SidebarCTAContainer community={community} buttonProps={buttonProps} completedCTA={completedPricing}>
          {children}
        </SidebarCTAContainer>
      )}
      {layout === 'footer' && (
        <StickyFooterCTAContainer community={community} buttonProps={buttonProps} completedCTA={completedPricing} />
      )}
      {layout === 'pricing-table' && (
        <CommunityPricingTable
          {...extraProps}
          community={community}
          isAlreadyPricingRequested={completedPricing}
          buttonProps={buttonProps}
        />
      )}
      {modalOpened && <Modal isOpen={modalOpened} onClose={toggleModal}>
        <HeaderWithClose icon="check" onClose={toggleModal} marginBottom="large">Success!</HeaderWithClose>
        <PaddedHeaderWithCloseBody>
          {agent && (
            <MatchedAgent
              hasBox={false}
              agent={agent}
              heading={`Request sent! Your Seniorly Local Advisor, ${agent.name} will get back to you with pricing information on this community.`}
            />
          )}
          {!agent && (
            <PostConversionGreetingForm
              hasBox={false}
              community={community}
              onReturnClick={toggleModal}
              heading="Request sent! One of our Seniorly Local Advisors will reach out to assist you."
              description="Questions? You can contact us by phone or email:"
            >
              <Block pad="regular">
                <Link href="mailto:caremanager@seniorly.com">caremanager@seniorly.com</Link>
              </Block>
              <Block pad="regular">
                <Link href="tel:8558664515">(855) 866-4515</Link>
              </Block>
            </PostConversionGreetingForm>
          )}
        </PaddedHeaderWithCloseBody>
      </Modal>}
    </div>
  );
};

GetAssessmentBoxContainer.propTypes = {
  agentId: string,
  community: communityPropType,
  layout: string.isRequired,
  boxLayout: string,
  startLink: string.isRequired,
  completedAssessment: bool,
  completedPricing: bool,
  className: string,
  mode: object.isRequired,
  extraProps: object.isRequired,
};

GetAssessmentBoxContainer.defaultProps = {
  layout: 'box',
  extraProps: {},
};

export default GetAssessmentBoxContainer;
