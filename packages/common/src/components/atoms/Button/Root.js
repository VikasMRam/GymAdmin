import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { palette, key } from 'sly/common/components/themes';
import {
  withSpacing,
  withBorder,
  withDisplay,
  withText,
  withColor,
  withWidth,
  withHeight,
  withClamping,
  withCursor,
} from 'sly/common/components/helpers';

const hoverBackgroundColor = ({
  disabled, ghost, transparent, secondary, background,
}) => secondary && !ghost ? palette('grey', 'stroke') :
  !disabled && !ghost && !transparent && palette(background, 'dark');

const hoverForegroundColor = ({
  ghost, secondary,
}) => {
  if (ghost) {
    return secondary ? palette('grey', 'dark') : palette('dark');
  }
  return null;
};

const activeBackgroundColor = ({ disabled, ghost, transparent, background }) =>
  !disabled && !ghost && !transparent && palette(background, 'filler');

const activeForegroundColor = ({ disabled, ghost }) =>
  !disabled && ghost && palette('filler');

const StyledButton = styled.button`
  ${withText}
  ${withColor}
  ${withBorder}
  ${withSpacing}
  ${withWidth}
  ${withHeight}
  ${withClamping}
  ${withCursor}
  display: inline-block;
  text-align: center;
  justify-content: center;
  align-items: center;
  appearance: none;
  user-select: none;
  pointer-events: ${ifProp('disabled', 'none', 'auto')};
  transition: background ${key('transitions.default')}, color ${key('transitions.default')},
    border-color ${key('transitions.default')};

  &:hover {
    background: ${hoverBackgroundColor};
    color: ${hoverForegroundColor};
  }

  &:active {
    background: ${activeBackgroundColor};
    color: ${activeForegroundColor};
  }

  &:focus {
    outline: none;
  }
  ${withDisplay}
`;
// put withDisplay last to make sure that this display styles are always first priority

export default StyledButton;
