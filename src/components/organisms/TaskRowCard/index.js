import React from 'react';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import { func, string, bool } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import taskPropType from 'sly/propTypes/task';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import pad from 'sly/components/helpers/pad';
import borderRadius from 'sly/components/helpers/borderRadius';
import { Link, ClampedText } from 'sly/components/atoms';
import { Td, Tr } from 'sly/components/atoms/Table';
import Stage from 'sly/components/molecules/Stage';
import { getAppPathForEntity } from 'sly/services/helpers/appPaths';

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
    <ClampedText size={size('weight.medium')}>
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
        <Stage stageType="task" stage={status} />
      </StageCell>
      <PriorityCell>
        <span>Priority</span>
        <span>{priority}</span>
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
