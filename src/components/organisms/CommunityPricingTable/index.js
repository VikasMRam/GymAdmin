import React, { Fragment } from 'react';
import styled from 'styled-components';
import { arrayOf, object, func, string, number, bool } from 'prop-types';
import NumberFormat from 'react-number-format';
import ReactTooltip from 'react-tooltip';

import { palette, size } from 'sly/components/themes';
import { Button, Block, Span, Icon, Paragraph } from 'sly/components/atoms';
import { MainSection } from 'sly/components/molecules/CollapsibleSection';
import { isServer } from 'sly/config';

const StyledNumberFormat = styled(NumberFormat)`
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

const StyledBlockSp = styled(Block)`
   padding-bottom: ${size('spacing.regular')};
`;

const StyledBlockNp = styled(Block)`
   padding-top: 0px;
   padding-bottom: ${size('spacing.xLarge')};
  
`;
const StyledIcon = styled(Icon)`
  margin-left: ${size('spacing.small')};
  vertical-align: text-top;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.xLarge')};
`;

const TooltipContent = styled(ReactTooltip)`
  padding: ${size('spacing.regular')};
  color: ${palette('white', 'base')} !important;
  background-color: ${palette('slate', 'base')} !important;
  border-radius: ${size('spacing.tiny')};
  font-size: ${size('text.caption')};

  &.place-top {
    &:after {
      border-top-color: ${palette('slate', 'base')} !important;
    }
  }
