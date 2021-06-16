import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { arrayOf, object, bool, oneOfType, node } from 'prop-types';

import { community as communityPropType } from 'sly/common/propTypes/community';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { getIsCCRC, getIsSNF, getIsActiveAdult } from 'sly/web/services/helpers/community';
import { Block, Span, Paragraph, space } from 'sly/common/system';
import { formatMoney } from 'sly/web/services/helpers/numbers';
import CommunityPricing from 'sly/web/components/molecules/CommunityPricing';
import GetCustomPricingButtonContainer from 'sly/web/containers/GetCustomPricingButtonContainer';


const Table = forwardRef(({ children, ...props }, ref) => {
  return (
    <Block
      ref={ref}
      as="table"
      font="body-m"
      sx={{
        display: 'table',
        border: 'box',
        borderColor: 'slate.lighter-90',
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0px',
        tableLayout: 'fixed',
        position: 'relative',
      }}
      {...props}
    >
      {children}
    </Block>
  );
});

Table.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
  sticky: bool,
};

const THead = forwardRef((props, ref) => (
  <Block
    ref={ref}
    as="thead"
    sx={{
      display: 'table-header-group',
    }}
    {...props}
  />
));


const Th = forwardRef((props, ref) => (
  <Block
    ref={ref}
    as="th"
    sx={{
      font: 'body-m',
      textAlign: 'left',
      background: 'slate.lighter-95',
      paddingY: 'm',
    }}
    {...props}
  />
));

const TBody = forwardRef((props, ref) => (
  <Block
    ref={ref}
    as="tbody"
    sx={{
      display: 'table-row-group',

    }}
    {...props}
  />
));


const Tr = forwardRef((props, ref) => (
  <Block
    ref={ref}
    as="tr"
    sx={{
      display: 'table-row',
    }}
    {...props}
  />
));


const Td = forwardRef(({  ...props }, ref) => (
  <Block
    ref={ref}
    as="td"
    sx={{
        display: 'table-cell',
        paddingY: 'm',
      }}
    {...props}
  />
));


// const StyledTh = styled(Block)`
//   text-align: left;
//   border:none !important;
//   background-color:${color('slate.lighter-95')} !important;
//   padding-top: ${space('m')} !important;
//   padding-bottom: ${space('m')} !important;
//   white-space:normal!important;
// `;

// const StyledTr = styled.tr`
//   border:none !important;
//   padding: ${space('s')} ${space('l')};
// `;

// const StyledTd = styled.td`
//   border: none !important;
//   padding-top: ${space('m')}  !important;
//   padding-bottom: ${space('m')} !important;
//   white-space:normal!important;
// `;

// const StyledTable = styled.table`
//   border-collapse:separate!important;
//   border-spacing:0;
//   table-layout:fixed;
//   width:100%;
// `;

const StyledBlockNp = styled(Block)`
   padding-top: 0px;
   padding-bottom: ${space('m')};
`;

const StyledGetPricingButton = styled(fullWidth(GetCustomPricingButtonContainer))`
  margin-top:${space('l')};
`;

const PaddedCommunityPricing = pad(CommunityPricing, 'large');

