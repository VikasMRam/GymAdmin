// https://github.com/diegohaz/arc/wiki/Example-components#icon
import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon from '.';

storiesOf('Atoms|Icon', module)
  .add('default', () => <Icon icon="star" />)
  .add('palette', () => <Icon icon="star" palette="primary" />)
  .add('star small', () => <Icon icon="star" size="small" />)
  .add('star regular', () => <Icon icon="star" />)
  .add('star large', () => <Icon icon="star" size="large" />)
  .add('star clip', () => <Icon icon="star-clip" size="large" />);
