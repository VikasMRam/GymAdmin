import React from 'react';
import { shallow } from 'enzyme';

import AgentTile from 'sly/components/molecules/AgentTile';
import { phoneFormatter } from 'sly/services/helpers/phone';
import LindaIwamota from 'sly/../private/storybook/sample-data/agent-linda-iwamota.json';

const agentNoFams = {
  ...LindaIwamota,
  info: {
    ...LindaIwamota.info,
    recentFamiliesHelped: 0,
  },
};

const agentNoRatings = {
  ...LindaIwamota,
  aggregateRating: {
    ...LindaIwamota.aggregateRating,
    numRatings: 0,
  },
};

const formattedPhoneNumber = phoneFormatter(LindaIwamota.info.slyPhone);

const wrap = (props = {}) => shallow(<AgentTile agent={LindaIwamota} {...props} />);

describe('AgentTile', () => {
  it('renders full', () => {
    const wrapper = wrap();
    expect(wrapper.find('ProfileImage').prop('src')).toEqual(LindaIwamota.info.profileImageUrl);
    expect(wrapper.find('Badge').render().text()).toEqual(`${LindaIwamota.info.recentFamiliesHelped} families helped`);

    const name = wrapper.find('Name');
    expect(name.render().text()).toEqual(LindaIwamota.info.displayName);

    const link = wrapper.find('Box').find('List').find('Link');
    expect(link.prop('to')).toEqual(LindaIwamota.url);

    const linkContent = shallow(<div>{link.prop('children')}</div>);
    expect(linkContent.render().text()).toEqual(`${LindaIwamota.aggregateRating.numRatings} reviews`);

    expect(wrapper.find('IconItem').first().prop('icon')).toEqual('phone');
    expect(wrapper.find('IconItem').first().prop('children')).toEqual(formattedPhoneNumber);

    expect(wrapper.find('IconItem').last().prop('icon')).toEqual('location');

    expect(wrapper.find('IconItem').last().dive().dive()
      .find('Block')
      .dive()
      .text()).toEqual(`${LindaIwamota.address.city}, ${LindaIwamota.address.state}`);
  });

  it('no families', () => {
    const wrapper = wrap({ agent: agentNoFams });
    expect(wrapper.find('ProfileImage').prop('src')).toEqual(LindaIwamota.info.profileImageUrl);
    expect(wrapper.find('Badge').length).toEqual(0);

    const name = wrapper.find('Name');
    expect(name.render().text()).toEqual(LindaIwamota.info.displayName);

    const link = wrapper.find('Link');
    expect(link.prop('to')).toEqual(LindaIwamota.url);

    const linkContent = shallow(<div>{link.prop('children')}</div>);
    expect(linkContent.render().text()).toEqual(`${LindaIwamota.aggregateRating.numRatings} reviews`);

    expect(wrapper.find('IconItem').first().prop('icon')).toEqual('phone');
    expect(wrapper.find('IconItem').first().prop('children')).toEqual(formattedPhoneNumber);

    expect(wrapper.find('IconItem').at(1).prop('icon')).toEqual('star');
    expect(wrapper.find('IconItem').last().prop('icon')).toEqual('location');

    expect(wrapper.find('IconItem').last().dive().dive()
      .find('Block')
      .dive()
      .text()).toEqual(`${LindaIwamota.address.city}, ${LindaIwamota.address.state}`);
  });

  it('no ratings', () => {
    const wrapper = wrap({ agent: agentNoRatings });
    expect(wrapper.find('ProfileImage').prop('src')).toEqual(LindaIwamota.info.profileImageUrl);
    expect(wrapper.find('Badge').render().text()).toEqual(`${LindaIwamota.info.recentFamiliesHelped} families helped`);

    const name = wrapper.find('Name');
    expect(name.render().text()).toEqual(LindaIwamota.info.displayName);

    const links = wrapper.find('Link');
    expect(links.length).toBe(0);

    expect(wrapper.find('IconItem').first().prop('icon')).toEqual('phone');
    expect(wrapper.find('IconItem').first().prop('children')).toEqual(formattedPhoneNumber);

    expect(wrapper.find('IconItem').last().dive().dive()
      .find('Block')
      .dive()
      .text()).toEqual(`${LindaIwamota.address.city}, ${LindaIwamota.address.state}`);
  });
});
