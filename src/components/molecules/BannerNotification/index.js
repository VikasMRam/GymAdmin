import React from 'react';
import { oneOf, node } from 'prop-types';
import styled from 'styled-components';

import { Block } from 'sly/components/atoms';
import { size, palette, getKey } from 'sly/components/themes';

const getBackground = ({ type }) => palette(type, 'base');

const Wrapper = styled(Block)`
  background: ${getBackground};
  text-align: center;
  padding: ${size('spacing.large')};
`;

const BannerNotification = ({ children, palette }) => (
  <Wrapper type={palette} palette="white" weight="medium">
    {children}
  </Wrapper>
);

BannerNotification.propTypes = {
  children: node.isRequired,
  palette: oneOf(Object.keys(getKey('palette'))).isRequired,
};

BannerNotification.defaultProps = {
  palette: 'green',
};

export default BannerNotification;
