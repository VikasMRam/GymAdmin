import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';

import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import IconItem from 'sly/web/components/molecules/IconItem';

const Location = ({
  handleSubmit, invalid, submitting, hasTip,
}) => (
  <Wrapper hasSecondColumn={hasTip}>
    <Box>
      <Heading pad="xLarge" level="subtitle" weight="medium">Where are you looking for care?</Heading>
      <form onSubmit={handleSubmit}>
        <Field
          name="location"
          type="locationSearch"
          component={ReduxField}
          required
        />
        <Footer invalid={invalid} submitting={submitting} />
      </form>
    </Box>
    {hasTip &&
      <TipBox heading="WHY THIS IS IMPORTANT:" height="fit-content">
        <IconItem icon="favourite-light" iconPalette="slate" iconVariation="base">
          This will let us narrow down your options to your desired location and help us get you the correct pricing and availability.
        </IconItem>
      </TipBox>
    }
  </Wrapper>
);

Location.propTypes = {
  handleSubmit: func.isRequired,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

Location.defaultProps = {
  hasTip: true,
};

export default Location;
