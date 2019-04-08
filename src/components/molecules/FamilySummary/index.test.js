import React from 'react';
import { shallow } from 'enzyme';

import { Block } from 'sly/components/atoms';
import FamilySummary from 'sly/components/molecules/FamilySummary';
import PraneshKumar from 'sly/../private/storybook/sample-data/user-pranesh-kumar.json';

const href = '/sdfsdf';
const defaultProps = {
  href,
};
const wrap = (props = {}) => shallow(<FamilySummary {...defaultProps} {...props} />);

describe('FamilySummary', () => {
  it('renders', () => {
    const wrapper = wrap({
      user: PraneshKumar,
    });

    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(0)
      .find(Block)
      .contains(PraneshKumar.name)).toBe(true);
    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(1)
      .find(Block)
      .contains(PraneshKumar.uuidAux.uuidInfo.residentInfo.fullName)).toBe(true);
    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(2)
      .find(Block)
      .contains(PraneshKumar.uuidAux.uuidInfo.housingInfo.lookingFor)).toBe(true);
    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(3)
      .find(Block)
      .contains(PraneshKumar.uuidAux.uuidInfo.residentInfo.gender)).toBe(true);
    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(4)
      .find(Block)
      .contains(PraneshKumar.uuidAux.uuidInfo.locationInfo.city)).toBe(true);
    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(5)
      .find(Block)
      .contains(PraneshKumar.uuidAux.uuidInfo.housingInfo.moveTimeline)).toBe(true);
  });

  it('see more details href', () => {
    const wrapper = wrap({
      user: PraneshKumar,
    });

    expect(wrapper.dive().find('StyledLink').prop('href')).toBe(href);
  });
});
