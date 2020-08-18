import React, { Component } from 'react';
import { object } from 'prop-types';
import { branch } from 'recompose';

import { community as communityPropType } from 'sly/common/propTypes/community';
import { prefetch } from 'sly/web/services/api';
import { parseURLQueryParams } from 'sly/web/services/helpers/url';
import AssessmentWizardPage from 'sly/web/components/pages/wizards/AssessmentWizardPage';

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
    const { community, location: { search }, status, match: { params: { city, state, toc, } } } = this.props;
    let hasFinished = true;
    const qp = parseURLQueryParams(search);
    const skipIntro = qp.skipIntro && qp.skipIntro !== 'false' ? !!qp.skipIntro : false;

    if (status) {
      ({ hasFinished } = status.community);
    }
    if (!hasFinished) {
      return null;
    }

    return (
      <AssessmentWizardPage
        community={community}
        skipIntro={skipIntro}
        hasTip={qp.hasTip !== 'false'}
        city={city}
        state={state}
        toc={toc}
        version={qp.version}
      />
    );
  }
}
