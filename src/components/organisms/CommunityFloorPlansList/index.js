import React from 'react';
import styled from 'styled-components';
import { string, arrayOf, object } from 'prop-types';

import { size } from 'sly/components/themes';
import CommunityFloorPlanListItem from 'sly/components/molecules/CommunityFloorPlanListItem/index';
import Block from 'sly/components/atoms/Block/index';

const Wrapper = styled.div`

`;

const ListWrapper = styled.div`
margin-bottom: ${size('spacing.large')};
`;

const CommunityFloorPlansList = ({ typeOfCare, floorPlans }) => (
  <Wrapper>
    <ListWrapper>
      {floorPlans.map((floorPlan) => {
        const { id, info } = floorPlan;
        return <CommunityFloorPlanListItem key={id} typeOfCare={typeOfCare} {...info} />;
      })}
    </ListWrapper>
    <Block size="tiny" palette="grey">*Care services not included in price. Your pricing will vary depending on your specific room and care service needs.</Block>
  </Wrapper>
);

CommunityFloorPlansList.propTypes = {
  typeOfCare: string.isRequired,
  floorPlans: arrayOf(object).isRequired,
};

export default CommunityFloorPlansList;
