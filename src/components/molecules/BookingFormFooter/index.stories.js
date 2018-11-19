import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import BookingFormFooter from 'sly/components/molecules/BookingFormFooter';

storiesOf('Molecules|BookingFormFooter', module)
  .add('default', () => <BookingFormFooter onProgressClick={action('clicked')} />)
  .add('with palette', () => <BookingFormFooter palette="primary" onProgressClick={action('clicked')} />)
  .add('with isFinalStep', () => <BookingFormFooter isFinalStep onProgressClick={action('clicked')} />)
  .add('with date', () => <BookingFormFooter date="2018-1-9" onProgressClick={action('clicked')} />)
  .add('with time', () => <BookingFormFooter time="Anytime" onProgressClick={action('clicked')} />)
  .add('with date and time', () => <BookingFormFooter date="2018-1-9" time="Anytime" onProgressClick={action('clicked')} />)
  .add('with isButtonDisabled', () => <BookingFormFooter isButtonDisabled onProgressClick={action('clicked')} />)
  .add('with isFinalStep and isButtonDisabled', () => <BookingFormFooter isFinalStep isButtonDisabled onProgressClick={action('clicked')} />);
