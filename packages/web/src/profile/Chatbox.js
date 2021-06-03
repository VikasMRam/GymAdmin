import { Component } from 'react';
import { object } from 'prop-types';

import { getIsCCRC, getHasContract, getPartnerAgent } from 'sly/web/services/helpers/community';

export default class Chatbox extends Component {
  static typeHydrationId = 'Chatbox';

  static propTypes = {
    community: object.isRequired,
  };

  componentDidMount() {
    if (!window.RokoInstabot) {
      setTimeout(this.load, 2000);
    } else {
      this.load();
    }
  }

  load = () => {
    if (!window.RokoInstabot) {
      setTimeout(this.load, 2000);
      return;
    }
    const { community } = this.props;
    const { propInfo: { tier }, address: { state } } = community;
    const partnerAgent = getPartnerAgent(community);
    const hasContract = getHasContract(community);
    let eventName;

    // NON-CCRC profile pages, EXCEPT: in no agent areas or Emma's zip codes
    if (!getIsCCRC(community) && (partnerAgent || tier !== '1')) {
      eventName = 'standard-non-direct';
    }
    // On all profile pages in Emma's zip codes
    if (tier === '1' && state === 'IL') {
      eventName = 'emma-direct-market';
    }

    // On all profile pages in Lauren's zip codes
    if (tier === '1' && state === 'CA') {
      eventName = 'lauren-direct-market';
    }
    // All CCRC profile pages pages EXCEPT: in no agent area or Emma's zip codes or CCRCs we have a contract with
    if (getIsCCRC(community) && (partnerAgent || tier !== '1' || !hasContract)) {
      eventName = 'ccrc-profile';
    }
    // on all profile pages in no agent areas EXCEPT: if we have a contract with community
    if (!partnerAgent && !hasContract) {
      eventName = 'user-intent';
    }

    if (state === 'AZ') {
      eventName = 'Test Trigger 2';
    } else if (state === 'CO') {
      eventName = 'Test Trigger 1';
    }

    if (eventName) {
      console.log('Loading chat bot: ', eventName);
      window.RokoInstabot.trigger(eventName);
    }
  };

  render() {
    return null;
  }
}
