import React from 'react';
import { string } from 'prop-types';

import { Heading } from 'sly/common/system';

const MarketingPageTitle = ({title}) => (
  <>
    <Heading
      font="title-l"
      mb="xxl"
      sx$laptop={{  width: 'col4', mr: 'l' }}
    >
      {title}
    </Heading>
  </>
);

MarketingPageTitle.propTypes = {
  title: string,
};

export default MarketingPageTitle;
