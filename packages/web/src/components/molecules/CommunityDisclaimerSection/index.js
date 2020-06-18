import React from 'react';
import { string, bool, } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import { Box, Link, Hr } from 'sly/web/components/atoms';
import Section from 'sly/web/components/molecules/Section';
import { phoneFormatter } from 'sly/web/services/helpers/phone';

const DescriptionWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledBox = styled(Box)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const CommunityDisclaimerSection = ({
  title, id, name, city, phone, isClaimed,
}) => {
  let description = 'The information above has not been verified or approved by the owner or operator. ';
  if (isClaimed) {
    description = 'A verified owner or operator has claimed this community.';
  }
  return (
    <StyledBox>
      <Section title={title} titleSize="subtitle" headingMargin="large">
        <DescriptionWrapper>
          Seniorly is not affiliated with the owner or operator(s) of {name}.
          {description}
          For exact details, connect to a Local Senior Living Expert in {city} by calling&nbsp;
          <Link href={`tel:${phone}`}>
            {phoneFormatter(phone, true)}
          </Link>
          . There is no cost for this service. We are compensated by the community you select.
        </DescriptionWrapper>
        {!isClaimed &&
        <>
          <Hr />
          Manage this community?&nbsp;
          <Link href={`/partners/communities?prop=${id}&sly_category=disclaimer&sly_action=cta_link&sly_label=claim`}>
            Click here to claim this profile
          </Link>
        </>

        }
      </Section>
    </StyledBox>
  );
};


CommunityDisclaimerSection.propTypes = {
  title: string,
  id: string,
  name: string,
  city: string,
  isClaimed: bool,
  phone: string,
};

CommunityDisclaimerSection.defaultProps = {
  urlText: 'Click Here',
};

export default CommunityDisclaimerSection;
