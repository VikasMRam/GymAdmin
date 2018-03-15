import React from 'react';
import { shallow } from 'enzyme';
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
  it('pass');
});
