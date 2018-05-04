import
  React from 'react';
import styled from 'styled-components';
import { object, arrayOf } from 'prop-types';

import { size } from 'sly/components/themes';
import CollapsibleSection from "sly/components/molecules/CollapsibleSection";
import Input from "sly/components/atoms/Input";
import IconButton from "sly/components/molecules/IconButton";

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
  border: 1px;
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




const CommunityFilterList = ({ toggleMap, isMapView, searchParams }) => {

  return (
    <SectionWrapper>
      {isMapView && toggleMap && <IconButton icon={'list'} onClick={toggleMap} transparent>
        Show List
      </IconButton>}
      {!isMapView && <IconButton icon={'map'} onClick={toggleMap} transparent>
        Show Map
      </IconButton>}
      <CollapsibleSection title={"Type of Care"} >

      </CollapsibleSection>
      <CollapsibleSection title={"Maximum Starting Rate"}>
        {/*<Input type={"radio"}>*/}
          {/*<option>2500</option>*/}
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
