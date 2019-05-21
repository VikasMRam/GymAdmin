import React from 'react';
import styled from 'styled-components';
import { func, shape, string } from 'prop-types';

import { size } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import textAlign from 'sly/components/helpers/textAlign';
import pad from 'sly/components/helpers/pad';
import { Box, Heading, Hr } from 'sly/components/atoms';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import SearchResultsContainer from 'sly/external/apps/search/SearchResultsContainer';

const CenteredHeading = pad(textAlign(Heading), 'large');

const StyledHr = styled(Hr)`
  margin-left: -${size('spacing.xLarge')};
  margin-right: -${size('spacing.xLarge')};
`;

const SearchComponent = ({
  onLocationSearch, locationInfo, pageNumber, palette,
}) => (
  <div>
    <Box>
      <CenteredHeading size="subtitle">Find The Best Assisted Living Near Me</CenteredHeading>
      <SearchBoxContainer
        hasShadow
        clearLocationOnBlur={false}
        onLocationSearch={onLocationSearch}
      />
      <StyledHr />
      <SearchResultsContainer {...locationInfo} pageNumber={pageNumber} palette={palette} />
    </Box>
  </div>
);

SearchComponent.propTypes = {
  onLocationSearch: func,
  locationInfo: shape({
    city: string,
    state: string,
  }),
  pageNumber: string,
  palette: palettePropType,
};

export default SearchComponent;
