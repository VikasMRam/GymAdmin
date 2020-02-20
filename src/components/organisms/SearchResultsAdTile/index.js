import React from 'react';
import { func, string, node, oneOf, object } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import { Button, Box, ResponsiveImage, Block } from 'sly/components/atoms';

const Wrapper = styled.div`
  display: grid;
  grid-gap: ${size('spacing.xxLarge')};
  grid-template-rows: min-content min-content;
  text-align: center;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-rows: min-content;
    text-align: left;
    ${ifProp({ layout: 'column' }, css`grid-template-columns: min-content 1fr;`, css`text-align: center; grid-template-rows: min-content min-content;`)}
  }
`;

const StyledResponsiveImage = styled(ResponsiveImage)`
  max-width: calc(${size('layout.col2')} + ${size('layout.gutter')});
`;
StyledResponsiveImage.displayName = 'StyledResponsiveImage';

const StyledButton = styled(Button)`
  ${ifProp({ buttonPosition: 'right' }, css`float: right;`)}
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    ${ifProp({ layout: 'column' }, css`width: auto;`)}
  }
`;
StyledButton.displayName = 'StyledButton';

const PaddedBlock = pad(Block);
PaddedBlock.displayName = 'PaddedBlock';

const SearchResultsAdTile = ({
  image, title, description, onButtonClick, buttonText, buttonPosition, buttonProps, layout, className,
}) => (
  <Box className={className} backgroundPalette="primary" backgroundVariation="stroke">
    <Wrapper layout={layout}>
      <StyledResponsiveImage src={image} />
      <div>
        <PaddedBlock weight="medium" size="subtitle">{title}</PaddedBlock>
        {description && <PaddedBlock>{description}</PaddedBlock>}
        <StyledButton layout={layout} onClick={onButtonClick} buttonPosition={buttonPosition} {...buttonProps}>{buttonText}</StyledButton>
      </div>
    </Wrapper>
  </Box>
);

SearchResultsAdTile.propTypes = {
  onButtonClick: func,
  buttonText: string.isRequired,
  buttonPosition: oneOf(['left', 'right']).isRequired,
  buttonProps: object,
  title: string.isRequired,
  description: node,
  className: string,
  image: string.isRequired,
  layout: oneOf(['row', 'column']).isRequired,
};

SearchResultsAdTile.defaultProps = {
  buttonPosition: 'left',
  buttonProps: {},
  layout: 'column',
};

export default SearchResultsAdTile;
