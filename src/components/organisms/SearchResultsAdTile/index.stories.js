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
      description="Our Local Senior Living Experts can help you with X"
      buttonText="Ask Our Experts A Question"
      onButtonClick={action('onButtonClick')}
      image={assetPath('images/agents.png')}
    />
  ))
  .add('row layout', () => (
    <SearchResultsAdTile
      title="This the title of an ad tile. It can span up to 2 lines if needed."
      description="Our Local Senior Living Experts can help you with X"
      buttonText="Ask Our Experts A Question"
      onButtonClick={action('onButtonClick')}
      image={assetPath('images/agents.png')}
      layout="row"
    />
  ))
  .add('with illustration', () => (
    <SearchResultsAdTile
      title="Selling a home to pay the cost of senior living?"
      description={(
        <>
          Our partner <StyledImage src={assetPath('images/zillow.png')} /> will make you an Instant Offer.
        </>
      )}
      buttonText="Get Instant Offer"
      buttonPosition="right"
      onButtonClick={action('onButtonClick')}
      image={assetPath('vectors/house-sold.svg')}
    />
  ));
