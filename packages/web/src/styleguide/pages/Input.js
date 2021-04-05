import React from 'react';

import Paragraph from 'sly/common/system/Paragraph';
import Input from 'sly/common/system/Input';
import SearchInput from 'sly/common/system/SearchInput';
import RadioField from 'sly/common/system/RadioField';
import Section from 'sly/web/styleguide/Section';
import { Cases, Case } from 'sly/web/styleguide/Case';
import { ComponentHeading, VariantHeading, VariantParagraph } from 'sly/web/styleguide/Component';


const InputPage = () => {
  return (
    <Section
      title="Input"
      anchor="input"
      subtitle="A text field is an input that allows a user to write or edit text."
    >
      <ComponentHeading>
        Input
      </ComponentHeading>

      <VariantHeading>
        {'<Input type="text" />'}
      </VariantHeading>

      <VariantParagraph>
        Text field component. By default we use text fields with the title customization.
      </VariantParagraph>

      <Cases>
        <Case name="default">
          <Input placeholder="Placeholder value" />
        </Case>
        <Case name="hover">
          <Input placeholder="Placeholder value" borderColor="slate.lighter-60" />
        </Case>
        <Case name="active">
          <Input
            value="A default value"
            sx={{
            outline: 'none',
            borderColor: 'viridian.base',
          }}
          />
        </Case>
        <Case name="disabled">
          <Input value="A default value" disabled />
        </Case>
      </Cases>

      <VariantHeading>
        {'<SearchInput type="text" />'}
      </VariantHeading>

      <VariantParagraph>
        Search text field component. To use for the site wide search.
      </VariantParagraph>

      <Cases>
        <Case name="default">
          <SearchInput placeholder="Placeholder value" />
        </Case>
        <Case name="active">
          <SearchInput
            value="A default value"
            sx={{
            outline: 'none',
            borderColor: 'viridian.base',
          }}
          />
        </Case>
      </Cases>

      <VariantHeading>
        {'<RadioField type="text" />'}
      </VariantHeading>

      <VariantParagraph>
        RadioField component, to select an item from a group.
      </VariantParagraph>

      <Cases>
        <Case name="default">
          <RadioField
            name="radioField"
            value="radio-option-1"
            label="Radio option 1"
            whiteSpace="nowrap"
          />
        </Case>
        <Case name="hover">
          <RadioField
            name="radioField"
            value="radio-option-1"
            label="Radio option 1"
            sx={{
              whiteSpace: 'nowrap',
              svg: {
                '--hover-color': 'viridian.lighter-90',
              },
            }}
          />
        </Case>
        <Case name="selected">
          <RadioField
            name="radioField"
            value="radio-option-1"
            label="Radio option 1"
            sx={{
              whiteSpace: 'nowrap',
              svg: {
                '--active-color': 'viridian.base',
              },
            }}
          />
        </Case>
      </Cases>
    </Section>
  );
};

export default InputPage;
