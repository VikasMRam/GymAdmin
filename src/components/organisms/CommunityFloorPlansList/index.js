import React, { Fragment } from 'react';
import styled from 'styled-components';
import { string, arrayOf, object } from 'prop-types';

import { size } from 'sly/components/themes';
import { Hr, Block } from 'sly/components/atoms';
import CommunityFloorPlanListItem from 'sly/components/molecules/CommunityFloorPlanListItem';

const StyledHr = styled(Hr)`
  margin: 0 -${size('spacing.xLarge')};
`;

const ListWrapper = styled.div`
  margin: 0 -${size('spacing.xLarge')};
  margin-bottom: ${size('spacing.xLarge')};
`;

const CommunityFloorPlansList = ({ typeOfCare, floorPlans }) => (
  <Fragment>
    <ListWrapper>
      {floorPlans.map((floorPlan, i) => {
        const { id, info } = floorPlan;
        return (
          <Fragment key={id}>
            <CommunityFloorPlanListItem typeOfCare={typeOfCare} {...info} />
            <StyledHr />
          </Fragment>
        );
      })}
    </ListWrapper>
    <Block size="tiny" palette="grey">*Care services not included in price. Your pricing will vary depending on your specific room and care service needs.</Block>
  </Fragment>
);

CommunityFloorPlansList.propTypes = {
  typeOfCare: string.isRequired,
  floorPlans: arrayOf(object).isRequired,
};

export default CommunityFloorPlansList;
