import React from 'react';
import styled from 'styled-components';

import agentPropType from 'sly/web/propTypes/agent';
import { styles as linkStyles } from 'sly/web/components/atoms/Link';
import { Box, Image, Block, Link } from 'sly/web/components/atoms';
import { size, palette } from 'sly/web/components/themes';
import IconItem from 'sly/web/components/molecules/IconItem';
import { phoneFormatter } from 'sly/web/services/helpers/phone';

const Wrapper = 'div';

const ProfileImage = styled(Image)`
  overflow: hidden;
  border-radius: ${size('spacing.small')};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const Badge = styled(Block)`
  position: absolute;
  top: ${size('spacing.large')};
  left: 0;
  background: ${palette('secondary', 'darker-30')};
  padding: ${size('spacing.regular')};
  border-radius: 0;
  border-top-right-radius: ${size('spacing.xLarge')};
  border-bottom-right-radius: ${size('spacing.xLarge')};
`;

const Name = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
  ${linkStyles};
`;

Name.defaultProps = {
  palette: 'primary',
  variation: 'base',
};

const List = styled.ul`
  margin: 0;
  padding: 0;
  margin-bottom: ${size('spacing.xLarge')};

  li {
    margin-bottom: ${size('spacing.regular')};
    break-inside: avoid-column;
    list-style-type: none;
  }

  li:last-child {
    margin-bottom: 0;
  }
`;

const AgentTile = ({
  agent,
}) => {
  const {
    info,
    aggregateRating: rating,
    url,
    address,
  } = agent;

  const phoneNumber = phoneFormatter(info.slyPhone);

  return (
    <Wrapper>
      <ProfileImage src={info.profileImageUrl} aspectRatio="3:2">
        {info.recentFamiliesHelped &&
          <Badge size="caption" palette="white">
            <b>{info.recentFamiliesHelped}</b> families helped
          </Badge>
        }
      </ProfileImage>
      <Box snap="top">
        <Name size="subtitle">
          {info.displayName}
        </Name>
        <List>
          {phoneNumber &&
            <li>
              <IconItem size="caption" icon="phone" iconSize="body">{phoneNumber}</IconItem>
            </li>
          }
          {rating.numRatings > 0 &&
            <li>
              <IconItem size="caption" icon="star" iconSize="body">
                {rating.ratingValue} from <Link to={url}>{rating.numRatings} reviews</Link>
              </IconItem>
            </li>
          }
          <li>
            <IconItem size="caption" icon="location" iconSize="body">{address.city}, {address.state}</IconItem>
          </li>
        </List>
      </Box>
    </Wrapper>
  );
};

AgentTile.propTypes = {
  agent: agentPropType,
};


export default AgentTile;
