import React from 'react';
import uniqueId from 'lodash/uniqueId';
import { any, string } from 'prop-types';
import styled from 'styled-components';

import { TooltipContent } from 'sly/web/components/molecules/HelpBubble';
import Span from 'sly/web/components/atoms/Span';

const Trigger = styled(Span)`
  text-decoration: underline;
`;

const HelpBubble = ({ children, trigger, ...props }) => {
  const id = uniqueId('tooltipHelpBubble_');
  return (
    <div {...props}>
      <Trigger size="caption" palette="yellow" data-tip data-for={id}>{ trigger || 'Pending approval' }</Trigger>
      <TooltipContent id={id} place="top" effect="solid" multiline>
        {children}
      </TooltipContent>
    </div>
  );
};

HelpBubble.propTypes = {
  children: any,
  trigger: string,
};

export default HelpBubble;
