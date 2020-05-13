import React from 'react';

import { bool, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { size } from 'sly/web/components/themes';

import { gadsClient, gadSlots } from 'sly/web/config';

const AdWrapper = styled.div`
  ${ifProp({ isMobileOnly: true }, css`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
    }
  `)}
`;

const AdSenseTile = ({ isMobileOnly, adLocation }) => {
  const adSlot= gadSlots[adLocation] || gadSlots['profile'];

  return (<AdWrapper isMobileOnly={isMobileOnly} dangerouslySetInnerHTML={{__html:`<ins class="adsbygoogle"
                                            style="display:block"
                                            data-ad-client="${gadsClient}"
                                            data-ad-slot="${adSlot}"
                                            data-ad-format="auto"
                                            data-full-width-responsive="true"></ins>
  `}}/>
  );
};

AdSenseTile.propTypes = {
  isMobileOnly: bool.isRequired,
  adLocation: oneOf(['profile', 'resource','search']).isRequired,
};

AdSenseTile.defaultProps = {
  isMobileOnly: false,
  adLocation: 'profile',
};

export default AdSenseTile;



