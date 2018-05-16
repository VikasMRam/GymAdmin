import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func, bool, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { getDetail } from 'sly/store/selectors';
import { next, close, getDetailedPricing } from 'sly/store/concierge/actions';
import { community as communityPropType } from 'sly/propTypes/community';
import { conciergeSelector } from 'sly/store/concierge/selectors';

import {
  resourceDetailReadRequest,
} from 'sly/store/resource/actions';

class ConciergeController extends Component {
  static propTypes = {
    next: func.isRequired,
    close: func.isRequired,
    community: communityPropType.isRequired,
    concierge: object.isRequired,
    children: func.isRequired,
  };

  getPricing = () => {
    const { concierge, getDetailedPricing } = this.props;
    const { callbackRequested, advancedInfoSent } = concierge;
 
    getDetailedPricing({ callbackRequested, advancedInfoSent });
  }

  render() {
    const { children, ...props } = this.props;
    return children({
      ...props,
      getPricing: this.getPricing,
    });
  }
}

const mapStateToProps = (state, { community }) => {
  const concierge = conciergeSelector(state, community.id);
  return {
    concierge,
    community,
  };
};

export default connect(mapStateToProps, { next, close, getDetailedPricing })(ConciergeController);
