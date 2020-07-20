import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import { community as communityPropType } from 'sly/common/propTypes/community';
import { getCitySearchUrl } from 'sly/web/services/helpers/url';
import { Button, Block, Icon, Heading } from 'sly/web/components/atoms';

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

const Thankyou = ({
  community, heading, subheading, onClose,
}) => {
  let backToSearch = null;
  if (community) {
    const { address, propInfo } = community;
    const { city } = address;
    backToSearch = (
      <>
        <StyledBlock>
          While you wait, compare your selection with other communities nearby
        </StyledBlock>
        <BackToSearch>
          <Button ghost href={getCitySearchUrl({ propInfo, address })}>Communities In {city}</Button>
        </BackToSearch>
      </>
    );
  }

  return (
    <Wrapper>
      <StyledIcon icon="logo" size="superHero" />
      <StyledHeading>{heading}</StyledHeading>
      <StyledBlock>{subheading}</StyledBlock>
      {backToSearch}
      {onClose && <Button onClick={onClose} kind="jumbo">Done</Button>}
    </Wrapper>
  );
};

Thankyou.propTypes = {
  community: communityPropType,
  onClose: func,
  heading: string,
  subheading: string,
};

Thankyou.defaultProps = {
  heading: 'Thank you!',
  subheading: 'A Seniorly Guide will reach out to you with local expertise and support to ensure you find the right fit for your needs. There is no cost to you!',
};

export default Thankyou;

