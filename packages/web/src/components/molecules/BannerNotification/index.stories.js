import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import BannerNotification from 'sly/components/molecules/BannerNotification';
import displayOnlyIn from 'sly/components/helpers/displayOnlyIn';
import { Block } from 'sly/components/atoms';
import IconButton from 'sly/components/molecules/IconButton';

const SmallScreen = displayOnlyIn(styled(Block)`
  > * {
    display: flex;
    align-items: center;
  }
`, ['mobile']);

const BigScreen = displayOnlyIn(styled(Block)`
  width: 100%;

  > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`, ['tablet', 'laptop']);

const children = (
  <>
    <SmallScreen weight="medium" size="caption">
      <div>
        <IconButton icon="arrow-up" size="caption" palette="slate" kind="plain" transparent />
        12+ unread messages
      </div>
    </SmallScreen>
    <BigScreen weight="medium" size="caption">
      <div>
        <IconButton icon="arrow-up" size="caption" palette="slate" kind="plain" transparent>Jump</IconButton>
        12 new messages since 1:10 PM on June 3rd
        <span>Mark as read</span>
      </div>
    </BigScreen>
  </>
);

storiesOf('Molecules|BannerNotification', module)
  .add('default', () => <BannerNotification>Hello world</BannerNotification>)
  .add('with palette', () => <BannerNotification palette="slate">Hello world</BannerNotification>)
  .add('with palette & childrenPalette', () => <BannerNotification palette="warning" childrenPalette="slate">Hello world</BannerNotification>)
  .add('with padding, hasBorderRadius and palette', () => <BannerNotification hasBorderRadius palette="warning" padding="small" onCloseClick={action('onCloseClick')}>{children}</BannerNotification>);
