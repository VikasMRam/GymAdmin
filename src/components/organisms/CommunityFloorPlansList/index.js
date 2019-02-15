import React, { Fragment } from 'react';
import styled from 'styled-components';
import { arrayOf, object, func } from 'prop-types';

import { size } from 'sly/components/themes';
import { Hr, Block } from 'sly/components/atoms';
import CommunityFloorPlanListItem from 'sly/components/molecules/CommunityFloorPlanListItem';

const StyledHr = styled(Hr)`
  margin: 0;
`;

const ListWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
`;

const CommunityFloorPlansList = ({ floorPlans, onItemClick }) => (
  <Fragment>
    <ListWrapper>
      {floorPlans.map((floorPlan) => {
        const { id, info, create } = floorPlan;
        const { careType } = create;
        const typeOfCare = careType[0] || '';
        return (
          <Fragment key={id}>
            <CommunityFloorPlanListItem typeOfCare={typeOfCare} {...info} onItemClick={() => onItemClick(floorPlan)} />
            <StyledHr />
          </Fragment>
        );
      })}
    </ListWrapper>
    <Block size="tiny" palette="grey">*Pricing may not be all-inclusive. Your pricing may vary depending on your specific room and care needs.</Block>
  </Fragment>
);

CommunityFloorPlansList.propTypes = {
  floorPlans: arrayOf(object).isRequired,
  onItemClick: func,
};

export default CommunityFloorPlansList;
