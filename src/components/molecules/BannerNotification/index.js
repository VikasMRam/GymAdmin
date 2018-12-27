import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';

import { palette as palettePropType } from 'sly/propTypes/palette';
import { Block } from 'sly/components/atoms';
import { size, palette } from 'sly/components/themes';

const getBackground = ({ type }) => palette(type, 'base');

const Wrapper = styled(Block)`
  background: ${getBackground};
  text-align: center;
  padding: ${size('spacing.large')};
`;

const BannerNotification = ({ children, palette }) => (
  <Wrapper type={palette} palette="white" weight="regular">
    {children}
  </Wrapper>
);

BannerNotification.propTypes = {
  children: node.isRequired,
  palette: palettePropType.isRequired,
};

BannerNotification.defaultProps = {
  palette: 'green',
};

export default BannerNotification;
