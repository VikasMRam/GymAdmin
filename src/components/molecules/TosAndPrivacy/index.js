import React from 'react';
import { bool } from 'prop-types';

import { Block, Link } from 'sly/components/atoms';

const getTosLink = isNewTab => <Link size="tiny" href="/tos" target={isNewTab ? '_blank' : null}>Terms of Use</Link>;

const getPrivacyLink = isNewTab => <Link size="tiny" href="/privacy" target={isNewTab ? '_blank' : null}>Privacy Policy</Link>;

const TosAndPrivacy = ({ openLinkInNewTab }) => (
  <Block palette="slate" size="tiny">
    By continuing, you agree to Seniorly&apos;s {getTosLink(openLinkInNewTab)} and {getPrivacyLink(openLinkInNewTab)}.
  </Block>
);

TosAndPrivacy.propTypes = {
  openLinkInNewTab: bool,
};

export default TosAndPrivacy;

