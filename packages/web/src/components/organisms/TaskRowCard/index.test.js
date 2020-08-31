import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';

import task from 'sly/storybook/sample-data/task-1.json';
import TaskRowCard from 'sly/web/components/organisms/TaskRowCard';

const onTaskClick = jest.fn();
const defaultValues = {
  task,
  onTaskClick,
};
const dueDateStr = dayjs(task.dueDate).format('MM/DD/YYYY');

const wrap = (props = {}) => shallow(<TaskRowCard {...defaultValues} {...props} />);

describe('TaskRowCard', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('NameCell')).toHaveLength(1);
    expect(wrapper.find('RelatedToCell').contains(task.relatedEntities[0].label)).toBeTruthy();
    expect(wrapper.find('DueDateCell').contains(dueDateStr)).toBeTruthy();
    expect(wrapper.find('PriorityCell').contains(task.priority.toUpperCase())).toBeTruthy();
    expect(wrapper.find('AssignedToCell').contains(task.owner.name)).toBeTruthy();
    expect(wrapper.find('StageCell').contains(task.status)).toBeTruthy();
  });
});
