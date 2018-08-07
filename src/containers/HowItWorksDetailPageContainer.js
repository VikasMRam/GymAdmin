import React from 'react';
import { object } from 'prop-types';

import HowItWorksPage from 'sly/components/pages/HowItWorksPage';
import HowItWorksDetailPage from 'sly/components/pages/HowItWorksDetailPage';
import { howItWorksContents } from 'sly/services/helpers/howItWorks';

import { assetPath } from 'sly/components/themes';

const HowItWorksDetailPageContainer = ({ match, history }) => {
  const { type } = match.params;
  const content = howItWorksContents[type];
  console.log({type, content});
  const onTabClick = tab => history.push(tab.url);

  return (
    <HowItWorksDetailPage
      tabs={howItWorksContents}
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
