import React from 'react';
import { object } from 'prop-types';

import HowItWorksPage from 'sly/components/pages/HowItWorksPage/index';
import HowItWorksSecondPage from 'sly/components/pages/HowItWorksPage/second';
import { ForFamilies } from 'sly/services/helpers/how_it_works';

import { assetPath } from 'sly/components/themes';

const contentMap = {};

contentMap['for-families'] = {
  heading: 'Find a Home to Love',
  subheading: `Follow the simple steps below to search, compare, and connect 
      with the senior living community that matches your needs.`,
  contents: ForFamilies,
  imageUrl: assetPath('images/how-it-works/for-families.png'),
};
contentMap['for-communities'] = {
  heading: 'List Your Community',
  subheading: `Follow the simple steps below to search, compare, and connect 
  with the senior living community that matches your needs.`,
  contents: ForFamilies,
  imageUrl: assetPath('images/how-it-works/hero.png'),
};
contentMap['for-agents'] = {
  heading: 'For Agents',
  subheading: 'Foo !== Bar',
  contents: ForFamilies,
  imageUrl: assetPath('images/how-it-works/hero.png'),
};

const tabs = [
  {
    key: 'for-families',
    text: 'For Families',
    url: '/how-it-works/for-families',
  },
  {
    key: 'for-communities',
    text: 'For Communities',
    url: '/how-it-works/for-communities',
  },
  {
    key: 'for-agents',
    text: 'For Agents',
    url: '/how-it-works/for-agents',
  },
];

const HowItWorksPageContainer = ({ match, history }) => {
  if (match.params && match.params.type) {
    const { type } = match.params;
    const content = contentMap[type];
    const onTabClick = tab => history.push(tab.url);
    return <HowItWorksSecondPage {...content} tabs={tabs} activeType={type} onTabClick={onTabClick} />;
  }
  return <HowItWorksPage />;
};

HowItWorksPageContainer.propTypes = {
  match: object,
  history: object,
};

export default HowItWorksPageContainer;
