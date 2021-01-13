import React, { Component } from 'react';
import { object, func, string } from 'prop-types';
// import { connect } from 'react-redux';

import { generateSearchUrl } from 'sly/web/services/helpers/url';
import SlyEvent from 'sly/web/services/helpers/events';
// import { getSearchParams } from 'sly/web/components/search/helpers';
// import { getQueryParamsSetter } from 'sly/web/services/helpers/queryParams';
// import ModalController from 'sly/web/controllers/ModalController';
import HomePage from 'sly/web/components/homepage/HomePage';

class HomePageContainer extends Component {
  static propTypes = {
    history: object,
    setLocation: func,
    pathName: string,
    searchParams: object,
    setQueryParams: func,
    redirectTo: func.isRequired,
  };

  handleOnLocationSearch = (result, isFromModal) => {
    const { redirectTo } = this.props;
    let event;
    if (isFromModal) {
      event = {
        action: 'submit', category: 'freedomToExploreSearch', label: result.displayText,
      };
    } else {
      event = {
        action: 'submit', category: 'homeHeroSearch', label: result.displayText,
      };
    }
    SlyEvent.getInstance().sendEvent(event);
    if (result.action === 'redirect') {
      redirectTo(result.url);
    }
  };

  handleCurrentLocation = (addresses, { latitude, longitude }) => {
    const { redirectTo } = this.props;

    if (addresses.length) {
      const path = `${generateSearchUrl(['Nursing Homes'], addresses[0])}`;  // ?geo=${latitude},${longitude},10`;

      redirectTo(path);
    }
  };

  render() {
    const { searchParams, setQueryParams, pathName, history } = this.props;
    // const { modal, currentStep } = searchParams;
    return (
      // <ModalController>
      //   {({
      //     show,
      //     hide,
      //   }) => (
          <HomePage
            onLocationSearch={this.handleOnLocationSearch}
            // queryParams={{ modal, currentStep }}
            setQueryParams={setQueryParams}
            pathName={pathName}
            // showModal={show}
            // hideModal={hide}
            history={history}
            onCurrentLocation={this.handleCurrentLocation}
          />
      //   )}
      // </ModalController>
    );
  }
}

// const mapStateToProps = (state, {
//   match, location, history,
// }) => {
//   const searchParams = getSearchParams(match, location);
//   const setQueryParams = getQueryParamsSetter(history, location);
//   const { pathname } = location;
//   return {
//     searchParams,
//     setQueryParams,
//     pathName: pathname,
//   };
// };

// export default connect(mapStateToProps, null)(HomePageContainer);

export default HomePageContainer;