import React from 'react';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { oneOf, object } from 'prop-types';

import { size } from 'sly/web/components/themes';
import { palette as palettePropType } from 'sly/web/propTypes/palette';
import pad from 'sly/web/components/helpers/pad';
import { textAlign } from 'sly/web/components/helpers/text';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { Heading, Box, Icon, Button } from 'sly/web/components/atoms';

const PaddedHeading = pad(Heading, 'large');
PaddedHeading.displayName = 'PaddedHeading';

const StyledIcon = textAlign(pad(Icon, 'large'));
StyledIcon.displayName = 'StyledIcon';

const FullWidthButton = fullWidth(Button);
FullWidthButton.displayName = 'FullWidthButton';

const TextAlignCenteredBox = textAlign(Box);
TextAlignCenteredBox.displayName = 'TextAlignCenteredBox';

const Wrapper = styled.div`
  ${ifProp({ layout: 'fixed' }, css`
    max-width: ${size('layout.col5')};
    margin-left: auto;
    margin-right: auto;
  `)}
`;

const StyledHeading = styled(PaddedHeading)`
  ${ifProp({ layout: 'fluid' }, css`
    max-width: ${size('layout.col6')};
    margin-left: auto;
    margin-right: auto;
  `)}
`;

const GetAssessmentBox = ({ palette, layout, buttonProps }) => (
  <TextAlignCenteredBox backgroundPalette={palette} backgroundVariation="background">
    <Wrapper layout={layout}>
      <StyledIcon icon="logo" palette="primary" size="xLarge" />
      <StyledHeading layout={layout} level="subtitle">Complete this 3-minute assessment tool to get personalized senior living and care options.</StyledHeading>
      <FullWidthButton {...buttonProps} palette={palette}>Start</FullWidthButton>
    </Wrapper>
  </TextAlignCenteredBox>
);

GetAssessmentBox.propTypes = {
  layout: oneOf(['fluid', 'fixed']).isRequired,
  palette: palettePropType,
  buttonProps: object,
};

GetAssessmentBox.defaultProps = {
  layout: 'fluid',
  buttonProps: {},
};

export default GetAssessmentBox;
