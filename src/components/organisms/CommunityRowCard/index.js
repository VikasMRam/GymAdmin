import React from 'react';
import styled, { css } from 'styled-components';
import { func, string } from 'prop-types';
import { generatePath } from 'react-router';

import { size, palette } from 'sly/components/themes';
import { community as communityPropType } from 'sly/propTypes/community';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import pad from 'sly/components/helpers/pad';
import borderRadius from 'sly/components/helpers/borderRadius';
import { Link, ClampedText } from 'sly/components/atoms';
import { Td, Tr } from 'sly/components/atoms/Table';
import { buildAddressDisplay } from 'sly/services/helpers/communityReferral';
// import { AGENT_STATUS_NAME_MAP } from 'sly/constants/communities';
import { COMMUNITY_DASHBOARD_AGENT_DETAILS_PATH } from 'sly/constants/dashboardAppPaths';

const Wrapper = mobileOnly(borderRadius(pad(Tr, 'large'), 'small'), css`
  display: flex;
  flex-direction: column;
  padding: ${size('spacing.large')};
  background: ${palette('white', 'base')};
  border: ${size('spacing.nano')} solid ${palette('slate', 'stroke')};
`);

const StyledNameCell = ({
  community, to, ...props
}) => (
  <Td {...props}>
    <ClampedText>
      <Link to={to} {...props}>
        {community.name}
      </Link>
    </ClampedText>
  </Td>
);

StyledNameCell.propTypes = {
  community: communityPropType,
  to: string,
};

const NameCell = mobileOnly(pad(StyledNameCell, 'regular'), css`
  order: 1;
`);

const twoColumnCss = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: ${size('text.caption')};
span:first-child { display: inline!important;
  }
`;

const StyledTd = styled(Td)`
  span:first-child {
    display: none;
  }
`;

const DisplayNameCell = pad(mobileOnly(StyledTd, css`
  ${twoColumnCss};
  order: 2;
`), 'regular');

const AddressCell = pad(mobileOnly(StyledTd, css`
  ${twoColumnCss};
  order: 3;
`), 'regular');

const StatusCell = pad(mobileOnly(StyledTd, css`
  ${twoColumnCss};
  order: 4;
`), 'regular');

const CommunityRowCard = ({ community, onCommunityClick }) => {
  const { id, propInfo, status } = community;
  const { displayName } = propInfo;
  const communityDetailsPath = generatePath(COMMUNITY_DASHBOARD_AGENT_DETAILS_PATH, { id });
  return (
    <Wrapper>
      <NameCell community={community} to={communityDetailsPath} onClick={() => onCommunityClick(community)} />
      <DisplayNameCell>
        <span>Display Name</span>
        <span>{displayName}</span>
      </DisplayNameCell>
      <AddressCell>
        <span>Address</span>
        <span>{buildAddressDisplay(community)}</span>
      </AddressCell>
      <StatusCell>
        <span>Status</span>
        <span>xxxx</span>
      </StatusCell>
    </Wrapper>
  );
};

CommunityRowCard.propTypes = {
  community: communityPropType.isRequired,
  onCommunityClick: func.isRequired,
};

export default CommunityRowCard;
