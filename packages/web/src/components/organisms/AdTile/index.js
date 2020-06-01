import React from 'react';
import { string, node, oneOf, object, bool } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import textAlign from 'sly/web/components/helpers/textAlign';
import { Button, Box, ResponsiveImage, Block, Link } from 'sly/web/components/atoms';

const StyledResponsiveImage = styled(ResponsiveImage)`
  max-width: calc(${size('layout.col2')} + ${size('layout.gutter')});
`;
StyledResponsiveImage.displayName = 'StyledResponsiveImage';

const StyledButton = styled(Button)`
  ${ifProp({ buttonPosition: 'right' }, css`
    float: right;
  `)}
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    ${ifProp({ layout: 'column' }, css`width: auto;`)}
  }
`;
StyledButton.displayName = 'StyledButton';

const LargePaddedStyledButton = pad(StyledButton, 'large');

const Clearfix = styled.div`
  clear: both;
`;

const ContentWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;

  ${ifProp({ layout: 'column' }, css`
    > *:last-child {
      flex: 1;
    }
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      flex-direction: row;
      text-align: left;
    }
  `)}

  ${ifProp({ imagePosition: 'right' }, css`
    flex-direction: row-reverse;
    text-align: left;
    > *:last-child {
      margin-right: ${size('spacing.large')};
      flex: 1;
    }
  `, css`
    > *:first-child {
      margin-right: ${size('spacing.large')};
    }
  `)}
`;

const PaddedBlock = pad(Block);
PaddedBlock.displayName = 'PaddedBlock';

const TextAlignBlock = textAlign(Block);

const AdTile = ({
  image, imagePosition, title, children, buttonText, buttonPosition, buttonProps, layout, className, showSecondary, linkProps, linkText
}) => (
  <Box className={className} backgroundPalette="primary" backgroundVariation="stroke">
    <ContentWrapper imagePosition={imagePosition} layout={layout}>
      <StyledResponsiveImage src={image} />
      <div>
        <PaddedBlock weight="medium" size="subtitle">{title}</PaddedBlock>
        {children && <PaddedBlock>{children}</PaddedBlock>}
        {layout === 'column' && (
          <>
            <StyledButton layout={layout} buttonPosition={buttonPosition} {...buttonProps}>{buttonText}</StyledButton>
            {showSecondary && (
              <>
                {' '}or call our team at{' '}
                <Link {...linkProps}>{linkText}</Link>
              </>
            )}
          </>
        )}
      </div>
    </ContentWrapper>
    {layout === 'row' && (
      <>
        {!showSecondary &&
          <StyledButton layout={layout} buttonPosition={buttonPosition} {...buttonProps}>{buttonText}</StyledButton>}
        {showSecondary &&
          <LargePaddedStyledButton layout={layout} buttonPosition={buttonPosition} {...buttonProps}>{buttonText}</LargePaddedStyledButton>}
        {showSecondary &&
          <TextAlignBlock>or call our team at <Link {...linkProps}>{linkText}</Link>)</TextAlignBlock>
        }
      </>
    )}
    <Clearfix />
  </Box>
);

AdTile.propTypes = {
  buttonText: string.isRequired,
  buttonPosition: oneOf(['left', 'right']).isRequired,
  buttonProps: object,
  title: string.isRequired,
  children: node,
  className: string,
  image: string.isRequired,
  layout: oneOf(['row', 'column']).isRequired,
  imagePosition: oneOf(['left', 'right']).isRequired,
  showSecondary: bool,
  linkProps: object,
  linkText: string,
};

AdTile.defaultProps = {
  buttonPosition: 'left',
  buttonProps: {},
  layout: 'column',
  imagePosition: 'left',
};

export default AdTile;
