import React from 'react';
import { shallow } from 'enzyme';

import DashboardFamilySummary from 'sly/web/components/molecules/DashboardFamilySummary';
import PraneshKumar from 'sly/storybook/sample-data/client-pranesh-kumar.json';

// For deep cloning object
const clientWithMedicaid = JSON.parse(JSON.stringify(PraneshKumar));
clientWithMedicaid.uuidAux.uuidInfo.financialInfo.medicaid = true;

const to = '/sdfsdf';
const defaultProps = {
  to,
  user: {},
  stageText: '',
  client: PraneshKumar,
};
const wrap = (props = {}) => shallow(<DashboardFamilySummary {...defaultProps} {...props} />);

describe('DashboardFamilySummary', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('SummaryRow')
      .at(0)
      .contains(PraneshKumar.uuidAux.uuidInfo.residentInfo.fullName)).toBeTruthy();
    expect(wrapper.find('SummaryRow')
      .at(4)
      .contains(PraneshKumar.uuidAux.uuidInfo.housingInfo.lookingFor)).toBeTruthy();
    expect(wrapper.find('SummaryRow')
      .at(5)
      .contains(PraneshKumar.uuidAux.uuidInfo.residentInfo.gender)).toBeTruthy();
    expect(wrapper.find('SummaryRow')
      .at(6)
      .contains(`${PraneshKumar.uuidAux.uuidInfo.locationInfo.city}, ${PraneshKumar.uuidAux.uuidInfo.locationInfo.state}`)).toBeTruthy();
    expect(wrapper.find('SummaryRow')
      .at(7)
      .contains(PraneshKumar.uuidAux.uuidInfo.housingInfo.moveTimeline)).toBeTruthy();
    expect(wrapper.find('SummaryRow')
      .at(8)
      .contains(PraneshKumar.clientInfo.slyMessage)).toBeTruthy();
  });

  it('see more details href', () => {
    const wrapper = wrap();

    expect(wrapper.dive().find('Link').at(2).prop('to')).toBe(to);
  });

  it('renders medicard', () => {
    const wrapper = wrap({
      client: clientWithMedicaid,
    });
    expect(wrapper.find('SummaryRow[label="Medicaid"]')).toBeTruthy();
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
