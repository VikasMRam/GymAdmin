import React, { Component } from 'react';
import { string, bool } from 'prop-types';

import  withServerState from 'sly/store/withServerState';

import { resourceListReadRequest } from "sly/store/resource/actions";
import { getList } from "sly/store/selectors";
import CommunitySearchPage from "sly/components/pages/CommunitySearchPage";

class CommunitySearchPageContainer extends Component {
  static propTypes = {
    city:string,
    state:string,
    toc:string,
    mapView:bool,
    error:string,

  };
  state = {
    mapView: this.props.mapView,
  };

  toggleMap = () =>{
    this.setState({
      mapView:!this.state.mapView,
    });
  }

  render() {
    const {  searchParams, error, communityList } = this.props;
    const { isMapView } = this.state;
    console.log("Seeing filters seen here",searchParams);
    //TODO Add Error Page
    if (error) {
      return (
        <div>
          {error}
        </div>
      );
    }

    return <CommunitySearchPage isMapView={isMapView} toggleMap={this.toggleMap} searchParams={searchParams} communityList={communityList}/> ;

  }
}

function parseQueryStringToFilters(qs) {
  let ret = Object.create(null);
  let input = qs;
  input = input.trim().replace(/^[?#&]/, '');

  if (!input) {
    return ret;
  }

  for (const param of input.split('&')) {
    let [key, value] = param.replace(/\+/g, ' ').split('=');
    if (['size','budget','sort'].indexOf(key) > -1) {
      // Missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      value = value === undefined ? null : decodeURIComponent(value);
      ret[key] = value;
    }
  }
  return ret;

}

const mapStateToProps = (state, { match, location }) => {
  //Maybe i can read this from just the response? and not have to repeat myself?
  let searchParams = {};
  Object.assign(searchParams,match.params,parseQueryStringToFilters(location.search))
  return {
    searchParams,
    communityList: getList(state,'searchResource')
  };
};

const fetchData = (dispatch,  { match, location }) =>{
  let searchParams = {};
  Object.assign(searchParams,match.params,parseQueryStringToFilters(location.search))
  return dispatch(resourceListReadRequest('searchResource', searchParams))
};

const handleError = err => {
  if (err.response.status === 404) {
    return { error: 'Unknown City and State!' };
  }
  throw err;
};

export default withServerState({
  mapStateToProps,
  fetchData,
  handleError
})(CommunitySearchPageContainer);
