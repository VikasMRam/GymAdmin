import React from 'react';
import { shallow } from 'enzyme';

import agent from 'sly/web/../private/storybook/sample-data/agent-linda-iwamota.json';
import AgentRowCard from 'sly/web/components/organisms/AgentRowCard';

const onAgentClick = jest.fn();
const defaultValues = {
  agent,
  onAgentClick,
};

const wrap = (props = {}) => shallow(<AgentRowCard {...defaultValues} {...props} />);

describe('AgentRowCard', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('NameCell')).toHaveLength(1);
    expect(wrapper.find('NameCell').render().text()).toContain(agent.name);
    expect(wrapper.find('DisplayNameCell').find('span').at(0).text()).toEqual('Display Name');
    expect(wrapper.find('DisplayNameCell').find('span').at(1).text()).toEqual(agent.info.displayName);
    expect(wrapper.find('AddressCell').find('span').at(0).text()).toEqual('Address');
    expect(wrapper.find('AddressCell').find('span').at(1).text()).toEqual('625 Eskaton Circle, Grass Valley, 95945, CA');
    expect(wrapper.find('StatusCell').find('span').at(0).text()).toEqual('Status');
    expect(wrapper.find('StatusCell').find('span').at(1).text()).toEqual('Live on Profile');
  });

  it('handles onAgentClick', () => {
    const wrapper = wrap();
    wrapper.find('NameCell').simulate('click');
    expect(onAgentClick).toHaveBeenCalled();
  });
});
