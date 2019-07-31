import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string, func } from 'prop-types';

import { size } from 'sly/components/themes';
import cursor from 'sly/components/helpers/cursor';
import pad from 'sly/components/helpers/pad';
import { Icon } from 'sly/components/atoms';
import IconItem from 'sly/components/molecules/IconItem';

const OptionsWrapper = pad(styled.div``, 'large');

const OptionItemWrapper = cursor(styled.div`
  margin: ${size('spacing.regular')};
`);
OptionItemWrapper.displayName = 'OptionItemWrapper';

const ClearIconWrapper = styled.div`
  display: flex;
  margin-right: ${size('spacing.large')};
`;

const ClearIcon = cursor(styled(Icon)`
  margin-left: auto;
`);
ClearIcon.displayName = 'ClearIcon';

const OptionsList = ({ options, onCloseClick, ...props }) => (
  <div {...props}>
    <OptionsWrapper>
      {options.map(option => (
        <OptionItemWrapper
          key={option.text}
          onClick={(e) => {
            if (onCloseClick) {
              onCloseClick();
            }
            option.onClick(e);
          }}
        >
          <IconItem hasBottomBorder icon={option.icon} iconPalette={option.iconPalette} iconRightMarginSpacing="large">
            {option.text}
          </IconItem>
        </OptionItemWrapper>
      ))}
    </OptionsWrapper>
    <ClearIconWrapper>
      <ClearIcon icon="clear" palette="slate" onClick={onCloseClick} />
    </ClearIconWrapper>
  </div>
);

const optionsShape = {
  text: string,
  icon: string,
  iconPalette: string,
  palette: string,
  onClick: func,
};

OptionsList.propTypes = {
  options: arrayOf(shape(optionsShape)),
  onCloseClick: func,
};

export default OptionsList;
