import React from 'react';
import styled from 'styled-components';
import { object, string, arrayOf } from 'prop-types';

import { size, palette } from 'sly/common/components/themes';
import { Heading, Paragraph } from 'sly/common/components/atoms';
import { Link } from 'sly/web/components/atoms';
import IconButton from 'sly/common/components/molecules/IconButton';

const StyledIconButton = styled(IconButton)`
  font-weight: bold;
  font-size: ${size('text.body')};
  padding: ${size('spacing.large')}
  color: ${palette('primary', 'base')};
  border-radius: 0;
`;

const NextStepsWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
  border: ${size('border.regular')} solid ${palette('primary', 'base')};
  border-radius: ${size('spacing.small')};
`;

const NextHeader = styled.div`
  background-color: ${palette('primary', 'base')};
  color: ${palette('white', 'base')};
  padding: ${size('spacing.large')};
`;

const NextHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
  color: ${palette('white', 'base')};
`;

const NextSteps = ({
  label,
  links,
  toc,
  nextRef,
}) => (
  <>
    <NextStepsWrapper>
      <NextHeader>
        <NextHeading level="title" size="title" ref={nextRef} >
          Next Steps
        </NextHeading>
        <Paragraph palette="white">
          {label}
        </Paragraph>
      </NextHeader>
      {links.map(p => (
        <StyledIconButton
          href={p.to}
          icon="chevron"
          width="100%"
          right
          ghost
          transparent
          borderPalette="slate"
          rotate={-1}
        >
          {p.title}
        </StyledIconButton>
      ))}
    </NextStepsWrapper>
    {
      toc !== 'home care' &&
      <Paragraph>
        Seniorly is here to help you at no cost to find the perfect {toc} community. Our powerful website will search
        through thousands of communities across the country that you can connect to directly. Email{' '}
        <Link href="mailto:ask@seniorly.com">
          ask@seniorly.com
        </Link>
        {' '}or call us at{' '}
        <Link href="tel:+18558664515">(855) 866-4515</Link>
        {' '}for further assistance. We are compensated by the community you eventually select.
      </Paragraph>
    }

  </>
);

NextSteps.propTypes = {
  label: string.isRequired,
  links: arrayOf(object).isRequired,
  nextRef: object.isRequired,
  toc: string.isRequired,
};

export default NextSteps;
