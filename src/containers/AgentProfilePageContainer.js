import React from 'react';

import AgentProfilePage from 'sly/components/pages/AgentProfilePage';

const agent = {
  id: 'cataldi-manor-ref-agent-rcfe',
  aggregateRating: null,
  info: {
    bio: 'Sample Agent Bio',
    chosenReview: 'My Review',
    citiesServed: [
      'San Jose',
      'San Francisco',
    ],
    displayName: 'Sush Cat',
    profileImageUrl: 'https://d1qiigpe5txw4q.cloudfront.net/uploads/362a5be1e0e2e9a510b7b4c1344f9eff/DSC_1235_sm_sd.jpg',
    recentFamiliesHelped: 0,
    slyPhone: '4159978742',
  },
  name: 'Cataldi Manor Ref Agent RCFE',
  status: 3,
};

const AgentProfilePageContainer = () => <AgentProfilePage agent={agent} />;

export default AgentProfilePageContainer;
