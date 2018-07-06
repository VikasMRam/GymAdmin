import React from 'react';
import { string, shape, number } from 'prop-types';
import styled from 'styled-components';
import Link from 'react-router-dom/Link';
import Dotdotdot from 'react-dotdotdot';

import { size } from 'sly/components/themes';
import { Avatar } from 'sly/components/atoms';
import Rating from 'sly/components/molecules/Rating';
import { community as communityPropType } from 'sly/propTypes/community';

const AgentDiv = styled.div`
  display: flex;
  align-items: center;
  padding: ${size('spacing.small')};
  margin-left: ${size('spacing.regular')};
  > :first-child {
    margin-right: ${size('spacing.regular')};
  }
`;

const NameTextSpan = styled.span`
  margin-bottom: ${size('spacing.small')};
`;

const TitleTextDiv = styled.div`
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${size('spacing.small')};
`;

export const CaptionSpan = styled.span`
`;

const Title = ({
  name, title, rating, community,
}) => (
  <TitleDiv>
    <NameTextSpan>
      <Dotdotdot clamp={1}>{name}</Dotdotdot>
    </NameTextSpan>
    <CaptionSpan>
      {title && <TitleTextDiv>{title}</TitleTextDiv>}
      {title && community && ', '}
      {community && <Link to={community.url}>{community.name}</Link>}
    </CaptionSpan>
    {rating && <Rating size="small" value={rating} />}
  </TitleDiv>
);


Title.propTypes = {
  name: string,
  title: string,
  rating: number,
  community: communityPropType,
};

const AgentTile = ({
  user, palette, community,
}) => (
  <AgentDiv>
    <Avatar user={user} palette={palette} />
    <Title {...user} community={community} />
  </AgentDiv>
);

AgentTile.propTypes = {
  palette: string,
  user: shape({
    name: string.isRequired,
    picture: string,
  }),
  community: communityPropType,
};

AgentTile.defaultProps = {
  palette: 'primary',
};

export default AgentTile;
