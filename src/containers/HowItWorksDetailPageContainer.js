import React from 'react';
import { object } from 'prop-types';

import HowItWorksPage from 'sly/components/pages/HowItWorksPage';
import HowItWorksDetailPage from 'sly/components/pages/HowItWorksDetailPage';
import { ForFamilies } from 'sly/services/helpers/howItWorks';

import { assetPath } from 'sly/components/themes';

const contentMap = {
  consumers: {
    heading: 'Find a Home to Love',
    subheading: `Follow the simple steps below to search, compare, and connect 
        with the senior living community that matches your needs.`,
    contents: ForFamilies,
    imageUrl: 'images/how-it-works/for-families.png',
    tabText: 'For Families',
    url: '/how-it-works/consumers',
  },
  providers: {
    heading: 'List Your Community',
    subheading: `Follow the simple steps below to search, compare, and connect 
        with the senior living community that matches your needs.`,
    contents: ForFamilies,
    imageUrl: 'images/how-it-works/hero.png',
    tabText: 'For Communities',
    url: '/how-it-works/providers',
  },
  agents: {
    heading: 'For Agents',
    subheading: 'Foo !== Bar',
    contents: ForFamilies,
    imageUrl: 'images/how-it-works/hero.png',
    tabText: 'For Agents',
    url: '/how-it-works/for-agents',
  },
};

const HowItWorksDetailPageContainer = ({ match, history }) => {
  const { type } = match.params;
  const content = contentMap[type];
  const onTabClick = tab => history.push(tab.url);

  return (
    <HowItWorksDetailPage
      tabs={tabs}
      activeType={type}
      onTabClick={onTabClick}
      {...content}
    />
  );
};

HowItWorksDetailPageContainer.propTypes = {
  match: object,
  history: object,
};

export default HowItWorksDetailPageContainer;
