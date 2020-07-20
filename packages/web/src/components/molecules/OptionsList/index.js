import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string, func } from 'prop-types';

import { size } from 'sly/common/components/themes';
import { Hr, Link } from 'sly/web/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';

const getMarginRight = p => p.borderless ? size('spacing', p.iconRightMarginSpacing) : size('spacing.large');

const OptionItemWrapper = styled(Link)`
  margin: ${size('spacing.large')} 0;
  padding-left: ${size('spacing.regular')};
`;
OptionItemWrapper.displayName = 'OptionItemWrapper';

const StyledHr = styled(Hr)`
  margin-left: calc(${size('border.regular')} + ${size('spacing.regular')} + ${getMarginRight} + ${size('icon.regular')});
  margin-bottom: 0;
  margin-top: 0;
`;

const StyledIconItem = styled(IconItem)`
  margin-bottom: ${size('spacing.large')};
`;

const OptionsList = ({ options, ...props }) => (
  <div {...props}>
    {options.map(option => (
      <OptionItemWrapper
        key={option.text}
        onClick={option.onClick}
        to={option.to}
      >
        <StyledIconItem hasBottomBorder icon={option.icon} iconPalette={option.iconPalette} iconRightMarginSpacing="large">
          {option.text}
        </StyledIconItem>
        <StyledHr iconRightMarginSpacing="large" />
      </OptionItemWrapper>
    ))}
  </div>
);

const optionsShape = {
  text: string,
  icon: string,
  iconPalette: string,
  palette: string,
  onClick: func,
  to: string,
};

OptionsList.propTypes = {
  options: arrayOf(shape(optionsShape)),
};

export default OptionsList;
