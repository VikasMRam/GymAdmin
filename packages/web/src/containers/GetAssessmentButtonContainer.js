import React, { Component } from 'react';
import { string, object, bool } from 'prop-types';
import { branch } from 'recompose';

import { prefetch } from 'sly/web/services/api';
import agentPropType from 'sly/common/propTypes/agent';
import communityPropType from 'sly/common/propTypes/community';
import pad from 'sly/web/components/helpers/pad';
import { Link, Block } from 'sly/common/components/atoms';
import Modal, { HeaderWithClose, PaddedHeaderWithCloseBody } from 'sly/web/components/atoms/NewModal';
import GetAssessmentBox from 'sly/web/components/organisms/GetAssessmentBox';
import MatchedAgent from 'sly/web/components/organisms/MatchedAgent';
import PostConversionGreetingForm from 'sly/web/components/organisms/PostConversionGreetingForm';
import GetCommunityPricingAndAvailability from 'sly/web/components/organisms/GetCommunityPricingAndAvailability';

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
    layout: string,
    startLink: string.isRequired,
    completedAssessment: bool,
    className: string,
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

  render() {
    const { status = {}, layout, agent, community, completedAssessment, startLink, className } = this.props;
    const { modalOpened } = this.state;
    let hasFinished = true;
    let buttonProps = {
      to: startLink,
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
        <GetCommunityPricingAndAvailability
          community={community}
          buttonTo={`/wizards/assessment/community/${community.id}`}
        />
        <Modal isOpen={modalOpened} onClose={this.toggleModal}>
          <HeaderWithClose onClose={this.toggleModal} />
          <PaddedHeaderWithCloseBody>
            {agent &&
            <MatchedAgent
              hasBox={false}
              agent={agent}
              heading={`Request sent! Your Seniorly Local Advisors, ${agent.name} will get back to you with pricing information on this community.`}
            />
            }
            {!agent &&
            <PostConversionGreetingForm
              hasBox={false}
              onReturnClick={this.toggleModal}
              heading="Request sent! One of our Seniorly Local Advisorss will reach out to assist you."
              description="Questions? You can contact us by phone or email:"
            >
              <PaddedBlock>
                <Link href="mailto:emma@seniorly.com">emma@seniorly.com</Link>
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
