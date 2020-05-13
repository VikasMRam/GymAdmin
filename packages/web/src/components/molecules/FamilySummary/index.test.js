import React from 'react';
import { shallow } from 'enzyme';

import { Block } from 'sly/web/components/atoms';
import FamilySummary from 'sly/web/components/molecules/FamilySummary';
import PraneshKumar from 'sly/web/../private/storybook/sample-data/client-pranesh-kumar.json';

// For deep cloning object
const clientWithMedicaid = JSON.parse(JSON.stringify(PraneshKumar));
clientWithMedicaid.uuidAux.uuidInfo.financialInfo.medicaid = true;

const to = '/sdfsdf';
const defaultProps = {
  to,
  client: PraneshKumar,
};
const wrap = (props = {}) => shallow(<FamilySummary {...defaultProps} {...props} />);

describe('FamilySummary', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(0)
      .find(Block)
      .contains(PraneshKumar.uuidAux.uuidInfo.residentInfo.fullName)).toBeTruthy();
    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(4)
      .find(Block)
      .contains(PraneshKumar.uuidAux.uuidInfo.housingInfo.lookingFor)).toBeTruthy();
    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(5)
      .find(Block)
      .contains(PraneshKumar.uuidAux.uuidInfo.residentInfo.gender)).toBeTruthy();
    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(6)
      .find(Block)
      .contains(`${PraneshKumar.uuidAux.uuidInfo.locationInfo.city}, ${PraneshKumar.uuidAux.uuidInfo.locationInfo.state}`)).toBeTruthy();
    expect(wrapper.dive().find('OuterColumWrapper').dive()
      .find('ColumWrapper')
      .at(7)
      .find(Block)
      .contains(PraneshKumar.uuidAux.uuidInfo.housingInfo.moveTimeline)).toBeTruthy();
    expect(wrapper
      .dive()
      .find('SlyIntro')
      .find(Block)
      .contains(PraneshKumar.clientInfo.slyMessage)).toBeTruthy();
  });

  it('see more details href', () => {
    const wrapper = wrap();

    expect(wrapper.dive().find('StyledLink').at(2).prop('to')).toBe(to);
  });

  it('renders medicard', () => {
    const wrapper = wrap({
      client: clientWithMedicaid,
    });
    expect(wrapper.contains('Medicaid')).toBeTruthy();
    expect(wrapper.contains('Chose Qualifies on Wizard')).toBeTruthy();
  });

  it('does not render medicard for agents', () => {
    const wrapper = wrap({
      client: clientWithMedicaid,
      isAgentUser: true,
    });
    expect(wrapper.contains('Medicaid')).toBeFalsy();
    expect(wrapper.contains('Chose Qualifies on Wizard')).toBeFalsy();
  });
});
