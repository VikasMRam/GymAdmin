import React, { Component } from 'react';
import { object } from 'prop-types';
import { branch } from 'recompose';

import { community as communityPropType } from 'sly/web/propTypes/community';
import { prefetch } from 'sly/web/services/api';
import { parseURLQueryParams } from 'sly/web/services/helpers/url';
import AssesmentWizardPage from 'sly/web/components/pages/wizards/AssesmentWizardPage';

@branch(
  ({ match }) => match.params.communityId,
  prefetch('community', 'getCommunity', (req, { match }) => req({
    id: match.params.communityId,
    include: 'similar-communities',
  })),
)

export default class AssessmentWizardPageContainer extends Component {
  static propTypes = {
    community: communityPropType,
    status: object,
    match: object,
    location: object.isRequired,
  };

  render() {
    const { community, location: { search }, status, match: { params: { city, state } } } = this.props;
    let hasFinished = true;
    const qp = parseURLQueryParams(search);

    if (status) {
      ({ hasFinished } = status.community);
    }
    if (!hasFinished) {
      return null;
    }

    return (
      <AssesmentWizardPage
        community={community}
        skipIntro={qp.skipIntro}
        hasTip={qp.hasTip !== 'false'}
        city={city}
        state={state}
      />
    );
  }
}
