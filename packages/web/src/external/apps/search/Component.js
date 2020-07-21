import React from 'react';
import styled from 'styled-components';
import { func, shape, string } from 'prop-types';

import { size } from 'sly/web/components/themes';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import pad from 'sly/web/components/helpers/pad';
import { Heading, Hr } from 'sly/web/components/atoms';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';
import SearchResultsContainer from 'sly/web/external/apps/search/SearchResultsContainer';
import { textAlign } from 'sly/web/components/helpers/text';

const Wrapper = styled.div`
  padding: ${size('spacing.large')};
`;

const CenteredHeading = pad(textAlign(Heading), 'large');

const StyledHr = styled(Hr)`
  margin-left: -${size('spacing.large')};
  margin-right: -${size('spacing.large')};
`;

const SearchComponent = ({
  onLocationSearch, locationInfo, pageNumber, palette,
}) => (
  <Wrapper>
    <CenteredHeading size="subtitle">Senior Living Communities Near You</CenteredHeading>
    <SearchBoxContainer
      hasShadow
      clearLocationOnBlur={false}
      onLocationSearch={onLocationSearch}
    />
    <StyledHr />
    <SearchResultsContainer {...locationInfo} pageNumber={pageNumber} palette={palette} />
  </Wrapper>
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
