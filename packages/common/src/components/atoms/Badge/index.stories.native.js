import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Text } from 'react-native';

/*
import Badge from 'sly/common/components/atoms/Badge';

storiesOf('Common/Atoms/Badge', module)
  .add('default', () => <Badge>New</Badge>)
  .add('with palette', () => <Badge palette="danger" textPalette="white">New</Badge>);
*/

storiesOf('CenteredView', module).add('default view', () => (
  <Text>Hello Storybook</Text>
));
