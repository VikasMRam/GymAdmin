import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import SearchResultsAdTile from 'sly/components/organisms/SearchResultsAdTile';
import { size, assetPath } from 'sly/components/themes';
import { Image } from 'sly/components/atoms';

const StyledImage = styled(Image)`
  vertical-align: middle;
  margin-left: ${size('spacing.regular')};
  margin-right: ${size('spacing.regular')};
`;

storiesOf('Organisms|SearchResultsAdTile', module)
  .add('default', () => (
    <SearchResultsAdTile
      title="This the title of an ad tile. It can span up to 2 lines if needed."
      buttonText="Ask Our Experts A Question"
      buttonProps={{ onClick: action('onButtonClick') }}
      image={assetPath('images/agents.png')}
    >
      Our Local Senior Living Experts can help you with X
    </SearchResultsAdTile>
  ))
  .add('row layout', () => (
    <SearchResultsAdTile
      title="This the title of an ad tile. It can span up to 2 lines if needed."
      buttonText="Ask Our Experts A Question"
      buttonProps={{ onClick: action('onButtonClick') }}
      image={assetPath('images/agents.png')}
      layout="row"
    >
      Our Local Senior Living Experts can help you with X
    </SearchResultsAdTile>
  ))
  .add('with illustration', () => (
    <SearchResultsAdTile
      title="Selling a home to pay the cost of senior living?"
      buttonText="Get Instant Offer"
      buttonPosition="right"
      buttonProps={{ onClick: action('onButtonClick') }}
      image={assetPath('vectors/house-sold.svg')}
    >
      Our partner <StyledImage src={assetPath('vectors/zillow.svg')} /> will make you an Instant Offer.
    </SearchResultsAdTile>
  ))
  .add('with imagePosition', () => (
    <SearchResultsAdTile
      title="Selling a home to pay the cost of senior living?"
      buttonText="Learn more about selling my home"
      buttonPosition="right"
      imagePosition="right"
      layout="row"
      buttonProps={{ onClick: action('onButtonClick') }}
      image={assetPath('vectors/house-sold.svg')}
    >
      Our partner <StyledImage src={assetPath('vectors/zillow.svg')} /> will make you an Instant Offer.
    </SearchResultsAdTile>
  ));
