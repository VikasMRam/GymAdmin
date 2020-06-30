import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { string, func, oneOf } from 'prop-types';
import isBoolean from 'lodash/isBoolean';

import { size } from 'sly/web/components/themes';
import clientPropType from 'sly/web/propTypes/client';
import { priceFormatter } from 'sly/web/services/helpers/pricing';
import pad from 'sly/web/components/helpers/pad';
import cursor from 'sly/web/components/helpers/cursor';
import {
  FAMILY_STAGE_WON,
  FAMILY_STAGE_REJECTED,
  FAMILY_STAGE_LOST,
  FAMILY_STATUS_ON_PAUSE,
  FAMILY_STATUS_LONG_TERM,
} from 'sly/web/constants/familyDetails';
import { Box, Block } from 'sly/web/components/atoms';
import { textTransform } from 'sly/web/components/helpers/text';

const Wrapper = styled.div`
  display: grid;
  grid-gap: ${size('spacing.regular')};
`;

const PaddedWrapper = pad(Wrapper);

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${size('spacing.regular')};
`;

const ValueColumn = textTransform(styled.div``);
ValueColumn.displayName = 'ValueColumn';

const EditDetails = cursor(Block);
EditDetails.displayName = 'EditDetails';

const FamilyMetaDataSummaryBox = ({ client: { stage, status, clientInfo: {
  communityName, moveInDate, moveRoomType, monthlyFees, referralAgreement,
  referralAgreementType, invoiceAmount, invoiceNumber, invoicePaid,
  rejectReason, otherText, lossReason, onHoldReason, resumeDate,
  longTermReason,
} }, onEditClick, mode, className }) => {
  const WrapperElem = onEditClick ? PaddedWrapper : Wrapper;

  return (
    <Box size="caption" className={className}>
      <WrapperElem>
        {mode === 'stage' &&
          <>
            {stage === FAMILY_STAGE_WON &&
              <>
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
              </>
            }
            {stage === FAMILY_STAGE_REJECTED &&
              <>
                {rejectReason &&
                  <Row>
                    <Block palette="grey">Reason</Block>
                    <ValueColumn>{rejectReason}</ValueColumn>
                  </Row>
                }
                {otherText &&
                  <Row>
                    <Block palette="grey">Description</Block>
                    <ValueColumn>{otherText}</ValueColumn>
                  </Row>
                }
              </>
            }
            {stage === FAMILY_STAGE_LOST &&
              <>
                {lossReason &&
                  <Row>
                    <Block palette="grey">Reason</Block>
                    <ValueColumn>{lossReason}</ValueColumn>
                  </Row>
                }
                {otherText &&
                  <Row>
                    <Block palette="grey">Description</Block>
                    <ValueColumn>{otherText}</ValueColumn>
                  </Row>
                }
              </>
            }
          </>
        }
        {mode === 'status' &&
          <>
            {status === FAMILY_STATUS_ON_PAUSE &&
              <>
                {onHoldReason &&
                  <Row>
                    <Block palette="grey">Reason</Block>
                    <ValueColumn>{onHoldReason}</ValueColumn>
                  </Row>
                }
                {resumeDate &&
                  <Row>
                    <Block palette="grey">Resume date</Block>
                    <ValueColumn>{dayjs(resumeDate).format('MM/DD/YYYY')}</ValueColumn>
                  </Row>
                }
              </>
            }
            {status === FAMILY_STATUS_LONG_TERM &&
              <Row>
                <Block palette="grey">Reason</Block>
                <ValueColumn>{longTermReason}</ValueColumn>
              </Row>
            }
          </>
        }
      </WrapperElem>
      {onEditClick &&
        <EditDetails onClick={onEditClick} palette="primary" weight="medium">
          Edit {mode === 'stage' ? stage : status} details
        </EditDetails>
      }
    </Box>
  );
};

FamilyMetaDataSummaryBox.propTypes = {
  client: clientPropType.isRequired,
  className: string,
  onEditClick: func,
  mode: oneOf(['stage', 'status']),
};

FamilyMetaDataSummaryBox.defaultProps = {
  mode: 'stage',
};

export default FamilyMetaDataSummaryBox;
