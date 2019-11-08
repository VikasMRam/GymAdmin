// https://github.com/diegohaz/arc/wiki/Example-components#icon
import React from 'react';
import { storiesOf } from '@storybook/react';

import Icon from 'sly/components/atoms/Icon';

storiesOf('Atoms|Icon', module)
  .add('default', () => <Icon icon="star" />)
  .add('palette', () => <Icon icon="star" palette="primary" />)
  .add('star small', () => <Icon icon="star" size="small" />)
  .add('star regular', () => <Icon icon="star" />)
  .add('star large', () => <Icon icon="star" size="large" />)
  .add('star clip', () => <Icon icon="star-clip" size="large" />)
  .add('schedule regular (default) with palette', () => <Icon icon="schedule" palette="primary" />)
  .add('chevron small', () => <Icon icon="chevron" size="small" />)
  .add('chevron regular (default)', () => <Icon icon="chevron" />)
  .add('chevron left', () => <Icon icon="chevron" rotate={1} />)
  .add('chevron large', () => <Icon icon="chevron" size="large" palette="slate" />)
  .add('chevron large flip', () => <Icon flip icon="chevron" size="large" palette="slate" />);
