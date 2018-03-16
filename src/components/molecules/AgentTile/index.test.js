import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import AgentTile from '.';

const wrap = (props = {}) => shallow(<AgentTile {...props} />).dive();

const name = 'Fonz';
const picture = 'https://avatars.githubusercontent.com/u/113003';
const title = 'Property Manager';
const community = {
  name: 'Rhoda Goldman Plaza',
  uri: '/assisted-living/california/san-francisco/rhoda-goldman-plaza',
};

const userFull = { name, picture, title, community };
const userNoTitle = { name, picture, community };
const userNothing = { name };
const userWithRating = { ...userFull, rating: 5 };

describe('AgentTile', () => {
  it('renders full', () => {
    const wrapper = wrap({ user: userWithRating }); 
    expect(wrapper.find('Avatar')).toHaveLength(1);
    expect(wrapper.find('Title')).toHaveLength(1);
    const title = wrapper.find('Title').dive();
    expect(title.dive().find('Link')).toHaveLength(1);
    expect(title.dive().text()).toEqual('Fonz<styled.span /><Rating />');
  });
});
