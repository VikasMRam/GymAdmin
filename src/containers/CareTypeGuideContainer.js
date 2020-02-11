import React, { PureComponent } from 'react';
import { object, array } from 'prop-types';

import SlyEvent from 'sly/services/helpers/events';
import CareTypeGuidePage from 'sly/components/pages/CareTypeGuidePage';
import { getSearchParamFromPlacesResponse, filterLinkPath, getGuideParams } from 'sly/services/helpers/search';
import { prefetch } from 'sly/services/newApi';
import { withProps } from 'sly/services/helpers/hocs';

@withProps(({ match }) => ({
  searchParams: getGuideParams(match),
}))

@prefetch('guideList', 'getGeoGuides', (request, { searchParams }) => request(searchParams))

export default class CareTypeGuidePageContainer extends PureComponent {
  static propTypes = {
    history: object.isRequired,
    guideList: array,
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
      searchParams,
    } = this.props;

    return (
      <CareTypeGuidePage
        onLocationSearch={this.handleOnLocationSearch}
        guideList={guideList}
        searchParams={searchParams}
      />
    );
  }
}
