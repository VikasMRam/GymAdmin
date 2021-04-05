import React from 'react';

import Heading from 'sly/common/system/Heading';
import Paragraph from 'sly/common/system/Paragraph';
import Button from 'sly/common/system/Button';
import ToggleButton from 'sly/common/system/ToggleButton';
import CheckboxButton from 'sly/common/system/CheckboxButton';

import { ComponentHeading, VariantHeading, VariantParagraph } from 'sly/web/styleguide/Component';
import { Cases, Case } from 'sly/web/styleguide/Case';
import Example from 'sly/web/styleguide/Example';
import Section from 'sly/web/styleguide/Section';
import Props from 'sly/web/styleguide/Props';

const buttonExample = `const Component = () => (
  <>
    <Button>
      Primary button
    </Button>
    <Button palette="red">
      Red primary button
    </Button>
    <Button variant="secondary">
      Secondary button
    </Button>
    <Button disabled>
      Primary disabled button
    </Button>
  </>
);`

const toggleButtonExample = `const Component = () => (
  <>
    <ToggleButton value={false} onChange={(value) => console.log(value)}>
      Toggle button
    </Button>
    <ToggleButton disable>
      Disabled toggle button
    </Button>
  </>
);`

const ButtonPage = () => (
  <Section
    title="Button"
    anchor="button"
    subtitle="A button triggers an event or action. They let users know what will happen next."
  >
    <ComponentHeading>
      Button
    </ComponentHeading>

    <VariantHeading>
      {'<Button />'} (Primary)
    </VariantHeading>

    <VariantParagraph>
      Use a primary button to call attention to an action on a form or to highlight the strongest call to action on a page. Primary buttons should only appear once per container.
    </VariantParagraph>

    <Cases>
      <Case name="default">
        <Button>
          Primary button
        </Button>
      </Case>
      <Case name="hover">
        <Button background="viridian.darker-20">
          Primary button
        </Button>
      </Case>
      <Case name="press">
        <Button background="viridian.darker-40">
          Primary button
        </Button>
      </Case>
      <Case name="disabled">
        <Button disabled>
          Primary button
        </Button>
      </Case>
    </Cases>



    <VariantHeading>
      {'<Button variant="secondary" />'}
    </VariantHeading>

    <VariantParagraph>
      Use a secondary button as a call to action on a page when a primary button already exists but there are other actions available to the user. For example, when managing a family in the CRM the primary action is “Update stage” and a secondary action is “Add note”. There can be more than secondary buttons on a page.
    </VariantParagraph>

    <Cases>
      <Case name="default">
        <Button variant="secondary">
          Secondary button
        </Button>
      </Case>
      <Case name="hover">
        <Button variant="secondary" background="viridian.lighter-90">
          Secondary button
        </Button>
      </Case>
      <Case name="press">
        <Button variant="secondary" background="viridian.lighter-80">
          Secondary button
        </Button>
      </Case>
    </Cases>

    <VariantHeading>
      {'<Button variant="neutral" />'}
    </VariantHeading>

    <VariantParagraph>
      Use a neautral button when primary or secondary buttons are on a page to differentiate less important functionality. The neutral button with icon is also used as favorite and share in community profiles as well as filter in the CRM.
    </VariantParagraph>

    <Cases>
      <Case name="default">
        <Button variant="neutral">Neutral button</Button>
      </Case>
      <Case name="hover">
        <Button variant="neutral" background="slate.lighter-95">Neutral button</Button>
      </Case>
      <Case name="press">
        <Button variant="neutral" background="slate.lighter-90">Neutral button</Button>
      </Case>
    </Cases>

    <Props props={{
      palette: ['one of slate, harvest, viridian, yellow, red, green, blue', 'viridian'],
      variant: ['one of primary, secondary, neutral', 'primary'],
      as: ['as', 'button'],
      disabled: ['boolean'],
      to: ['link to internal route'],
      href: ['link to external href'],
      event: ['event object: { action, category, label }'],
    }} />

    <Example title="Example of usage of buttons" text={buttonExample} pad="xxl" />

    <ComponentHeading>
      ToggleButton
    </ComponentHeading>

    <VariantHeading>
      {'<ToggleButton />'}
    </VariantHeading>

    <VariantParagraph>
      Toggle buttons are used in the wizard component.  They are always full width to its parent container. Single-select wizard buttons function like a radio option (only one option in a set can be selected)
    </VariantParagraph>

    <Cases>
      <Case name="default">
        <ToggleButton>
          Toggle button
        </ToggleButton>
      </Case>

      <Case name="hover">
        <ToggleButton color="viridian.base" borderColor="currentColor">
          Toggle button
        </ToggleButton>
      </Case>

      <Case name="press/selected">
        <ToggleButton value={true}>
          Toggle button
        </ToggleButton>
      </Case>

      <Case name="disabled">
        <ToggleButton disabled={true}>
          Toggle button
        </ToggleButton>
      </Case>
    </Cases>

    <Props props={{
      palette: ['one of slate, harvest, viridian, yellow, red, green, blue', 'viridian'],
      value: ['boolean'],
      disabled: ['boolean'],
      onChange: ['function'],
    }} />

    <Example title="Example of usage of ToggleButton" text={toggleButtonExample} />

    <ComponentHeading>
      CheckboxButton
    </ComponentHeading>

    <VariantHeading>
      {'<CheckboxButton />'}
    </VariantHeading>

    <VariantParagraph>
      Checkbox buttons are used in the Wizard component.  They are always full width to its parent container. Multiple-select wizard buttons function like a checkbox (multiple options in a set can be selected)
    </VariantParagraph>

    <Cases>
      <Case name="default">
        <CheckboxButton>
          Checkbox button
        </CheckboxButton>
      </Case>

      <Case name="hover">
        <CheckboxButton color="viridian.base" borderColor="currentColor">
          Checkbox button
        </CheckboxButton>
      </Case>

      <Case name="press/selected">
        <CheckboxButton value={true}>
          Checkbox button
        </CheckboxButton>
      </Case>

      <Case name="disabled">
        <CheckboxButton disabled={true}>
          Checkbox button
        </CheckboxButton>
      </Case>
    </Cases>

    <Props props={{
      palette: ['one of slate, harvest, viridian, yellow, red, green, blue', 'viridian'],
      value: ['boolean'],
      disabled: ['boolean'],
      onChange: ['function'],
    }} />

    <Example title="Example of usage of ToggleButton" text={toggleButtonExample} />
  </Section>
);

export default ButtonPage;
