import React from 'react';
import { func, string } from 'prop-types';

import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import userPropType from 'sly/common/propTypes/user';
import { Heading, Block, Button } from 'sly/web/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';

const PaddedHeading = pad(Heading, 'large');
PaddedHeading.displayName = 'PaddedHeading';

const PaddedBlock = pad(Block);

const PaddedIconItem = pad(IconItem);

const FullWidthButton = fullWidth(Button);

const CommunityPricingWizardLanding = ({ user, onBeginClick, buttonText }) => (
  <section>
    <PaddedHeading>{(user && user.name) ? `Nice to meet you, ${user.name}` : 'Thank you for choosing Seniorly'}!</PaddedHeading>
    <PaddedBlock palette="primary" size="subtitle">Here&apos;s what happens next:</PaddedBlock>
    <PaddedIconItem iconRightMarginSpacing="large" icon="check" iconPalette="green" size="subtitle">Complete your care profile to help your expert better understand your needs and preferences</PaddedIconItem>
    <PaddedIconItem iconRightMarginSpacing="large" icon="check" iconPalette="green" size="subtitle">We&apos;ll call shortly to match you with a Local Senior Living Expert - working with them is 100% free!</PaddedIconItem>
    <PaddedIconItem iconRightMarginSpacing="large" icon="check" iconPalette="green" size="subtitle">Your expert will guide you throughout your search, set up tours and answer all your questions</PaddedIconItem>
    <FullWidthButton onClick={onBeginClick}>{buttonText}</FullWidthButton>
  </section>
);

CommunityPricingWizardLanding.propTypes = {
  user: userPropType,
  onBeginClick: func,
  buttonText: string,
};

CommunityPricingWizardLanding.defaultProps = {
  buttonText: "Let's Begin",
};

export default CommunityPricingWizardLanding;
