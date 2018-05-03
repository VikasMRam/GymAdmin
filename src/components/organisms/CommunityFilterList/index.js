import React from 'react';
import styled from 'styled-components';
import { object, arrayOf } from 'prop-types';

import { size } from 'sly/components/themes';
import CollapsibleSection from "sly/components/molecules/CollapsibleSection";
import Input from "sly/components/atoms/Input";
import Button from "sly/components/atoms/Button";

const SimilarCommunityTileDiv = styled.div`
  padding-bottom: ${size('spacing.large')};
  padding-right: ${size('spacing.regular')};
  padding-left: ${size('spacing.regular')};
`;


const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: calc(
      ${size('layout.mainColumn')} + ${size('layout.sideColumn')} +
        ${size('spacing.xLarge')}
    );
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: ${size('layout.laptopLarge')};
  }
`;




const CommunityFilterList = ({ communityList }) => {

  return (
    <SectionWrapper>

      <CollapsibleSection title={"Type of Care"} />
      <CollapsibleSection title={"Maximum Starting Rate"}>
        {/*<Input type={"radio"}>*/}
          {/*<option>Option 1</option>*/}
          {/*<option>Option 2</option>*/}
          {/*<option>Option 3</option>*/}
        {/*</Input>*/}
      </CollapsibleSection>
      <CollapsibleSection title={"Size"}>
        <Input type={"select"}>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </Input>

      </CollapsibleSection>
    </SectionWrapper>
  );
};

CommunityFilterList.propTypes = {
  appliedFilters:object,

};

export default CommunityFilterList;
