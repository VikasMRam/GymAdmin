import React from 'react';
import { func } from 'prop-types';

import pad from 'sly/components/helpers/pad';
import fullWidth from 'sly/components/helpers/fullWidth';
import userPropType from 'sly/propTypes/user';
import { Heading, Block, Button } from 'sly/components/atoms';
import IconItem from 'sly/components/molecules/IconItem';

const PaddedHeading = pad(Heading, 'large');

const PaddedBlock = pad(Block);

const PaddedIconItem = pad(IconItem);

const FullWidthButton = fullWidth(Button);

const CommunityPricingWizardLanding = ({ user, onBeginClick }) => (
  <section>
    <PaddedHeading>{user ? `Nice to meet you, ${user.name}` : 'Thank you for choosing Seniorly'}!</PaddedHeading>
    <PaddedBlock palette="primary" size="subtitle">Here&apos;s what happens next:</PaddedBlock>
    <PaddedIconItem iconRightMarginSpacing="large" icon="check" iconPalette="success" iconSize="regular" size="subtitle">Complete your care profile to help your expert better understand your needs and preferences</PaddedIconItem>
    <PaddedIconItem iconRightMarginSpacing="large" icon="check" iconPalette="success" iconSize="regular" size="subtitle">We&apos;ll call shortly to match you with a local senior living expert - working with them is 100% free!</PaddedIconItem>
    <PaddedIconItem iconRightMarginSpacing="large" icon="check" iconPalette="success" iconSize="regular" size="subtitle">Your expert will guide you throughout your search, set up tours and answer all your questions</PaddedIconItem>
    <FullWidthButton onClick={onBeginClick}>Let&apos; Begin</FullWidthButton>
  </section>
);

CommunityPricingWizardLanding.propTypes = {
  user: userPropType,
  onBeginClick: func,
};

export default CommunityPricingWizardLanding;
