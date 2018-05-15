import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, number, func } from 'prop-types';

import { community as communityPropType } from 'sly/propTypes/community';
import EstimatedCost from 'sly/components/molecules/EstimatedCost';
import { conciergeSelector } from 'sly/store/concierge/selectors';
import { getDetailedPricing } from 'sly/store/concierge/actions';

class EstimatedCostContainer extends Component {
  static propTypes = {
    community: communityPropType.isRequired,
    price: number.isRequired,
    getDetailedPricing: func.isRequired,
    concierge: object.isRequired,
  };

  getPricing = () => {
    const { concierge, getDetailedPricing } = this.props;
    const { callbackRequested, advancedInfoSent } = concierge;
 
    console.log('concierge', concierge);
    getDetailedPricing({ callbackRequested, advancedInfoSent });
  }

  render() {
    const { 
      getDetailedPricing, 
      ...props 
    } = this.props;

    return (
      <EstimatedCost
        getPricing={this.getPricing}
        {...props}
      />
    );
  }
}

const mapStateToProps = (state, { community }) => ({
  concierge: conciergeSelector(state, community.id),
});
const mapDispatchToActions = { getDetailedPricing };

export default connect(
  mapStateToProps,
  mapDispatchToActions, 
)(EstimatedCostContainer);

