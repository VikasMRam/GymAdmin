import React from 'react';
import { string, shape } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { palette } from 'styled-theme';
import Link from 'react-router-dom/Link'

import { size } from 'sly/components/themes/default';
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

const CaptionSpan = styled.span`
  font-size: ${size('text.caption')};
`;

const StyledLink = styled(({
  uri, ...props
}) => <Link to={uri} {...props} />)`
  
`;

const Title = ({ name, title, rating, community }) => ( 
  <TitleDiv>
    <span>{name}</span>
    <CaptionSpan>
      { title }
      { title && community && ', '}
      { community && <StyledLink to={community.uri}>
          {community.name}
        </StyledLink>}
    </CaptionSpan>
    { rating && <Rating size="small" value={rating} /> }
  </TitleDiv>
);

const AgentTile = ({ user, palette, ...props }) => (
  <AgentDiv palette={palette}>
    <Avatar user={user} palette={palette} />        
    <Title {...user} />
  </AgentDiv>
);

AgentTile.propTypes = {
  palette: string,
  user: shape({
    name: string.isRequired,
    picture: string,
    community: shape({
      name: string,
      uri: string,
    }),
  }),
};

AgentTile.defaultProps = {
  palette: 'primary',
};

export default AgentTile;
