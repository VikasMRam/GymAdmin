import React, { Component } from 'react';
import { object, func } from 'prop-types';

import SlyEvent from 'sly/services/helpers/events';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/agents';
import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import { getDetail } from 'sly/store/selectors';
import withServerState from 'sly/store/withServerState';
import AgentsPage from 'sly/components/pages/AgentsPage';

class AgentsPageContainer extends Component {
  static propTypes = {
    history: object,
    postUserAction: func.isRequired,
    userAction: object,
  };

  handleLocationSearch = (result) => {
    const { history } = this.props;
    const event = {
      action: 'submit', category: 'agentsSearch', label: result.formatted_address,
    };
    SlyEvent.getInstance().sendEvent(event);

    const searchParams = getSearchParamFromPlacesResponse(result);
    const { path } = filterLinkPath(searchParams);
    history.push(path);
  };

  render() {
    const { handleLocationSearch } = this;
    const { postUserAction, userAction } = this.props;
    if (!userAction) {
      return null;
    }
    return (
      <AgentsPage
        onLocationSearch={handleLocationSearch}
        postUserAction={postUserAction}
        userDetails={userAction.userDetails}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userAction: getDetail(state, 'userAction'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
  };
};

const fetchData = (dispatch) => {
  return Promise.all([
    dispatch(resourceDetailReadRequest('userAction')),
  ]);
};

const handleError = (err) => {
  if (err.response) {
    if (err.response.status !== 200) {
      if (err.location) {
        const redUrl = err.location.split('/');
        return {
          errorCode: err.response.status,
          redirectUrl: redUrl[redUrl.length - 1],
        };
      }
      return { errorCode: err.response.status };
    }
    return { errorCode: null };
  }
  throw err;
};

export default withServerState({
  mapStateToProps,
  mapDispatchToProps,
  fetchData,
  handleError,
})(AgentsPageContainer);
