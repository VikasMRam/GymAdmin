import React, { Component } from 'react';
import { object, func, string } from 'prop-types';
import { connect } from 'react-redux';

import SlyEvent from 'sly/services/helpers/events';
import { filterLinkPath, getSearchParamFromPlacesResponse } from 'sly/services/helpers/agents';
import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import { getDetail } from 'sly/store/selectors';
import withServerState from 'sly/store/withServerState';
import AgentsPage from 'sly/components/pages/AgentsPage';

class AgentsPageContainer extends Component {
  static propTypes = {
    history: object,
    postUserAction: func.isRequired,
    userAction: object,
    pathName: string.isRequired,
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
    const { postUserAction, userAction, pathName } = this.props;
    if (!userAction) {
      return null;
    }
    return (
      <AgentsPage
        onLocationSearch={handleLocationSearch}
        postUserAction={postUserAction}
        userDetails={userAction.userDetails}
        pathName={pathName}
      />
    );
  }
}

const mapStateToProps = (state, { location }) => {
  const { pathname } = location;
  return {
    userAction: getDetail(state, 'userAction') || {},
    pathName: pathname,
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
  fetchData,
  handleError,
})(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AgentsPageContainer));
