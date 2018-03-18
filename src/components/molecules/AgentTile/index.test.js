import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import AgentTile, { CaptionSpan } from '.';

const wrap = (props = {}) => shallow(<AgentTile {...props} />);

const name = 'Fonz';
const picture = 'https://avatars.githubusercontent.com/u/113003';
const title = 'Property Manager';
const community = {
  name: 'Rhoda Goldman Plaza',
  uri: '/assisted-living/california/san-francisco/rhoda-goldman-plaza',
};

const userFull = {
  name,
  picture,
  title,
};
const userNothing = { name };
const userNoTitle = { name, picture, rating: 5 };
const userWithRating = { ...userFull, rating: 5 };

describe('AgentTile', () => {
  it('renders full', () => {
    const wrapper = wrap({ user: userWithRating, community, palette: 'random' });
    const avatar = wrapper.find('Avatar');
    const title = wrapper.find('Title').dive();
    const link = title.find('Link');
    expect(avatar.prop('user')).toEqual(userWithRating);
    expect(avatar.prop('palette')).toEqual('random');
    expect(link.prop('to')).toEqual(community.uri);
    expect(link.prop('children')).toEqual(community.name);
  });

  it('renders with no title but community', () => {
    const wrapper = wrap({ user: userNoTitle, community });
    const title = wrapper.find('Title').dive();
    const caption = title.find(CaptionSpan);
    const captionContent = caption.prop('children');
    expect(captionContent.slice(0, 2)).toEqual([undefined, undefined]);
    expect(caption.find('Link')).toHaveLength(1);
  });

  it('renders with no community but title', () => {
    const wrapper = wrap({ user: userFull });
    const title = wrapper.find('Title').dive();
    const caption = title.find(CaptionSpan);
    const captionContent = caption.prop('children');
    expect(captionContent).toEqual([userFull.title, undefined, undefined]);
    expect(caption.find('Link')).toHaveLength(0);
  });

  it('renders with community and title', () => {
    const wrapper = wrap({ user: userFull, community });
    const title = wrapper.find('Title').dive();
    const caption = title.find(CaptionSpan);
    const captionContent = caption.prop('children');
    expect(captionContent.slice(0, 2)).toEqual([userFull.title, ', ']);
    expect(caption.find('Link')).toHaveLength(1);
  });
});
