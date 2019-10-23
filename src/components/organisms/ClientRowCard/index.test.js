import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';

import ClientRowCard from './index';

import {
  Icon,
} from 'sly/components/atoms';
import clients from 'sly/../private/storybook/sample-data/clients.json';
import { FAMILY_STATUS_ON_PAUSE } from 'sly/constants/familyDetails';

const activeClient = clients[1];
const createdDate = dayjs(activeClient.createdAt).format('MM/DD/YYYY');

const wrap = (props = { client: activeClient }) => shallow(<ClientRowCard  {...props} />);

describe('ClientRowCard', () => {
  it('should render ClientRowCard', () => {
    const wrapper = wrap();
    const {
      clientInfo: { name }, uuidAux: { uuidInfo: { residentInfo: { fullName  } } }, stage,
    } = activeClient;
    const nameCell = wrapper.find('NameCell');

    expect(nameCell).toHaveLength(1);
    expect(nameCell.dive().dive().dive().dive()
      .contains(name)).toBeTruthy();
    expect(wrapper.find('ResidentCell').contains(fullName)).toBeTruthy();
    expect(wrapper.find('Stage').prop('stage')).toBe(stage);
    expect(wrapper.find('NoteCell')).toHaveLength(1);

    expect(wrapper.find('DateAddedCell').contains(createdDate)).toBeTruthy();
  });

  it('should not render pause icon for active families', () => {
    const wrapper = wrap();
    const nameCell = wrapper.find('NameCell');

    expect(nameCell.dive().dive().dive().dive()
      .find(Icon)).toHaveLength(0);
  });

  it('should render pause icon for inactive families', () => {
    const client = { ...activeClient, status: FAMILY_STATUS_ON_PAUSE };
    const {
      clientInfo: { name },
    } = activeClient;

    const wrapper = wrap({ client });
    const nameCell = wrapper.find('NameCell');

    expect(nameCell).toHaveLength(1);
    expect(nameCell.dive().dive().dive().dive()
      .contains(name)).toBeTruthy();
    expect(nameCell.dive().dive().dive().dive()
      .find(Icon)).toHaveLength(1);

    expect(wrapper.find('DateAddedCell').contains(createdDate)).toBeTruthy();
  });
});
