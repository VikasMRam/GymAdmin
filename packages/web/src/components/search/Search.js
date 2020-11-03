import React, { useCallback, useMemo, useState } from 'react';
import { arrayOf, number, func, oneOf, string } from 'prop-types';

import Map from 'sly/web/components/search/Map';
import coordPropType from 'sly/common/propTypes/coordPropType';
import Block from 'sly/common/components/atoms/Block';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';
import Filters from 'sly/web/components/search/Filters';
import { LIST, MAP, SHOW_OPTIONS } from 'sly/web/components/search/constants';
import { css } from 'styled-components';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';
import useDimensions from 'sly/common/components/helpers/useDimensions';
import Footer from 'sly/web/components/organisms/Footer';

const Search = ({
  show,
  setShow,
  center,
  defaultCenter,
  onMapChange,
  communities,
  zoom,
}) => {
  const nextShow = useMemo(() => {
    const showOptions = Object.keys(SHOW_OPTIONS);
    const current = showOptions.indexOf(show);
    return showOptions[Number(!current)];
  }, [show]);

  const toggleShow = useCallback(() => {
    setShow(nextShow);
  }, [nextShow]);

  const [filtersRef, {
    bottom: filtersBottom,
    top: filtersTop,
  }] = useDimensions();

  return (
    <Block
      flexDirection="column"
      upToLaptop={{
        display: 'flex',
      }}
      startingWithLaptop={{
        display: 'grid',
        gridTemplateRows: 'auto auto',
        gridTemplateColumns: '684px auto',
        gridTemplateAreas: '"filters map" "list  map"',
      }}
    >
      <Filters
        ref={filtersRef}
        gridArea="filters"
        padding="xLarge"
        nextShow={nextShow}
        toggleShow={toggleShow}
      />
      <Block
        gridArea="list"
        padding="0 xLarge"
        upToLaptop={{
          display: show === LIST ? 'block' : 'none',
        }}
      >
        {communities.map(community => (
          <CommunityTile
            key={community.id}
            // layout="column"
            noGallery
            community={community}
            marginBottom="xLarge"
          />
        ))}
      </Block>
      <Block
        gridArea="map"
      >
        <Map
          defaultCenter={defaultCenter}
          center={center}
          communities={communities}
          zoom={zoom}
          onChange={onMapChange}
          width="100%"
          height="100%"
          upToLaptop={{
            display: show === MAP ? 'block' : 'none',
            height: `calc(100vh - ${filtersBottom}px)`,
          }}
          startingWithLaptop={{
            position: 'sticky',
            top: '0px !important',
            height: `calc(100vh - ${filtersTop}px)`,
          }}
        />
      </Block>
    </Block>
  );
};

Search.propTypes = {
  show: string,
  setShow: func,
  center: coordPropType,
  defaultCenter: coordPropType,
  onSearchSubmit: func,
  communities: arrayOf(coordPropType),
  zoom: number,
  onMapChange: func,
};

export default Search;
