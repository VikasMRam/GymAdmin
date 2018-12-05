import React from 'react';
import { node, string } from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { uniqueId } from 'lodash';
import styled from 'styled-components';

import { isServer } from 'sly/config';
import { size, palette } from 'sly/components/themes';
import { Icon } from 'sly/components/atoms';

const TooltipContent = styled(ReactTooltip)`
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

// TODO: add support for changing icon colour using prop
const HelpBubble = ({ children, className }) => {
  const id = uniqueId('tooltipHelpBubble_');

  return (
    <div className={className}>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <Icon palette="slate" variation="filler" icon="help" size="small" data-tip data-for={id} />
      {!isServer &&
        <TooltipContent id={id} place="top" effect="solid" multiline>
          {children}
        </TooltipContent>
      }
    </div>
  );
};

HelpBubble.propTypes = {
  children: node,
  className: string,
};

export default HelpBubble;
