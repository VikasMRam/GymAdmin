import React from 'react';
import { func, oneOf } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { community as communityPropType } from 'sly/propTypes/community';
import { getCitySearchUrl } from 'sly/services/helpers/url';
import { Button, Heading } from 'sly/components/atoms';
import HowSlyWorks from 'sly/components/organisms/HowSlyWorks';

const Wrapper = styled.div`
  width: 100%;
`;

const StyledHeading = styled(Heading)`
  text-align: center;
  margin-bottom: ${size('spacing.large')};
`;

const headings = {
  whatNext: 'What Happens Next',
  howItWorks: 'How Seniorly Works',
};

const WhatNext = ({ community, reasons, onClose }) => {
  let communityAddress = null;
  let communityPropInfo = null;
  if (community) {
    const { address, propInfo } = community;
    communityAddress = address;
    communityPropInfo = propInfo;
  }

  return (
    <Wrapper>
      <StyledHeading>{ headings[reasons] }</StyledHeading>
      <HowSlyWorks layout="modal" reasons={reasons} />

      { reasons === 'whatNext' && communityAddress !== null && communityPropInfo !== null &&
        <Button
          kind="jumbo"
          href={getCitySearchUrl({ propInfo: communityPropInfo, address: communityAddress })}
        >
          Click to Compare Communities
        </Button>
      }
      { reasons === 'howItWorks' &&
        <Button
          kind="jumbo"
          onClick={onClose}
        >
          Click to Continue
        </Button>
      }
    </Wrapper>
  );
};

WhatNext.propTypes = {
  reasons: oneOf(['howItWorks', 'whatNext']).isRequired,
  community: communityPropType,
  onClose: func.isRequired,
};

WhatNext.defaultProps = {
  reasons: 'whatNext',
};

export default WhatNext;

