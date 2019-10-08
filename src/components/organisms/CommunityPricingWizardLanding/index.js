import React from 'react';
import { string } from 'prop-types';

import pad from 'sly/components/helpers/pad';
import fullWidth from 'sly/components/helpers/fullWidth';
import { Heading, Block, Button } from 'sly/components/atoms';
import IconItem from 'sly/components/molecules/IconItem';

const PaddedHeading = pad(Heading, 'large');

const PaddedBlock = pad(Block);

const PaddedIconItem = pad(IconItem);

const FullWidthButton = fullWidth(Button);

const CommunityPricingWizardLanding = ({ name }) => (
  <section>
    <PaddedHeading>Nice to meet you, {name}!</PaddedHeading>
    <PaddedBlock palette="primary" size="subtitle">Here&apos;s what happens next:</PaddedBlock>
    <PaddedIconItem iconRightMarginSpacing="large" icon="check" iconPalette="success" iconSize="regular" size="subtitle">Complete your care profile to help your expert better understand your needs and preferences</PaddedIconItem>
    <PaddedIconItem iconRightMarginSpacing="large" icon="check" iconPalette="success" iconSize="regular" size="subtitle">We&apos;ll call shortly to match you with a local senior living expert - working with them is 100% free!</PaddedIconItem>
    <PaddedIconItem iconRightMarginSpacing="large" icon="check" iconPalette="success" iconSize="regular" size="subtitle">Your expert will guide you throughout your search, set up tours and answer all your questions</PaddedIconItem>
    <FullWidthButton>Let&apos; Begin</FullWidthButton>
  </section>
);

CommunityPricingWizardLanding.propTypes = {
  name: string.isRequired,
};

export default CommunityPricingWizardLanding;
