import React from 'react';
import { arrayOf, number, func, oneOf, string } from 'prop-types';

import Map from 'sly/web/components/search/Map';
import coordPropType from 'sly/common/propTypes/coordPropType';
import Block from 'sly/common/components/atoms/Block';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';
import Filters from 'sly/web/components/search/Filters';

const Search = ({
  show,
  toggleShow,
  center,
  defaultCenter,
  onMapChange,
  communities,
  zoom,
}) => {
  return (
    <Block
      display="flex"
      padding="xLarge"
      flexDirection="column"
    >
      <Filters
        gridArea="topBar"
        pad="xLarge"
        show={show}
        toggleShow={toggleShow}
      />
      <Block>
        {communities.map(community => (
          <CommunityTile
            key={community.id}
            noGallery
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
    </Block>
  );
};

Search.propTypes = {
  show: string,
  toggleShow: func,
  center: coordPropType,
  defaultCenter: coordPropType,
  onSearchSubmit: func,
  communities: arrayOf(coordPropType),
  zoom: number,
  onMapChange: func,
};

export default Search;
