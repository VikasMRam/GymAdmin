import React from 'react';
import { mount } from 'enzyme';
import dayjs from 'dayjs';
import { BrowserRouter } from 'react-router-dom';

import ClientRowCard from '.';

import {
  Icon,
} from 'sly/web/components/atoms';
import clients from 'sly/storybook/sample-data/clients.json';
import { FAMILY_STATUS_ON_PAUSE } from 'sly/web/constants/familyDetails';

const resName = 'Res Name';
const activeClient = clients[1];
activeClient.residentName = resName;
const createdDate = dayjs(activeClient.createdAt).format('MM/DD/YYYY');

const wrap = (props = { client: activeClient }) => mount(<BrowserRouter><ClientRowCard  {...props} /></BrowserRouter>, {
  attachTo: document.createElement('tbody'),
});

describe('ClientRowCard', () => {
  it('should render ClientRowCard', () => {
    const wrapper = wrap();
    const {
      clientInfo: { name }, stage,
    } = activeClient;
    const nameCell = wrapper.find('NameCell');

    expect(nameCell).toHaveLength(1);
    expect(nameCell.text()).toContain(name);
    expect(wrapper.find('ResidentCell').contains(resName)).toBeTruthy();
    expect(wrapper.find('Stage').prop('stage')).toBe(stage);
    expect(wrapper.find('NoteCell')).toHaveLength(1);

    expect(wrapper.find('DateAddedCell').contains(createdDate)).toBeTruthy();
  });

  it('should not render pause icon for active families', () => {
    const wrapper = wrap();
    const nameCell = wrapper.find('NameCell');

    expect(nameCell.find(Icon)).toHaveLength(0);
  });

  it('should render pause icon for inactive families', () => {
    const client = { ...activeClient, status: FAMILY_STATUS_ON_PAUSE };
    const {
      clientInfo: { name },
    } = activeClient;

    const wrapper = wrap({ client });
    const nameCell = wrapper.find('NameCell');

    expect(nameCell).toHaveLength(1);
    expect(nameCell.render().text()).toContain(name);
    expect(nameCell.find(Icon)).toHaveLength(1);

    expect(wrapper.find('DateAddedCell').contains(createdDate)).toBeTruthy();
  });
});
