import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string } from 'prop-types';

import { size } from 'sly/components/themes';
import { Block, Box } from 'sly/components/atoms';
import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';

const StyledCollapsibleSection = styled(CollapsibleSection)`
  margin-bottom: 0;
  border-bottom-width: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  &:first-child {
    border-top-left-radius: ${size('border.xxLarge')};
    border-top-right-radius: ${size('border.xxLarge')};
  }

  &:last-child {
    border-bottom-width: ${size('border.regular')};
    border-bottom-left-radius: ${size('border.xxLarge')};
    border-bottom-right-radius: ${size('border.xxLarge')};
  }
`;

const FirstCollapsibleSection = StyledCollapsibleSection.extend`
  border: 0;
`;

const OneCollapsibleSection = StyledCollapsibleSection.extend`
  border-top: 0;
`;

const StyledBox = styled(Box)`
  padding: 0;
  border-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const StyledBlock = styled(Block)`
  padding: ${size('spacing.xLarge')};
  padding-bottom: 0;
`;

const FAQSection = ({ faqs }) => {
  const [firstFaq, ...restFaqs] = faqs;

  const restFaqComponents = restFaqs.map(({ title, description }) => (
    <StyledCollapsibleSection key={title} clampTitle={false} headingWeight="regular" title={title}>
      <Block palette="grey">
        {description}
      </Block>
    </StyledCollapsibleSection>
  ));

  return (
    <div>
      <StyledBox>
        <StyledBlock size="title">Frequently asked questions</StyledBlock>
        {faqs.length === 1 &&
          <OneCollapsibleSection clampTitle={false} headingWeight="regular" title={firstFaq.title}>
            <Block palette="grey">
              {firstFaq.description}
            </Block>
          </OneCollapsibleSection>
        }
        {faqs.length > 1 &&
          <FirstCollapsibleSection clampTitle={false} headingWeight="regular" title={firstFaq.title}>
            <Block palette="grey">
              {firstFaq.description}
            </Block>
          </FirstCollapsibleSection>
        }
      </StyledBox>
      {restFaqComponents}
    </div>
  );
};

FAQSection.propTypes = {
  faqs: arrayOf(shape({
    title: string.isRequired,
    description: string.isRequired,
  })),
};

export default FAQSection;
