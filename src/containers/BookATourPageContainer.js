import React, { Component } from 'react';
import { object } from 'prop-types';

import { connectController } from 'sly/controllers';
import withServerState from 'sly/store/withServerState';
import { getDetail } from 'sly/store/selectors';
import { resourceDetailReadRequest } from 'sly/store/resource/actions';

import BookATourConfirmationPage from 'sly/components/pages/BookATourConfirmationPage/index';
import { getCitySearchUrl } from 'sly/services/helpers/url';

class BookATourPageContainer extends Component {
  handleConfirmationPageOnButtonClick = () => {
    const { community, history } = this.props;
    const {
      propInfo,
      address,
    } = community;
    const searchPageUrl = getCitySearchUrl({ propInfo, address });
    history.push(searchPageUrl);
  }
  render() {
    const { community } = this.props;
    if (!community) {
      return null;
    }
    const {
      name,
      similarProperties,
      mainImage,
    } = community;
    const appointmentText = 'Blah';
    // TODO: Implement BookATour Page flow
    return (
      <BookATourConfirmationPage
        communityName={name}
        communityImageUrl={mainImage}
        similarCommunities={similarProperties}
        appointmentText={appointmentText}
        onButtonClick={this.handleConfirmationPageOnButtonClick}
      />
    );
  }
}

BookATourPageContainer.propTypes = {
  community: object,
  user: object,
  history: object,
};

const getCommunitySlug = match => match.params.communitySlug;
const mapStateToProps = (state, { match }) => {
  const communitySlug = getCommunitySlug(match);
  return {
    user: getDetail(state, 'user', 'me'),
    community: getDetail(state, 'community', communitySlug),
  };
};

const fetchData = (dispatch, { match }) =>
  Promise.all([
    dispatch(resourceDetailReadRequest('community', getCommunitySlug(match), {
      include: 'similar-communities',
    })),
  ]);

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
})(connectController(
  mapStateToProps,
  null,
)(BookATourPageContainer));
