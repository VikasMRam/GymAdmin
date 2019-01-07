import React from 'react';
import { arrayOf, string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import CareServiceItem from 'sly/components/molecules/CareServiceItem';
import CollapsibleBlock from 'sly/components/molecules/CollapsibleBlock';

const Wrapper = styled(CollapsibleBlock)`
  display: grid;
  grid-template-columns: 100%;
  grid-row-gap: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: 50% 50%;
    grid-column-gap: ${size('layout.gutter')};
  }
`;

const preset = {
  present: {
    icon: 'check', iconPalette: 'secondary', iconVariation: 'base', textPalette: 'slate', textVariation: 'base',
  },
  notPresent: {
    icon: 'close', iconPalette: 'slate', iconVariation: 'filler', textPalette: 'slate', textVariation: 'filler',
  },
};

const CommunityCareService = ({ careServices }) => {
  const presetValue = preset.present;
  const itemComponents = careServices.map(careService => (
    <CareServiceItem
      key={careService}
      icon={presetValue.icon}
      text={careService}
      iconPalette={presetValue.iconPalette}
      iconVariation={presetValue.iconVariation}
      textPalette={presetValue.textPalette}
      textVariation={presetValue.textVariation}
    />
  ));
  return (
    // TODO: 21 rem on height looked good for Collapsible Block
    <Wrapper minHeight="regular">
      {itemComponents}
    </Wrapper>
  );
};

CommunityCareService.propTypes = {
  careServices: arrayOf(string).isRequired,
};

export default CommunityCareService;
