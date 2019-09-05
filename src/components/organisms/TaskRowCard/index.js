import React from 'react';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import { func, string, bool } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import taskPropType from 'sly/propTypes/task';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import pad from 'sly/components/helpers/pad';
import borderRadius from 'sly/components/helpers/borderRadius';
import { TASK_PRIORITY_LABEL_MAP } from 'sly/constants/tasks';
import { Link } from 'sly/components/atoms';
import { Td, Tr } from 'sly/components/atoms/Table';
import Stage from 'sly/components/molecules/Stage';

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
    <Link to={to} {...props}>
      {task.title}
    </Link>
  </Td>
);

StyledNameCell.propTypes = {
  disabled: bool,
  task: taskPropType,
  to: string,
};

const NameCell = mobileOnly(pad(StyledNameCell, 'regular'), css`
  font-weight: ${size('weight.medium')};
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

const TaskRowCard = ({ task, onTaskClick }) => {
  const {
    due_date, status, owner, creator, priority,
  } = task;
  const dueDateStr = dayjs(due_date).format('MM/DD/YYYY, hh:mmA');

  return (
    <Wrapper>
      <NameCell task={task} onClick={() => onTaskClick(task)} />
      <RelatedToCell>
        <span>Related to</span>
        <span>{creator.name}</span>
      </RelatedToCell>
      <DueDateCell>
        <span>Due date</span>
        <span>{dueDateStr}</span>
      </DueDateCell>
      <StageCell>
        <Stage stageType="task" stage={status} />
      </StageCell>
      <PriorityCell>
        <span>Priority</span>
        <span>{TASK_PRIORITY_LABEL_MAP[priority]}</span>
      </PriorityCell>
      <AssignedToCell>
        <span>Assigned to</span>
        <span>{owner.name}</span>
      </AssignedToCell>
    </Wrapper>
  );
};

TaskRowCard.propTypes = {
  task: taskPropType.isRequired,
  onTaskClick: func.isRequired,
};

export default TaskRowCard;
