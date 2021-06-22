import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';

import useCommunity from 'sly/web/profile/hooks/useCommunity';
import { useQuery } from 'sly/web/services/api';
import { parseURLQueryParams } from 'sly/web/services/helpers/url';
import { WIZARD_STEP_COMPLETED } from 'sly/web/services/api/constants';
import AssessmentWizardPage from 'sly/web/assessment/AssessmentWizardPage';

export default function AssessmentWizardPageContainer() {
  const { city, state, toc, communitySlug } = useParams();
  const location = useLocation();

  const {
    community,
    requestInfo,
  } = useCommunity({
    communitySlug: communitySlug || 'none',
    shouldBail: !communitySlug,
  });

  const createAction = useQuery('createUuidAction');

  const qp = parseURLQueryParams(location.search);
  useEffect(() => {
    createAction({
      type: 'UUIDAction',
      attributes: {
        actionType: WIZARD_STEP_COMPLETED,
        actionPage: location.pathname,
        actionInfo: {
          stepName: `step-0:${qp.entry}`,
          wizardName: 'assessmentWizard',
          data: qp,
        },
      },
    });
  }, []);

  const skipIntro = qp.skipIntro && qp.skipIntro !== 'false' ? !!qp.skipIntro : false;
  // wizard can be entered from many places/modes
  const entry = qp.entry || qp.layout || 'page';

  if (requestInfo && requestInfo.hasStarted && !requestInfo.hasFinished) {
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
      cta={qp.cta}
    />
  );
}
