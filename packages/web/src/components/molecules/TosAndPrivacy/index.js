import React from 'react';
import { bool, string } from 'prop-types';

import { Block, Link } from 'sly/web/components/atoms';

const getTosLink = isNewTab => <Link weight="medium" size="tiny" href="/tos" target={isNewTab ? '_blank' : null}>Terms of Use</Link>;

const getPrivacyLink = isNewTab => <Link weight="medium" size="tiny" href="/privacy" target={isNewTab ? '_blank' : null}>Privacy Policy</Link>;

const TosAndPrivacy = ({ openLinkInNewTab, className }) => (
  <Block palette="slate" size="tiny" className={className}>
    By continuing, you agree to Seniorly&apos;s {getTosLink(openLinkInNewTab)} and {getPrivacyLink(openLinkInNewTab)}
  </Block>
);

TosAndPrivacy.propTypes = {
  openLinkInNewTab: bool,
  className: string,
};

export default TosAndPrivacy;

