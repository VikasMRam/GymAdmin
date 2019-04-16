import React, { Fragment } from 'react';
import { bool } from 'prop-types';

import { Block, Link } from 'sly/components/atoms';

const tos = <Link size="tiny" href="/tos">Terms of Use</Link>;
const privacy = <Link size="tiny" href="/privacy">Privacy Policy</Link>;

const tosNewTab = <Link size="tiny" href="/tos" target="_blank">Terms of Use</Link>;
const privacyNewTab = <Link size="tiny" href="/privacy" target="_blank">Privacy Policy</Link>;

const TosAndPrivacy = ({ openLinkInNewTab }) => (
  <Block palette="slate" size="tiny">
    {!openLinkInNewTab &&
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        By continuing, you agree to Seniorly’s {tos} and {privacy}.
      </Fragment>
    }
    {openLinkInNewTab &&
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        By continuing, you agree to Seniorly’s {tosNewTab} and {privacyNewTab}.
      </Fragment>
    }
  </Block>
);

TosAndPrivacy.propTypes = {
  openLinkInNewTab: bool,
};

export default TosAndPrivacy;

