import React from 'react';
import { func, bool } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import { community as communityProptype } from 'sly/web/propTypes/community';
import agentPropType from 'sly/web/propTypes/agent';
import { Wrapper } from 'sly/web/components/wizards/assesment/Template';
import { Heading } from 'sly/web/components/atoms';
import SimilarCommunities from 'sly/web/components/organisms/SimilarCommunities';
import MatchedAgent from 'sly/web/components/organisms/MatchedAgent';
import PostConversionGreetingForm from 'sly/web/components/organisms/PostConversionGreetingForm';
import PostConversionAdTileContainer from 'sly/web/containers/postConversion/AdTileContainer';

const Container = styled.div`
  display: grid;
  grid-gap: ${size('spacing.xLarge')};
`;

const SimilarCommunitiesContainer = styled.div`
  max-width: ${size('layout.col12')};
`;

const SimilarCommunitiesWrapper = styled.div`
  column-width: ${size('layout.col4')};
  column-gap: ${size('spacing.xLarge')};

   > * {
    break-inside: avoid-column; /* Prevent element from breaking */
    page-break-inside: avoid;
  }
`;

const End = ({ handleSubmit, community, hasNoAgent, agent }) => (
  <Container>
    <Wrapper>
      {hasNoAgent &&
        <PostConversionGreetingForm
          community={community}
          onSubmit={handleSubmit}
          heading={`You're all set! One of our Local Senior Living Experts will reach out shortly to assist you with pricing for ${community.name}.`}
        />
      }
      {!hasNoAgent &&
        <MatchedAgent
          heading={agent ? `We've matched you with your Local Senior Living Expert, ${agent.name}. She will reach out shortly to assist you.` : ''}
          agent={agent}
        />
      }
    </Wrapper>
    <Wrapper>
      <PostConversionAdTileContainer type="homeCare" layout="row" community={community} />
    </Wrapper>
    <SimilarCommunitiesContainer>
      <Heading size="subtitle">Explore Similar Assisted Living Communities in {community.address.city}</Heading>
      <SimilarCommunitiesWrapper>
        <SimilarCommunities communities={community.similarProperties} communityStyle={{ layout: 'row', showDescription: false }} />
      </SimilarCommunitiesWrapper>
    </SimilarCommunitiesContainer>
  </Container>
);

End.propTypes = {
  handleSubmit: func.isRequired,
  community: communityProptype.isRequired,
  agent: agentPropType,
  hasNoAgent: bool,
};

export default End;
