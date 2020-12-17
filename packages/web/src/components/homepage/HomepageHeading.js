import React from 'react';
import styled, { css } from 'styled-components';

import Heading from 'sly/common/components/atoms/Heading';

import { startingWith } from 'sly/common/components/helpers';

const HomepageHeading = styled(Heading)` 
  font-size: 28px;
  line-height: 36px;
  ${startingWith('tablet', css`
    font-size: 40px;
    line-height: 48px;
  `)}
`;

export default HomepageHeading;