import React from 'react';
import { node } from 'prop-types';

import { Flex } from 'sly/common/system';

const MarketingPageWrapper = ({children}) => (
  <>
    <Flex
          margin="xxl m"
          justifyContent="center"
          alignItems="baseline"
          flexDirection="column"
          sx$tablet={{
            margin: 'xxxl l',
          }}
          sx$laptop={{
            flexDirection: 'row',
            margin: 'xxxl 0',
            alignItems: 'flex-start',
          }}
      >
        {children}
      </Flex>
  </>
);

MarketingPageWrapper.propTypes = {
  children: node,
};

export default MarketingPageWrapper;
