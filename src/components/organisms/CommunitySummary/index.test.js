import React from 'react';
import { shallow } from 'enzyme';

import CommunitySummary from 'sly/components/organisms/CommunitySummary';
import CommunityPricingAndRating from 'sly/components/molecules/CommunityPricingAndRating';
import { Link } from 'sly/components/atoms';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import { CONTINUING_CARE_RETIREMENT_COMMUNITY } from 'sly/constants/tags';

const searchParams = {
  city: 'san-carlos',
  communitySlug: 'rhoda-goldman-plaza',
  state: 'california',
  toc: 'assisted-living',
};

const wrap = (props = {}) => shallow(<CommunitySummary {...props} searchParams={searchParams} />);

const getCommunity = (state, tag) => {
  const community = { ...RhodaGoldmanPlaza };

  community.address.state = state;

  if (tag) {
    community.propInfo.typeCare = [...community.propInfo.typeCare, tag];
  }

  return community;
};

const verify = (wrapper) => {
  const {
    address, name,
  } = RhodaGoldmanPlaza;
  const {
    line1, line2, city, state, zip,
  } = address;
  const renderedAddress = wrapper.find('Heading').dive().render()
    .text();
  const renderedWrapper = wrapper.find('Wrapper');

  expect(renderedAddress).toContain(line1);
  expect(renderedAddress).toContain(line2);
  expect(renderedAddress).toContain(city);
  expect(renderedAddress).toContain(state);
  expect(renderedAddress).toContain(zip);
  expect(wrapper.find('StyledHeading').render().text()).toContain(name);
  expect(wrapper.find(CommunityPricingAndRating)).toHaveLength(1);
  expect(renderedWrapper.childAt(0).find(Link)).toHaveLength(1);
};

describe('CommunitySummary', () => {
  it('renders', () => {
    const wrapper = wrap({
      community: RhodaGoldmanPlaza,
    });
    verify(wrapper);
    expect(wrapper.find('Wrapper').childAt(1).find('StyledIconButton').find({ icon: 'favourite-empty' })).toHaveLength(1);
  });

  it('renders with favourited', () => {
    const wrapper = wrap({
      community: RhodaGoldmanPlaza,
      isFavorited: true,
    });
    verify(wrapper);
    expect(wrapper.find('Wrapper').childAt(1).find('StyledIconButton').find({ icon: 'favourite-light' })).toHaveLength(1);
  });

  it('onShareClick called', () => {
    const onShareClick = jest.fn();
    const wrapper = wrap({
      community: RhodaGoldmanPlaza,
      onShareClick,
    });
    wrapper.find('Wrapper').childAt(1).find('StyledIconButton').find({ icon: 'share' })
      .simulate('click');
    expect(onShareClick).toHaveBeenCalled();
  });

  it('onFavouriteClick called', () => {
    const onFavouriteClick = jest.fn();
    const wrapper = wrap({
      community: RhodaGoldmanPlaza,
      onFavouriteClick,
    });
    wrapper.find('Wrapper').childAt(1).find('StyledIconButton')
      .at(1)
      .simulate('click');
    expect(onFavouriteClick).toHaveBeenCalled();
  });

  it('onFavouriteClick called when isFavourited', () => {
    const onFavouriteClick = jest.fn();
    const wrapper = wrap({
      community: RhodaGoldmanPlaza,
      isFavourited: true,
      onFavouriteClick,
    });
    wrapper.find('Wrapper').childAt(1).find('StyledIconButton')
      .at(1)
      .simulate('click');
    expect(onFavouriteClick).toHaveBeenCalled();
  });

  it('renders with isAdmin', () => {
    const wrapper = wrap({
      community: RhodaGoldmanPlaza,
      isAdmin: true,
    });
    verify(wrapper);
    expect(wrapper.find('StyledHeading').dive().find(Link)).toHaveLength(1);
  });

  it('Should render the care types tags for state Delaware', () => {
    const community = getCommunity('DE');
    const wrapper = wrap({
      community,
    });
    const styledTags = wrapper.find('StyledTag');

    expect(styledTags.get(0).props.children).toBe('Assisted Living');
    expect(styledTags.get(1).props.children).toBe('Memory Care');

    verify(wrapper);
    expect(styledTags).toHaveLength(2);
    wrapper.find('StyledTag');
  });

  it('Should render the care types tags for state Pennsylvania', () => {
    const community = getCommunity('PA');
    const wrapper = wrap({
      community,
    });
    const styledTags = wrapper.find('StyledTag');

    expect(styledTags.get(0).props.children).toBe('Personal Care Home');
    expect(styledTags.get(1).props.children).toBe('Memory Care');

    verify(wrapper);
    expect(styledTags).toHaveLength(2);
    wrapper.find('StyledTag');
  });

  it('Should render the care types tags for state Georgia', () => {
    const community = getCommunity('GA');
    const wrapper = wrap({
      community,
    });
    const styledTags = wrapper.find('StyledTag');

    expect(styledTags.get(0).props.children).toBe('Personal Care Home');
    expect(styledTags.get(1).props.children).toBe('Memory Care');

    verify(wrapper);
    expect(styledTags).toHaveLength(2);
    wrapper.find('StyledTag');
  });

  it('Should render the care types tags for state Kentucky', () => {
    const community = getCommunity('KY');
    const wrapper = wrap({
      community,
    });
    const styledTags = wrapper.find('StyledTag');

    expect(styledTags.get(0).props.children).toBe('Personal Care Home');
    expect(styledTags.get(1).props.children).toBe('Memory Care');

    verify(wrapper);
    expect(styledTags).toHaveLength(2);
    wrapper.find('StyledTag');
  });

  it.only('Should render CCRC', () => {
    const community = getCommunity('DE', CONTINUING_CARE_RETIREMENT_COMMUNITY);
    const wrapper = wrap({
      community,
    });
    const styledTags = wrapper.find('StyledTag');

    expect(styledTags.get(0).props.children).toBe('Assisted Living');
    expect(styledTags.get(1).props.children).toBe('Memory Care');
    expect(styledTags.get(2).props.children).toBe('CCRC');

    verify(wrapper);
    expect(styledTags).toHaveLength(3);
    wrapper.find('StyledTag');
  });
});
