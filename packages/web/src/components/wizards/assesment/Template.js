import React  from 'react';
import styled from 'styled-components';
import { node, string } from 'prop-types';

import { size } from 'sly/web/components/themes';

export const Wrapper = styled.main`
  display: grid;
  grid-template-columns: ${size('layout.col6')} ${size('layout.col4')};
  grid-gap: ${size('layout.gutter')};
`;

