import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Field } from 'redux-form';

import { size } from 'sly/components/themes';
import { TIME_OPTIONS } from 'sly/constants/booking';

import { Heading, Block } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const HeadingSection = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const StyledField = styled(Field)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > * {
    margin-bottom: ${size('spacing.large')};
    width: calc(${size('layout.col1')} + (${size('layout.gutter')}) * 2);
  }
`;
StyledField.displayName = 'StyledField';

const StyledTimeField = StyledField.extend`
  > * {
    height: ${size('element.xLarge')};
  }
`;
StyledTimeField.displayName = 'StyledTimeField';

const CommunitySATDateForm = ({
  error,
}) => {
  const from = moment();
  const to = moment().add(8, 'days');

  return (
    <form>
      <HeadingSection level="subtitle" size="subtitle">What day did you want to tour?</HeadingSection>
      <StyledField
        hasLaterDate
        from={from.format('YYYY-MM-DD')}
        to={to.format('YYYY-MM-DD')}
        name="date"
        type="dateChoice"
        component={ReduxField}
      />
      <HeadingSection level="subtitle" size="subtitle">What time works best for you?</HeadingSection>
      <StyledTimeField
        options={TIME_OPTIONS}
        name="time"
        type="boxChoice"
        component={ReduxField}
      />
      {error && <Block palette="danger">{error}</Block>}
    </form>
  );
};

CommunitySATDateForm.propTypes = {
  error: string,
};

export default CommunitySATDateForm;
