import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';

import { priceFormatter } from 'sly/web/services/helpers/pricing';
import FamilyMetaDataSummaryBox from 'sly/web/components/molecules/FamilyMetaDataSummaryBox';
import { FAMILY_STAGE_REJECTED, FAMILY_STAGE_LOST } from 'sly/web/constants/familyDetails';
import PraneshKumar from 'sly/web/../private/storybook/sample-data/client-pranesh-kumar.json';

// For deep cloning object
const clientWithRejectedStage = JSON.parse(JSON.stringify(PraneshKumar));
clientWithRejectedStage.stage = FAMILY_STAGE_REJECTED;
clientWithRejectedStage.clientInfo = {
  ...PraneshKumar.clientInfo,
  rejectReason: 'test',
  otherText: 'test',
};
const clientWithClosedStage = JSON.parse(JSON.stringify(PraneshKumar));
clientWithClosedStage.stage = FAMILY_STAGE_LOST;
clientWithClosedStage.clientInfo = {
  ...PraneshKumar.clientInfo,
  lossReason: 'test',
  otherText: 'test',
};

const defaultProps = {
  client: PraneshKumar,
};
const wrap = (props = {}) => shallow(<FamilyMetaDataSummaryBox {...defaultProps} {...props} />);

describe('FamilyMetaDataSummaryBox', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders with Won stage', () => {
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

  it('renders with Rejected stage', () => {
    const wrapper = wrap({
      client: clientWithRejectedStage,
    });

    expect(wrapper.find('ValueColumn').at(0).contains(clientWithRejectedStage.clientInfo.rejectReason)).toBeTruthy();
    expect(wrapper.find('ValueColumn').at(1).contains(clientWithRejectedStage.clientInfo.otherText)).toBeTruthy();
  });

  it('renders with Closed stage', () => {
    const wrapper = wrap({
      client: clientWithClosedStage,
    });

    expect(wrapper.find('ValueColumn').at(0).contains(clientWithClosedStage.clientInfo.lossReason)).toBeTruthy();
    expect(wrapper.find('ValueColumn').at(1).contains(clientWithClosedStage.clientInfo.otherText)).toBeTruthy();
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
