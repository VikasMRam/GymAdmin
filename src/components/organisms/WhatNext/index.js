import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { community as communityPropType } from 'sly/propTypes/community';
import { getCitySearchUrl } from 'sly/services/helpers/url';

import { Button, Block, Icon, Heading } from 'sly/components/atoms';
import HowSlyWorks from 'sly/components/organisms/HowSlyWorks';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const StyledIcon = styled(Icon)`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledHeading = styled(Heading)`
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

const WhatNext = ({ community, onClose }) => {
  const { address, propInfo } = community;
  const { city } = address;

  return (
    <Wrapper>
      <StyledHeading>What Happens Next</StyledHeading>
      <HowSlyWorks layout="modal" reasons="whatNext" />

      <Button
        kind="jumbo"
        href={getCitySearchUrl({ propInfo, address })}
      >
        Click to Compare Communities
      </Button>
    </Wrapper>
  );
};

WhatNext.propTypes = {
  community: communityPropType.isRequired,
  onClose: func,
};

export default WhatNext;