`;

const percentageOf = (num, percentage) => {
  return (percentage / 100) * num;
};


const toolTipCode = (size) => {
  return (
    <Fragment>
      Costs By Room Type&nbsp;
      <StyledIcon palette="slate" variation="dark" icon="help" size="caption" data-tip data-for="pricing" />
      {!isServer && size === 'up to 20 Beds' &&
      <TooltipContent id="pricing" place="top" effect="solid" multiline>
        Pricing in assisted living communities can be difficult to estimate.<br />
        In addition to the cost of &quot;room and board,&quot; many communities also charge separately for care.<br />
        Small communities like this typically have &quot;all-inclusive&quot; pricing that gives the resident one monthly
        price.<br />
        Seniorly can connect you to a local senior living expert for more details on pricing. This is a free
        service.<br />
      </TooltipContent>
      }
      {!isServer && size === '20 - 51 Beds' &&
      <TooltipContent id="pricing" place="top" effect="solid" multiline>
        Pricing in assisted living communities can be difficult to estimate.<br />
        In addition to the cost of &quot;room and board,&quot; many communities also charge separately for care.<br />
        Many medium sized communities like this have &quot;all-inclusive&quot; pricing that gives the resident one monthly
        price.<br />
        Some communities will use a Points or Level of Care system to determine the care related fees.<br />
        Seniorly can connect you to a local senior living expert for more details on pricing. This is a free
        service.<br />
      </TooltipContent>
      }
      {!isServer && size === '51 +' &&
      <TooltipContent id="pricing" place="top" effect="solid" multiline>
        Pricing in assisted living communities can be difficult to estimate.<br />
        In addition to the cost of &quot;room and board,&quot; many communities also charge separately for care.<br />
        Most large sized communities like this typically charge additional care fees.<br />
        Communities will use a Points or a Level of Care system to determine the care related fees.<br />
        Seniorly can connect you to a local senior living expert for more details on pricing. This is a free
        service.<br />
      </TooltipContent>
      }
    </Fragment>
  );
};

const CommunityPricingTable = ({
  pricesList, estimatedPriceList, price, getPricing, name, size, showToolTip,
}) => {
  const basePer = percentageOf(price, 20);
  const from = Math.round(price);
  const to = Math.round(price + basePer);
  const estimated = pricesList.length === 0;
  return (
    <Fragment>
      <MainSection>
        { estimated &&
          <StyledBlockNp size="title">
            <StyledBlockSp size="body" palette="slate">The estimated monthly pricing for {name} ranges from</StyledBlockSp>
            <StyledNumberFormat weight="weight.medium" color="secondary" value={from} displayType="text" thousandSeparator prefix="$" /> <Span weight="medium" size="title" palette="secondary"> to </Span> <StyledNumberFormat weight="weight.medium" color="secondary" value={to} displayType="text" thousandSeparator prefix="$" /><Span weight="medium" size="title" palette="secondary"> per month*</Span>
          </StyledBlockNp>
        }
        { !estimated &&
          <StyledBlockNp size="title">
            <StyledBlockSp size="body" palette="slate">The estimated pricing for {name} starts around</StyledBlockSp>
            <StyledNumberFormat weight="weight.medium" color="secondary" value={price} displayType="text" thousandSeparator prefix="$" /> <Span weight="medium" size="title" palette="secondary"> per month*</Span>
          </StyledBlockNp>
        }
        { pricesList.length > 0 &&
          <StyledBlockNp>
            <StyledTable>
              <thead>
                <tr>
                  <StyledTh colSpan={2} color="slate" bgcolor="grey">
                    Costs By Room Type**
                  </StyledTh>
                </tr>
              </thead>
              <tbody>
                <Tr color="grey" bgcolor="white"><StyledTd>Type</StyledTd><StyledTd>Average Monthly Cost</StyledTd> </Tr>
                {pricesList.map((price) => {
                const { label, value } = price;
                return (
                  <Tr key={label} color="slate" bgcolor="white"> <StyledTd>{label}</StyledTd><StyledTd><StyledNumberFormat weight="weight.regular" color="slate" value={value} displayType="text" thousandSeparator prefix="$" /></StyledTd></Tr>
                );
              })}
              </tbody>
            </StyledTable>
          </StyledBlockNp>
        }
        { pricesList.length === 0 && estimatedPriceList.length > 0 &&
          <StyledBlockNp>
            <StyledTable>
              <thead>
                <tr>
                  {showToolTip &&
                  <StyledTh colSpan={2} color="slate" bgcolor="grey">
                    {toolTipCode(size)}
                  </StyledTh>
                  }
                  {!showToolTip &&
                  <StyledTh colSpan={2} color="slate" bgcolor="grey">
                    Costs By Room Type**
                  </StyledTh>
                  }
                </tr>
              </thead>
              <tbody>
                <Tr color="grey" bgcolor="white"><StyledTd>Type</StyledTd><StyledTd>Estimated Monthly Cost</StyledTd> </Tr>
                {estimatedPriceList.map((price) => {
                const { label, value } = price;
                return (
                  <Tr key={label} color="slate" bgcolor="white"> <StyledTd>{label}</StyledTd><StyledTd><StyledNumberFormat weight="weight.regular" color="slate" value={value} displayType="text" thousandSeparator prefix="$" /></StyledTd></Tr>
                );
              })}
              </tbody>
            </StyledTable>
          </StyledBlockNp>
        }
        <Block>
          <StyledButton onClick={getPricing}>Get Detailed Pricing</StyledButton>
          <Block>
            { (pricesList.length > 0 || (estimatedPriceList.length > 0 && !showToolTip)) && size === 'up to 20 Beds' &&
              <Paragraph>
                **Pricing in assisted living communities can be difficult to estimate.
                In addition to the cost of &quot;room and board,&quot; many communities also charge separately for care.
                Small communities like this typically have &quot;all-inclusive&quot; pricing that gives the resident one monthly
                price.
                Seniorly can connect you to a local senior living expert for more details on pricing. This is a free
                service.
              </Paragraph>
            }
            { (pricesList.length > 0 || (estimatedPriceList.length > 0 && !showToolTip)) && size === '20 - 51 Beds' &&
            <Paragraph>
              **Pricing in assisted living communities can be difficult to estimate.
              In addition to the cost of &quot;room and board,&quot; many communities also charge separately for care.
              Many medium sized communities like this have &quot;all-inclusive&quot; pricing that gives the resident one monthly
              price.
              Some communities will use a Points or Level of Care system to determine the care related fees.
              Seniorly can connect you to a local senior living expert for more details on pricing. This is a free
              service.
            </Paragraph>
            }
            {(pricesList.length > 0 || (estimatedPriceList.length > 0 && !showToolTip)) && size === '51 +' &&
            <Paragraph>
              **Pricing in assisted living communities can be difficult to estimate.
              In addition to the cost of &quot;room and board,&quot; many communities also charge separately for care.
              Most large sized communities like this typically charge additional care fees.
              Communities will use a Points or a Level of Care system to determine the care related fees.
              Seniorly can connect you to a local senior living expert for more details on pricing. This is a free
              service.
            </Paragraph>
            }
          </Block>
          <Block size="caption" palette="grey">
            *Seniorly’s estimated monthly pricing is based on the local average pricing of other communities in the area and what typical communities of the same size offer in services. Please verify all information prior to making a decision. Seniorly is not responsible for any errors regarding the information displayed on this website.  If you manage the community and would like to update your pricing, please email us at communities@seniorly.com.
          </Block>
        </Block>
      </MainSection>
    </Fragment>

  );
};

CommunityPricingTable.propTypes = {
  pricesList: arrayOf(object).isRequired,
  estimatedPriceList: arrayOf(object).isRequired,
  onItemClick: func,
  price: number.isRequired,
  getPricing: func,
  name: string.isRequired,
  size: string.isRequired,
  showToolTip: bool.isRequired,
};

export default CommunityPricingTable;
