import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { string, func } from 'prop-types';
import isBoolean from 'lodash/isBoolean';

import { size } from 'sly/components/themes';
import clientPropType from 'sly/propTypes/client';
import { priceFormatter } from 'sly/services/helpers/pricing';
import textTransform from 'sly/components/helpers/textTransform';
import pad from 'sly/components/helpers/pad';
import cursor from 'sly/components/helpers/cursor';
import { Box, Block } from 'sly/components/atoms';

const Wrapper = pad(styled.div`
  display: grid;
  grid-gap: ${size('spacing.regular')};
`);

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${size('spacing.regular')};
`;

const ValueColumn = textTransform(styled.div``);

const EditDetails = cursor(Block);
EditDetails.displayName = 'EditDetails';

const FamilyWonDetailsSummaryBox = ({ client: { clientInfo: {
  communityName, moveInDate, moveRoomType, monthlyFees, referralAgreement,
  referralAgreementType, invoiceAmount, invoiceNumber, invoicePaid,
} }, onEditClick, className }) => (
  <Box size="caption" className={className}>
    <Wrapper>
      {moveInDate &&
        <Row>
          <Block palette="grey">Move-in date</Block>
          <ValueColumn>{dayjs(moveInDate).format('MM/DD/YYYY')}</ValueColumn>
        </Row>
      }
      {communityName &&
        <Row>
          <Block palette="grey">Community name</Block>
          <ValueColumn>{communityName}</ValueColumn>
        </Row>
      }
      {moveRoomType &&
        <Row>
          <Block palette="grey">Room type</Block>
          <ValueColumn>{moveRoomType}</ValueColumn>
        </Row>
      }
      {monthlyFees &&
        <Row>
          <Block palette="grey">Monthly fees (rent + care)</Block>
          <ValueColumn>${priceFormatter(monthlyFees)}</ValueColumn>
        </Row>
      }
      {referralAgreementType &&
        <Row>
          <Block palette="grey">Community referral agreement</Block>
          <ValueColumn>{referralAgreementType}</ValueColumn>
        </Row>
      }
      {referralAgreementType === 'percentage' &&
        <Row>
          <Block palette="grey">Percent amount</Block>
          <ValueColumn>{referralAgreement}%</ValueColumn>
        </Row>
      }
      {referralAgreementType === 'flat-fee' &&
        <Row>
          <Block palette="grey">Fee amount</Block>
          <ValueColumn>${priceFormatter(referralAgreement)}</ValueColumn>
        </Row>
      }
      {invoiceAmount &&
        <Row>
          <Block palette="grey">Invoice amount</Block>
          <ValueColumn>${priceFormatter(invoiceAmount)}</ValueColumn>
        </Row>
      }
      {invoiceNumber &&
        <Row>
          <Block palette="grey">Invoice number</Block>
          <ValueColumn>{invoiceNumber}</ValueColumn>
        </Row>
      }
      {isBoolean(invoicePaid) &&
        <Row>
          <Block palette="grey">Invoice paid</Block>
          <ValueColumn>{invoicePaid ? 'Yes' : 'No'}</ValueColumn>
        </Row>
      }
    </Wrapper>
    {onEditClick &&
      <EditDetails onClick={onEditClick} palette="primary" weight="medium">Edit won details</EditDetails>}
  </Box>
);

FamilyWonDetailsSummaryBox.propTypes = {
  client: clientPropType.isRequired,
  className: string,
  onEditClick: func,
};

export default FamilyWonDetailsSummaryBox;
