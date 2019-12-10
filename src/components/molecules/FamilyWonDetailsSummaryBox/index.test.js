import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';

import { priceFormatter } from 'sly/services/helpers/pricing';
import FamilyWonDetailsSummaryBox from 'sly/components/molecules/FamilyWonDetailsSummaryBox';
import PraneshKumar from 'sly/../private/storybook/sample-data/client-pranesh-kumar.json';

const defaultProps = {
  client: PraneshKumar,
};
const wrap = (props = {}) => shallow(<FamilyWonDetailsSummaryBox {...defaultProps} {...props} />);

describe('FamilyWonDetailsSummaryBox', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('ValueColumn').at(0).contains(dayjs(PraneshKumar.clientInfo.moveInDate).format('MM/DD/YYYY'))).toBeTruthy();
    expect(wrapper.find('ValueColumn').at(1).contains(PraneshKumar.clientInfo.communityName)).toBeTruthy();
    expect(wrapper.find('ValueColumn').at(2).contains(PraneshKumar.clientInfo.moveRoomType)).toBeTruthy();
    expect(wrapper.find('ValueColumn').at(3).contains(priceFormatter(PraneshKumar.clientInfo.monthlyFees))).toBeTruthy();
    expect(wrapper.find('ValueColumn').at(4).contains(PraneshKumar.clientInfo.referralAgreementType)).toBeTruthy();
    if (PraneshKumar.clientInfo.referralAgreementType === 'percentage') {
      expect(wrapper.find('ValueColumn').at(5).contains(PraneshKumar.clientInfo.referralAgreement)).toBeTruthy();
    } else {
      expect(wrapper.find('ValueColumn').at(5).contains(priceFormatter(PraneshKumar.clientInfo.referralAgreement))).toBeTruthy();
    }
    expect(wrapper.find('ValueColumn').at(6).contains(priceFormatter(PraneshKumar.clientInfo.invoiceAmount))).toBeTruthy();
    expect(wrapper.find('ValueColumn').at(7).contains(PraneshKumar.clientInfo.invoiceNumber)).toBeTruthy();
    expect(wrapper.find('ValueColumn').at(8).contains(PraneshKumar.clientInfo.invoicePaid ? 'Yes' : 'No')).toBeTruthy();
  });

  it('onEditClick is called', () => {
    const onEditClick = jest.fn();
    const wrapper = wrap({
      onEditClick,
    });

    wrapper.find('EditDetails').simulate('click');
    expect(onEditClick).toHaveBeenCalled();
  });
});
