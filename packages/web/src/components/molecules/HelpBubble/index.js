import React from 'react';
import { node, string } from 'prop-types';
import ReactTooltip from 'react-tooltip';
import uniqueId from 'lodash/uniqueId';
import styled from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import { Icon } from 'sly/web/components/atoms';

export const TooltipContent = styled(ReactTooltip)`
  padding: ${size('spacing.regular')};
  color: ${palette('white', 'base')} !important;
  background-color: ${palette('slate', 'base')} !important;
  border-radius: ${size('spacing.tiny')};
  font-size: ${size('text.caption')};

  &.place-top {
    &:after {
      border-top-color: ${palette('slate', 'base')} !important;
    }
  }
`;

const HelpBubble = ({ children, className, icon, iconPalette, iconVariation, iconSize }) => {
  const id = uniqueId('tooltipHelpBubble_');
  return (
    <div className={className}>
      <Icon palette={iconPalette} variation={iconVariation} icon={icon} size={iconSize} data-tip data-for={id} />
      <TooltipContent id={id} place="top" effect="solid" multiline>
        {children}
      </TooltipContent>
    </div>
  );
};

HelpBubble.propTypes = {
  children: node,
  className: string,
  icon: string,
  iconPalette: string,
  iconVariation: string,
  iconSize: string,
};

HelpBubble.defaultProps = {
  icon: 'help',
  iconPalette: 'slate',
  iconVariation: 'filler',
  iconSize: 'small',
};

export default HelpBubble;
