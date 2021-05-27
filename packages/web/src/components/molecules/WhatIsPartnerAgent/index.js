import React from 'react';
import styled from 'styled-components';
import { object, string, arrayOf } from 'prop-types';

import { size, palette } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import { Heading, Hr, Paragraph, Link } from 'sly/common/components/atoms';
import { Image } from 'sly/web/components/atoms';

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


const WhatIsPartnerAgent = ({ toc, agents }) => (
  <>
    <Paragraph>
      As you search for {toc}, you will be comforted to know there are senior living advisors
      living and working in your city. These experts know all the senior living communities, their staff turnover,
      their unique selling points, and best of all they can often negotiate fees on your behalf at your favorite options.
    </Paragraph>
    <AgentWrapper>
      {agents.map((p, i) => (
        <>
          <AgentItem>
            <AgentAvatarWrapper>
              <Image src={assetPath(p.asset)} />
            </AgentAvatarWrapper>
            <div>
              <StyledHeading level="subtitle" size="subtitle" >{p.title}</StyledHeading>
              <Paragraph>
                {p.caption}{' '}
                <Link href={p.to}>Click Here to Learn more about {p.first}.</Link>
              </Paragraph>
            </div>
          </AgentItem>
          {(i !== (agents.length - 1)) && <Hr />}
        </>
      ))}
    </AgentWrapper>
    <Paragraph>
      Working with Seniorly means we will connect you to the Seniorly Local Advisor in your preferred city.
      They will support you for as much or as little as you need through every step of the process.
      There is never any cost for our services. We are compensated by the community eventually selected.
    </Paragraph>
  </>
);

WhatIsPartnerAgent.propTypes = {
  toc: string.isRequired,
  agents: arrayOf(object).isRequired,
};

export default WhatIsPartnerAgent;
