import React from 'react';
import styled from 'styled-components';

import { Heading, Link, Paragraph, Hr, Image } from 'sly/components/atoms';
import { size, palette, assetPath } from 'sly/components/themes';

const AgentWrapper = styled.div`
  padding: ${size('spacing.large')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
  margin-bottom: ${size('spacing.large')};
`;

const AgentItem = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
  flex-direction: row;
  }
`;

const AgentAvatarWrapper = styled.div`
  margin-right: ${size('spacing.large')};
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const Wrapper = styled.div`
`;


const WhatIsPartnerAgent = () => {
  return (
    <>
      <Paragraph>
        As you search for assisted living near you, you will be comforted to know there are senior care professionals
        living and working in your city. These experts know all the senior living communities, their staff turnover,
        their unique selling points, and best of all they can often negotiate fees on your behalf at your favorite options.
      </Paragraph>
      <AgentWrapper>
        <AgentItem>
          <AgentAvatarWrapper>
            <Image src={assetPath('images/hub/agents/Sarah.png')} />
          </AgentAvatarWrapper>
          <Wrapper>
            <StyledHeading level="subtitle" size="subtitle" >Sarah Odover - Los Angeles, CA</StyledHeading>
            <Paragraph>Sarah Ordover has over 4 years of experience helping families find independent living,
              assisted living, and memory care options. She has helped over 100 families so far in the Los Angeles area.{' '}
              <Link href="https://www.seniorly.com/agents/pacific-west/beverley-hills/assisted-living-locators-los-angeles-ca-sarah-ordover-">Click Here to Learn more about Sarah.</Link>
            </Paragraph>
          </Wrapper>
        </AgentItem>
        <Hr />
        <AgentItem>
          <AgentAvatarWrapper>
            <Image src={assetPath('images/hub/agents/Heather.png')} />
          </AgentAvatarWrapper>
          <Wrapper>
            <StyledHeading level="subtitle" size="subtitle" >Heather Cartright - Sarasota, FL</StyledHeading>
            <Paragraph>Heather Cartright has over a year of experience helping families find independent living,
              assisted living, and memory care options. As a former assisted living facility administrator,
              she brings a unique skillset for senior living placement.{' '}
              <Link href="https://www.seniorly.com/agents/south/ellenton-fl/my-care-finders-fl-heather-cartright-">Click Here to Learn more about Heather.</Link>
            </Paragraph>
          </Wrapper>
        </AgentItem>
        <Hr />
        <AgentItem>
          <AgentAvatarWrapper>
            <Image src={assetPath('images/hub/agents/Carol-Katz.png')} />
          </AgentAvatarWrapper>
          <Wrapper>
            <StyledHeading level="subtitle" size="subtitle" >Carol Katz - New Jersey</StyledHeading>
            <Paragraph> Carol Katz has over 10 years of experience helping families find independent living,
              assisted living, and memory care options. With her unique volunteer experience, she brings
              a special skillset for senior living placement.{' '}
              <Link href="https://www.seniorly.com/agents/northeast/manalapan/adult-care-advisors-carol-katz-">Click Here to Learn more about Carol.</Link>
            </Paragraph>
          </Wrapper>
        </AgentItem>

      </AgentWrapper>
      <Paragraph>
        Working with Seniorly means we will connect you to the local senior living expert in your preferred city.
        They will support you for as much or as little as you need through every step of the process.
        There is never any cost for our services. We are compensated by the community eventually selected.
      </Paragraph>
    </>
  )
};

export default WhatIsPartnerAgent;
