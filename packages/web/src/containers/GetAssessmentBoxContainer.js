import React, { Component } from 'react';
import { string, object, bool } from 'prop-types';
import { branch } from 'recompose';

import { prefetch } from 'sly/web/services/api';
import agentPropType from 'sly/web/propTypes/agent';
import communityPropType from 'sly/web/propTypes/community';
import SlyEvent from 'sly/web/services/helpers/events';
import pad from 'sly/web/components/helpers/pad';
import CommunityPricingTable from 'sly/web/components/organisms/CommunityPricingTable';
import { Link, Block } from 'sly/web/components/atoms';
import Modal, { HeaderWithClose, PaddedHeaderWithCloseBody } from 'sly/web/components/atoms/NewModal';
import GetAssessmentBox from 'sly/web/components/organisms/GetAssessmentBox';
import MatchedAgent from 'sly/web/components/organisms/MatchedAgent';
import PostConversionGreetingForm from 'sly/web/components/organisms/PostConversionGreetingForm';
import GetCommunityPricingAndAvailability from 'sly/web/components/organisms/GetCommunityPricingAndAvailability';
import CommunityStickyFooter from 'sly/web/components/organisms/CommunityStickyFooter';

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
  };

  componentDidMount() {
    const { layout } = this.props;
    SlyEvent.getInstance().sendEvent({
      category: 'assessmentWizard',
      action: 'mounted',
      label: layout,
      nonInteraction: true,
    });
  }

  render() {
    const {
      status = {}, layout, boxLayout, agent, community, completedAssessment, startLink, className, extraProps,
    } = this.props;
    const { modalOpened } = this.state;
    let hasFinished = true;
    let buttonProps = {
      to: startLink,
      buttonTo: startLink,
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
        {layout === 'box' &&
          <GetAssessmentBox
            palette="primary"
            layout={boxLayout}
            buttonProps={buttonProps}
          />
        }
        {layout === 'sidebar' &&
          <GetCommunityPricingAndAvailability
            community={community}
            {...buttonProps}
          />
        }
        {layout === 'footer' &&
          <CommunityStickyFooter
            community={community}
            locTrack="sticky-footer"
            isAlreadyPricingRequested={completedAssessment}
            {...buttonProps}
          />
        }
        {layout === 'pricing-table' &&
          <CommunityPricingTable
            {...extraProps}
            community={community}
            isAlreadyPricingRequested={completedAssessment}
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
