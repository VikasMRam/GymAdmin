import React, { Component } from 'react';
import { string, bool, node } from 'prop-types';

import ListingAgentQuestionContainer from './ListingAgentQuestionContainer';

import listingPropType from 'sly/common/propTypes/listing';
import agentPropType from 'sly/common/propTypes/agent';
import { isBrowser } from 'sly/web/config';
import { Button } from 'sly/common/system';
import { isCtaRecorded } from 'sly/web/services/helpers/localStorage';

export default class ListingAgentButtonConatiner extends Component {
  static typeHydrationId = 'AskAgentQuestionButtonContainer';
  static propTypes = {
    listing: listingPropType,
    agent: agentPropType,
    type: string,
    ctaText: string,
    ackCTA: bool,
    children: node,
  };

  render() {
    const { ackCTA, listing = {}, type, children } = this.props;
    let { ctaText } = this.props;
    if (!isBrowser) {}
    let requestSent = false;
    if (ackCTA && listing) {
      // check if cta was already made
      if (isCtaRecorded(type, listing.id)) {
        ctaText = 'Request Sent';
        requestSent = true;
      }
    }

    return (
      <ListingAgentQuestionContainer type={type} entityId={listing.id} {...this.props} >
        {askAgent => (
          <Button {...this.props} onClick={askAgent} disabled={requestSent}>
            {ctaText || children}
          </Button>
        )}
      </ListingAgentQuestionContainer>
    );
  }
}
