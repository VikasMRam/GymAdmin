import React, { Component } from 'react';
import { string } from 'prop-types';

import  withServerState from 'sly/store/withServerState';

import getSearchUrl from 'sly/services/helpers/url';
import { resourceListReadRequest } from "sly/store/resource/actions";
import { getList } from "sly/store/selectors";
import CommunitySearchPage from "sly/components/pages/CommunitySearchPage";

class CommunitySearchPageContainer extends Component {
  static propTypes = {
    city:string,
    state:string,
    toc:string,
    error:string,
  };

  render() {
    const { city, state,toc, error, communityList } = this.props;
    //TODO Add Error Page
    if (error) {
      return (
        <div>
          {error}
        </div>
      );
    }


    return <CommunitySearchPage communityList={communityList}/> ;



  }
}

const mapStateToProps = (state, { match }) => {
  return {
    city: match.params.city,
    state: match.params.state,
    toc: match.params.careType,
    communityList: getList(state,'search')

  };
};

const fetchData = (dispatch,  { match } ) =>{
  return dispatch(resourceListReadRequest('search', getSearchUrl(match.params)))
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
