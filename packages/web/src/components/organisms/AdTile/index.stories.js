import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import AdTile from 'sly/web/components/organisms/AdTile';
import { Image } from 'sly/web/components/atoms';

const StyledImage = styled(Image)`
  vertical-align: middle;
  margin-left: ${size('spacing.regular')};
  margin-right: ${size('spacing.regular')};
`;

storiesOf('Organisms|AdTile', module)
  .add('default', () => (
    <AdTile
      title="This the title of an ad tile. It can span up to 2 lines if needed."
      buttonText="Ask Our Experts A Question"
      buttonProps={{ onClick: action('onButtonClick') }}
      image={assetPath('images/agents.png')}
    >
      Our Local Senior Living Experts can help you with X
    </AdTile>
  ))
  .add('row layout', () => (
    <AdTile
      title="This the title of an ad tile. It can span up to 2 lines if needed."
      buttonText="Ask Our Experts A Question"
      buttonProps={{ onClick: action('onButtonClick') }}
      image={assetPath('images/agents.png')}
      layout="row"
    >
      Our Local Senior Living Experts can help you with X
    </AdTile>
  ))
  .add('with illustration', () => (
    <AdTile
      title="Selling a home to pay the cost of senior living?"
      buttonText="Get Instant Offer"
      buttonPosition="right"
      buttonProps={{ onClick: action('onButtonClick') }}
      image={assetPath('vectors/house-sold.svg')}
    >
      Our partner <StyledImage src={assetPath('vectors/zillow.svg')} /> will make you an Instant Offer.
    </AdTile>
  ))
  .add('with imagePosition', () => (
    <AdTile
      title="Selling a home to pay the cost of senior living?"
      buttonText="Learn more about selling my home"
      buttonPosition="right"
      imagePosition="right"
      layout="row"
      buttonProps={{ onClick: action('onButtonClick') }}
      image={assetPath('vectors/house-sold.svg')}
    >
      Our partner <StyledImage src={assetPath('vectors/zillow.svg')} /> will make you an Instant Offer.
    </AdTile>
  ));
