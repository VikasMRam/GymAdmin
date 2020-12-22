import React from 'react';
import { func, string } from 'prop-types';
import styled, { css } from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import {  assetPath } from 'sly/web/components/themes';
import { withShadow, startingWith } from 'sly/common/components/helpers';
import { Block, Grid } from 'sly/common/components/atoms';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import IconButton from 'sly/common/components/molecules/IconButton';

const WelcomeBannerGrid = styled.div`
  ${withShadow}
  position: relative;
  padding-right: 24px;
  margin-bottom: ${size('spacing.xLarge')};
  background-color: ${palette('white', 'base')}; 
  ${startingWith('tablet', css`
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto 280px;
    grid-template-areas: 
      "heading image"
      "body image";
  `)}


  ${startingWith('laptop', css`
    padding-right: 60px;
  `)}
`;

const WelcomeBanner = ({ onClose, title, description }) => (
  <WelcomeBannerGrid>
    <Block padding="large" size="subtitle" gridArea="heading"> {title} </Block>
    <Block padding="large" gridArea="body">{description}</Block>
    <ResponsiveImage gridArea="image" aspectRatio="3:2" src={assetPath('images/homebase/welcome.png')} />
    <IconButton
      icon="close"
      onClick={onClose}
      ghost
      palette="black"
      css={{
        border: 'none',
        position: 'absolute',
        top: '16px',
        right: '16px',
      }}
    />
  </WelcomeBannerGrid>
);

WelcomeBanner.propTypes = {
  onClose: func,
  title: string,
  description: string,
};

WelcomeBanner.defaultProps = {
  title: 'Welcome',
  description: 'Here you can find information about your local advisor, community recommendations, helpful articles, personalized services and offers and much more',
};

export default WelcomeBanner;
