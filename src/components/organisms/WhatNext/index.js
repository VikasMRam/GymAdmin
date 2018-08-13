import React from 'react';
import { func, oneOf } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { community as communityPropType } from 'sly/propTypes/community';
import { getCitySearchUrl } from 'sly/services/helpers/url';

import { Button, Block, Icon, Heading } from 'sly/components/atoms';
import HowSlyWorks from 'sly/components/organisms/HowSlyWorks';

const Wrapper = styled.div`
  width: 100%;
`;

const StyledIcon = styled(Icon)`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledHeading = styled(Heading)`
  text-align: center;
  margin-bottom: ${size('spacing.large')};
`;

const StyledBlock = styled(Block)`
  margin: 0 ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};
`;

const BackToSearch = styled.div`
  text-align: center;
  margin-bottom: ${size('spacing.large')};
`;

const headings = {
  whatNext: 'What Happens Next',
  howItWorks: 'How Seniorly Works',
};

const WhatNext = ({ community, reasons, onClose }) => {
  const { address, propInfo } = community;
  const { city } = address;

  return (
    <Wrapper>
      <StyledHeading>{ headings[reasons] }</StyledHeading>
      <HowSlyWorks layout="modal" reasons={reasons} />

      { reasons === 'whatNext' &&
        <Button
          kind="jumbo"
          href={getCitySearchUrl({ propInfo, address })}
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
  community: communityPropType.isRequired,
  onClose: func.isRequired,
};

WhatNext.defaultProps = {
  reasons: 'whatNext',
};

export default WhatNext;

