import React, { Fragment } from 'react';
import { string } from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { uniqueId } from 'lodash';

import { Icon } from 'sly/components/atoms';

const HelpBubble = ({ text }) => {
  const id = uniqueId('tooltipHelpBubble_');

  return (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <Icon icon="help" size="small" palette="grayscale" data-tip data-for={id} />
      <ReactTooltip id={id} place="bottom" effect="solid" type="light" multiline>
        {text}
      </ReactTooltip>
    </Fragment>
  );
};

HelpBubble.propTypes = {
  text: string,
};

export default HelpBubble;
