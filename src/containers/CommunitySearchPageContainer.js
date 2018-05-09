import React, { Component } from 'react';
import { string, bool } from 'prop-types';
import { merge, omit } from 'lodash';

import withServerState from 'sly/store/withServerState';

import { resourceListReadRequest } from 'sly/store/resource/actions';
import { getList } from 'sly/store/selectors';

import CommunitySearchPage from 'sly/components/pages/CommunitySearchPage';
import { getSearchParams } from 'sly/services/helpers/search'; 

class CommunitySearchPageContainer extends Component {
  // TODO Define Search Parameters
  toggleMap = () => {
    const event = { changedParams: { view: 'map' } };
    if (this.props.searchParams && this.props.searchParams.view === 'map') {
      event.changedParams = { view: 'list' };
    }
    this.changeSearchParams(event);
  };

  changeSearchParams = (fullEvent) => {
    // Changed search params
    const origParams = this.props.searchParams;
    const changedParams = fullEvent.changedParams;
    const fullParams = merge(origParams, changedParams);
    const newUri = parseParamsToFullPath(fullParams);
    // TODO: as we are using links now, we only use callbacks for internal state, 
    // so this should be this.setState, for example in sort
    this.props.history.push(newUri);
  };

  removeSearchFilters = (fullEvent) => {
    const paramsToRemove = fullEvent.paramsToRemove;
    const fullParams = omit(this.props.searchParams, paramsToRemove);

    const newUri = parseParamsToFullPath(fullParams);
    // TODO: as we are using links now, we only use callbacks for internal state, 
    // so this should be this.setState, for example in sort
    this.props.history.push(newUri);
  };

  render() {
    const {
      searchParams, error, communityList, requestMeta,
    } = this.props;
    // TODO Add Error Page
    if (error) {
      return <div>{error}</div>;
    }
    const isMapView = searchParams.view === 'map';
    return (
      <CommunitySearchPage
        isMapView={isMapView}
        requestMeta={requestMeta}
        toggleMap={this.toggleMap}
        searchParams={searchParams}
        onParamsChange={this.changeSearchParams}
        onParamsRemove={this.removeSearchFilters}
        communityList={communityList}
      />
    );
  }
}
function parseParamsToFullPath(params) {
  let path = `/${params.toc}/${params.state}/${params.city}?`;
  Object.keys(params).map((key) => {
    if (
      [
        'size',
        'budget',
        'sort',
        'page-number',
        'page-size',
        'radius',
        'view',
        'latitude',
        'longitude',
        'searchOnMove',
      ].indexOf(key) > -1
    ) {
      const value = params[key];
      if (value !== '' && value !== undefined) {
        path += `${key}=${value}&`;
      }
    }
  });
  path = path.replace(/&$/, '');
  return path;
}

const mapStateToProps = (state, { match, location }) => {
  const searchParams = getSearchParams(match, location);
  return {
    searchParams,
    communityList: getList(state, 'searchResource'),
  };
};

const fetchData = (dispatch, { match, location }) => {
  const searchParams = getSearchParams(match, location);
  console.log('searchParams', searchParams);
  return dispatch(resourceListReadRequest('searchResource', searchParams));
};

const handleError = (err) => {
  if (err.response.status === 404) {
    return { error: 'Unknown City and State!' };
  }
  throw err;
};

export default withServerState({
  mapStateToProps,
  fetchData,
  handleError,
})(CommunitySearchPageContainer);
