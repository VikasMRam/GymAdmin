import React, { Fragment } from 'react';
import styled from 'styled-components';
import { arrayOf, object, func } from 'prop-types';

import { palette, size } from 'sly/components/themes';
import { Hr, Block, Span } from 'sly/components/atoms';
import { Td } from 'sly/components/molecules/Td';
import Th from 'sly/components/molecules/Th';

import CollapsibleBlock from 'sly/components/molecules/CollapsibleBlock';

import NumberFormat from 'react-number-format';


const StyledNumberFormat = styled(NumberFormat)`
  font-weight: ${size('weight.medium')};
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

const Wrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
  position: relative;
`;

const StyledBlock = styled(Block)`
  padding: ${size('spacing.medium')} ${size('spacing.xLarge')};
  
`;


const CommunityPricingTable = ({ pricesList }) => {
  let from = 0;
  from = pricesList[0].value;
  return (
    <Fragment>
      <StyledBlock size="title">
        <Block size="body" palette="grey">Estimated monthly pricing starts at</Block>
        <StyledNumberFormat color="secondary" value={from} displayType="text" thousandSeparator prefix="$" /> <Span size="title" palette="secondary"> per month*</Span>
      </StyledBlock>
      <Wrapper>
        <StyledTh colSpan={2} color="slate" bgcolor="grey">Base Pricing (Care costs not included in price) </StyledTh>
        <Tr color="grey" bgcolor="white"><StyledTd>Type</StyledTd><StyledTd>Average Monthly Price</StyledTd> </Tr>
        {pricesList.map((price) => {
          const { label, value } = price;
          return (
            <Tr key={label} color="slate" bgcolor="white"> <StyledTd>{label}</StyledTd><StyledTd><StyledNumberFormat color="slate" value={value} displayType="text" thousandSeparator prefix="$" />/month</StyledTd></Tr>
          );
        })}
      </Wrapper>
      <StyledBlock size="caption" palette="grey">*Seniorly’s estimated monthly pricing is based on the local average pricing of other communities in the area and what typical communities of the same size offer in services. Please verify all information prior to making a decision. Seniorly is not responsible for any errors regarding the information displayed on this website.</StyledBlock>
    </Fragment>
  );
};

CommunityPricingTable.propTypes = {
  pricesList: arrayOf(object).isRequired,
  price: object,
  onItemClick: func,
};

export default CommunityPricingTable;
