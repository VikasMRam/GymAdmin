import React from 'react';
import { shallow } from 'enzyme';

import AddTaskForm from 'sly/components/organisms/AddTaskForm';
import { TASK_STATUS_ORDERED, TASK_PRIORITIES_ORDERED } from 'sly/constants/tasks';
import AmalFrancis from 'sly/../private/storybook/sample-data/user-amal-francis.json';
import SushanthRamakrishna from 'sly/../private/storybook/sample-data/user-sushanth-ramakrishna.json';

const assignedTos = [
  AmalFrancis,
  SushanthRamakrishna,
];
const statuses = TASK_STATUS_ORDERED;
const priorities = TASK_PRIORITIES_ORDERED;

const defaultValues = {
  assignedTos,
  statuses,
  priorities,
};
const wrap = (props = {}) => shallow(<AddTaskForm {...defaultValues} {...props} />);

describe('AddTaskForm', () => {
  it('renders', () => {
    const wrapper = wrap();
    const statusField = wrapper.find('Field').find({ name: 'status' });
    const priorityField = wrapper.find('Field').find({ name: 'priority' });
    const ownerField = wrapper.find('Field').find({ name: 'owner' });

    expect(wrapper.find('Field').find({ name: 'title' })).toHaveLength(1);
    expect(wrapper.find('Field').find({ name: 'due_date' })).toHaveLength(1);
    expect(wrapper.find('Field').find({ name: 'creator' })).toHaveLength(1);
    expect(ownerField).toHaveLength(1);
    expect(ownerField.prop('options').map(o => o.value)).toEqual(assignedTos.map(a => a.id));
    expect(statusField).toHaveLength(1);
    expect(statusField.prop('options').map(o => o.value)).toEqual(statuses);
    expect(priorityField).toHaveLength(1);
    expect(priorityField.prop('options').map(o => o.value)).toEqual(priorities);
    expect(wrapper.find('Field').find({ name: 'description' })).toHaveLength(1);
  });
});
