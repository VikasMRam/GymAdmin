import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import sanitizeHtml from 'sanitize-html';

import { isBrowser } from 'sly/web/config';
import { getKey } from 'sly/common/components/themes';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import { ASSESSMENT_WIZARD_MATCHED_AGENT, ASSESSMENT_WIZARD_COMPLETED }
  from 'sly/web/constants/wizards/assessment';
import { Grid } from 'sly/common/system';
import SeoLinks from 'sly/web/components/organisms/SeoLinks';
import GetAssessmentBoxContainer from 'sly/web/containers/GetAssessmentBoxContainer';
import SearchExploreTypes from 'sly/web/components/organisms/SearchExploreTypes';
import { titleize } from 'sly/web/services/helpers/strings';
import { getTocSeoLabel } from 'sly/web/components/search/helpers';

const citiesToShowGeoGuide = ['new-york', 'miami', 'las-vegas', 'san-francisco', 'madison', 'scottsdale', 'skokie', 'columbus', 'orlando', 'atlanta', 'san-jose', 'kendall'];


function ExploreContainer({ filters }) {
  const { requestInfo } = usePrefetch('getGeoGuides', filters, { encode: false });

  const [geoGuides, setGeoGuides] = useState(requestInfo.normalized);
  useEffect(() => {
    if (requestInfo.hasFinished && geoGuides !== requestInfo.normalized) {
      setGeoGuides(requestInfo.normalized);
    }
  }, [requestInfo]);

  const geoGuide = geoGuides ? geoGuides[0] : {};
  const tocLabel = getTocSeoLabel(filters.toc);
  const seoLinks = geoGuide && geoGuide.guideContent && geoGuide.guideContent.seoLinks;

  let guide;
  if (filters?.city && citiesToShowGeoGuide.includes(filters.city) && geoGuide?.guideContent?.guide) {
    guide = sanitizeHtml(geoGuide.guideContent.guide);
  }

  const title = filters.city ? `${titleize(filters.city)}, ${titleize(filters.state)}` : titleize(filters.state);

  return (
    <Grid
      background="primary.lighter-95"
      flexDirection="row"
      gridGap="xl"
      padding="xl l"
      sx$laptop={{
        gridGap: 'xxl',
        paddingY: 'xxl',
      }}
    >
      {guide && <div dangerouslySetInnerHTML={{ __html: guide }} />}
      {seoLinks && (
        <SeoLinks
          title={`${tocLabel} near ${title}`}
          links={seoLinks}
        />
      )}
      <SearchExploreTypes title={`Explore other types of communities in  ${title}`} city={filters.city} state={filters.state} />
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
