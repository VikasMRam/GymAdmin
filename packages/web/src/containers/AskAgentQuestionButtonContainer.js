import React, { Component } from 'react';
import { string, bool, node } from 'prop-types';

import communityPropType from 'sly/common/propTypes/community';
import { isBrowser } from 'sly/web/config';
import { Button } from 'sly/web/components/atoms';
import { isCtaRecorded } from 'sly/web/services/helpers/localStorage';
import AskAgentQuestionContainer from 'sly/web/containers/AskAgentQuestionContainer';

export default class AskAgentQuestionButtonContainer extends Component {
  static typeHydrationId = 'AskAgentQuestionButtonContainer';
  static propTypes = {
    community: communityPropType,
    type: string,
    ctaText: string,
    ackCTA: bool,
    children: node,
  };

  render() {
    const { ackCTA, community = {}, type, children } = this.props;
    let { ctaText } = this.props;
    if (!isBrowser) {

    }
    let requestSent = false;
    if (ackCTA && community) {
      //check if cta was already made
      if (isCtaRecorded(type, community.id)) {
        ctaText = "Request Sent";
        requestSent = true;
      }
    }

    return (
      <AskAgentQuestionContainer type={type} entityId={community.id}>
        {askAgent => (
          <Button {...this.props} onClick={askAgent} ghost={requestSent} disabled={requestSent}>
            {ctaText || children}
          </Button>
        )}
      </AskAgentQuestionContainer>
    );
  }
}
