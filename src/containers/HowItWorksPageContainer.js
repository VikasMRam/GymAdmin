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

const HowItWorksPageContainer = ({ match }) => {
  if (match.params && match.params.type) {
    const content = contentMap[match.params.type];
    return <HowItWorksSecondPage {...content} />;
  }
  return <HowItWorksPage />;
};

HowItWorksPageContainer.propTypes = {
  match: object,
};

export default HowItWorksPageContainer;
