import React from 'react';

import HowItWorksPage from 'sly/components/pages/HowItWorksPage/index';
import ForFamilies from 'sly/components/pages/HowItWorksPage/families';

const HowItWorksPageContainer = ({ location }) => {
  console.log(location);
  const heading = 'Find a Home to Love';
  const subheading = `Follow the simple steps below to search, compare, and connect 
    with the senior living community that matches your needs.`;
  return (
    // <ForFamilies heading={heading} subheading={subheading} />
    <HowItWorksPage />
  );
};

export default HowItWorksPageContainer;
