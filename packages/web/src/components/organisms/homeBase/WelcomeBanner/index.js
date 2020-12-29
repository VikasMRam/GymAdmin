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
  position: relative;
  padding: ${size('spacing.large')} ${size('spacing.large')} 0 ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};
  background-color: ${palette('white', 'base')}; 
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
  ${startingWith('tablet', css`
  padding: ${size('spacing.xxxLarge')} ${size('spacing.xxxLarge')} 0 ${size('spacing.xxxLarge')};
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto 280px;
    grid-template-areas: 
      "text image"
  `)}
  ${startingWith('laptop', css`
  padding: ${size('spacing.huge')} ${size('spacing.huge')} 0 ${size('spacing.huge')};  
  
  `)}
`;

const WelcomeBanner = ({ onClose, title, description }) => (
  <WelcomeBannerGrid>
    <Block gridArea="text">
      <Block
        css={css`
        margin-bottom: ${size('spacing.large')};`}
        size="title"
      >
        {title}
      </Block>
      <Block >{description}</Block>
    </Block>
    <ResponsiveImage gridArea="image" aspectRatio="3:2" src={assetPath('images/homebase/welcome.png')} />
    <IconButton
      icon="close"
      onClick={onClose}
      ghost
      palette="black"
      css={css`
        border: none;
        position: absolute;
        padding: 0;
        top: 8px;
        right: 8px;
        ${startingWith('tablet', css({ top: '16px', right: '16px' }))}
      `}
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
