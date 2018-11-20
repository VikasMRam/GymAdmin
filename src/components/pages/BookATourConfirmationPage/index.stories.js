import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/services/helpers/forms';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import BookATourConfirmationPage from '.';

const { name, mainImage, similarProperties } = RhodaGoldmanPlaza;

const appointmentText = 'Saturday, October 21, Anytime';

storiesOf('Pages|BookATourConfirmationPage', module).add('default', () => (
  <BookATourConfirmationPage
    communityName={name}
    communityImageUrl={mainImage}
    similarCommunities={similarProperties}
    appointmentText={appointmentText}
    onButtonClick={withPreventDefault(action('Button Clicked'))}
  />
));