const CommunityPricingTable = ({
  pricesList, estimatedPriceList, newPricesList, isAlreadyPricingRequested, community, buttonProps,
}) => {
  const { id, name, startingRate, rates, propInfo } = community;
  const { maxRate } = propInfo;
  const hasCCRC = getIsCCRC(community);
  const hasSNF = getIsSNF(community);
  const isActiveAdult = getIsActiveAdult(community);

  let locTrack = 'pricing-table';
  if (hasCCRC) {
    locTrack = 'ccrc-pricing-table';
  } else if (hasSNF) {
    locTrack = 'snf-pricing-table';
  } else if (isActiveAdult) {
    locTrack = 'active-adult';
  }
  return (
    <>
      {!hasCCRC && !hasSNF &&
        <>
          {startingRate > 0 && <PaddedCommunityPricing id={id} estimated={rates !== 'Provided'} price={startingRate} max={maxRate}  tipId="pricingtable" />}
          {newPricesList[0] &&
              newPricesList.map(newPrice =>
                (<StyledBlockNp itemScope itemType="http://schema.org/Table">
                  <Table >
                    <THead>
                      <Tr>
                        <Th pl="l !important" pr="0 !important" font="title-xs-azo"  itemProp="about">
                          {newPrice.title}
                        </Th>
                        <Th pl="m" font="title-xs-azo"  itemProp="about">
                          Monthly Cost
                        </Th>
                      </Tr>
                    </THead>
                    <TBody>
                      {newPrice.prices.map((price) => {
                  const { values, roomName } = price;
                  return (
                    <Tr key={`${newPrice.title}${roomName}`} color="slate" >
                      <Td pl="l !important" pr="0 !important" >{roomName}</Td>
                      {values.type === 'range' &&
                      <Td pl="m"><Span >{formatMoney(values.from)} - {formatMoney(values.to)}</Span></Td>
                      }
                      {values.type === 'from' &&
                      <Td pl="m"><Span >From {formatMoney(values.from)}</Span></Td>
                      }
                      {values.type === 'inclusive' &&
                      <Td pl="m"><Span >{formatMoney(values.from)} all inclusive</Span></Td>
                      }
                    </Tr>
                  );
                })}
                    </TBody>
                  </Table>
                </StyledBlockNp>),

              )
          }
          {pricesList.length > 0 && !newPricesList[0] &&
            <StyledBlockNp itemScope itemType="http://schema.org/Table">
              <Table >
                <THead>
                  <Tr>
                    <Th pl="l !important" pr="0 !important" font="title-xs-azo"  itemProp="about">
                      Costs By Room Type
                    </Th>
                    <Th pl="m" font="title-xs-azo"  itemProp="about">
                      Average Montly Cost
                    </Th>
                  </Tr>
                </THead>
                <TBody>
                  {pricesList.map((price) => {
                  const { label, value } = price;
                  return (
                    <Tr key={label} color="slate" >
                      <Td pl="l !important" pr="0 !important" >{label}</Td>
                      <Td pl="m"><Span >{formatMoney(value)}</Span></Td>
                    </Tr>
                  );
                })}
                </TBody>
              </Table>
            </StyledBlockNp>
          }
          {pricesList.length === 0 && estimatedPriceList.length > 0 &&
            <StyledBlockNp>
              <Table>
                <THead>
                  <Tr>
                    <Th pl="l !important" pr="0 !important" font="title-xs-azo"  itemProp="about">
                      Costs By Room Type
                    </Th>
                    <Th pl="m" font="title-xs-azo"  itemProp="about">
                      Average Montly Cost
                    </Th>
                  </Tr>
                </THead>
                <TBody>
                  {estimatedPriceList.map((price) => {
                  const { label, value } = price;
                  return (
                    <Tr key={label} color="slate" >
                      <Td pl="l !important" pr="0 !important" >{label}</Td>
                      <Td pl="m" ><Span>{formatMoney(value)}</Span></Td>
                    </Tr>
                  );
                })}
                </TBody>
              </Table>
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
        {!hasCCRC && !isActiveAdult && !hasSNF && (pricesList.length > 0 || estimatedPriceList.length > 0 || newPricesList.length > 0) &&
          <Paragraph>
            Your total monthly costs will vary depending on room type and the level of care needed. Click the button below to connect with your Seniorly Local Advisor for more accurate pricing.
          </Paragraph>
        }
        <StyledGetPricingButton
          {...buttonProps}
          type="pricing"
          hasAlreadyRequestedPricing={isAlreadyPricingRequested}
          locTrack={locTrack}
          community={community}
          ctaText="Get Pricing and Availability"
        />
      </Block>
    </>
  );
};

CommunityPricingTable.propTypes = {
  pricesList: arrayOf(object).isRequired,
  estimatedPriceList: arrayOf(object).isRequired,
  newPricesList: arrayOf(object).isRequired,
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
