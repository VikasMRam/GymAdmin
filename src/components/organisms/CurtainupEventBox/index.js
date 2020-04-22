import React from 'react';
import styled from 'styled-components';
import { arrayOf } from 'prop-types';
import dayjs from 'dayjs';

import { size, palette } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import eventPropType from 'sly/propTypes/event';
import performerPropType from 'sly/propTypes/performer';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { Box, Block } from 'sly/components/atoms';
import Avatar from 'sly/components/molecules/Avatar';

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

const StyledBox = textAlign(Box, 'left');

const CurtainupEventBox = ({ event: { liveAt }, performers, palette }) => {
  const parsedDate = dayjs(liveAt);
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
      <Avatar
        user={{
          name: p.name,
          picture: p.gallery && p.gallery.images && p.gallery.images.length ? { path: p.gallery.images[0].path } : null,
        }}
        size="xxxLarge"
      />
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

CurtainupEventBox.propTypes = {
  event: eventPropType.isRequired,
  performers: arrayOf(performerPropType),
  palette: palettePropType.isRequired,
};

CurtainupEventBox.defaultProps = {
  palette: 'orange',
};

export default CurtainupEventBox;
