import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string } from 'prop-types';

import { size } from 'sly/common/components/themes';
import { Block, Box } from 'sly/web/components/atoms';
import CollapsibleSection, { MainSection } from 'sly/web/components/molecules/CollapsibleSection';

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

const FirstCollapsibleSection = styled(StyledCollapsibleSection)`
  border: 0;
`;

const OneCollapsibleSection = styled(StyledCollapsibleSection)`
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

const FAQSection = ({ faqs, className }) => {
  const [firstFaq, ...restFaqs] = faqs;

  const restFaqComponents = restFaqs.map(({ title, description }) => (
    <StyledCollapsibleSection key={title} headingWeight="regular" title={title}>
      <MainSection>
        <Block palette="grey">
          {description}
        </Block>
      </MainSection>
    </StyledCollapsibleSection>
  ));

  return (
    <div className={className}>
      <StyledBox>
        <StyledBlock size="title">Frequently asked questions</StyledBlock>
        {faqs.length === 1 &&
          <OneCollapsibleSection headingWeight="regular" title={firstFaq.title}>
            <MainSection>
              <Block palette="grey">
                {firstFaq.description}
              </Block>
            </MainSection>
          </OneCollapsibleSection>
        }
        {faqs.length > 1 &&
          <FirstCollapsibleSection headingWeight="regular" title={firstFaq.title}>
            <MainSection>
              <Block palette="grey">
                {firstFaq.description}
              </Block>
            </MainSection>
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
  className: string,
};

export default FAQSection;
