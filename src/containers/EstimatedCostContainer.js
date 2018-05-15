import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, number, func, bool } from 'prop-types';

import EstimatedCost from 'sly/components/molecules/EstimatedCost';
import { getDetailedPricing } from 'sly/store/concierge/actions';

class EstimatedCostContainer extends Component {
  static propTypes = {
    communityName: string.isRequired,
    price: number.isRequired,
    getDetailedPricing: func.isRequired,
    conversionSubmitted: bool.isRequired,
  };

  getPricing = () => {
    const { conversionSubmitted, getDetailedPricing } = this.props;
    getDetailedPricing({ conversionSubmitted });
  }

  render() {
    const { getDetailedPricing, ...props } = this.props;
    return (
      <EstimatedCost 
        getPricing={this.getPricing} 
        {...props} 
      />
    );
  }
}

const conversionSelector = (state) => state.form.ConversionForm || {};
const mapStateToProps = state => ({
  conversionSubmitted: !!conversionSelector(state).submitSucceeded, 
});

export default connect(
  mapStateToProps, 
  { getDetailedPricing }
)(EstimatedCostContainer);

