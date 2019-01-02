import React from 'react';
import { arrayOf, string, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import CareServiceItem from 'sly/components/molecules/CareServiceItem/index';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-row-gap: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: 50% 50%;
    grid-column-gap: ${size('layout.gutter')};
  }
`;

const CommunityCareService = ({ careServiceMap, careServices }) => {
  const careServiceMapKeys = Object.keys(careServiceMap);
  const itemComponents = careServiceMapKeys.map((key) => {
    let icon = 'close';
    let iconPalette = 'slate';
    let iconVariation = 'filler';
    const textPalette = 'slate';
    let textVariation = 'filler';
    if (careServices.indexOf(key) !== -1) {
      icon = 'check';
      iconPalette = 'secondary';
      iconVariation = 'base';
      textVariation = 'base';
    }
    const careService = careServiceMap[key];
    return (
      <CareServiceItem
        key={careService}
        icon={icon}
        text={careService}
        iconPalette={iconPalette}
        iconVariation={iconVariation}
        textPalette={textPalette}
        textVariation={textVariation}
      />
    );
  });
  return (
    <Wrapper>
      {itemComponents}
    </Wrapper>
  );
};

CommunityCareService.propTypes = {
  careServiceMap: object.isRequired,
  careServices: arrayOf(string).isRequired,
};

export default CommunityCareService;
