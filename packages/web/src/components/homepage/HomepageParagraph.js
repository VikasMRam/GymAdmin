import React from 'react';
import styled, { css } from 'styled-components';

import Paragraph from 'sly/common/components/atoms/Paragraph';

import { startingWith, withSpacing } from 'sly/common/components/helpers';

const HomepageParagraph = styled.p` 
  ${withSpacing}
  font-size: 18px;
  line-height: 28px;
  ${startingWith('tablet', css`
    font-size: 20px;
    line-height: 32px;
  `)}
`;

export default HomepageParagraph;