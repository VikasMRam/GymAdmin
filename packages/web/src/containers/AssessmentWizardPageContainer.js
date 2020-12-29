import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { branch } from 'recompose';

import { community as communityPropType } from 'sly/common/propTypes/community';
import { prefetch, query } from 'sly/web/services/api';
import { parseURLQueryParams } from 'sly/web/services/helpers/url';
import { WIZARD_STEP_COMPLETED } from 'sly/web/services/api/constants';
import AssessmentWizardPage from 'sly/web/components/pages/wizards/AssessmentWizardPage';

@branch(
  ({ match }) => match.params.communityId,
  prefetch('community', 'getCommunity', (req, { match }) => req({
    id: match.params.communityId,
    include: 'similar-communities',
  })),
)
@query('createAction', 'createUuidAction')

export default class AssessmentWizardPageContainer extends Component {
  static propTypes = {
    community: communityPropType,
    status: object,
    match: object,
    location: object.isRequired,
    createAction: func,
  };

  componentDidMount() {
    // Add a uuid action
    const { location: { search, pathname }, createAction } = this.props;
    const qp = parseURLQueryParams(search);

    createAction({
      type: 'UUIDAction',
      attributes: {
        actionType: WIZARD_STEP_COMPLETED,
        actionPage: pathname,
        actionInfo: {
          stepName: `step-0:${qp.entry}`,
          wizardName: 'assessmentWizard',
          data: qp,
        },
      },
    });
  }
  render() {
    const { community, location: { search }, status, match: { params: { city, state, toc } } } = this.props;
    let hasFinished = true;
    const qp = parseURLQueryParams(search);
    const skipIntro = qp.skipIntro && qp.skipIntro !== 'false' ? !!qp.skipIntro : false;
    // wizard can be entered from many places/modes
    let entry = 'page';
    if (qp.layout) {
      entry = qp.layout;
    }
    if (qp.cta) {
      entry = qp.cta;
    }
    if (qp.entry) {
      entry = qp.entry;
    }
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
        entry={entry}
      />
    );
  }
}
