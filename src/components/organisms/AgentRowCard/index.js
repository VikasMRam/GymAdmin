import React from 'react';
import styled, { css } from 'styled-components';
import { func, string, bool } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import taskPropType from 'sly/propTypes/agent';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import pad from 'sly/components/helpers/pad';
import borderRadius from 'sly/components/helpers/borderRadius';
import { Link, ClampedText } from 'sly/components/atoms';
import { Td, Tr } from 'sly/components/atoms/Table';
import { buildAddressDisplay } from 'sly/services/helpers/communityReferral';
import { AGENT_STATUS_NAME_MAP } from 'sly/constants/agents';

const Wrapper = mobileOnly(borderRadius(pad(Tr, 'large'), 'small'), css`
  display: flex;
  flex-direction: column;
  padding: ${size('spacing.large')};
  background: ${palette('white', 'base')};
  border: ${size('spacing.nano')} solid ${palette('slate', 'stroke')};
`);

const StyledNameCell = ({
  disabled, agent, to, ...props
}) => (
  <Td disabled={disabled} {...props}>
    <ClampedText size={size('weight.medium')}>
      <Link to={to} {...props}>
        {agent.name}
      </Link>
    </ClampedText>
  </Td>
);

StyledNameCell.propTypes = {
  disabled: bool,
  agent: taskPropType,
  to: string,
};

const NameCell = mobileOnly(pad(StyledNameCell, 'regular'), css`
  order: 1;
`);
NameCell.displayName = 'NameCell';

const twoColumnCss = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: ${size('text.caption')};

  span:first-child {
    display: inline!important;
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
DisplayNameCell.displayName = 'DisplayNameCell';

const AddressCell = pad(mobileOnly(StyledTd, css`
  ${twoColumnCss};
  order: 3;
`), 'regular');
AddressCell.displayName = 'AddressCell';

const StatusCell = pad(mobileOnly(StyledTd, css`
  ${twoColumnCss};
  order: 4;
`), 'regular');
StatusCell.displayName = 'StatusCell';

const AgentRowCard = ({ agent, onAgentClick }) => {
  const { info, status } = agent;
  const { displayName } = info;
  return (
    <Wrapper>
      <NameCell agent={agent} onClick={() => onAgentClick(agent)} />
      <DisplayNameCell>
        <span>Display Name</span>
        <span>{displayName}</span>
      </DisplayNameCell>
      <AddressCell>
        <span>Address</span>
        <span>{buildAddressDisplay(agent)}</span>
      </AddressCell>
      <StatusCell>
        <span>Status</span>
        <span>{AGENT_STATUS_NAME_MAP[status]}</span>
      </StatusCell>
    </Wrapper>
  );
};

AgentRowCard.propTypes = {
  agent: taskPropType.isRequired,
  onAgentClick: func.isRequired,
};

export default AgentRowCard;
