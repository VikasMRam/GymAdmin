import React from 'react';
import { arrayOf, number, func, oneOf } from 'prop-types';

import Map from 'sly/web/components/search/Map';
import coordPropType from 'sly/common/propTypes/coordPropType';
import CommunitySearchPageTemplate
  from 'sly/web/components/templates/CommunitySearchPageTemplate';
import Block from 'sly/common/components/atoms/Block';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';

const Search = ({
  center,
  defaultCenter,
  searchParams,
  onMapChange,
  communities,
  zoom,
}) => {
  return (
    <CommunitySearchPageTemplate
      searchParams={searchParams}
      column={null}
    >
      <Block>
        {communities.map(community => (
          <CommunityTile
            community={community}
          />
        ))}
      </Block>
      <Map
        defaultCenter={defaultCenter}
        center={center}
        communities={communities}
        zoom={zoom}
        onChange={onMapChange}
        css={{
          background: 'pink',
          width: '100%',
          height: '100%',
        }}
      />
    </CommunitySearchPageTemplate>
  );
};

Search.propTypes = {
  center: coordPropType,
  defaultCenter: coordPropType,
  onSearchSubmit: func,
  communities: arrayOf(coordPropType),
  zoom: number,
  onMapChange: func,
};

export default Search;
