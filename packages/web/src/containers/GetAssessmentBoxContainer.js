import React, { Component } from 'react';
import { string, object, bool } from 'prop-types';
import { branch } from 'recompose';

import { isBrowser } from 'sly/web/config';
import { prefetch } from 'sly/web/services/api';
import agentPropType from 'sly/common/propTypes/agent';
import communityPropType from 'sly/common/propTypes/community';
import SlyEvent from 'sly/web/services/helpers/events';
import { getIsActiveAdult, getIsSellerAgentCTA } from 'sly/web/services/helpers/community';
import { shouldShowZillowProfileAd } from 'sly/web/services/helpers/adtiles';

import pad from 'sly/web/components/helpers/pad';
import CommunityPricingTable from 'sly/web/components/organisms/CommunityPricingTable';
import { Link, Block } from 'sly/web/components/atoms';
import Modal, { HeaderWithClose, PaddedHeaderWithCloseBody } from 'sly/web/components/atoms/NewModal';
import GetAssessmentBox from 'sly/web/components/organisms/GetAssessmentBox';
import MatchedAgent from 'sly/web/components/organisms/MatchedAgent';
import PostConversionGreetingForm from 'sly/web/components/organisms/PostConversionGreetingForm';
import SidebarCTAContainer from 'sly/web/containers/communityProfile/SidebarCTAContainer';
import StickyFooterCTAContainer from 'sly/web/containers/communityProfile/StickyFooterCTAContainer';

const PaddedBlock = pad(Block, 'regular');

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
    extraProps: object.isRequired,
  };
  static defaultProps = {
    layout: 'box',
    extraProps: {},
  };

  state = {
    modalOpened: false,
  };

  toggleModal = () => {
    const { modalOpened } = this.state;
    this.setState({
      modalOpened: !modalOpened,
    });
    let action = modalOpened ? 'open-modal': 'close-modal';
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
      status = {}, layout, boxLayout, agent, community, completedAssessment, completedPricing, startLink, className, extraProps,
    } = this.props;
    const { modalOpened } = this.state;
    let hasFinished = true;
    let buttonProps = {
      to: startLink,
      buttonTo: startLink,
    };

    if (completedAssessment || completedPricing) {
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
        {layout === 'box' && !completedAssessment && isBrowser &&
          <GetAssessmentBox
            palette="primary"
            layout={boxLayout}
            buttonProps={buttonProps}
          />
        }
        {layout === 'sidebar' &&
          <SidebarCTAContainer community={community} buttonProps={buttonProps} completedCTA={completedPricing}/>
        }
        {layout === 'footer' &&
          <StickyFooterCTAContainer community={community} buttonProps={buttonProps} completedCTA={completedPricing}/>
        }
        {layout === 'pricing-table' &&
          <CommunityPricingTable
            {...extraProps}
            community={community}
            isAlreadyPricingRequested={completedPricing}
            buttonProps={buttonProps}
          />
        }
        <Modal isOpen={modalOpened} onClose={this.toggleModal}>
          <HeaderWithClose onClose={this.toggleModal} />
          <PaddedHeaderWithCloseBody>
            {agent &&
              <MatchedAgent
                hasBox={false}
                agent={agent}
                heading={`Request sent! Your Local Senior Living Expert, ${agent.name} will get back to you with pricing information on this community.`}
              />
            }
            {!agent &&
              <PostConversionGreetingForm
                hasBox={false}
                community={community}
                onReturnClick={this.toggleModal}
                heading="Request sent! One of our Local Senior Living Experts will reach out to assist you."
                description="Questions? You can contact us by phone or email:"
              >
                <PaddedBlock>
                  <Link href="mailto:sharon@seniorly.com">sharon@seniorly.com</Link>
                </PaddedBlock>
                <PaddedBlock>
                  <Link href="tel:8558664515">(855) 866-4515</Link>
                </PaddedBlock>
              </PostConversionGreetingForm>
            }
          </PaddedHeaderWithCloseBody>
        </Modal>
      </div>
    );
  }
}
