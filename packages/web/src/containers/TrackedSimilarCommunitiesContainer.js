import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { arrayOf, object } from 'prop-types';

import SimilarCommunities from 'sly/web/components/organisms/SimilarCommunities';
import { community as communityPropType } from 'sly/common/propTypes/community';
import useScrollObserver from 'sly/common/components/helpers/useScrollObserver';
import { Block, Grid, space, sx } from 'sly/common/system';
import CarrousselButton from 'sly/web/components/homepage/CarrousselButton';

export default function TrackedSimilarCommunitiesContainer({ communities, communityStyle }) {
  const [ref, dimensions] = useScrollObserver();
  const [max, step] = useMemo(() => {
    return [
      (dimensions.scrollX) ,
      Math.floor(dimensions.clientWidth + 24),
    ];
  }, [dimensions]) || 0;

  const [position, setPosition] = useState(0);
  const move = useCallback((direction) => {
    const newPos = Math.min(Math.max(0, position + (direction * step)), max);
    setPosition(newPos);
  }, [max, step, position]);

  useEffect(() => {
    ref.current.scroll({
      left: position ,
      behavior: 'smooth',
    });
  }, [position]);

  return (
    <Block position="relative">
      <Grid
        ref={ref}
        sx={{
          width: sx`calc(100% + (${space('m')}) * 2)`,
          gridTemplateColumns: `repeat(${communities?.length}, 18rem) 1px`,
          gridColumnGap: 'm',
          mx: '-m',
          mb: 'l',
          px: 'm',
          overflow: 'auto',
        }}
        sx$tablet={{
          width: '100%',
          px: 0,
          mx: 0,
          gridTemplateColumns: `repeat(${communities?.length}, 20.5rem)`,
          gridTemplateRows: '25.3rem',
          gridColumnGap: 'l',
          overflow: 'hidden',
        }}
      >
        <SimilarCommunities
          communities={communities}
          communityStyle={communityStyle}
          canFavourite
          getEvent={(community, index) => ({
            action: 'click',
            category: 'similarCommunity',
            label: index,
            value: community.id,
          })}
        />
      </Grid>
      {communities.length > 2 && (
        <>
          <CarrousselButton
            onClick={() => move(-1)}
            display="none!important"
            sx$tablet={{ display: 'flex!important', position: 'absolute', top: '50%', left: 0, transform:'translate(-50%, -50%)' }}
            rotation={270}
            {...((position === 0) && { color: 'slate.lighter-90' })}
          />
          <CarrousselButton
            onClick={() => move(+1)}
            display="none!important"
            sx$tablet={{ display: 'flex!important', position: 'absolute', top: '50%', right: 0, transform: 'translate(50%, -50%)' }}
            rotation={90}
            {...((position === max) && { color: 'slate.lighter-90' })}
          />
        </>
      )}
    </Block>
  );
}

// EO: this really shouldn't need hydrating. now it only requires it for the lazy image loading.
TrackedSimilarCommunitiesContainer.typeHydrationId = 'TrackedSimilarCommunitiesContainer';
TrackedSimilarCommunitiesContainer.propTypes = {
  communities: arrayOf(communityPropType).isRequired,
  communityStyle: object,
};
