import React from 'react';
import { func, string, bool } from 'prop-types';

import { PageWrapper, Wrapper, TipBoxWrapper } from 'sly/web/components/wizards/assessment/Template';
import { Heading,  Block } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import IconItem from 'sly/web/components/molecules/IconItem';
import { Auth }  from 'sly/web/containers/wizards/assessment/common';

const Conversion = ({
  onConversionSuccess, heading, description, submitButtonText, hasTip,
}) => {
  return (
    <PageWrapper hasSecondColumn={hasTip}>
      <Wrapper>

        {/* <Heading level="subtitle" weight="medium" pad="large">{generateHeading(whoNeedsHelp)}</Heading> */}
        <Heading level="subtitle" weight="medium" pad="large">{heading}</Heading>
        <Block pad="xLarge">{description}</Block>
        <Block maxWidth="inherit"><Auth signupHeading={heading} onAuthSuccess={onConversionSuccess} submitButtonText={submitButtonText} /></Block>
      </Wrapper>
      {hasTip &&
      <TipBoxWrapper>
        <TipBox heading="BENEFITS OF CREATING A FREE ACCOUNT:" height="fit-content">
          <IconItem icon="check" iconPalette="harvest" iconVariation="base">Get your own Seniorly Home Base for tracking your options</IconItem>
          <IconItem icon="check" iconPalette="harvest" iconVariation="base">See your recommended communities in one place</IconItem>
          <IconItem icon="check" iconPalette="harvest" iconVariation="base">Get a dedicated Seniorly Local Advisor</IconItem>
          <IconItem icon="check" iconPalette="harvest" iconVariation="base">See other resources and services you may need</IconItem>
        </TipBox>
      </TipBoxWrapper>
      }
    </PageWrapper>
  );
};

Conversion.propTypes = {
  onConversionSuccess: func.isRequired,
  heading: string.isRequired,
  description: string.isRequired,
  submitButtonText: string.isRequired,
  whoNeedsHelp: string,
  onSkipClick: func,
  onBackClick: func,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
  // change: func.isRequired,
};

Conversion.defaultProps = {
  hasTip: true,
};

export default Conversion;
