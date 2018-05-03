import React from 'react';

import { Block, Link } from 'sly/components/atoms';

const tos = <Link href="/tos">Terms of Use</Link>;
const privacy = <Link href="/privacy">Privacy Policy</Link>;

const TosAndPrivacy = () => (
  <Block palette="grayscale" size="tiny">
    By continuing, you agree to Seniorly’s {tos} and {privacy}.
  </Block>
);

export default TosAndPrivacy;
