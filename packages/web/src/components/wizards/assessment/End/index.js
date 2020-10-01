import React from 'react';
import { func, bool, string } from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';

import { size } from 'sly/common/components/themes';
import { community as communityProptype } from 'sly/common/propTypes/community';
import agentPropType from 'sly/common/propTypes/agent';
import { capitalize } from  'sly/web/services/helpers/utils';
import { Wrapper } from 'sly/web/components/wizards/assessment/Template';
import { Heading } from 'sly/common/components/atoms';
import SimilarCommunities from 'sly/web/components/organisms/SimilarCommunities';
import MatchedAgent from 'sly/web/components/organisms/MatchedAgent';
import PostConversionGreetingForm from 'sly/web/components/organisms/PostConversionGreetingForm';
import PostConversionAdTileContainer from 'sly/web/containers/postConversion/AdTileContainer';

const Container = styled.div`
  display: grid;
  grid-gap: ${size('spacing.xLarge')};
`;

const SimilarCommunitiesContainer = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    max-width: ${size('breakpoint.tablet')};
    overflow: hidden;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col12')};
  }
`;

const SimilarCommunitiesWrapper = styled.div`
  display: grid;
  grid-gap: ${size('spacing.xLarge')};
  overflow: auto;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: repeat( ${prop('numberOfItems')}, ${size('layout.col4')});
  }
`;

const End = ({ handleSubmit, community, city, hasNoAgent, agent, adTile }) => (
  <Container>
    <Wrapper>
      {hasNoAgent &&
        <PostConversionGreetingForm
          community={community}
          onSubmit={handleSubmit}
          heading={community ?
            `You're all set! One of our Local Senior Living Experts will reach out shortly to assist you with pricing for ${community.name}.` :
            `You're all set! One of our Local Senior Living Experts will reach out shortly to assist you with your search${city ? ` in ${city.replace('-', ' ').split(' ').map(s => capitalize(s)).join(' ')}` : ''}.`
          }
        />
      }
      {!hasNoAgent &&
        <MatchedAgent
          heading={agent ? `We've matched you with your Local Senior Living Expert, ${agent.name}. They will reach out shortly to assist you.` : ''}
          agent={agent}
          prevLink={community ? community.url : '/'}
        />
      }
    </Wrapper>
    {(hasNoAgent || agent) &&
      <Wrapper>
        <PostConversionAdTileContainer type={adTile} layout="row" community={community} />
      </Wrapper>
    }
    {(hasNoAgent || agent) && community &&
      <SimilarCommunitiesContainer>
        <Heading size="subtitle">Explore Similar Assisted Living Communities in {community.address.city}</Heading>
        <SimilarCommunitiesWrapper numberOfItems={community.similarProperties ? community.similarProperties.length : 0}>
          <SimilarCommunities communities={community.similarProperties} communityStyle={{ layout: 'row', showDescription: false }} />
        </SimilarCommunitiesWrapper>
      </SimilarCommunitiesContainer>
    }
  </Container>
);

End.propTypes = {
  handleSubmit: func.isRequired,
  community: communityProptype,
  city: string,
  agent: agentPropType,
  hasNoAgent: bool,
  adTile: string,
};

End.defaultProps = {
  city: '',
};

export default End;
