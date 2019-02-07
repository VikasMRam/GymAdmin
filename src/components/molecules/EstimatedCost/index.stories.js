import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import EstimatedCost from 'sly/components/molecules/EstimatedCost';

const typeCares = ['Independent Living'];
const typeCaresWithCRC = ['Independent Living', 'Continuing Care Retirement Community(CCRC)'];
const price = 1230;
const name = 'dfgfdg';

storiesOf('Molecules|EstimatedCost', module)
  .add('default', () => (
    <EstimatedCost name={name} typeCares={typeCares} price={price} getDetailedPricing={action('open booking modal')} />
  ))
  .add('with price range zero', () => (
    <EstimatedCost name={name} typeCares={typeCares} price={0} getDetailedPricing={action('open booking modal')} />
  ))
  .add('with CCRC type of care', () => (
    <EstimatedCost name={name} typeCares={typeCaresWithCRC} price={0} getDetailedPricing={action('open booking modal')} />
  ));
