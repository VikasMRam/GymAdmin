import React from 'react';
import { func, object } from 'prop-types';
import { generatePath } from 'react-router';

import { DASHBOARD_COMMUNITIES_DETAIL_EDIT_PATH } from 'sly/web/constants/dashboardAppPaths';
import {
  CardRow,
  CellWithLabel,
  LinkCell,
} from 'sly/web/components/atoms/TableCard';
import { usDate } from 'sly/web/services/helpers/date';
import { useSelector, getRelationship } from 'sly/web/services/api';
import communityPropType from 'sly/common/propTypes/community';

const CommunityEditRowCard = ({ community, suggestedEdit }) => {
  const user = useSelector(state => getRelationship(state, suggestedEdit, 'createdBy'));
  const userContact = useSelector(state => getRelationship(state, user, 'contact'));

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
  community: communityPropType,
  suggestedEdit: object.isRequired,
};

export default CommunityEditRowCard;
