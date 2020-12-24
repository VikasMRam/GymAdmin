import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';

import { ADL_OPTIONS, COEXISTING_ADL_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { PageWrapper, Wrapper, Footer, TipBoxWrapper } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box, Block } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import IconItem from 'sly/web/components/molecules/IconItem';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import { Auth }  from 'sly/web/containers/wizards/assessment/common';
// import Auth from 'sly/common/services/auth/containers/AuthContainer';

const generateHeading = (whoNeedsHelp) => {
  switch (whoNeedsHelp) {
    case 'parents':
      return 'Which activities does your parent(s) need help with?';
    case 'myself-and-spouse':
      return 'Which activities do you and your spouse need help with?';
    case 'myself':
      return 'Which activities do you need help with?';
    case 'spouse':
      return 'Which activities does your spouse need help with?';
    case 'other-relatives':
      return 'Which activities does your relative need help with?';
    case 'friend':
      return 'Which activities does your friend(s) need help with?';
    default:
      return 'Which activities below does the person you are looking for need help with?';
  }
};

const Conversion = ({
  onConversionSuccess, heading, description, onBackClick, onSkipClick, whoNeedsHelp, hasTip,
}) => {
  // const opts = ADL_OPTIONS;
  // if (whoNeedsHelp && whoNeedsHelp.match(/myself/)) {
  //   opts = opts.filter(e => !e.value.match(/memory-care/));
  //   onSkipClick(); // Skip step and move ahead. ?
  // }

  return (
    <PageWrapper hasSecondColumn={hasTip}>
      <Wrapper>
        <Block>
          {/* <Heading level="subtitle" weight="medium" pad="large">{generateHeading(whoNeedsHelp)}</Heading> */}
          <Heading level="subtitle" weight="medium" pad="large">{heading}</Heading>
          <Block pad="xLarge">{description}</Block>
          {/* FIXME: auth container is being called from conversion component */ }
          <Block width="fit-content"><Auth signupHeading={heading} onAuthSuccess={onConversionSuccess} /></Block>
        </Block>
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
