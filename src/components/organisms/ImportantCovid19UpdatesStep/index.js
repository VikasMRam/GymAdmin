import React from 'react';
import { Field } from 'redux-form';
import { arrayOf, string, shape, func } from 'prop-types';

import textAlign from 'sly/components/helpers/textAlign';
import { Heading } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const TextAlignCenterHeading = textAlign(Heading);
TextAlignCenterHeading.displayName = 'TextAlignCenterHeading';

const ImportantCovid19UpdatesStep = ({
  cityName, className, buttons, handleSubmit,
}) => (
  <form onSubmit={handleSubmit} className={className}>
    <TextAlignCenterHeading size="subtitle">
      {cityName ?
        `Seniorly is up to date in ${cityName} with current senior living community and in-home care agency new client admissions protocols.` :
        'Seniorly is up to date with current senior living community and in-home care agency new client admissions protocols.'
      }
    </TextAlignCenterHeading>
    <div>
      {buttons.map(({ label, value }) => (
        <Field
          key={label}
          name="typeOfUpdate"
          type="button"
          buttonType="submit"
          component={ReduxField}
          inputValue={value}
          ghost
        >
          {label}
        </Field>
      ))}
    </div>
  </form>
);

ImportantCovid19UpdatesStep.propTypes = {
  cityName: string,
  className: string,
  buttons: arrayOf(shape({
    label: string.isRequired,
    value: string,
  })),
  handleSubmit: func,
};

ImportantCovid19UpdatesStep.defaultProps = {
  buttons: [],
};

export default ImportantCovid19UpdatesStep;
