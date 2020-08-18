import React from 'react';
import styled, { css } from 'styled-components';
import { func, string } from 'prop-types';
import { generatePath } from 'react-router';

import { size, palette } from 'sly/common/components/themes';
import { community as communityPropType } from 'sly/common/propTypes/community';
import mobileOnly from 'sly/web/components/helpers/mobileOnly';
import pad from 'sly/web/components/helpers/pad';
import borderRadius from 'sly/web/components/helpers/borderRadius';
import { Link } from 'sly/common/components/atoms';
import { Td, Tr } from 'sly/web/components/atoms/Table';
import { buildAddressDisplay } from 'sly/web/services/helpers/communityReferral';
import { DASHBOARD_COMMUNITIES_DETAIL_PATH } from 'sly/web/constants/dashboardAppPaths';
import Block from 'sly/web/components/atoms/Block';

const Wrapper = mobileOnly(borderRadius(pad(Tr, 'large'), 'small'), css`
  display: flex;
  flex-direction: column;
  padding: ${size('spacing.large')};
  background: ${palette('white', 'base')};
  border: ${size('spacing.nano')} solid ${palette('slate', 'stroke')};
`);

const GetStatusStr  = (status) => {
  switch (status) {
    case -2:
      return 'Deleted';
    case -1:
      return 'Offline';
    case 0:
      return 'Initialized';
    case 1:
      return 'Awaiting Approval';
    case 2:
      return 'Approved';
  }
};

const StyledNameCell = ({
  community, to, ...props
}) => (
  <Td {...props}>
    <Link block clamped to={to} {...props}>
      {community.name}
    </Link>
  </Td>
);

const StatusCell = ({ status }) => (
  <Td>
    <span>
      {GetStatusStr(status)}
    </span>
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

const AddressCell = pad(mobileOnly(StyledTd, css`
  ${twoColumnCss};
  order: 3;
`), 'regular');

const CommunityRowCard = ({ community, onCommunityClick }) => {
  const { id, status } = community;
  const communityDetailsPath = generatePath(DASHBOARD_COMMUNITIES_DETAIL_PATH, { id });
  return (
    <Wrapper>
      <NameCell community={community} to={communityDetailsPath} onClick={() => onCommunityClick(community)} />
      <AddressCell>
        <span>Address</span>
        <Block clamped>{buildAddressDisplay(community)}</Block>
      </AddressCell>
      <StatusCell status={status} />
    </Wrapper>
  );
};

CommunityRowCard.propTypes = {
  community: communityPropType.isRequired,
  onCommunityClick: func.isRequired,
};

export default CommunityRowCard;
