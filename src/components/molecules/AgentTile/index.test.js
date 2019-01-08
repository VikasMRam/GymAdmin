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

    const links = wrapper.find('Link');
    expect(links.length).toBe(2);

    expect(links.first().prop('to')).toEqual(agent.url);
    expect(links.first().prop('children')).toEqual(agentInfo.displayName);

    expect(links.last().prop('to')).toEqual(agent.url);
    const secondLinkContent = shallow(<div>{links.last().prop('children')}</div>);
    expect(secondLinkContent.render().text()).toEqual(`${aggregateRating.numRatings} reviews`);

    expect(wrapper.find('IconItem').first().prop('icon')).toEqual('phone');
    expect(wrapper.find('IconItem').first().prop('children')).toEqual('925-890-6575');

    expect(wrapper.find('IconItem').last().prop('icon')).toEqual('star');

    expect(wrapper.find('Block').render().text()).toEqual('San Anselmo, CA');
  });

  it('no families', () => {
    const wrapper = wrap({ agent: agentNoFams });
    expect(wrapper.find('ProfileImage').prop('src')).toEqual(agentInfo.profileImageUrl);
    expect(wrapper.find('Badge').length).toEqual(0);

    const links = wrapper.find('Link');
    expect(links.length).toBe(2);

    expect(links.first().prop('to')).toEqual(agent.url);
    expect(links.first().prop('children')).toEqual(agentInfo.displayName);

    expect(links.last().prop('to')).toEqual(agent.url);
    const secondLinkContent = shallow(<div>{links.last().prop('children')}</div>);
    expect(secondLinkContent.render().text()).toEqual(`${aggregateRating.numRatings} reviews`);

    expect(wrapper.find('IconItem').first().prop('icon')).toEqual('phone');
    expect(wrapper.find('IconItem').first().prop('children')).toEqual('925-890-6575');

    expect(wrapper.find('IconItem').last().prop('icon')).toEqual('star');

    expect(wrapper.find('Block').render().text()).toEqual('San Anselmo, CA');
  });

  it('no ratings', () => {
    const wrapper = wrap({ agent: agentNoRatings });
    expect(wrapper.find('ProfileImage').prop('src')).toEqual(agentInfo.profileImageUrl);
    expect(wrapper.find('Badge').render().text()).toEqual('17 families helped');

    const links = wrapper.find('Link');
    expect(links.length).toBe(1);

    expect(links.first().prop('to')).toEqual(agent.url);
    expect(links.first().prop('children')).toEqual(agentInfo.displayName);

    expect(wrapper.find('IconItem').first().prop('icon')).toEqual('phone');
    expect(wrapper.find('IconItem').first().prop('children')).toEqual('925-890-6575');

    expect(wrapper.find('Block').render().text()).toEqual('San Anselmo, CA');
  });
});
