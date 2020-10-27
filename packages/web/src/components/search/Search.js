import React from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, number, func, oneOf } from 'prop-types';

import { withDisplay } from 'sly/common/components/helpers';
import Map from 'sly/web/components/search/Map';
import coordPropType from 'sly/common/propTypes/coordPropType';
import CommunitySearchPageTemplate
  from 'sly/web/components/templates/CommunitySearchPageTemplate';

const MiniBlock = styled.div`
  ${withDisplay}
`;

const Search = ({
  center,
  defaultCenter,
  searchParams,
  onMapChange,
  markers,
  zoom,
}) => {
  return (
    <CommunitySearchPageTemplate
      searchParams={searchParams}
      column={(null)}
    >
      <MiniBlock
        display="flex"
        css={css({
          background: 'pink',
          width: '100%',
          height: '100%',
        })}
      >

        <Map
          defaultCenter={defaultCenter}
          center={center}
          markers={markers}
          zoom={zoom}
          onChange={onMapChange}
        />
      </MiniBlock>
    </CommunitySearchPageTemplate>
  );
};

Search.propTypes = {
  center: coordPropType,
  defaultCenter: coordPropType,
  onSearchSubmit: func,
  markers: arrayOf(coordPropType),
  zoom: number,
  onMapChange: func,
};

export default Search;
