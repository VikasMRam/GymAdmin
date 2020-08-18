import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { PRODUCTS_OPTIONS } from 'sly/web/constants/wizards/assessment';
import pad from 'sly/web/components/helpers/pad';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Block, Heading, Box } from 'sly/web/components/atoms';
import ProgressBar from 'sly/web/components/molecules/ProgressBar';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const PaddedProgressBar = pad(ProgressBar);

const PaddedHeading = pad(Heading);
PaddedHeading.displayName = 'PaddedHeading';

const PaddedBlock = pad(Block);
PaddedBlock.displayName = 'PaddedBlock';

const StyledTipBox = styled(TipBox)`
  height: fit-content;
`;

const Products = ({
  handleSubmit, invalid, submitting, hasTip,
}) => (
  <div>
    <Wrapper>
      <PaddedProgressBar label totalSteps={10} currentStep={6} />
    </Wrapper>
    <Wrapper hasSecondColumn={hasTip}>
      <Box>
        <PaddedHeading level="subtitle" weight="medium">Please tell us if you are interested in these products</PaddedHeading>
        <form onSubmit={handleSubmit}>
          <Field
            multipleChoice
            name="products"
            type="boxChoice"
            component={ReduxField}
            options={PRODUCTS_OPTIONS}
            required
          />
          <Footer invalid={invalid} submitting={submitting} />
        </form>
      </Box>
      {hasTip &&
      <StyledTipBox heading="WHY THIS IS IMPORTANT:">
        There are many products designed to make senior living better. We will send you more info about the product offerings you are interested in.
      </StyledTipBox>
      }
    </Wrapper>
  </div>
);

Products.propTypes = {
  handleSubmit: func.isRequired,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

Products.defaultProps = {
  hasTip: true,
};

export default Products;
