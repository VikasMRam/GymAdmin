import React, { useCallback, memo } from 'react';
import { func, number } from 'prop-types';

import { Link } from 'sly/common/system';
import EntityTile from 'sly/web/components/organisms/EntityTile';
import coordPropType from 'sly/common/propTypes/coordPropType';
import SlyEvent from 'sly/web/services/helpers/events';

const eventCategory = 'search-list';
const sendEvent = (action, label, value) => SlyEvent.getInstance().sendEvent({
  category: eventCategory,
  action,
  label,
  value,
});

const ListEntityTile = memo(({ entity, setHoveredEntity, index }) => {
  const onMouseEnter = useCallback(() => sendEvent('list-hover', entity.name, index) || setHoveredEntity(entity), [entity]);
  const onMouseLeave = useCallback(() => setHoveredEntity(null), []);
  return (
    <Link
      key={entity.id}
      to={entity.url}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      target="_blank"
      sx={{ '&:hover': { textDecoration: 'unset' } }}
      event={{
        category: eventCategory,
        action: 'entity-click',
        label: index,
        value: entity.id,
      }}
      block
    >
      <EntityTile
        entity={entity}
        margin="0 l l"
        layout="column"
        index={index}
        sx={{
          '&:hover': {
            boxShadow: 'rgb(0 0 0 / 6%) 0px 0.25rem 1rem',
          },
        }}
      />
    </Link>
  );
});

ListEntityTile.propTypes = {
  entity: coordPropType,
  setHoveredCommunity: func,
  index: number,
};

export default ListEntityTile;
