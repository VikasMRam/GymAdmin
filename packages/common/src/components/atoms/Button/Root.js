import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import styles from './styles';

import { palette, key } from 'sly/common/components/themes';

export const defaultBorderProp = 'regular';

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
  ${styles}
  appearance: none;
  user-select: none;
  pointer-events: ${ifProp('disabled', 'none', 'auto')};
  cursor: ${ifProp('disabled', 'default', 'pointer')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
`;

export default StyledButton;
