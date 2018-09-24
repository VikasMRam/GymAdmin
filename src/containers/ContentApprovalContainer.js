import React, { Component } from 'react';
import { object, func, int } from 'prop-types';

import { getDetail } from 'sly/store/selectors';
import { resourceDetailReadRequest, resourceUpdateRequest } from 'sly/store/resource/actions';
import withServerState from 'sly/store/withServerState';

class ContentApprovalContainer extends Component {
  propTypes = {
    match: object,
    approveContent: func,
    errorCode: int,
  }

  constructor(props) {
    super(props);
    this.state = {
      message: 'Loading...',
    };
  }

  componentWillReceiveProps() {
    const { user, match, approveContent, errorCode } = this.props;
    const { params } = match;
    const { contentSlug } = params;
    console.log(user)
    if (errorCode === 401) {
      // Could not make history push to rail's signin
      window.location.href = '/signin';
    }
    approveContent(contentSlug).then(() => {
      this.setState({ message: 'Success' });
    }).catch((err) => {
      // console.log(err.response);
      const { response } = err;
      const { status } = response;
      if (status === 405) {
        this.setState({ message: 'Content Already Approved' });
      } else if (status === 403) {
        this.setState({ message: 'User Not Admin' });
      } else {
        this.setState({ message: 'Failure' });
      }
    });
  }

  render() {
    const { message } = this.state;
    return <div>{message}</div>;
  }
}

const mapStateToProps = (state) => {
  // const { match, location } = props;
  return {
    user: getDetail(state, 'user', 'me'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    approveContent: contentSlug => dispatch(resourceUpdateRequest('content', `${contentSlug}/`, { approve: true })),
  };
};

const fetchData = dispatch => dispatch(resourceDetailReadRequest('user', 'me'));

const handleError = (err) => {
  if (err.response) {
    if (err.response.status !== 200) {
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
})(ContentApprovalContainer);
