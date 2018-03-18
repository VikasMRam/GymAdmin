import React from 'react';
import { string, shape } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { palette } from 'styled-theme';
import Link from 'react-router-dom/Link';

import { size } from 'sly/components/themes';
import Rating from 'sly/components/molecules/Rating';
import Avatar from 'sly/components/atoms/Avatar';

const AgentDiv = styled.div`
  display: flex;
  align-items: center;
  padding: ${size('spacing.large')};
  > :first-child {
    margin-right: ${size('spacing.large')};
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  > span {
    line-height: 1;
  }
`;

export const CaptionSpan = styled.span`
  font-size: ${size('text.caption')};
`;

const Title = ({
  name, title, rating, community,
}) => (
  <TitleDiv>
    <span>{name}</span>
    <CaptionSpan>
      {title && title}
      {title && community && ', '}
      {community && <Link to={community.uri}>{community.name}</Link>}
    </CaptionSpan>
    {rating && <Rating size="small" value={rating} />}
  </TitleDiv>
);

const AgentTile = ({ user, palette, community, ...props }) => (
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
  community: shape({
    name: string.isRequired,
    uri: string.isRequired,
  }),
};

AgentTile.defaultProps = {
  palette: 'primary',
};

export default AgentTile;
