import React from 'react';
import styled from 'styled-components';
import { arrayOf, object, bool } from 'prop-types';

import { community as communityPropType } from 'sly/common/propTypes/community';
import { palette, size } from 'sly/common/components/themes';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { getIsCCRC, getIsSNF, getIsActiveAdult } from 'sly/web/services/helpers/community';
import { Block, Paragraph } from 'sly/web/components/atoms';
import { formatMoney } from 'sly/web/services/helpers/numbers';
import CommunityPricing from 'sly/web/components/molecules/CommunityPricing';
import GetCustomPricingButtonContainer from 'sly/web/containers/GetCustomPricingButtonContainer';

const StyledNumberFormat = styled.span`
  font-weight: ${p => size(p.weight)};
  color: ${p => palette(p.color, 'base')};
`;

const StyledTh = styled.th`
  text-align: left;
  font-weight: ${size('weight.medium')};
  color:${palette('slate', 'base')};
  background-color:${palette('grey', 'background')};
  padding: ${size('spacing.regular')} ${size('spacing.xLarge')};
  border-top: ${size('border.regular')} solid ${palette('grey', 'filler')};
  border-bottom: ${size('border.regular')} solid ${palette('grey', 'filler')};
`;

const Tr = styled.tr`
  border-top: ${size('border.regular')} solid ${palette('grey', 'filler')};
  border-bottom: ${size('border.regular')} solid ${palette('grey', 'filler')};
  padding: ${size('spacing.medium')} ${size('spacing.xLarge')};
  background-color: ${p => palette(p.bgcolor, 'base')};
  color: ${p => palette(p.color, 'base')};
`;

const StyledTd = styled.td`
  border: none;
  padding: ${size('spacing.regular')} ${size('spacing.xLarge')};
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  position: relative;
  border-radius: ${size('spacing.small')};
  border: ${size('border.regular')} solid ${palette('grey', 'filler')};
`;

const StyledBlockNp = styled(Block)`
   padding-top: 0px;
   padding-bottom: ${size('spacing.xLarge')};
`;

const StyledGetPricingButton = fullWidth(GetCustomPricingButtonContainer);

const PaddedCommunityPricing = pad(CommunityPricing, 'large');

const CommunityPricingTable = ({
  pricesList, estimatedPriceList, isAlreadyPricingRequested, community, buttonProps,
}) => {
  const { id, name, startingRate, rates } = community;
  const hasCCRC = getIsCCRC(community);
  const hasSNF = getIsSNF(community);
  const isActiveAdult = getIsActiveAdult(community);

  let locTrack = 'pricing-table';
  if (hasCCRC) {
    locTrack = 'ccrc-pricing-table';
  } else if (hasSNF) {
    locTrack = 'snf-pricing-table';
  } else if (isActiveAdult) {
    locTrack = 'active-adult'
  }

  return (
    <>
      {!hasCCRC && !hasSNF &&
        <>
          {startingRate > 0 && <PaddedCommunityPricing id={id} estimated={rates !== 'Provided'} price={startingRate} tipId="pricingtable" />}
          {pricesList.length > 0 &&
            <StyledBlockNp itemScope itemType="http://schema.org/Table">
              <StyledTable>
                <thead>
                  <tr>
                    <StyledTh colSpan={2} color="slate" bgcolor="grey" itemProp="about">
                      Costs By Room Type
                    </StyledTh>
                  </tr>
                </thead>
                <tbody>
                  <Tr color="grey" bgcolor="white"><StyledTd>Type</StyledTd><StyledTd>Average Monthly Cost*</StyledTd> </Tr>
                  {pricesList.map((price) => {
                  const { label, value } = price;
                  return (
                    <Tr key={label} color="slate" bgcolor="white"> <StyledTd>{label}</StyledTd><StyledTd><StyledNumberFormat weight="weight.regular" color="slate">{formatMoney(value)}</StyledNumberFormat></StyledTd></Tr>
                  );
                })}
                </tbody>
              </StyledTable>
            </StyledBlockNp>
          }
          {pricesList.length === 0 && estimatedPriceList.length > 0 &&
            <StyledBlockNp>
              <StyledTable>
                <thead>
                  <tr>
                    <StyledTh colSpan={2} color="slate" bgcolor="grey">
                      Costs By Room Type
                    </StyledTh>
                  </tr>
                </thead>
                <tbody>
                  <Tr color="grey" bgcolor="white"><StyledTd>Type</StyledTd><StyledTd>Average Monthly Cost*</StyledTd> </Tr>
                  {estimatedPriceList.map((price) => {
                  const { label, value } = price;
                  return (
                    <Tr key={label} color="slate" bgcolor="white"> <StyledTd>{label}</StyledTd><StyledTd><StyledNumberFormat weight="weight.regular" color="slate">{formatMoney(value)}</StyledNumberFormat></StyledTd></Tr>
                  );
                })}
                </tbody>
              </StyledTable>
            </StyledBlockNp>
          }
        </>
      }
      <Block>
        {hasCCRC && (
          <Paragraph>
            Pricing for {name} may include both a one time buy-in
            fee and a monthly component. Connect directly with{' '}
            {name} to find out your pricing.
          </Paragraph>
        )}
        {isActiveAdult && (
          <Paragraph>
            Pricing for {name} may require a purchase or a monthly component. Connect directly with{' '}
            {name} to find out your pricing.
          </Paragraph>
        )}
        {!hasCCRC && hasSNF && (
          <Paragraph>
            90% of Skilled Nursing Facilities in the United States are Medicare-certified. Some also accept Medicaid. To learn about pricing at {name}, click the button below.
          </Paragraph>
        )}
        {!hasCCRC && !isActiveAdult && !hasSNF && (pricesList.length > 0 || estimatedPriceList.length > 0) &&
          <Paragraph>
            *Monthly price in assisted living communities can vary depending on additional community fees and care services. Click the button below to connect with your Local Senior Living Expert for more accurate pricing.
          </Paragraph>
        }
        <StyledGetPricingButton
          {...buttonProps}
          hasAlreadyRequestedPricing={isAlreadyPricingRequested}
          locTrack={locTrack}
        >
          Get Detailed Pricing
        </StyledGetPricingButton>
      </Block>
    </>
  );
};

CommunityPricingTable.propTypes = {
  pricesList: arrayOf(object).isRequired,
  estimatedPriceList: arrayOf(object).isRequired,
  buttonProps: object.isRequired,
  isAlreadyPricingRequested: bool,
  community: communityPropType,
};

CommunityPricingTable.defaultProps = {
  pricesList: [],
  estimatedPriceList: [],
  buttonProps: {},
};

CommunityPricingTable.typeHydrationId = 'CommunityPricingTable';

export default CommunityPricingTable;
