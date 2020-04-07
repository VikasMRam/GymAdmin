import React from 'react';
import styled from 'styled-components';
import { string, arrayOf, object } from 'prop-types';
import dayjs from 'dayjs';

import { size, palette } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { Box, Block, Image } from 'sly/components/atoms';

const Header = textAlign(styled.div`
  padding: ${size('spacing.regular')} ${size('spacing.xxLarge')};
  background: ${palette('base')};
  display: grid;
  grid-gap: ${size('spacing.xLarge')};
  grid-template-columns: min-content 1fr;
  align-items: center;
  border-top-left-radius: ${size('border.xxLarge')};
  border-top-right-radius: ${size('border.xxLarge')};
`, 'left');
Header.displayName = 'Header';

const PerformerWrapper = pad(styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: ${size('layout.gutter')};
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`);
PerformerWrapper.displayName = 'PerformerWrapper';

const StyledImage = styled(Image)`
  width: ${size('element.xxxLarge')};
  height: ${size('element.xxxLarge')};
`;

const StyledBox = textAlign(Box, 'left');

const CurtainupEventBox = ({ date, performers, palette }) => {
  const parsedDate = dayjs(date);
  const validDate = parsedDate.isValid();
  let month;
  let day;
  let dayName;

  if (validDate) {
    month = parsedDate.format('MMM');
    day = parsedDate.format('D');
    dayName = parsedDate.format('dddd');
  }
  const performerComponents = performers.map(p => (
    <PerformerWrapper key={p.name}>
      <StyledImage src={p.gallery.images[0].path} />
      <div>
        <Block size="subtitle" weight="medium">{p.name}</Block>
        <div>{p.description}</div>
      </div>
    </PerformerWrapper>
  ));

  return (
    <div>
      <Header palette={palette}>
        {!validDate && 'invalid date'}
        {validDate &&
          <>
            <div>
              <Block size="caption" weight="bold" palette="white">{month}</Block>
              <Block size="title" weight="medium" palette="white">{day}</Block>
            </div>
            <Block size="title" weight="medium" palette="white">{dayName}</Block>
          </>
        }
      </Header>
      <StyledBox backgroundPalette="white">
        {performerComponents}
      </StyledBox>
    </div>
  );
};

// todo: replace types after api is ready
CurtainupEventBox.propTypes = {
  date: string.isRequired,
  performers: arrayOf(object),
  palette: palettePropType.isRequired,
};

CurtainupEventBox.defaultProps = {
  palette: 'orange',
};

export default CurtainupEventBox;
