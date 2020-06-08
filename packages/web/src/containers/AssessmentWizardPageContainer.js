import React, { Component } from 'react';
import { object } from 'prop-types';

import { community as communityPropType } from 'sly/web/propTypes/community';
import { prefetch } from 'sly/web/services/api';
import { parseURLQueryParams } from 'sly/web/services/helpers/url';
import AssesmentWizardPage from 'sly/web/components/pages/wizards/AssesmentWizardPage';

@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
  include: 'similar-communities',
}))

export default class AssessmentWizardPageContainer extends Component {
  static propTypes = {
    community: communityPropType.isRequired,
    location: object.isRequired,
  };

  render() {
    const { community, location: { search } } = this.props;
    const qp = parseURLQueryParams(search);

    return (
      <AssesmentWizardPage
        community={community}
        skipIntro={qp.skipIntro}
      />
    );
  }
}
