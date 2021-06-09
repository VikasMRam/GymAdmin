import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';

import { PRODUCTS_OPTIONS } from 'sly/web/assessment/constants';
import { Wrapper, Footer } from 'sly/web/assessment/Template';
import { Block, Heading, Box } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const Products = ({
  handleSubmit, invalid, submitting, hasTip, onSkipClick, onBackClick,
}) => (
  <Wrapper hasSecondColumn={hasTip}>
    <Box>
      <Heading level="subtitle" weight="medium" pad="xLarge">Please tell us if you are interested in these products:</Heading>
      <Block pad="large">Please select all that apply.</Block>
      <form onSubmit={handleSubmit}>
        <Field
          multiChoice
          align="left"
          name="products"
          type="boxChoice"
          component={ReduxField}
          options={PRODUCTS_OPTIONS}
          required
        />
        <Footer submitButtonText="Finish" onBackClick={onBackClick} onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
      </form>
    </Box>
    {hasTip &&
    <TipBox heading="WHY THIS IS IMPORTANT:" height="fit-content">
      There are many products designed to make senior living better. We will send you more info about the product offerings you are interested in.
    </TipBox>
    }
  </Wrapper>
);

Products.propTypes = {
  handleSubmit: func.isRequired,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
  onSkipClick: func,
  onBackClick: func,
};

Products.defaultProps = {
  hasTip: true,
};

export default Products;
