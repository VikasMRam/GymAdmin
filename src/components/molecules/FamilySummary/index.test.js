import React from 'react';
import { shallow } from 'enzyme';

import { Block } from 'sly/components/atoms';
import FamilySummary from 'sly/components/molecules/FamilySummary';
import PraneshKumar from 'sly/../private/storybook/sample-data/client-pranesh-kumar.json';

const to = '/sdfsdf';
const defaultProps = {
  to,
};
const wrap = (props = {}) => shallow(<FamilySummary {...defaultProps} {...props} />);

describe('FamilySummary', () => {
  it('renders', () => {
    const wrapper = wrap({
      client: PraneshKumar,
    });

    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(0)
      .find(Block)
      .contains(PraneshKumar.clientInfo.name)).toBe(true);
    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(1)
      .find(Block)
      .contains(PraneshKumar.uuidAux.uuidInfo.residentInfo.fullName)).toBe(true);
    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(5)
      .find(Block)
      .contains(PraneshKumar.uuidAux.uuidInfo.housingInfo.lookingFor)).toBe(true);
    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(6)
      .find(Block)
      .contains(PraneshKumar.uuidAux.uuidInfo.residentInfo.gender)).toBe(true);
    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(7)
      .find(Block)
      .contains(PraneshKumar.uuidAux.uuidInfo.locationInfo.city)).toBe(true);
    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(8)
      .find(Block)
      .contains(PraneshKumar.uuidAux.uuidInfo.housingInfo.moveTimeline)).toBe(true);
    expect(wrapper
      .dive()
      .find('SlyIntro')
      .find(Block)
      .contains(PraneshKumar.clientInfo.slyMessage)).toBe(true);
  });

  it('see more details href', () => {
    const wrapper = wrap({
      client: PraneshKumar,
    });

    expect(wrapper.dive().find('StyledLink').at(2).prop('to')).toBe(to);
  });
});
