import React, { PureComponent } from 'react';
import { object, array } from 'prop-types';

import SlyEvent from 'sly/web/services/helpers/events';
import CareTypeGuidePage from 'sly/web/components/pages/CareTypeGuidePage';
import { getGuideParams } from 'sly/web/services/helpers/search';
import { prefetch } from 'sly/web/services/api';
import { withProps } from 'sly/web/services/helpers/hocs';

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
      action: 'submit', category: 'guideMainPageHeroSearch', label: result.displayText,
    };
    SlyEvent.getInstance().sendEvent(event);

    const { history } = this.props;
    history.push(result.url);
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
