import React from 'react';
import { shallow } from 'enzyme';

import AgentTile from 'sly/components/molecules/AgentTile';

const address = {
  city: 'San Anselmo',
  state: 'CA',
};

const aggregateRating = {
  ratingValue: 4.5,
  numRatings: 14,
};

const agentInfo = {
  displayName: 'Fonz Wasserstrom',
  slyPhone: '9258906575',
  recentFamiliesHelped: 17,
  profileImageUrl: 'https://avatars.githubusercontent.com/u/113003',
  citiesServed: ['Utah', 'Calcuta'],
};

const agent = {
  url: '/agents/midwest/fonz-wasserstrom',
  address,
  aggregateRating,
  info: agentInfo,
};

const agentNoFams = {
  ...agent,
  info: {
    ...agentInfo,
    recentFamiliesHelped: 0,
  },
};

const agentNoRatings = {
  ...agent,
  aggregateRating: {
    ...aggregateRating,
    numRatings: 0,
  },
};

const wrap = (props = {}) => shallow(<AgentTile agent={agent} {...props} />);

describe('AgentTile', () => {
  it('renders full', () => {
    const wrapper = wrap();
    expect(wrapper.find('ProfileImage').prop('src')).toEqual(agentInfo.profileImageUrl);
    expect(wrapper.find('Badge').render().text()).toEqual('17 families helped');

    const name = wrapper.find('Name');
    expect(name.render().text()).toEqual(agentInfo.displayName);

    const link = wrapper.find('Link');
    expect(link.prop('to')).toEqual(agent.url);

    const linkContent = shallow(<div>{link.prop('children')}</div>);
    expect(linkContent.render().text()).toEqual(`${aggregateRating.numRatings} reviews`);

    expect(wrapper.find('IconItem').first().prop('icon')).toEqual('phone');
    expect(wrapper.find('IconItem').first().prop('children')).toEqual('925-890-6575');

    expect(wrapper.find('IconItem').last().prop('icon')).toEqual('location');

    expect(wrapper.find('IconItem').last().dive().dive()
      .find('Block')
      .dive()
      .text()).toEqual('San Anselmo, CA');
  });

  it('no families', () => {
    const wrapper = wrap({ agent: agentNoFams });
    expect(wrapper.find('ProfileImage').prop('src')).toEqual(agentInfo.profileImageUrl);
    expect(wrapper.find('Badge').length).toEqual(0);

    const name = wrapper.find('Name');
    expect(name.render().text()).toEqual(agentInfo.displayName);

    const link = wrapper.find('Link');
    expect(link.prop('to')).toEqual(agent.url);

    const linkContent = shallow(<div>{link.prop('children')}</div>);
    expect(linkContent.render().text()).toEqual(`${aggregateRating.numRatings} reviews`);

    expect(wrapper.find('IconItem').first().prop('icon')).toEqual('phone');
    expect(wrapper.find('IconItem').first().prop('children')).toEqual('925-890-6575');

    expect(wrapper.find('IconItem').at(1).prop('icon')).toEqual('star');
    expect(wrapper.find('IconItem').last().prop('icon')).toEqual('location');

    expect(wrapper.find('IconItem').last().dive().dive()
      .find('Block')
      .dive()
      .text()).toEqual('San Anselmo, CA');
  });

  it('no ratings', () => {
    const wrapper = wrap({ agent: agentNoRatings });
    expect(wrapper.find('ProfileImage').prop('src')).toEqual(agentInfo.profileImageUrl);
    expect(wrapper.find('Badge').render().text()).toEqual('17 families helped');

    const name = wrapper.find('Name');
    expect(name.render().text()).toEqual(agentInfo.displayName);

    const links = wrapper.find('Link');
    expect(links.length).toBe(0);

    expect(wrapper.find('IconItem').first().prop('icon')).toEqual('phone');
    expect(wrapper.find('IconItem').first().prop('children')).toEqual('925-890-6575');

    expect(wrapper.find('IconItem').last().dive().dive()
      .find('Block')
      .dive()
      .text()).toEqual('San Anselmo, CA');
  });
});
