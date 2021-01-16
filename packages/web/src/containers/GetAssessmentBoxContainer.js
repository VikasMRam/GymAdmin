import React, { Component } from 'react';
import { string, object, bool, func } from 'prop-types';
import { branch } from 'recompose';

import { recordEntityCta } from '../services/helpers/localStorage';

import { isBrowser } from 'sly/web/config';
import { prefetch, query } from 'sly/web/services/api';
import { PRICING_REQUEST } from 'sly/web/services/api/constants';
import agentPropType from 'sly/common/propTypes/agent';
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
import { objectToURLQueryParams } from 'sly/web/services/helpers/url';


@query('createAction', 'createUuidAction')
@branch(
  ({ completedAssessment, agentId }) => completedAssessment && agentId,
  prefetch('agent', 'getAgent', (req, { agentId }) => req({
    id: agentId,
  })),
)

export default class GetAssessmentBoxContainer extends Component {
  static typeHydrationId = 'GetAssessmentBoxContainer';
  static propTypes = {
    agentId: string,
    agent: agentPropType,
    community: communityPropType,
    status: object,
    layout: string.isRequired,
    boxLayout: string,
    startLink: string.isRequired,
    completedAssessment: bool,
    completedPricing: bool,
    className: string,
    mode: object.isRequired,
    createAction: func,
    extraProps: object.isRequired,
  };
  static defaultProps = {
    layout: 'box',
    extraProps: {},
  };

  state = {
    didRender: false,
    modalOpened: false,
  };

  componentDidMount() {
    this.setState({
      didRender: true,
    });
  }
  startAssessmentFlow = () => {
    const { createAction, completedAssessment, completedPricing, mode, community } = this.props;
    console.log('Assessment completed', completedAssessment);
    console.log('Pricing completed', completedPricing);
    if (isBrowser) {
      SlyEvent.getInstance().sendEvent({
        category: 'assessmentWizard',
        action: 'start',
        label: objectToEventLabel(mode),
      });
    }
    if (completedAssessment || completedPricing) {
      this.toggleModal();
    }
    if (!completedPricing && community) {
      // send pricing request uuid action
      createAction({
        type: 'UUIDAction',
        attributes: {
          actionType: PRICING_REQUEST,
          actionInfo: {
            data: {

            },
          },
        },
      });
      recordEntityCta;
    }
  }

  toggleModal = () => {
    const { modalOpened } = this.state;
    this.setState({
      modalOpened: !modalOpened,
    });
    const action = modalOpened ? 'open-modal' : 'close-modal';
    const { layout } = this.props;
    SlyEvent.getInstance().sendEvent({
      category: 'assessmentWizard',
      action,
      label: layout,
    });
  };

  // componentDidMount() {
  //   const { layout } = this.props;
  //   SlyEvent.getInstance().sendEvent({
  //     category: 'assessmentWizard',
  //     action: 'mounted',
  //     label: layout,
  //     nonInteraction: true,
  //   });
  // }


  render() {
    const {
      status = {}, layout, boxLayout, agent, community, completedAssessment, completedPricing, startLink, className, extraProps, mode,
    } = this.props;
    const { modalOpened, didRender } = this.state;
    let hasFinished = true;
    // compose new startLink : Add query params from mode
    const sl = `${startLink}?${objectToURLQueryParams(mode)}`;
    let buttonProps = {
      to: sl,
      buttonTo: sl,
      onClick: this.startAssessmentFlow,
    };


    if (completedAssessment) {
      buttonProps = {
        onClick: this.toggleModal,
      };
    }
    if (status.agent) {
      ({ hasFinished } = status.agent);
    }

    if (!hasFinished) {
      return null;
    }

    return (
      <div className={className}>
        {layout === 'box' && !completedAssessment && didRender && isBrowser &&
          <GetAssessmentBox
            layout={boxLayout}
            buttonProps={buttonProps}
            mode={mode}
          />
        }
        {layout === 'sidebar' &&
          <SidebarCTAContainer mode={mode} community={community} buttonProps={buttonProps} completedCTA={completedPricing} />
        }
        {layout === 'footer' &&
          <StickyFooterCTAContainer mode={mode} community={community} buttonProps={buttonProps} completedCTA={completedPricing} />
        }
        {layout === 'pricing-table' &&
          <CommunityPricingTable
            {...extraProps}
            community={community}
            isAlreadyPricingRequested={completedPricing}
            buttonProps={buttonProps}
            mode={mode}
          />
        }
        <Modal isOpen={modalOpened} onClose={this.toggleModal}>
          <HeaderWithClose icon="check" onClose={this.toggleModal} marginBottom="large">Success!</HeaderWithClose>
          <PaddedHeaderWithCloseBody>
            {agent &&
              <MatchedAgent
                hasBox={false}
                agent={agent}
                heading={`Request sent! Your Seniorly Local Advisor, ${agent.name} will get back to you with pricing information on this community.`}
              />
            }
            {!agent &&
              <PostConversionGreetingForm
                hasBox={false}
                community={community}
                onReturnClick={this.toggleModal}
                heading="Request sent! One of our Seniorly Local Advisors will reach out to assist you."
                description="Questions? You can contact us by phone or email:"
              >
                <Block pad="regular">
                  <Link href="mailto:sharon@seniorly.com">sharon@seniorly.com</Link>
                </Block>
                <Block pad="regular">
                  <Link href="tel:8558664515">(855) 866-4515</Link>
                </Block>
              </PostConversionGreetingForm>
            }
          </PaddedHeaderWithCloseBody>
        </Modal>
      </div>
    );
  }
}
