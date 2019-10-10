import React, { PureComponent } from 'react';
import { object, array } from 'prop-types';
import { Redirect } from 'react-router-dom';


import SlyEvent from 'sly/services/helpers/events';
import CareTypeRegionGuidePage from 'sly/components/pages/CareTypeRegionGuidePage';
import { getSearchParamFromPlacesResponse, filterLinkPath, getGuideParams } from 'sly/services/helpers/search';
import { prefetch } from 'sly/services/newApi';
import { withProps } from 'sly/services/helpers/hocs';

@withProps(({ match }) => ({
  searchParams: getGuideParams(match),
}))

@prefetch('guideList', 'getGeoGuides', (request, { searchParams }) => request(searchParams))

export default class CareTypeRegionGuidePageContainer extends PureComponent {
  static propTypes = {
    history: object.isRequired,
    guideList: array,
    serverState: object,
    searchParams: object.isRequired,
  };

  handleOnLocationSearch = (result) => {
    const event = {
      action: 'submit', category: 'guideMainPageHeroSearch', label: result.formatted_address,
    };
    SlyEvent.getInstance().sendEvent(event);

    const { history } = this.props;
    const searchParams = getSearchParamFromPlacesResponse(result);
    const { path } = filterLinkPath(searchParams, {});
    history.push(path);
  };

  render() {
    const {
      guideList,
      serverState,
      searchParams,
    } = this.props;

    if (serverState instanceof Error) {
      return <Redirect to="/assisted-living-guides" />;
    }

    const geoGuide = guideList && guideList.length > 0 ? guideList[0] : {};

    return (
      <CareTypeRegionGuidePage
        onLocationSearch={this.handleOnLocationSearch}
        geoGuide={geoGuide}
        searchParams={searchParams}
      />
    );
  }
}
