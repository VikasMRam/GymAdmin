import React from 'react';
import styled from 'styled-components';
import { object, string, arrayOf } from 'prop-types';

import { Heading, Link, Paragraph } from 'sly/components/atoms';
import { size, palette } from 'sly/components/themes';
import IconButton from 'sly/components/molecules/IconButton';

const StyledIconButton = styled(IconButton)`
  font-weight: bold;
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

const NextParagraph = styled(Paragraph)`
    color: ${palette('white', 'base')};
`;

const NextHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
  color: ${palette('white', 'base')};
`;

const NextSteps = ({
    label,
    links,
    nextRef
    }) => {
  return (
    <>
      <NextStepsWrapper>
        <NextHeader>
          <NextHeading level="title" size="title" _ref={nextRef} >
            Next Steps
          </NextHeading>
          <NextParagraph>
            {label}
          </NextParagraph>
        </NextHeader>
        {
          links.map(p => <StyledIconButton  href={p.to}
                                           icon="chevron"
                                           right
                                           fullWidth
                                           ghost
                                           transparent
                                           borderPalette="slate"
                                           rotate={-1}
          >{p.title}
          </StyledIconButton>)
        }
      </NextStepsWrapper>
      <Paragraph>
        Seniorly is here to help you at no cost to find the perfect community. Our powerful website will search
        through thousands of communities across the country that you can connect to directly. Email{' '}
        <Link href="mailto:ask@seniorly.com">
          ask@seniorly.com
        </Link>
        {' '}or call us at{' '}
        <Link href="tel:+18558664515">(855) 866-4515</Link>
        {' '}for further assistance. We are compensated by the community you eventually select.
      </Paragraph>
    </>

  )
};

NextSteps.propTypes = {
  label: string.required,
  links: arrayOf(object).isRequired,
  nextRef: object.required,
};

export default NextSteps;
