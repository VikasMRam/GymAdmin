import React, { useMemo } from 'react';
import { object } from 'prop-types';

import SlyEvent from 'sly/web/services/helpers/events';
import AgentRegionPage from 'sly/web/components/pages/AgentRegionPage';
import Flex from 'sly/common/system/Flex';
import Image from 'sly/common/system/Image';
import { useNotification } from 'sly/web/components/helpers/notification';
import { getAgentParams } from 'sly/web/components/search/helpers';
import { assetPath } from 'sly/web/components/themes';
import { getAgentUrl, urlize } from 'sly/web/services/helpers/url';
import { titleize } from 'sly/web/services/helpers/strings';
import { usePrefetch }  from 'sly/web/services/api/prefetch';
import { NOTIFY_AGENT_RECEIVED_REQUEST } from 'sly/web/constants/notifications';

const AgentRegionPageContainer = ({
  history,
  match,
}) => {
  const { notifyInfo } = useNotification();

  const { location } = history;
  const citySlug = match.params.city;

  const { requestInfo: {
    normalized,
    hasFinished,
  } } = usePrefetch('getAgents', getAgentParams(match, location));

  const newAgentsList = useMemo(() => (normalized || [])
    .filter(agent => agent.status > 0)
    .map((agent) => {
      const url = getAgentUrl(agent);
      const newAgent = { ...agent, url };
      return newAgent;
    }), [normalized]);

  let locationName;

  if (citySlug) {
    locationName = titleize(citySlug);
    const cityParts = citySlug.split('-');
    if (cityParts.length > 1) {
      const state = cityParts.pop();
      const city = cityParts.join('-');
      locationName = `${titleize(city)} ${state.toUpperCase()}`;
    }
  } else {
    locationName = titleize(match.params.region);
  }

  const handleLocationSearch = (result) => {
    const event = {
      action: 'submit', category: 'agentsSearch', label: result.displayText,
    };

    SlyEvent.getInstance().sendEvent(event);
    const [city, state] = result.name.split(', ');
    history.push(`/agents/region/${urlize(city)}-${state}`);
  };

  const title = `${locationName} Partner Agents`;

  if (!hasFinished) {
    return (
      <Flex
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={assetPath('images/homebase/loader.svg')} />
      </Flex>
    );
  }

  return (
    <AgentRegionPage
      onLocationSearch={handleLocationSearch}
      agentsList={newAgentsList}
      title={title}
      locationName={locationName}
      isRegionPage={!citySlug}
      location={location}
      onConsultationRequested={() => notifyInfo(NOTIFY_AGENT_RECEIVED_REQUEST)}
    />
  );
};

AgentRegionPageContainer.propTypes = {
  match: object,
  history: object,
};

export default AgentRegionPageContainer;
