import React, { Fragment } from 'react';
import { string } from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { uniqueId } from 'lodash';
import styled from 'styled-components';


import { size, palette } from 'sly/components/themes';

import { Icon } from 'sly/components/atoms';

const StyledIcon = styled(Icon)`
  color: ${palette('slate', 'stroke')};
`;
// TODO: is it better to make this tooltip as atom so that we don't have to copy styles in all required components?
// will need replacing exsting tooltip atom, that's not used anywhere?
const TooltipContent = styled(ReactTooltip)`
  padding: ${size('spacing.regular')};
  color: ${palette('white', 0)} !important;
  background-color: ${palette('slate', 'filler')} !important;
  border-radius: ${size('spacing.tiny')};
  font-size: ${size('text.caption')};
`;

// TODO: add support for changing icon colour using prop
const HelpBubble = ({ text }) => {
  const id = uniqueId('tooltipHelpBubble_');

  return (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <StyledIcon icon="help" size="small" data-tip data-for={id} />
      <TooltipContent id={id} place="bottom" effect="solid" type="light" multiline>
        {text}
      </TooltipContent>
    </Fragment>
  );
};

HelpBubble.propTypes = {
  text: string,
};

export default HelpBubble;
