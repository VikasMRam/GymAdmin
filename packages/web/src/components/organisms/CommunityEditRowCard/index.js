import React, { useMemo } from 'react';
import { object } from 'prop-types';
import { generatePath, useRouteMatch } from 'react-router';

import { DASHBOARD_COMMUNITIES_DETAIL_EDIT_PATH, DASHBOARD_COMMUNITIES_DETAIL_PATH } from 'sly/web/dashboard/dashboardAppPaths';
import {
  CardRow,
  CellWithLabel,
  LinkCell,
} from 'sly/web/components/atoms/TableCard';
import { usDate } from 'sly/web/services/helpers/date';
import { usePrefetch, getRelationship } from 'sly/web/services/api';

const CommunityEditRowCard = ({ suggestedEdit }) => {
  const { params } = useRouteMatch(DASHBOARD_COMMUNITIES_DETAIL_PATH);
  const { requestInfo: { entities, normalized: community } } = usePrefetch('getCommunity', {
    id: params.id,
    include: 'suggested-edits',
  });
  const user = useMemo(() => getRelationship(entities, suggestedEdit, 'createdBy'), [entities, suggestedEdit]);
  const userContact = useMemo(() => getRelationship(entities, user, 'contact'), [entities, user]);

  const { id, attributes: { status } } = suggestedEdit;
  const suggestedEditDetailsPath = generatePath(DASHBOARD_COMMUNITIES_DETAIL_EDIT_PATH, { id: community.id, editId: id });

  const date = usDate(suggestedEdit.attributes.updatedAt);
  return (
    <CardRow>
      <LinkCell to={suggestedEditDetailsPath}>
        {date}
      </LinkCell>
      <CellWithLabel label="User">
        {user.attributes.name}
      </CellWithLabel>
      <CellWithLabel label="Status">
        {status}
      </CellWithLabel>
    </CardRow>
  );
};

CommunityEditRowCard.propTypes = {
  suggestedEdit: object.isRequired,
};

export default CommunityEditRowCard;
