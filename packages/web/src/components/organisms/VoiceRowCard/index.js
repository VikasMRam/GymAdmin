import React from 'react';
import { generatePath } from 'react-router';
import styled, { css } from 'styled-components';
import { string, bool, object } from 'prop-types';

import { size, palette } from 'sly/common/components/themes';
import taskPropType from 'sly/common/propTypes/task';
import mobileOnly from 'sly/web/components/helpers/mobileOnly';
import pad from 'sly/web/components/helpers/pad';
import borderRadius from 'sly/web/components/helpers/borderRadius';
import { ADMIN_DASHBOARD_CALL_DETAILS_PATH } from 'sly/web/constants/dashboardAppPaths';
import { Link, ClampedText } from 'sly/web/components/atoms';
import { Td, Tr } from 'sly/web/components/atoms/Table';


const Wrapper = mobileOnly(borderRadius(pad(Tr, 'large'), 'small'), css`
  display: flex;
  flex-direction: column;
  padding: ${size('spacing.large')};
  background: ${palette('white', 'base')};
  border: ${size('spacing.nano')} solid ${palette('slate', 'stroke')};
`);

const StyledNameCell = ({
  disabled, call, ...props
}) => {
  const { toNumber, id } = call;
  return (
    <Td disabled={disabled} {...props}>
      <ClampedText size={size('weight.medium')}>
        <Link to={generatePath(ADMIN_DASHBOARD_CALL_DETAILS_PATH, { id })} {...props}>
          See Details
        </Link>
      </ClampedText>
    </Td>
  );
};

StyledNameCell.propTypes = {
  disabled: bool,
  task: taskPropType,
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

const DueDateCell = pad(mobileOnly(StyledTd, css`
  ${twoColumnCss};
  order: 2;
`), 'regular');
DueDateCell.displayName = 'DueDateCell';

const StageCell = mobileOnly(Td, css`
  order: 6;
  border-top: ${size('border.regular')} solid ${palette('grey.filler')};
  margin: ${size('spacing.large')} -${size('spacing.large')} 0 -${size('spacing.large')};
  padding: ${size('spacing.regular')} ${size('spacing.large')} 0;
`);

const RelatedToCell = pad(mobileOnly(StyledTd, css`
  ${twoColumnCss};
  order: 3;
`), 'regular');
RelatedToCell.displayName = 'RelatedToCell';

const AssignedToCell = pad(mobileOnly(StyledTd, css`
  ${twoColumnCss};
  order: 4;
`), 'regular');
AssignedToCell.displayName = 'AssignedToCell';

const PriorityCell = pad(mobileOnly(StyledTd, css`
  ${twoColumnCss};
  order: 5;
`), 'regular');
PriorityCell.displayName = 'PriorityCell';

const VoiceRowCard = ({ voiceCall }) => {
  const {
    toNumber, fromNumber, status, assignedTo,
  } = voiceCall;
  let name = null;
  if (assignedTo) {
    ({ name } = assignedTo);
  }
  return (
    <Wrapper>
      <NameCell call={voiceCall} />
      <DueDateCell>
        <span>Calling From</span>
        <span>{fromNumber}</span>
      </DueDateCell>
      <PriorityCell>
        <span>Status</span>
        <span>{status}</span>
      </PriorityCell>
      <AssignedToCell>
        <span>Assigned to</span>
        {name && <span>{name}</span>}
      </AssignedToCell>

    </Wrapper>
  );
};

VoiceRowCard.propTypes = {
  voiceCall: object,
};

export default VoiceRowCard;
