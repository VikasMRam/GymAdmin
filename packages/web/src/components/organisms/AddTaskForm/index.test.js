import React from 'react';
import { shallow } from 'enzyme';

import AddTaskForm from 'sly/web/components/organisms/AddTaskForm';
import { TASK_STATUS_ORDERED, TASK_PRIORITIES_ORDERED } from 'sly/web/constants/tasks';
import AmalFrancis from 'sly/storybook/sample-data/user-amal-francis.json';
import SushanthRamakrishna from 'sly/storybook/sample-data/user-sushanth-ramakrishna.json';

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
    expect(wrapper.find('Field').find({ name: 'dueDate' })).toHaveLength(1);
    expect(wrapper.find('Field').find({ name: 'relatedTo' })).toHaveLength(0);
    expect(ownerField).toHaveLength(1);
    // todo uncomment after enabling react select
    // expect(ownerField.prop('options').map(o => o.value)).toEqual(assignedTos.map(a => a.id));
    expect(statusField).toHaveLength(1);
    // expect(statusField.prop('options').map(o => o.value)).toEqual(statuses);
    expect(priorityField).toHaveLength(1);
    // expect(priorityField.prop('options').map(o => o.value)).toEqual(priorities);
    expect(wrapper.find('Field').find({ name: 'description' })).toHaveLength(1);
  });

  it('renders with relatedTo', () => {
    const initialValues = {
      relatedTo: 'test',
    };
    const wrapper = wrap({
      initialValues,
    });

    expect(wrapper.find('Field').find({ name: 'relatedTo' })).toHaveLength(1);
  });
});
