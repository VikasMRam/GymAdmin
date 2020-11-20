import React, { PureComponent } from 'react';
import { object, array } from 'prop-types';
import { Redirect } from 'react-router-dom';

import SlyEvent from 'sly/web/services/helpers/events';
import CareTypeRegionGuidePage from 'sly/web/components/pages/CareTypeRegionGuidePage';
import { getGuideParams } from 'sly/web/components/search/helpers';
import { prefetch } from 'sly/web/services/api';
import { withProps } from 'sly/web/services/helpers/hocs';

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
      action: 'submit', category: 'guideMainPageHeroSearch', label: result.displayText,
    };
    SlyEvent.getInstance().sendEvent(event);

    const { history } = this.props;
    history.push(result.url);
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
