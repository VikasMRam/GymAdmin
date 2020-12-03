import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';

import { isBrowser } from 'sly/web/config';
import { getKey } from 'sly/common/components/themes';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import { ASSESSMENT_WIZARD_MATCHED_AGENT, ASSESSMENT_WIZARD_COMPLETED }
  from 'sly/web/constants/wizards/assessment';
import Grid from 'sly/common/components/atoms/Grid';
import SeoLinks from 'sly/web/components/organisms/SeoLinks';
import GetAssessmentBoxContainer from 'sly/web/containers/GetAssessmentBoxContainer';
import SearchExploreTypes from 'sly/web/components/organisms/SearchExploreTypes';
import { titleize } from 'sly/web/services/helpers/strings';


function ExploreContainer({ filters }) {
  const { requestInfo } = usePrefetch('getGeoGuides', request => request(filters, { encode: false }));

  const [geoGuides, setGeoGuides] = useState(requestInfo.normalized);
  useEffect(() => {
    if (requestInfo.hasFinished && geoGuides !== requestInfo.normalized) {
      setGeoGuides(requestInfo.normalized);
    }
  }, [requestInfo]);

  const geoGuide = geoGuides ? geoGuides[0] : {};
  const guideContent = geoGuide && geoGuide.guideContent;
  const hasGeoGuideContent = guideContent && !(guideContent.ownGuidePage && guideContent.ownGuidePage === 'true');

  const title = filters.city ? `${titleize(filters.city)}, ${titleize(filters.state)}` : titleize(filters.state);

  return (
    <Grid
      background="primary.lighter-95"
      padding={['xxxLarge', 'xLarge']}
      flow="row"
      gap="xxxLarge"
      upToTablet={{
        gridGap: getKey('sizes.spacing.xxLarge'),
        paddingTop: getKey('sizes.spacing.xxLarge'),
        paddingBottom: getKey('sizes.spacing.xxLarge'),
      }}
    >
      {hasGeoGuideContent && guideContent.seoLinks && (
        <SeoLinks
          title={`Assisted Living Facilities near ${title}`}
          links={guideContent.seoLinks}
        />
      )}
      <SearchExploreTypes title={`Explore other types of communities in  ${title}`} city={filters.city} state={filters.state}/>
      { filters.city &&
      <GetAssessmentBoxContainer
        completedAssessment={isBrowser && !!localStorage.getItem(ASSESSMENT_WIZARD_COMPLETED)}
        agentId={isBrowser ? (localStorage.getItem(ASSESSMENT_WIZARD_MATCHED_AGENT) || '') : ''}
        startLink={`/wizards/assessment/location/${filters.state}/${filters.city}?skipIntro=true`}
      />
      }

    </Grid>
  );
}

ExploreContainer.propTypes = {
  filters: object,
};

export default ExploreContainer;
