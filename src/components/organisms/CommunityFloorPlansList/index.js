import React, { Fragment } from 'react';
import styled from 'styled-components';
import { string, arrayOf, object, func } from 'prop-types';

import { size } from 'sly/components/themes';
import { Hr, Block } from 'sly/components/atoms';
import CommunityFloorPlanListItem from 'sly/components/molecules/CommunityFloorPlanListItem';

const StyledHr = styled(Hr)`
  margin: 0;
`;

const ListWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
`;

const CommunityFloorPlansList = ({ typeOfCare, floorPlans, onItemClick }) => (
  <Fragment>
    <ListWrapper>
      {floorPlans.map((floorPlan) => {
        const { id, info } = floorPlan;
        return (
          <Fragment key={id}>
            <CommunityFloorPlanListItem typeOfCare={typeOfCare} {...info} onItemClick={() => onItemClick(floorPlan)} />
            <StyledHr />
          </Fragment>
        );
      })}
    </ListWrapper>
    <Block size="tiny" palette="grey">*Care services are not included in price. Your pricing will vary depending on your specific room and care needs.</Block>
  </Fragment>
);

CommunityFloorPlansList.propTypes = {
  typeOfCare: string.isRequired,
  floorPlans: arrayOf(object).isRequired,
  onItemClick: func,
};

export default CommunityFloorPlansList;
