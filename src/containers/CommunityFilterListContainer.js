import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { object } from 'prop-types';

import CommunityFilterList from 'sly/components/organisms/CommunityFilterList';
import { getSearchParams } from 'sly/services/helpers/search';

class CommunityFilterListContainer extends Component {
  static contextTypes = { router: object };
  render() {
    return <CommunityFilterList {...this.props} />;
  }
}

const mapStateToProps = (state, { match, location }) => {
  const searchParams = getSearchParams(match, location);
  return { searchParams };
};


export default withRouter(connect(mapStateToProps)(CommunityFilterListContainer));
