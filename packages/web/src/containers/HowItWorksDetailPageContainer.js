import React from 'react';
import { object } from 'prop-types';

import HowItWorksDetailPage from 'sly/web/components/pages/HowItWorksDetailPage';
import { howItWorksContents } from 'sly/web/services/helpers/howItWorks';

const HowItWorksDetailPageContainer = ({ match, history }) => {
  const { type } = match.params;
  const content = howItWorksContents[type];
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
