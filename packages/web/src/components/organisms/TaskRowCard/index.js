import React from 'react';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import { func, string, bool } from 'prop-types';

import { size, palette } from 'sly/web/components/themes';
import taskPropType from 'sly/web/propTypes/task';
import mobileOnly from 'sly/web/components/helpers/mobileOnly';
import pad from 'sly/web/components/helpers/pad';
import borderRadius from 'sly/web/components/helpers/borderRadius';
import { Badge, Link, ClampedText } from 'sly/web/components/atoms';
import { Td, Tr } from 'sly/web/components/atoms/Table';
import Stage from 'sly/web/components/molecules/Stage';
import { getAppPathForEntity } from 'sly/web/services/helpers/appPaths';

const Wrapper = mobileOnly(borderRadius(pad(Tr, 'large'), 'small'), css`
  display: flex;
  flex-direction: column;
  padding: ${size('spacing.large')};
  background: ${palette('white', 'base')};
  border: ${size('spacing.nano')} solid ${palette('slate', 'stroke')};
`);

const StyledNameCell = ({
  disabled, task, to, ...props
}) => (
  <Td disabled={disabled} {...props}>
    <ClampedText>
      <Link to={to} {...props}>
        {task.title}
      </Link>
    </ClampedText>
  </Td>
);

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
StageCell.displayName = 'StageCell';

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

const getColor = ({ priority }) => {
  switch(priority) {
    case "Urgent":
      return palette('danger','base');
    case "High":
      return palette('warning','base');
    default:
      return palette('slate','base');
  }
};

const PriorityCell = pad(mobileOnly(StyledTd, css`
  ${twoColumnCss};
  order: 5;
`), 'regular');

PriorityCell.displayName = 'PriorityCell';

const StyledBadge = styled(Badge)`
  text-transform: uppercase;
  color: ${palette('white','base')};
  background-color: ${ props => getColor(props)};
`;

const TaskRowCard = ({ task, onTaskClick }) => {
  const {
    dueDate, status, owner, relatedEntities, priority,
  } = task;
  const dueDateStr = dayjs(dueDate).format('MM/DD/YYYY');
  return (
    <Wrapper>
      <NameCell task={task} onClick={() => onTaskClick(task)} />
      <RelatedToCell>
        {relatedEntities && relatedEntities[0] &&
          <Link to={getAppPathForEntity(relatedEntities[0])}>
            <span>Related to: </span>
            <span>{relatedEntities[0].label}</span>
          </Link>
        }
      </RelatedToCell>
      <DueDateCell>
        <span>Due date</span>
        <span>{dueDateStr}</span>
      </DueDateCell>
      <StageCell>
        <span>{status}</span>
      </StageCell>
      <PriorityCell>
        <span>Priority</span>
        <StyledBadge badgePalette="warning" palette="white" priority={priority}>{priority}</StyledBadge>
      </PriorityCell>
      <AssignedToCell>
        <span>Assigned to</span>
        <span>{owner && owner.name}</span>
      </AssignedToCell>
    </Wrapper>
  );
};

TaskRowCard.propTypes = {
  task: taskPropType.isRequired,
  onTaskClick: func.isRequired,
};

export default TaskRowCard;
