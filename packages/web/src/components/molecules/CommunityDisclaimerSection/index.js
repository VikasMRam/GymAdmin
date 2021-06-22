import React from 'react';
import { string, bool, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { Heading, Button, Block, Link } from 'sly/common/system';
import Section from 'sly/web/components/molecules/Section';
import { phoneFormatter } from 'sly/web/services/helpers/phone';

const DescriptionWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
`;


const CommunityDisclaimerSection = ({
  id, name, city, phone, isClaimed, agent,
}) => {
  let description = ' The information above has not been verified or approved by the owner or operator. ';
  if (isClaimed) {
    description = ' A verified owner or operator has claimed this community. ';
  }
  return (

    <Section>
      <DescriptionWrapper>
        Seniorly is not affiliated with the owner or operator(s) of {name}.
        {description}
        {agent &&
          <>
            For exact details, connect to a Seniorly Local Advisor in {city} by calling&nbsp;
            <Link href={`tel:${phone}`}>
              {phoneFormatter(phone, true)}
            </Link>
            . There is no cost for this service. We are compensated by the community you select.
          </>
          }
      </DescriptionWrapper>
      {!isClaimed &&
        <>

          <Heading pad="l" font="title-m">Are you an owner or operator of this community?</Heading>
          <Block  pad="l">Claim this profile to update pricing and community information.</Block>
          <Button variant="secondary" width="100%" sx$tablet={{ width: 'initial' }} href={`/partners/communities?prop=${id}&sly_category=disclaimer&sly_action=cta_link&sly_label=claim`}>
            Claim this profile
          </Button>
        </>

        }
    </Section>

  );
};

CommunityDisclaimerSection.propTypes = {
  id: string,
  name: string,
  city: string,
  isClaimed: bool,
  phone: string,
  agent: object,
};

CommunityDisclaimerSection.defaultProps = {
  urlText: 'Click Here',
};

export default CommunityDisclaimerSection;
